import { ArrowLeft, Home, Search, ShoppingBag } from 'lucide-react';
import { Link } from 'react-router-dom';
import Footer from '../components/Footer.jsx';
import Header from '../components/Header.jsx';

const quickLinks = [
  { label: 'New arrivals', to: '/#new-arrivals' },
  { label: 'Dresses', to: '/dresses' },
  { label: 'Occasion wear', to: '/occasion' },
  { label: 'Track order', to: '/track-order' },
];

export default function NotFoundPage() {
  return (
    <div className="min-h-screen bg-[#fffaf7] text-ink">
      <Header />
      <main className="px-4 py-12 sm:py-16">
        <section className="mx-auto grid max-w-7xl items-center gap-10 lg:grid-cols-[0.95fr_1.05fr]">
          <div>
            <p className="text-sm font-bold uppercase tracking-[0.28em] text-rosewood">Page not found</p>
            <h1 className="mt-5 font-serif text-6xl leading-none text-[#6f4525] sm:text-7xl">
              This style has left the rack
            </h1>
            <p className="mt-6 max-w-xl text-base leading-8 text-neutral-700">
              The page you are looking for may have moved, sold out, or been renamed. Browse the latest Shara Shopping edits or return home.
            </p>
            <div className="mt-8 flex flex-col gap-3 sm:flex-row">
              <Link to="/dresses" className="btn-primary gap-3">
                <ShoppingBag size={18} /> Shop dresses
              </Link>
              <Link to="/" className="btn-outline gap-3">
                <Home size={18} /> Back home
              </Link>
            </div>
          </div>

          <div className="relative min-h-[420px] overflow-hidden rounded-lg bg-[#f6ebe2] shadow-soft">
            <div className="absolute inset-x-8 top-8 flex items-center justify-between rounded bg-white/75 px-4 py-3 text-sm font-semibold text-[#7a4c29] shadow-sm">
              <span className="flex items-center gap-2">
                <Search size={17} /> Looking for something?
              </span>
              <span>404</span>
            </div>
            <span className="product-silhouette figure-champagne left-[15%]" />
            <span className="product-silhouette figure-maroon left-[42%]" />
            <span className="product-silhouette figure-lace left-[68%]" />
            <div className="absolute inset-x-8 bottom-8 rounded bg-white/85 p-5 shadow-sm">
              <p className="text-xs font-bold uppercase tracking-[0.22em] text-rosewood">Quick links</p>
              <div className="mt-4 grid gap-3 sm:grid-cols-2">
                {quickLinks.map((link) => (
                  <Link
                    key={link.label}
                    to={link.to}
                    className="flex items-center justify-between rounded border border-linen bg-white px-4 py-3 text-sm font-bold text-ink transition hover:border-rosewood hover:text-rosewood"
                  >
                    {link.label}
                    <ArrowLeft size={16} className="rotate-180" />
                  </Link>
                ))}
              </div>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
}
