const mongoose  = require("mongoose");
require('dotenv').config()
console.log(process.env.mongoUrl)

const connection=mongoose.connect(process.env.mongoUrl)

module.exports={connection}