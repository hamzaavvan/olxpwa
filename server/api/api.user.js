const express = require("express");
var router = express.Router();
var UserServices = require("../services/user.service");
var bcrypt = require('bcrypt');

router.get('/:uid?', async (req, res) => {
    var user_id = req.params.uid ? req.params.uid : req.session.uid;
    var query = {_id: user_id};

    try {
        var user = await UserServices.get(query, 1, 1);

        res.status(201).json({status: 201, user: user.docs[0], uid: user.docs[0]._id, active: user.docs[0]._id ? true : false})
    } catch (e) {
        res.status(201).json({status: 201, error: true})
    }
});

router.put('/:uid?', async (req, res) => {
    if (!req.session.uid)
        res.status(400).json({status: 400, message: "Err! user."});

    var salt = bcrypt.genSaltSync(10);
    var user = {
        id: req.session.uid,
        name: req.body.name,
        email: req.body.email,
        phone_no: req.body.phone_no,
        city: req.body.city,
        province: req.body.province,
    };

    console.log(req.body)
    if (req.body.curr_password.length > 0 && req.body.new_password.length>0 && req.body.conf_password.length>0) {
        var curr_user = await UserServices.get({_id: user.id}, 1, 1);

        if (bcrypt.compareSync(req.body.curr_password, curr_user.docs[0].password)) {

            if (bcrypt.compareSync(req.body.new_password, curr_user.docs[0].password))
                res.status(400).json({status: 400, error: true, message: "Password must be different than old one!"});

            if (req.body.new_password != req.body.conf_password)
                res.status(400).json({status: 400, error: true, message: "Password do not match!"});

            user.new_password = bcrypt.hashSync(req.body.new_password, salt);
        } else {
            res.status(400).json({status: 400, error: true, message: "Incorrect password!"});
        }
    }

    try {
        var user = await UserServices.updateUser(user);

        console.log(user);
        res.status(201).json({status: 201, success: true, message: "User info updated"});
    } catch (e) {
        res.status(201).json({status: 201, error: true, message: e.message})
    }
});

router.post('/', async (req, res) => {
    try {
        var salt = bcrypt.genSaltSync(10);
        var user = {
            email: req.body.email,
            password: bcrypt.hashSync(req.body.password, salt),
            name: req.body.name,
            phone_no: req.body.phone_no,
        };

        var newUser = await UserServices.createUser(user);

        req.session.uid = newUser._id;

        res.status(201).json({status: 201, data: newUser, message: "User registered successfully!"})
    } catch (error) {
        res.status(400).json({status: 400, error: error.message, message: "Couldn't register user!"})
    }
});

module.exports = router;