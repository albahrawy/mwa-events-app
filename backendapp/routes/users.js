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
      return next({ status: 401, message: 'Authentication fail' });
    }

    if (!await bcrypt.compare(password, user.password)) {
      return next({ status: 401, message: 'unsuccessful login attempt' });
    }
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

router.post('/signup', async (req, res, next) => {
  const email = req.body.email;
  const password = req.body.password;

  try {
    const hashPassword = await bcrypt.hash(password, BCRYPTFinal);
    const user = new User({ email: email, password: hashPassword });
    await user.save();
    res.json({ message: 'Account user successfully created!!!' });
  } catch (err) {
    next({ status: 500, message: err });
  }

})

/* GET users listing. */
router.get('/api/protected', checkJwt, (req, res) => {
  res.json(token);
});

module.exports = router;
