const express = require('express')
const router = express.Router();
const controller = require('../controller/productSummaryController')
const auth = require('./authRoute2').auth;


router.get('/product_summary', auth , controller.product_summary)

module.exports = router;