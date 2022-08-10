const mongoose = require('mongoose');

async function connect() {
    //await phải chạy trong 1 function async, async await có dử lý lỗi phải đưa vào try catch
    try {
      await mongoose.connect("mongodb://127.0.0.1:27017/f8_education_dev");
      console.log("connect successfully!!");
    } catch (error) {
      console.log("connect failure");
    }
  }
  
  module.exports = { connect };