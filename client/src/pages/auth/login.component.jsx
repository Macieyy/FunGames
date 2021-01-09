import React, { useState, useContext } from "react";
import AuthService from "../../services/AuthService";
import Message from "../../components/messages/message.component";
import { AuthContext } from "../../context/AuthContext";
import {
  Button,
  FormGroup,
  FormLabel,
  FormControl,
  Form,
} from "react-bootstrap";
import "./authPage.styles.css";
import { Link } from "react-router-dom";

const Login = (props) => {
  const [user, setUser] = useState({ username: "", password: "" });
  const [message, setMessage] = useState(null);
  const authContext = useContext(AuthContext);

  const onChange = (e) => {
    setUser({ ...user, [e.target.name]: e.target.value });
  };

  const onSubmit = (e) => {
    e.preventDefault();
    AuthService.login(user).then((data) => {
      const { isAuthenticated, user, message } = data;
      if (isAuthenticated) {
        authContext.setUser(user);
        authContext.setIsAuthenticated(isAuthenticated);
        props.history.push("/");
      } else setMessage(message);
    });
  };

  return (
    <div className="auth_form">
      <h2 className="text-center">Please login</h2>
      <form onSubmit={onSubmit}>
        <FormGroup controlId="username" bsSize="large">
          <FormLabel>Username</FormLabel>
          <FormControl
            name="username"
            type="text"
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
        <Button bsSize="large" type="submit">
          Login
        </Button>
        <Form.Text id="sign-up-link" muted>
          <Link to="/register">Create new account</Link>
        </Form.Text>
        {message ? <Message message={message} /> : null}
      </form>
    </div>
  );
};

export default Login;

// export default class LoginForm extends React.Component {
//   constructor(props) {
//     super(props);
//     this.state = {
//     };
//   }

//   render() {
//     return (
//       <div className="Login">
//         <form onSubmit={this.handleSubmit}>
//           <FormGroup controlId="email" bsSize="large">
//             <FormLabel>Email</FormLabel>
//             <FormControl
//               autoFocus
//               type="email"
//               value={this.state.email}
//               onChange={this.handleUsernameChange}
//             />
//           </FormGroup>
//           <FormGroup controlId="password" bsSize="large">
//             <FormLabel>Password</FormLabel>
//             <FormControl
//               value={this.state.password}
//               onChange={this.handlePasswordChange}
//               type="password"
//             />
//           </FormGroup>
//           <Button block bsSize="large" type="submit">
//             Login
//           </Button>
//           <Form.Text id="sign-up-link" muted>
//             <Link to="/register">Create new account</Link>
//           </Form.Text>
//         </form>
//       </div>
//     );
//   }
// }

// export default class LoginPage extends Component {
//   constructor(props) {
//     super(props);
//     this.state = { };

//   }

//   render() {

//     return (
//       <LoginForm />
//     );
//   }
// }
