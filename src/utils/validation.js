const validator = require("validator");
const validateSignupData = (req) => {
  const { firstName, lastName, emailID, password } = req.body;
  if (!firstName || !lastName) {
    throw new Error("Name is not valid");
  } else if (!validator.isEmail(emailID)) {
    throw new Error("Enter a valid Email");
  } else if (!validator.isStrongPassword(password)) {
    throw new Error("Enter a Strong  Password");
  }
};

const validateEditProfileData = (req) => {
  const allowedFields = [
    "firstName",
    "lastName",
    "emailID",
    "photoUrl",
    "about",
    "skills",
    "gender",
    "age",
  ];

  const isEditAllowed = Object.keys(req.body).every((field) => {
    return allowedFields.includes(field);
  });
  return isEditAllowed;
};

module.exports = { validateSignupData, validateEditProfileData };
