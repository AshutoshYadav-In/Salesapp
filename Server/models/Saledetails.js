
const mongoose = require('mongoose');

const saleSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'UserDetails',
    required: true,
  },
  productName: {
    type: String,
    required: true,
  },
  productQuantity: {
    type: Number,
    required: true,
  },
  productAmount: {
    type: Number,
    required: true,
  },
  saleNumber: {
    type: Number,
    required: true,
  },
},{timestamps:true});

const SaleDetails = mongoose.model('SaleDetails', saleSchema);

module.exports = SaleDetails;
