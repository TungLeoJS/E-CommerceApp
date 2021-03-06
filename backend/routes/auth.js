const User = require('../models/User');
const router = require('express').Router();
const cryptojs = require('crypto-js');
const jwt = require("jsonwebtoken");

router.post("/register", async (req, res) => {
  const newUser = new User({
    username: req.body.username,
    email: req.body.email,
    password: cryptojs.AES.encrypt(
      req.body.password,
      process.env.PASSWORD_SECRET
    ).toString(),
  });

  try {
    const savedUser = await newUser.save();
    res.status(201).json(savedUser);
  } catch (err) {
    console.log(err)
    res.status(500).json(err);
  }
});
router.post('/login', async (req, res) => {
  try {
    const user = await User.findOne({
      username: req.body.username,
    });
    !user && res.status(401).json('Wrong credentials!');
    const hashedPassword = cryptojs.AES.decrypt(
      user.password,
      process.env.PASSWORD_SECRET
    );
    const originalPassword = hashedPassword.toString(cryptojs.enc.Utf8);
    const accessToken = jwt.sign({
      id: user.id,
      isAdmin: user.isAdmin
    }, process.env.JWT_SECRET, {expiresIn: '1h'});
    originalPassword !== req.body.password &&
      res.status(401).json('Wrong credentials!');
      const { password, ...others } = user._doc;
    res.status(200).json({...others, accessToken});
  } catch (err) {
    console.log(err)
    res.status(500).json(err);
  }
});

module.exports = router;
