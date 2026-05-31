import {
  ChevronDown,
  ChevronLeft,
  ChevronRight,
  Grid3X3,
  ListFilter,
  SlidersHorizontal,
  Sparkles,
} from 'lucide-react';
import { Link, useParams } from 'react-router-dom';
import heroImage from '../assets/home-hero.png';
import Footer from '../components/Footer.jsx';
import Header from '../components/Header.jsx';
import ProductCard from '../components/ProductCard.jsx';
import { quickCategories, shopCategories } from '../data/homeData.js';
import { dressFilters, dressProducts } from '../data/shopData.js';

const categoryDetails = {
  dresses: {
    title: 'Dresses',
    eyebrow: 'Signature Collection',
    copy: 'Explore elegant dresses made for everyday polish, celebrations, and unforgettable evenings.',
    count: '128',
    featured: 'Maxi Dresses',
  },
  clothing: {
    title: 'Clothing',
    eyebrow: 'Curated Wardrobe',
    copy: 'Soft separates, coordinated pieces, and refined essentials with the same Shara feminine finish.',
    count: '86',
    featured: 'Co-ords',
  },
  occasion: {
    title: 'Occasion',
    eyebrow: 'Event Ready',
    copy: 'Sophisticated silhouettes for weddings, parties, dinners, and every special moment on your calendar.',
    count: '64',
    featured: 'Evening Dresses',
  },
  bridal: {
    title: 'Bridal',
    eyebrow: 'Bridal Moments',
    copy: 'Romantic pieces for bridal showers, rehearsal dinners, and intimate celebration styling.',
    count: '32',
    featured: 'Bridal Events',
  },
  tops: {
    title: 'Tops',
    eyebrow: 'Fresh Staples',
    copy: 'Polished tops designed to pair beautifully with skirts, trousers, and occasion-ready layers.',
    count: '42',
    featured: 'Party Dresses',
  },
  'co-ords': {
    title: 'Co-ords',
    eyebrow: 'Matching Sets',
    copy: 'Easy matching sets with boutique details, made for refined styling with very little effort.',
    count: '28',
    featured: 'Casual',
  },
};

function slugify(value) {
  return value.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '');
}

export default function CategoryPage() {
  const { categorySlug = 'dresses' } = useParams();
  const category = categoryDetails[categorySlug] || categoryDetails.dresses;
  const products = getCategoryProducts(categorySlug);

  return (
    <div className="min-h-screen bg-white text-ink">
      <Header />
      <main>
        <CategoryHero category={category} />
        <CategoryTabs activeSlug={categorySlug} />
        <section className="px-4 pb-12">
          <div className="mx-auto max-w-7xl">
            <Breadcrumb category={category} />
            <CategoryIntro category={category} />
            <div className="mt-6 grid gap-8 lg:grid-cols-[260px_1fr]">
              <FilterSidebar activeCategory={category.featured} />
              <div>
                <CategoryToolbar category={category} />
                <div className="mt-6 grid gap-6 sm:grid-cols-2 xl:grid-cols-4">
                  {products.map((product, index) => (
                    <ProductCard product={product} selectedSize={index % 3 === 0 ? 'S' : index % 2 === 0 ? 'M' : 'XS'} key={`${category.title}-${product.name}`} />
                  ))}
                </div>
                <Pagination />
              </div>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
}

function CategoryHero({ category }) {
  return (
    <section className="relative overflow-hidden bg-[#f3e5d8]">
      <img src={heroImage} alt={`${category.title} collection`} className="absolute inset-0 h-full w-full object-cover object-center" />
      <div className="absolute inset-0 bg-gradient-to-r from-[#f7eadf] via-[#f7eadf]/86 to-transparent" />
      <div className="relative mx-auto flex min-h-[260px] max-w-7xl items-center px-4 py-12 sm:min-h-[320px]">
        <div className="max-w-xl">
          <p className="text-xs font-semibold uppercase tracking-[0.44em] text-[#5d473c]">{category.eyebrow}</p>
          <h1 className="mt-4 font-serif text-6xl uppercase leading-none sm:text-7xl">{category.title}</h1>
          <p className="mt-5 max-w-md text-base leading-7 text-neutral-700">{category.copy}</p>
        </div>
      </div>
    </section>
  );
}

function CategoryTabs({ activeSlug }) {
  return (
    <section className="bg-white px-4 py-6">
      <div className="mx-auto grid max-w-7xl grid-cols-2 gap-4 md:grid-cols-3 lg:grid-cols-6">
        {shopCategories.map((category, index) => {
          const slug = slugify(category.name);

          return (
            <Link
              className={`flex min-h-12 items-center justify-center gap-3 rounded-full border px-5 text-xs font-bold uppercase tracking-[0.08em] shadow-sm transition ${
                activeSlug === slug
                  ? 'border-rosewood bg-white text-rosewood'
                  : 'border-[#ded1c5] bg-[#f6f0ea] text-ink hover:border-gold hover:text-rosewood'
              }`}
              to={`/categories/${slug}`}
              key={category.name}
            >
              {index === 2 ? <Sparkles size={16} className="text-gold" /> : <DressIcon />}
              {category.name}
            </Link>
          );
        })}
      </div>
    </section>
  );
}

function Breadcrumb({ category }) {
  return (
    <nav className="flex items-center gap-3 text-sm text-neutral-600" aria-label="Breadcrumb">
      <Link to="/" className="hover:text-rosewood">
        Home
      </Link>
      <ChevronRight size={14} />
      <span className="font-medium text-ink">{category.title}</span>
    </nav>
  );
}

function CategoryIntro({ category }) {
  return (
    <section className="mt-6 rounded-lg border border-[#eadfd8] bg-[#fffaf7] p-6">
      <div className="grid gap-6 md:grid-cols-[1fr_auto_auto] md:items-center">
        <div>
          <p className="text-xs font-extrabold uppercase tracking-[0.22em] text-gold">{category.eyebrow}</p>
          <h2 className="mt-2 font-serif text-4xl">{category.title} Collection</h2>
          <p className="mt-3 max-w-2xl text-sm leading-6 text-neutral-700">{category.copy}</p>
        </div>
        <Metric label="Products" value={category.count} />
        <Metric label="Featured" value={category.featured} />
      </div>
    </section>
  );
}

function Metric({ label, value }) {
  return (
    <div className="rounded border border-[#eadfd8] bg-white px-5 py-4 text-center">
      <p className="text-xs font-bold uppercase tracking-[0.14em] text-neutral-500">{label}</p>
      <p className="mt-2 font-serif text-2xl font-bold text-rosewood">{value}</p>
    </div>
  );
}

function FilterSidebar({ activeCategory }) {
  return (
    <aside className="rounded border border-[#e2d8cd] bg-white">
      <div className="flex items-center justify-between border-b border-[#e2d8cd] px-4 py-4">
        <h2 className="text-xs font-extrabold uppercase tracking-[0.16em]">Filters</h2>
        <button className="text-xs font-semibold text-rosewood">Clear All</button>
      </div>

      <FilterGroup title="Category">
        <div className="space-y-3">
          {dressFilters.categories.map(([label, count]) => (
            <label className="flex items-center gap-2 text-sm text-neutral-700" key={label}>
              <span className={`h-4 w-4 rounded-full border ${label === activeCategory ? 'border-rosewood bg-rosewood' : 'border-[#9f948a]'}`} />
              {label} ({count})
            </label>
          ))}
        </div>
      </FilterGroup>
      <FilterGroup title="Size">
        <div className="grid grid-cols-4 gap-2">
          {dressFilters.sizes.map((size) => (
            <button className="h-9 rounded border border-[#d8cec4] text-xs font-medium hover:border-rosewood" key={size}>
              {size}
            </button>
          ))}
        </div>
      </FilterGroup>
      <FilterGroup title="Colour">
        <div className="flex flex-wrap gap-3">
          {dressFilters.colors.map((color) => (
            <button className="h-6 w-6 rounded-full border border-[#d8cec4] shadow-sm" style={{ backgroundColor: color }} aria-label={`Filter colour ${color}`} key={color} />
          ))}
        </div>
      </FilterGroup>
      <FilterGroup title="Occasion">
        <div className="space-y-3">
          {dressFilters.occasions.map(([label, count]) => (
            <label className="flex items-center gap-2 text-sm text-neutral-700" key={label}>
              <span className="h-4 w-4 rounded border border-[#bfb3a8]" />
              {label} ({count})
            </label>
          ))}
        </div>
      </FilterGroup>
      <FilterGroup title="Availability" last>
        <label className="flex items-center gap-2 text-sm text-neutral-700">
          <span className="h-4 w-4 rounded border border-[#bfb3a8]" />
          In Stock Only
        </label>
      </FilterGroup>
    </aside>
  );
}

function FilterGroup({ title, children, last = false }) {
  return (
    <div className={`px-4 py-4 ${last ? '' : 'border-b border-[#e2d8cd]'}`}>
      <button className="mb-4 flex w-full items-center justify-between text-xs font-extrabold uppercase tracking-[0.14em]">
        {title}
        <ChevronDown size={16} />
      </button>
      {children}
    </div>
  );
}

function CategoryToolbar({ category }) {
  return (
    <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
      <p className="text-sm text-neutral-700">Showing 1-8 of {category.count} {category.title}</p>
      <div className="flex flex-wrap items-center gap-3">
        <button className="inline-flex h-11 items-center gap-2 rounded border border-[#ded3c9] px-4 text-sm lg:hidden">
          <SlidersHorizontal size={17} /> Filters
        </button>
        <button className="inline-flex h-11 min-w-52 items-center justify-between gap-4 rounded border border-[#ded3c9] px-4 text-sm">
          <span className="text-neutral-500">Sort by:</span>
          Newest First
          <ChevronDown size={16} />
        </button>
        <div className="flex overflow-hidden rounded border border-[#ded3c9]">
          <button className="grid h-11 w-11 place-items-center border-r border-[#ded3c9] bg-pearl" aria-label="Grid view">
            <Grid3X3 size={18} />
          </button>
          <button className="grid h-11 w-11 place-items-center" aria-label="List view">
            <ListFilter size={18} />
          </button>
        </div>
      </div>
    </div>
  );
}

function Pagination() {
  return (
    <div className="mt-9 flex flex-col items-center justify-between gap-5 xl:flex-row">
      <div className="flex items-center gap-3">
        <button className="grid h-10 w-10 place-items-center rounded border border-[#ded3c9] text-neutral-400" aria-label="Previous page">
          <ChevronLeft size={17} />
        </button>
        {[1, 2, 3].map((page) => (
          <button className={`grid h-10 w-10 place-items-center rounded border text-sm font-semibold ${page === 1 ? 'border-rosewood bg-rosewood text-white' : 'border-[#ded3c9] bg-white'}`} key={page}>
            {page}
          </button>
        ))}
        <button className="grid h-10 w-10 place-items-center rounded border border-[#ded3c9]" aria-label="Next page">
          <ChevronRight size={17} />
        </button>
      </div>
      <button className="btn-outline h-12 min-w-80 bg-white">Load More</button>
    </div>
  );
}

function getCategoryProducts(categorySlug) {
  const offset = Object.keys(categoryDetails).indexOf(categorySlug);
  const start = Math.max(offset, 0);

  return [...dressProducts.slice(start), ...dressProducts.slice(0, start)].slice(0, 8);
}

function DressIcon() {
  return (
    <span className="relative h-5 w-4 text-gold">
      <span className="absolute left-1/2 top-0 h-2 w-2 -translate-x-1/2 rotate-45 border border-current" />
      <span className="absolute bottom-0 left-0 h-4 w-4 border border-current" style={{ clipPath: 'polygon(50% 0, 100% 100%, 0 100%)' }} />
    </span>
  );
}
