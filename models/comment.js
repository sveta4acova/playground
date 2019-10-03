const mongoose = require('mongoose');
const {Schema} = mongoose;
const Post = require('./post');

const schema = new Schema({
  body: {
    type: String,
    required: true,
  },
  owner: {
    type: Schema.Types.ObjectId,
    ref: 'User',
    autopopulate: true,
  },
  post: {
    type: Schema.Types.ObjectId,
    ref: 'Post'
  },
  parent: {
    type: Schema.Types.ObjectId,
    ref: 'Comment'
  },
  children: [
    {
      type: Schema.Types.ObjectId,
      ref: 'Comment',
      autopopulate: true,
    }
  ],
  createdAt: {
    type: Date,
    default: Date.now,
  }
}, {
  timestamps: false,
  toJSON: {
    //чтобы можно было обращаться к id без нижнего подчеркивания
    virtuals: true
  }
});

schema.pre('save', async function(next) {
  if (this.isNew) {
    await Post.incCommentCount(this.post);
  }
  next();
});

schema.plugin(require('mongoose-autopopulate'));

module.exports = mongoose.model('Comment', schema);
