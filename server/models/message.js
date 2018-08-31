const mongoose = require('mongoose');
var mongoosePaginate = require('mongoose-paginate');

const Schema = mongoose.Schema;

const MessageSchema = new mongoose.Schema({
    msg: {type: String, required: true},
    sender_id: {type:String, required: true},
    reciever_id: {type:String, required: true},
    ad_id: {type:String, required: true},
    seen: {type:Boolean, default: 0},
    sent_at: Date
});


MessageSchema.plugin(mongoosePaginate);
const Message = mongoose.model('Message', MessageSchema);

module.exports = Message;