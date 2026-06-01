import dotenv from 'dotenv';
import mongoose from 'mongoose';
import { connectDatabase } from '../config/database.js';
import Category from '../models/Category.js';
import ContactMessage from '../models/ContactMessage.js';
import Customer from '../models/Customer.js';
import Order from '../models/Order.js';
import Product from '../models/Product.js';

dotenv.config();

const demoCategories = [
  {
    name: 'Maxi Dresses',
    slug: 'maxi-dresses',
    description: 'Flowing full-length dresses for elegant evenings and destination occasions.',
    sortOrder: 10,
  },
  {
    name: 'Midi Dresses',
    slug: 'midi-dresses',
    description: 'Polished midi silhouettes for brunch, office events, and celebrations.',
    sortOrder: 20,
  },
  {
    name: 'Mini Dresses',
    slug: 'mini-dresses',
    description: 'Short statement dresses for parties, dinners, and special nights out.',
    sortOrder: 30,
  },
  {
    name: 'Evening Dresses',
    slug: 'evening-dresses',
    description: 'Refined eveningwear with satin, lace, and soft draped details.',
    sortOrder: 40,
  },
  {
    name: 'Party Dresses',
    slug: 'party-dresses',
    description: 'Celebration-ready dresses with luxe textures and confident shapes.',
    sortOrder: 50,
  },
];

const demoProducts = [
  {
    name: 'Blush Drape Maxi Dress',
    slug: 'blush-drape-maxi-dress',
    sku: 'SHARA-DRESS-001',
    categorySlug: 'maxi-dresses',
    subcategory: 'Evening Dresses',
    price: 17900,
    stock: 18,
    colours: [{ name: 'Blush', hex: '#f1cbc8' }],
    tags: ['new', 'maxi', 'evening', 'wedding guest'],
    isFeatured: true,
    isNewArrival: true,
  },
  {
    name: 'Floral Chiffon Midi Dress',
    slug: 'floral-chiffon-midi-dress',
    sku: 'SHARA-DRESS-002',
    categorySlug: 'midi-dresses',
    subcategory: 'Occasion Dresses',
    price: 14500,
    stock: 24,
    colours: [{ name: 'Soft Floral', hex: '#f6d7c7' }],
    tags: ['bestseller', 'midi', 'floral', 'brunch'],
    isFeatured: true,
    isBestSeller: true,
  },
  {
    name: 'One Shoulder Satin Dress',
    slug: 'one-shoulder-satin-dress',
    sku: 'SHARA-DRESS-003',
    categorySlug: 'evening-dresses',
    subcategory: 'Satin Dresses',
    price: 16800,
    stock: 16,
    colours: [{ name: 'Midnight Navy', hex: '#172446' }],
    tags: ['new', 'satin', 'formal', 'party'],
    isNewArrival: true,
  },
  {
    name: 'Lace Overlay Mini Dress',
    slug: 'lace-overlay-mini-dress',
    sku: 'SHARA-DRESS-004',
    categorySlug: 'mini-dresses',
    subcategory: 'Lace Dresses',
    price: 12900,
    stock: 20,
    colours: [{ name: 'Ivory Lace', hex: '#f8eee1' }],
    tags: ['mini', 'lace', 'party'],
  },
  {
    name: 'Satin Cowl Neck Dress',
    slug: 'satin-cowl-neck-dress',
    sku: 'SHARA-DRESS-005',
    categorySlug: 'party-dresses',
    subcategory: 'Satin Dresses',
    price: 15900,
    stock: 22,
    colours: [{ name: 'Champagne', hex: '#f5ddc8' }],
    tags: ['new', 'party', 'satin'],
    isNewArrival: true,
  },
  {
    name: 'Pleated Midi Dress',
    slug: 'pleated-midi-dress',
    sku: 'SHARA-DRESS-006',
    categorySlug: 'midi-dresses',
    subcategory: 'Day Dresses',
    price: 13500,
    stock: 26,
    colours: [{ name: 'Sage', hex: '#9aa884' }],
    tags: ['midi', 'pleated', 'casual'],
  },
  {
    name: 'Wrap Front Maxi Dress',
    slug: 'wrap-front-maxi-dress',
    sku: 'SHARA-DRESS-007',
    categorySlug: 'maxi-dresses',
    subcategory: 'Occasion Dresses',
    price: 17200,
    stock: 14,
    colours: [{ name: 'Deep Rose', hex: '#9b1f2e' }],
    tags: ['bestseller', 'maxi', 'wedding guest'],
    isFeatured: true,
    isBestSeller: true,
  },
  {
    name: 'Puff Sleeve Midi Dress',
    slug: 'puff-sleeve-midi-dress',
    sku: 'SHARA-DRESS-008',
    categorySlug: 'midi-dresses',
    subcategory: 'Occasion Dresses',
    price: 13900,
    stock: 19,
    colours: [{ name: 'Peach Floral', hex: '#d99c7e' }],
    tags: ['midi', 'floral', 'occasion'],
  },
];

const placeholderImage = (slug) => ({
  url: `https://placehold.co/900x1200/f8eee8/7f1d2b?text=${encodeURIComponent(slug.replaceAll('-', ' '))}`,
  publicId: `demo/${slug}`,
  isCover: true,
});

async function upsertCategories() {
  const categoryMap = new Map();

  for (const category of demoCategories) {
    const savedCategory = await Category.findOneAndUpdate(
      { slug: category.slug },
      {
        ...category,
        isActive: true,
        image: {
          url: `https://placehold.co/900x700/f8eee8/7f1d2b?text=${encodeURIComponent(category.name)}`,
          publicId: `demo/category-${category.slug}`,
        },
      },
      { new: true, setDefaultsOnInsert: true, upsert: true },
    );

    categoryMap.set(category.slug, savedCategory);
  }

  return categoryMap;
}

async function upsertProducts(categoryMap) {
  const products = [];

  for (const product of demoProducts) {
    const category = categoryMap.get(product.categorySlug);

    if (!category) {
      throw new Error(`Missing category for ${product.name}`);
    }

    const savedProduct = await Product.findOneAndUpdate(
      { slug: product.slug },
      {
        name: product.name,
        slug: product.slug,
        sku: product.sku,
        category: category._id,
        subcategory: product.subcategory,
        brand: 'Shara Collection',
        tags: product.tags,
        description: `${product.name} from Shara Shopping, styled for a polished luxury fashion wardrobe with soft structure and occasion-ready detail.`,
        shortDescription: 'Luxury occasion dress from the Shara collection.',
        price: product.price,
        stock: product.stock,
        sizes: ['XS', 'S', 'M', 'L'],
        colours: product.colours,
        images: [placeholderImage(product.slug)],
        status: 'active',
        isFeatured: Boolean(product.isFeatured),
        isNewArrival: Boolean(product.isNewArrival),
        isBestSeller: Boolean(product.isBestSeller),
      },
      { new: true, setDefaultsOnInsert: true, upsert: true },
    );

    products.push(savedProduct);
  }

  return products;
}

async function upsertCustomer() {
  return Customer.findOneAndUpdate(
    { email: 'demo.customer@sharashopping.lk' },
    {
      fullName: 'Nethmi Perera',
      phone: '+94771234567',
      whatsapp: '+94771234567',
      email: 'demo.customer@sharashopping.lk',
      addresses: [
        {
          address: '42 Rose Lane',
          city: 'Colombo',
          district: 'Colombo',
        },
      ],
      orderCount: 1,
    },
    { new: true, setDefaultsOnInsert: true, upsert: true },
  );
}

async function upsertOrder(customer, products) {
  const [firstProduct, secondProduct] = products;
  const items = [
    {
      product: firstProduct._id,
      productName: firstProduct.name,
      sku: firstProduct.sku,
      size: 'M',
      colour: firstProduct.colours[0],
      quantity: 1,
      price: firstProduct.price,
    },
    {
      product: secondProduct._id,
      productName: secondProduct.name,
      sku: secondProduct.sku,
      size: 'S',
      colour: secondProduct.colours[0],
      quantity: 1,
      price: secondProduct.price,
    },
  ];

  return Order.findOneAndUpdate(
    { orderNumber: 'SHARA-DEMO-1001' },
    {
      orderNumber: 'SHARA-DEMO-1001',
      customer: {
        fullName: customer.fullName,
        phone: customer.phone,
        whatsapp: customer.whatsapp,
        email: customer.email,
      },
      customerRef: customer._id,
      delivery: {
        address: customer.addresses[0].address,
        city: customer.addresses[0].city,
        district: customer.addresses[0].district,
        note: 'Demo order for admin dashboard testing.',
      },
      items,
      totalAmount: items.reduce((total, item) => total + item.price * item.quantity, 0),
      contactMethod: 'whatsapp',
      paymentStatus: 'pending',
      orderStatus: 'confirmed',
      timeline: [
        {
          status: 'pending',
          note: 'Demo order placed.',
          date: new Date('2026-05-20T09:30:00.000Z'),
        },
        {
          status: 'confirmed',
          note: 'Demo order confirmed by admin.',
          date: new Date('2026-05-20T10:00:00.000Z'),
        },
      ],
      adminNotes: 'Seeded demo order.',
    },
    { new: true, setDefaultsOnInsert: true, upsert: true },
  );
}

async function upsertContactMessage() {
  return ContactMessage.findOneAndUpdate(
    {
      email: 'demo.customer@sharashopping.lk',
      subject: 'Styling appointment request',
    },
    {
      fullName: 'Nethmi Perera',
      email: 'demo.customer@sharashopping.lk',
      phone: '+94771234567',
      subject: 'Styling appointment request',
      message: 'I would like help choosing a dress for a wedding guest event.',
      status: 'new',
    },
    { new: true, setDefaultsOnInsert: true, upsert: true },
  );
}

async function seedDemoData() {
  await connectDatabase();

  const categoryMap = await upsertCategories();
  const products = await upsertProducts(categoryMap);
  const customer = await upsertCustomer();
  const order = await upsertOrder(customer, products);
  await upsertContactMessage();

  console.log(`Seeded ${categoryMap.size} categories`);
  console.log(`Seeded ${products.length} products`);
  console.log(`Seeded demo customer: ${customer.email}`);
  console.log(`Seeded demo order: ${order.orderNumber}`);
}

seedDemoData()
  .catch((error) => {
    console.error(error.message);
    process.exitCode = 1;
  })
  .finally(async () => {
    await mongoose.connection.close();
  });
