const express = require('express');
const requestRouter = express.Router();
const {Auth} = require("../middlewares/auth1");

requestRouter.post("/sendConnectionRequest", Auth,(req,res)=>{
  const user = req.user;

  res.send(user.firstName+" send Connecton Request!!");
});

module.exports = requestRouter;