import asyncHandler from 'express-async-handler';
import mongoose from 'mongoose';
import Category from '../models/Category.js';
import Product from '../models/Product.js';

export const getProducts = asyncHandler(async (req, res) => {
  const { search, category, status = 'active' } = req.query;
  const query = {};

  if (status !== 'all') query.status = status;
  if (category) {
    const categoryDocument = await Category.findOne({ slug: category }).select('_id');
    if (categoryDocument) {
      query.category = categoryDocument._id;
    } else if (mongoose.isValidObjectId(category)) {
      query.category = category;
    } else {
      return res.json([]);
    }
  }
  if (search) query.$text = { $search: search };

  const products = await Product.find(query).populate('category', 'name slug').sort({ createdAt: -1 });
  res.json(products);
});

export const getProductById = asyncHandler(async (req, res) => {
  const lookup = mongoose.isValidObjectId(req.params.id)
    ? { _id: req.params.id }
    : { slug: req.params.id };
  const product = await Product.findOne(lookup).populate('category', 'name slug');

  if (!product) {
    res.status(404);
    throw new Error('Product not found');
  }

  res.json(product);
});

export const createProduct = asyncHandler(async (req, res) => {
  const product = await Product.create(req.body);
  res.status(201).json(product);
});

export const updateProduct = asyncHandler(async (req, res) => {
  const product = await Product.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators: true });

  if (!product) {
    res.status(404);
    throw new Error('Product not found');
  }

  res.json(product);
});

export const deleteProduct = asyncHandler(async (req, res) => {
  const product = await Product.findByIdAndDelete(req.params.id);

  if (!product) {
    res.status(404);
    throw new Error('Product not found');
  }

  res.json({ message: 'Product deleted' });
});
