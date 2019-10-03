const mongoose = require('mongoose');
const {Schema} = mongoose;
const URLSlugs = require('mongoose-url-slugs');
const tr = require('transliter');

let schema = new Schema({
  title: {
    type: String,
    required: true,
  },
  body: {
    type: String,
  },
  owner: {
    type: Schema.Types.ObjectId,
    ref: 'User'
  },
  commentCount: {
    type: Number,
    default: 0,
  }
}, {
  timestamps: true,
  toJSON: {
    //чтобы можно было обращаться к id без нижнего подчеркивания
    virtuals: true
  }
});

schema.statics = {
  incCommentCount(postId) {
    return this.findByIdAndUpdate(
      postId,
      { $inc: {commentCount: 1}},
      { new: true }
    )
  }
};

schema.plugin(
  URLSlugs('title', {
    field: 'url',
    generator: text => tr.slugify(text),
  })
);

module.exports = mongoose.model('Post', schema);
