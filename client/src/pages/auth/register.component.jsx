import React, { useState, useRef, useEffect } from "react";
import AuthService from "../../services/AuthService";
import Message from "../../components/messages/message.component";
import {
  Button,
  FormGroup,
  FormLabel,
  FormControl,
  Form,
} from "react-bootstrap";
import "./authPage.styles.css";
import { Link } from "react-router-dom";

const Register = (props) => {
  const [user, setUser] = useState({ username: "", password: "" });
  const [message, setMessage] = useState(null);
  let timerID = useRef(null);

  const onChange = (e) => {
    setUser({ ...user, [e.target.name]: e.target.value });
  };

  useEffect(() => {
    return () => {
      clearTimeout(timerID);
    };
  }, []);

  const resetForm = () => {
    setUser({ username: "", password: "" });
  };

  const onSubmit = (e) => {
    e.preventDefault();
    AuthService.register(user).then((data) => {
      const { message } = data;
      setMessage(message);
      resetForm();
      if (!message.msgError) {
        timerID = setTimeout(() => {
          props.history.push("/login");
        }, 2000);
      }
    });
  };

  return (
    <div className="auth_form">
      <h2 className="text-center">Please register</h2>
      <form onSubmit={onSubmit}>
        <FormGroup controlId="username" bsSize="large">
          <FormLabel>Username</FormLabel>
          <FormControl
            name="username"
            type="text"
            value={user.username}
            onChange={onChange}
            placeholder="Enter username"
          />
        </FormGroup>
        <FormGroup controlId="password" bsSize="large">
          <FormLabel>Password</FormLabel>
          <FormControl
		  	name="password"
            onChange={onChange}
            type="password"
            placeholder="Enter password"
          />
        </FormGroup>
        <Button block bsSize="large" type="submit">
          Register
        </Button>
        <Form.Text id="sign-in-link" muted>
          Already have an account? <Link to="/login">Login</Link>
        </Form.Text>
        {message ? <Message message={message} /> : null}
      </form>
      <a
          style={{ position: "fixed", bottom: "0", right: "0", color: "white" }}
          href="https://www.freepik.com/vectors/star"
        >
          Star vector created by upklyak - www.freepik.com
        </a>
    </div>
  );
};

export default Register;
