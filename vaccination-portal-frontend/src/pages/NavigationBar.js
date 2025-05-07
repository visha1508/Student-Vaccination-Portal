import Button from "react-bootstrap/Button";
import Container from "react-bootstrap/Container";
import Form from "react-bootstrap/Form";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";

function NavigationBar() {
  return (
    <Navbar expand="lg" className="bg-dark navbar-dark sticky-top">
      <Container fluid>
        <Navbar.Brand href="#">Vaccination Portal</Navbar.Brand>
        <Navbar.Toggle aria-controls="navbarScroll" />
        <Navbar.Collapse id="navbarScroll">
          <Nav
            className="me-auto my-2 my-lg-0"
            style={{ maxHeight: "100px" }}
            navbarScroll
          >
            <Nav.Link href="/dashboard">Dashboard</Nav.Link>
            <Nav.Link href="/studentlist">Student List</Nav.Link>
            <Nav.Link href="/drives">Drives</Nav.Link>
            <Nav.Link href="/reports">Reports</Nav.Link>
          </Nav>
          <Form className="d-flex ml-auto">
            <Nav.Link className="text-light" href="/">Logout</Nav.Link>
          </Form>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}

export default NavigationBar;