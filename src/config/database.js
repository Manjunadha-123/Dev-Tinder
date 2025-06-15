const mongoose = require("mongoose");

const connectDB = async () => {
  await mongoose.connect(
    "mongodb+srv://gudamanjunadhareddy:savepassword123@ayanokoji.ifdpd86.mongodb.net/devTinder"
  );
};

module.exports = connectDB;
