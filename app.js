const http = require('http');
const User = require('./models/user');
const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');
const taskRouter= require('./routes/home');
const app = express(); 
app.use(express.static("public"));
const userRouter = require('./routes/user');
const session = require('express-session');


app.use(session({
  secret: 'your-secret-key', 
  resave: false,
  saveUninitialized: false,
  cookie: { secure: false } 
}));
app.use(express.json()); 
app.use(bodyParser.urlencoded({extended:false}));


const mongoose = require('mongoose');
app.use(userRouter);
app.use(taskRouter);
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



mongoose.connect('mongodb+srv://Pooja:k29yKSf1KXih3Ciw@clustertube.eluayo2.mongodb.net/studyapp?retryWrites=true')
.then(result=>{
    app.listen(3000)
});