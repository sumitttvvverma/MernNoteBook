const mongoose = require('mongoose');
const {Schema}=mongoose;

const NotesSchema = new Schema({
  user:{
    type:mongoose.Schema.Types.ObjectId, //foregin key
    ref:'user'
  }, 
  title: {
    type: String,
    require:true
   },
   description: {
    type: String,
    require:true,
   
   },
   tag: {
    type: String,
    default:"General"
   },
   date: {
    type: String,
    default:Date.now
   },
  });
const Note=mongoose.model('notes',NotesSchema) 
module.exports =Note;  