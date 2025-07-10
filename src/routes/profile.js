const express = require("express");
const profileRouter = express.Router();
const {Auth} = require("../middlewares/auth");

profileRouter.get("/profile", Auth ,async (req, res) => {
  try {
    const user = req.user;
    res.send(user);
  } catch (error) {
    return res.status(400).send("No users found");
  }
});

module.exports = profileRouter;