import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getUserDetails } from '../../selectors/user';
import { headerToken } from '../Firebase';
import { likeUserPost } from '../../services/posts/postData';
import { getPostCounts } from '../../services/posts/postData';
import {removeLikesDislikesPost} from '../../services/posts/postData';

export default function LikesDislikes(props) {

    const [checkStatus, setCheckStatus] = useState({
        likes: false,
        dislikes: false
    });

    const [count, setCount] = useState({
        likes_count: 0,
        dislikes_count: 0
    });

    const [error, setError] = useState(null);

    const { authuser, user_details } = useSelector(state => getUserDetails(state));
    const auth_id = authuser.uid;
    const user_id = user_details.id;
    const post_id = props.post_details;

    const getPostLikesDislikesCount = async () => {
        try {
            const header = await headerToken();
            let params = {
                auth_id: auth_id,
                user_id: user_id,
                post_id: post_id
            }
            let count_response = await getPostCounts(`/api/post/postCounts`, { params }, header);
            if (count_response?.data?.StatusCode === '0') {
                let results = count_response?.data?.results?.rows[0];
                setCheckStatus({ likes: results.likes === 1 ? true : false, dislikes: results.dislikes === 1 ? true : false });
                setCount({ likes_count: results.count_likes, dislikes_count: results.count_dislikes });
                setError(null);
            }
            else {
                setError(count_response.data.msg)
            }
        }
        catch (e) {
            setError(e);
        }
    }

    const likesDislkesPost = async (value) => {
        try {
            const header = await headerToken();
            const payload = value ? {
                post_id: post_id,
                sourceid: auth_id,
                targetid: user_id,
                likes: 1,
                dislikes:0
            }: {
                post_id: post_id,
                sourceid: auth_id,
                targetid: user_id,
                likes:0,
                dislikes: 1, 
            }
            let response = await likeUserPost('/api/post/likePost', payload, header);
            if (response.data.StatusCode === "0") {
                await getPostLikesDislikesCount();
            }
            else {
                setError(response.data.msg)
            }
        }
        catch (error) {
            setError(error);
        }


    }

    const removeLikesDislikes = async(value) => {
        try{
            const header = await headerToken();
            const payload = value ? {
                post_id: post_id,
                sourceid: auth_id,
                targetid: user_id,
                likes: 0,
               
            }:{
                post_id: post_id,
                sourceid: auth_id,
                targetid: user_id,
               dislikes: 0,
            }
            let response = await removeLikesDislikesPost('/api/post/removelikedislike',payload, header);
            if (response.data.StatusCode === "0") {
                await getPostLikesDislikesCount();
            }
            else {
                setError(response.data.msg)
            }
        }
        catch(error){
            setError(error);
        }
    }

    useEffect(() => {
        getPostLikesDislikesCount();
    }, []);

    return (
        <>
            {
                !error ?
                    (
                        <div className="reaction">
                            {
                                checkStatus.likes ? <a className="btn text-green" onClick={() => removeLikesDislikes(true)}><i className="icon ion-thumbsup"></i>{count.likes_count}</a>
                                    :
                                    <a className="btn text-black" onClick={() => likesDislkesPost(true)}><i className="icon ion-thumbsup"></i>{count.likes_count}</a>
                            }
                            {
                                checkStatus.dislikes ? <a className="btn text-red" onClick={() => removeLikesDislikes(false)} ><i className="fa fa-thumbs-down"></i>{count.dislikes_count}</a>
                                    :
                                    <a className="btn text-black" onClick={() => likesDislkesPost(false)}><i className="fa fa-thumbs-down"></i>{count.dislikes_count}</a>
                            }
                        </div>
                    )
                    :
                    <div>{error}</div>
            }
        </>

    )
}
