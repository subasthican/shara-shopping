import {
  ArrowLeft,
  Heart,
  MessageCircle,
  Minus,
  Plus,
  RefreshCw,
  RotateCcw,
  Send,
  ShieldCheck,
  ShoppingBag,
  Trash2,
  Truck,
  Headphones,
  Share2,
} from 'lucide-react';
import { useEffect, useMemo, useState } from 'react';
import Footer from '../components/Footer.jsx';
import Header from '../components/Header.jsx';
import { dressProducts } from '../data/shopData.js';
import {
  addCartItem,
  createStoredItem,
  formatLkr,
  getCartItems,
  getWishlistItems,
  parsePrice,
  saveCartItems,
  saveWishlistItems,
} from '../utils/shopStorage.js';

const defaultWishlistItems = [
  createStoredItem({ ...dressProducts[1], size: 'M', color: 'Peach', stock: 'In Stock' }),
  createStoredItem({ ...dressProducts[3], size: 'S', color: 'Mint Green', stock: 'In Stock', figure: 'figure-sage' }),
  createStoredItem({ ...dressProducts[2], size: 'M', color: 'Pink', stock: 'Low Stock', figure: 'figure-blush' }),
];

const defaultCartItems = defaultWishlistItems.slice(0, 2);

const trustItems = [
  { icon: Truck, title: 'Free Shipping', copy: 'On orders over LKR 15,000' },
  { icon: RotateCcw, title: 'Easy Returns', copy: 'Within 7 days' },
  { icon: ShieldCheck, title: 'Manual Confirmation', copy: 'Owner confirms every order' },
  { icon: Headphones, title: '24/7 Support', copy: "We're here to help" },
];

export default function WishlistCartPage() {
  const [wishlistItems, setWishlistItems] = useState(defaultWishlistItems);
  const [cartItems, setCartItems] = useState(defaultCartItems);

  useEffect(() => {
    const storedWishlistItems = getWishlistItems(defaultWishlistItems);
    const storedCartItems = getCartItems(defaultCartItems);

    setWishlistItems(storedWishlistItems);
    setCartItems(storedCartItems);
    saveWishlistItems(storedWishlistItems);
    saveCartItems(storedCartItems);
  }, []);

  function removeWishlistItem(itemId) {
    setWishlistItems((items) => {
      const nextItems = items.filter((item) => item.id !== itemId);
      saveWishlistItems(nextItems);
      return nextItems;
    });
  }

  function addWishlistItemToCart(item) {
    const nextItems = addCartItem(item);
    setCartItems(nextItems);
  }

  function addAllWishlistItemsToCart() {
    let nextItems = cartItems;

    wishlistItems.forEach((item) => {
      nextItems = addCartItem(item);
    });

    setCartItems(nextItems);
  }

  function removeCartItem(itemId) {
    setCartItems((items) => {
      const nextItems = items.filter((item) => item.id !== itemId);
      saveCartItems(nextItems);
      return nextItems;
    });
  }

  function updateCartQuantity(itemId, change) {
    setCartItems((items) => {
      const nextItems = items
        .map((item) => (
          item.id === itemId ? { ...item, quantity: Math.max(1, item.quantity + change) } : item
        ));

      saveCartItems(nextItems);
      return nextItems;
    });
  }

  return (
    <div className="min-h-screen bg-white text-ink">
      <Header />
      <main className="bg-[#fffaf7]">
        <WishlistSection
          items={wishlistItems}
          onAddAllToCart={addAllWishlistItemsToCart}
          onAddToCart={addWishlistItemToCart}
          onRemove={removeWishlistItem}
        />
        <CartSection
          items={cartItems}
          onQuantityChange={updateCartQuantity}
          onRemove={removeCartItem}
        />
        <TrustStrip />
      </main>
      <Footer />
    </div>
  );
}

function WishlistSection({ items, onAddAllToCart, onAddToCart, onRemove }) {
  return (
    <section className="px-4 py-8">
      <div className="mx-auto max-w-7xl">
        <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <h1 className="font-serif text-4xl">My Wishlist ({items.length})</h1>
            <p className="mt-2 text-neutral-700">Items you love, right at your fingertips.</p>
          </div>
          <button className="inline-flex items-center gap-2 text-sm font-semibold">
            <Share2 size={17} /> Share Wishlist
          </button>
        </div>
        <div className="mt-6 grid gap-7 lg:grid-cols-[1fr_340px]">
          <section className="rounded-lg border border-[#eadfd8] bg-white p-5 shadow-sm">
            <div className="hidden grid-cols-[1.7fr_0.55fr_0.65fr_0.78fr] border-b border-[#eadfd8] pb-4 text-sm font-bold md:grid">
              <span>Product</span>
              <span>Price</span>
              <span>Stock Status</span>
              <span className="text-right">Actions</span>
            </div>
            <div className="divide-y divide-[#eadfd8]">
              {items.length ? (
                items.map((item) => (
                  <WishlistRow item={item} key={item.id} onAddToCart={onAddToCart} onRemove={onRemove} />
                ))
              ) : (
                <EmptyState title="Your wishlist is empty" copy="Save dresses you love from the shop page." />
              )}
            </div>
            <ContinueButton />
          </section>
          <WishlistSummary count={items.length} onAddAllToCart={onAddAllToCart} />
        </div>
      </div>
    </section>
  );
}

function WishlistRow({ item, onAddToCart, onRemove }) {
  return (
    <div className="grid gap-4 py-4 md:grid-cols-[1.7fr_0.55fr_0.65fr_0.78fr] md:items-center">
      <ProductCell item={item} />
      <p className="font-semibold">{item.price}</p>
      <p className={`font-semibold ${item.stock === 'Low Stock' ? 'text-[#d96b00]' : 'text-[#12833c]'}`}>{item.stock}</p>
      <div className="flex gap-3 md:justify-end">
        <button className="btn-primary h-11 gap-2 px-5 text-xs" onClick={() => onAddToCart(item)}>
          <Send size={16} /> Add to Cart
        </button>
        <button className="grid h-11 w-11 place-items-center rounded border border-[#ded3c9] text-neutral-700" onClick={() => onRemove(item.id)} aria-label={`Remove ${item.name}`}>
          <Trash2 size={17} />
        </button>
      </div>
    </div>
  );
}

function WishlistSummary({ count, onAddAllToCart }) {
  return (
    <aside className="rounded-lg bg-gradient-to-br from-white to-[#fbefed] p-7 shadow-sm">
      <div className="flex gap-5">
        <span className="grid h-16 w-16 place-items-center rounded-full bg-blush text-rosewood">
          <Heart size={30} />
        </span>
        <div>
          <h2 className="font-serif text-2xl">Your Wishlist</h2>
          <p className="mt-2 text-sm text-neutral-700">{count} items</p>
        </div>
      </div>
      <div className="my-7 border-t border-[#e1d2cb]" />
      <p className="text-sm leading-6 text-neutral-700">Add items to cart to place the order.</p>
      <button className="btn-primary mt-6 w-full gap-2" onClick={onAddAllToCart} disabled={!count}>
        <Send size={17} /> Add All to Cart
      </button>
      <div className="mt-8 space-y-5">
        <TrustMini icon={ShieldCheck} title="Manual Confirmation" copy="No online payment required" />
        <TrustMini icon={Truck} title="Free Shipping" copy="On orders over LKR 15,000" />
        <TrustMini icon={RotateCcw} title="Easy Returns" copy="Hassle-free returns" />
      </div>
    </aside>
  );
}

function CartSection({ items, onQuantityChange, onRemove }) {
  const summary = useMemo(() => {
    const subtotal = items.reduce((sum, item) => sum + parsePrice(item.price) * item.quantity, 0);
    const discount = subtotal ? subtotal * 0.1 : 0;
    const shipping = subtotal >= 15000 || subtotal === 0 ? 0 : 250;
    const tax = (subtotal - discount + shipping) * 0.15;
    const total = subtotal - discount + shipping + tax;

    return { discount, shipping, subtotal, tax, total };
  }, [items]);

  return (
    <section className="px-4 pb-8 pt-3" id="cart">
      <div className="mx-auto max-w-7xl">
        <div>
          <h2 className="font-serif text-4xl">My Cart ({items.length})</h2>
          <p className="mt-2 text-neutral-700">Review your items before placing a manual order request.</p>
        </div>
        <div className="mt-6 grid gap-7 lg:grid-cols-[1fr_340px]">
          <section className="rounded-lg border border-[#eadfd8] bg-white p-5 shadow-sm">
            <div className="hidden grid-cols-[1.55fr_0.45fr_0.55fr_0.55fr_0.36fr] border-b border-[#eadfd8] pb-4 text-sm font-bold md:grid">
              <span>Product</span>
              <span>Price</span>
              <span>Quantity</span>
              <span>Subtotal</span>
              <span className="text-right">Actions</span>
            </div>
            <div className="divide-y divide-[#eadfd8]">
              {items.length ? (
                items.map((item) => (
                  <CartRow item={item} key={item.id} onQuantityChange={onQuantityChange} onRemove={onRemove} />
                ))
              ) : (
                <EmptyState title="Your cart is empty" copy="Add wishlist items to cart before placing an order request." />
              )}
            </div>
            <div className="mt-5 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
              <ContinueButton compact />
              <button className="inline-flex h-11 items-center justify-center gap-2 rounded border border-[#ded3c9] px-5 text-sm font-semibold">
                <RefreshCw size={17} /> Update Cart
              </button>
            </div>
          </section>
          <OrderSummary itemCount={items.length} summary={summary} />
        </div>
      </div>
    </section>
  );
}

function CartRow({ item, onQuantityChange, onRemove }) {
  const subtotal = parsePrice(item.price) * item.quantity;

  return (
    <div className="grid gap-4 py-4 md:grid-cols-[1.55fr_0.45fr_0.55fr_0.55fr_0.36fr] md:items-center">
      <ProductCell item={item} />
      <p className="font-semibold">{item.price}</p>
      <QuantityControl item={item} onQuantityChange={onQuantityChange} />
      <p className="font-semibold">{formatLkr(subtotal)}</p>
      <div className="flex md:justify-end">
        <button className="grid h-11 w-11 place-items-center rounded border border-[#ded3c9] text-rosewood" onClick={() => onRemove(item.id)} aria-label={`Remove ${item.name}`}>
          <Trash2 size={17} />
        </button>
      </div>
    </div>
  );
}

function ProductCell({ item }) {
  return (
    <div className="grid grid-cols-[82px_1fr] items-center gap-5">
      <span className={`relative h-24 overflow-hidden rounded bg-gradient-to-br ${item.accent}`}>
        <span className={`product-silhouette ${item.figure || ''} !h-[90%] !w-[42%]`} />
      </span>
      <div>
        <h3 className="font-bold">{item.name}</h3>
        <p className="mt-2 text-sm text-neutral-600">
          Size: {item.size} <span className="mx-2">|</span> Color: {item.color}
        </p>
      </div>
    </div>
  );
}

function QuantityControl({ item, onQuantityChange }) {
  return (
    <div className="inline-grid h-10 w-28 grid-cols-3 overflow-hidden rounded border border-[#d9d1cb] text-sm">
      <button className="grid place-items-center" onClick={() => onQuantityChange(item.id, -1)} aria-label="Decrease quantity">
        <Minus size={15} />
      </button>
      <span className="grid place-items-center font-bold">{item.quantity}</span>
      <button className="grid place-items-center" onClick={() => onQuantityChange(item.id, 1)} aria-label="Increase quantity">
        <Plus size={15} />
      </button>
    </div>
  );
}

function OrderSummary({ itemCount, summary }) {
  return (
    <aside className="rounded-lg border border-[#eadfd8] bg-white p-6 shadow-sm">
      <h2 className="text-xl font-bold">Order Summary</h2>
      <div className="mt-6 space-y-4 text-sm">
        <Line label={`Subtotal (${itemCount} items)`} value={formatLkr(summary.subtotal)} />
        <Line label="Discount (WELCOME10)" value={`- ${formatLkr(summary.discount)}`} danger />
        <Line label="Shipping Charge" value={summary.shipping ? formatLkr(summary.shipping) : 'Free'} />
        <Line label="Tax (15%)" value={formatLkr(summary.tax)} />
      </div>
      <div className="mt-5 flex justify-between border-t border-dashed border-[#d9ccc2] pt-5 text-xl font-extrabold">
        <span>Total Amount</span>
        <span>{formatLkr(summary.total)}</span>
      </div>
      <a className="btn-primary mt-6 w-full gap-2" href="/dresses">
        <Send size={17} /> Place Order Request
      </a>
      <a className="mt-3 inline-flex h-12 w-full items-center justify-center gap-2 rounded border border-[#ded3c9] bg-white text-sm font-bold text-rosewood" href="/contact">
        <MessageCircle size={17} /> Ask Before Ordering
      </a>
      <p className="mt-5 flex items-center justify-center gap-2 text-sm text-neutral-700">
        <ShieldCheck size={17} /> No online payment <span>We contact you to confirm</span>
      </p>
    </aside>
  );
}

function TrustStrip() {
  return (
    <section className="px-4 pb-8">
      <div className="mx-auto grid max-w-7xl gap-4 rounded-lg border border-[#eadfd8] bg-white px-6 py-6 sm:grid-cols-2 lg:grid-cols-4">
        {trustItems.map(({ icon: Icon, title, copy }) => (
          <div className="flex items-center gap-4 border-[#e3d3ca] lg:border-r lg:last:border-r-0" key={title}>
            <Icon className="text-rosewood" size={30} />
            <div>
              <h3 className="font-bold">{title}</h3>
              <p className="mt-1 text-sm text-neutral-700">{copy}</p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}

function TrustMini({ icon: Icon, title, copy }) {
  return (
    <div className="flex gap-4">
      <Icon className="mt-1 text-rosewood" size={24} />
      <div>
        <h3 className="text-sm font-bold">{title}</h3>
        <p className="mt-1 text-sm text-neutral-700">{copy}</p>
      </div>
    </div>
  );
}

function EmptyState({ title, copy }) {
  return (
    <div className="py-10 text-center">
      <p className="font-serif text-2xl text-[#6f4525]">{title}</p>
      <p className="mt-2 text-sm text-neutral-600">{copy}</p>
    </div>
  );
}

function ContinueButton({ compact = false }) {
  return (
    <a href="/dresses" className={`btn-outline gap-2 bg-white ${compact ? 'w-fit' : 'mt-5 w-fit'}`}>
      <ArrowLeft size={17} /> Continue Shopping
    </a>
  );
}

function Line({ label, value, danger = false }) {
  return (
    <div className="flex justify-between">
      <span>{label}</span>
      <span className={danger ? 'font-bold text-rosewood' : 'font-semibold'}>{value}</span>
    </div>
  );
}
