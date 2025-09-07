const validator = require("validator");

const validatesignupdata = (data) => {
  const { firstname, lastname, emailid, password } = data.body;

  // name validation
  if (!firstname || !lastname) {
    throw new Error("First name and last name are required");
  }
  if (firstname.length < 2 || firstname.length > 19) {
    throw new Error("First name must be between 2 and 19 characters");
  }
  if (lastname.length < 2 || lastname.length > 19) {
    throw new Error("Last name must be between 2 and 19 characters");
  }

  // email validation
  if (!emailid || !validator.isEmail(emailid)) {
    throw new Error("A valid email is required");
  }

  // password validation
  if (!password || typeof password !== "string") {
    throw new Error("Password is required and must be a string");
  }
  if (!validator.isStrongPassword(password)) {
    throw new Error("Password is not strong enough");
  }

  return true; // validation passed
};
const validateloginupdata = (data) => {
  const {emailid, password } = data.body;

  // name validation
  
  // email validation
  if (!emailid || !validator.isEmail(emailid)) {
    throw new Error("A valid email is required");
  }

  // password validation
  if (!password || typeof password !== "string") {
    throw new Error("Password is required and must be a string");
  }

  return true; // validation passed
};

module.exports = { validatesignupdata,validateloginupdata };
