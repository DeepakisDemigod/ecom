const express = require('express');
const router = express.Router();

const {
  isAuthenticatedUser,
  authorizeRoles
} = require('../middleware/auth.js');

const { newOrder }= require("../controllers/orderController.js")

router.route("/order/new").post(isAuthenticatedUser, newOrder)

module.exports = router;
