const express = require('express');
const router = express.Router();
const passport = require('passport');

// Bring in Models & Helpers
const auth = require('../middleware/auth');
const role = require('../middleware/role');

const { validationResult } = require('express-validator');

const passthru = (req, res, next) => {
    next();
};

const validate = (validations) => {
    return async (req, res, next) => {
        for (let validation of validations) {
            const result = await validation.run(req);
            console.log(result)
            if (result.errors.length) break;
        }

        const errors = validationResult(req);
        if (errors.isEmpty()) {
            return next();
        }

        res.status(400).json({ errors: errors.array() });
    };
};

/**
 * Base API Router.
 */
class BaseRouter {
    constructor(Model, router, options) {
        this.model = Model;
        this.router = router;
        this.nouns = options.nouns || {
            type: 'Item',
            plural: 'Items'
        },
        this.lookups = options.lookups || [];

        this.getValueObject = this.getValueObject.bind(this);
        this.add = this.add.bind(this);
        this.list = this.list.bind(this);
        this.listSelect = this.listSelect.bind(this);
        this.doLookups = this.doLookups.bind(this);
        this.getRouter = this.getRouter.bind(this);
        this.validate = this.validate.bind(this);
        this.getAll = this.getAll.bind(this);
        this.getById = this.getById.bind(this);
        this.update = this.update.bind(this);
        this.delete = this.delete.bind(this);
        this.activate = this.activate.bind(this);
    }

    getRouter() {
        return this.router;
    }

    validate(validations) {
        return async (req, res, next) => {
            for (let validation of validations) {
                const result = await validation.run(req);
                if (result.errors.length) break;
            }
    
            const errors = validationResult(req);
            if (errors.isEmpty()) {
                return next();
            }
    
            res.status(400).json({ errors: errors.array() });
        };
    }

    async doLookups(route, itemDoc) {
        try {
            if (typeof this.lookups[route] !== 'undefined' 
            && this.lookups[route].length !== 'undefined' 
            && this.lookups[route].length > 0) {
                
                const lookups = this.lookups[route];
                for (let i = 0; i < lookups.length; i++) {
                    const lookup = lookups[i];
                    const model = lookup.model;
                    if (itemDoc[lookup.localfield] instanceof Array) {
                        const ids = itemDoc[lookup.localfield];
                        const foreignDocs = await model.find({ [lookup.foreignfield]: { $in: ids } });
                        itemDoc[lookup.localfield] = foreignDocs;
                    }
                    else {
                        const foreignDoc = await model.findOne({ [lookup.foreignfield]: itemDoc[lookup.localfield] });
                        itemDoc[lookup.localfield] = foreignDoc;
                    }
                }
            }
        }
        catch(e) {
            console.error('doAggregations error', e)
        }
        return itemDoc;
    }

    getValueObject(source) {
        const valueObject = {};
        for (let key in source) {
            if (source.hasOwnProperty(key)) {
                let value = source[key];
                if (this.model.schema.path(key).instance === 'Array' && 
                    ! (value instanceof Array)) {

                    value = value.split(',').map(item => item.trim());
                }
                valueObject[key] = value;
            }
        }
        return valueObject;
    }
    
    add(...middlewares) {
        const _middlewares = [].concat(middlewares, (req, res) => {

            const item = new this.model(this.getValueObject(req.body));

            console.log(item)

            item.save((err, data) => {
                if (err) {
                    return res.status(400).json({
                        error: `${this.nouns.type} could not be added. Please try again.`
                    });
                }
                res.status(200).json({
                    success: true,
                    message: `${this.nouns.type} has been added successfully!`,
                    [this.nouns.type.toLowerCase()] : data
                });
            });
        })
        return this.router.post('/add', ..._middlewares);
    }


    list(...middlewares) {
        const _middlewares = [].concat(middlewares, (req, res) => {
            this.model.find({ isActive: true }, (err, data) => {
                if (err) {
                    return res.status(400).json({
                        error: `${this.nouns.plural} could not be listed. Please try again.`
                    });
                }
                res.status(200).json({
                    [this.nouns.plural.toLowerCase()] : data
                });
            });
        });
        return this.router.get('/list', ..._middlewares);
    }

    listSelect(...middlewares) {
        const _middlewares = [].concat(middlewares, async (req, res) => {
            try {
                res.status(200).json({
                    [this.nouns.plural.toLowerCase()] : await this.model.find({}, 'name')
                });
            } 
            catch (error) {
                res.status(400).json({
                    error: `Request for list/select ${this.nouns.type} could not be processed. Please try again.`
                });
            }
        });
        return this.router.get('/list/select', ..._middlewares);
    }

    getAll(...middlewares) {
        const _middlewares = [].concat(middlewares, async (req, res) => {
            try {
                res.status(200).json({
                    [this.nouns.plural.toLowerCase()] : await this.model.find({})
                });
            } 
            catch (error) {
                res.status(400).json({
                    error: `Your request for ${this.nouns.type} could not be processed. Please try again.`
                });
            }
        });
        return this.router.get('/', ..._middlewares);
    }

    getById(...middlewares) {
        const _middlewares = [].concat(middlewares, async (req, res) => {
            try {

                console.log('req.params', req.params)
                console.log('_middlewares', _middlewares)

                const itemId = req.params.id;        
                let itemDoc = null;
                
                // itemDoc = await this.model.findOne({ _id: itemId })
                itemDoc = await this.doLookups(
                    '/:id', 
                    await this.model.findOne({ _id: itemId })
                );
        
                if (! itemDoc) {
                    return res.status(404).json({
                        message: `No items of type ${this.nouns.type} found.`
                    });
                }
        
                res.status(200).json({
                    [this.nouns.type.toLowerCase()] : itemDoc
                });
            } 
            catch (error) {
                res.status(400).json({
                    error: `Could not get ${this.nouns.type}. Please try again.`
                });
            }
        });
        return this.router.get('/:id', ..._middlewares);
    }

    update(...middlewares) {
        const _middlewares = [].concat(middlewares, async (req, res) => {
            try {
                const itemId = req.params.id;
                const update = this.getValueObject(req.body.item);
                const query = { _id: itemId };
        
                await this.model.findOneAndUpdate(query, update, {
                    new: true
                });
        
                res.status(200).json({
                    success: true,
                    message: `${this.nouns.type} with ID ${itemId} has been updated successfully!`
                });
            } 
            catch (error) {
                res.status(400).json({
                    error: `${this.nouns.type} with ID ${itemId} could not be updated. Please try again.`
                });
            }
        });
        return this.router.put('/', ..._middlewares);
    }

    activate(...middlewares) {
        const _middlewares = [].concat(middlewares, async (req, res) => {
            try {
                const itemId = req.params.id;
                const update = req.body.item;
                const query = { _id: itemId };
    
                if (! update.isActive) {
                    const itemDoc = await this.model.findOne(
                        { _id: itemId, isActive: true }
                    );
                }
    
                await this.model.findOneAndUpdate(query, update, {
                    new: true
                });
    
                res.status(200).json({
                    success: true,
                    message: `${this.nouns.type} with ID ${itemId} has been updated successfully!`
                });
            } 
            catch (error) {
                res.status(400).json({
                    error: `Your request to toggle ${this.nouns.type} could not be processed. Please try again.`
                });
            }
        });
        return this.router.put('/:id/active', ..._middlewares);
    }

    delete(...middlewares) {
        const _middlewares = [].concat(middlewares, async (req, res) => {
            try {
                const itemId = req.params.id;
                const item = await this.model.deleteOne({ _id: itemId });
                res.status(200).json({
                    success: true,
                    message: `${this.nouns.type} with ID ${itemId} has been deleted successfully!`,
                    [this.nouns.type.toLowerCase()] : item
                });
            }
            catch (error) {
                res.status(400).json({
                    error: `${this.nouns.type} with ID could not be deleted. Please try again.`
                });
            }
        });
        return this.router.delete('/delete/:id', ..._middlewares);
    }
}

module.exports = {
    validate,
    BaseRouter
};