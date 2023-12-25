/**
 * Created by Xing Zhong.
 * https://github.com/capricorncd
 * Date: 2022/09/10 20:24:18 (GMT+0900)
 */
import * as path from 'path';
import * as express from 'express';
import { Server } from 'socket.io';

const protectedPages = ['/user']

export const authMiddleware = (io: Server) => {
  return (
    req: express.Request,
    res: express.Response,
    next: express.NextFunction
  ) => {
    // socket.io
    req.io = io;

    // request path
    const reqPath = req.path.replace(/\/$/, '') || '/';

    // front pages
    if (req.method === 'GET' && protectedPages.includes(reqPath)) {
      if (reqPath !== '/login' && !req.session.user) {
        return res.redirect('/login');
      }
      return res.sendFile(path.resolve(__dirname, '../public/index.html'));
    }

    // login page and logged in
    if (reqPath === '/login' && req.session.user) {
      return res.redirect('/');
    }

    if (
      !reqPath.startsWith('/api/') ||
      reqPath === '/api/user/login' ||
      req.session.user
    ) {
      return next();
    }

    res.send({
      code: 1,
      message: 'login is needed.',
      data: {},
    });
  };
};
