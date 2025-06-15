const express = require("express");

const app = express();

// const {Auth} = require('./middlewares/auth.js');

// app.use('/Admin',Auth);

app.get("/user", (req, res) => {
  try {
    throw new Error("This is a test error"); // This will be caught by the error handler
    res.send("Hello, World!");
  } catch (error) {
    res.status(500).send("An error occurred: " + error.message);
  }
});

app.use((err, req, res, next) => {
    if(err){
        res.send("Something went wrong: " + err.message);
    }
});

app.listen(3000, () => {
  console.log("Server is running on port 3000");
});
