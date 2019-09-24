const express = require('express');
const router = express.Router();
const bcrypt = require('bcrypt-nodejs');
const models = require('../models');

//POST is authorized
router.post('/register', (req, res) => {
  const {login, password, passwordConfirm} = req.body;

  if (!login || !password || !passwordConfirm) {
    let fields = [];
    if (!login) fields.push('login');
    if (!password) fields.push('password');
    if (!passwordConfirm) fields.push('passwordConfirm');

    res.json({
      ok: false,
      error: 'Все поля должны быть заполнены',
      fields
    })
  } else if (!/^[a-zA-Z0-9]+$/.test(login)) {
    res.json({
      ok: false,
      error: 'Только латинские буквы и цифры!',
      fields: ['login']
    });
  } else if (login.length < 3 || login.length > 16) {
    res.json({
      ok: false,
      error: 'Длина логина от 3 до 16 символов!',
      fields: ['login']
    });
  } else if(password.length < 5) {
    res.json({
      ok: false,
      error: 'Длина пароля не менее 5 символов!',
      fields: ['password', 'passwordConfirm']
    });
  } else if (password !== passwordConfirm) {
    res.json({
      ok: false,
      error: 'Пароли не совпадают!',
      fields: ['password', 'passwordConfirm']
    });
  } else {
    bcrypt.hash(password, null, null, function(err, hash) {
      models.User.create({
        login,
        password: hash,
      })
        .then(user => {
          req.session.userId = user.id;
          req.session.userLogin = user.login;

          res.json({
            ok: true,
            user
          });
        })
        .catch(err => {
          if (err.code === 11000) {
            res.json({
              ok: false,
              error: ' Такой пользователь уже существует!',
              fields: ['login']
            })
          } else {
            res.json({
              ok: false,
              error: 'Ошибка, попробуйте позже!',
            })
          }

        });
    });
  }
});


//POST for login
router.post('/login', (req, res) => {
  const {login, password} = req.body;

  if (!login || !password) {
    let fields = [];
    if (!login) fields.push('login');
    if (!password) fields.push('password');

    res.json({
      ok: false,
      error: 'Все поля должны быть заполнены!',
      fields
    })
  } else {
    models.User.findOne({
      login
    })
      .then(user => {
        if (user) {
          bcrypt.compare(password, user.password, function(err, result) {
            if (result) {
              req.session.userId = user.id;
              req.session.userLogin = user.login;

              res.json({
                ok: true,
              })
            } else {
              res.json({
                ok: false,
                error: 'Логин и/или пароль введены неверно!',
                fields: ['login', 'password']
              })
            }
          });
        } else {
          res.json({
            ok: false,
            error: 'Логин и/или пароль введены неверно!',
            fields: ['login', 'password']
          })
        }
      })
      .catch((err) => {
        res.json({
          ok: false,
          error: 'Ошибка, повторите позже!'
        })
      });
  }
});

//GET for logout
router.get('/logout', (req, res) => {
  if (req.session) {
    //delete session object
    req.session.destroy(() => {
      res.redirect('/');
    })
  } else {
    res.redirect('/');
  }
});

module.exports = router;