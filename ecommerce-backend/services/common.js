const passport = require('passport');

exports.isAuth = (req, res, done) => {
  return passport.authenticate('jwt')
};


exports.sanitizeUser = (user) => {
    return {id:user.id, role:user.role}
}

exports.cookieExtractor = function (req) {
  let token = null;
  if(req && req.cookies)
  {
    token = req.cookies['jwt'];
  }
  // token = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY0ZjllMjY5OGRjODYyODdhZjY4OGQyZCIsInJvbGUiOiJ1c2VyIiwiaWF0IjoxNjk0MDk4MTM5fQ.gOUF5d2W2TvmMYGZULa4wVr4niAQyFNEy8toAwUmeNA";
  return token;
};