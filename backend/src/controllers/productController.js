import asyncHandler from 'express-async-handler';
import mongoose from 'mongoose';
import Category from '../models/Category.js';
import Product from '../models/Product.js';

const PRODUCT_STATUS_FILTERS = ['all', 'active', 'draft', 'inactive'];

export const getProducts = asyncHandler(async (req, res) => {
  const category = String(req.query.category || '').trim();
  const search = String(req.query.search || '').trim();
  const status = String(req.query.status || 'active').trim().toLowerCase();
  const query = {};

  if (!PRODUCT_STATUS_FILTERS.includes(status)) {
    res.status(400);
    throw new Error('Product status filter is invalid.');
  }

  if (category.length > 80) {
    res.status(400);
    throw new Error('Product category filter must be 80 characters or fewer.');
  }

  if (search.length > 80) {
    res.status(400);
    throw new Error('Product search filter must be 80 characters or fewer.');
  }

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
  const productPayload = normalizeProductPayload(req.body);
  const errors = validateProductPayload(productPayload);

  if (errors.length) {
    res.status(400);
    throw new Error(errors.join(' '));
  }

  const product = await Product.create(productPayload);
  res.status(201).json(product);
});

export const updateProduct = asyncHandler(async (req, res) => {
  validateProductId(req.params.id, res);

  const productPayload = normalizeProductPayload(req.body, { partial: true });
  const errors = validateProductPayload(productPayload, { partial: true });

  if (errors.length) {
    res.status(400);
    throw new Error(errors.join(' '));
  }

  const product = await Product.findByIdAndUpdate(req.params.id, productPayload, { new: true, runValidators: true });

  if (!product) {
    res.status(404);
    throw new Error('Product not found');
  }

  res.json(product);
});

export const deleteProduct = asyncHandler(async (req, res) => {
  validateProductId(req.params.id, res);

  const product = await Product.findByIdAndDelete(req.params.id);

  if (!product) {
    res.status(404);
    throw new Error('Product not found');
  }

  res.json({ message: 'Product deleted' });
});

function normalizeProductPayload(payload = {}, { partial = false } = {}) {
  const productPayload = {};

  if (!partial || payload.name !== undefined) {
    productPayload.name = String(payload.name || '').trim();
  }

  if (!partial || payload.slug !== undefined || payload.name !== undefined) {
    productPayload.slug = String(payload.slug || payload.name || '').trim().toLowerCase();
  }

  if (!partial || payload.sku !== undefined) {
    productPayload.sku = String(payload.sku || '').trim().toUpperCase();
  }

  if (!partial || payload.category !== undefined) {
    productPayload.category = payload.category;
  }

  if (!partial || payload.subcategory !== undefined) {
    productPayload.subcategory = String(payload.subcategory || '').trim();
  }

  if (!partial || payload.brand !== undefined) {
    productPayload.brand = String(payload.brand || 'Shara Collection').trim();
  }

  if (!partial || payload.tags !== undefined) {
    productPayload.tags = normalizeTags(payload.tags);
  }

  if (!partial || payload.description !== undefined) {
    productPayload.description = String(payload.description || '').trim();
  }

  if (!partial || payload.shortDescription !== undefined) {
    productPayload.shortDescription = String(payload.shortDescription || '').trim();
  }

  if (!partial || payload.price !== undefined) {
    productPayload.price = Number(payload.price || 0);
  }

  if (!partial || payload.salePrice !== undefined) {
    productPayload.salePrice = payload.salePrice === '' || payload.salePrice === null ? undefined : Number(payload.salePrice);
  }

  if (!partial || payload.stock !== undefined) {
    productPayload.stock = Number(payload.stock || 0);
  }

  if (!partial || payload.sizes !== undefined) {
    productPayload.sizes = Array.isArray(payload.sizes) ? payload.sizes.map((size) => String(size).trim()) : [];
  }

  if (!partial || payload.colours !== undefined) {
    productPayload.colours = Array.isArray(payload.colours)
      ? payload.colours.map((colour) => ({
          name: String(colour.name || '').trim(),
          hex: String(colour.hex || '').trim(),
        }))
      : [];
  }

  if (!partial || payload.images !== undefined || payload.imageUrl !== undefined) {
    productPayload.images = normalizeImages(payload.images, payload.imageUrl);
  }

  if (!partial || payload.status !== undefined) {
    productPayload.status = String(payload.status || 'draft').trim().toLowerCase();
  }

  ['isFeatured', 'isNewArrival', 'isBestSeller'].forEach((field) => {
    if (!partial || payload[field] !== undefined) {
      productPayload[field] = Boolean(payload[field]);
    }
  });

  return productPayload;
}

function normalizeTags(tags) {
  if (Array.isArray(tags)) {
    return tags.map((tag) => String(tag).trim()).filter(Boolean);
  }

  return String(tags || '')
    .split(',')
    .map((tag) => tag.trim())
    .filter(Boolean);
}

function normalizeImages(images = [], imageUrl = '') {
  if (typeof imageUrl === 'string' && imageUrl.trim() && !images?.length) {
    return [{ url: imageUrl.trim(), isCover: true }];
  }

  return Array.isArray(images)
    ? images
        .map((image, index) => ({
          url: String(image.url || '').trim(),
          publicId: String(image.publicId || '').trim(),
          isCover: Boolean(image.isCover || index === 0),
        }))
        .filter((image) => image.url)
    : [];
}

function validateProductPayload(payload, { partial = false } = {}) {
  const errors = [];

  if ((!partial || payload.name !== undefined) && payload.name.length < 2) {
    errors.push('Product name must be at least 2 characters.');
  }

  if ((!partial || payload.slug !== undefined) && !/^[a-z0-9]+(?:-[a-z0-9]+)*$/.test(payload.slug)) {
    errors.push('Product slug must use lowercase letters, numbers, and hyphens.');
  }

  if ((!partial || payload.sku !== undefined) && payload.sku.length < 3) {
    errors.push('Product SKU must be at least 3 characters.');
  }

  if ((!partial || payload.category !== undefined) && !mongoose.isValidObjectId(payload.category)) {
    errors.push('A valid product category is required.');
  }

  if ((!partial || payload.description !== undefined) && payload.description.length < 10) {
    errors.push('Product description must be at least 10 characters.');
  }

  if ((!partial || payload.price !== undefined) && (!Number.isFinite(payload.price) || payload.price < 0)) {
    errors.push('Product price must be a valid non-negative number.');
  }

  if ((!partial || payload.salePrice !== undefined) && payload.salePrice !== undefined && (!Number.isFinite(payload.salePrice) || payload.salePrice < 0)) {
    errors.push('Product sale price must be a valid non-negative number.');
  }

  if ((!partial || payload.stock !== undefined) && (!Number.isFinite(payload.stock) || payload.stock < 0)) {
    errors.push('Product stock must be a valid non-negative number.');
  }

  if ((!partial || payload.status !== undefined) && !['active', 'draft', 'inactive'].includes(payload.status)) {
    errors.push('Product status is invalid.');
  }

  return errors;
}

function validateProductId(id, res) {
  if (!mongoose.isValidObjectId(id)) {
    res.status(400);
    throw new Error('A valid product ID is required.');
  }
}
