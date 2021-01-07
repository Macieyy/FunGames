import React from "react";
import Home from "./pages/home/Home.component";
import LoginPage from "./pages/auth/login-page.component";
import PageNavbar from "./components/navbar/navbar.component";
import RegistrationForm from "./pages/auth/registration-form.component";
import "./App.css";
import { Route} from "react-router-dom";
import Cubes from "./pages/games/Cubes/Cubes.component"

function App() {
  return (
    <div className="App">
		        <PageNavbar />
      <main>


          <Route
		  exact
            path="/login"
            render={() => <LoginPage />}
          />
          <Route path="/register" component={RegistrationForm} />
          <Route path="/" exact component={Home} />
          <Route path="/cubes" exact component={Cubes} />

      </main>
    </div>
  );
}

export default App;
