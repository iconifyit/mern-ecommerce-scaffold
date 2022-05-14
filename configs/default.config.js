const Mongoose = require('mongoose');
const { Schema } = Mongoose;

module.exports = {
    fields: [
        {
            name: "memo",
            type: "text",
            required: false,
            label: "Memo",
            placeholder: "Memo text",
        }
    ],
    schemaFields: [
        {
            name: "memo",
            type: "String",
            required: false,
            default: null
        }
    ]
}