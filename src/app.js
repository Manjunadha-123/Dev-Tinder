const express = require("express");
const connectDB = require("./config/database");
const app = express();
const bcrypt = require("bcrypt");
const cookieParser = require("cookie-parser");
const jwt = require("jsonwebtoken");

const { validateSignupData } = require("./utils/validation");
const {Auth} = require("./middlewares/auth");

const User = require("./models/user");
app.use(express.json());
app.use(cookieParser());

app.post("/signup", async (req, res) => {
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

app.post("/login", async (req, res) => {
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

app.get("/profile", Auth ,async (req, res) => {
  try {
    const user = req.user;
    res.send(user);
  } catch (error) {
    return res.status(400).send("No users found");
  }
});

app.get("/feed", async (req, res) => {
  // const user = req.body.emailID;

  try {
    const userDetails = await User.find({});

    // if (user.length === 0) {
    //   return res.status(400).send("No users found");
    // } else {
    //   res.send(userDetails);
    // }
    res.send(userDetails);
  } catch (error) {
    return res.status(400).send("No users found");
  }
});

app.post("/sendConnectionRequest", Auth,(req,res)=>{
  const user = req.user;

  res.send(user.firstName+" send Connecton Request!!");
})

app.delete("/delete", async (req, res) => {
  const userid = req.body.userID;
  try {
    const deleted = await User.findByIdAndDelete({ _id: userid });
    res.send("User Delete sucessfully!");
  } catch (error) {
    res.status(400).send("Error creating user: " + error.message);
  }
});

app.patch("/update/:userId", async (req, res) => {
  const userId = req.params?.userId;
  const data = req.body;
  try {
    const ALLOWED_UPDATES = ["photoUrl", "about", "gender", "age", "skills"];
    const isUpdateAllowed = Object.keys(data).every((k) => {
      ALLOWED_UPDATES.includes(k);
    });
    if (!isUpdateAllowed) {
      throw new Error("Update not Allowed");
    }
    if (data?.skills.length > 10) {
      throw new Error("Skills cannot be morethan 10");
    }
    await User.findOneAndUpdate({ _id: userId }, data, {
      returnDocument: "after",
      runValidators: true,
    });
    res.send("Update Sucessfully!");
  } catch (error) {
    return res.status(400).send("No users found");
  }
});

connectDB()
  .then(() => {
    console.log("Database connected successfully");
    app.listen(3000, () => {
      console.log("Server is running on port 3000");
    });
  })
  .catch((err) => {
    console.error("Database connection failed:", err);
  });
