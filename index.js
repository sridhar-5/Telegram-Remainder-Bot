const express = require("express");
const app = express();
const ConnectDB = require("./config/connectDatabase");
const remainders = require("./routes/DaywiseRemainders");
require("dotenv").config();

const { bot, Bot } = require("./bot");

app.use(express.json());
app.use("/bot/reminder/upcoming", remainders);

app.get("/", (request, response) => {
  response.send("Bot is running");
});

//Establishing the connection to MongoDb Bot
ConnectDB();
// Invoking the Start Bot function
Bot();

const PORT = process.env.PORT || 3000;
//listening
app.listen(PORT, () => {
  console.log(`Listening on port ${PORT}`);
});
