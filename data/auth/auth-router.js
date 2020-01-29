require('dotenv').config();
// JWT_SECRET
const router = require('express').Router();
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const validatePostBody = require('../middlewares/validatePostBody')
const UsersDb = require('../users/users-model');

function makeToken(user) {
  // make a "payload" object
  const payload = {
    sub: user.id,
    // useful for the frontend
    username: user.username,
  };
  // make an "options" object (with expiry)
  const options = {
    expiresIn: '1d',
  };
  // use the library to make the token
  const token = jwt.sign(
    payload,
    process.env.JWT_SECRET,
    options
  );
  return token;
}

router.post('/register', validatePostBody, (req, res) => {
  let user = req.body;
  const hash = bcrypt.hashSync(user.password, 10);
  user.password = hash;
  
  UsersDb.addUser(user)
    .then(savedUser => {
      res.status(201).json(savedUser);
    })
    .catch(err => {
      res.status(500).json({
        errorMessage: 'Account creation failed!',
        stack: err.stack
      })
    })
})

router.post('/login', validatePostBody, (req, res) => {
  const { username, password } = req.body;

  UsersDb.findBy({ username })
    .then(user => {
      if(user && bcrypt.compareSync(password, user.password)) {
        const token = makeToken(user);
        res.status(200).json({
          message: `Welcome ${user.username}!`,
          token,
        })
      } else {
        res.status(404).json({
          message: `You shall not pass!`
        })
      }
    })
    .catch(err => {
      res.status(500).json({
        errorMessage: err.message,
        stack: err.stack
      })
    })
})

module.exports = router;