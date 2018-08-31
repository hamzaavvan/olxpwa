var Messages = require("../models/message");

exports.get = async (query, page, limit, sort='', offset = 0) => {
    var options = {page, limit, sort};

    if (offset>0)
        options.offset = offset;
        
    try {
        let message = await Messages.paginate(query, options);

        return message;
    } catch (e) {
        throw Error(e);
    }
}

exports.count = async () => {
    return Messages.countDocuments();
}

exports.createAd = async (msg) => {
    var newMessage = new Messages({
        msg: msg.text,
        sender_id: msg.sender_id,
        reciever_id: msg.reciever_id,
        ad_id: msg.ad_id,
        sent_at: new Date()
    });

    try {
        var savedMessage = await newMessage.save();

        return savedMessage;
    } catch (e) {
        throw Error(e);
    }
}