import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { PortalService } from "../service/PortalService";
import { LoginDto } from "../model/LoginDto";
import { Container, Form, Button, Alert } from 'react-bootstrap';

const LoginPage = () => {
  const portalService = new PortalService();

  // Manage the form fields and error state
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(null);

  const navigate = useNavigate();

  const handleSubmit = (event) => {
    event.preventDefault();

    // Validation: Ensure that email and password are not empty
    if (!email || !password) {
      setError("Please fill out both fields.");
      return;
    }

    // Create LoginDto object and populate with email and password
    const userLoginObject = new LoginDto();
    userLoginObject.username = email;
    userLoginObject.password = password;

    // Attempt to log in the user
    portalService
      .login(userLoginObject)
      .then((result) => {
        navigate('/dashboard');;
        // alert("User is successfully logged in.");
        // Optionally redirect to a different page, e.g., home page after successful login
        // navigate('/');
      })
      .catch((error2) => {
        setError(error2.message || "An error occurred during login.");
      });
  };

  return (
    <div className="d-flex justify-content-center align-items-center vh-100">
      <Container
        className="p-4 rounded shadow-lg bg-light"
        style={{ maxWidth: "500px" }}
      >
        <h2 className="text-center mb-4">Student Vaccination Portal</h2>

        {error && <Alert variant="danger">{error}</Alert>}

        <Form onSubmit={handleSubmit}>
          {/* Email Field */}
          <Form.Group className="mb-3" controlId="formBasicEmail">
            <Form.Label>Username</Form.Label>
            <Form.Control
              type="username"
              placeholder="name@example.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              aria-label="Email Address"
              required
            />
           
          </Form.Group>

          {/* Password Field */}
          <Form.Group className="mb-3" controlId="inputPassword5">
            <Form.Label>Password</Form.Label>
            <Form.Control
              type="password"
              aria-describedby="passwordHelpBlock"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
           
          </Form.Group>

          {/* Submit Button */}
          <Button variant="dark" type="submit" className="w-100">
            Submit
          </Button>
        </Form>
      </Container>
    </div>
  );
}

export default LoginPage;
