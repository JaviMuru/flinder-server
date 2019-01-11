const express = require('express');
const bcrypt = require('bcrypt');
const router = express.Router();
const UserModel = require("../models/User");
const mongoose = require("mongoose");

router.route('/')
  .get((req, res) => {
    UserModel.find({}, (err, users) => {
      if (users && users.length > 0) {
        const usersInfo = users.map(user => user.info);
        return res.json(usersInfo);
      } else {
        return res.status(404).send('Not found');
      }
    });
  });

module.exports = router;