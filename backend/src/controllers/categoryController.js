import asyncHandler from 'express-async-handler';
import mongoose from 'mongoose';
import Category from '../models/Category.js';

const CATEGORY_STATUS_FILTERS = ['all', 'active', 'inactive'];

export const getCategories = asyncHandler(async (req, res) => {
  const search = String(req.query.search || '').trim();
  const status = String(req.query.status || 'all').trim().toLowerCase();
  const query = {};

  if (!CATEGORY_STATUS_FILTERS.includes(status)) {
    res.status(400);
    throw new Error('Category status filter is invalid.');
  }

  if (status !== 'all') {
    query.isActive = status === 'active';
  }

  if (search) {
    query.$or = [
      { name: { $regex: search, $options: 'i' } },
      { slug: { $regex: search, $options: 'i' } },
      { description: { $regex: search, $options: 'i' } },
    ];
  }

  const categories = await Category.find(query).sort({ sortOrder: 1, name: 1 });
  res.json(categories);
});

export const createCategory = asyncHandler(async (req, res) => {
  const categoryPayload = normalizeCategoryPayload(req.body);
  const errors = validateCategoryPayload(categoryPayload);

  if (errors.length) {
    res.status(400);
    throw new Error(errors.join(' '));
  }

  const category = await Category.create(categoryPayload);
  res.status(201).json(category);
});

export const updateCategory = asyncHandler(async (req, res) => {
  validateCategoryId(req.params.id, res);

  const categoryPayload = normalizeCategoryPayload(req.body, { partial: true });
  const errors = validateCategoryPayload(categoryPayload, { partial: true });

  if (errors.length) {
    res.status(400);
    throw new Error(errors.join(' '));
  }

  const category = await Category.findByIdAndUpdate(req.params.id, categoryPayload, { new: true, runValidators: true });

  if (!category) {
    res.status(404);
    throw new Error('Category not found');
  }

  res.json(category);
});

export const deleteCategory = asyncHandler(async (req, res) => {
  validateCategoryId(req.params.id, res);

  const category = await Category.findByIdAndDelete(req.params.id);

  if (!category) {
    res.status(404);
    throw new Error('Category not found');
  }

  res.json({ message: 'Category deleted' });
});

function normalizeCategoryPayload(payload = {}, { partial = false } = {}) {
  const categoryPayload = {};

  if (!partial || payload.name !== undefined) {
    categoryPayload.name = String(payload.name || '').trim();
  }

  if (!partial || payload.slug !== undefined || payload.name !== undefined) {
    categoryPayload.slug = String(payload.slug || payload.name || '').trim().toLowerCase();
  }

  if (!partial || payload.description !== undefined) {
    categoryPayload.description = String(payload.description || '').trim();
  }

  if (!partial || payload.image !== undefined || payload.imageUrl !== undefined) {
    categoryPayload.image = normalizeImage(payload.image, payload.imageUrl);
  }

  if (!partial || payload.isActive !== undefined) {
    categoryPayload.isActive = Boolean(payload.isActive);
  }

  if (!partial || payload.sortOrder !== undefined) {
    categoryPayload.sortOrder = Number(payload.sortOrder || 0);
  }

  return categoryPayload;
}

function normalizeImage(image = {}, imageUrl = '') {
  if (typeof image === 'string') {
    return { url: image.trim() };
  }

  return {
    url: String(image?.url || imageUrl || '').trim(),
    publicId: String(image?.publicId || '').trim(),
  };
}

function validateCategoryPayload(payload, { partial = false } = {}) {
  const errors = [];

  if ((!partial || payload.name !== undefined) && payload.name.length < 2) {
    errors.push('Category name must be at least 2 characters.');
  }

  if ((!partial || payload.slug !== undefined) && !/^[a-z0-9]+(?:-[a-z0-9]+)*$/.test(payload.slug)) {
    errors.push('Category slug must use lowercase letters, numbers, and hyphens.');
  }

  if ((!partial || payload.sortOrder !== undefined) && !Number.isFinite(payload.sortOrder)) {
    errors.push('Category sort order must be a number.');
  }

  return errors;
}

function validateCategoryId(id, res) {
  if (!mongoose.isValidObjectId(id)) {
    res.status(400);
    throw new Error('A valid category ID is required.');
  }
}
