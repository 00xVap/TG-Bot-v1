const { Schema, model } = require("mongoose");

let trophySchema = new Schema({
  Guild: String,
  User: String,
  Trophies: {
    type: Number,
    default: 0
  }
});

module.exports = model("trophySchema", trophySchema);