import {
  ArrowLeft,
  Heart,
  LockKeyhole,
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
import Footer from '../components/Footer.jsx';
import Header from '../components/Header.jsx';
import { dressProducts } from '../data/shopData.js';

const wishlistItems = [
  { ...dressProducts[1], price: 'LKR 5,625', size: 'M', color: 'Peach', stock: 'In Stock' },
  { ...dressProducts[3], price: 'LKR 5,250', size: 'S', color: 'Mint Green', stock: 'In Stock', figure: 'figure-sage' },
  { ...dressProducts[2], price: 'LKR 5,475', size: 'M', color: 'Pink', stock: 'Low Stock', figure: 'figure-blush' },
];

const cartItems = wishlistItems.slice(0, 2);

const trustItems = [
  { icon: Truck, title: 'Free Shipping', copy: 'On orders over LKR 15,000' },
  { icon: RotateCcw, title: 'Easy Returns', copy: 'Within 7 days' },
  { icon: ShieldCheck, title: 'Secure Payment', copy: '100% secure checkout' },
  { icon: Headphones, title: '24/7 Support', copy: "We're here to help" },
];

export default function WishlistCartPage() {
  return (
    <div className="min-h-screen bg-white text-ink">
      <Header />
      <main className="bg-[#fffaf7]">
        <WishlistSection />
        <CartSection />
        <TrustStrip />
      </main>
      <Footer />
    </div>
  );
}

function WishlistSection() {
  return (
    <section className="px-4 py-8">
      <div className="mx-auto max-w-7xl">
        <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <h1 className="font-serif text-4xl">My Wishlist (3)</h1>
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
              {wishlistItems.map((item) => (
                <WishlistRow item={item} key={item.name} />
              ))}
            </div>
            <ContinueButton />
          </section>
          <WishlistSummary />
        </div>
      </div>
    </section>
  );
}

function WishlistRow({ item }) {
  return (
    <div className="grid gap-4 py-4 md:grid-cols-[1.7fr_0.55fr_0.65fr_0.78fr] md:items-center">
      <ProductCell item={item} />
      <p className="font-semibold">{item.price}</p>
      <p className={`font-semibold ${item.stock === 'Low Stock' ? 'text-[#d96b00]' : 'text-[#12833c]'}`}>{item.stock}</p>
      <div className="flex gap-3 md:justify-end">
        <button className="btn-primary h-11 gap-2 px-5 text-xs">
          <Send size={16} /> Add to Cart
        </button>
        <button className="grid h-11 w-11 place-items-center rounded border border-[#ded3c9] text-neutral-700" aria-label={`Remove ${item.name}`}>
          <Trash2 size={17} />
        </button>
      </div>
    </div>
  );
}

function WishlistSummary() {
  return (
    <aside className="rounded-lg bg-gradient-to-br from-white to-[#fbefed] p-7 shadow-sm">
      <div className="flex gap-5">
        <span className="grid h-16 w-16 place-items-center rounded-full bg-blush text-rosewood">
          <Heart size={30} />
        </span>
        <div>
          <h2 className="font-serif text-2xl">Your Wishlist</h2>
          <p className="mt-2 text-sm text-neutral-700">3 items</p>
        </div>
      </div>
      <div className="my-7 border-t border-[#e1d2cb]" />
      <p className="text-sm leading-6 text-neutral-700">Add items to cart to place the order.</p>
      <button className="btn-primary mt-6 w-full gap-2">
        <Send size={17} /> Add All to Cart
      </button>
      <div className="mt-8 space-y-5">
        <TrustMini icon={ShieldCheck} title="Secure Checkout" copy="100% secure payment" />
        <TrustMini icon={Truck} title="Free Shipping" copy="On orders over LKR 15,000" />
        <TrustMini icon={RotateCcw} title="Easy Returns" copy="Hassle-free returns" />
      </div>
    </aside>
  );
}

function CartSection() {
  return (
    <section className="px-4 pb-8 pt-3" id="cart">
      <div className="mx-auto max-w-7xl">
        <div>
          <h2 className="font-serif text-4xl">My Cart (2)</h2>
          <p className="mt-2 text-neutral-700">Review your items and proceed to checkout.</p>
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
              {cartItems.map((item) => (
                <CartRow item={item} key={item.name} />
              ))}
            </div>
            <div className="mt-5 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
              <ContinueButton compact />
              <button className="inline-flex h-11 items-center justify-center gap-2 rounded border border-[#ded3c9] px-5 text-sm font-semibold">
                <RefreshCw size={17} /> Update Cart
              </button>
            </div>
          </section>
          <OrderSummary />
        </div>
      </div>
    </section>
  );
}

function CartRow({ item }) {
  return (
    <div className="grid gap-4 py-4 md:grid-cols-[1.55fr_0.45fr_0.55fr_0.55fr_0.36fr] md:items-center">
      <ProductCell item={item} />
      <p className="font-semibold">{item.price}</p>
      <QuantityControl />
      <p className="font-semibold">{item.price}</p>
      <div className="flex md:justify-end">
        <button className="grid h-11 w-11 place-items-center rounded border border-[#ded3c9] text-rosewood" aria-label={`Remove ${item.name}`}>
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

function QuantityControl() {
  return (
    <div className="inline-grid h-10 w-28 grid-cols-3 overflow-hidden rounded border border-[#d9d1cb] text-sm">
      <button className="grid place-items-center" aria-label="Decrease quantity">
        <Minus size={15} />
      </button>
      <span className="grid place-items-center font-bold">1</span>
      <button className="grid place-items-center" aria-label="Increase quantity">
        <Plus size={15} />
      </button>
    </div>
  );
}

function OrderSummary() {
  return (
    <aside className="rounded-lg border border-[#eadfd8] bg-white p-6 shadow-sm">
      <h2 className="text-xl font-bold">Order Summary</h2>
      <div className="mt-6 space-y-4 text-sm">
        <Line label="Subtotal (2 items)" value="LKR 10,875" />
        <Line label="Discount (WELCOME10)" value="- LKR 1,088" danger />
        <Line label="Shipping Charge" value="LKR 250" />
        <Line label="Tax (15%)" value="LKR 1,514" />
      </div>
      <div className="mt-5 flex justify-between border-t border-dashed border-[#d9ccc2] pt-5 text-xl font-extrabold">
        <span>Total Amount</span>
        <span>LKR 11,551</span>
      </div>
      <button className="btn-primary mt-6 w-full gap-2">
        <LockKeyhole size={17} /> Proceed to Checkout
      </button>
      <button className="mt-3 h-12 w-full rounded bg-[#ffc233] text-sm font-bold text-[#17315b]">
        Pay with PayPal
      </button>
      <p className="mt-5 flex items-center justify-center gap-2 text-sm text-neutral-700">
        <ShieldCheck size={17} /> Secure Checkout <span>100% secure payment</span>
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
