const express = require('express');
const router = express.Router();

// Bring in Models & Helpers
const auth = require('../../middleware/auth');
const role = require('../../middleware/role');

const {validate, BaseRouter} = require('../../generics/BaseRouter');
const { body, param  } = require('express-validator');

const Transaction = require('../../models/transaction');


// Create apiRouter instance.
const apiRouter = new BaseRouter(
    Transaction, 
    router, 
    {
        nouns: {
            type: 'Transaction',
            plural: 'Transactions'
        }
    }
);

// List items route.
// apiRouter.list(auth, role.checkRole(role.ROLES.Member))
apiRouter.list()

// Select list route.
apiRouter.listSelect(auth, role.checkRole(role.ROLES.Admin, role.ROLES.Merchant))

// Get all items route.
apiRouter.getAll(auth, role.checkRole(role.ROLES.Admin, role.ROLES.Merchant));

// Get item by ID route.
apiRouter.getById(auth, role.checkRole(role.ROLES.Admin, role.ROLES.Merchant));

// Add item route.
apiRouter.add(auth, role.checkRole(role.ROLES.Admin), validate([
    body('name').not().isEmpty().withMessage('Transaction name is required.'),
    body('isActive').isBoolean().withMessage('isActive must be a boolean.'),
]))

// Update item route.
apiRouter.update(auth, role.checkRole(role.ROLES.Admin), validate([
    body('name').not().isEmpty().withMessage('Transaction name is required.'),
    body('name').isLength({ min: 3 }).withMessage('Transaction name must be at least 3 characters.'),
    param('id').isMongoId().withMessage('Transaction id is invalid.'),
]));

// Toggle activation route.
apiRouter.activate(auth, role.checkRole(role.ROLES.Admin));

// Delete item route.
apiRouter.delete(auth, role.checkRole(role.ROLES.Admin));


module.exports = apiRouter.getRouter();
