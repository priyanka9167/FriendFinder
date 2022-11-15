import React, { useState, useRef } from 'react';
import Navigation from '../Navigation';
import TImelineHeader from '../TimeLine/TImelineHeader';
import * as Yup from 'yup';
import { headerToken } from '../Firebase';
import { Formik, Field, Form, ErrorMessage } from 'formik';
import { PostData } from '../../services/posts/postData'
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { getUserDetails } from '../../selectors/user';



function CreatePost(props) {

    const [preview, setPreview] = useState({
        previewTab: false,
        showPreviewContent: false
    });

    const [postUpdate, setPostUpdate] = useState({
        thankyouTabs: false,
        error: null
    })

    const [previewData, setPreviewData] = useState({
        message: "",
        image_url: ""
    });

    const fileimage_ref = useRef();

    const InitialValues = {
        caption: "",
        image_file: ""
    }


    const FILE_SIZE = 16000 * 1024;
    const SUPPORTED_FORMATS = [
        "image/jpg",
        "image/jpeg",
        "image/gif",
        "image/png"
    ];

    const { authuser, user_details, authuser_details } = useSelector(state => getUserDetails(state));


    const PostValidation = Yup.object().shape({
        caption: Yup
            .string()
            .required('Please enter caption'),
        image_file: Yup
            .mixed()
            .required('A file is required')
            .test(
                "fileSize",
                "File too large",
                value =>
                    value && fileimage_ref.current.files[0].size <= FILE_SIZE
            )
            .test(
                "fileFormat",
                "Unsupported Format",
                value => value && SUPPORTED_FORMATS.includes(fileimage_ref.current.files[0].type)
            )
    });



    const changeValue = (fields) => {
        if (fields.image_file !== "" && fields.caption !== "") {
            setPreviewData({ message: fields.caption, image_url: URL.createObjectURL(fileimage_ref.current.files[0]) })
        }
    }

    const convertImage = (file) => {
        console.log("convert image", file)
        return new Promise(resolve => {
            let baseURL = "";
            // Make new FileReader
            let reader = new FileReader();
            // Convert the file to base64 text
            reader.readAsDataURL(file);
            // on reader load somthing...
            reader.onload = () => {
                // Make a fileInfo Object
                console.log("Called", reader);
                baseURL = reader.result;
                resolve(baseURL);
            };

        });
    }




    return (

        <>
            <Navigation />
            <div className="container">
                <div className="timeline">
                    <div className="timeline-cover">
                        <TImelineHeader />
                    </div>
                    <div id="page-contents">
                        <div className="row">
                            <div className="col-md-3"></div>
                            <div className="col-md-7">

                                <div className="create-post">
                                    <div className="row">
                                        <Formik
                                            initialValues={InitialValues}
                                            validationSchema={PostValidation}

                                            onSubmit={async (fields, { resetForm: reset }) => {
                                                try {
                                                    if (preview.previewTab) {
                                                        setPreview({ ...preview, showPreviewContent: true })
                                                        changeValue(fields);
                                                    }
                                                    else {

                                                        setPreview({ ...preview, showPreviewContent: false });
                                                        const base64_image = await convertImage(fileimage_ref.current.files[0]);
                                                        const payload = {
                                                            id: authuser_details.id,
                                                            message: fields.caption,
                                                            image: base64_image
                                                        }
                                                        let header = await headerToken();
                                                        let response = await PostData('/api/post/add-post', payload, header);
                                                        console.log("response", response)
                                                        if (response?.data?.StatusCode === '0') {
                                                            reset();
                                                            setPostUpdate({ thankyouTabs: true, error: null });
                                                            setTimeout(() => {
                                                                setPostUpdate({ thankyouTabs: false, error: null })
                                                            }, 5000)


                                                        }
                                                        else {
                                                            setPreview({
                                                                previewTab: false,
                                                                showPreviewContent: false
                                                            })
                                                            setPostUpdate({ thankyouTabs: false, error: response.data.msg })
                                                        }

                                                    }
                                                }
                                                catch (Error) {
                                                    console.log("err", Error)
                                                    setPreview({
                                                        previewTab: false,
                                                        showPreviewContent: false
                                                    });
                                                    setPostUpdate({ thankyouTabs: false, error: Error });
                                                }
                                            }}

                                        >
                                            {() => (

                                                <>
                                                    <Form name="registration_form" id="registration_form" className="form-inline">
                                                        <div className="col-md-6 col-sm-7">
                                                            <div className="form-group">
                                                                <img src={authuser_details.image} alt="" className="profile-photo-md" />
                                                                <Field component="textarea" id="caption" className="form-control input-group-lg" type="text" name="caption" title="Enter Caption" placeholder="Your Caption" />
                                                            </div>
                                                            <ErrorMessage name='caption' component="div" className="error" />
                                                        </div>
                                                        <div className="col-md-6 col-sm-5">
                                                            <div className="tools">
                                                                <ul className="publishing-tools list-inline">
                                                                    <Field id='image_file' innerRef={fileimage_ref} name='image_file' className="ion-compose" type='file'>
                                                                    </Field>
                                                                    <ErrorMessage name='image_file' component="div" className="error" />
                                                                </ul>
                                                                <button type='submit' className="btn btn-primary pull-right" onClick={() => setPreview({ ...preview, previewTab: false })}>Publish</button>
                                                                <button type='submit' onClick={() => setPreview({ ...preview, previewTab: true })} className="btn btn-primary pull-right">Preview</button>

                                                            </div>
                                                        </div>
                                                    </Form>

                                                </>
                                            )}

                                        </Formik>

                                    </div>
                                </div>
                                {

                                    (preview.showPreviewContent && !postUpdate.thankyouTabs) &&
                                    <div className="post-content" >
                                        <img src={previewData.image_url} alt="post-image" className="img-responsive post-image" />
                                        <div className="post-container">
                                            <img src={authuser_details.image} alt="user" className="profile-photo-md pull-left" />
                                            <div className="post-detail">
                                                <div className="user-info">
                                                    <h5><a href="timeline.html" className="profile-link">Sarah Cruiz</a> <span className="following">following</span></h5>

                                                </div>
                                                <div className="reaction">
                                                    <a className="btn text-green"><i className="icon ion-thumbsup"></i> 0</a>
                                                    <a className="btn text-red"><i className="fa fa-thumbs-down"></i> 0</a>
                                                </div>
                                                <div className="line-divider"></div>
                                                <div className="post-text">
                                                    <p>{previewData.message}<i className="em em-anguished"></i> <i className="em em-anguished"></i> <i className="em em-anguished"></i></p>
                                                </div>
                                                <div className="line-divider"></div>
                                            </div>
                                        </div>

                                    </div>
                                }
                                {

                                    (postUpdate.thankyouTabs && !preview.showPreviewContent && postUpdate.error === null) &&

                                    <div className='post-updated'>

                                        <h1>Post Updated</h1>

                                    </div>
                                }



                            </div>

                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}





export default CreatePost;
