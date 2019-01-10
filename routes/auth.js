var express = require('express');
var router = express.Router();
const bcrypt = require('bcrypt');
const UserModel = require("../models/User");

router.post('/', async (req, res, next) => {
  if (!req.body.username) {
    return res.status(400).send("Invalid User Name");
  }

  if (!req.body.password) {
    return res.status(400).send("Invalid Password");
  }

  UserModel.findOne({
    username: req.body.username
  }, (err, userdb) => {
    if (userdb && userdb === undefined && userdb === null) {
      return res.status(404).send('Not found');
    };

    if (err) {
      return (err);
    }

    if (req.body.password.toString() === userdb.password.toString()) {
      req.session.user = userdb._id;
      res.status(200).send('Login successful');
    }

    res.status(400).send('Unauthorized')

  });

});

module.exports = router;