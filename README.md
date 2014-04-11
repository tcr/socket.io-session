# socket.io-session

Unobtrusive Socket.io middleware to add Express 3 session capability.

    npm install socket.io-session

This module uses `io.set('authorization')` to add a `session` property to `socket.handshake`.

```js
var express = require('express')
  , MongoStore = require('connect-mongo')(express)
  , ioSession = require('socket.io-session');

var app = express();

var sessionKey = 'secret key'
var sessionStore = new MongoStore({ db: 'name', url: MONGO_URI + '/name' });
app.use(express.cookieParser());
app.use(express.session({ secret: sessionKey, store: sessionStore }));

var io = require('socket.io').listen(server);
io.set('authorization', ioSession(express.cookieParser(sessionKey), sessionStore));

io.on('connection', function (socket) {
  console.log(socket.handshake.session);
})
```

## Invocation

You can use your own authorization function as the last argument after the session is added:

```js
ioSession(cookieParser, sessionStore, [session sid key], [authorization(data, accept)])
```

## License 

miT
