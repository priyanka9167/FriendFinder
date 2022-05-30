const { response } = require('express');
var express = require('express');
var router = express.Router();
const decodeIDToken = require('../config/authenticateToken').decodeIDToken;
const postControllers = require('../controllers/postControllers');
const pool = require('../config/db')

router.post('/add-post', decodeIDToken, (req, res) => {
    const postData = req.body;
    postControllers.CreatePost(postData, (err, results) => {
        if (err) {
            console.log("err_post",err)
            return res.send({ "StatusCode": "2", "msg": "Something Went Wrong" })
        }
        else {
            return res.send({ "StatusCode": "0", "msg": "Post Created", results })
        }
    })

})

router.get('/getPostData/:id', decodeIDToken, (req, res) => {
    const id = req.params.id;
    console.log("username",id);
    postControllers.GetAllPost(id, (err, results) => {
        if (err) {
            return res.send({ "StatusCode": "2", "msg": "Something Went Wrong" })
        }
        else {
            return res.send({ "StatusCode": "0", "msg": "All Post", results })
        }

    })

})

router.post('/editpost/:id', decodeIDToken, (req, res) => {
    const postData = req.body
    postControllers.EditPost(postData, (err, results) => {
        if (err) {
            console.log("err", err)
            return res.send({ "StatusCode": "2", "msg": "Something Went Wrong" })
        }
        else {
            return res.send({ "StatusCode": "0", "msg": "Post Updated", results })
        }
    })

})

router.get('/getpostdatawithid/:id', decodeIDToken, (req, res) => {
    const id = req.params.id
    postControllers.GetPost(id, (error, results) => {
        if (error) {
            
            return res.send({ "StatusCode": "2", "msg": "Something Went Wrong" })
        }
        else {
            
            return res.send({ "StatusCode": "0", "msg": "Post Data Received", results })
        }
    })
});

router.delete('/deletepost/:id' , decodeIDToken , (req,res) => {
    console.log("delete request",req.params.id);
    const id = req.params.id
    postControllers.DeletePost(id , (error,results) => {
        if(error)
        {
            return res.send({"StatusCode": "2", "msg": "Something Went Wrong"})
        }
        else{
            return res.send({ "StatusCode": "0", "msg": "Post Deleted"}) 
        }
    })
})

module.exports = router;