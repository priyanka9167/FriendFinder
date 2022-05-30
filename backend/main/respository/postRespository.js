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
    console.log("respost id",id)
    pool.query(`SELECT * from user_post WHERE user_id = $1`, [id], (error, results) => {

        if (error) {
            callback (error)
        }
        else
        {
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
        else
        {
            callback(null, results)
        }
    })
}

postData.GetPostData = (id, callback) => {
    pool.query(`SELECT * from user_post WHERE id = $1`, [id], (error, results) => {
                if (error) {
                    callback(error)
                }
                else{
                    callback(null,results)
                }
               
            })
}

postData.DeletePostData = (id, callback) => {
    pool.query(`DELETE from user_post WHERE id=$1`, [id], (error,results) => {
        if(error)
        {
            callback(error)
        }
        else{
            callback(null,results)
        }
    })
}


module.exports = postData