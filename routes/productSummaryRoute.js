const express = require('express')
const router = express.Router();
const controller = require('../controller/productSummaryController')
const auth = require('./authRoute').auth;


router.get('/product_summary', auth , controller.product_summary2)

module.exports = router;