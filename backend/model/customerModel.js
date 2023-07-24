const mongoose = require("mongoose");

const customerSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
       
  },
  email: { 
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
    minlength: 6, 
  },
  phoneNumber: {
    type: Number,
    required: true,
    minlength: 10, 
   
  },
  address: {
    type: String,
    required: true,
    
  },
  additionalInfo: {
    type: String,
   
  },
});

const Customers = mongoose.model("Customer", customerSchema);

module.exports = Customers;
