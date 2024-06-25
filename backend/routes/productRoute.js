const express = require('express');
const {
  getAllProducts,
  createProduct,
  updateProduct,
  deleteProduct,
  getProductDetails
} = require('../controllers/productController.js');
const { isAuthenticatedUser, authorizeRoles } = require('../middleware/auth.js');
const router = express.Router();

router
  .route('/products')
  .get(isAuthenticatedUser, authorizeRoles('admin'), getAllProducts);
router.route('/product/new').post(isAuthenticatedUser, createProduct);
router
  .route('/product/:id')
  .put(isAuthenticatedUser, updateProduct)
  .delete(isAuthenticatedUser, deleteProduct)
  .get(getProductDetails);

module.exports = router;
