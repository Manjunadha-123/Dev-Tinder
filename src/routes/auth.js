const express = require("express");
const authRouter = express.Router();
const { validateSignupData } = require("../utils/validation");
const User = require("../models/user");
const bcrypt = require("bcrypt");

authRouter.post("/signup", async (req, res) => {
  try {
    validateSignupData(req);
    const { firstName, lastName, emailID, password } = req.body;
    const passwordHash = await bcrypt.hash(password, 10);
    const user = new User({
      firstName,
      lastName,
      emailID,
      password: passwordHash,
    });
    await user.save();
    res.send("User created successfully");
  } catch (error) {
    res.status(400).send("Error creating user: " + error.message);
  }
});

authRouter.post("/login", async (req, res) => {
  try {
    const { emailID, password } = req.body;
    const user = await User.findOne({ emailID: emailID });

    if (!user) {
      throw new Error("Inavalid Crendentials!");
    }
    const isPassword = await user.validatePassword(password);
    if (isPassword) {
      // create a JWT token
      const token = await user.getJWT();

      //And the token to cookie and send to response back to th user
      res.cookie("token", token,{expires:new Date(Date.now() + 8 * 3600000)});
      res.send("Login Sucessfully!");
    } else {
      throw new Error("Inavalid Crendentials!");
    }
  } catch (error) {
    res.status(400).send("Error creating user: " + error.message);
  }
});



module.exports = authRouter;