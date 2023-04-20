const express = require('express');
const router = express.Router();
const Product = require('../models/products.model');

const ProductController = require('../controllers/products.controllers');

router.get('/products', ProductController.getAllProducts);
router.get('/products/random', ProductController.getRandomProduct);
router.get('/products/:id', ProductController.getProductById);
router.post('/products', ProductController.postProduct);
router.put('/products/:id', ProductController.updateProduct);
router.delete('/products/:id', ProductController.deleteProduct);

module.exports = router;
