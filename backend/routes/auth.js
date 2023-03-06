const User = require("../models/User");
const router = require("express").Router();
const cryptojs = require("crypto-js");
const jwt = require("jsonwebtoken");

let refreshTokens = [];

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
    console.log(err);
    res.status(500).json(err);
  }
});
router.post("/login", async (req, res) => {
  try {
    const user = await User.findOne({
      username: req.body.username,
    });
    !user && res.status(401).json("Wrong credentials!");
    const hashedPassword = cryptojs.AES.decrypt(
      user.password,
      process.env.PASSWORD_SECRET
    );
    const originalPassword = hashedPassword.toString(cryptojs.enc.Utf8);
    const accessToken = generateAccessToken(user);
    const refreshToken = generateRefreshToken(user);

    originalPassword !== req.body.password &&
      res.status(401).json("Wrong credentials!");
    const { password, ...others } = user._doc;
    res.status(200).json({ ...others, accessToken, refreshToken });
    refreshTokens.push(refreshToken);
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
});

router.post("/refresh", (req, res) => {
  try {
    const refreshToken = req.headers.token.split(" ")[1];
    if (!refreshToken) {
      return res.status(401).json("You are not authenticated!");
    }
    if (!refreshTokens.includes(refreshToken)) {
      return res.status(403).json("Refresh token is invalid.");
    }
    jwt.verify(refreshToken, process.env.JWT_REFRESH_SECRET, (err, user) => {
      err && console.log(err);
      refreshTokens = refreshTokens.filter((token) => token !== refreshToken);

      const newAccessToken = generateAccessToken(user);
      const newRefreshToken = generateRefreshToken(user);

      refreshTokens.push(newRefreshToken);

      res.status(200).json({
        accessToken: newAccessToken,
        refreshToken: newRefreshToken,
      });
    });
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
});

const generateAccessToken = (user) => {
  return jwt.sign(
    {
      id: user.id,
      isAdmin: user.isAdmin,
    },
    process.env.JWT_SECRET,
    { expiresIn: "1h" }
  );
};

const generateRefreshToken = (user, payload) => {
  return jwt.sign(
    {
      id: user.id,
      isAdmin: user.isAdmin,
    },
    process.env.JWT_REFRESH_SECRET,
    { expiresIn: "30d" }
  );
};

module.exports = router;
