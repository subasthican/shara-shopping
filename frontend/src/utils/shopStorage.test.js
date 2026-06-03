import assert from 'node:assert/strict';
import { beforeEach, describe, it } from 'node:test';
import {
  addCartItem,
  addWishlistItem,
  formatLkr,
  getCartItems,
  getWishlistItems,
  parsePrice,
} from './shopStorage.js';

const product = {
  name: 'Blush Drape Maxi Dress',
  price: 'LKR 17,900',
  sizes: ['S', 'M'],
  accent: 'from-[#f1cbc8] via-[#f8eee8] to-[#d39b99]',
};

describe('shopStorage', () => {
  beforeEach(() => {
    global.window = {
      localStorage: createLocalStorage(),
    };
  });

  it('adds wishlist items without duplicates', () => {
    addWishlistItem(product);
    addWishlistItem(product);

    const items = getWishlistItems();

    assert.equal(items.length, 1);
    assert.equal(items[0].name, product.name);
  });

  it('adds cart quantities for existing items', () => {
    addCartItem(product, 1);
    addCartItem(product, 2);

    const items = getCartItems();

    assert.equal(items.length, 1);
    assert.equal(items[0].quantity, 3);
  });

  it('parses and formats LKR prices', () => {
    assert.equal(parsePrice('LKR 17,900'), 17900);
    assert.equal(formatLkr(17900), 'LKR 17,900');
  });
});

function createLocalStorage() {
  const store = new Map();

  return {
    getItem(key) {
      return store.has(key) ? store.get(key) : null;
    },
    setItem(key, value) {
      store.set(key, String(value));
    },
    removeItem(key) {
      store.delete(key);
    },
  };
}
