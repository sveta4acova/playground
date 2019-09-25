const faker = require('faker');
const models = require('./models');
const owner = '5d8b291fce9b694f184d2c09'; //из бд
const TurndownService = require('turndown');
const turndownService = new TurndownService();

module.exports = () => {
  models.Post.remove()
    .then(() => {
      Array.from({length: 20}).forEach(() => {
        models.Post.create({
          title: faker.lorem.words(5),
          body: turndownService.turndown(faker.lorem.words(100)),
          owner
        })
          .then(post => console.log('createPost', post))
          .catch(err => console.log(err));
      });
    })
    .catch(err => console.log(err));
};