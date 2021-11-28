const { Telegraf } = require("telegraf");
const axios = require("axios");
const Calendar = require("telegraf-calendar-telegram");
require("dotenv").config();

const bot = new Telegraf(process.env.TELEGRAM_BOT_TOKEN);

// const calendar = new Calendar(bot);
// console.log(calendar.getCalendar());

// const UrlBase =
//   process.env.NODE_ENV == "development"
//     ? "https://localhost:5000"
//     : "https://events-buddy-bot.herokuapp.com";

async function Bot() {
  bot.start((ctx) => ctx.reply("Welcome!"));
  bot.help((ctx) => ctx.reply("Schedule an event..!"));

  //create the task
  bot.command("create", (ctx) => {
    ctx.reply(`Heyya..! Back again..What do you want to schedule ?`);

    bot.on("text", (ctx) => {
      const task = ctx.message.text;

      if (process.env.NODE_ENV === "development") {
        console.log(ctx.message);
      }
      if (task.length > 0) {
        ctx.reply(
          `Okayyy..${ctx.chat.username}! I will sure make a note about ${task}`
        );
        // retreive the calendar HTML
        ctx.reply("When is this task due ?", calendar.getCalendar());
        // listen for the selected date event
        calendar.setDateListener((context, date) => context.reply(date));
      }
    });
  });

  const calendar = new Calendar(bot, {
    startWeekDay: 0,
    weekDayNames: ["S", "M", "T", "W", "T", "F", "S"],
    monthNames: [
      "Jan",
      "Feb",
      "Mar",
      "Apr",
      "May",
      "Jun",
      "Jul",
      "Aug",
      "Sep",
      "Oct",
      "Nov",
      "Dec",
    ],
    minDate: null,
    maxDate: null,
  });

  // listen for the selected date event
  calendar.setDateListener((context, date) => context.reply(date));
  // retreive the calendar HTML
  bot.command("calendar", (context) => {
    const today = new Date();
    const minDate = new Date();
    minDate.setMonth(today.getMonth() - 2);
    const maxDate = new Date();
    maxDate.setMonth(today.getMonth() + 2);
    maxDate.setDate(today.getDate());

    context.reply(
      "Here you are",
      calendar.setMinDate(minDate).setMaxDate(maxDate).getCalendar()
    );
  });
}

process.once("SIGINT", () => bot.stop("SIGINT"));
process.once("SIGTERM", () => bot.stop("SIGTERM"));

module.exports = { bot, Bot };
