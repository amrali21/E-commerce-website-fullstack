const express = require('express')
const router = express.Router();
const controller = require('../controller/homeController')
const auth = require('./authRoute2').auth;

  
router.get('/home', auth ,controller.home)

  
 
  module.exports = router;