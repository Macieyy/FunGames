import React from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import PrivateRoute from "./hocs/PrivateRoute";
import UnprivateRoute from "./hocs/UnprivateRoute";
import Home from "./pages/home/Home.component";
import Login from "./pages/auth/login.component";
import PageNavbar from "./components/navbar/navbar.component";
import Leaderboard from "./components/leaderboards/profile_leaderboard.component";
import Register from "./pages/auth/register.component";

//games
import Cubes from "./pages/games/Cubes/Cubes.component";
import Snake from "./pages/games/Snake/Snake.component";
import AvoidTheDot from "./pages/games/Avoid_the_dot/Avoid_the_dot.component";

function App() {
  return (
    <Router basename="/">
      <div className="App">
        <PageNavbar />

        <Switch>
          <Route path="/login" exact component={Login} />
          <Route path="/register" exact component={Register} />
          <PrivateRoute path="/" exact component={Home} />
          <PrivateRoute path="/profile" exact component={Leaderboard} />
          <PrivateRoute path="/cubes" exact component={Cubes} />
          <PrivateRoute path="/snake" exact component={Snake} />
          <PrivateRoute path="/avoid_the_dot" exact component={AvoidTheDot} />
        </Switch>
      </div>
    </Router>
  );
}

export default App;
