const mongoose = require("mongoose");
const nodeCron = require("node-cron");
const express = require("express");
const router = express.Router();
const Task = require("../models/tasks");
const { bot, Bot } = require("../bot");
const baseUrl = "http://eventbuddy-telegram-bot.azurewebsites.net";

function MatchDateFormats(dateString) {
  var actualdate = dateString.split(",");
  actualdate.pop();
  var dateMonth = actualdate[0].toString().split(" ");
  if (parseInt(dateMonth[1]) < 10) {
    dateMonth[1] = "0" + dateMonth[1];
  }
  dateMonth.push(actualdate[1].trim());
  var returnDateString = dateMonth.join(" ");
  return returnDateString;
}

router.get("/", async (request, response) => {
  var allTasks = await Task.find({});
  console.log(allTasks[0].ScheduleDate.toString().slice(4, 15));
  const date = new Date();
  var Today = MatchDateFormats(
    date
      .toLocaleString("en-IN", {
        timeZone: "Asia/Kolkata",
        dateStyle: "medium",
        timeStyle: "short",
      })
      .toString()
  );
  console.log(Today);

  console.log(allTasks[0].ScheduleDate.toString().slice(4, 15) == Today);
  var filteredTasks = allTasks.filter(
    (task) => task.ScheduleDate.toString().slice(4, 15) == Today
  );

  var i = 1;
  bot.telegram.sendMessage(`I got you tasks Due Today.`);
  filteredTasks.forEach((task) => {
    bot.telegram.sendMessage(
      `Task ${i}\nTask Name: ${task.taskName}\nDue Time: ${task.time}`
    );
  });
  response.send(filteredTasks);
});

nodeCron.schedule("*/0.5 * * * *", async () => {
  //pushes notification at 6:30am IST
  var endpoint = baseUrl + "/bot/reminder/upcoming";
  console.log("called");
  console.log(endpoint);
  await axios
    .get(endpoint)
    .then((res) => {
      if (process.env.NODE_ENV === "development") {
        console.log(res.data);
      }
    })
    .catch((err) => {
      console.log(err);
    });
  console.log("request made");
});

module.exports = router;
