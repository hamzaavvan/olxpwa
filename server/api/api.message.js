const express = require("express");
const firebase = require('firebase-admin');
var router = express.Router();
var MessagesServices = require("../services/messages.service");

firebase.initializeApp({
    apiKey: "AIzaSyCCGf5qhYR_E7G-2dT5Z0wL5-cqFRvOiCE",
    authDomain: "olxpwa-hamzaavvan.firebaseapp.com",
    databaseURL: "https://olxpwa-hamzaavvan.firebaseio.com",
    projectId: "olxpwa-hamzaavvan",
    storageBucket: "",
    messagingSenderId: "1007008541847"
});

router.post('/', (req, res) => {
    // if (!req.session.uid)
    //     return res.status(400).json({status: 400, error: "Err user!"});

    if (req.body && req.body.token) {
        const messaging = firebase.messaging();
        const payload = {
            notification: {
                title: "You've a message",
                body: req.body.msg,
                click_action: req.body.url || '/message/',
            }
        }

        console.log(req.body)
        
        messaging.sendToDevice(req.body.token, payload);
        res.status(201).json({msg: 'sent'});
    } else {
        res.status(400).json({err: 'token not found'});
    }
});

router.get('/:uid/:ad_id', async (req, res) => {
    var page = req.query.page ? req.query.page : 1;
    var limit = req.query.limit ? req.query.limit : 10;
    var user_id = req.params.uid;
    var ad_id = req.params.ad_id;
    var query = {_id: user_id, ad_id: ad_id};

    try {
        var user = await MessagesServices.get(query, page, parseInt(limit));

        res.status(201).json({status: 201, user: user.docs[0], uid: user.docs[0]._id, active: user.docs[0]._id ? true : false})
    } catch (e) {
        res.status(201).json({status: 201, error: true})
    }
});

// router.post('/', async (req, res) => {
//     try {
//         var message = {
//             msg: req.body.msg,
//             sender_id: req.session.uid,
//             reciever_id: req.body.reciever_id,
//             ad_id: req.body.ad_id,
//         };

//         var newMessage = await Message.broadcast(message);

//         res.status(201).json({status: 201, data: newMessage, message: "Message sent successfully!"})
//     } catch (error) {
//         res.status(400).json({status: 400, error: error.message, message: "Couldn't sent message!"})
//     }
// });

module.exports = router;