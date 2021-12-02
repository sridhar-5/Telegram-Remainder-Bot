const mongoose = require("mongoose");

async function SaveToTheDatabase(task, ScheduleDate, time) {
  const Task = new mongoose.model("Tasks", {
    task: String,
    ScheduleDate: Date,
    time: String,
  });

  const taskData = new Task({
    task: task,
    ScheduleDate: ScheduleDate,
    time: time,
  });

  await taskData.save();
}

module.exports = SaveToTheDatabase;
