const { Schema, model } = require("mongoose");

let shinySchema = new Schema({
  Guild: String,
  User: String,
  Shinies: {
    type: Number,
    default: 0
  },
});

module.exports = model("shinySchema", shinySchema);