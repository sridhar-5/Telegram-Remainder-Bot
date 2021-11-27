const { Telegraf } = require("telegraf");
require("dotenv").config();

const bot = new Telegraf(process.env.TELEGRAM_BOT_TOKEN);

const UrlBase =
  process.env.NODE_ENV === "development"
    ? "http://localhost:3000"
    : "https://events-buddy-bot.herokuapp.com";

async function AboutBot() {
  bot.start((ctx) => ctx.reply("Welcome!"));
  bot.help((ctx) => ctx.reply("Schedule an event..!"));
  bot.command("events", (ctx) => ctx.reply("Instructions Here....!"));
}

process.once("SIGINT", () => bot.stop("SIGINT"));
process.once("SIGTERM", () => bot.stop("SIGTERM"));

module.exports = { bot, UrlBase, AboutBot };
