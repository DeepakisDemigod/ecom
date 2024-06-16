const Product = require('../models/productModel.js');
const ErrorHandler = require('../utils/errorhandler.js');
const catchAsyncErrors = require('../middleware/catchAsyncErrors.js');
const ApiFeatures = require('../utils/apifeatures.js');

// Create Product -- Admin
exports.createProduct = catchAsyncErrors(async (req, res, next) => {
  const product = await Product.create(req.body);

  res.status(201).json({
    success: true,
    product
  });
});

// Get All Products

exports.getAllProducts = catchAsyncErrors(async (req, res, next) => {
  try {
    const keyword = req.query.keyword || '';
    console.log('Received query parameters:', req.query);

    const apiFeature = new ApiFeatures(Product.find(), { keyword }).search();
    const products = await apiFeature.query;

    console.log('Found products:', products);

    res.status(200).json({
      success: true,
      products
    });
  } catch (error) {
    return next(new ErrorHandler('Cannot read properties of undefined (reading "keyword")', 400));
  }
});



/*
exports.getAllProducts = catchAsyncErrors(async (req, res) => {
  console.log('Received query parameters:', req.queryStr);

  const apiFeature = new ApiFeatures(Product.find(), req.query.keyword).search();
  const products = await apiFeature.query;

  console.log('Found products:', products);

  res.status(200).json({
    success: true,
    products
  });
});
*/

// get Product Details

exports.getProductDetails = catchAsyncErrors(async (req, res, next) => {
  const product = await Product.findById(req.params.id);

  if (!product) {
    return next(new ErrorHandler('Product not found', 404));
  }

  res.status(200).json({
    success: true,
    product
  });
});
// Update Product -- Admin

exports.updateProduct = catchAsyncErrors(async (req, res, next) => {
  let product = await Product.findById(req.params.id);

  if (!product) {
    return next(new ErrorHandler('Product not found', 404));
  }

  product = await Product.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
    runValidators: true,
    useFindAndModify: false
  });

  res.status(200).json({
    success: true,
    product
  });
});

// Delete Product -- Admin

exports.deleteProduct = catchAsyncErrors(async (req, res, next) => {
  const product = await Product.findById(req.params.id);

  if (!product) {
    return next(new ErrorHandler('Product not found', 404));
  }

  await Product.deleteOne({ _id: req.params.id });

  res.status(200).json({
    success: true,
    message: 'Product deleted successfully'
  });
});
