// StudentForm.jsx
import React, { useState, useEffect } from 'react';
import { Form, Button, Container } from 'react-bootstrap';

function StudentForm({ onSubmit, student = {} }) {
  const [formData, setFormData] = useState({
    name: student.name || '',
    grade: student.grade || '',
    vaccinated: student.vaccinated || false,
    vaccinationDate: student.vaccinationDate || '',
    vaccineName: student.vaccineName || '',
    id: student.id || null // Make sure the ID is part of the formData
  });

  useEffect(() => {
    if (student && student.id) {
      setFormData({
        name: student.name || '',
        grade: student.grade || '',
        vaccinated: student.vaccinated || false,
        vaccinationDate: student.vaccinationDate || '',
        vaccineName: student.vaccineName || '',
        id: student.id || null // Ensure we keep the ID when editing
      });
    }
  }, [student]);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (onSubmit && typeof onSubmit === 'function') {
      onSubmit(formData);  // Pass the entire formData, including the ID
    }
    setFormData({
      name: '',
      grade: '',
      vaccinated: false,
      vaccinationDate: '',
      vaccineName: '',
      id: null // Reset the form and ID after submit
    });
  };

  return (
    <Container>
      <h3>{student.id ? 'Edit Student' : 'Add Student'}</h3>
      <Form onSubmit={handleSubmit}>
        <Form.Group>
          <Form.Label>Name</Form.Label>
          <Form.Control
            type="text"
            name="name"
            value={formData.name}
            onChange={handleChange}
            required
          />
        </Form.Group>
        <Form.Group>
          <Form.Label>Grade</Form.Label>
          <Form.Control
            type="text"
            name="grade"
            value={formData.grade}
            onChange={handleChange}
            required
          />
        </Form.Group>
        <Form.Check
          type="checkbox"
          label="Vaccinated"
          name="vaccinated"
          checked={formData.vaccinated}
          onChange={handleChange}
        />
        {formData.vaccinated && (
          <>
            <Form.Group>
              <Form.Label>Vaccination Date</Form.Label>
              <Form.Control
                type="date"
                name="vaccinationDate"
                value={formData.vaccinationDate}
                onChange={handleChange}
                required
              />
            </Form.Group>
            <Form.Group>
              <Form.Label>Vaccine Name</Form.Label>
              <Form.Control
                type="text"
                name="vaccineName"
                value={formData.vaccineName}
                onChange={handleChange}
                required
              />
            </Form.Group>
          </>
        )}
        <Button variant="primary" type="submit">
          {student.id ? 'Update Student' : 'Add Student'}
        </Button>
      </Form>
    </Container>
  );
}

export default StudentForm;
