const mongoose = require('mongoose');

async function connect() {
    //await phải chạy trong 1 function async, async await có dử lý lỗi phải đưa vào try catch
    try {
      await mongoose.connect("mongodb+srv://phuc_hoang:admin@cluster0.ueikw.mongodb.net/?retryWrites=true&w=majority");
      console.log("connect successfully!!");
    } catch (error) {
      console.log("connect failure");
    }
  }
  
  module.exports = { connect };