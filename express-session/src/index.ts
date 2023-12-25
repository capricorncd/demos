/**
 * Created by Xing Zhong.
 * https://github.com/capricorncd
 * Date: 2022/09/10 20:20:31 (GMT+0900)
 */
import * as http from 'http';
import * as path from 'path';
import * as cookieParser from 'cookie-parser';
import * as express from 'express';
import * as session from 'express-session';
// import * as https from 'https'
import { Server } from 'socket.io';

import {authMiddleware} from './middleware'
import {formatArgv} from './helpers'
import {userRoute} from './api'

const argv = formatArgv(process.argv.slice(2));

const port = argv.port || 8001;

const app = express();

const server = http.createServer(app);
const io = new Server(server, {
  cors: {
    origin: ['http://127.0.0.1:8000', 'http://localhost:8000'],
    // allowedHeaders: ['custom-header'],
    credentials: true,
  },
});

const secretKey = 'secret key';

// middleware
app.use(
  session({
    resave: false, // don't save session if unmodified
    saveUninitialized: false, // don't create session until something stored
    secret: secretKey,
  })
);

app.use(cookieParser(secretKey));

app.use(authMiddleware(io));

// static
app.use(express.static(path.resolve(__dirname, './public')));
app.use(express.static(path.resolve(__dirname, './__reports__')));

// parse application/x-www-form-urlencoded
app.use(express.urlencoded({ extended: true }));
// parse application/json
app.use(express.json());

// api
app.use('/api/user', userRoute);

// connection
io.on('connection', (socket) => {
  console.log('a user connected');

  // disconnect
  socket.on('disconnect', () => {
    console.log('user disconnected');
  });
});

// listen
server.listen(port, () => {
  console.log(`http://localhost:${port}`);
});
