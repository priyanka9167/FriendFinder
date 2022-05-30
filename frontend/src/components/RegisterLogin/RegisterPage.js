import React, { useState } from 'react';
import { Formik, Field, Form, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import { doCreateUserWithEmailAndPassword, headerToken } from '../Firebase';
import { userRegistration } from '../../services/User/userData';

const RegisterSchema = Yup.object().shape({
    name: Yup
        .string()
        .required('Please enter firstname'),
    username: Yup
        .string()
        .required('Please enter username'),
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
    confirm_password: Yup
        .string()
        .required("Please confirm your password")
        .oneOf([Yup.ref('password'), null], "Passwords don't match."),
});

export default function RegisterPage(props) {
    const InitialValues = {
        name: '',
        username: '',
        email: '',
        password: '',
        confirm_password: '',
    }
    const [error, setError] = useState(null);

    return (
        <>
            {/* <!--Registration Form Contents--> */}
           
                <div className="tab-pane active" id="register">
                    <h3>Register Now !!!</h3>
                    <p className="text-muted">Be cool and join today. Meet millions</p>

                    {/* <!--Register Form--> */}
                    <Formik
                        initialValues={InitialValues}
                        validationSchema={RegisterSchema}
                        onSubmit={async (values, { setSubmitting,resetForm }) => {
                            try {
                                const email = values.email;
                                const password = values.password;
                                const authUser = await doCreateUserWithEmailAndPassword(email, password);
                                console.log(authUser);
                                const payload = {
                                    id: authUser.user.uid,
                                    name: values.name,
                                    username: values.username,
                                    email: values.email,
                                    password: values.password
                                }
                                let header = await headerToken();
                                let response = await userRegistration('/api/users/sign-up', payload, header);
                                console.log('response', response, payload);
                                if (response.data.StatusCode === '0') {
                                    setError(null);
                                    resetForm();
                                }
                                else {
                                    setError(response.data.msg)
                                }
                            }
                            catch (err) {
                                setError(err.message)
                            }
                        }}
                    >
                        {({ setSubmitting }) => (
                            <Form name="registration_form" id="registration_form" className="form-inline">
                                <div className="row">

                                    <div className="form-group col-xs-12">
                                        <label htmlFor="name" className="sr-only">Name</label>
                                        <Field id="name" className="form-control input-group-lg" type="text" name="name" title="Enter Name" placeholder="Name" />
                                        <ErrorMessage name='name' component="div" className="invalid-feedback" />

                                    </div>
                                </div>
                                <div className="row">
                                    <div className="form-group col-xs-12">
                                        <label htmlFor="username" className="sr-only">Username</label>
                                        <Field id="username" className="form-control input-group-lg" type="text" name="username" title="Enter Username" placeholder="Your Username" />
                                        <ErrorMessage name='username' component="div" className="invalid-feedback" />

                                    </div>
                                </div>
                                <div className="row">
                                    <div className="form-group col-xs-12">
                                        <label htmlFor="email" className="sr-only">Email</label>
                                        <Field id="email" className="form-control input-group-lg" type="text" name="email" title="Enter Email" placeholder="Your Email" />
                                        <ErrorMessage name='email' component="div" className="invalid-feedback" />

                                    </div>
                                </div>
                                <div className="row">
                                    <div className="form-group col-xs-12">
                                        <label htmlFor="password" className="sr-only">Password</label>
                                        <Field id="password" className="form-control input-group-lg" type="password" name="password" title="Enter password" placeholder="Password" />
                                        <ErrorMessage name='password' component="div" className="invalid-feedback" />

                                    </div>
                                </div>
                                <div className="row">
                                    <div className="form-group col-xs-12">
                                        <label htmlFor="confirm_password" className="sr-only">Confirm Password</label>
                                        <Field id="confirm_password" className="form-control input-group-lg" type="password" name="confirm_password" title="Enter confirm password" placeholder="confirm password" />
                                        <ErrorMessage name='confirm_password' component="div" className="invalid-feedback" />

                                    </div>
                                </div>

                                <button type='submit' className="btn btn-primary">Register Now</button>
                                {
                                    error && <p>{error}</p>
                                }
                            </Form>
                        )}

                    </Formik>
                    {/* <!--Register Now Form Ends--> */}
                    
                </div>
                {/* !--Registration Form Contents Ends--> */}
            
        </>

    )
}
