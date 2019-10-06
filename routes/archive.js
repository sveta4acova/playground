const express = require('express');
const router = express.Router();
const config = require('../config');
const models = require('../models');
const showdown = require('showdown');
const moment = require('moment');
moment.locale('ru');

const posts = async (req, res) => {
  const {userId, userLogin} = req.session;
  console.log(userId, userLogin, config);
  const perPage = config.PER_PAGE;
  const page = req.params.page || 1;

  console.log(111);
  try {
    console.log(123, perPage, page);
    let posts = await models.Post.find({status: 'published'})
      .skip(perPage * page - perPage)
      .limit(+perPage)
      .populate('owner')
      .sort({createdAt: -1})
      .exec();

    console.log(222);

    if (posts.length) {
      console.log(234, posts);
      const converter = new showdown.Converter();

      //перед тем как передавать посты на вывод
      //преобразуем содержимое body в html
      posts = posts.map(post => {
        return Object.assign(post, {
          body: converter.makeHtml(post.body),
        })
      });
    }

    console.log(3333);

    const count = await models.Post.countDocuments();
    console.log(4444, count);
    res.render('archive/index', {
      posts: posts || [],
      current: +page,
      pages: Math.ceil(count/perPage),
      user: {
        id: userId,
        login: userLogin,
      }
    });
  } catch(e) {
    console.log(5555);
    throw new Error('Server Error!');
  }
};

router.get('/', (req, res) => posts(req, res));
router.get('/archive/:page', (req, res) => posts(req, res));
router.get('/posts/:post', async (req, res, next) => {
  const url = req.params.post.trim().replace(/ +(?= )/g, '');
  const {userId, userLogin} = req.session;

  if (!url) {
    const error = new Error('Not Found');
    error.status = 404;
    next(error);
  } else {
    let post = await models.Post.findOne({url, status: 'published'});

    if (!post) {
      const error = new Error('Not Found');
      error.status = 404;
      next(error);
    } else {
      const comments = await models.Comment.find({
        post: post.id,
        parent: {$exists: false}
      });

      // .populate({
      //   path: 'children',
      //   populate: {
      //     path: 'children',
      //     populate: {
      //       path: 'children'
      //     }
      //   }
      // });
      // //глубокое наполнение поля children
      // //если надо 20 уровней вложенности и populate столько же придется сделать Ооооо
      // //поэтому в модели используется mongoose-autopopulate

      const converter = new showdown.Converter();
      post.body = converter.makeHtml(post.body);

      res.render('post/post', {
        post,
        comments,
        moment,
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
    let posts = await models.Post.find({owner: user.id})
      .skip(perPage * page - perPage)
      .limit(+perPage)
      .sort({createdAt: -1});
    const converter = new showdown.Converter();

    //перед тем как передавать посты на вывод
    //преобразуем содержимое body в html
    posts = posts.map(post => {
      return Object.assign(post, {
        body: converter.makeHtml(post.body),
      })
    });
    const count = models.Post.countDocuments({owner: user.id}); //посчитать посты одного конкретного пользователя

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