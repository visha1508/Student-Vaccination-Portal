import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Container,
  Row,
  Col,
  Card,
  Button,
  ListGroup,
  Spinner,
  Alert
} from 'react-bootstrap';
import { PortalService } from '../service/PortalService'; // adjust path if needed

const DashboardPage = () => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const navigate = useNavigate();

  const portalService = new PortalService();

  useEffect(() => {
    portalService.getDashboardMetrics()
      .then(res => {
        setData(res.data);
        setLoading(false);
      })
      .catch(err => {
        console.error('Error fetching dashboard data:', err);
        setError(true);
        setLoading(false);
      });
  }, []);

  if (loading) return <Spinner animation="border" className="m-5" />;

  if (error || !data) {
    return (
      <Container className="mt-4">
        <Alert variant="danger">Failed to load dashboard data. Please try again later.</Alert>
      </Container>
    );
  }

  return (
    <Container className="mt-4">
      <Row className="mb-4">
        <Col md={4}>
          <Card>
            <Card.Body>
              <Card.Title>Total Students</Card.Title>
              <Card.Text>{data.totalStudents}</Card.Text>
            </Card.Body>
          </Card>
        </Col>
        <Col md={4}>
          <Card>
            <Card.Body>
              <Card.Title>Vaccinated Students</Card.Title>
              <Card.Text>{data.vaccinatedCount}</Card.Text>
            </Card.Body>
          </Card>
        </Col>
        <Col md={4}>
          <Card>
            <Card.Body>
              <Card.Title>Vaccination Rate</Card.Title>
              <Card.Text>{data.vaccinationPercentage}%</Card.Text>
            </Card.Body>
          </Card>
        </Col>
      </Row>

      <h4>Upcoming Vaccination Drives</h4>
      {data.upcomingDrives && data.upcomingDrives.length === 0 ? (
        <p className="text-muted">No drives scheduled in the next 30 days.</p>
      ) : (
        <ListGroup>
          {data.upcomingDrives.map(drive => (
            <ListGroup.Item key={drive.id}>
              {drive.vaccineName} – {new Date(drive.driveDate).toLocaleDateString()}
            </ListGroup.Item>
          ))}
        </ListGroup>
      )}

      <Row className="mt-4">
        <Col>
          <Button onClick={() => navigate('/studentlist')}>Manage Students</Button>{' '}
          <Button onClick={() => navigate('/drives')}>Manage Drives</Button>{' '}
          <Button onClick={() => navigate('/reports')}>View Reports</Button>
        </Col>
      </Row>
    </Container>
  );
};

export default DashboardPage;
