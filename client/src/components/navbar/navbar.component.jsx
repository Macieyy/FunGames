import React from "react";
import { Navbar, Nav, Button } from "react-bootstrap";
import { Link } from "react-router-dom";

export default class PageNavbar extends React.Component {
    constructor(props) {
      super(props);
      this.state = {

      };

    }





    render() {
      return (
        <Navbar bg="dark" variant="dark">
          <Navbar.Brand href="/">Logo</Navbar.Brand>
          <Nav className="mr-auto">
            <Nav.Link href="/">Home</Nav.Link>
            <Nav.Link href="profile">Profile</Nav.Link>
          </Nav>
          <Navbar.Text className="mr-2">
      Signed in as: <a href="profile">Lukasz Maciej</a>
          </Navbar.Text>
          <Button
            variant="outline-info"
          >
            Log out
          </Button>
        </Navbar>)
      // ) : (
      //   <Navbar className="mb-5" bg="dark" variant="dark">
      //     <Nav className="mr-auto">
      //       <Nav.Link href="/"></Nav.Link>
      //       <Nav.Link href="profile"></Nav.Link>
      //     </Nav>
      //     <Link to="/login">
      //       <Button className="mx-3" variant="outline-info">
      //         Login
      //       </Button>
      //     </Link>
      //     <Link to="/register">
      //       <Button variant="outline-info">Register</Button>
      //     </Link>
      //   </Navbar>
      // );

}}
