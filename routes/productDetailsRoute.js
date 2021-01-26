const express = require('express')
const router = express.Router();
const controller = require('../controller/productDetailsController')
const auth = require('./authRoute').auth;


router.get('/product_details/:product_id', auth ,controller.product_details2)

module.exports = router;