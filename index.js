const express = require("express");
const app = express();
const { bot, UrlBase, Bot } = require("./bot");

app.get("/", (request, response) => {
  response.send("Bot is running");
});

bot.launch();
Bot();

const PORT = process.env.PORT || 5000;

app.listen(PORT, "127.0.0.1", () => {
  console.log(`server is running on port ${PORT}`);
});
