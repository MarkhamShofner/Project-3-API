var passport = require("passport")

// GET /signup
// function getSignup(req, res) {
//   res.render('signup.hbs', { 
//     message: req.flash('signupMessage') 
//   });
// }
// POST /signup
function postSignup(req, res) {
  var signupStrategy = passport.authenticate('local-signup', {
    successRedirect : '/',
    failureRedirect : '/',
    failureFlash : true
  });
  return signupStrategy(req, res); 
}

// GET /login
// function getLogin(req, res) {
//   // res.render("index.hbs", { 
//   //   message: req.flash('loginMessage')
//   // });
// }

// POST /login
function postLogin(req, res) {
  var loginProperty = passport.authenticate('local-login', {
    successRedirect : '/',
    failureRedirect : '/',
    failureFlash : true
  });
  return loginProperty(req, res);
}

// GET /logout
function getLogout(req, res) {
  req.logout();
  req.flash('loginMessage', 'Logged out.');
  res.redirect('/');
}


module.exports = {
  // getLogin: getLogin,
  postLogin: postLogin,
  // getSignup: getSignup,
  postSignup: postSignup,
  getLogout: getLogout,
}
