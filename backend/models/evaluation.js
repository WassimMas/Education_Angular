const mongoose = require("mongoose");

const evaluationSchema = mongoose.Schema({
  note: String,
  evaluation: String,
  student: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
  },
  course: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Course",
  },
});

const evaluation = mongoose.model("Evaluation", evaluationSchema);

module.exports = evaluation;
