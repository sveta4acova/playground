const express = require('express');
const router = express.Router();
const models = require('../models');

router.post('/add', async (req, res) => {
  const {userId, userLogin} = req.session;

  if (!userId || !userLogin) {
    res.json({
      ok: false,
      error: 'Комментарии могут оставлять только зарегистрированные пользователи'
    })
  } else {
    const {post, parent} = req.body;
    const body = req.body.body.trim();

    if (!body) {
      res.json({
        ok: false,
        error: 'Комментарий не может быть пустым'
      })
    }

    try {
      if (!parent) {
        await models.Comment.create({
          post,
          body,
          owner: userId,
        });

        res.json({
          ok: true,
          body,
          login: userLogin,
        });
      } else {
        const parentComment = await models.Comment.findOne({_id: parent});

        if (!parentComment) {
          res.json({
            ok: false,
          });
        }

        const comment = await models.Comment.create({
          post,
          body,
          parent,
          owner: userId,
        });

        let parentChildren = parentComment.children;
        parentChildren.push(comment);
        parentComment.children = parentChildren;
        await parentComment.save();

        res.json({
          ok: true,
          body,
          login: userLogin,
        });
      }
    } catch(err) {
      res.json({
        ok: false,
      });
    }
  }
});

module.exports = router;