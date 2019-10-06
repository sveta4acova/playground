const express = require('express');
const router = express.Router();
const path = require('path');
const mkdirp = require('mkdirp');
const multer = require('multer');
const Sharp = require('sharp');
const config = require('../config');
const diskStorage = require('../utils/diskStorage');
const models = require('../models');

const rs = () => Math.random().toString(36).slice(-3);

const storage = diskStorage({
  destination: (req, file, cb) => {
    //первый аргумент - ошибка, второй - папка для загрузки файлов
    const dir = `/${rs()}/${rs()}`;
    req.dir = dir;
    mkdirp(config.DESTINATION + dir, err => cb(err, config.DESTINATION + dir));
    // cb(null, config.DESTINATION + dir)
  },
  filename: async (req, file, cb) => {
    const {userId} = req.session;
    const fileName = Date.now().toString(36) + path.extname(file.originalname);
    const {dir} = req;
    const {postId} = req.body;

    //find post
    const post = await models.Post.findOne({_id: postId});

    if (!post) {
      const err = new Error('No Post');
      err.code = "NOPOST";
      return cb(err);
    }

    //upload
    const upload = await models.Upload.create({
      owner: userId,
      path: dir + '/' + fileName,
    });

    //write upload to post
    const uploads = post.uploads;
    uploads.unshift(upload.id);
    post.uploads = uploads;
    await post.save();

    //
    req.filePath = dir + '/' + fileName;

    cb(null, fileName)
  },
  sharp: (req, file, cb) => {
    const resizer = Sharp()
      .resize(1024, 768)
      .toFormat('jpg')
      .jpeg({
        quality: 40,
        progressive: true,
      });
    cb(null, resizer);
  },
});
const upload = multer({
  storage,
  limits: {
    fileSize: 10 * 1024 * 1024
  },
  fileFilter: (req, file, cb) => {
    const ext = path.extname(file.originalname);
    if (ext !== '.jpg' && ext !== '.jpeg' && ext !== '.png') {
      const err = new Error('Extention');
      err.code = "EXTENTION";
      return cb(err);
    }

    cb(null, true);
  }
}).single('file');

router.post('/image', (req, res) => {
  upload(req,res, err => {
    let error = '';

    if (err) {
     if (err.code === 'LIMIT_FILE_SIZE') {
       error = 'Картинка не более 2MB';
     } else if (err.code === 'EXTENTION') {
       error = 'Только jpeg или png';
     } else if (err.code === 'NOPOST') {
       error = 'Обнови страницу';
     }
    }

    if (error) {
      res.json({
        ok: false,
        error,
      });
    } else {
      res.json({
        ok: true,
        filePath: req.filePath
      });
    }
  });
});

module.exports = router;