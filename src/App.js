import React, { Fragment , Component} from "react";
import { Route, Redirect, Switch } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import jwt_decode from 'jwt-decode';

import Movies from "./components/movies.jsx";
import Customers from "./components/customers";
import MovieForm from './components/movieForm';
import Rentals from "./components/rentals";
import NotFound from "./components/notFound";
import NavBar from "./components/navBar.jsx";
import LoginForm from './components/loginForm';
import RegistrationForm from './components/registrationForm';
import Logout from "./components/logout.jsx";

import "react-toastify/dist/ReactToastify.css";
import "./App.css";


class App extends Component {
  state = {  }

  componentDidMount() {
    try{
      const jwt = localStorage.getItem("token");
      const user = jwt_decode(jwt);
      this.setState({ user });
    }
    catch(ex){}
  }
  render() { 
    return (
      <Fragment>
        <ToastContainer />
        <NavBar user={this.state.user}/>
        <main className="container">
          <Switch>
            <Route path="/login" component={LoginForm}></Route>
            <Route path="/register" component={RegistrationForm}></Route>
            <Route path="/logout" component={Logout}></Route>
            <Route path="/movies/:id" component={MovieForm}></Route>
            <Route path="/movies" component={Movies}></Route>
            <Route path="/customers" component={Customers}></Route>
            <Route path="/rentals" component={Rentals}></Route>
            <Route path="/not-found" component={NotFound}></Route>
            <Redirect from="/" exact to="/movies"></Redirect>
            <Redirect to="not-found" />
          </Switch>
        </main>
      </Fragment>
    );
  }
}
 
export default App;
