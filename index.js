const express = require("express");
const app = express();
require("dotenv").config();

const { bot, UrlBase, Bot } = require("./bot");

app.get("/", (request, response) => {
  response.send("Bot is running");
});

bot.launch();
Bot();

const PORT = process.env.PORT || 3000;
//listening
app.listen(PORT, () => {
  console.log(`Listening on port ${PORT}`);
});
