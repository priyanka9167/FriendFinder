import React, { useState } from 'react'
import RegisterPage from './RegisterPage';
import LoginPage from './LoginPage';

export default function RegisterLogin() {

    const[Tabs, setTabs] = useState('register')
    return (
        <div id="lp-register">
            <div className="container wrapper">
                <div className="row">
                    <div className="col-sm-5">
                        <div className="intro-texts">
                            <h1 className="text-white">Make Cool Friends !!!</h1>
                            <p>Friend Finder is a social network template that can be used to connect people. The template offers Landing pages, News Feed, Image/Video Feed, Chat Box, Timeline and lot more. <br /> <br />Why are you waiting for? Buy it now.</p>
                            <button className="btn btn-primary">Learn More</button>
                        </div>
                    </div>
                    <div className="col-sm-6 col-sm-offset-1">
                        <div className="reg-form-container">
                            {/* <!-- Register/Login Tabs--> */}
                            <div className="reg-options">
                                <ul className="nav nav-tabs">
                                    <li className={`${Tabs === 'register' ? 'active' : ''}`}  onClick={() => setTabs('register')}><a  data-toggle="tab">Register</a></li>
                                    <li className={`${Tabs === 'login' ? 'active' : ''}`}><a data-toggle="tab" onClick={() => setTabs('login')}>Login</a></li>
                                </ul>
                            </div>
                            {/* <!--Tabs End--> */}
                       
                        <div className="tab-content">
                            {
                                (Tabs === 'register') &&  <RegisterPage /> 
                            }
                            {
                               (Tabs === 'login') && <LoginPage />
                            }
                           
                            
                        </div>
                        </div>
                    </div>
                </div>
             
            </div>
        </div>
    )
}
