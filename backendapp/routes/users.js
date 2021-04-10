var express = require('express');
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const checkJwt = require('./../middleware/check-jwt');
const User = require('./../model/user');

var router = express.Router();

var BCRYPTFinal = 12;

router.post('/signin', async (req, res, next) => {
  const email = req.body.email;
  const password = req.body.password;
  try {
    const user = await User.findOne({ email: email });
    if (!user) {
      return next({ status: 401, message: 'Authentication failded' });
    }
    console.log(user.password);
    if (!bcrypt.compare(password, user.password)) {
      return next({ status: 401, message: 'unsuccessful login attempt' });
    }
    console.log(user);
    const token = jwt.sign(
      { email: user.email, id: user._id },
      'secret_private_key',
      { expiresIn: '1h' }
    );
    res.status(200).json({ token: token });
  } catch (err) {
    next({ status: 500, message: err });
  }

})

router.post('/signup', async (req, res) => {
  const email = req.body.email;
  const password = req.body.password;

  await bcrypt.hash(password, BCRYPTFinal)
    .then(hashPassword => {
      const newUser = { email: email, password: hashPassword };
      const user1 = new User(newUser);
      user1.save().then(_ => {
        console.log(newUser)
        res.json({ message: 'Account user successfully created!!!' })
      })
        .catch(err => {
          console.log({ mesage: err })
          res.json({ message: err })
        })
    })
    .catch(err => res.json({ message: err }))
})

/* GET users listing. */
router.get('/api/protected', checkJwt, (req, res) => {
  res.json(token);
});

module.exports = router;
