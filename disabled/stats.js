const { Schema, model } = require("mongoose");

let statsSchema = new Schema({
  Guild: String,
  User: String,
  Shinies: Number,
  Trophies: Number
});

module.exports = model("statsSchema", statsSchema);