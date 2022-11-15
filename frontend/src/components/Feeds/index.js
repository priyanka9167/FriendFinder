import React, { useCallback, useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { getUserDetails } from '../../selectors/user';
import { headerToken } from '../Firebase';
import { getFeedData } from '../../services/User/userData';
import Navigation from '../Navigation';
import LikesDislikes from '../LikesDislikesComponent';
import Comments from '../Comments';
import { useFollowers } from '../Followers';
import { Link } from 'react-router-dom';

export default function Feeds() {

  const [feeds, setFeeds] = useState(null);
  const [error, setError] = useState(null);
  const { authuser, user_details, authuser_details } = useSelector(state => getUserDetails(state));
  const auth_id = authuser_details.id;

  const count = useFollowers(auth_id);

  const fetchFeed = useCallback(async (auth_id) => {
    try {
      let header = await headerToken();
      let response = await getFeedData(`/api/users/getFeedData/${auth_id}`, header);
      console.log("feed response", response);
      if (response.data.StatusCode === "0") {
        setFeeds(response.data.results.rows);
        setError(null)
      }
      else {
        setError(response.data.msg)
      }
    }
    catch (e) {
      setError(e);
    }
  });

  useEffect(() => {
    let didCancel = false;
    fetchFeed(auth_id);
    return () => {
      didCancel = true;
    };
  }, [auth_id])

  return (
    console.log("feed", feeds),
    <>
      <Navigation />
      <div className='row justify-content-center'>
        <p></p>
        <p></p>
        <div className='col-md-5 mr-auto'>
          <div className="profile-card">
            <img src={authuser_details.image} alt="user" className="profile-photo" />
            <h5><Link to={`/content/${authuser_details.username}`} className="text-white">{authuser_details.name}</Link></h5>
            {
              count && 
              <Link to={`/friends/${authuser_details.username}`}><i className="ion ion-android-person-add"></i> {count} friends</Link>
            }
           
          </div>
          {
            feeds && feeds.map((data) =>
              <div className="post-content" key={data.id}>
                <img src={data.imageurl} alt="post-image" className="img-responsive post-image" />
                <div className="post-container">
                  <img src={data.image} alt="user" className="profile-photo-md pull-left" />
                  <div className="post-detail">
                    <div className="user-info">
                      <h5><a href="timeline.html" className="profile-link">{data.username}</a> <span className="following">following</span></h5>
                      <LikesDislikes post_details={data.id} />
                      <div className="line-divider"></div>
                      <div className="post-text">
                        {data.message}
                      </div>
                      <div className="line-divider"></div>
                      <Comments post_id={data.id} />
                    </div>
                  </div>
                </div>
              </div>
            )}
        </div>
      </div>
    </>
  )
}
