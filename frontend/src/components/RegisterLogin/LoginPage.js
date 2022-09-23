import React, { useState } from 'react';
import { Formik, Field, Form, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import { doSignInWithEmailAndPassword, headerToken } from '../Firebase';
import { userLoggedIn } from '../../services/User/userData';
import { useNavigate } from 'react-router-dom';

export default function LoginPage() {
  const InitialValues = {
    email: '',
    password: '',
  }
  const [error, setError] = useState(null);

  const navigate = useNavigate();

  const LoginSchema = Yup.object().shape({
    email: Yup
      .string()
      .required('Please enter email address')
      .matches(/^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
        "Email entered is incorrect"
      ),
    password: Yup
      .string()
      .required("Please enter password")
      .matches(/^.*(?=.{8,})((?=.*[!@#$%^&*()\-_=+{};:,<.>]){1})(?=.*\d)((?=.*[a-z]){1})((?=.*[A-Z]){1}).*$/,
        "Password must contain at least 8 characters, one uppercase, one number and one special case character"),

  });

  return (
    <>
      {/* <!--Login--> */}
      <div className="tab-pane active" id="login">
        <h3>Login</h3>
        <p className="text-muted">Log into your account</p>

        {/* <!--Login Form--> */}
        <Formik
          initialValues={InitialValues}
          validationSchema={LoginSchema}
          onSubmit={async (values, { setSubmitting, resetForm }) => {
            try {
              const email = values.email;
              const password = values.password;
              const authUser = await doSignInWithEmailAndPassword(email, password);
              const payload = {
                email: values.email,
                password: values.password
              }
              let header = await headerToken();
              let response = await userLoggedIn('/api/users/sign-in', payload, header);
              console.log('response login', response);
              if (response.data.StatusCode === '5') {
                setError(null);
                resetForm();
                console.log("login",authUser)
                let username = response.data.username
                navigate(`/content/${username}`)
              }
              else {
                console.log("else")
                setError(response.data.msg)
              }
            }
            catch (err) {
              console.log("logged in error", err)
              setError(err.message)
            }
          }}
        >
          {({ setSubmitting }) => (
            <Form name="Login_form" id="Login_form" className="form-inline">
              <div className="row">
                <div className="form-group col-xs-12">
                  <label htmlFor="email" className="sr-only">Email</label>
                  <Field id="email" className="form-control input-group-lg" type="text" name="email" title="Enter Email" placeholder="Your Email" />
                  <ErrorMessage name='email' component="div" className="error" />
                </div>
              </div>
              <div className="row">
                <div className="form-group col-xs-12">
                  <label htmlFor="password" className="sr-only">Password</label>
                  <Field id="password" className="form-control input-group-lg" type="password" name="password" title="Enter password" placeholder="Password" />
                  <ErrorMessage name='password' component="div" className="error" />
                </div>
              </div>
              <button type='submit' className="btn btn-primary">Login Now</button>
              {
                error && <p>{error}</p>
              }
            </Form>
          )}

        </Formik>
        {/* !--Login Form Ends-->  */}


      </div>
    </>
  )
}
