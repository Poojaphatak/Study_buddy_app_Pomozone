const express = require('express');
const router = express.Router();
const isAuthenticated = require('../middleware/authentication');
const userController = require('../controller/user');
const taskController = require('../controller/toDoTask');


router.get('/tasks',taskController.getTask);

router.post('/tasks',taskController.postTask);             

router.get('/tasklist/:UserId',taskController.getTaskList);

router.get('/edit-task/:taskId',taskController.getEditTask);

router.post('/edit-task',taskController.postEditTask);

router.post('/check-task/:taskId',taskController.postCheckTask);

router.get('/delete-task/:taskId',taskController.getDelete); 


module.exports=router;