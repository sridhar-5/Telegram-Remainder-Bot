const express = require("express");
const app = express();
const { bot, UrlBase } = require("./bot");

app.get("/", (request, response) => {
  response.send("Bot is running");
});

bot.launch();

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`server is running on port ${PORT}`);
});
