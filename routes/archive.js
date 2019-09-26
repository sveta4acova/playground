const express = require('express');
const router = express.Router();
const config = require('../config');
const models = require('../models');
const TurndownService = require('turndown');
const posts = async (req, res) => {
  const {userId, userLogin} = req.session;
  const perPage = config.PER_PAGE;
  const page = req.params.page || 1;

  try {
    const posts = await models.Post.find({})
      .skip(perPage * page - perPage)
      .limit(+perPage)
      .populate('owner')
      .sort({createdAt: -1});
    const count = await models.Post.countDocuments();
    res.render('archive/index', {
      posts,
      current: +page,
      pages: Math.ceil(count/perPage),
      user: {
        id: userId,
        login: userLogin,
      }
    });
  } catch(e) {
    throw new Error('Server Error!');
  }
};

router.get("/", (req, res) => posts(req, res));
router.get('/archive/:page', (req, res) => posts(req, res));
router.get('/posts/:post', async (req, res, next) => {
  const url = req.params.post.trim().replace(/ +(?= )/g, '');
  const {userId, userLogin} = req.session;

  if (!url) {
    const error = new Error('Not Found');
    error.status = 404;
    next(error);
  } else {
    const post = await models.Post.findOne({url});

    if (!post) {
      const error = new Error('Not Found');
      error.status = 404;
      next(error);
    } else {
      res.render('post/post', {
        post,
        user: {
          id: userId,
          login: userLogin,
        }
      });
    }
  }
});

//users posts
router.get('/users/:login/:page*?', async (req, res) => { //page опционально
  const {userId, userLogin} = req.session;
  const perPage = config.PER_PAGE;
  const {login} = req.params;
  const page = req.params.page || 1;

  try {
    const user = await models.User.findOne({login});
    const posts = await models.Post.find({owner: user.id})
      .skip(perPage * page - perPage)
      .limit(+perPage)
      .sort({createdAt: -1});
    const count = await models.Post.countDocuments({owner: user.id}); //посчитать посты одного конкретного пользователя

    res.render('archive/user', {
      posts,
      current: +page,
      pages: Math.ceil(count/perPage),
      _user: user,
      user: {
        id: userId,
        login: userLogin,
      }
    });
  } catch(err) {
    throw new Error('Server Error!');
  }
});

module.exports = router;