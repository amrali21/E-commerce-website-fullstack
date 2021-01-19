const express = require('express')
const router = express.Router();
const controller = require('../controller/productDetailsController')


router.get('/product_details/:product_id', controller.product_details)

module.exports = router;