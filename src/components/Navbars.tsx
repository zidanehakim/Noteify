import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import Button from "react-bootstrap/Button";

import logo from "../images/logo.svg";
import { ReturnUpBackSharp, ReturnUpForwardSharp } from "react-ionicons";
import Offcanvas from "react-bootstrap/esm/Offcanvas";

import { useDndContext } from "../hooks/useDndContext";

import { Link } from "react-router-dom";
import { useAuthContext } from "../hooks/useAuthContext";
import { useLogout } from "../hooks/useLogout";
import React, { useEffect } from "react";

import defaultProfile from "../images/defaultProfile.jpg";

type NavbarsProps = { className?: string };

const NavbarsStyle: React.CSSProperties = {
  background: "linear-gradient(90deg, #D4145A 0%, #FBB03B 100%)",
  left: "0",
  right: "0",
  zIndex: "100",
  height: "3.3em",
  boxShadow: "rgba(0, 0, 0, 0.24) 0px 3px 8px",
};

export const Navbars = ({ className }: NavbarsProps) => {
  const { logout } = useLogout();
  const auth = useAuthContext();
  const objs = useDndContext();

  // eslint-disable-next-line react-hooks/exhaustive-deps
  const undoHandler = () => {
    if (objs.prevBigData.length > 0) {
      const newPrevBigData = [...objs.prevBigData];
      const newBigData = newPrevBigData.pop()!;

      objs.setPrevBigData(newPrevBigData);
      objs.setNextBigData([objs.bigData, ...objs.nextBigData]);
      objs.setBigData(newBigData);
    }
  };

  // eslint-disable-next-line react-hooks/exhaustive-deps
  const redoHandler = () => {
    if (objs.nextBigData.length > 0) {
      const newNextBigData = [...objs.nextBigData];
      const newBigData = newNextBigData.shift()!;

      objs.setPrevBigData([...objs.prevBigData, objs.bigData]);
      objs.setNextBigData(newNextBigData);
      objs.setBigData(newBigData);
    }
  };

  // CTRL Z + CTRL Y undo redo event
  useEffect(() => {
    const handleKeyPress = (event: KeyboardEvent) => {
      if (event.ctrlKey && event.key === "z") {
        undoHandler();
      } else if (event.ctrlKey && event.key === "y") {
        redoHandler();
      }
    };

    document.addEventListener("keydown", handleKeyPress);

    return () => {
      document.removeEventListener("keydown", handleKeyPress);
    };
  }, [redoHandler, undoHandler]);

  const profile: React.CSSProperties = {
    width: "2em",
    height: "2em",
    borderRadius: "50%",
    backgroundImage: `url('${auth.user?.profile || defaultProfile}')`,
    backgroundSize: "contain",
    backgroundRepeat: "no-repeat",
    backgroundPosition: "center",
    border: "1px solid white",
  };

  const logoutHandler = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();

    logout();
  };

  return (
    <Navbar expand="md" className={className} style={NavbarsStyle}>
      <Container style={{ height: "fit-content" }}>
        <Link to="/">
          <img src={logo} alt="Logo" width="100em" className="mx-4" />
        </Link>
        <div>
          <Button
            onClick={undoHandler}
            className="btnUndo"
            variant="link"
            disabled={objs.prevBigData.length > 0 ? false : true}
          >
            <ReturnUpBackSharp width="1.4em" height="1.4em" color="white" />
          </Button>

          <Button
            onClick={redoHandler}
            className="btnUndo"
            variant="link"
            disabled={objs.nextBigData.length > 0 ? false : true}
          >
            <ReturnUpForwardSharp width="1.4em" height="1.4em" color="white" />
          </Button>
        </div>

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
            <Nav className="d-flex align-items-start justify-content-end flex-grow-1 text-white">
              <div className="d-flex justify-content-end align-items-center">
                <p className="text-white fw-semibold fontSemi m-auto mx-1">
                  Signed in as :
                  {auth.user?.username && (
                    <span
                      className="fw-light ms-1"
                      style={{ userSelect: "all" }}
                    >{` ~${auth.user.username}`}</span>
                  )}
                </p>
                <div className="mx-2" style={profile}></div>
              </div>
              <Link to="/signup" className="mx-1">
                <Button
                  variant="outline-light"
                  className="fontMini"
                  onClick={logoutHandler}
                >
                  Log out
                </Button>
              </Link>
            </Nav>
          </Offcanvas.Body>
        </Navbar.Offcanvas>
      </Container>
    </Navbar>
  );
};
