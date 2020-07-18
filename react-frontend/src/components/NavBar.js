import React from 'react';
import { Link } from 'react-router-dom';


import { Component } from 'react';
import {isLoggedIn} from '../authentication/auth';


class NavBar extends Component {


  render() {

    return (<nav className="navbar navbar-expand-lg navbar-dark fixed-top bg-dark">
      <Link className="navbar-brand" exact to="/" href=" # ">QA Engine App</Link>
      <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
        <span className="navbar-toggler-icon"></span>
      </button>
      <div className="collapse navbar-collapse" id="navbarNav">
        <ul className="navbar-nav">


          {!this.props.loggedIn &&
            <React.Fragment> <li className="nav-item">
              <Link className="nav-link" href=" # " to="/login" >Login</Link>
            </li>
              <li className="nav-item">
                <Link className="nav-link" href=" # " to="/register" >Register</Link>
              </li>
            </React.Fragment>}

          {this.props.loggedIn && 
          <React.Fragment>
          <li className="nav-item">
            <Link className="nav-link" href=" # " to="/" onClick={() => this.props.toggleState("signout")}>Signout</Link>
          </li>
          <li className="nav-item">
            <Link className="nav-link" href=" # " to="/">
              {/* Get name of logged in user and make first letter of name capital to display in Navigation Bar */}
            {isLoggedIn().user.name.charAt(0).toUpperCase() + isLoggedIn().user.name.slice(1)}'s Profile
              </Link>
          </li>
          <li className="nav-item">
            <Link className="nav-link" href=" # " to="/new/question">Ask Question!</Link>
          </li>
          </React.Fragment>}

        </ul>
      </div>
    </nav>
    )
  }
}


export default NavBar;