import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import Button from "react-bootstrap/Button";

import logo from "../images/logo.svg";

import Offcanvas from "react-bootstrap/esm/Offcanvas";

import { Link } from "react-router-dom";
import "../styles/NavbarsAuth.css";

const NavbarsAuthStyle: React.CSSProperties = {
  left: "0",
  right: "0",
  zIndex: "100",
  height: "5em",
};

export const NavbarsAuth = () => {
  return (
    <Navbar
      expand="md"
      className="position-fixed navbarsauth"
      style={NavbarsAuthStyle}
    >
      <Container style={{ height: "fit-content" }}>
        <Link to="/">
          <img src={logo} alt="Logo" width="130em" className="mx-4 mb-md-3" />
        </Link>
        <Navbar.Toggle
          className="border border-1 border-white"
          aria-controls={`offcanvasNavbar-expand-md`}
        />
        <Navbar.Offcanvas
          id={`offcanvasNavbar-expand-md`}
          aria-labelledby={`offcanvasNavbarLabel-expand-md`}
          placement="start"
          className="bg-dark"
        >
          <Offcanvas.Header closeButton>
            <Offcanvas.Title id={`offcanvasNavbarLabel-expand-md`}>
              Offcanvas
            </Offcanvas.Title>
          </Offcanvas.Header>
          <Offcanvas.Body>
            <Nav className="d-flex align-items-center justify-content-start flex-grow-1 text-white">
              <Link to="/" className="mx-1">
                <Button
                  variant="outline-light"
                  className="text-white fontSemi fw-semibold mb-3"
                >
                  Home
                </Button>
              </Link>
            </Nav>
            <Nav className="d-flex align-items-center justify-content-end flex-grow-1 text-white">
              <Link to="/signup" className="mx-1">
                <Button
                  variant="outline-light"
                  className="text-white fontSemi fw-semibold mb-3"
                >
                  Sign Up
                </Button>
              </Link>
              <Link to="/login" className="mx-1">
                <Button
                  variant="outline-light"
                  className="text-white fontSemi fw-semibold mb-3"
                >
                  Log in
                </Button>
              </Link>
            </Nav>
          </Offcanvas.Body>
        </Navbar.Offcanvas>
      </Container>
    </Navbar>
  );
};
