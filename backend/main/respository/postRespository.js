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

postData.GetAllPostData = (id, callback) => {
    console.log("respost id", id)
    pool.query(`SELECT * from user_post WHERE user_id = $1`, [id], (error, results) => {

        if (error) {
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

postData.GetPostData = (id, callback) => {
    pool.query(`SELECT * from user_post WHERE id = $1`, [id], (error, results) => {
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
            callback(error)
        }
        else {
            callback(null, results)
        }
    })
}

postData.LikePostRequest = (postData, callback) => {
    const { post_id, sourceid, targetid, likes, dislikes } = postData
    const date = new Date();
    pool.query(`SELECT EXISTS(SELECT 1 FROM likes_dislikes WHERE post_id = $1 AND sourceid = $2 AND targetid = $3 )`, [post_id, sourceid, targetid], (error, results) => {
        let if_exists = results.rows[0].exists;
        console.log("like dislikes results", if_exists);
        if (error) {
            callback(error);
        } else {
            if (if_exists) {
                pool.query(`UPDATE likes_dislikes SET likes = $1, dislikes = $2 ,updatedate = $3  WHERE post_id = $4 AND sourceid = $5 AND targetid = $6`, [likes, dislikes, date, post_id, sourceid, targetid], (error, results) => {
                    if (error) {
                        callback(error);
                    }
                    else {
                        callback(null, results);
                    }
                })
            }
            else {
                pool.query(`INSERT INTO likes_dislikes (post_id, sourceid, targetid, likes,dislikes,createdate) VALUES ($1, $2, $3, $4, $5, $6)`, [post_id, sourceid, targetid, likes, dislikes, date], (error, results) => {
                    if (error) {
                        callback(error)
                    }
                    else {
                        callback(null, results)
                    }
                })
            }

        }


    });

};

postData.GetPostLikesDislikesCountRequest = (postData, callback) => {
    const { post_id, auth_id, user_id } = postData;
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
    const { post_id, sourceid, targetid, likes, dislikes } = postData;
    const date = new Date();
    pool.query(`UPDATE likes_dislikes SET likes = $1, dislikes = $2 ,updatedate = $3  WHERE post_id = $4 AND sourceid = $5 AND targetid = $6`, [likes, dislikes, date, post_id, sourceid, targetid], (error, results) => {
        console.log("type of", error, typeof date, date)
        if (error) {
            callback(error)
        }
        else {
            callback(null, results)
        }
    })
}


module.exports = postData