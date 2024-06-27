const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'Please Name your Product'],
    trim: true
  },
  description: {
    type: String,
    required: [true, 'Please Describe your Product']
  },
  price: {
    type: Number,
    required: [true, 'Please set price for the product'],
    maxlength: [8, 'Price cannot exceed 8 characters']
  },
  rating: {
    type: Number,
    default: 0
  },
  images: [
    {
      public_id: { type: String, required: true },
      url: { type: String, required: true }
    }
  ],
  category: {
    type: String,
    required: [true, 'Set Product Category']
  },
  Stock: {
    type: Number,
    required: [true, 'Please Enter Product Stock'],
    maxlength: [4, 'Stock cannot exceed 4 characters'],
    default: 1
  },
  numOfReview: {
    type: Number,
    default: 0
  },
  reviews: [
    {
      name: {
        type: String,
        required: true
      },
      rating: {
        type: Number,
        required: true
      },
      comment: {
        type: String,
        required: true
      }
    }
  ],
  user:{
    type: mongoose.Schema.ObjectId,
    ref: "User",
    required: true
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
});

module.exports = mongoose.model('Product', productSchema);
