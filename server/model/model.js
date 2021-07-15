const mongoose = require("mongoose");

var schema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  reference: {
    type: String,
    required: true,
  },
  stock: {
    type: Number,
    required: true,
  },
  price: {
    type: String,
    required: true,
  },
});

const Productdb = mongoose.model('productdb', schema);

module.exports = Productdb;