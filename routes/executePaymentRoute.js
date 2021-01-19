const express = require('express')
const router = express.Router();
const controller = require('../controller/checkoutController/executePaymentController')

  
router.get('/execute_payment', controller.executePayment)

  
 
  module.exports = router;