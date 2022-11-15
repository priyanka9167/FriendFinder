import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { Formik, Field, Form, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import { doFetchUserDetails, doFetchErrorUser, doFetchUserFriendStatus, doFetchFriendStatusError, doFetchAuthUserDetails } from '../../action-initiators/simpleAction';
import { connect } from 'react-redux';
import { getUserDetails, getFetchError } from '../../selectors/user';
import { getFriendStatus, getFriendStatusError } from '../../selectors/friends';
import { updateUserProfile, addUserFriend } from '../../services/User/userData';
import { headerToken } from '../Firebase';
import { useFriends } from '../Friends';
import { useFollowers } from '../Followers';
import { compose } from 'recompose';





const FILE_SIZE = 1000 * 1024;
const SUPPORTED_FORMATS = [
    "image/jpg",
    "image/jpeg",
    "image/gif",
    "image/png"
];
const validationSchema = Yup.object().shape({
    file_image: Yup.mixed()
        .required()
        .test(
            "fileSize",
            "File too large",
            (value) => value && value.size <= FILE_SIZE

        )
        .test(
            "fileFormat",
            "Unsupported Formats",
            value => value && SUPPORTED_FORMATS.includes(value.type)
        ),
});




class TImelineHeader extends Component {
    constructor(props) {
        super(props)
        this.state = {
            file_profile: '',
            imagePreviewUrl_profile: this.props.user_details.image,
            error_profile: null,
            userdata: this.props.user_details,
            status: this.props.friend_status,
            error_friend_status: this.props.friend_error
        }
        console.log("inisde timeline constructor", this.props);

    }


    componentDidUpdate(prevProps, prevState) {
        if (prevProps !== this.props) {
            this.setState({
                imagePreviewUrl_profile: this.props.user_details.image,
                userdata: this.props.user_details,
                status: this.props.friend_status,
                error_friend_status: this.props.friend_error
            })
        }

    }


    changeFile_profile = async (e) => {
        e.preventDefault();
        try {
            let reader = new FileReader();
            let file = e.target.files[0];
            if (file) {
                reader.onloadend = async () => {
                    let id = this.props.user_details.id;
                    let username = this.props.user_details.username;
                    var header = await headerToken();
                    var payload = { id: id, image_url: reader.result }
                    var response = await updateUserProfile('/api/users/update_profile', payload, header);
                    if (response?.data?.StatusCode === '0') {
                        this.props.onFetchUserDetails(this.props.authuser, { username: username }, header);
                        this.props.onFetchAuthUserDetails(this.props.authuser, { username: username }, header);
                        this.setState({
                            file_profile: file,
                            imagePreviewUrl_profile: reader.result,
                            error_profile: null
                        });


                        // await this.props.getuserdata(this.props.authuser);
                        // console.log("authenication get user data run")
                    }
                    else {
                        this.props.onFetchUserError(response.data.msg);
                        this.setState({ error_profile: response.data.msg })
                    }

                }
                reader.readAsDataURL(file)
            }
        }
        catch (e) {
            this.setState({ error_profile: e })
        }
    }

    addFriend = async () => {
        try {
            let source_id = this.props.authuser.uid;
            let target_id = this.props.user_details.id;
            const header = await headerToken();
            const payload = {
                source: source_id,
                target: target_id
            };
            const params = {
                auth_id: source_id,
                user_id: target_id
            }

            let response = await addUserFriend(`/api/users/add-friend`, payload, header);
            if (response?.data?.StatusCode === '0') {
                this.props.onFetchUserFriendStatus(params, header);
                this.setState({ status: true })
            }
            else {
                this.props.onFetchUserFriendStatusError(response?.data?.msg);
                this.setState({ friend_error: response?.data?.msg });
            }

        }
        catch (error) {
            this.props.onFetchUserFriendStatusError(error);
            this.setState({ friend_error: error })
        }

    }

    render() {
        console.log("timeheader", this.props)
        console.log("timeline header status", this.state, this.props.friend_status)
        return (
            <>

                {
                    this.props.authuser.uid === this.props.user_details.id &&
                    <>
                        <Formik
                            initialValues={{
                                file_image_profile: this.state.file_profile,
                            }}
                            validationSchema={validationSchema}

                            render={({ values, errors, status, touched, handleChange, setFieldValue }) => (
                                <>
                                    <div className="timeline-nav-bar  d-none d-lg-block">
                                        <div className="row">
                                            <div className="col-md-3">

                                                <Form>
                                                    <div className="profile-info">
                                                        <label htmlFor="file-input-image-profile"> <i className="ion-images profile-image-ion"></i>
                                                            <input className='profile-image' name="file_image_profile" id="file-input-image-profile" type="file" onChange={e => { setFieldValue("file_image_profile", e.currentTarget.files[0]); this.changeFile_profile(e) }} />
                                                        </label>

                                                        <img src={this.state.imagePreviewUrl_profile} alt="" className="img-responsive profile-photo" />
                                                        <ErrorMessage name="file_image_profile" component="div" className="invalid-feedback"></ErrorMessage>
                                                        <h4>{this.state.userdata.name}</h4>

                                                    </div>

                                                </Form>
                                            </div>
                                            <div className="col-md-9">
                                                <ul className="list-inline profile-menu">
                                                    <li><a>Timelines</a></li>
                                                    <li><a>About</a></li>
                                                    <li><Link to={`/content/${this.props.user_details.username}`}>Album</Link></li>
                                                    <li><Link to={`/friends/${this.props.user_details.username}`}>Friends</Link></li>
                                                    <li><Link to="/create-post">Create-post</Link></li>
                                                </ul>
                                              
                                            </div>
                                        </div>
                                    </div>
                                    {/* <div className="navbar-mobile d-lg-none">
                                    <Form>
                                        <div className="profile-info">
                                            <label htmlFor="file-input-image"> <i className="ion-images"></i>
                                                <input name="file_image" id="file-input-image" type="file" onChange={e => { setFieldValue("file_image", e.currentTarget.files[0]); this.changeFile(e) }} />
                                            </label>

                                            <img src={this.state.imagePreviewUrl_profile} alt="" className="img-responsive profile-photo" />
                                            <ErrorMessage name="file_image" component="div" className="invalid-feedback"></ErrorMessage>
                                            <h4>Priyaka chanurasia</h4>

                                        </div>

                                    </Form>

                                    <div className="mobile-menu">
                                        <ul className="list-inline">
                                            <li className="list-inline-item"><a href="timline.html">Timeline</a></li>
                                            <li className="list-inline-item"><a href="timeline-about.html">About</a></li>
                                            <li className="list-inline-item"><a href="timeline-album.html" className="active">Album</a></li>
                                            <li className="list-inline-item"><a href="timeline-friends.html">Friends</a></li>
                                        </ul>
                                        <button className="btn-primary">Add Friend</button>
                                    </div>
                                </div> */}
                                </>
                            )}
                        >
                        </Formik>
                    </>
                }
                {
                    (this.props.authuser.uid !== this.props.user_details.id) &&
                    <>
                        <div className="timeline-nav-bar  d-none d-lg-block">
                            <div className="row">
                                <div className="col-md-3">
                                    <div className="profile-info">

                                        <img src={this.props.user_details.image} alt="" className="img-responsive profile-photo" />
                                        <h4>{this.props.user_details.name}</h4>
                                    </div>
                                </div>
                                <div className="col-md-9">
                                    <ul className="list-inline profile-menu">
                                        <li><a>Timelines</a></li>
                                        <li><a>About</a></li>
                                        <li><Link to={`/content/${this.props.user_details.username}`}>Album</Link></li>
                                        <li><Link to={`/friends/${this.props.user_details.username}`}>Friends</Link></li>
                                    </ul>

                                    {
                                        (this.state.status) ?
                                            <ul className="follow-me list-inline">
                                                <li className="list-inline-item"><button className="btn-primary">Friend</button></li>
                                            </ul>
                                            :
                                            <ul className="follow-me list-inline">
                                                <li className="list-inline-item"><button className="btn-primary" onClick={() => this.addFriend()}>Add Friend</button></li>
                                            </ul>
                                    }

                                </div>
                            </div>
                        </div>
                    </>
                }

            </>

        )
    }
}

const mapDispatchToProps = (dispatch) => ({
    onFetchUserDetails: (authuser, query, header) => dispatch(doFetchUserDetails(authuser, query, header)),
    onFetchAuthUserDetails: (authuser, query, header) => dispatch(doFetchAuthUserDetails(authuser, query, header)),
    onFetchUserError: (error) => dispatch(doFetchErrorUser(error)),
    onFetchUserFriendStatus: (params, header) => dispatch(doFetchUserFriendStatus(params, header)),
    onFetchUserFriendStatusError: (error) => dispatch(doFetchFriendStatusError(error))
});


const mapStateToProps = (state) => {
    const { authuser, user_details } = getUserDetails(state);
    console.log("inside timeline mapstatetoprops", state)
    return {
        authuser: authuser,
        user_details: user_details,
        error: getFetchError(state),
        friend_status: getFriendStatus(state),
        friend_error: getFriendStatusError(state)
    }
};













export default (connect(mapStateToProps, mapDispatchToProps))(TImelineHeader)
