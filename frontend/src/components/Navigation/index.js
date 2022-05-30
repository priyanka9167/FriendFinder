
import React, { Component } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getUserDetails } from "../../selectors/user";

import { Link } from 'react-router-dom';
import Logo from '../../assets/images/logo.png';
import SignOutButton from '../SignOut';

function Navigation() {

  const { authuser, user_details } = useSelector(state => getUserDetails(state));

  return (
    <>
      <header id="header">
        <nav className="navbar navbar-default navbar-fixed-top menu">
          <div className="container">


            <div className="navbar-header">
              {/* <button type="button" className="navbar-toggle collapsed" data-toggle="collapse" data-target="#bs-example-navbar-collapse-1" aria-expanded="false">
                <span className="sr-only">Toggle navigation</span>
                <span className="icon-bar"></span>
                <span className="icon-bar"></span>
                <span className="icon-bar"></span>
              </button> */}
              <a className="navbar-brand" href="index.html"><img src={Logo} alt="logo" /></a>
            </div>

            <div className="navbar-header">
              {/* <button type="button" className="navbar-toggle collapsed" data-toggle="collapse" data-target="#bs-example-navbar-collapse-1" aria-expanded="false">
                <span className="sr-only">Toggle navigation</span>
                <span className="icon-bar"></span>
                <span className="icon-bar"></span>
                <span className="icon-bar"></span>
              </button> */}
             <SignOutButton/>
             <Link to={`/content/${authuser.uid}`}><button className="btn btn-primary">Profile</button></Link>
            </div>


         
          </div>
        </nav>
      </header>
    </>
  )
}




export default Navigation;









