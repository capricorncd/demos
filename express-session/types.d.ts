/**
 * Created by Xing Zhong.
 * https://github.com/capricorncd
 * Date: 2022/09/10 16:45:06 (GMT+0900)
 */
import { Server } from 'socket.io';

declare module 'express-session' {
  interface SessionData {
    user: string | null;
  }
}

declare global {
  namespace Express {
    interface Request {
      io: Server;
    }
  }
}
