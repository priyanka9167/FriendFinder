import React, { Component } from 'react';
import {  Link } from 'react-router-dom';
import { compose } from 'recompose';
import UserImage from '../../assets/images/users/user-1.jpg';
import { editPostWithID } from '../../services/posts/postData';
import { headerToken } from '../Firebase';
import LikesDislikes from '../LikesDislikesComponent';
import { Formik, Field, Form, ErrorMessage } from 'formik';
import { Modal, Button } from 'react-bootstrap';
import * as Yup from 'yup';


class EditPost extends Component {
    constructor(props) {
        super(props)
    }

  

    render() {
        const { modal_show, modal_data, edit_data, post_data , cancel_edit , handle_show,edit_message ,delete_post,user_details} = this.props;
        console.log("edit data",this.props.authuser.uid === this.props.user_details.id)

        return (
            <>
                <Modal show={modal_show}
                    onHide={this.props.closeModal}
                >
                    <Modal.Header closeButton>

                    </Modal.Header>
                    <Modal.Body >
                        <div className="post-content">

                            <img src={modal_data.imageurl} alt="post-image" className="img-responsive post-image" onClick={this.handleClose} />
                            <div className="post-container">
                                <img src={this.props.user_details.image} alt="user" className="profile-photo-md pull-left" />
                                <div className="post-detail">
                                    <div className="user-info">
                                        <h5><a href="timeline.html" className="profile-link">{this.props.user_details.name}</a> </h5>
                                    </div>
                                  <LikesDislikes post_details={modal_data}/>
                                    <div className="line-divider"></div>

                                    {
                                        edit_data ?
                                            <>
                                                <Formik
                                                    initialValues={{
                                                        message: modal_data.message
                                                    }}
                                                    validationSchema={Yup.object().shape({
                                                        message: Yup.string()
                                                            .required('Message is required'),

                                                    })}
                                                    onSubmit={async (fields) => {
                                                        console.log(fields)
                                                        try {
                                                            var message = fields.message;
                                                            var id = modal_data.id;
                                                            const payload = {
                                                                message,
                                                                id
                                                            }
                                                            var header = headerToken();
                                                            var res = await editPostWithID('/api/post/editpost/:id', payload, header);
                                                            console.log("edit re",res)
                                                            if (res.data.StatusCode === "0") {
                                                              edit_message(fields.message,id);  
                                                            }

                                                        }
                                                        catch (e) {
                                                            console.log(e)
                                                        }
                                                    }}
                                                    render={({ values, errors, status, touched, handleChange }) => (
                                                      console.log("inside formik",this.props),
                                                        <Form>
                                                            <div className="form-group">
                                                                <Field as="textarea"  values={modal_data.message} name="message" id="exampleTextarea" cols="30" rows="1" className="form-control" />
                                                                <ErrorMessage name="message" component="div" className="invalid-feedback"></ErrorMessage>
                                                            </div>
                                                            <Button type="submit" variant="primary" className="pull-right" style={{ margin: "10px 0" }}>
                                                                Submit
                                                                    </Button>
                                                            <Button variant="primary" className="pull-right" style={{ margin: "10px" }} onClick={() => this.props.cancel_edit()}>
                                                                Cancel
                                                                    </Button>
                                                        </Form>
                                                    )}
                                                />
                                            </>
                                            :
                                            <div className="post-text">
                                                <p>{modal_data.message}</p>
                                            </div>
                                    }

                                    <div className="line-divider"></div>
                                </div>
                            </div>
                        </div>
                    </Modal.Body>
                    {
                        (this.props.authuser.uid === this.props.user_details.id) &&
                         <Modal.Footer>
                         <Button variant="primary" onClick={() => this.props.edit_post(modal_data.id)}>
                             Edit
                         </Button>
                         <Button variant="primary" onClick={() => this.props.delete_post(modal_data.id)}>
                             Delete
                         </Button>
                     </Modal.Footer>
                    }
                   
                </Modal>
            </>

        )
    }
}

export default (EditPost)