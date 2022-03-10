const User = require('../models/User');
const router = require('express').Router();
const cryptojs = require('crypto-js');

router.post('/register', async (req, res) => {
  const newUser = new User({
    username: req.body.username,
    email: req.body.email,
    password: cryptojs.AES.encrypt(
      req.body.password,
      process.env.PASSWORD_SECRET
    ).toString(),
  });
  try {
    const saveUser = await newUser.save();
    res.status(201).json(saveUser);
  } catch (err) {
    res.status(500).json(err);
  }
});

router.post('/login', async (req, res) => {
  try {
    const user = await User.findOne({
      username: req.body.username,
    });
    console.log(user)
    !user && res.status(401).json('Wrong credentials!');
    const hashedPassword = cryptojs.AES.decrypt(
      user.password,
      process.env.PASSWORD_SECRET
    );
    const originalPassword = hashedPassword.toString(cryptojs.enc.Utf8);
    originalPassword !== req.body.password &&
      res.status(401).json('Wrong credentials!');
      const { password, ...others } = user._doc;
    res.status(200).json(others)
  } catch (err) {
    res.status(500).json(err);
  }
});

module.exports = router;
