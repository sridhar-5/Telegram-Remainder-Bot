const { Telegraf } = require("telegraf");
const axios = require("axios");
const Calendar = require("telegraf-calendar-telegram");

function calendarFunction(bot) {
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
    minDate.setMonth(today.getMonth() - 6);
    const maxDate = new Date();
    maxDate.setMonth(today.getMonth() + 6);
    maxDate.setDate(today.getDate());

    context.reply(
      "There you go..! Pick a Date",
      calendar.setMinDate(minDate).setMaxDate(maxDate).getCalendar()
    );
  });
}

module.exports = calendarFunction;
