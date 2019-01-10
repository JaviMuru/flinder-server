const express = require('express');
const bcrypt = require('bcrypt');
const router = express.Router();
const UserModel = require("../models/User");
const mongoose = require("mongoose");

router.route('/')
  .post(async (req, res) => {
    const user = new UserModel({
      info: {
        username: req.body.username,
        firstname: req.body.firstname,
        lastname: req.body.lastname,
        email: req.body.email,
        birthday: req.body.birthday,
        city: req.body.city,
        country: req.body.country,
        gender: req.body.gender,
      },
      auth: {
        password: req.body.password,
      }
    });

    bcrypt.hash(user.auth.password.toString(), 10, async function (err, hash) {
      if (err) {
        throw err;
      }
      user.auth.password = hash;
      // FIXME: Asignación del _id al usuario antes de guardarlo en Mongo
      console.log(user);
      await user.save().catch(err => {
        throw err;
        return res.status(500).send();
      });
      return res.status(201).send('Created Successfully');
    });
  });

module.exports = router;