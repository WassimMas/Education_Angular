// import mongoose module
const mongoose = require("mongoose");

// creation of schema

const userSchema = mongoose.Schema({
  firstName: String,
  lastName: String,
  email: String,
  password: String,
  role: String,
  img: String,
  cv: String,
  phone: String,
  address: String,
  speciality: String,
  childPhone: String,
  status: String,
  courses: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Course",
    },
  ],
  evaluations: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Evaluation",
    },
  ],
});

// creation User Model

const user = mongoose.model("User", userSchema);

// export model

module.exports = user;
