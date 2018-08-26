const express = require("express");
var router = express.Router();

var user = require('./api.user');
var ads = require('./api.ads');

router.use('/user', user);
router.use('/ads', ads);

module.exports = router;