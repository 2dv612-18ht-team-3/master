'use strict'

const mongoose = require('mongoose')
const Schema = mongoose.Schema

const messageSchema = new Schema({
    _id: mongoose.Schema.Types.ObjectId,
    messages: [{
    message: {
      type: String,
      required: true
   },
    viewed_by: {
      type: [String],
      required: true
    },
    stringId: {
        type: String,
        required: true
     }}], 
    stringId: {
type: String,
default:"admin_message"
}
  })
  
  module.exports = mongoose.model('Message', messageSchema)
  
