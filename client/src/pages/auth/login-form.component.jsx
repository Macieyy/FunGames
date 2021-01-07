import React from "react";
import {
  Button,
  FormGroup,
  FormLabel,
  FormControl,
  Form,
} from "react-bootstrap";
import "./login-form.styles.css";
import OktaAuth from "@okta/okta-auth-js";
import { withAuth } from "@okta/okta-react";
import { Link } from "react-router-dom";

class LoginForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      sessionToken: null,
      error: null,
      username: "",
      password: "",
    };

    this.oktaAuth = new OktaAuth({ url: props.baseUrl });

    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleUsernameChange = this.handleUsernameChange.bind(this);
    this.handlePasswordChange = this.handlePasswordChange.bind(this);
  }
  handleSubmit(event) {
    event.preventDefault();
    this.oktaAuth
      .signIn({
        username: this.state.username,
        password: this.state.password,
      })
      .then((res) =>
        this.setState({
          sessionToken: res.sessionToken,
        })
      )
      .catch((err) => {
        this.setState({
          error: "Your username or password is incorrect. Please try again.",
        });
        console.log(err.statusCode + " error", err.name);
      });
  }
  handleUsernameChange(e) {
    this.setState({ username: e.target.value });
  }

  handlePasswordChange(e) {
    this.setState({ password: e.target.value });
  }

  render() {
    if (this.state.sessionToken) {
      this.props.auth.redirect({ sessionToken: this.state.sessionToken });
      return null;
    }
    const errorMessage = this.state.error ? (
		<Form.Text id="error-msg" className="text-danger my-3">
		{this.state.error}
	  </Form.Text>
    ) : null;

    return (
      <div className="Login">
        <form onSubmit={this.handleSubmit}>
          <FormGroup controlId="email" bsSize="large">
            <FormLabel>Email</FormLabel>
            <FormControl
              autoFocus
              type="email"
              value={this.state.email}
              onChange={this.handleUsernameChange}
            />
          </FormGroup>
          <FormGroup controlId="password" bsSize="large">
            <FormLabel>Password</FormLabel>
            <FormControl
              value={this.state.password}
              onChange={this.handlePasswordChange}
              type="password"
            />
          </FormGroup>
		  {errorMessage}
          <Button block bsSize="large" type="submit">
            Login
          </Button>
          <Form.Text id="sign-up-link" muted>
            <Link to="/register">Create new account</Link>
          </Form.Text>
        </form>
      </div>
    );
  }
}
export default withAuth(LoginForm);
