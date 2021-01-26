const express = require('express')
const router = express.Router();
const controller = require('../controller/homeController')
const auth = require('./authRoute').auth;

  
router.get('/home', auth ,controller.home2)

  
 
  module.exports = router;