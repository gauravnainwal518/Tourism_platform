const mongoose = require('mongoose');
const Schema = mongoose.Schema;


const guideSchema = new Schema({
  /*user: {
    type: Schema.Types.ObjectId,
    ref: 'User', // Reference to the User model
    required: true
  },
  */
 FullName: {
 type: String,
 required: true
 },

 
email:{
type: String,
required: true,
unique: true

},

phoneNumber: {
  type: String,
  required: true,
},

  bio: {
    type: String,
    required: true
  },
  languages: {
    type: [String],
    required: true
  },
 
}, { timestamps: true }); 

module.exports = mongoose.model('Guide', guideSchema);
