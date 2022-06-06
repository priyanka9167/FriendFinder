import React, { useEffect, useState, useCallback } from 'react'
import { Link, useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import Cover from '../../assets/images/covers/1.jpg';
import Navigation from '../Navigation';
import TImelineHeader from '../TimeLine/TImelineHeader';
import { headerToken } from '../Firebase/index';
import { getUserFriendList , removeUserFriends} from '../../services/User/userData';
import { getUserDetails } from "../../selectors/user";
import { doFetchUserDetails, doFetchErrorUser } from '../../action-initiators/simpleAction';




function ShowFriends(props) {

    const params = useParams();
    const { authuser, user_details } = useSelector(state => getUserDetails(state));
    const dispatch = useDispatch();
    const [data, setData] = useState({});
    const [error, setError] = useState(null);



    const fetchFriendList = useCallback(async () => {
        try {
            const header = await headerToken();
            console.log("inside show friends api fetching", authuser)
            dispatch(doFetchUserDetails(authuser, params.id, header));

            const response = await getUserFriendList(`/api/users/friend_list/${params.id}`, header);
            if (response.data.StatusCode === "0") {
                if (response.data.results.rows.length === 0) {
                    setError("No Friends");
                }
                else {
                    let data = response.data.results.rows;
                    let data_object = Object.assign({}, ...data.map(item => ({ [item.id]: item })));
                    setData(data => ({
                        ...data,
                        ...data_object
                    }));
                    setError(null);
                }
            }
            else {
                setData(null);
                setError(response.data.msg);
            }
        }
        catch (e) {
            setData(null);
            setError(e);
        }
    }, []);

    const removeFriend = async(id) => {
         try{
            let header = await headerToken();
            const response = await removeUserFriends(`/api/users/remove_friend/${id}`, header);
            console.log(response)
            if (response.data.StatusCode === "0") {
                let user_friend = data;
                delete user_friend[id];
                setData(data => ({
                    ...data,
                    ...user_friend
                }));
                
            }
            else {
                setError(response.data.msg);
            }
        }
        catch(error){
            setError(error);
        }
    }



    useEffect(() => {
        console.log("show friends before api fething");
        let didCancel = false;
        fetchFriendList();
        return () => {
            console.log("show friends after api fething");
            didCancel = true;
        };
    }, [params])

    return (
        console.log("data", data),
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
                                <div className="friend-list">
                                    <div className="row">
                                        {
                                            data && Object.keys(data).map((item) => (
                                            console.log("item", item),
                                                <div className="col-md-6 col-sm-6" key={item}>
                                                    <div className="friend-card">
                                                        <img src={Cover} alt="profile-cover" className="img-fluid cover" />
                                                        <div className="card-info">
                                                            <img src={data[item].image} alt="user" className="profile-photo-lg" />
                                                            <div className="friend-info">
                                                                {
                                                                    authuser.uid === user_details.id &&
                                                                    <p className="pull-right text-green" onClick={() => removeFriend(data[item].id)}>Remove Friend</p>
                                                                }

                                                                <h5><Link to={`/content/${data[item].targetid}`} className="profile-link">{data[item].name}</Link></h5>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                            ))

                                        }
                                        {
                                            error && <p>{error}</p>
                                        }



                                    </div>
                                </div>
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

export default ShowFriends