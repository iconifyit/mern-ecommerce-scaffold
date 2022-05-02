const Mongoose = require('mongoose');
const slug = require('mongoose-slug-generator');
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
 * Base types for all items
 */
const BaseTypes = {
    type: String,
    default: 'Icon',
    enum: ['Icon', 'Illustration']
};

/**
 * License options
 */
const Licenses = {
    type: String,
    default: 'Basic',
    enum: ['Basic', 'Extended']
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
        uuid: {
            type: String,
            unique: true
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

class xxBaseSchema {
    constructor(fields) {
        return new Schema(Object.assign({}, {
            _id: {
                type: Schema.ObjectId,
                auto: true
            },
            uuid: {
                type: String,
                unique: true
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
}

const xBaseSchema = {
    _id: {
        type: Schema.ObjectId,
        auto: true
    },
    uuid: {
        type: String,
        unique: true
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
    isActive: {
        type: Boolean,
        default: true
    },
    updated: Date,
    created: {
        type: Date,
        default: Date.now
    }
}

module.exports = {
    BaseSchema,
    BaseOptions,
    BaseTypes,
    Licenses,
};