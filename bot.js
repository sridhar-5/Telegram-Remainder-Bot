const { Telegraf } = require("telegraf");
const axios = require("axios");
const Calendar = require("telegraf-calendar-telegram");
require("dotenv").config();
const SelectDateFromCalendar = require("./calendar/calendarFunction");

const bot = new Telegraf(process.env.TELEGRAM_BOT_TOKEN);

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

        ctx.replyWithMarkdown(
          "Almost there..! To pick a date reply with <br /> `/calendar`"
        );
      }
    });
  });

  // listen for the selected date event
  calendar.setDateListener((context, date) => context.reply(date));
  // retreive the calendar HTML
  bot.command("calendar", (context) => {
    const today = new Date();
    const minDate = new Date();
    minDate.setMonth(today.getMonth() - 6);
    const maxDate = new Date();
    maxDate.setMonth(today.getMonth() + 6);
    maxDate.setDate(today.getDate());

    context.reply(
      "There you go..! Pick a Date",
      calendar.setMinDate(minDate).setMaxDate(maxDate).getCalendar()
    );
  });

  bot.launch();

  process.once("SIGINT", () => bot.stop("SIGINT"));
  process.once("SIGTERM", () => bot.stop("SIGTERM"));
}

module.exports = { bot, Bot };
