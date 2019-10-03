const express = require('express');
const router = express.Router();
const models = require('../models');
const TurndownService = require('turndown');

//GET for add
router.get('/add', (req, res) => {
  const id = req.session.userId;
  const login = req.session.userLogin;

  if (!id || !login) {
    res.redirect('/');
  } else {
    res.render('post/add', {user: {
        id,
        login,
      }});
  }
});

router.post('/add', (req, res) => {
  const {userId, userLogin} = req.session;
  const title = req.body.title.trim().replace(/ +(?= )/g, '');
  const {body} = req.body;

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
    } else {
      const turndownService = new TurndownService();

      models.Post.create({
        title,
        body: turndownService.turndown(body),
        owner: userId,
      })
        .then(post => {
          res.json({
            ok: true,
            post,
          });
        })
        .catch(err => {
          res.json({
            ok: false,
            error: err,
          });
        })
    }
  }
});
module.exports = router;