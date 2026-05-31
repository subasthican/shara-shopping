import {
  CalendarHeart,
  ChevronRight,
  Gem,
  GlassWater,
  Heart,
  Sparkles,
  UsersRound,
} from 'lucide-react';
import { Link } from 'react-router-dom';
import heroImage from '../assets/home-hero.png';
import Footer from '../components/Footer.jsx';
import Header from '../components/Header.jsx';
import ProductCard from '../components/ProductCard.jsx';
import { dressProducts } from '../data/shopData.js';

const occasions = [
  { icon: Gem, label: 'Wedding Guest', copy: 'Graceful dresses for ceremonies, receptions, and garden weddings.' },
  { icon: GlassWater, label: 'Dinner Party', copy: 'Soft satin, drape details, and polished evening silhouettes.' },
  { icon: Sparkles, label: 'Party Edit', copy: 'Statement pieces with movement, shine, and confident cuts.' },
  { icon: CalendarHeart, label: 'Bridal Events', copy: 'Romantic looks for showers, rehearsals, and celebrations.' },
];

const looks = [
  { title: 'Soft Romance', products: [dressProducts[0], dressProducts[1], dressProducts[3], dressProducts[4]] },
  { title: 'Evening Polish', products: [dressProducts[2], dressProducts[6], dressProducts[5], dressProducts[7]] },
];

export default function OccasionPage() {
  return (
    <div className="min-h-screen bg-white text-ink">
      <Header />
      <main>
        <OccasionHero />
        <OccasionTiles />
        <FeaturedLook />
        <ProductSections />
        <StylingStrip />
      </main>
      <Footer />
    </div>
  );
}

function OccasionHero() {
  return (
    <section className="relative overflow-hidden bg-[#f3e5d8]">
      <img src={heroImage} alt="Occasionwear collection" className="absolute inset-0 h-full w-full object-cover object-center" />
      <div className="absolute inset-0 bg-gradient-to-r from-[#f7eadf] via-[#f7eadf]/82 to-transparent" />
      <div className="relative mx-auto grid min-h-[520px] max-w-7xl items-center gap-8 px-4 py-14 lg:grid-cols-[0.9fr_1.1fr]">
        <div>
          <nav className="mb-7 flex items-center gap-3 text-sm text-neutral-600" aria-label="Breadcrumb">
            <Link to="/" className="hover:text-rosewood">Home</Link>
            <ChevronRight size={14} />
            <span className="font-medium text-ink">Occasion</span>
          </nav>
          <p className="text-xs font-semibold uppercase tracking-[0.44em] text-[#5d473c]">Occasion Edit</p>
          <h1 className="mt-5 font-serif text-6xl uppercase leading-none sm:text-7xl lg:text-8xl">
            Dress For
            <span className="block">The Moment</span>
          </h1>
          <p className="mt-6 max-w-lg text-base leading-7 text-neutral-700">
            Curated dresses for weddings, dinners, parties, and every invitation that deserves a little extra elegance.
          </p>
          <div className="mt-8 flex flex-col gap-4 sm:flex-row">
            <a href="#occasion-products" className="btn-primary">Shop Occasionwear</a>
            <a href="#occasion-guide" className="btn-outline">Find Your Look</a>
          </div>
        </div>
        <div className="relative hidden min-h-[420px] overflow-hidden rounded bg-gradient-to-br from-[#f1cbc8] via-[#f8eee8] to-[#9b1f2e] shadow-soft lg:block">
          <span className="promo-model !left-[35%] !h-[98%] !w-[24%] figure-maroon" />
          <span className="absolute bottom-8 right-8 max-w-56 rounded bg-white/86 p-5 shadow-sm">
            <span className="block text-xs font-extrabold uppercase tracking-[0.2em] text-gold">Featured</span>
            <span className="mt-2 block font-serif text-2xl">Evening-ready silhouettes</span>
          </span>
        </div>
      </div>
    </section>
  );
}

function OccasionTiles() {
  return (
    <section className="bg-white px-4 py-10" id="occasion-guide">
      <div className="mx-auto max-w-7xl">
        <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <h2 className="font-serif text-5xl leading-none">Shop by Occasion</h2>
            <div className="title-mark" />
          </div>
          <p className="max-w-xl text-sm leading-6 text-neutral-700">
            Choose the mood of your event and discover polished pieces that feel considered from first fitting to final photo.
          </p>
        </div>
        <div className="mt-7 grid gap-5 md:grid-cols-2 xl:grid-cols-4">
          {occasions.map(({ icon: Icon, label, copy }) => (
            <a className="rounded-lg border border-[#eadfd8] bg-[#fffaf7] p-6 transition hover:border-gold hover:bg-white" href="#occasion-products" key={label}>
              <span className="grid h-14 w-14 place-items-center rounded-full bg-blush text-rosewood">
                <Icon size={27} />
              </span>
              <h3 className="mt-5 text-lg font-extrabold">{label}</h3>
              <p className="mt-3 text-sm leading-6 text-neutral-700">{copy}</p>
            </a>
          ))}
        </div>
      </div>
    </section>
  );
}

function FeaturedLook() {
  return (
    <section className="bg-[#fffaf7] px-4 py-10">
      <div className="mx-auto grid max-w-7xl overflow-hidden rounded-lg border border-[#eadfd8] bg-white lg:grid-cols-[0.95fr_1.05fr]">
        <div className="relative min-h-[360px] bg-gradient-to-br from-[#eed4cc] via-[#f6e7df] to-[#9b1f2e]">
          <span className="product-silhouette figure-maroon !bottom-[-18px] !h-[92%] !w-[24%]" />
        </div>
        <div className="flex flex-col justify-center p-8 lg:p-12">
          <p className="text-xs font-extrabold uppercase tracking-[0.24em] text-gold">Editor&apos;s Pick</p>
          <h2 className="mt-4 font-serif text-5xl leading-none">The Evening Guest Edit</h2>
          <p className="mt-5 max-w-xl leading-7 text-neutral-700">
            Fluid satin, softly structured waists, and romantic colors chosen for formal dinners, wedding receptions, and intimate celebrations.
          </p>
          <div className="mt-7 grid gap-4 text-sm sm:grid-cols-3">
            {['Soft drape', 'Photo-ready color', 'Easy movement'].map((item) => (
              <span className="rounded border border-[#eadfd8] bg-[#fffaf7] px-4 py-3 font-bold" key={item}>
                {item}
              </span>
            ))}
          </div>
          <a href="#occasion-products" className="btn-primary mt-8 w-fit">View Looks</a>
        </div>
      </div>
    </section>
  );
}

function ProductSections() {
  return (
    <section className="bg-white px-4 py-10" id="occasion-products">
      <div className="mx-auto max-w-7xl space-y-12">
        {looks.map((look) => (
          <div key={look.title}>
            <div className="flex items-end justify-between gap-4">
              <div>
                <h2 className="font-serif text-4xl">{look.title}</h2>
                <div className="title-mark" />
              </div>
              <Link to="/categories/occasion" className="hidden text-sm font-bold uppercase tracking-[0.16em] text-rosewood sm:inline">
                View Occasion Category
              </Link>
            </div>
            <div className="mt-7 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
              {look.products.map((product, index) => (
                <ProductCard product={product} selectedSize={index % 2 === 0 ? 'S' : 'M'} key={`${look.title}-${product.name}`} />
              ))}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}

function StylingStrip() {
  const notes = [
    { icon: Heart, title: 'Personal Fit Notes', copy: 'Check each product size options before placing your order.' },
    { icon: UsersRound, title: 'Event Styling Help', copy: 'Message us on WhatsApp for outfit suggestions.' },
    { icon: Sparkles, title: 'New Edits Weekly', copy: 'Fresh occasion pieces are curated throughout the season.' },
  ];

  return (
    <section className="bg-white px-4 pb-12">
      <div className="mx-auto grid max-w-7xl gap-5 rounded-lg border border-[#eadfd8] bg-[#f6eee7] p-6 md:grid-cols-3">
        {notes.map(({ icon: Icon, title, copy }) => (
          <div className="flex gap-4" key={title}>
            <span className="grid h-12 w-12 shrink-0 place-items-center rounded-full bg-white text-rosewood">
              <Icon size={23} />
            </span>
            <div>
              <h3 className="font-extrabold">{title}</h3>
              <p className="mt-2 text-sm leading-6 text-neutral-700">{copy}</p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
