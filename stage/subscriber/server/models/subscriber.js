const Mongoose = require('mongoose');
const slug = require('mongoose-slug-generator');
const {
    Schema
} = Mongoose;

const {
    BaseOptions 
} = require('../generics/BaseSchema');

Mongoose.plugin(slug, BaseOptions);

//  Schema
const SubscriberSchema = new Schema({
    _id: {
        type: Schema.ObjectId,
        auto: true
    },
    name: {
        type: String,
        trim: true
    },
    slug: {
        type: String,
        slug: 'name',
        unique: true
    },
    isActive: {
        type: Boolean,
        default: true
    },
    updated: Date,
    created: {
        type: Date,
        default: Date.now
    }
});

module.exports = Mongoose.model('Subscriber', SubscriberSchema);
