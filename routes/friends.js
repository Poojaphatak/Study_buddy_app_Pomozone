const express = require('express');
const router = express.Router();
const taskController = require('../controller/toDoTask');
const homeController = require('../controller/home')
const progressController = require('../controller/progress')
const friendController = require('../controller/friends');
router.get('/displayFriends',friendController.getFriendList)
router.get('/connect',friendController.connectFriends);
router.post('/sendRequest/:id',friendController.sendRequest);
router.post('/friends/accept/:id',friendController.acceptRequest)
router.get('/checkRequests',friendController.getFriendRequests);
router.get('/pendingRequest',friendController.getPendingList);
router.get('/leaderboard',friendController.getLeaderBoard)
module.exports=router;