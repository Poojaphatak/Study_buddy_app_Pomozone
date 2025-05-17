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
router.get('/progressPage/:userId',async(req,res,next)=>{
    const userId=req.params.userId;
    const progress = await Progress.findOne({userId:userId});
    if(!progress){
      return  Progress.create({
            userId:userId,


        }).then(progress=>{
            res.render('progress-bar/progressPage',{
                progress:progress,
            })
        })
    }
    else{
        console.log(progress._id);
        res.render('progress-bar/progressPage',{
            progress:progress
        })
    }
})



// // GET progress for today
// router.get('/progress/:userId', async (req, res) => {
//   const { userId } = req.params;
//   const today = new Date().toDateString();

//   let progress = await Progress.findOne({ userId, date: today });

//   if (!progress) {
//     progress = await Progress.create({ userId });
//   }

//   res.json(progress);
// });

// // POST to update minutes focused
// router.post('/:userId/focus', async (req, res) => {
//   const { userId } = req.params;
//   const { minutes } = req.body;
//   const today = new Date().toDateString();

//   const progress = await Progress.findOneAndUpdate(
//     { userId, date: today },
//     { $inc: { minutesFocused: minutes } },
//     { new: true, upsert: true }
//   );

//   res.json(progress);
// });

// // PATCH to update goal
// router.patch('/:userId/goal', async (req, res) => {
//   const { userId } = req.params;
//   const { focusGoal } = req.body;
//   const today = new Date().toDateString();

//   const progress = await Progress.findOneAndUpdate(
//     { userId, date: today },
//     { focusGoal },
//     { new: true, upsert: true }
//   );

//   res.json(progress);
// });

// module.exports = router;


module.exports=router;