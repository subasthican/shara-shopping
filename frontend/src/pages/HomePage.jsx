import {
  ArrowRight,
  PhoneCall,
  ShoppingBag,
  Sparkles,
  UserRoundCheck,
} from 'lucide-react';
import { Link } from 'react-router-dom';
import heroImage from '../assets/home-hero.png';
import Footer from '../components/Footer.jsx';
import Header from '../components/Header.jsx';
import ProductCard from '../components/ProductCard.jsx';
import { arrivals, quickCategories, shopCategories } from '../data/homeData.js';

export default function HomePage() {
  return (
    <div className="min-h-screen bg-pearl text-ink">
      <Header />
      <main>
        <Hero />
        <QuickCategoryBar />
        <CategoryGrid />
        <NewArrivals />
        <OrderSteps />
        <OccasionBanner />
      </main>
      <Footer />
    </div>
  );
}

function Hero() {
  return (
    <section className="relative overflow-hidden bg-[#f3e5d8]">
      <div className="absolute inset-0 bg-gradient-to-r from-[#f6eadf] via-[#f5e6dc]/85 to-transparent" />
      <img
        src={heroImage}
        alt="Elegant blush occasionwear dress"
        className="absolute inset-0 h-full w-full object-cover object-center"
      />
      <div className="absolute inset-0 bg-gradient-to-r from-[#f7eadf] via-[#f7eadf]/78 to-transparent" />

      <div className="relative mx-auto flex min-h-[560px] max-w-7xl items-center px-4 py-16 sm:min-h-[640px] lg:py-20">
        <div className="max-w-2xl">
          <p className="text-xs font-semibold uppercase tracking-[0.44em] text-[#5d473c]">Timeless Elegance</p>
          <h1 className="mt-5 font-serif text-6xl leading-[0.9] text-black sm:text-7xl lg:text-8xl">
            Elevated
            <span className="block">Occasionwear</span>
          </h1>
          <p className="mt-6 max-w-md text-base leading-7 text-neutral-700 sm:text-lg">
            From chic daywear to unforgettable evenings, discover pieces designed to make you shine.
          </p>
          <div className="mt-8 flex flex-col gap-4 sm:flex-row">
            <a href="#new-arrivals" className="btn-primary">
              Shop Now
            </a>
            <a href="/occasion" className="btn-outline">
              Explore Collection
            </a>
          </div>
          <div className="mt-9 flex gap-3" aria-label="Hero carousel position">
            <span className="h-2.5 w-2.5 rounded-full bg-rosewood" />
            <span className="h-2.5 w-2.5 rounded-full border border-white bg-white/60" />
            <span className="h-2.5 w-2.5 rounded-full border border-white bg-white/60" />
          </div>
        </div>
      </div>
    </section>
  );
}

function QuickCategoryBar() {
  return (
    <section className="bg-white px-4 py-6">
      <div className="mx-auto grid max-w-7xl grid-cols-2 gap-4 md:grid-cols-5">
        {quickCategories.map((category, index) => (
          <a
            href={`#${category.toLowerCase().replaceAll(' ', '-')}`}
            key={category}
            className="flex min-h-14 items-center justify-center gap-3 rounded border border-[#ded1c5] bg-white px-4 text-center text-xs font-bold uppercase tracking-[0.08em] shadow-sm transition hover:border-gold hover:text-rosewood"
          >
            {index === 3 ? <Sparkles size={17} className="text-gold" /> : <DressIcon />}
            {category}
          </a>
        ))}
      </div>
    </section>
  );
}

function CategoryGrid() {
  return (
    <section className="bg-white px-4 pb-9 pt-3" id="dresses">
      <SectionTitle title="Shop by Category" />
      <div className="mx-auto mt-7 grid max-w-7xl grid-cols-2 gap-4 md:grid-cols-3 lg:grid-cols-6">
        {shopCategories.map((category) => (
          <Link
            to={`/categories/${slugify(category.name)}`}
            key={category.name}
            className={`category-tile bg-gradient-to-br ${category.tone}`}
          >
            <span className="category-figure" />
            <span className="relative z-10 mt-auto pb-5 text-sm font-extrabold uppercase tracking-[0.08em] text-white drop-shadow">
              {category.name}
            </span>
          </Link>
        ))}
      </div>
    </section>
  );
}

function NewArrivals() {
  return (
    <section className="bg-white px-4 pb-8" id="new-arrivals">
      <div className="mx-auto flex max-w-7xl items-end justify-between gap-4">
        <SectionTitle title="New Arrivals" compact />
        <a href="#view-all" className="mb-2 flex items-center gap-2 text-xs font-bold uppercase tracking-[0.16em]">
          View All <ArrowRight size={18} />
        </a>
      </div>

      <div className="mx-auto mt-6 grid max-w-7xl gap-6 md:grid-cols-2 lg:grid-cols-4">
        {arrivals.map((product, index) => (
          <ProductCard
            product={product}
            selectedSize={index % 2 === 0 ? 'M' : 'S'}
            imageClassName="aspect-[4/3]"
            key={product.name}
          />
        ))}
      </div>
    </section>
  );
}

function OrderSteps() {
  const steps = [
    { icon: ShoppingBag, title: '1. Click Buy Now', copy: 'Choose your favorite item and click Buy Now.' },
    { icon: UserRoundCheck, title: '2. Submit Your Details', copy: 'Fill in your details in the quick form.' },
    { icon: PhoneCall, title: "3. We'll Contact You", copy: 'We will reach out via phone, WhatsApp or email to confirm your order.' },
  ];

  return (
    <section className="bg-white px-4 py-5">
      <div className="mx-auto grid max-w-7xl gap-5 rounded bg-[#f4eee7] px-6 py-8 md:grid-cols-[1.3fr_1fr_1fr_1fr]">
        <div className="flex items-center gap-5 border-[#d8c8b8] md:border-r">
          <span className="grid h-24 w-24 shrink-0 place-items-center rounded-full border border-[#dccdbc]">
            <ShoppingBag size={42} />
          </span>
          <h2 className="font-serif text-4xl leading-none">How to Place an Order</h2>
        </div>
        {steps.map(({ icon: Icon, title, copy }) => (
          <div className="flex items-start gap-3 border-[#d8c8b8] md:border-r md:last:border-r-0" key={title}>
            <Icon size={28} />
            <div>
              <h3 className="text-sm font-bold">{title}</h3>
              <p className="mt-1 text-sm leading-5 text-neutral-700">{copy}</p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}

function OccasionBanner() {
  return (
    <section className="bg-white px-4 pb-4" id="occasion">
      <div className="mx-auto grid max-w-7xl overflow-hidden rounded bg-[#f5e8de] md:grid-cols-[1fr_1fr]">
        <div className="relative min-h-52 bg-gradient-to-r from-[#d6a093] via-[#f2ddd1] to-[#fff7ef]">
          <span className="promo-model" />
        </div>
        <div className="flex flex-col justify-center px-8 py-10">
          <p className="text-xs font-semibold uppercase tracking-[0.36em] text-neutral-600">Featured Collection</p>
          <h2 className="mt-3 font-serif text-5xl uppercase leading-none">Occasion Edit</h2>
          <p className="mt-3 text-neutral-700">Sophisticated styles for every special moment.</p>
          <a href="/occasion" className="btn-primary mt-6 w-fit">
            Explore The Collection
          </a>
        </div>
      </div>
    </section>
  );
}

function SectionTitle({ title, compact = false }) {
  return (
    <div className={compact ? 'text-left' : 'mx-auto text-center'}>
      <h2 className="font-serif text-4xl leading-none sm:text-5xl">{title}</h2>
      <div className={compact ? 'title-mark' : 'title-mark mx-auto'} />
    </div>
  );
}

function DressIcon() {
  return (
    <span className="relative h-5 w-4 text-gold">
      <span className="absolute left-1/2 top-0 h-2 w-2 -translate-x-1/2 rotate-45 border border-current" />
      <span className="absolute bottom-0 left-0 h-4 w-4 border border-current" style={{ clipPath: 'polygon(50% 0, 100% 100%, 0 100%)' }} />
    </span>
  );
}

function slugify(value) {
  return value.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '');
}
