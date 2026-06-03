const WISHLIST_KEY = 'shara_wishlist_items';
const CART_KEY = 'shara_cart_items';

export function getWishlistItems(fallbackItems = []) {
  return readItems(WISHLIST_KEY, fallbackItems);
}

export function saveWishlistItems(items) {
  writeItems(WISHLIST_KEY, items);
}

export function addWishlistItem(product) {
  const items = getWishlistItems();
  const item = createStoredItem(product);

  if (items.some((storedItem) => storedItem.id === item.id)) {
    return items;
  }

  const nextItems = [item, ...items];
  saveWishlistItems(nextItems);
  return nextItems;
}

export function getCartItems(fallbackItems = []) {
  return readItems(CART_KEY, fallbackItems);
}

export function saveCartItems(items) {
  writeItems(CART_KEY, items);
}

export function addCartItem(product, quantity = 1) {
  const item = createStoredItem(product);
  const items = getCartItems();
  const existingItem = items.find((storedItem) => storedItem.id === item.id);
  const nextItems = existingItem
    ? items.map((storedItem) =>
        storedItem.id === item.id
          ? { ...storedItem, quantity: storedItem.quantity + quantity }
          : storedItem,
      )
    : [{ ...item, quantity }, ...items];

  saveCartItems(nextItems);
  return nextItems;
}

export function createStoredItem(product) {
  const size = product.size || product.sizes?.[1] || product.sizes?.[0] || 'M';

  return {
    id: product.id || slugify(product.name),
    name: product.name,
    price: product.price,
    size,
    color: product.color || product.colour || product.colors?.[0] || 'Selected',
    stock: product.stock || 'In Stock',
    accent: product.accent || 'from-[#f6d7c7] via-[#fbf3ea] to-[#d99c7e]',
    figure: product.figure || '',
    quantity: Number(product.quantity || 1),
  };
}

export function parsePrice(value) {
  return Number(String(value || '').replace(/[^\d.]/g, '')) || 0;
}

export function formatLkr(value) {
  return `LKR ${Math.round(value).toLocaleString('en-US')}`;
}

function readItems(key, fallbackItems) {
  if (typeof window === 'undefined') {
    return fallbackItems;
  }

  try {
    const storedItems = JSON.parse(window.localStorage.getItem(key) || 'null');
    return Array.isArray(storedItems) ? storedItems : fallbackItems;
  } catch {
    return fallbackItems;
  }
}

function writeItems(key, items) {
  if (typeof window === 'undefined') {
    return;
  }

  window.localStorage.setItem(key, JSON.stringify(items));
}

function slugify(value) {
  return String(value || '').toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '');
}
