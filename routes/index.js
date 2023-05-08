const router = require('express').Router()

// import package swagger 
const swaggerUi = require('swagger-ui-express');
// import file json
const swaggerDocument = require('../docs/swagger.json');

// api docs
router.use('/api-docs', swaggerUi.serve);
router.get('/api-docs', swaggerUi.setup(swaggerDocument));

const Auth = require('./auth')
const Product = require('./product')
const Warehouse = require('./warehouse')
const Profile = require('./profile')

// API server
router.use('/api/v1/auth/', Auth)
router.use('/api/v1/products/', Product)
router.use('/api/v1/warehouses/', Warehouse)
router.use('/api/v1/profile', Profile)

module.exports = router
