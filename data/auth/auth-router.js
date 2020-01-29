require('dotenv').config();
// JWT_SECRET
const router = require('express').Router();
const bcrypt = require('bcryptjs');

const validatePostBody = require('../middlewares/validatePostBody')
const UsersDb = require('../users/users-model');

// function makeToken(user) {
//   // make a "payload" object
//   const payload = {
//     sub: user.id,
//     // useful for the frontend
//     username: user.username,
//   };
//   // make an 
// }

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
        res.status(200).json({
          message: `Welcome ${user.username}!`
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