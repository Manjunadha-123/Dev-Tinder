const mongoose = require("mongoose");
const validator = require("validator");

const userSchema = new mongoose.Schema(
  {
    firstName: {
      type: String,
      required: true,
      minLength: 4,
      maxLength: 50,
    },
    lastName: {
      type: String,
    },
    emailID: {
      type: String,
      required: true,
      lowercase: true,
      unique: true,
      trim: true,
      validate(values){
        if(!validator.isEmail(values)){
            throw new Error("Inavalid email Address: " + values);
        }
      }
    },
    password: {
      type: String,
      required: true,
      validate(values){
        if(!validator.isStrongPassword(values)){
            throw new Error("Enter a strong Password: " + values);
        }
      }
    },
    age: {
      type: Number,
      min: 18,
    },
    gender: {
      type: String,
      validate(value) {
        if (!["male", "female", "others"].includes(value)) {
          throw new Error("Gender data is not valid!");
        }
      },
    },
    photoUrl: {
      default:
        "https://imgs.search.brave.com/66DDLXgQTTuzioBWr-U18A4Kr4IMF-D64A5_hmWNiTE/rs:fit:860:0:0:0/g:ce/aHR0cHM6Ly9pbWcu/ZnJlZXBpay5jb20v/cHJlbWl1bS12ZWN0/b3IvM2Qtc2ltcGxl/LXVzZXItaWNvbi1p/c29sYXRlZF8xNjky/NDEtNjk1NC5qcGc_/c2VtdD1haXNfaXRl/bXNfYm9vc3RlZCZ3/PTc0MA",
      type: String,
      validate(values){
        if(!validator.isURL(values)){
            throw new Error("Inavalid Photo Url: " + values);
        }
      }
    },
    about: {
      type: String,
      default: "This is a defualt about of the user!",
    },
    skills: {
      type: [String],
    },
  },
  {
    timestamps: true,
  }
);

const User = mongoose.model("User", userSchema);

module.exports = User;
