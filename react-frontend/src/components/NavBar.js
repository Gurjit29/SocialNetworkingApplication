import React from 'react';
import { Link } from 'react-router-dom';




const NavBar = () => {
    return <nav className="navbar navbar-expand-lg navbar-dark fixed-top bg-dark">
<Link className="navbar-brand" exact to="/" href= " # ">QA Engine App</Link>
<button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
  <span className="navbar-toggler-icon"></span>
</button>
<div className="collapse navbar-collapse" id="navbarNav">
  <ul className="navbar-nav">
   
    <li className="nav-item">
    <Link className="nav-link" href=" # " to="/login">Login</Link>
    </li>
    <li className="nav-item">
    <Link  className="nav-link" href=" # " to="/register">Register</Link>
    </li>
    
  </ul>
</div>
</nav>
}


export default NavBar;