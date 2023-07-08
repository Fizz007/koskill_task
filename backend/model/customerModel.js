const mongoose = require("mongoose");

const customerSchema = new mongoose.Schema({
  name: {
    type: String,    
  },
  email: { 
    type: String,
   
  },
  password: {
    type: String,

  },
  phoneNumber: {
    type: Number,
   
  },
  address: {
    type: String,
    
  },
  additionalInfo: {
    type: String,
   
  },
});

const Customers = mongoose.model("Customer", customerSchema);

module.exports = Customers;
