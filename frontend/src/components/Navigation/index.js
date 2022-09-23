
import React, { Component } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getUserDetails } from "../../selectors/user";

import { Link } from 'react-router-dom';
import Logo from '../../assets/images/logo.png';
import SignOutButton from '../SignOut';

function Navigation() {

  const { authuser, user_details, authuser_details } = useSelector(state => getUserDetails(state));

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
             <Link to={`/`} params={{username:authuser_details.username}}><img src={Logo} alt="logo" /></Link>
            </div>

            <div className="navbar-header">
              {/* <button type="button" className="navbar-toggle collapsed" data-toggle="collapse" data-target="#bs-example-navbar-collapse-1" aria-expanded="false">
                <span className="sr-only">Toggle navigation</span>
                <span className="icon-bar"></span>
                <span className="icon-bar"></span>
                <span className="icon-bar"></span>
              </button> */}
             <SignOutButton/>
             <Link to={`/content/${authuser_details.username}`}>
             <img src={authuser_details.image} alt="" className="profile-photo-sm profile-image-nav" />

             </Link>
            </div>


         
          </div>
        </nav>
      </header>
    </>
  )
}




export default Navigation;









