const mongoose = require('mongoose');
const {Schema} = mongoose;

const schema = new Schema({
  login: {
    type: String,
    required: true,
    useCreateIndex: true, //для уникальности, чтобы нельзя было создать нового юзера с существующим логином
  },
  password: {
    type: String,
    required: true,
  }
}, {
  timestamps: true,
  toJSON: {
    //чтобы можно было обращаться к id без нижнего подчеркивания
    virtuals: true
  }
});

module.exports = mongoose.model('User', schema);
