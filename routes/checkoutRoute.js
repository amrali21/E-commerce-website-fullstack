const express = require('express')
const router = express.Router();
const controller = require('../controller/checkoutController/checkoutController')
const auth = require('./authRoute').auth;

  
router.get('/checkout', auth ,controller.checkout)

  
 
  module.exports = router;