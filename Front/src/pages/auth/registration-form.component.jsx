import React from "react";
import {
  Form,
  FormControl,
  FormLabel,
  FormGroup,
  Button,
} from "react-bootstrap";
import OktaAuth from "@okta/okta-auth-js";
import { withAuth } from "@okta/okta-react";
import { Link } from "react-router-dom";
import config from "../../app.config";

class RegistrationForm extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      firstName: "",
      lastName: "",
      email: "",
      password: "",
      sessionToken: null,
    };
    this.oktaAuth = new OktaAuth({ url: config.url });
    this.checkAuthentication = this.checkAuthentication.bind(this);
    this.checkAuthentication();

    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleFirstNameChange = this.handleFirstNameChange.bind(this);
    this.handleLastNameChange = this.handleLastNameChange.bind(this);
    this.handleEmailChange = this.handleEmailChange.bind(this);
    this.handlePasswordChange = this.handlePasswordChange.bind(this);
  }

  async checkAuthentication() {
    const sessionToken = await this.props.auth.getIdToken();
    if (sessionToken) {
      this.setState({ sessionToken });
    }
  }

  componentDidUpdate() {
    this.checkAuthentication();
  }

  handleFirstNameChange(e) {
    this.setState({ firstName: e.target.value });
  }

  handleLastNameChange(e) {
    this.setState({ lastName: e.target.value });
  }

  handleEmailChange(e) {
    this.setState({ email: e.target.value });
  }

  handlePasswordChange(e) {
    this.setState({ password: e.target.value });
  }

  handleSubmit(e) {
    e.preventDefault();
    fetch("/api/users", {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify(this.state),
    })
      .then(() => {
        this.oktaAuth
          .signIn({
            username: this.state.email,
            password: this.state.password,
          })
          .then(
            (res) =>
              this.setState({
                sessionToken: res.sessionToken,
              }),
            (error) => {
              if (error) {
                this.setState({
                  error: "Error",
                });
                console.log(" error", error.name);
              }
            }
          );
      })
      .catch((err) => {
        this.setState({
          error: `{${err.statusCode} error ${err.name}}`,
        });
      });
  }

  render() {
    if (this.state.sessionToken) {
      this.props.auth.redirect({ sessionToken: this.state.sessionToken });
      return null;
    }
    // const errorMessage = this.state.error ? (
    //   <div className="error-message input-feedback text-danger mt-3 text-center">
    //     {this.state.error}
    //   </div>
    // ) : null;

    return (
      <div className="Login" onSubmit={this.handleSubmit}>
        <form>
          <FormGroup controlId="email" bsSize="large">
            <FormLabel>Email</FormLabel>
            <FormControl
              autoFocus
              type="email"
              value={this.state.email}
              onChange={this.handleEmailChange}
            />
          </FormGroup>
          <FormGroup controlId="firstName" bsSize="large">
            <FormLabel>First Name</FormLabel>
            <FormControl
              type="text"
              value={this.state.firstName}
              onChange={this.handleFirstNameChange}
            />
          </FormGroup>
          <FormGroup controlId="lastName" bsSize="large">
            <FormLabel>Last Name</FormLabel>
            <FormControl
              type="text"
              value={this.state.lastName}
              onChange={this.handleLastNameChange}
            />
          </FormGroup>
          <FormGroup controlId="password" bsSize="large">
            <FormLabel>Password</FormLabel>
            <FormControl
              value={this.state.password}
              onChange={this.handlePasswordChange}
              type="password"
            />
            <Form.Text id="passwordHelpBlock" muted>
              Your password must be 8-20 characters long, contain at least one
              lowercase, uppercase letter and digit, and must not contain
              spaces, special characters, or emoji.
            </Form.Text>
          </FormGroup>
          <Button block bsSize="large" type="submit">
            Register
          </Button>
          <Form.Text id="sign-up-link" muted>
            Already have an account? <Link to="/login">Login</Link>
          </Form.Text>
        </form>
      </div>
    );
  }
}
export default withAuth(RegistrationForm);
