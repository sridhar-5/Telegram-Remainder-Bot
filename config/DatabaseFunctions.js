const mongoose = require("mongoose");
const Task = require("../models/tasks");

async function SaveToTheDatabase(taskName, ScheduleDate, time) {
  const taskData = new Task({
    taskName: task,
    ScheduleDate: ScheduleDate,
    time: time,
  });

  await taskData.save();
}

module.exports = SaveToTheDatabase;
