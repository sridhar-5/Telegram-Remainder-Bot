const mongoose = require("mongoose");
const Task = require("../models/tasks");

async function SaveToTheDatabase(task, ScheduleDate, time) {
  const taskData = new Task({
    task: task,
    ScheduleDate: ScheduleDate,
    time: time,
  });

  await taskData.save();
}

module.exports = SaveToTheDatabase;
