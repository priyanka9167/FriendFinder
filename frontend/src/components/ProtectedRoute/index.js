import React from "react";
import { useAuthListener } from "../Session";
import {  Outlet, Link } from "react-router-dom";
import { useFriends } from "../Friends";

const ProtectedRoute = () => {
  
    const { authuser, user_details, error } =  useAuthListener();
    console.log("inside protected route");
     useFriends(authuser,user_details);
    
   

    return (
        <>
            {
                
                authuser && user_details ?
                    <Outlet/>
                    :
                    <Link to='/account/register-login'>Please Register or Login</Link>
            }
        </>
    )
}

export default ProtectedRoute;