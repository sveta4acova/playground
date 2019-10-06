const mongoose = require('mongoose');
const {Schema} = mongoose;

const schema = new Schema({
  owner: {
    type: Schema.Types.ObjectId,
    ref: 'User'
  },
  path: {
    type: String,
    required: true,
  },
}, {
  timestamps: true,
  toJSON: {
    //чтобы можно было обращаться к id без нижнего подчеркивания
    virtuals: true
  }
});

module.exports = mongoose.model('Upload', schema);
