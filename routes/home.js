const express = require('express');
const router = express.Router();
const isAuthenticated = require('../middleware/authentication');
const userController = require('../controller/user');
const taskController = require('../controller/toDoTask');
const homeController = require('../controller/home')
const progressController = require('../controller/progress')
const Progress = require('../models/progress')
router.get('/tasks',taskController.getTask);

router.post('/tasks',taskController.postTask);             

router.get('/tasklist/:UserId',taskController.getTaskList);

router.get('/edit-task/:taskId',taskController.getEditTask);

router.post('/edit-task',taskController.postEditTask);

router.post('/check-task/:taskId',taskController.postCheckTask);

router.get('/delete-task/:taskId',taskController.getDelete); 

router.get('/progress/:userId',progressController.getProgressPage);

router.get('/feedback/:userId',homeController.getFeedback);

router.post('/feedback/',homeController.postFeedback);

router.post('/progress/update',progressController.postProgressGoal)
router.get('/resetGoal/:id',progressController.getReset)
router.post('/changeGoal/:id',progressController.changeGoal)
router.get('/progressPage/:userId',progressController.displayProgress)




module.exports=router;