const { Telegraf } = require("telegraf");
const { Keyboard, Key } = require("telegram-keyboard");
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
          "Yay..!Almost there, To pick a date reply with `/calendar`"
        );
      }
    });
  });

  var ScheduleDate = "";

  // listen for the selected date event
  calendar.setDateListener((context, date) => {
    ScheduleDate = date;
    context.replyWithMarkdown(`Selected date is ${date}`);
    context.reply("Donezo..! To set the time reply with `/picktime`");
  });

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

  // setting up time starts here
  Buttons = ["↑", "↓"];
  AMPM = ["AM", "PM"];

  var currentHours = "12";
  var currentMinutes = "00";
  var currentMeridium = "AM";

  var keyboard = Keyboard.make(
    [
      Key.callback(Buttons[0], "incHours"),
      Key.callback(Buttons[0], "incMinutes"),
      Key.callback(Buttons[0], "AMPM"),
      Key.callback(currentHours, "Noaction"),
      Key.callback(currentMinutes, "Noaction"),
      Key.callback(currentMeridium, "Noaction"),
      Key.callback(Buttons[1], "DecHours"),
      Key.callback(Buttons[1], "DecMinutes"),
      Key.callback(Buttons[1], "AMPM"),
      Key.callback("Okay", "Proceed"),
    ],
    {
      columns: 3,
    }
  ).inline();

  bot.command("picktime", (ctx) => {
    ctx.reply("time", keyboard);
  });

  bot.action("incHours", (ctx) => {
    const keyboard_str = keyboard.reply_markup.inline_keyboard;
    var currentHrs = parseInt(keyboard_str[1][0].text) + 1;
    if (currentHrs > 12) currentHrs = 1;
    currentHours = String(currentHrs);
    keyboard = Keyboard.make(
      [
        Key.callback(Buttons[0], "incHours"),
        Key.callback(Buttons[0], "incMinutes"),
        Key.callback(Buttons[0], "AMPM"),
        Key.callback(currentHours, "Noaction"),
        Key.callback(currentMinutes, "Noaction"),
        Key.callback(currentMeridium, "Noaction"),
        Key.callback(Buttons[1], "DecHours"),
        Key.callback(Buttons[1], "DecMinutes"),
        Key.callback(Buttons[1], "AMPM"),
        Key.callback("Okay", "Proceed"),
      ],
      {
        columns: 3,
      }
    ).inline();
    ctx.editMessageReplyMarkup(keyboard.reply_markup);
  });

  bot.action("DecHours", (ctx) => {
    const keyboard_str = keyboard.reply_markup.inline_keyboard;
    var currentHrs = parseInt(keyboard_str[1][0].text) - 1;
    if (currentHrs < 1) currentHrs = 12;
    currentHours = String(currentHrs);
    keyboard = Keyboard.make(
      [
        Key.callback(Buttons[0], "incHours"),
        Key.callback(Buttons[0], "incMinutes"),
        Key.callback(Buttons[0], "AMPM"),
        Key.callback(currentHours, "Noaction"),
        Key.callback(currentMinutes, "Noaction"),
        Key.callback(currentMeridium, "Noaction"),
        Key.callback(Buttons[1], "DecHours"),
        Key.callback(Buttons[1], "DecMinutes"),
        Key.callback(Buttons[1], "AMPM"),
        Key.callback("Okay", "Proceed"),
      ],
      {
        columns: 3,
      }
    ).inline();
    ctx.editMessageReplyMarkup(keyboard.reply_markup);
  });

  bot.action("incMinutes", (ctx) => {
    const keyboard_str = keyboard.reply_markup.inline_keyboard;
    var currentMins = parseInt(keyboard_str[1][1].text) + 1;
    if (currentMins > 60) currentMins = 1;
    currentMinutes = String(currentMins);
    keyboard = Keyboard.make(
      [
        Key.callback(Buttons[0], "incHours"),
        Key.callback(Buttons[0], "incMinutes"),
        Key.callback(Buttons[0], "AMPM"),
        Key.callback(currentHours, "Noaction"),
        Key.callback(currentMinutes, "Noaction"),
        Key.callback(currentMeridium, "Noaction"),
        Key.callback(Buttons[1], "DecHours"),
        Key.callback(Buttons[1], "DecMinutes"),
        Key.callback(Buttons[1], "AMPM"),
        Key.callback("Okay", "Proceed"),
      ],
      {
        columns: 3,
      }
    ).inline();
    ctx.editMessageReplyMarkup(keyboard.reply_markup);
  });

  bot.action("DecMinutes", (ctx) => {
    const keyboard_str = keyboard.reply_markup.inline_keyboard;
    var currentMins = parseInt(keyboard_str[1][1].text) - 1;
    if (currentMins < 0) currentMins = 59;
    currentMinutes = String(currentMins);
    keyboard = Keyboard.make(
      [
        Key.callback(Buttons[0], "incHours"),
        Key.callback(Buttons[0], "incMinutes"),
        Key.callback(Buttons[0], "AMPM"),
        Key.callback(currentHours, "Noaction"),
        Key.callback(currentMinutes, "Noaction"),
        Key.callback(currentMeridium, "Noaction"),
        Key.callback(Buttons[1], "DecHours"),
        Key.callback(Buttons[1], "DecMinutes"),
        Key.callback(Buttons[1], "AMPM"),
        Key.callback("Okay", "Proceed"),
      ],
      {
        columns: 3,
      }
    ).inline();
    ctx.editMessageReplyMarkup(keyboard.reply_markup);
  });

  bot.action("AMPM", (ctx) => {
    const keyboard_str = keyboard.reply_markup.inline_keyboard;
    var currentMeri = keyboard_str[1][2].text;

    if (currentMeri == "AM") {
      currentMeridium = "PM";
    } else {
      currentMeridium = "AM";
    }
    keyboard = Keyboard.make(
      [
        Key.callback(Buttons[0], "incHours"),
        Key.callback(Buttons[0], "incMinutes"),
        Key.callback(Buttons[0], "AMPM"),
        Key.callback(currentHours, "Noaction"),
        Key.callback(currentMinutes, "Noaction"),
        Key.callback(currentMeridium, "Noaction"),
        Key.callback(Buttons[1], "DecHours"),
        Key.callback(Buttons[1], "DecMinutes"),
        Key.callback(Buttons[1], "AMPM"),
        Key.callback("Okay", "Proceed"),
      ],
      {
        columns: 3,
      }
    ).inline();
    ctx.editMessageReplyMarkup(keyboard.reply_markup);
  });

  bot.action("Proceed", (ctx) => {
    var time = currentHours + ":" + currentMinutes + " " + currentMeridium;
    console.log(ctx.callbackQuery.message);
    ctx.editMessageText(time);
    ctx.reply(
      `Donezo..! \nTask scheduled on: ${ScheduleDate} \nScheduled at: ${time}..!`
    );
  });

  bot.launch();

  process.once("SIGINT", () => bot.stop("SIGINT"));
  process.once("SIGTERM", () => bot.stop("SIGTERM"));
}

module.exports = { bot, Bot };
