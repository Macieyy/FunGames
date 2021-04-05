import React from "react";
import loadable from '@loadable/component'
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import PrivateRoute from "./hocs/PrivateRoute";
import PageNavbar from "./components/navbar/navbar.component";

const Home = loadable(() => import('./pages/home/Home.component'))
const Login = loadable(() => import('./pages/auth/login.component'))
const Register = loadable(() => import('./pages/auth/register.component'))
const Leaderboard = loadable(() => import('./components/leaderboards/profile_leaderboard.component'))
const Cubes = loadable(() => import('./pages/games/Cubes/Cubes.component'))
const Snake = loadable(() => import('./pages/games/Snake/Snake.component'))
const CatchTheBall = loadable(() => import('./pages/games/Catch_the_ball/Catch_the_ball'))

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
          <PrivateRoute path="/catch_the_ball" exact component={CatchTheBall} />
        </Switch>
      </div>
    </Router>
  );
}

export default App;
