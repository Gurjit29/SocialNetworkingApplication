import React from 'react';
import { Link } from 'react-router-dom';

import {SignOut, isLoggedIn} from '../authentication/auth';
import { Component } from 'react';


class NavBar extends Component {

  // constructor(){
  //   super();
  //   this.state=({
  //     loggedIn:isLoggedIn()
  //   })
  // }

  // toggleState = (name) => {

  //   if(name =="signout"){
  //     SignOut();
  //   }
  //   this.setState({
  //     loggedIn:!this.state.loggedIn
  //   })
  // }

  render() {

   
    return  ( <nav className="navbar navbar-expand-lg navbar-dark fixed-top bg-dark">
<Link className="navbar-brand" exact to="/" href= " # ">QA Engine App</Link>
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
    <Link  className="nav-link" href=" # " to="/register" >Register</Link>
    </li>
   </React.Fragment> }

   {this.props.loggedIn && <li className="nav-item">
    <Link  className="nav-link" href=" # " to="/" onClick={() => this.props.toggleState("signout")}>Signout</Link>
   </li> }
    
  </ul>
</div>
</nav>
    )
  }
}


export default NavBar;