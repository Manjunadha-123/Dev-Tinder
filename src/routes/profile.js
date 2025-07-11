const express = require("express");
const profileRouter = express.Router();
const { Auth } = require("../middlewares/auth1");
const {validateEditProfileData} = require("../utils/validation");

profileRouter.get("/profile/view", Auth, async (req, res) => {
  try {
    const user = req.user;
    res.send(user);
  } catch (error) {
    return res.status(400).send("No users found");
  }
});

profileRouter.patch("/profile/edit", Auth, async (req, res) => {
  try {
    if (!validateEditProfileData(req)) {
      throw new Error("Invalid profile data");
    }
    const loggedInUser = req.user;

    Object.keys(req.body).forEach((key) => {
      loggedInUser[key] = req.body[key];
    });

    await loggedInUser.save();
    res.json({
      message: `${loggedInUser.firstName} profile updated successfully!`,
      data: loggedInUser,
    });
  } catch (error) {
    return res.status(400).send("Error: " + error.message);
  }
});

module.exports = profileRouter;
