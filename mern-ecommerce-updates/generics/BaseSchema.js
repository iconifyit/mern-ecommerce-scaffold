const Mongoose = require('mongoose');
const {
    Schema
} = Mongoose;

/**
 * Base options for all items
 */
const BaseOptions = {
    separator: '-',
    lang: 'en',
    truncate: 120
};

/**
 * Base schema for all items
 */
function BaseSchema(fields) {
    return new Schema(Object.assign({}, {
        _id: {
            type: Schema.ObjectId,
            auto: true
        },
        name: {
            type: String,
            trim: true
        },
        tags: [{
            type: String,
            trim: true
        }],
        slug: {
            type: String,
            slug: 'name',
            unique: true
        },
        image: {
            data: Buffer,
            contentType: String
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
    }, fields))
}

BaseSchema.prototype = Schema;


module.exports = {
    BaseSchema,
    BaseOptions
};