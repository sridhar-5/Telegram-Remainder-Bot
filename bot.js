const { Telegraf } = require("telegraf");
const axios = require("axios");
const Calendar = require("telegraf-calendar-telegram");
require("dotenv").config();
const SelectDateFromCalendar = require("./calendar/calendarFunction");

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
        SelectDateFromCalendar(bot);
      }
    });
  });


process.once("SIGINT", () => bot.stop("SIGINT"));
process.once("SIGTERM", () => bot.stop("SIGTERM"));

module.exports = { bot, Bot };
