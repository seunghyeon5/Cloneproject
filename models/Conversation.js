const mongoose = require("mongoose");
//it s gonna be just conversation id and members
const ConversationSchema = new mongoose.Schema(
  {
    members:{
        type: Array,
    },    
  },
  { timestamps: true }
);
module.exports = mongoose.model('Conversation', ConversationSchema);
