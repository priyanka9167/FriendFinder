const Post = {}
const postData = require('../respository/postRespository')
const postRespository = require('../respository/postRespository')




Post.CreatePost = (postData, callback) => {
    postRespository.CreatePostData(postData , (err,results) => {
        if(err)
        {
            callback(err)
        }
        else{
            callback(null,results)
        }
    })
}

Post.GetAllPost = (username, callback) => {
    postRespository.GetAllPostData(username, (err,results) => {
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

Post.EditPost = (postData, callback) => {
    postRespository.EditPostData(postData, (err,results) => {
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

Post.GetPost = (username , callback) => {
    postRespository.GetPostData(username , (err,results) => {
        if(err)
        {
            callback(err)
        }
        else{
            callback(null, results)
        }
    })
}

Post.DeletePost = (id,callback) => {
    postRespository.DeletePostData(id,(err,results) => {
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

Post.LikePost = (postData, callback) => {
    postRespository.LikePostRequest(postData,(err,results) => {
        if(err)
        {
            callback(err)
        }
        else
        {
            callback(null,results)
        }
    })
};

Post.GetPostLikesDislikesCount = (postData , callback) => {
    postRespository.GetPostLikesDislikesCountRequest(postData , (err,results) => {
        if(err)
        {
            callback(err)
        }
        else{
            callback(null, results)
        }
    })
};

Post.RemoveLikeDislikesPost = (postData, callback) => {
    postRespository.RemoveLikeDislikesPostRequest(postData,(err,results) => {
        if(err)
        {
            callback(err)
        }
        else
        {
            callback(null,results)
        }
    })
};

Post.AddComments = (postData, callback) => {
    postRespository.AddCommentsRequest(postData,(err,results) => {
        if(err)
        {
            callback(err)
        }
        else
        {
            callback(null,results)
        }
    })
};

Post.GetPostComments = (postId, callback) => {
    postRespository.GetPostCommentsRequest(postId,(err,results) => {
        if(err)
        {
            callback(err)
        }
        else
        {
            callback(null,results)
        }
    })
};



module.exports = Post
