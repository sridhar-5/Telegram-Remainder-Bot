const { Telegraf } = require("telegraf");
require("dotenv").config();

const bot = new Telegraf(process.env.TELEGRAM_BOT_TOKEN);
console.log(process.env.TELEGRAM_BOT_TOKEN);

bot.help((ctx) => ctx.reply("Instructions Here....!"));

module.exports = { bot };
