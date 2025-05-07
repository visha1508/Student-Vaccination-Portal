import React, { useEffect, useState, useCallback } from 'react';
import { Container, Table, Button, Form, Row, Col, Alert } from 'react-bootstrap';
import { PortalService } from '../service/PortalService';
import moment from 'moment';

const DriveManager = () => {
  const [drives, setDrives] = useState([]);
  const [formData, setFormData] = useState({
    vaccineName: '',
    driveDate: '',
    availableDoses: '',
    applicableClasses: ''
  });
  const [editId, setEditId] = useState(null);
  const [error, setError] = useState('');

  const portalService = new PortalService();

  const fetchDrives = useCallback(() => {
    portalService.getUpcomingDrives()
      .then(res => {
        console.log("Response from API: ", res.data);  // Log the data to inspect
        const data = res.data;

        // Ensure the response is an array
        if (Array.isArray(data)) {
          setDrives(data);
        } else {
          console.error("Unexpected response format", data);
          setDrives([]);
          setError("Unexpected response format.");
        }
      })
      .catch(() => {
        setError("Failed to load drives");
        setDrives([]);
      });
  }, []);

  useEffect(() => {
    fetchDrives();
  }, [fetchDrives]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const today = moment().startOf('day');
    const driveDate = moment(formData.driveDate);

    if (!driveDate.isValid() || driveDate.diff(today, 'days') < 15) {
      setError("Drive must be scheduled at least 15 days in advance.");
      return;
    }

    try {
      if (editId) {
        await portalService.updateDrive(editId, formData);
      } else {
        await portalService.createDrive(formData);
      }
      fetchDrives();
      resetForm();
    } catch (err) {
      setError("Error saving drive. Possible conflict or invalid data.");
    }
  };

  const handleEdit = (drive) => {
    if (moment(drive.driveDate).isBefore(moment())) {
      setError("Cannot edit completed drives.");
      return;
    }
    setFormData(drive);
    setEditId(drive.id);
  };

  const handleDelete = async (id) => {
    try {
      await portalService.deleteDrive(id);
      fetchDrives();
    } catch (err) {
      setError("Error deleting drive.");
    }
  };

  const resetForm = () => {
    setFormData({
      vaccineName: '',
      driveDate: '',
      availableDoses: '',
      applicableClasses: ''
    });
    setEditId(null);
    setError('');
  };

  return (
    <Container className="mt-4">
      <h3>Vaccination Drive Management</h3>
      {error && <Alert variant="danger">{error}</Alert>}

      <Form onSubmit={handleSubmit} className="mb-4">
        <Row>
          <Col md={3}>
            <Form.Group controlId="vaccineName">
              <Form.Label>Vaccine Name</Form.Label>
              <Form.Control
                type="text"
                name="vaccineName"
                value={formData.vaccineName}
                onChange={handleChange}
                required
              />
            </Form.Group>
          </Col>
          <Col md={3}>
            <Form.Group controlId="driveDate">
              <Form.Label>Drive Date</Form.Label>
              <Form.Control
                type="date"
                name="driveDate"
                value={formData.driveDate}
                onChange={handleChange}
                required
              />
            </Form.Group>
          </Col>
          <Col md={3}>
            <Form.Group controlId="availableDoses">
              <Form.Label>Doses</Form.Label>
              <Form.Control
                type="number"
                name="availableDoses"
                value={formData.availableDoses}
                onChange={handleChange}
                required
              />
            </Form.Group>
          </Col>
          <Col md={3}>
            <Form.Group controlId="applicableClasses">
              <Form.Label>Applicable Classes</Form.Label>
              <Form.Control
                type="text"
                name="applicableClasses"
                placeholder="e.g., 5-7"
                value={formData.applicableClasses}
                onChange={handleChange}
                required
              />
            </Form.Group>
          </Col>
        </Row>
        <Button type="submit" className="mt-3">
          {editId ? 'Update Drive' : 'Create Drive'}
        </Button>
        {editId && <Button variant="secondary" onClick={resetForm} className="mt-3 ml-2">Cancel</Button>}
      </Form>

      <h4>Upcoming Drives</h4>
      <Table striped bordered hover>
        <thead>
          <tr>
            <th>Vaccine</th>
            <th>Date</th>
            <th>Doses</th>
            <th>Grades</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {drives.map((drive) => (
            <tr key={drive.id}>
              <td>{drive.vaccineName}</td>
              <td>{moment(drive.driveDate).format("YYYY-MM-DD")}</td>
              <td>{drive.availableDoses}</td>
              <td>{drive.applicableClasses}</td>
              <td>
                <Button
                  variant="warning"
                  onClick={() => handleEdit(drive)}
                  disabled={moment(drive.driveDate).isBefore(moment())}
                >
                  Edit
                </Button>{' '}
                <Button variant="danger" onClick={() => handleDelete(drive.id)}>
                  Delete
                </Button>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>
    </Container>
  );
};

export default DriveManager;
