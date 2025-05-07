import React, { useState, useEffect } from 'react';
import { Table, Button, Container, Form, Alert } from 'react-bootstrap';
import StudentForm from './StudentForm';
import { PortalService } from '../service/PortalService'; // Adjust the path
import Papa from 'papaparse';  // A CSV parser library

const portalService = new PortalService();

function StudentList() {
  const [students, setStudents] = useState([]);
  const [showForm, setShowForm] = useState(false);
  const [currentStudent, setCurrentStudent] = useState(null);
  const [search, setSearch] = useState('');
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchStudents();
  }, []);

  const fetchStudents = async () => {
    try {
      const response = await portalService.getAllStudents();
      setStudents(response.data);
    } catch (error) {
      console.error("Error fetching students", error);
    }
  };

  const handleAddStudent = async (newStudent) => {
    try {
     let res = await portalService.addStudent(newStudent);
     alert(res.data.body);
      fetchStudents(); // Re-fetch the students after adding
      setShowForm(false);
    } catch (error) {
      console.error("Error adding student", error);
    }
  };

  const handleBulkImport = async (file) => {
    const formData = new FormData();
    formData.append("file", file); // 👈 Key must be exactly 'file'
  
    try {
      await portalService.bulkImportStudents(formData); // Assuming your method sends formData as is
      fetchStudents();
      alert("Students imported successfully");
    } catch (error) {
      console.error("Error during bulk import", error);
    }
  };
  

  const handleEditStudent = (student) => {
    setCurrentStudent(student);
    setShowForm(true);
  };

  const handleUpdateStudent = async (updatedStudent) => {
    if (!updatedStudent.id) {
      console.error("Student ID is missing for update");
      return; // Exit if studentId is not present
    }

    try {
      await portalService.updateStudent(updatedStudent.id, updatedStudent);
      fetchStudents(); // Re-fetch the students after updating
      setShowForm(false);
    } catch (error) {
      console.error("Failed to update student", error);
    }
  };

  const handleDeleteStudent = async (studentId) => {
    try {
      await portalService.deleteStudent(studentId);
      fetchStudents(); // Re-fetch the students after deleting
    } catch (error) {
      console.error("Failed to delete student", error);
    }
  };

  const filteredStudents = students.filter(
    (s) =>
      (s.name && s.name.toLowerCase().includes(search.toLowerCase())) ||
      (s.grade && s.grade.toLowerCase().includes(search.toLowerCase())) ||
      (s.id && s.id.toString().toLowerCase().includes(search.toLowerCase()))  // Convert id to string
  );

  return (
    <Container className="mt-4">
      <h3>Student List</h3>
      {error && <Alert variant="danger">{error}</Alert>}
      <Form.Control
        type="text"
        placeholder="Search by Name, Grade, ID"
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        className="mb-3"
      />
      <Button onClick={() => setShowForm(true)} className="mb-3">
        Add Student
      </Button>

      <Button variant="success" onClick={() => document.getElementById('csv-file-input').click()} className="mb-3 ml-2">
        Bulk Import Students
      </Button>
      <input
        type="file"
        id="csv-file-input"
        accept=".csv"
        style={{ display: 'none' }}
        onChange={(e) => handleBulkImport(e.target.files[0])}
      />

      {showForm && (
        <StudentForm
          student={currentStudent || {}}  // Pass currentStudent to pre-populate form for editing
          onSubmit={currentStudent ? handleUpdateStudent : handleAddStudent}
        />
      )}

      <Table striped bordered hover>
        <thead>
          <tr>
            <th>ID</th>
            <th>Name</th>
            <th>Grade</th>
            <th>Vaccinated</th>
            <th>Vaccination Date</th>
            <th>Vaccine Name</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {filteredStudents.map((student) => (
            <tr key={student.id}>
              <td>{student.id}</td>
              <td>{student.name}</td>
              <td>{student.grade}</td>
              <td>{student.vaccinated ? 'Yes' : 'No'}</td>
              <td>{student.vaccinationDate || '-'}</td>
              <td>{student.vaccineName || '-'}</td>
              <td>
                <Button variant="warning" onClick={() => handleEditStudent(student)}>
                  Edit
                </Button>
                <Button
                  variant="danger"
                  onClick={() => handleDeleteStudent(student.id)}
                  className="ml-2"
                >
                  Delete
                </Button>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>
    </Container>
  );
}

export default StudentList;
