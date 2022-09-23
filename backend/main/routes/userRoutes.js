const { response } = require('express');
var express = require('express');
var router = express.Router();
const decodeIDToken = require('../config/authenticateToken').decodeIDToken;
const userController = require('../controllers/userControllers')


// router.get('/sign-in', (req, res) => {
//     const auth = req.currentUser;
//     console.log(auth)
//     if (auth) {
//         //    console.log('authentictaed', auth);
//         return res.send('hi from within the route');
//     }
//     return res.status(403).send('not authorized')
// })

// router.get('/sign-up', (req, res) => {
//     const auth = req.currentUser;
//     if (auth) {
//         //    console.log('authentictaed', auth);
//         return res.send('hi from within the route');
//     }
//     return res.status(403).send('not authorized')
// })

// router.post('google/sign-in', (req, res) => {
//     console.log("hello")
//     const { id, name, email, verified_email, profile_image, creationTime } = req.body
//     pool.query(`INSERT INTO users (id, name, email, verified_email, image, registeredat) VALUES ($1, $2, $3, $4, $5, $6)`, [id, name, email, verified_email, profile_image, creationTime], (error, results) => {
//         if (error) {
//             throw error
//         }
//         console.log(results)
//         return res.status(201).send(`User added with ID: ${results.insertId}`)
//     })
// });

router.post('/sign-in', decodeIDToken, (req, res) => {
    const userData = req.body
    userController.SignInUser(userData , (err,results) => {
        if(err)
        {
            return res.send(err)
        }
        else{
            return res.send(results)
        }
    })
  
});

router.get('/getUserDataUsingId/:id',decodeIDToken,(req,res) => {
    const id = req.params.id;
    userController.GetUserDataId(id, (err,results) => {
        if(err)
        {
            return res.send({err,"StatusCode":"2","msg":"Something Went Wrong"})
        }
        else{
            return res.send({"StatusCode":"0","msg":"User details" , results}) 
        }
    })  
});

router.get('/getUserDataUsingUsername/:username',decodeIDToken,(req,res) => {
    const username = req.params.username;
    userController.GetUserDataUsername(username, (err,results) => {
        if(err)
        {
            return res.send({err,"StatusCode":"2","msg":"Something Went Wrong"})
        }
        else{
            return res.send({"StatusCode":"0","msg":"User details" , results}) 
        }
    })  
})

router.post('/update_profile',decodeIDToken,(req,res) => {
    const userData = req.body;
    console.log("update profile", userData);
    userController.UpdateUserProfile(userData, (err,results) => {
        if(err)
        {
            return res.send({err,"StatusCode":"2","msg":"Something Went Wrong"})
        }
        else{
            return res.send({"StatusCode":"0","msg":"User details Updated",results}) 
        }
    })  
})


router.post('/sign-up', decodeIDToken, (req, res, next) => {
    console.log('sign-up', req)
    const userData = req.body
    userController.SignUpUser(userData, (err, results) => {
        if (err) {
            console.log(err)
            if(err.code === '23505')
            {
                return res.send({err,"StatusCode":"1","msg":"user already exists"})
            }
            else
            {
                return res.send({err,"StatusCode":"2","msg":"Something Went Wrong"}) 
            }
            
        }
        else {
            return res.send({"StatusCode":"0","msg":"You are now registered" , results}) 
        }
        
    });

   
});

router.post('/add-friend', decodeIDToken, (req,res,next) => {
    const userData = req.body;
    userController.AddUserFriend(userData, (err, results) => {
        if(err)
        {
            return res.send({err,"StatusCode":"1","msg":"Something Went Wrong"});
        }
        else{
            return res.send({"StatusCode":"0","msg":"Added as friend" , results}); 
        }
    })
});

router.get('/getUserFriendStatus', decodeIDToken,(req,res,next) => {
   
    const userData = req.query;
    userController.CheckUserFriendStatus(userData,(err,results) => {
        if(err)
        {
            return res.send({err});
        }
        else{
            return res.send(results); 
        }
    })

});

router.get('/friend_list/:username', decodeIDToken,(req,res) => {
    const username = req.params.username;
    console.log("users friends details", username)
    userController.GetUserFriendData(username, (err,results) => {
        if(err)
        {
            return res.send({err,"StatusCode":"2","msg":"Something Went Wrong"})
        }
        else{
            return res.send({"StatusCode":"0","msg":"User friend details" , results}) 
        }
    })  
});

router.delete('/remove_friend/:id' , decodeIDToken , (req,res) => {
    console.log("delete friend",req.params.id);
    const id = req.params.id
    userController.RemoveFriend(id , (error,results) => {
        
        if(error)
        {
            return res.send({"StatusCode": "2", "msg": "Something Went Wrong"});
        }
        else{
            return res.send({ "StatusCode": "0", "msg": "Friend Removed", results}); 
        }
    })
});

router.get('/getFeedData/:id', decodeIDToken,(req,res) => {
    const id = req.params.id;
    console.log("feed", id)
    userController.GetFeedData(id, (err,results) => {
        if(err)
        {
            return res.send({err,"StatusCode":"2","msg":"Something Went Wrong"})
        }
        else{
            return res.send({"StatusCode":"0","msg":"Feeds details" , results}) 
        }
    })  
});

router.get('/getFollowerCount/:id', decodeIDToken,(req,res) => {
    const id = req.params.id;
    userController.GetFollowerCount(id, (err,results) => {
        if(err)
        {
            return res.send({err,"StatusCode":"2","msg":"Something Went Wrong"})
        }
        else{
            return res.send({"StatusCode":"0","msg":"Follower count" , results}) 
        }
    })  
});

module.exports = router;