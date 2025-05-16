const Task= require('../models/task');
const User = require('../models/user');
const Progress = require('../models/progress');

exports.getProgressPage=(req,res,next)=>{
    res.render('progress-bar/progressPage')
}

exports.postProgressGoal=async (req,es,next)=>{
    const userId = req.params.userId;
    const minutes = req.body.minutes;
   try {
    let today = new Date();
    today.setHours(0, 0, 0, 0); // Start of today

    let progress = await Progress.findOne({ userId, date: { $gte: today } });

    if (!progress) {
      progress = new Progress({ userId, focusMins: minutes });
    } else {
      progress.minutesFocused += minutes;
    }

    await progress.save();
    res.json({ message: "Progress saved", progress });
  } catch (err) {
    res.status(500).json({ message: "Error saving progress", error: err });
  }

}



