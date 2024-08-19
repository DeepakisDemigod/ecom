const Product = require('../models/productModel.js');
const ErrorHandler = require('../utils/errorhandler.js');
const catchAsyncErrors = require('../middleware/catchAsyncErrors.js');
const ApiFeatures = require('../utils/apifeatures.js');

// Create Product -- Admin
exports.createProduct = catchAsyncErrors(async (req, res, next) => {
  req.body.user = req.user.id;
  const product = await Product.create(req.body);

  res.status(201).json({
    success: true,
    product
  });
});

// Get All Products

/*-------- CHAT GPT ---------*/

exports.getAllProducts = catchAsyncErrors(async (req, res, next) => {
  const resultPerPage = 8;

  // Initialize ApiFeatures with base query and request query
  const apiFeature = new ApiFeatures(Product.find(), req.query)
    .search()
    .filter();

  // Calculate total count of filtered products
  const filteredProductsCount = await apiFeature.query.clone().countDocuments();

  // Apply pagination
  apiFeature.pagination(resultPerPage);

  // Execute final query with filters and pagination
  const products = await apiFeature.query;

  // Get total count of products in the database
  const productsCount = await Product.countDocuments();

  res.status(200).json({
    success: true,
    products,
    productsCount,
    resultPerPage,
    filteredProductsCount
  });
});


/*exports.getAllProducts = catchAsyncErrors(async (req, res, next) => {
  //const resultPerPage = 8;

  const productsCount = await Product.countDocuments();

  const apiFeature = new ApiFeatures(Product.find(), req.query)
    .search()
    .filter();

  let products = await apiFeature.query;
  let filteredProductsCount = products.length;

  apiFeature.pagination(resultPerPage);

  products = await apiFeature.query;

  console.log('Found products:', products);

  res.status(200).json({
    success: true,
    products,
    productsCount,
    resultPerPage,
    filteredProductsCount
  });
});*/

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

// create new review or update the review
exports.createProductReview = catchAsyncErrors(async (req, res, next) => {
  const { rating, comment, productId } = req.body;
  const review = {
    user: req.user.id,
    name: req.user.name,
    rating: Number(rating),
    comment
  };

  const product = await Product.findById(productId);

  const isReviewed = product.reviews.find(
    rev => rev.user.toString() === req.user._id
  );

  if (isReviewed) {
    product.reviews.forEach(rev => {
      if (rev.user.toString() === req.user._id.toString())
        (rev.rating = rating), (rev.comment = comment);
    });
  } else {
    product.reviews.push(review);
    product.numOfReviews = product.reviews.length;
  }

  let avg = 0;

  product.reviews.forEach(rev => {
    avg += rev.rating;
  });

  product.ratings = avg / product.reviews.length;

  await product.save({ validateBeforeSave: false });

  res.status(200).json({
    success: true
  });
});

// get all reviews of a product

exports.getProductReviews = catchAsyncErrors(async (req, res, next) => {
  const product = await Product.findById(req.query.id);

  if (!product) {
    return next(new ErrorHandler('Product not found', 404));
  }

  res.status(200).json({
    success: true,
    reviews: product.reviews,
    numOfReviews: product.reviews.length
  });
});

// delete reviews

exports.deleteReview = catchAsyncErrors(async (req, res, next) => {
  await console.log(Product); // returns Model { Product }
  const product = await Product.findById(req.query.productId);
  console.log(product); // returns null
  if (!product) {
    return next(new ErrorHandler('product not found', 404));
  }
  const reviews = product.reviews.filter(
    rev => rev._id.toString() !== req.query.id.toString()
  );

  let avg = 0;

  reviews.forEach(rev => {
    avg += rev.rating;
  });

  const ratings = avg / reviews.length;
  const numOfReviews = reviews.length;

  await Product.findByIdAndUpdate(
    req.query.productId,
    {
      reviews,
      ratings,
      numOfReviews
    },
    {
      new: true,
      runValidators: true,
      useFindAndModify: false
    }
  );

  res.status(200).json({
    success: true
  });
});
