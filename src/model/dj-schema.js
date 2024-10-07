const { Schema, model } = require("mongoose");

let djSchema = new Schema({
  Guild: String,
  Role: String,
});

module.exports = model("djSchema", djSchema);