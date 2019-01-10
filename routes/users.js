const express = require('express');
const bcrypt = require('bcrypt');
const router = express.Router();
const UserModel = require("../models/User");
const mongoose = require("mongoose");

router.route('/')
  .get((req, res) => {});

module.exports = router;