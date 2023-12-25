/**
 * Created by Xing Zhong.
 * https://github.com/capricorncd
 * Date: 2022/09/10 16:33:15 (GMT+0900)
 */
import * as bcrypt from 'bcrypt';
import { Router } from 'express';

import {createResponse, isEmailAddress} from '../helpers'

const route = Router();

const BCRYPT_SALT = 'dsfafsdfsfd';

const userList = [
  {
    username: 'admin',
    email: 'admin@github.com',
    password: 'lsdjfljd2dsf9df8sudfjl',
  },
];

route.get('/', (req, res) => {
  res.send(createResponse({ username: 'admin' }));
});

route.post('/login', (req, res) => {
  const { email, password } = req.body;

  const user = userList.find(
    (item) =>
      (isEmailAddress(item.email) && email === item.email) ||
      email === item.username
  );

  if (user && user.password === bcrypt.hashSync(password, BCRYPT_SALT)) {
    req.session.user = user.email;
    res.cookie('uid', req.session.id, { maxAge: 60000 });
    res.send(createResponse({ username: user.username, email }));
  } else {
    res.send(createResponse({}, 'Invalid email or password', 1));
  }
});

route.post('/logout', (req, res) => {
  req.session.user = null;
  req.session.destroy((err) => {
    res.clearCookie('uid');
    if (err) {
      res.send(createResponse(err, err.message, 1));
    } else {
      res.send(createResponse({}));
    }
  });
});

export default route;

export {
  route as userRoute
}
