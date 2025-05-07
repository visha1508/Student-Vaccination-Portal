import React, { useEffect, useState } from 'react';
import {
  Container,
  Table,
  Tabs,
  Tab,
  Alert,
  Spinner,
  Form,
  Row,
  Col,
  Button,
} from 'react-bootstrap';
import { PortalService } from '../service/PortalService';
import moment from 'moment';
import * as XLSX from 'xlsx';
import { jsPDF } from 'jspdf';
import { autoTable } from 'jspdf-autotable';

const portalService = new PortalService();

const ReportsPage = () => {
  const [students, setStudents] = useState([]);
  const [drives, setDrives] = useState([]);
  const [searchStudent, setSearchStudent] = useState('');
  const [searchDrive, setSearchDrive] = useState('');
  const [fromDate, setFromDate] = useState('');
  const [toDate, setToDate] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchReports();
  }, []);

  const fetchReports = async () => {
    try {
      const [studentsRes, drivesRes] = await Promise.all([
        portalService.getAllStudents(),
        portalService.getUpcomingDrives(),
      ]);
      setStudents(studentsRes.data);
      setDrives(drivesRes.data);
    } catch (err) {
      setError('Error fetching report data.');
    } finally {
      setLoading(false);
    }
  };

  const filterByDate = (date) => {
    const d = new Date(date);
    if (fromDate && d < new Date(fromDate)) return false;
    if (toDate && d > new Date(toDate)) return false;
    return true;
  };

  const filteredStudents = students.filter((s) =>
    s.name.toLowerCase().includes(searchStudent.toLowerCase())
  );

  const filteredDrives = drives.filter(
    (d) =>
      d.vaccineName.toLowerCase().includes(searchDrive.toLowerCase()) &&
      filterByDate(d.driveDate || d.date)
  );

  const downloadCSV = (data, headers, filename) => {
    const rows = [headers, ...data.map((row) => headers.map((h) => row[h]))];
    const csv = rows.map((r) => r.join(',')).join('\n');
    const blob = new Blob([csv], { type: 'text/csv' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = filename;
    a.click();
    URL.revokeObjectURL(url);
  };

  const downloadExcel = (data, headers, filename) => {
    const rows = [
      headers, 
      ...data.map((item) => [
        item.id,
        item.name,
        item.grade,
        item.vaccinated ? 'Yes' : 'No',
        item.vaccineName || '',
        item.vaccinationDate || '',
      ]),
    ];
    
    const ws = XLSX.utils.aoa_to_sheet(rows);
    const wb = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, 'Sheet1');
    XLSX.writeFile(wb, filename);
  };

  const downloadPDF = (data, headers, filename) => {
    const doc = new jsPDF();
    
    doc.text(filename, 14, 16);

    autoTable(doc, {
      head: [headers], // Header row
      body: data, // Data rows
    });
    
    doc.save(`${filename}.pdf`);
  };

  return (
    <Container className="mt-4">
      <h3>Vaccination Reports</h3>
      {error && <Alert variant="danger">{error}</Alert>}
      {loading ? (
        <Spinner animation="border" />
      ) : (
        <Tabs defaultActiveKey="students" className="mb-3">
          {/* Students Report Tab */}
          <Tab eventKey="students" title="Students Report">
            <Row className="mb-2">
              <Col md={4}>
                <Form.Control
                  type="text"
                  placeholder="Search by name"
                  value={searchStudent}
                  onChange={(e) => setSearchStudent(e.target.value)}
                />
              </Col>
              <Col md="auto">
                <Button
                  variant="success"
                  onClick={() =>
                    downloadCSV(
                      filteredStudents,
                      ['id', 'name', 'grade', 'vaccinated', 'vaccineName', 'vaccinationDate'],
                      'students_report.csv'
                    )
                  }
                >
                  Download CSV
                </Button>
                <Button
                  variant="info"
                  onClick={() =>
                    downloadExcel(
                      filteredStudents,
                      ['id', 'name', 'grade', 'vaccinated', 'vaccineName', 'vaccinationDate'],
                      'students_report.xlsx'
                    )
                  }
                >
                  Download Excel
                </Button>
                <Button
                  variant="primary"
                  onClick={() =>
                    downloadPDF(
                      filteredStudents.map((s) => [
                        s.id,
                        s.name,
                        s.grade,
                        s.vaccinated ? 'Yes' : 'No',
                        s.vaccineName || '',
                        s.vaccinationDate || '',
                      ]),
                      ['ID', 'Name', 'Grade', 'Vaccinated', 'Vaccine Name', 'Vaccination Date'],
                      'Students_Report'
                    )
                  }
                >
                  Download PDF
                </Button>
              </Col>
            </Row>
            <Table striped bordered hover>
              <thead>
                <tr>
                  <th>ID</th>
                  <th>Name</th>
                  <th>Grade</th>
                  <th>Vaccinated</th>
                  <th>Vaccine Name</th>
                  <th>Vaccination Date</th>
                </tr>
              </thead>
              <tbody>
                {filteredStudents.map((s) => (
                  <tr key={s.id}>
                    <td>{s.id}</td>
                    <td>{s.name}</td>
                    <td>{s.grade}</td>
                    <td>{s.vaccinated ? 'Yes' : 'No'}</td>
                    <td>{s.vaccineName}</td>
                    <td>{s.vaccinationDate}</td>
                  </tr>
                ))}
              </tbody>
            </Table>
          </Tab>

          {/* Drives Report Tab */}
          <Tab eventKey="drives" title="Drives Report">
            <Row className="mb-2">
              <Col md={3}>
                <Form.Control
                  type="text"
                  placeholder="Search by vaccine name"
                  value={searchDrive}
                  onChange={(e) => setSearchDrive(e.target.value)}
                />
              </Col>
              <Col md={3}>
                <Form.Control
                  type="date"
                  value={fromDate}
                  onChange={(e) => setFromDate(e.target.value)}
                />
              </Col>
              <Col md={3}>
                <Form.Control
                  type="date"
                  value={toDate}
                  onChange={(e) => setToDate(e.target.value)}
                />
              </Col>
              <Col md="auto">
                <Button
                  variant="success"
                  onClick={() =>
                    downloadCSV(
                      filteredDrives.map((d) => ({
                        id: d.id,
                        vaccineName: d.vaccineName,
                        date: moment(d.driveDate || d.date).format('YYYY-MM-DD'),
                        availableDoses: d.availableDoses,
                        grades: d.applicableClasses || d.applicableGrades,
                      })),
                      ['id', 'vaccineName', 'date', 'availableDoses', 'grades'],
                      'drives_report.csv'
                    )
                  }
                >
                  Download CSV
                </Button>
                <Button
                  variant="info"
                  onClick={() =>
                    downloadExcel(
                      filteredDrives.map((d) => [
                        d.id,
                        d.vaccineName,
                        moment(d.driveDate || d.date).format('YYYY-MM-DD'),
                        d.availableDoses,
                        d.applicableClasses || d.applicableGrades,
                      ]),
                      ['id', 'vaccineName', 'date', 'availableDoses', 'grades'],
                      'drives_report.xlsx'
                    )
                  }
                >
                  Download Excel
                </Button>
                <Button
                  variant="primary"
                  onClick={() =>
                    downloadPDF(
                      filteredDrives.map((d) => [
                        d.id,
                        d.vaccineName,
                        moment(d.driveDate || d.date).format('YYYY-MM-DD'),
                        d.availableDoses,
                        d.applicableClasses || d.applicableGrades,
                      ]),
                      ['ID', 'Vaccine', 'Date', 'Doses', 'Grades'],
                      'Drives_Report'
                    )
                  }
                >
                  Download PDF
                </Button>
              </Col>
            </Row>
            <Table striped bordered hover>
              <thead>
                <tr>
                  <th>ID</th>
                  <th>Vaccine</th>
                  <th>Date</th>
                  <th>Doses</th>
                  <th>Grades</th>
                </tr>
              </thead>
              <tbody>
                {filteredDrives.map((d) => (
                  <tr key={d.id}>
                    <td>{d.id}</td>
                    <td>{d.vaccineName}</td>
                    <td>{moment(d.driveDate || d.date).format('YYYY-MM-DD')}</td>
                    <td>{d.availableDoses}</td>
                    <td>{d.applicableClasses || d.applicableGrades}</td>
                  </tr>
                ))}
              </tbody>
            </Table>
          </Tab>
        </Tabs>
      )}
    </Container>
  );
};

export default ReportsPage;
