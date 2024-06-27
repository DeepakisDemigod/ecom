const express = require('express');
const {
  registerUser,
  loginUser,
  forgotPassword,
  logout
} = require('../controllers/userController.js');
const router = express.Router();

router.route('/register').post(registerUser);
router.route('/login').post(loginUser);
router.route('/password/forgot').post(forgotPassword);
router.route('/logout').get(logout);

module.exports = router;
