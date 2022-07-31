const mongoose = require("mongoose");
const slug = require('mongoose-slug-generator');
const Schema = mongoose.Schema;

const footerSchema = new Schema(
  {
    blogroll: { type: Object },
    created: {
      user_id: {type: Number},
      user_name: {type: String},
      time: {type: Date} 
    },
  }
);

module.exports = mongoose.model("footer", footerSchema);
