import React from "react";
import { BrowserRouter as Router, Route } from "react-router-dom";
import Home from "./pages/home/Home.component";
import Login from "./pages/auth/login.component";
import PageNavbar from "./components/navbar/navbar.component";
import Register from "./pages/auth/register.component";
import Cubes from "./pages/games/Cubes/Cubes.component";


function App() {

  return (
    <Router basename='/'>
      <div className="App">
        <PageNavbar />
        <main>
          <Route path="/login" component={Login} />
          <Route path="/register" component={Register} />
          <Route exact path="/" component={Home} />
          <Route path="/cubes" exact component={Cubes} />
        </main>
      </div>
    </Router>
  );
}

export default App;
