const mongoose = require('mongoose');
var mongoosePaginate = require('mongoose-paginate');

const Schema = mongoose.Schema;

const AdSchema = new mongoose.Schema({
    title: {type: String, required: true},
    price: {type: Number, required: true},
    description: String,
    user_id: {type:String, required: true},
    name: String,
    imgs: [String],
    category: {type: String, required: true},
    phone_no: {type: Number, maxlength: 11},
    city: String,
    created_at: Date
});


AdSchema.plugin(mongoosePaginate);
const Ads = mongoose.model('Ads', AdSchema);

module.exports = Ads;