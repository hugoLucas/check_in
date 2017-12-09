const mongoose = require('mongoose'),
      Schema = mongoose.Schema

var Visitor = new Schema({
  name : {
    type: String,
    required: true, 
  },
  email: {
    type: String,
    required: true,
  },
  telephone: {
    type: String,
    required: true,
  },
  company:{
    type: String,
    required: true
  },
  official:{
    type: Boolean,
    required: true
  },
  escort:{
    type: Boolean,
    required: true
  },
  escortName:{
    type: String
  },
  date:{
    type:Date,
    required: true
  }
})

module.exports = mongoose.model('Visitor', Visitor)