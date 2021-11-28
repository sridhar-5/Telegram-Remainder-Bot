const mongoose = require("mongoose");
require("dotenv").config();

//Connecting the Database
function ConnectDatabase() {
  var DatabaseConnection = mongoose.connect(
    //returns Promise
    `mongodb+srv://${process.env.USERNAME}:${process.env.PASSWORD}@cluster0.9qggj.mongodb.net/${process.env.DATABASE_NAME}?retryWrites=true&w=majority`,
    {
      useNewUrlParser: true,
      useFindAndModify: false,
      useUnifiedTopology: true,
      useCreateIndex: true,
    }
  );

  DatabaseConnection.then(() => {
    console.log("Connection to the database successfully");
  });
  DatabaseConnection.catch((error) => {
    console.log(`Connection Refused...${error}`);
  });
}
module.exports = ConnectDatabase;
