var express = require('express');
var router = express.Router();
const UserModel = require("../models/User");

router.post('/', async (req, res, next) => {
  if (!req.body.username) {
    return res.status(400).send("Invalid User Name");
  }

  if (!req.body.password) {
    return res.status(400).send("Invalid Password");
  }

  UserModel.findOne({
    "info.username": req.body.username
  }, (err, user) => {
    if (user === null || user === null) {
      return res.status(404).send('Not found');
    };
    if (err) {
      return (err);
    }
    if (req.body.password.toString() === user.auth.password.toString()) {
      req.session = user._id;
      return res.status(200).send('Login successful');
    } else {
      return res.status(400).send('Unauthorized')
    }
  });
});

module.exports = router;