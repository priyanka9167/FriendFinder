const { response } = require('express');
var express = require('express');
var router = express.Router();
const decodeIDToken = require('./config/authenticateToken');








// router.get('/getPostData/:username', decodeIDToken, (req, res) => {
//     const username = req.params.username
//     pool.query(`SELECT p.* FROM users u JOIN user_post p ON u.id = p.user_id WHERE u.username = $1`, [username], (error, results) => {
//         if (error) {
//             throw (error)
//         }
//         return res.status(201).send(results)

//     })
// })

// router.get('/getPostMessage/:id', decodeIDToken, (req, res) => {
//     const id = req.params.id
//     console.log(id)
//     pool.query(`SELECT * from user_post WHERE id = $1`, [id], (error, results) => {
//         if (error) {
//             throw error
//         }
//         console.log(results)
//         return res.status(201).send(results)
//     })
// })

// router.post('/editpost/:id', decodeIDToken, (req, res) => {
//     const { id, message } = req.body
//     pool.query(`UPDATE user_post SET message = $1 WHERE id = $2`, [message, id], (error, results) => {
//         if (error) {
//             throw error
//         }
//         return res.status(201).send("user post message updated")
//     })
// })







module.exports = router