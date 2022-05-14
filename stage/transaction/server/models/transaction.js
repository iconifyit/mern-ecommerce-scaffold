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
const TransactionSchema = new Schema({
    _id: {
        type: Schema.ObjectId,
        auto: true
    },
    user: {
        type: Schema.Types.ObjectId,
        required: true,
    },
    amount: {
        type: Number,
        required: true,
        default: 0,
    },
    transactionType: {
        type: String,
        required: true,
    },
    memo: {
        type: String,
        required: false,
    },
    isDeleted: {
        type: Boolean,
        required: false,
        default: false,
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

module.exports = Mongoose.model('Transaction', TransactionSchema);
