var express = require('express'),
    router  = express.Router(),
    User    = require('../models/user.js');

//All Purpose LOGGER
router.use(function (req, res, next) {
  console.log("===========User Routes=============");
  console.log("REQ DOT BODY", req.body);
  console.log("REQ DOT PARAMS", req.params);
  console.log("REQ DOT SESSION", req.session);
  next();
});


//define routes for the router /users/signup
router.get('/signup', function (req, res) {
  res.render('users/signup')
});

//New user creation from signup form action /users/signup
router.post('/signup', function (req, res) {
  var newUser = User(req.body.user);
  newUser.save(function (err, user) {
    if (err){
      console.log(err)
    } else {
      res.redirect(301, "/users/" + user._id)
      }
  });
});

// nav signin route set to /users
router.post('/', function (req, res) {
  var attempt = req.body.user;
  console.log("outside", req.body.user);
  User.findOne({ email: attempt.email }, function (err, user) {
    if (user && user.password === attempt.password) {
      req.session.currentUser = user;
      req.session.currentUser.login = 1;
      console.log('=======currentUser');
      console.log(req.session.currentUser.login);
      res.redirect(302, "/articles/latest")
    }else {
      console.log("no user with that name or password");
      res.write("No! You no welcome");
      res.end();
    }
  });
});

router.get('/:id', function (req, res) {
  User.findById(req.params.id, function (err, user) {
  });
});
// export router objects
module.exports = router;
