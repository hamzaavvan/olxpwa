const express = require("express");
var router = express.Router();

var user = require('./api.user');
var ads = require('./api.ads');
var message = require('./api.message');

router.use('/user', user);
router.use('/ads', ads);
router.use('/message', message);

module.exports = router;