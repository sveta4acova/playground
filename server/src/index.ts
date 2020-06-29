import express from 'express';
import { AppRouter } from './AppRouter';
import bodyParser from 'body-parser';
import cookieSession from 'cookie-session';
import './controllers/LoginController';
import './controllers/RootController';

const app = express();

app.use(cookieSession({ keys: ['super'] }));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(AppRouter.getInstance());

app.listen(3001, () => {
  console.log('Listening on port 3001');
});
