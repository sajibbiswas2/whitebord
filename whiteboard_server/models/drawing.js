const mongoose = require("mongoose");

const drawingSchema = new mongoose.Schema({
  date: {
    type: String,
    required: true,
  },
  drawing: {
    type: String,
    required: true,
  },
  type: {
    type: String,
    required: true,
  },
});

module.exports = mongoose.model("drawing", drawingSchema);
