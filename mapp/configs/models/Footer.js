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


// const RencentPostsSchema = new Schema(
//   {
//     postName: { type: String },
//     time: { type: Number },
//     url: { type: Number },
//     slug: { type: String, slug: 'postName', unique: true },
//   }
// )


module.exports = mongoose.model("footer", footerSchema);
// module.exports = mongoose.model("post_name", RencentPostsSchema);
