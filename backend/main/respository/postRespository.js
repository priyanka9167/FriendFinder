const pool = require('../config/db');
const postData = {}


postData.CreatePostData = (postData, callback) => {
    const { id, message, image } = postData
    const date = new Date()
    pool.query(`INSERT INTO user_post (message,user_id,imageurl,createdate) VALUES ($1, $2, $3, $4)`, [message, id, image, date], (error, results) => {
        if (error) {
            callback(error)
        }
        else {
            callback(null, results)
        }

    })

}

postData.GetAllPostData = (username, callback) => {
    console.log("respost id", username)
    pool.query(`SELECT up.* from user_post up, users u WHERE u.username = $1 AND up.user_id = u.id`, [username], (error, results) => {

        if (error) {
            console.log("repost",error)
            callback(error)
        }
        else {
            callback(null, results)
        }

    })
}

postData.EditPostData = (postData, callback) => {
    const { id, message } = postData
    const date = new Date()
    pool.query(`UPDATE user_post SET message = $1, updatedate = $2  WHERE id = $3`, [message, date, id], (error, results) => {
        if (error) {
            callback(error)
        }
        else {
            callback(null, results)
        }
    })
}

postData.GetPostData = (username, callback) => {
    pool.query(`SELECT up.* from user_post up, users u WHERE u.username = &1 AND up.user_id = u.id`, [username], (error, results) => {
        if (error) {
            callback(error)
        }
        else {
            callback(null, results)
        }

    })
}

postData.DeletePostData = (id, callback) => {
    pool.query(`DELETE from user_post WHERE id=$1`, [id], (error, results) => {
        if (error) {
            console.log("Delete post",error)
            callback(error)
        }
        else {
            callback(null, results)
        }
    })
}

postData.LikePostRequest = (postData, callback) => {
    const date = new Date();
    const { post_id, sourceid, targetid, likes, dislikes } = postData;
    pool.query(`INSERT INTO likes_dislikes (post_id,sourceid,targetid,likes,dislikes,createdate) VALUES ($1, $2, $3, $4, $5, $6) ON CONFLICT ON CONSTRAINT post_source_target DO UPDATE SET likes = EXCLUDED.likes ,dislikes = EXCLUDED.dislikes ,updatedate = EXCLUDED.createdate`, [post_id, sourceid, targetid, likes, dislikes, date], (error, results) => {
        if (error) {
            callback(error)
            console.log("likes and dislikes", error)
        }
        else {
            callback(null, results)
        }
    })

};

postData.GetPostLikesDislikesCountRequest = (postData, callback) => {
    const { post_id, auth_id, user_id } = postData;
    console.log(post_id, auth_id, user_id)
    pool.query(`SELECT COUNT(*) as total, (SELECT COUNT(*) from likes_dislikes WHERE post_id = $1 AND likes = 1) as count_likes, (SELECT COUNT(*) from likes_dislikes WHERE post_id = $1 AND dislikes = 1) as count_dislikes, (SELECT likes from likes_dislikes WHERE post_id = $1 AND sourceid = $2 AND targetid = $3 AND likes = 1) as likes, (SELECT dislikes from likes_dislikes WHERE post_id = $1 AND sourceid = $2 AND targetid = $3 AND dislikes = 1) as dislikes from likes_dislikes`, [post_id, auth_id, user_id], (error, results) => {
        console.log("results like dislikes", results, error);
        if (error) {
            callback(error)
        }
        else {
            callback(null, results)
        }

    })
};

postData.RemoveLikeDislikesPostRequest = (postData, callback) => {

    const date = new Date();
    if ('likes' in postData) {
        const { post_id, sourceid, targetid, likes } = postData;
        pool.query(`UPDATE likes_dislikes SET likes = $1 ,updatedate = $2  WHERE post_id = $3 AND sourceid = $4 AND targetid = $5`, [likes, date, post_id, sourceid, targetid], (error, results) => {

            if (error) {
                callback(error)
            }
            else {
                callback(null, results)
            }
        })
    }
    else {
        const { post_id, sourceid, targetid, dislikes } = postData;
        pool.query(`UPDATE likes_dislikes SET  dislikes = $1 ,updatedate = $2  WHERE post_id = $3 AND sourceid = $4 AND targetid = $5`, [dislikes, date, post_id, sourceid, targetid], (error, results) => {

            if (error) {
                callback(error)
            }
            else {
                callback(null, results)
            }
        })
    }

}


postData.AddCommentsRequest = (postData, callback) => {
    const { id, comments, post_id } = postData;
    const date = new Date();
    pool.query(`INSERT INTO post_comments (message,createdat,source_id,post_id) VALUES ($1, $2, $3, $4)`, [comments, date, id, post_id], (error, results) => {
        if (error) {
            callback(error);
        }
        else {
            callback(null, results);
        }

    })
}

postData.GetPostCommentsRequest = (postId, callback) => {
    pool.query(`SELECT p.message,u.username,u.image from post_comments p,users u WHERE p.post_id = $1 AND p.source_id = u.id ORDER BY p.createdat`, [postId], (error, results) => {
        if (error) {
            callback(error);
        }
        else {
            callback(null, results);
        }

    })
}


module.exports = postData