const express = require('express');
const router = express.Router();

// Bring in Models & Helpers
const auth = require('../../middleware/auth');
const role = require('../../middleware/role');

const {validate, BaseRouter} = require('../../generics/BaseRouter');
const { body } = require('express-validator');

const Category = require('../../models/category');


// Create apiRouter instance.
const apiRouter = new BaseRouter(Category, router, {
    type: 'Category',
    plural: 'Categories',
    singular: 'Category'
});

// Add item route.
apiRouter.add(auth, role.checkRole(role.ROLES.Admin), validate([
    body('name').not().isEmpty().withMessage('Category name is required.'),
    body('name').isLength({ min: 3 }).withMessage('Category name must be at least 3 characters.'),
    body('email').isEmail().withMessage('Email is invalid.'),
    body('isValid').isBoolean().withMessage('Is Valid must be a boolean.'),
]))

// List items route.
apiRouter.list(auth, role.checkRole(role.ROLES.Member))

// Select list route.
apiRouter.listSelect(auth, role.checkRole(role.ROLES.Admin, role.ROLES.Merchant))

// Get all items route.
apiRouter.getAll(auth, role.checkRole(role.ROLES.Admin, role.ROLES.Merchant));

// Get item by ID route.
apiRouter.getById(auth, role.checkRole(role.ROLES.Admin, role.ROLES.Merchant));

// Update item route.
apiRouter.update(auth, role.checkRole(role.ROLES.Admin), validate([
    body('name').not().isEmpty().withMessage('Category name is required.'),
    body('name').isLength({ min: 3 }).withMessage('Category name must be at least 3 characters.'),
    params('id').isMongoId().withMessage('Category id is invalid.'),
]));

// Toggle activation route.
apiRouter.activate(auth, role.checkRole(role.ROLES.Admin));

// Delete item route.
apiRouter.delete(auth, role.checkRole(role.ROLES.Admin));


module.exports = apiRouter.getRouter();
