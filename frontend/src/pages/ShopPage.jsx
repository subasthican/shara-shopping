import {
  ChevronDown,
  ChevronLeft,
  ChevronRight,
  Grid3X3,
  ListFilter,
  SlidersHorizontal,
  Sparkles,
} from 'lucide-react';
import heroImage from '../assets/home-hero.png';
import Footer from '../components/Footer.jsx';
import Header from '../components/Header.jsx';
import ProductCard from '../components/ProductCard.jsx';
import { quickCategories } from '../data/homeData.js';
import { dressFilters, dressProducts } from '../data/shopData.js';

export default function ShopPage() {
  return (
    <div className="min-h-screen bg-white text-ink">
      <Header />
      <main>
        <ShopHero />
        <DressTabs />
        <section className="px-4 pb-12">
          <div className="mx-auto max-w-7xl">
            <Breadcrumb />
            <div className="mt-6 grid gap-8 lg:grid-cols-[260px_1fr]">
              <FilterSidebar />
              <div>
                <ShopToolbar />
                <ProductGrid />
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

function ShopHero() {
  return (
    <section className="relative overflow-hidden bg-[#f3e5d8]">
      <img src={heroImage} alt="All dresses collection" className="absolute inset-0 h-full w-full object-cover object-center" />
      <div className="absolute inset-0 bg-gradient-to-r from-[#f7eadf] via-[#f7eadf]/86 to-transparent" />
      <div className="relative mx-auto flex min-h-[260px] max-w-7xl items-center px-4 py-12 sm:min-h-[300px]">
        <div className="max-w-xl">
          <p className="text-xs font-semibold uppercase tracking-[0.44em] text-[#5d473c]">Timeless Elegance</p>
          <h1 className="mt-4 font-serif text-6xl uppercase leading-none sm:text-7xl">All Dresses</h1>
          <p className="mt-5 max-w-md text-base leading-7 text-neutral-700">
            Discover our curated collection of dresses designed to make every moment special and unforgettable.
          </p>
        </div>
      </div>
    </section>
  );
}

function DressTabs() {
  return (
    <section className="bg-white px-4 py-6">
      <div className="mx-auto grid max-w-7xl grid-cols-2 gap-4 md:grid-cols-5">
        {quickCategories.map((category, index) => (
          <button
            className={`flex min-h-12 items-center justify-center gap-3 rounded-full border px-5 text-xs font-bold uppercase tracking-[0.08em] shadow-sm transition ${
              index === 1
                ? 'border-rosewood bg-white text-rosewood'
                : 'border-[#ded1c5] bg-[#f6f0ea] text-ink hover:border-gold hover:text-rosewood'
            }`}
            key={category}
          >
            {index === 3 ? <Sparkles size={16} className="text-gold" /> : <DressIcon />}
            {category}
          </button>
        ))}
      </div>
    </section>
  );
}

function Breadcrumb() {
  return (
    <nav className="flex items-center gap-3 text-sm text-neutral-600" aria-label="Breadcrumb">
      <a href="/" className="hover:text-rosewood">
        Home
      </a>
      <ChevronRight size={14} />
      <a href="/dresses" className="hover:text-rosewood">
        Dresses
      </a>
      <ChevronRight size={14} />
      <span className="font-medium text-ink">All Dresses</span>
    </nav>
  );
}

function FilterSidebar() {
  return (
    <aside className="rounded border border-[#e2d8cd] bg-white">
      <div className="flex items-center justify-between border-b border-[#e2d8cd] px-4 py-4">
        <h2 className="text-xs font-extrabold uppercase tracking-[0.16em]">Filters</h2>
        <button className="text-xs font-semibold text-rosewood">Clear All</button>
      </div>

      <FilterGroup title="Category">
        <RadioList items={dressFilters.categories} />
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
            <button
              className="h-6 w-6 rounded-full border border-[#d8cec4] shadow-sm"
              style={{ backgroundColor: color }}
              aria-label={`Filter colour ${color}`}
              key={color}
            />
          ))}
        </div>
      </FilterGroup>
      <FilterGroup title="Price Range">
        <div className="px-1">
          <div className="relative h-2 rounded-full bg-[#eaded4]">
            <span className="absolute left-0 top-0 h-2 w-full rounded-full bg-rosewood" />
            <span className="absolute -left-1 top-1/2 h-4 w-4 -translate-y-1/2 rounded-full border-2 border-rosewood bg-white" />
            <span className="absolute -right-1 top-1/2 h-4 w-4 -translate-y-1/2 rounded-full border-2 border-rosewood bg-white" />
          </div>
          <div className="mt-4 flex justify-between text-xs font-semibold text-neutral-700">
            <span>LKR 4,000</span>
            <span>LKR 20,000</span>
          </div>
        </div>
      </FilterGroup>
      <FilterGroup title="Occasion">
        <CheckList items={dressFilters.occasions} />
      </FilterGroup>
      <FilterGroup title="Availability" last>
        <label className="flex items-center gap-2 text-sm text-neutral-700">
          <span className="h-4 w-4 rounded border border-[#bfb3a8]" />
          In Stock Only (104)
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

function RadioList({ items }) {
  return (
    <div className="space-y-3">
      {items.map(([label, count]) => (
        <label className="flex items-center gap-2 text-sm text-neutral-700" key={label}>
          <span className="h-4 w-4 rounded-full border border-[#9f948a]" />
          {label} ({count})
        </label>
      ))}
    </div>
  );
}

function CheckList({ items }) {
  return (
    <div className="space-y-3">
      {items.map(([label, count]) => (
        <label className="flex items-center gap-2 text-sm text-neutral-700" key={label}>
          <span className="h-4 w-4 rounded border border-[#bfb3a8]" />
          {label} ({count})
        </label>
      ))}
    </div>
  );
}

function ShopToolbar() {
  return (
    <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
      <p className="text-sm text-neutral-700">Showing 1-8 of 128 Dresses</p>
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

function ProductGrid() {
  return (
    <div className="mt-6 grid gap-6 sm:grid-cols-2 xl:grid-cols-4">
      {dressProducts.map((product, index) => (
        <ProductCard product={product} selectedSize={index % 3 === 0 ? 'XS' : index % 2 === 0 ? 'M' : 'S'} key={product.name} />
      ))}
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
        {[1, 2, 3, 4, 5].map((page) => (
          <button
            className={`grid h-10 w-10 place-items-center rounded border text-sm font-semibold ${
              page === 1 ? 'border-rosewood bg-rosewood text-white' : 'border-[#ded3c9] bg-white'
            }`}
            key={page}
          >
            {page}
          </button>
        ))}
        <span className="px-2 font-semibold">...</span>
        <button className="grid h-10 w-10 place-items-center rounded border border-[#ded3c9] text-sm font-semibold">16</button>
        <button className="grid h-10 w-10 place-items-center rounded border border-[#ded3c9]" aria-label="Next page">
          <ChevronRight size={17} />
        </button>
      </div>
      <button className="btn-outline h-12 min-w-80 bg-white">Load More</button>
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
