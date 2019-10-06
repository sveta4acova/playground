const faker = require('faker');
const models = require('./models');
const owner = '5d8b291fce9b694f184d2c09'; //из бд
const tr = require('transliter');

module.exports = () => {
  models.Post.remove()
    .then(() => {
      Array.from({length: 20}).forEach(() => {
        const title = faker.lorem.words(5);

        models.Post.create({
          title,
          url: title ? `${tr.slugify(title)}-${Date.now().toString(36)}` : '',
          body: faker.lorem.words(100),
          owner
        })
          .then(post => console.log('createPost', post))
          .catch(err => console.log(err));
      });
    })
    .catch(err => console.log(err));
};