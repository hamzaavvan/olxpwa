const bodyParser = require('body-parser');
const express = require('express');
const app = express();
const mongoose = require('mongoose');
const logger = require('morgan');
const path = require("path");
const bcrypt = require('bcrypt');

var AdsServices = require("./services/ads.service");
var UserServices = require("./services/user.service");

var session = require('express-session')
var api = require("./api/api");
var ad_cats = require('./categories');

app.use(logger('dev'));
app.use(bodyParser.json());
app.use(session({secret: '☻_[♥♦5x&♠M◘/$5.\\|4]'}));
app.use(bodyParser.urlencoded({extended: false}));
app.use(express.static(__dirname+"/../public/"));

app.use((req, res, next) => {
    // res.header("Access-Control-Allow-Origin", `http://localhost:${process.env.PORT || 400}`);
    // res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    // res.header("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE");

    console.log(req.session.uid);
    if (req.session.uid)
        res.header("User-Active", "true");
    else
        res.header("User-Active", "false");

    next();
});


mongoose.connect("mongodb://hamzaavvan:GhabwarAm5quawb@ds125372.mlab.com:25372/olx_app", { useNewUrlParser: true });

app.get('/', (req, res) => res.redirect('/home'));

app.get("/ads/cats", (req, res, next) => {
    var cats = ad_cats;

    res.json({data: cats});
    res.end();
});

app.get('/home', (req, res) => {
    res.sendFile(path.join(__dirname, '../public/', 'home.html'))
});

app.get('/signin', (req, res) => {
    if (req.session.uid)
        res.redirect('/');
    else
        res.sendFile(path.join(__dirname, '../public/', 'sign-in.html'));
})

app.get('/signup', (req, res) => {
    if (req.session.uid)
        res.redirect('/');
    else
        res.sendFile(path.join(__dirname, '../public/', 'sign-up.html'));
})

app.get('/post-ad', (req, res) => {
    if (req.session.uid)
        res.sendFile(path.join(__dirname, '../public/', 'post-ad.html'));
    else
        res.redirect('/signin');
})

app.get('/profile', (req, res) => {
    if (req.session.uid)
        res.sendFile(path.join(__dirname, '../public/', 'profile.html'));
    else
        res.redirect('/signin');
})

app.get('/message/:id?', (req, res) => {
    if (req.session.uid)
        res.sendFile(path.join(__dirname, '../public/', 'message.html'));
    else
        res.redirect('/');
})

app.get('/signout', (req, res) => {
    req.session.destroy(() => {
        return res.redirect('/');
    });
})

app.get('/ad/:id', async (req, res) => {
    console.log(req.session.uid);
    var id = req.params.id;
    
    try {
        var ad = await AdsServices.get({_id: id}, 1, 1);
        
        if (ad.docs.length > 0)
            res.sendFile(path.join(__dirname, '../public/', 'view-ad.html'));
        else
            res.redirect('/');
    } catch (e) {
        res.redirect('/');
    }
});

app.post('/signin', async (req, res) => {
    var email = req.body.email;
    var password = req.body.password;
    
    try {
        var user = await UserServices.get({email: email}, 1, 1);

        if (email.length > 0 && password.length > 0) {
            if (bcrypt.compareSync(password, user.docs[0].password)) {
                req.session.uid = user.docs[0]._id;
                
                var week = 7*24*60*60 ;
                req.session.cookie.expires = new Date(Date.now() + week)
                req.session.cookie.maxAge = week

                return res.status(201).json({status: 201, success: true});
            } else {
                return res.status(400).json({status: 400, error: "Incorrect email or password!"});
            }
        } else {
            return res.status(400).json({status: 400, error: "Email password required!"});
        }
        
    } catch (e) {
        console.log(e.message)
        return res.status(400).json({status: 400, error: "Oops something went!"});
    }
});

app.use("/api", api);

app.listen(process.env.PORT || 4000);