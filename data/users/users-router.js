const router = require('express').Router;

const UsersDb = require('./users-model');

router.get('/', (req, res) => {

  UsersDb.getUsers()
    .then(users => {
      res.status(200).json(users)
    })
    .catch(err => {
      res.status(500).json({
        errorMessage: err.message,
        stack: err.message
      })
    })
});

module.exports = router;