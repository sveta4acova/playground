const express = require('express');
const router = express.Router();
const models = require('../models');
const tr = require('transliter');

//GET for add
router.get('/add', async (req, res) => {
  const id = req.session.userId;
  const login = req.session.userLogin;

  if (!id || !login) {
    res.redirect('/');
  } else {
    try {
      const post = await models.Post.findOne({owner: id, status: 'draft'});

      if (post) {
        res.redirect(`/post/edit/${post.id}`);
      } else {
        const post = await models.Post.create({owner: id, status: 'draft'});
        res.redirect(`/post/edit/${post.id}`);
      }

    } catch(err) {
      console.log(err);
    }
  }
});

//GET for edit
router.get('/edit/:id', async (req, res, next) => {
  const {userId} = req.session;
  const {userLogin} = req.session;
  const id = req.params.id.trim().replace(/ +(?= )/g, '');

  if (!userId || !userLogin) {
    res.redirect('/');
  } else {
    try {
      const post = await models.Post.findOne({_id: id}).populate('uploads');

      if (!post) {
        // const error = new Error('Not Found');
        // error.status = 404;
        // next(error);
      }

      res.render('post/edit', {
        post,
        user: {
          id: userId,
          login: userLogin,
        }
      });
    } catch(err) {
      console.log(err);
    }
  }
});

router.post('/add', async (req, res) => {
  const {userId, userLogin} = req.session;
  const title = req.body.title.trim().replace(/ +(?= )/g, '');
  const body = req.body.body.trim().replace(/ +(?= )/g, '');
  const url = title ? `${tr.slugify(title)}-${Date.now().toString(36)}` : '';
  const {isDraft, postId} = req.body;

  if (!userId || !userLogin) {
    res.redirect('/');
  } else {
    if (!title || !body) {
      let fields = [];
      if (!title) fields.push('title');
      if (!body) fields.push('body');

      res.json({
        ok: false,
        error: 'Все поля должны быть заполнены',
        fields
      })
    } else if (title.length < 3 || title.length > 64) {
      res.json({
        ok: false,
        error: 'Длина заголовка от 3 до 64 символов!',
        fields: ['title']
      });
    } else if (body.length < 3) {
      res.json({
        ok: false,
        error: 'Текст не менее 3 символов!',
        fields: ['body']
      });
    } else if (!postId) {
      res.json({
        ok: false,
      });
    } else {
      try {
        const post = await models.Post.findOneAndUpdate({
          _id: postId,
          owner: userId
        }, {
          title,
          body,
          url,
          status: isDraft ? 'draft' : 'published'
        }, {
          new: true,
        });

        if (!post) {
          res.json({
            ok: false,
            error: 'Пост не твой!'
          })
        } else {
          res.json({
            ok: true,
            post,
          })
        }
      } catch(err) {
        res.json({
          ok: false,
          error: err,
        });
      }
    }
  }
});

module.exports = router;