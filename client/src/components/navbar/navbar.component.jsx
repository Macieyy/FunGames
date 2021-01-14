import React, { useContext } from "react";
import { Navbar, Nav, Button } from "react-bootstrap";
import { Link } from "react-router-dom";
import AuthService from "../../services/AuthService";
import { AuthContext } from "../../context/AuthContext";

const PageNavbar = (props) => {
  const { isAuthenticated, user, setIsAuthenticated, setUser } = useContext(
    AuthContext
  );

  const onClickLogoutHandler = () => {
    AuthService.logout().then((data) => {
      if (data.success) {
        setUser(data.user);
        setIsAuthenticated(false);
      }
    });
  };

  const unauthenticatedNavBar = () => {
    return (
      <>
        <Link className="ml-auto" to="/login">
          <Button variant="outline-info">Login</Button>
        </Link>
        <Link className="ml-2" to="register">
          <Button variant="outline-info">Register</Button>
        </Link>
      </>
    );
  };

  const authenticatedNavBar = () => {
    return (
      <>
        <Nav className="mr-auto">
          <Nav.Link href="/">Home</Nav.Link>
          <Nav.Link href="profile">Profile</Nav.Link>
        </Nav>
        <Navbar.Text className="mr-2">
          Signed in as: <Link to="profile">{user.username}</Link>
        </Navbar.Text>
        <Button variant="outline-info" onClick={onClickLogoutHandler}>
          Logout
        </Button>
      </>
    );
  };

  return (
    <Navbar bg="dark" variant="dark">
      <Navbar.Brand>FunGames</Navbar.Brand>
      {!isAuthenticated ? unauthenticatedNavBar() : authenticatedNavBar()}
    </Navbar>
  );
};

export default PageNavbar;
