const router = require('express').Router();

const validatePostBody = require('../middlewares/validatePostBody')
const UsersDb = require('../users/users-model');

router.post('/register', validatePostBody, (req, res) => {
  let user = req.body;
  
  UsersDb.addUser(user)
    .then(user => {
      res.status(201).json(user);
    })
    .catch(err => {
      res.status(500).json({
        errorMessage: err.message,
        stack: err.stack
      })
    })
})

module.exports = router;