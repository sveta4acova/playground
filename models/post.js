const mongoose = require('mongoose');
const {Schema} = mongoose;
const URLSlugs = require('mongoose-url-slugs');
const tr = require('transliter');

let schema = new Schema({
  title: {
    type: String,
    default: '',
  },
  body: {
    type: String,
  },
  url: {
    type: String,
  },
  owner: {
    type: Schema.Types.ObjectId,
    ref: 'User'
  },
  commentCount: {
    type: Number,
    default: 0,
  },
  uploads: [
    {
      type: Schema.Types.ObjectId,
      ref: 'Upload'
    }
  ],
  status: {
    type: String,
    enum: ['published', 'draft'],
    required: true,
    default: 'published'
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

// schema.pre('save', function(next) {
//   this.url = this.title ? `${tr.slugify(this.title)}-${Date.now().toString(36)}` : '';
//   next();
// });

// schema.plugin(
//   URLSlugs('title', {
//     field: 'url',
//     update: true,
//     generator: text => tr.slugify(text),
//   })
// );

module.exports = mongoose.model('Post', schema);
