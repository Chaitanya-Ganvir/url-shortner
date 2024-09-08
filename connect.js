const mongoose = require("mongoose");

async function connectDb(url) {
  try {
    await mongoose.connect(url);
  } catch (error) {
    console.log(error);
  }
}

module.exports = { connectDb };
