const router = require('express').Router();


const authRoutes = require('./auth');
const userRoutes = require('./user');
const addressRoutes = require('./address');
const newsletterRoutes = require('./newsletter');
const productRoutes = require('./product');
const categoryRoutes = require('./category');
const familyRoutes = require('./family');
const setRoutes = require('./set');
const brandRoutes = require('./brand');
const contactRoutes = require('./contact');
const merchantRoutes = require('./merchant');
const cartRoutes = require('./cart');
const orderRoutes = require('./order');
const reviewRoutes = require('./review');
const wishlistRoutes = require('./wishlist');

const creditRoutes = require('./credit');
const transactionRoutes = require('./transaction');

// auth routes
router.use('/auth', authRoutes);

// user routes
router.use('/user', userRoutes);

// address routes
router.use('/address', addressRoutes);

// newsletter routes
router.use('/newsletter', newsletterRoutes);

// product routes
router.use('/product', productRoutes);

// category routes
router.use('/category', categoryRoutes);

// family routes
router.use('/family', familyRoutes);

// set routes
router.use('/set', setRoutes);

// brand routes
router.use('/brand', brandRoutes);

// contact routes
router.use('/contact', contactRoutes);

// merchant routes
router.use('/merchant', merchantRoutes);

// cart routes
router.use('/cart', cartRoutes);

// order routes
router.use('/order', orderRoutes);

// Review routes
router.use('/review', reviewRoutes);

// Wishlist routes
router.use('/wishlist', wishlistRoutes);

// Credit routes
router.use('/credit', creditRoutes);

// Transaction routes
router.use('/transaction', transactionRoutes);


module.exports = router;
