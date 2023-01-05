
var createError = require('http-errors');
var express = require('express');
var path = require('path');
var bodyParser = require('body-parser')
var cookieParser = require('cookie-parser');
var logger = require('morgan');

const cors = require('cors');
const pool = require('./config/db')
var app = express();

app.use(logger('dev'));
app.use(bodyParser.json({limit:'200mb'}));
app.use(bodyParser.urlencoded({ limit:'200mb',extended: true }));
app.use(bodyParser.text({limit:'200mb'}))
app.use(cookieParser());
// app.use(express.static(path.join(__dirname, 'public')));
app.use(express.static(__dirname + '/'));
app.use(express.static(__dirname + '/models'));
app.use(express.static(__dirname + '/routes'));
app.use(cors());

 
const userRoutes = require('./routes/userRoutes')
const postRoutes = require('./routes/postRoutes')


app.use('/api/users' , userRoutes)
app.use('/api/post', postRoutes)
app.use('/test', (req, res) => {
    console.log('Request Type:', req.method)
    res.send("Recorded");
  })

// module.exports = app;

const port = 5000;
app.listen(port, ()=> console.log("server started on port - ", port));
