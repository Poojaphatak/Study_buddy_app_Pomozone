const express = require('express');
const router = express.Router();
const isAuthenticated = require('../middleware/authentication');
const userController = require('../controller/user');

router.post('/signup', userController.postregister);

router.post('/signin',userController.postLogin);

router.get('/dashboard',isAuthenticated,userController.getdashboard);

router.get('/signup',userController.getRegister);

// router.get('/logout',userController.getLogout);
module.exports=router;