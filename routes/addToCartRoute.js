const express = require('express')
const router = express.Router();
const controller = require('../controller/addToCartController')
const auth = require('./authRoute').auth;

  
router.post('/add_to_cart',auth ,controller.add_to_cart2)

  
 
  module.exports = router;