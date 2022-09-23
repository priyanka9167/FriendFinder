
const User = {}
const userData = require('../respository/userRespository')
const userRespository = require('../respository/userRespository')

User.SignUpUser = (userData, callback) => {
    userRespository.SignUpData(userData , (err, results) => {
        if(err)
        {
            callback(err)
        }
        else{
            callback(null,results)
        }
    })
   
}

User.SignInUser = (userData , callback) => {
    userRespository.SignInData(userData, (err, results) => {
        if(err)
        {
            callback(err)
        }
        else
        {
            callback(null,results)
        }
    })
}

User.GetUserDataId = (id , callback) => {
    userRespository.GetUserInfoId(id, (err, results) => {
        if(err)
        {
            callback(err)
        }
        else
        {
            callback(null,results)
        }
    })
}

User.GetUserDataUsername = (username , callback) => {
    userRespository.GetUserInfoUsername(username, (err, results) => {
        if(err)
        {
            callback(err)
        }
        else
        {
            callback(null,results)
        }
    })
}

User.UpdateUserProfile = (userData,callback) => {
    userRespository.UpdateUserData(userData, (err,results) => {
        if(err)
        {
            callback(err)
        }
        else{
            callback(null,results)
        }
    })
}

User.AddUserFriend = (userData,callback) => {
    userRespository.AddUserFriendRequest(userData,(err,results) => {
        if(err)
        {
            callback(err);
        }
        else{
            callback(null,results);
        }
    })
}

User.CheckUserFriendStatus = (userData,callback) => {
    userRespository.CheckUserFriendStatusRequest(userData,(err,results) => {
        if(err)
        {
            callback(err);
        }
        else{
            callback(null,results);
        }
    })
}

User.GetUserFriendData = (userData,callback) => {
    userRespository.GetUserFriendDataRequest(userData,(err,results) => {
        if(err)
        {
            callback(err);
        }
        else{
            callback(null,results);
        }
    })
}

User.RemoveFriend = (userData,callback) => {
    userRespository.RemoveUserFriendRequest(userData,(err,results) => {
        if(err)
        {
            callback(err);
        }
        else{
            callback(null,results);
        }
    })
}

User.GetFeedData = (id, callback) => {
    userRespository.GetFeedDataRequest(id,(err,results) => {
        if(err)
        {
            callback(err);
        }
        else{
            callback(null,results);
        }
    })
}

User.GetFollowerCount = (id,callback) => {
    userRespository.GetFollowerCountRequest(id,(err,results) => {
        if(err)
        {
            callback(err);
        }
        else{
            callback(null,results);
        }
    })
}


module.exports = User
