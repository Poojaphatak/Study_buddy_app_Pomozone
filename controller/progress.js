const Task= require('../models/task');
const User = require('../models/user');
const Progress = require('../models/progress');

exports.getProgressPage= async (req, res) => {
  try {
    const userId  = req.params.userId;
    const progress = await Progress.findOne({ userId:userId});

    if (!progress) {
      return res.status(404).json({ message: "No progress found" });
    }

    res.json(progress); // This should return the actual document
  } catch (error) {
    console.error("Error fetching progress:", error);
    res.status(500).json({ message: "Server error" });
  }
}



exports.postProgressGoal= async (req, res) => {
  const { userId, minutes } = req.body;

  const today = new Date();
  today.setHours(0, 0, 0, 0);

  try {
    let progress = await Progress.findOne({
      userId,
      date: { $gte: today }
    });

    if (!progress) {
      progress = await Progress.create({
        userId,
        focusMins: minutes,
        focusGoal: 90,
        date: new Date()
      });

      // res.render('/progress-bar/progress',{
      //   progress:progress,
      // });
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
  const Id = req.params.id;

  const updatedGoal = req.body.focusGoal;
 
    const progress = await Progress.findByIdAndUpdate(
      Id,
      { focusGoal: updatedGoal },
      { new: true }
    );
     const userId = progress.userId;
      res.redirect(`/progressPage/${userId}`)
    
};
