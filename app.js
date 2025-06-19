require('dotenv').config();
const http = require('http');
const User = require('./models/user');
const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');
const taskRouter= require('./routes/home');
const friendRouter = require('./routes/friends');
const app = express(); 
app.use(express.static("public"));
const userRouter = require('./routes/user');
const session = require('express-session');


app.use(session({
  secret: process.env.SESSION_SECRET,  
  resave: false,
  saveUninitialized: true,
  cookie: { secure: false } 
}));
app.use(express.json()); 
app.use(bodyParser.urlencoded({extended:false}));


const mongoose = require('mongoose');
app.use(userRouter);
app.use(taskRouter);
app.use(friendRouter);
app.get('/signin',async(req,res,next)=>{
    res.render('user/signin');
})
app.get('/',(req,res,next)=>{
    res.render('user/index',{
        pageTitle:'Pomozone-HOME',
    })
})
app.set('view engine','ejs');
app.set('views', 'views');
const PORT = process.env.PORT || 3000;


mongoose.connect(process.env.MONGO_URI)

.then(result=>{
    app.listen(PORT);
});