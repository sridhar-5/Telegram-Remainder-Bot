const mongoose = require("mongoose");

var TaskSchema = mongoose.Schema({
  taskName: String,
  ScheduleDate: Date,
  time: String,
});

var Task = new mongoose.model("Tasks", TaskSchema);

module.exports = Task;
