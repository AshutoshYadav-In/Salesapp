const mongoose = require('mongoose');


const userDetailsSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true,
    unique: true, 
    trim: true,   
    lowercase: true 
  },
  password: {
    type: String,
    required: true
  }
});


const UserDetails = mongoose.model('UserDetails', userDetailsSchema);


module.exports = UserDetails;
