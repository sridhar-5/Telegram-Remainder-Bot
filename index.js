const express = require("express");
const app = express();
const ConnectDB = require("./config/connectDatabase");

require("dotenv").config();

const { bot, UrlBase, Bot } = require("./bot");

app.use(express.json());

app.get("/", (request, response) => {
  response.send("Bot is running");
});

//Establishing the connection to MongoDb Bot
ConnectDB();
//Launching the bot
bot.launch();
// Invoking the Start Bot function
Bot();

const PORT = process.env.PORT || 3000;

//listening
app.listen(PORT, () => {
  console.log(`Listening on port ${PORT}`);
});
