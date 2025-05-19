const Task= require('../models/task');
const User = require('../models/user');
const Progress = require('../models/progress');

exports.getProgressPage= async (req, res) => {
  try {
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    const tomorrow = new Date(today);
    tomorrow.setDate(today.getDate() + 1);

    const userId  = req.params.userId;
    const progress = await Progress.findOne({ userId:userId,
      date:{ $gte: today, $lt: tomorrow }
    });

    if (!progress) {
      return res.status(404).json({ message: "No progress found" });
    }

    res.json(progress);
  } catch (error) {
    console.error("Error fetching progress:", error);
    res.status(500).json({ message: "Server error" });
  }
}



exports.postProgressGoal= async (req, res) => {
  const { userId, minutes } = req.body;

  const today = new Date();
  today.setHours(0, 0, 0, 0);
  const tomorrow = new Date(today);
  tomorrow.setDate(today.getDate() + 1);
  try {
    let progress = await Progress.findOne({
      userId,
      date: { $gte: today ,$lt:tomorrow}
    });

    if (!progress) {
      progress = await Progress.create({
        userId,
        focusMins: minutes,
        focusGoal: 90,
        date:today
      });

    } else {
      progress.focusMins += minutes;
      await progress.save();
    }
    console.log(progress);

    res.json({ completed: progress.focusMins, goal: progress.focusGoal });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Error updating progress" });
  }
};


exports.getReset = async (req, res, next) => {
  const id = req.params.id;

    const progress = await Progress.findByIdAndUpdate(
      id,
      { focusMins: 0 },
      { new: true }
    );
    const userId = progress.userId;
    res.redirect(`/progressPage/${userId}`)

};
exports.changeGoal = async (req, res, next) => {
  try {
    const Id = req.params.id;
    const updatedGoal = req.body.focusGoal;

    const progress = await Progress.findByIdAndUpdate(
      Id,
      { focusGoal: updatedGoal },
      { new: true }
    );

    if (!progress) {
      return res.status(404).send("Progress not found");
    }

    const userId = progress.userId;
    let taskcount = 0;
    const tasks = await Task.find({ userId: userId, completed: true });
    if (tasks) {
      taskcount = tasks.length;
    }

   
    res.redirect(`/progressPage/${userId}`);


  } catch (err) {
    console.error(err);
    res.status(500).send("Server error");
  }
};


exports.displayProgress = async (req, res, next) => {
  try {
    const today = new Date();
    today.setHours(0, 0, 0, 0); 
    let streak = 0;
    let currentDate = new Date(today);
    const userId = req.params.userId;
    console.log(currentDate);


const tomorrow = new Date(today);
tomorrow.setDate(today.getDate() + 1);

let progress = await Progress.findOne({
  userId: userId,
  date: { $gte: today, $lt: tomorrow }
});

    let taskcount = 0;
    const tasks = await Task.find({ userId: userId, completed: true });
    if (tasks) {
      taskcount = tasks.length;
    }

    if (!progress) {
      progress = await Progress.create({
        userId: userId,
        date: currentDate,
        focusMins: 0,
        focusGoal: 90
      });
    }
          while (true) {
  const progress = await Progress.findOne({
    userId: userId,
    date: currentDate,
  
  });

  if (progress) {
    streak++;
  
    currentDate.setDate(currentDate.getDate() - 1);
  } else {
    break; 
  }
}


    res.render('progress-bar/progressPage', {
      progress: progress,
      taskcount: taskcount,
      streak: streak
    });
  } catch (err) {
    console.error(err);
    res.status(500).send("Server error");
  }
};