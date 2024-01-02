const mongoose = require("mongoose");

const classSchema = mongoose.Schema({
  name: String,
  teacher: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
  },

  course: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Course",
  },

  students: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
  ],
});

const classe = mongoose.model("Class", classSchema);

module.exports = classe;
