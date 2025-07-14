const express = require("express");
const userRouter = express.Router();

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


module.exports = userRouter;
