const express = require("express");
const connectDB = require("./config/database");
const app = express();

const User = require("./models/user");
app.use(express.json());

app.post("/signup", async (req, res) => {
  const user = new User(req.body);
  try {
    await user.save();
    res.send("User created successfully");
  } catch (error) {
    res.status(400).send("Error creating user: " + error.message);
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

app.delete("/delete", async (req,res)=>{
  const userid = req.body.userID;
  try{
  const deleted = await User.findByIdAndDelete({_id:userid});
  res.send("User Delete sucessfully!");

  }
   catch (error) {
    res.status(400).send("Error creating user: " + error.message);
  }
})

app.patch("/update", async (req,res)=>{
  const email = req.body.emailID;
  const data = req.body;
  try {
     await User.findOneAndUpdate({ emailID: email }, data);
    res.send("Update Sucessfully!");
  } catch (error) {
    return res.status(400).send("No users found");
  }
})

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
