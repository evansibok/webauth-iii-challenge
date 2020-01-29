const router = require('express').Router();
const bcrypt = require('bcryptjs');

const validatePostBody = require('../middlewares/validatePostBody')
const UsersDb = require('../users/users-model');

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
        errorMessage: err.message,
        stack: err.stack
      })
    })
})

module.exports = router;