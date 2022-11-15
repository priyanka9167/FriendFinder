import React, { Component, useEffect, useCallback } from 'react';
import { useDispatch } from "react-redux";

import { Link, useParams } from 'react-router-dom';
import { getUserPostData } from '../../services/posts/postData';
import Navigation from '../Navigation';
import TImelineHeader from '../TimeLine/TImelineHeader';
import { getUserDetails, getFetchError } from '../../selectors/user';
import EditPost from './EditPost';
import { connect } from 'react-redux';
import { headerToken } from '../Firebase';
import { deletePostWithId } from '../../services/posts/postData';
import { doFetchUserDetails, doFetchErrorUser } from '../../action-initiators/simpleAction';






class ShowPost extends Component {
    constructor(props) {
        super(props)
        this.state = {

            userPost: null,
            error: null,
            modal_show: false,
            modal_no: null,
            modal_msg: null,
            modal_data: {},
            edit_data: false,

        }
        this.username = this.props.params.username;
    }

    componentDidMount() {
        this.PostData();
    }

    componentDidUpdate(prevProps)
    {
        if(this.props.params.username !== prevProps.params.username)
        {
            this.username = this.props.params.username;
            this.PostData();
        }
    }



    PostData = async () => {
        try {
            var header = await headerToken();
            console.log("show post post data",this.props)
            var res = await getUserPostData(`/api/post/getPostData/${this.username}`, header);
            console.log("res show", res)
            if (res.data.StatusCode === "0") {
                if (res.data.results.rows.length === 0) {
                    this.setState({ error: "Please Post something" })
                }
                else {
                    var user_data = res.data.results.rows
                    var user_object = Object.assign({}, ...user_data.map(item => ({ [item.id]: item })))
                    console.log("user_data", user_data)
                    console.log("user_object", user_object)
                    this.setState({
                        userPost: user_object,
                        error: null
                    });
                }
            }
            else {
                this.setState({ error: res.data.msg })
            }
        }
        catch (e) {
            console.error(e)
        }

    }

    handleClose = () => {
        this.setState({ modal_no: null, modal_show: false, edit_data: false })
    }
    handleShow = (id) => {
        this.setState({ modal_no: id, modal_data: this.state.userPost[id], modal_show: true, modal_msg: this.state.userPost[id].message })
    }
    editMessage = (msg, id) => {
        var modal_data = this.state.modal_data;
        var user_post = this.state.userPost;
        user_post[id].message = msg;

        modal_data.message = msg;

        console.log("msg edited", msg, id, modal_data);

        this.setState({ modal_data: modal_data, userPost: user_post }, this.cancelEdit());

    }
    editPost = (id) => {
        this.setState({ edit_data: true })
    }

    cancelEdit = () => {
        console.log("clicked")
        this.setState({ edit_data: false })
    }

    deletePost = async (id) => {
        try {
            console.log("post deleted");
            var header = await headerToken();
            var res = await deletePostWithId(`/api/post/deletepost/${id}`, header);
            console.log("delete", res);
            if (res.data.StatusCode === "0") {
                var user_post = this.state.userPost;
                delete user_post[id];
                this.setState({ userPost: user_post }, this.handleClose());
            }
            else {
                this.setState({ error: res.data.msg });
            }
        }
        catch (error) {
            this.setState({ error: res.data.msg });
        }

    }

    render() {
        const { modal_show, userPost, modal_data, edit_data, error } = this.state
        return (
            <>
                <Navigation></Navigation>
                <div className="container">
                    <div className="timeline">
                        <div className="timeline-cover">
                            <TImelineHeader></TImelineHeader>
                        </div>
                        <div id="page-contents">
                            <div className="row">
                                <div className="col-md-3"></div>
                                <div className="col-md-7">
                                    <ul className="album-photos">
                                        {
                                            userPost && Object.keys(userPost).map((data) => (

                                                <li key={data}>
                                                    <div className="img-wrapper" onClick={() => this.handleShow(userPost[data].id)}>
                                                        <img src={userPost[data].imageurl} alt="photo" />
                                                    </div>
                                                    <p>{userPost[data].id}</p>
                                                </li>

                                            ))
                                        }
                                        {
                                            error && <p>{error}</p>
                                        }
                                    </ul>

                                    <EditPost

                                        modal_show={modal_show}
                                        modal_data={modal_data}
                                        post_data={this.PostData}
                                        edit_data={edit_data}
                                        handle_show={this.handleShow}
                                        edit_post={this.editPost}
                                        cancel_edit={this.cancelEdit}
                                        closeModal={this.handleClose}
                                        edit_message={this.editMessage}
                                        delete_post={this.deletePost}
                                        user_details={this.props.user_details}
                                        authuser={this.props.authuser}
                                    />


                                </div>


                                <div className="col-md-2 static">
                                    <div id="sticky-sidebar">
                                        <h4 className="grey">Sarah's activity</h4>
                                        <div className="feed-item">
                                            <div className="live-activity">
                                                <p><a href="#" className="profile-link">Sarah</a> Commended on a Photo</p>
                                                <p className="text-muted">5 mins ago</p>
                                            </div>
                                        </div>
                                        <div className="feed-item">
                                            <div className="live-activity">
                                                <p><a href="#" className="profile-link">Sarah</a> Has posted a photo</p>
                                                <p className="text-muted">an hour ago</p>
                                            </div>
                                        </div>
                                        <div className="feed-item">
                                            <div className="live-activity">
                                                <p><a href="#" className="profile-link">Sarah</a> Liked her friend's post</p>
                                                <p className="text-muted">4 hours ago</p>
                                            </div>
                                        </div>
                                        <div className="feed-item">
                                            <div className="live-activity">
                                                <p><a href="#" className="profile-link">Sarah</a> has shared an album</p>
                                                <p className="text-muted">a day ago</p>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            
                        </div>
                    </div>
                </div>

            </>
        )
    }
}

const ShowPostFunctional = (props) => {
    const params = useParams();
    const dispatch = useDispatch();
    const getUser = useCallback(async (username) => {
        try {
            if (params) {
                let header = await headerToken();
                dispatch(doFetchUserDetails(props.authuser, {username:username}, header));
            }
        }
        catch (err) {
            dispatch(doFetchErrorUser(err))
        }
    }, [])

    useEffect(() => {
        getUser(params.username);

    }, [params]);
    return (    
        <ShowPost params={params} {...props} />
    )
}

const mapStateToProps = state => {
    const { authuser, user_details } = getUserDetails(state);
    return {
        authuser: authuser,
        user_details: user_details,
        error: getFetchError(state)
    }

}







export default connect(mapStateToProps)(ShowPostFunctional);
// compose(withRouter, connect(mapStateToProps, null))(ShowPost)
