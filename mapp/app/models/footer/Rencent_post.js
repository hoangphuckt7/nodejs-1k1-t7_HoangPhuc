const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const RencentPostsSchema = new Schema(
  {
    postName: { type: String },
    postTime: { type: String },
    postUrl: { type: String },
  }
)

module.exports = mongoose.model("post_name", RencentPostsSchema);