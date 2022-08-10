const mongoose = require("mongoose");
const slug = require('mongoose-slug-generator');
const Schema = mongoose.Schema;

const footerSchema = new Schema(
  {
    headquarters: { type: String },
    phone: { type: Number },
    fax: { type: Number },
    email: { type: String },
    slogan: { type: String },
    created: {
      user_id: { type: Number },
      user_name: { type: String },
      time: { type: Date }
    },
  }
)


module.exports = mongoose.model("footer", footerSchema);
