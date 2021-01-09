// import React from "react";
// import {
//   Form,
//   FormControl,
//   FormLabel,
//   FormGroup,
//   Button,
// } from "react-bootstrap";
// import { Link } from "react-router-dom";

// export default class RegistrationForm extends React.Component {
//   constructor(props) {
//     super(props);

//     this.state = {
//     };
//   }

//   render() {
//     if (this.state.sessionToken) {
//       this.props.auth.redirect({ sessionToken: this.state.sessionToken });
//       return null;
//     }
//     // const errorMessage = this.state.error ? (
//     //   <div className="error-message input-feedback text-danger mt-3 text-center">
//     //     {this.state.error}
//     //   </div>
//     // ) : null;

//     return (
//       <div className="Login" onSubmit={this.handleSubmit}>
//         <form>
//           <FormGroup controlId="email" bsSize="large">
//             <FormLabel>Email</FormLabel>
//             <FormControl
//               autoFocus
//               type="email"
//               // value={this.state.email}
//               // onChange={this.handleEmailChange}
//             />
//           </FormGroup>
//           <FormGroup controlId="password" bsSize="large">
//             <FormLabel>Password</FormLabel>
//             <FormControl
//               value={this.state.password}
//               onChange={this.handlePasswordChange}
//               type="password"
//             />
//             <Form.Text id="passwordHelpBlock" muted>
//               Your password must be 8-20 characters long, contain at least one
//               lowercase, uppercase letter and digit, and must not contain
//               spaces, special characters, or emoji.
//             </Form.Text>
//           </FormGroup>
//           <Button block bsSize="large" type="submit">
//             Register
//           </Button>
//           <Form.Text id="sign-up-link" muted>
//             Already have an account? <Link to="/login">Login</Link>
//           </Form.Text>
//         </form>
//       </div>
//     );
//   }
// }

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
    </div>
  );
};

export default Register;
