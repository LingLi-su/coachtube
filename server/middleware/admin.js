const { User } = require('../models/User');

let admin = (req, res, next) => {
  let token = req.cookies.w_auth;

  User.findByToken(token, (err, admin) => {
    if (err) throw err;
    if (admin.isAdmin === false)
      return res.json({
        isAdmin: false,
        error: true
      });

    req.token = token;
    req.user === true;
    next();
  });
};

module.exports = { admin };