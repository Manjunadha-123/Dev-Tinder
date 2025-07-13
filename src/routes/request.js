const express = require("express");
const requestRouter = express.Router();
const { Auth } = require("../middlewares/auth1");
const { Connection } = require("mongoose");
const ConnectionRequest = require("../models/connectionRequest");
const User = require("../models/user");

requestRouter.post("/request/send/:status/:toUserId", Auth, async (req, res) => {
  try {
    const fromUserId = req.user._id;
    const toUserId = req.params.toUserId;
    const status = req.params.status;

    const allowedStatus = ["ignore","interested"];

    if(!allowedStatus.includes(status)) {
      return res.status(400).json({message: `Invalid status type: ` + status});
    }

    const toUser = await User.findById(toUserId);
    if(!toUser) {
      return res.status(400).json({message: "User not found!"});
    }


    const existingConnectionRequest = await ConnectionRequest.findOne({
      $or: [
        { fromUserId, toUserId }, 
        { fromUserId: toUserId, toUserId: fromUserId },
      ],
    });

    if(existingConnectionRequest) {
      return res.status(400).json({message: "Request already exists!"});
    }

    const connectionRequest = new ConnectionRequest({
      fromUserId,
      toUserId,
      status,
    });

    const data = await connectionRequest.save();

    res.json({
      message: req.user.firstName + " sent a " + status + " request to " + toUser.firstName + "!",
      data,
    });
  } catch (error) {
    res.status(400).send("Error: " + error.message);
  }
});

module.exports = requestRouter;
