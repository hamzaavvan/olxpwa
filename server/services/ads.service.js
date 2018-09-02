var Ads = require("../models/ads");

exports.get = async (query, page, limit, sort='', offset = 0) => {
    var options = {page, limit, sort};

    if (offset>0)
        options.offset = offset;
        
    try {
        let ads = await Ads.paginate(query, options);

        return ads;
    } catch (e) {
        throw Error(e);
    }
}

exports.delete = async (query, page, limit, sort='', offset = 0) => {
    var options = {page, limit, sort};

    if (offset>0)
        options.offset = offset;
        
    try {
        let ads = await Ads.deleteOne(query);

        return ads;
    } catch (e) {
        throw Error(e);
    }
}

exports.count = async () => {
    return Ads.countDocuments();
}

exports.createAd = async (ad) => {
    var newAd = new Ads({
        title: ad.title,
        price: ad.price,
        description: ad.description,
        user_id: ad.user_id,
        name: ad.name,
        imgs: ad.imgs,
        category: ad.category,
        phone_no: ad.phone_no,
        city: ad.city,
        created_at: new Date()
    });

    try {
        var savedAd = await newAd.save();

        return savedAd;
    } catch (e) {
        throw Error(e);
    }
}