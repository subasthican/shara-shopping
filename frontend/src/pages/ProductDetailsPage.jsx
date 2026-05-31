import {
  ChevronDown,
  ChevronRight,
  Heart,
  Link as LinkIcon,
  MessageCircle,
  Ruler,
  ShieldCheck,
  ShoppingBag,
  Star,
  Truck,
  UserRoundCheck,
} from 'lucide-react';
import { useMemo, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import BuyNowModal from '../components/BuyNowModal.jsx';
import Footer from '../components/Footer.jsx';
import Header from '../components/Header.jsx';
import ProductCard from '../components/ProductCard.jsx';
import { dressProducts } from '../data/shopData.js';

const productCopy = {
  description:
    'Effortlessly elegant and endlessly flattering. The Blush Drape Maxi Dress features a soft, fluid silhouette with a gathered waist and drape detailing that enhances your natural shape. Perfect for weddings, evenings, and every special moment in between.',
  details: [
    'Made from a premium satin-blend fabric that drapes beautifully and feels smooth against the skin.',
    'Wrap-style bodice with delicate pleats for a graceful, sculpted finish.',
    'Gathered waist with side drape detailing for a flattering fit.',
    'Thigh-high slit and concealed back zipper.',
    'Lined for comfort.',
  ],
};

const tabItems = ['Description', 'Size Guide', 'Delivery & Returns'];

function slugify(value) {
  return value.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '');
}

export default function ProductDetailsPage() {
  const { productId } = useParams();
  const product = useMemo(
    () => dressProducts.find((item) => slugify(item.name) === productId) || dressProducts[0],
    [productId],
  );
  const [selectedSize, setSelectedSize] = useState('S');
  const [selectedTab, setSelectedTab] = useState('Description');
  const [isOrderOpen, setIsOrderOpen] = useState(false);
  const recommendations = dressProducts.filter((item) => item.name !== product.name).slice(0, 4);

  return (
    <div className="min-h-screen bg-white text-ink">
      <Header />
      <main className="bg-[#fffaf7]">
        <section className="px-4 py-6">
          <div className="mx-auto max-w-7xl">
            <Breadcrumb productName={product.name} />
            <div className="mt-6 grid gap-8 lg:grid-cols-[minmax(0,1.12fr)_minmax(390px,0.88fr)]">
              <ProductGallery product={product} />
              <ProductInfo
                product={product}
                selectedSize={selectedSize}
                setSelectedSize={setSelectedSize}
                onBuyNow={() => setIsOrderOpen(true)}
              />
            </div>
          </div>
        </section>

        <section className="px-4 pb-10">
          <div className="mx-auto grid max-w-7xl gap-7 lg:grid-cols-[minmax(0,1fr)_330px]">
            <ProductTabs selectedTab={selectedTab} setSelectedTab={setSelectedTab} />
            <CarePanel />
          </div>
        </section>

        <section className="bg-white px-4 py-10">
          <div className="mx-auto max-w-7xl">
            <div className="flex items-end justify-between gap-4">
              <div>
                <h2 className="font-serif text-4xl">You May Also Like</h2>
                <div className="title-mark" />
              </div>
              <Link to="/dresses" className="hidden text-sm font-bold uppercase tracking-[0.16em] text-rosewood sm:inline">
                View All Dresses
              </Link>
            </div>
            <div className="mt-7 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
              {recommendations.map((item, index) => (
                <ProductCard product={item} selectedSize={index % 2 === 0 ? 'XS' : 'M'} key={item.name} />
              ))}
            </div>
          </div>
        </section>

        <OrderSteps />
      </main>
      <Footer />
      {isOrderOpen && <BuyNowModal product={product} selectedSize={selectedSize} onClose={() => setIsOrderOpen(false)} />}
    </div>
  );
}

function Breadcrumb({ productName }) {
  const crumbClass = 'hover:text-rosewood';

  return (
    <nav className="flex flex-wrap items-center gap-3 text-sm text-neutral-600" aria-label="Breadcrumb">
      <Link to="/" className={crumbClass}>
        Home
      </Link>
      <ChevronRight size={14} />
      <Link to="/dresses" className={crumbClass}>
        Dresses
      </Link>
      <ChevronRight size={14} />
      <Link to="/dresses" className={crumbClass}>
        Maxi Dresses
      </Link>
      <ChevronRight size={14} />
      <span className="font-medium text-ink">{productName}</span>
    </nav>
  );
}

function ProductGallery({ product }) {
  const galleryViews = ['Front view', 'Back view', 'Bodice detail', 'Full silhouette'];

  return (
    <div className="grid gap-4 md:grid-cols-[118px_1fr]">
      <div className="order-2 grid grid-cols-4 gap-3 md:order-1 md:grid-cols-1">
        {galleryViews.map((label, index) => (
          <button
            className={`relative flex aspect-[4/5.55] items-end justify-center overflow-hidden rounded border bg-gradient-to-br ${product.accent} ${
              index === 0 ? 'border-rosewood' : 'border-[#e1d6cd]'
            }`}
            key={label}
            aria-label={label}
          >
            <span className={`product-silhouette ${product.figure || ''} !bottom-[-5px] !h-[84%] !w-[36%]`} />
          </button>
        ))}
        <button className="hidden h-8 place-items-center rounded text-ink md:grid" aria-label="More product images">
          <ChevronDown size={18} />
        </button>
      </div>

      <div className={`relative order-1 flex min-h-[520px] items-end justify-center overflow-hidden rounded border border-[#eadfd8] bg-gradient-to-br ${product.accent} md:order-2`}>
        <button className="absolute left-5 top-1/2 grid h-9 w-9 -translate-y-1/2 place-items-center rounded-full bg-white/75 text-ink shadow-sm" aria-label="Previous image">
          <ChevronRight size={18} className="rotate-180" />
        </button>
        <span className={`product-silhouette ${product.figure || ''} !bottom-[-18px] !h-[86%] !w-[30%]`} />
        <button className="absolute right-5 top-1/2 grid h-9 w-9 -translate-y-1/2 place-items-center rounded-full bg-white/75 text-ink shadow-sm" aria-label="Next image">
          <ChevronRight size={18} />
        </button>
      </div>
    </div>
  );
}

function ProductInfo({ product, selectedSize, setSelectedSize, onBuyNow }) {
  return (
    <section className="bg-[#fffaf7]">
      <h1 className="font-serif text-5xl leading-tight">{product.name}</h1>
      <div className="mt-3 flex flex-wrap items-center gap-3 text-sm">
        <span className="flex items-center gap-1 text-gold">
          {Array.from({ length: 5 }).map((_, index) => (
            <Star size={15} fill="currentColor" key={index} />
          ))}
        </span>
        <span className="font-semibold">4.8</span>
        <span className="h-4 w-px bg-[#d6cbc1]" />
        <span className="font-semibold">68 Reviews</span>
      </div>
      <p className="mt-5 text-2xl font-extrabold">{product.price}</p>
      <p className="mt-4 max-w-xl text-sm leading-6 text-neutral-700">{productCopy.description}</p>
      <div className="my-7 border-t border-[#eadfd8]" />

      <div>
        <div className="flex items-center justify-between gap-4">
          <p className="text-xs font-extrabold uppercase tracking-[0.18em]">Size</p>
          <button className="inline-flex items-center gap-2 text-xs font-semibold">
            Size Guide <Ruler size={15} />
          </button>
        </div>
        <div className="mt-4 flex flex-wrap gap-3">
          {product.sizes.map((size) => (
            <button
              className={`grid h-11 w-12 place-items-center rounded border text-sm font-semibold ${
                selectedSize === size ? 'border-ink bg-ink text-white' : 'border-[#d8cec4] bg-white'
              }`}
              onClick={() => setSelectedSize(size)}
              key={size}
            >
              {size}
            </button>
          ))}
        </div>
      </div>

      <div className="mt-8 space-y-3">
        <button className="btn-primary w-full gap-2" onClick={onBuyNow}>
          <ShoppingBag size={18} /> Buy Now
        </button>
        <button className="btn-outline w-full gap-2 bg-white">
          <Heart size={18} /> Add to Wishlist
        </button>
      </div>

      <div className="mt-5 divide-y divide-[#eadfd8] rounded border border-[#eadfd8] bg-white">
        <InfoRow icon={Truck} title="Estimated Delivery" copy="2 - 3 working days" />
        <InfoRow icon={MessageCircle} title="Need Help? WhatsApp Us" copy="Mon - Sun: 9AM - 9PM" />
        <InfoRow icon={ShieldCheck} title="Easy Returns & Exchanges" copy="7 days return policy" />
      </div>
    </section>
  );
}

function InfoRow({ icon: Icon, title, copy }) {
  return (
    <div className="grid grid-cols-[38px_1fr_24px] items-center gap-3 px-4 py-4">
      <span className="grid h-9 w-9 place-items-center rounded-full bg-blush text-rosewood">
        <Icon size={18} />
      </span>
      <span>
        <span className="block text-sm font-bold">{title}</span>
        <span className="mt-1 block text-sm text-neutral-600">{copy}</span>
      </span>
      <ChevronRight size={17} />
    </div>
  );
}

function ProductTabs({ selectedTab, setSelectedTab }) {
  return (
    <section className="grid rounded border border-[#ded3c9] bg-white md:grid-cols-[170px_1fr]">
      <div className="grid grid-cols-3 border-b border-[#ded3c9] md:grid-cols-1 md:border-b-0 md:border-r">
        {tabItems.map((tab) => (
          <button
            className={`min-h-16 px-3 text-center text-[11px] font-extrabold uppercase tracking-[0.14em] ${
              selectedTab === tab ? 'border-b-2 border-rosewood text-rosewood md:border-b-0 md:border-l-2' : 'text-neutral-600'
            }`}
            onClick={() => setSelectedTab(tab)}
            key={tab}
          >
            {tab}
          </button>
        ))}
      </div>
      <div className="p-6">
        {selectedTab === 'Description' && (
          <div className="max-w-2xl text-sm leading-6 text-neutral-700">
            <p>{productCopy.description}</p>
            <ul className="mt-4 list-disc space-y-1 pl-5">
              {productCopy.details.map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ul>
          </div>
        )}
        {selectedTab === 'Size Guide' && (
          <div className="grid gap-3 text-sm sm:grid-cols-4">
            {['XS: 30-32 in', 'S: 32-34 in', 'M: 34-36 in', 'L: 36-38 in'].map((size) => (
              <span className="rounded border border-[#eadfd8] bg-[#fffaf7] px-4 py-3 font-semibold" key={size}>
                {size}
              </span>
            ))}
          </div>
        )}
        {selectedTab === 'Delivery & Returns' && (
          <div className="grid gap-4 text-sm text-neutral-700 sm:grid-cols-2">
            <p>Islandwide delivery arrives within 2-3 working days after order confirmation.</p>
            <p>Returns and exchanges are accepted within 7 days for unworn items with tags attached.</p>
          </div>
        )}
      </div>
    </section>
  );
}

function CarePanel() {
  return (
    <aside className="rounded border border-[#eadfd8] bg-white p-6">
      <p className="text-xs font-extrabold uppercase tracking-[0.18em] text-gold">Style Notes</p>
      <h2 className="mt-3 font-serif text-3xl">Made for special moments</h2>
      <div className="mt-5 space-y-4 text-sm text-neutral-700">
        <p>Pair with nude heels and gold jewelry for wedding guest styling.</p>
        <p>Steam lightly before wearing and dry clean for the longest garment life.</p>
      </div>
    </aside>
  );
}

function OrderSteps() {
  const steps = [
    { icon: ShoppingBag, title: '1. Click Buy Now', copy: 'Choose your favorite item and click Buy Now.' },
    { icon: UserRoundCheck, title: '2. Submit Your Details', copy: 'Fill in your details in the quick form.' },
    { icon: MessageCircle, title: "3. We'll Contact You", copy: "We'll reach out via phone, WhatsApp or email to confirm your order." },
  ];

  return (
    <section className="px-4 pb-12">
      <div className="mx-auto grid max-w-7xl gap-4 rounded-lg border border-[#eadfd8] bg-[#f6eee7] p-5 md:grid-cols-3">
        {steps.map(({ icon: Icon, title, copy }, index) => (
          <div className="grid grid-cols-[54px_1fr_24px] items-center gap-4" key={title}>
            <Icon size={44} strokeWidth={1.4} />
            <span>
              <span className="block text-sm font-extrabold">{title}</span>
              <span className="mt-1 block text-sm text-neutral-700">{copy}</span>
            </span>
            {index < steps.length - 1 && <ChevronRight size={20} className="hidden md:block" />}
          </div>
        ))}
      </div>
    </section>
  );
}
