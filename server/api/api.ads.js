const express = require("express");
var router = express.Router();
var AdsServices = require('../services/ads.service');
const fileUpload = require('express-fileupload');

router.use(fileUpload());

router.get('/', async (req, res) => {
    var page = req.query.page ? req.query.page : 1;
    var limit = req.query.limit ? req.query.limit : 10;
    var sort = {_id: -1};
    var offset = 0;

    var query = {};

    if (req.query.cat)
        query.category = req.query.cat;

    if (req.query.user_id) {
        query.user_id = req.query.user_id;

        var count =  await AdsServices.count();
        var random = Math.floor((Math.random() * count) / limit);

        offset = random;
    }

    if (req.query.keyword&&req.query.keyword!="")
        query.title = {$regex: `^${req.query.keyword}`, $options : 'i'};
    
    console.log("page");
    console.log(page);
    try {
        var ads = await AdsServices.get(query, page, parseInt(limit), sort, offset);
        
        return res.status(200).json({status: 200, data: ads});
    } catch (e) {
        return res.status(400).json({status: 400, message: e.message});
    }
});

router.get('/:ad_id', async (req, res) => {
    var id = req.params.ad_id;
    console.log(req.params)

    try {
        var ads = await AdsServices.get({_id: id}, 1, 1);
        
        return res.status(200).json({status: 200, data: ads.docs[0]});
    } catch (e) {
        return res.status(400).json({status: 400, message: e.message});
    }
});

router.post('/', async (req, res) => {
    try {
        var ad = {
            title: req.body.title,
            price: req.body.price,
            description: req.body.description,
            name: req.body.name,
            user_id: req.session.uid,
            category: req.body.ad_category,
            phone_no: req.body.phone_no,
            city: req.body.city
        };

        var imgs = [];
        
        if (req.files.ad_img.length==undefined)
            req.files.ad_img = [req.files.ad_img];

        if (req.files.ad_img.length > 0) {
            var i = 0, error = false;
            var img_id = Date.now();

            req.files.ad_img.forEach(img => {
                img.mv(`public/img/ads/ad-${img_id}-${i}.jpg`).then((err) => {
                    if (err) {
                        error = true;
                        console.log(err);
                    } 
                });
                
                if (!error) 
                    imgs[i] = `img/ads/ad-${img_id}-${i}.jpg`;

                // console.log(imgs);
                i++;
            })
        }
        ad.imgs = imgs;

        var newAd = await AdsServices.createAd(ad);

        res.status(201).json({status: 201, data: newAd, message: "Ad registered successfully!"})
    } catch (error) {
        res.status(400).json({status: 400, error: error.message, message: "Couldn't register ad!"})
    }
});

module.exports = router;