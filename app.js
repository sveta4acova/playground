const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const path = require('path');
const mongoose = require("mongoose");
const staticAsset = require('static-asset');
const session = require('express-session');
const MongoStore = require('connect-mongo')(session);
const config = require("./config");
const routes = require("./routes");
const Post = require('./models/post');
const mock = require('./mocks');

//sessions
app.use(
  session({
    secret: config.SESSION_SECRET,
    resave: true,
    saveUninitialized: false,
    store: new MongoStore({
      mongooseConnection: mongoose.connection
    })
  })
);

//database
mongoose.Promise = global.Promise;
mongoose.set('debug', config.IS_PRODUCTION);
mongoose.set('useCreateIndex', true);

mongoose.connection
  .on('error', error => console.log(error))
  .on('close', () => console.log('Database connection closed.'))
  .once('open', () => {
    const info = mongoose.connections[0];
    console.log(`Connected to ${info.host}:${info.port}/${info.name}`);
  });

mongoose.connect(config.MONGO_URL, { useNewUrlParser: true, useUnifiedTopology: true });

// mock();

//sets and uses
app.set("view engine", "pug");
app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());
app.use(staticAsset(path.join(__dirname, 'public')));
app.use(express.static(path.join(__dirname, 'public')));
app.use(
  '/javascripts',
  express.static(path.join(__dirname, 'node_modules', 'jquery', 'dist'))
);


//routes
app.use('/', routes.archive);
app.use('/api/auth/', routes.auth);
app.use('/post', routes.post);
app.use('/comment', routes.comment);

//catch 404 and forward to error handler
app.use((req, res, next) => {
  const error = new Error('Not Found');
  error.status = 404;
  next(error);
});

//error handler
app.use((error, req, res, next) => {
  res.status(error.status || 500);
  res.render('error', {
    message: error.message,
    error: !config.IS_PRODUCTION ? error : {},
    title: "Ooops..."
  })
});

app.listen(config.PORT, () =>
  console.log(`Example app listening on port ${config.PORT}!`)
);