module.exports = function (cookieParser, sessionStore, cookie, auth) {
  var _sessionStore = sessionStore
    , _cookieParser = cookieParser
    , _cookie = (typeof cookie == 'function' ? null : cookie) || 'connect.sid'
    , _auth = (typeof cookie == 'function' ? cookie : auth);

  return function (data, accept) {
    function _next (err) {
      auth ? auth(data, accept) : accept(err, true);
    }

    if (data && data.headers && data.headers.cookie) {
      _cookieParser(data, {}, function (err) {
        if (err) {
          _next('COOKIE_PARSE_ERROR');
        }
        var sessionId = data.signedCookies[_cookie];
        _sessionStore.get(sessionId, function (err, session) {
          console.log(err, session);
          if (err || !session){
            _next('INVALID_SESSION');
          } else{
            data.session = session;
            _next(null);
          }
        });
      });
    } else {
      _next('MISSING_COOKIE');
    }
  };

  return authorization;
};