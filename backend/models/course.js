const mongoose = require("mongoose");

const courseSchema = mongoose.Schema({
  name: String,
  description: String,
  duration: String,
  teacher: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
  },
  img: String,
});

const course = mongoose.model("Course", courseSchema);

module.exports = course;
