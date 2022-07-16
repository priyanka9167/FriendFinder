import React, { useCallback, useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getUserDetails } from '../../selectors/user';
import { Formik, Field, Form, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import { headerToken } from '../Firebase';
import { postComment } from '../../services/posts/postData';
import { getPostComments } from '../../services/posts/postData';




export default function Comments(props) {

    const [error, setError] = useState(null);
    const [comments_value, setCommentsValue] = useState(null);
    const InitialValues = {
        comments: ""
    }
    const id = props.post_id;
    const { authuser, user_details, authuser_details } = useSelector(state => getUserDetails(state));

    const image = user_details.image;
    const auth_image = authuser_details.image;

    const fetchPostComments = useCallback(async () => {
        try {
            let header = await headerToken();
            const response = await getPostComments(`/api/post/post_comments/${id}`, header);
            if (response?.data?.StatusCode === '0') {
                setCommentsValue(response?.data?.results?.rows);
                setError(null);
            }
            else {
                setError(response.data.msg);
            }
        }
        catch (error) {
            setError(error);
        }
    }, [id]);


    useEffect(() => {
        fetchPostComments();
    }, [id])

    return (
        <>
            {
                comments_value && comments_value.map((data, index) =>
                    <div className="post-comment" key={index}>
                        <img src={data.image} alt="" className="profile-photo-sm" />
                        <p><a href="timeline.html" className="profile-link">{data.username} </a><i className="em em-laughing"></i> {data.message} </p>
                    </div>
                )
            }
            <div className="post-comment post-input">
                <img src={auth_image} alt="" className="profile-photo-sm" />

                <Formik
                    initialValues={InitialValues}
                    validationSchema={Yup.object().shape({
                        comments: Yup.string().required('Comments is required'),
                    })}
                    onSubmit={async (values, { setSubmitting, resetForm }) => {
                        try {
                            const header = await headerToken();
                            const payload = {
                                id: authuser.uid,
                                comments: values.comments,
                                post_id: props.post_id
                            };
                            const response = await postComment('/api/post/commentpost', payload, header);
                            if (response.data.StatusCode === "0") {
                                const add_comments = {
                                    message: values.comments,
                                    username:authuser_details.username,
                                    image:authuser_details.image
                                }
                                setCommentsValue([...comments_value, add_comments]);
                                resetForm();
                               
                                setError(null);
                            }
                            else {
                                setError(response.data.msg)
                            }
                        }
                        catch (error) {
                            setError(error)
                        }
                    }}
                >
                    {({ setSubmitting }) => (
                        <Form>
                            <Field type="text" className="form-control" placeholder="Post a comment" name='comments' />
                            <ErrorMessage name='comments' component="div" className="error" />
                            <button type='submit' className='circle'>
                                <i className="fa fa-arrow-right" aria-hidden="true"></i>
                            </button>
                            {
                                error &&
                                <p>{error}</p>
                            }

                        </Form>
                    )}
                </Formik>
            </div>
        </>
    )
}
