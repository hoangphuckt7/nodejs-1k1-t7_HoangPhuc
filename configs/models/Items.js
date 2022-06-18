const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const ItemsSchema = new Schema(
  {
    name: { type: String },
    status: { type: String },
    ordering: { type: Number },
    slug: { type: String, slug: "name", unique: true }
  },
  { timestamps: true }
);

module.exports = mongoose.model("items", ItemsSchema);
