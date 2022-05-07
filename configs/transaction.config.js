const Mongoose = require('mongoose');
const { Schema } = Mongoose;

module.exports = {
    fields: [
        {
            name: "amount",
            type: "number",
            required: true,
            label: "Amount",
            placeholder: "0.00",
        },
        {
            name: "memo",
            type: "text",
            required: false,
            label: "Memo",
            placeholder: "Memo text",
        },
        {
            name: "user",
            type: "select",
            required: true,
            label: "User",
            placeholder: "Select User",
            options: "users",
        },
        {
            name: "isDeleted",
            type: "boolean",
            default: false,
            label: "Is Deleted",
            required: false,
        },
        {
            name: "transactionType",
            type: "radio",
            default: "Deposit",
            label: "Transaction Type",
            required: false,
            options: [
                {
                    label: "Credit",
                    value: "Credit"
                },
                {
                    label: "Debit",
                    value: "Debit"
                },
            ]
        }
    ],
    schemaFields: [
        {
            name: "user",
            type: "Schema.Types.ObjectId",
            ref: 'User',
            required: true,
            default: null,
        },
        {
            name: "amount",
            type: "Number",
            required: true,
            default: 0
        },
        {
            name: "transactionType",
            type: "String",
            required: true,
            enum: ["Credit", "Debit"]
        },
        {
            name: "memo",
            type: "String",
            required: false,
            default: null
        },
        {
            name: "isDeleted",
            type: "Boolean",
            required: false,
            default: false
        }
    ]
}