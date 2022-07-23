const mongoose = require("mongoose");
const slug = require('mongoose-slug-generator');
const Schema = mongoose.Schema;

mongoose.plugin(slug);
const ItemsSchema = new Schema(
  {
    name: { type: String },
    status: { type: String },
    ordering: { type: Number },
    slug: { type: String, slug: 'name', unique: true },
    content:{ type: String},
    avatar:{ type: String},
    created: {
      user_id: {type: Number},
      user_name: {type: String},
      time: {type: Date} 
    },
    modified: {
      user_id: {type: Number},
      user_name: {type: String},
      time: {type: Date}
    }
  }
);

module.exports = mongoose.model("items", ItemsSchema);
