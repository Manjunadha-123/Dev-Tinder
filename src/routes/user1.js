const express = require("express");
const userRouter = express.Router();
const User = require("../models/user");
const { Auth } = require("../middlewares/auth1");
const ConnectionRequest = require("../models/connectionRequest");

const USER_SAFE_DATA ="firstName lastName";

userRouter.get("/user/requests/received", Auth, async (req, res) => {
  try {
    const loggedInUser = req.user;

    const connectionRequests = await ConnectionRequest.find({
      toUserId: loggedInUser._id,
      status: "interested",
    }).populate("fromUserId",USER_SAFE_DATA);

    res.json({
      message: "Data fetched successfully",
      data: connectionRequests,
    });
  } catch (error) {
    res.status(400).send("Failed to fetch requests");
  }
});

userRouter.get("/user/connections", Auth, async (req, res) => {
  try {
    const loggedInUser = req.user;
    const connectionRequest = await ConnectionRequest.find({
      $or: [{ fromUserId: loggedInUser._id }, { toUserId: loggedInUser._id }],
      status: "accepted",
    }).populate("fromUserId", USER_SAFE_DATA);

    const data = connectionRequest.map((row) => {
      if(row.fromUserId._id.toString() === loggedInUser._id.toString()){
        return row.toUserId;
      }
      return row.fromUserId;
    });

    res.json({
      data
    });
  } catch (error) {
    res.status(400).send("Failed to fetch connections");
  }
});

userRouter.get("/feed", Auth, async (req, res) => {
  try{
    // user should see all the user cards except
    // 0. his own card
    // 1. his connections
    // 2. ignored people
    // 3. already sent the connection request

    const loggedInUser = req.user;

    const page = parseInt(req.query.page) || 1;
    let limit = parseInt(req.query.limit) || 10;
    limit = limit > 50 ? 50 : limit;
    const skip = (page - 1) * limit;

    // find all connection requests (sent + received)
    const connectionRequests = await ConnectionRequest.find({
      $or: [{ fromUserId: loggedInUser._id }, { toUserId: loggedInUser._id }],
    }).select("fromUserId toUserId");

    const hideUsersFromFeed = new Set();
    connectionRequests.forEach((request) => {
      hideUsersFromFeed.add(request.fromUserId.toString());
      hideUsersFromFeed.add(request.toUserId.toString());
    });

    // these are the user i want.
    const users = await User.find({
      $and:[
        { _id: { $nin: Array.from(hideUsersFromFeed) } },
        { _id: { $ne: loggedInUser._id }  },
      ]
    }).select(USER_SAFE_DATA).skip(skip).limit(limit);

    res.send(users);
  }
  catch(err){
    res.status(400).send("Failed to fetch feed");
  }
});

//   /feed?page=1&limit=10 => .skip(0) & .limit(10)
//   /feed?page=2&limit=10 => .skip(10) & .limit(10)
//   /feed?page=3&limit=10 => .skip(20) & .limit(10)

// skip = (page - 1) * limit


module.exports = userRouter;
