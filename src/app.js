const express = require("express");
const connectDB = require("./config/database");
const app = express();
const cookieParser = require("cookie-parser");
const jwt = require("jsonwebtoken");

app.use(express.json());
app.use(cookieParser());

const authRouter  = require("./routes/auth");
const profileRouter  = require("./routes/profile");
const requestRouter  = require("./routes/request");

app.use("/", authRouter);
app.use("/", profileRouter);
app.use("/", requestRouter);



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



//   app.get("/feed", async (req, res) => {
//   // const user = req.body.emailID;

//   try {
//     const userDetails = await User.find({});

//     // if (user.length === 0) {
//     //   return res.status(400).send("No users found");
//     // } else {
//     //   res.send(userDetails);
//     // }
//     res.send(userDetails);
//   } catch (error) {
//     return res.status(400).send("No users found");
//   }
// });

// app.delete("/delete", async (req, res) => {
//   const userid = req.body.userID;
//   try {
//     const deleted = await User.findByIdAndDelete({ _id: userid });
//     res.send("User Delete sucessfully!");
//   } catch (error) {
//     res.status(400).send("Error creating user: " + error.message);
//   }
// });

// app.patch("/update/:userId", async (req, res) => {
//   const userId = req.params?.userId;
//   const data = req.body;
//   try {
//     const ALLOWED_UPDATES = ["photoUrl", "about", "gender", "age", "skills"];
//     const isUpdateAllowed = Object.keys(data).every((k) => {
//       ALLOWED_UPDATES.includes(k);
//     });
//     if (!isUpdateAllowed) {
//       throw new Error("Update not Allowed");
//     }
//     if (data?.skills.length > 10) {
//       throw new Error("Skills cannot be morethan 10");
//     }
//     await User.findOneAndUpdate({ _id: userId }, data, {
//       returnDocument: "after",
//       runValidators: true,
//     });
//     res.send("Update Sucessfully!");
//   } catch (error) {
//     return res.status(400).send("No users found");
//   }
// });
