const Task= require('../models/task');
const User = require('../models/user');
exports.getTaskList = async(req,res,next)=>{
    const userId = req.params.UserId || req.session.UserId;
   const tasks = await Task.find({userId:userId})
  
       res.render('toDo/task-list',{
          tasks:tasks,
          userId:req.session.UserId || userId,
       });
   
};

exports.getTask = async (req,res,next)=>{
     const userId = req.session.UserId ;
     
    const user = await User.findOne({_id:userId})
    res.render('toDo/create-task',{
  
     userId:userId,
     editing:false,
 });
}

exports.postTask = async (req, res) => {
    const title = req.body.title;
    const UserId = req.body.userId || req.session.UserId; // Fallback to session if userId is not in the body
    console.log(UserId);

    // if (!UserId) {
    //     console.log('Error: UserId is missing');
    //     return res.status(400).send('Error: UserId is required');
    // }

    const newtask = new Task({
           title:title,
           userId:UserId,
    })
    return newtask.save().then((result)=>{
      res.redirect(`/tasklist/${UserId}`);
    })

   
};

exports.getEditTask =  async (req, res, next) => {
    let editing = req.query.edit;
    let id = req.params.taskId;

    if (!editing) {
        return res.redirect('/tasklist');
    }

    const task = await  Task.findOne({_id:id});
    console.log(task)
    const user = await User.findOne({_id:task.userId});
    console.log("UserID:",task.userId);
    if (!task) {
        return res.redirect('/tasklist');
    }
   
    res.render('toDo/create-task', {
        task: task,
        taskId: id,
        editing: editing,
        userId: task.userId,
        user:user,
    });
};

exports.postEditTask = async (req,res,next)=>{
   
     const taskId = req.body.taskId;
     console.log(taskId);
    
     const updatedTitle = req.body.title;
     const updatedTask = await Task.findOneAndUpdate(
            { _id: taskId },              
            { title: updatedTitle },        
            { new: true }                
        );
     if (!updatedTask) {
            return res.status(404).send('Task not found');
        }
        res.redirect(`/tasklist/${updatedTask.userId}`);
 };

 exports.getDelete = async (req,res,next)=>{
    const id = req.params.taskId;
    const userId = req.session.UserId;
   await  Task.findByIdAndDelete(id);
    res.redirect(`/tasklist/${userId}`);
};

exports.postCheckTask = async (req,res,next)=>{
    const id = req.params.taskId;
    const task = await Task.findOne({_id:id});
    const userId = req.session.UserId;
    let complete = task.completed;
    if(!complete){
        task.completed=true;
    }
    else{
        task.completed=false;
    }

    await task.save();
    res.redirect(`/tasklist/${userId}`);

};


