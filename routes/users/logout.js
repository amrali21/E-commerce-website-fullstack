const express = require('express')
const router = express.Router();
const controller = require('../../controller/users/logout')

  
router.get('/logout', controller.logoutPostController)

  
 
  module.exports = router;