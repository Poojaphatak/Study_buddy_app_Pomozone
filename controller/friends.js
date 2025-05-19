const Task= require('../models/task');
const User = require('../models/user');
const Progress = require('../models/progress');

exports.getFriendList = async (req, res) => {
    console.log(req.session.UserId);
  const user = await User.findById(req.session.UserId).populate('friends');
  res.render('friends/friend-list', { friends: user.friends });
}

exports.connectFriends=async (req, res) => {
  const currentUser = await User.findById(req.session.UserId);
  const users = await User.find({ _id: { $ne: currentUser._id } });
 users.filter(user => !currentUser.friends.includes(user._id));
  res.render('friends/connectFriends', { users, currentUser });
}

exports.sendRequest = async(req,res,next)=>{
    const targetUser = await User.findById(req.params.id);
    const currentUser = await User.findById(req.session.UserId);

    if(!targetUser.friendRequests.includes(currentUser._id)){
        targetUser.friendRequests.push(currentUser._id);
        currentUser.sentRequestList.push(targetUser._id);
        await targetUser.save();
        await currentUser.save();
    }
    res.redirect('/connect');
}

exports.acceptRequest = async(req,res,next)=>{
    const targetUser = await User.findById(req.params.id);
    const currentUser = await User.findById(req.session.UserId);

     if (!currentUser || !targetUser) {
      return res.status(404).send("User not found");
    }

    targetUser.friends.push(currentUser._id);
    currentUser.friends.push(targetUser._id);
   

     currentUser.friendRequests = currentUser.friendRequests.filter(userId=>{
      return  userId.toString()!==targetUser._id.toString();
    });

     targetUser.sentRequestList = targetUser.sentRequestList.filter(userId=>{
      return userId.toString()!==currentUser._id.toString();
     });

    await currentUser.save();
    await targetUser.save();

    res.redirect('/displayFriends');



}

exports.getFriendRequests=async(req,res,next)=>{
  const currentUser = await User.findById(req.session.UserId).populate('friendRequests');
  res.render('friends/friend-request', { user: currentUser });
};

exports.getPendingList = async (req,res,next)=>{
   const currentUser = await User.findById(req.session.UserId).populate('sentRequestList');
  res.render('friends/pending-request', { user: currentUser });
}