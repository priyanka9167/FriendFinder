const pool = require('../config/db');
const userData = {}
const deleteUser = require('../config/authenticateToken').deleteUser;


userData.SignUpData = (userData, callback) => {
    const { id, name, username, email, password } = userData
    pool.query(`INSERT INTO users (id,name,username,email,passwordhash) VALUES ($1, $2, $3, $4, $5)`, [id, name, username, email, password], (error, results) => {
        if (error) {
            deleteUser(id)
                .then(() => callback(error))
        }
        else {
            callback(null, results)
        }
    })
}

userData.SignInData = (userData, callback) => {
    const { email, password } = userData
    pool.query(`SELECT * FROM users WHERE email = $1`, [email], (error, results) => {
        if (error) {
            callback(error)
        }
        if (results.rows.length === 0) {
            callback({ "StatusCode": "3", "msg": "User doesnt exists" })
        }
        else {
            if (results.rows[0].passwordhash === password) {
                var username = results.rows[0].username

                callback(null, { "StatusCode": "5", "msg": "You are now logged in", username })
            }
            else {
                callback({ "StatusCode": "4", "msg": "Wrong Password" })

            }
        }
    })
}

userData.GetUserInfoId = (id, callback) => {
    pool.query('SELECT * from users WHERE id = $1', [id], (error, results) => {

        if (error) {
            callback(error)
        }
        else {
            callback(null, results)
        }

    })
}

userData.GetUserInfoUsername = (username, callback) => {
    pool.query('SELECT * from users WHERE username = $1', [username], (error, results) => {

        if (error) {
            callback(error)
        }
        else {
            callback(null, results)
        }

    })
}

userData.UpdateUserData = (userData, callback) => {
    const { id, image_url } = userData;
    pool.query(`UPDATE users SET image = $1 WHERE id = $2`, [image_url, id], (error, results) => {
        if (error) {
            console.log("error", error)
            callback(error)
        }
        else {
            callback(null, results)
        }
    })
}

userData.AddUserFriendRequest = (userData, callback) => {
    const { source, target } = userData;
    const date = new Date();
    pool.query(`INSERT INTO user_friend (sourceid, targetid, status, createdate) VALUES ($1,$2,$3,$4)`, [source, target, 1, date], (error, results) => {
        if (error) {

            callback(error);
        }
        else {
            callback(null, results);
        }
    })
}

userData.CheckUserFriendStatusRequest = (userData, callback) => {
    const { auth_id, user_id } = userData;

    pool.query(`SELECT * from user_friend WHERE sourceid = $1 AND targetid = $2`, [auth_id, user_id], (error, results) => {
        if (error) {
            callback(error);
        }
        else {
            if(results.rows.length === 0)
            {
                callback(null,{ "StatusCode": "1", "msg": "Not Available" })
            }
            else{
                let status = results.rows[0].status
                
                callback(null, {"StatusCode":"0","msg":"AS a friend" , status})
            }
            
        }
    })
}

userData.GetUserFriendDataRequest = (username, callback) => {
    pool.query(`SELECT uf.id,uf.targetid,u.username,u.image,u.name from users u inner join user_friend uf on u.id = uf.targetid left join users us on uf.sourceid = us.id where us.username = $1`, [username], (error, results) => {
        if (error) {
            callback(error)
        }
        else {
            callback(null, results)
        }

    })
}

userData.RemoveUserFriendRequest = (id, callback) => {
    console.log("remove friend id", id);
    pool.query(`DELETE from user_friend  WHERE id=$1`, [id], (error,results) => {
        if(error)
        {
            callback(error)
        }
        else{
            callback(null,results)
        }
    });
}

userData.GetFeedDataRequest = (id,callback) => {
    pool.query(`SELECT uf.targetid, up.*,u.image, u.username from user_post up inner join  user_friend uf on uf.sourceid = $1 inner join users u on uf.targetid = u.id where uf.targetid = up.user_id order by createdate desc`,[id],(error,results) => {
        if(error)
        {
            callback(error)
        }
        else{
            callback(null,results)
        }
    });
};

userData.GetFollowerCountRequest = (id,callback) => {
    pool.query('SELECT count(*) from user_friend where sourceid = $1', [id], (error,results) => {
        if(error)
        {
            callback(error)
        }
        else{
            callback(null,results)
        }
    });
    
}




module.exports = userData