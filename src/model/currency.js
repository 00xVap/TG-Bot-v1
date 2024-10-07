const { Schema, model } = require("mongoose");

let currencySchema = new Schema({
  Guild: String,
  Username: String,
  UserID: String,
  LastDaily: {
    type: Date,
  },
  LastGamble: {
    type: Date,
  },
  Shinies: {
    type: Number,
    default: 0
  },
  Triangles: {
    type: Number,
    default: 0
  },
  Shards: {
    type: Number,
    default: 0
  },
  Crystals: {
    type: Number,
    default: 0
  },
  Trophies: {
    type: Number,
    default: 0
  },
  Stars: {
    type: Number,
    default: 0
  },
});

module.exports = model("Currency Schema", currencySchema);