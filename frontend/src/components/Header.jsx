import {
  Heart,
  Menu,
  Search,
  ShoppingBag,
  Sparkles,
  Truck,
  UserRound,
} from 'lucide-react';

const navItems = ['New In', 'Dresses', 'Clothing', 'Occasion', 'Bridal', 'Sale', 'About', 'Contact'];

export default function Header() {
  return (
    <header className="sticky top-0 z-40 bg-white/95 backdrop-blur">
      <div className="bg-black px-4 py-2 text-[11px] uppercase tracking-[0.16em] text-white sm:text-xs">
        <div className="mx-auto flex max-w-7xl items-center justify-center gap-4 sm:gap-10">
          <span className="flex items-center gap-2">
            <Truck size={14} className="text-gold" /> Islandwide Delivery Available
          </span>
          <span className="hidden h-4 w-px bg-white/45 sm:block" />
          <span className="hidden items-center gap-2 md:flex">
            <Sparkles size={14} className="text-gold" /> New Collection Live
          </span>
          <span className="hidden h-4 w-px bg-white/45 md:block" />
          <span className="hidden sm:inline">WhatsApp Orders Available</span>
        </div>
      </div>

      <nav className="border-b border-linen px-4">
        <div className="mx-auto flex h-[72px] max-w-7xl items-center justify-between gap-4">
          <a href="/" className="font-serif text-3xl text-[#6f4525]">
            Shara Shopping
          </a>

          <div className="hidden items-center gap-9 text-xs font-semibold uppercase tracking-[0.18em] text-ink lg:flex">
            {navItems.map((item) => (
              <a
                href={`#${item.toLowerCase().replaceAll(' ', '-')}`}
                key={item}
                className={item === 'Sale' ? 'text-rosewood' : 'hover:text-rosewood'}
              >
                {item}
              </a>
            ))}
          </div>

          <div className="flex items-center gap-3 text-ink">
            <button className="icon-button" aria-label="Search">
              <Search size={21} />
            </button>
            <button className="icon-button hidden sm:grid" aria-label="Wishlist">
              <Heart size={21} />
            </button>
            <button className="icon-button hidden sm:grid" aria-label="Shopping bag">
              <ShoppingBag size={21} />
            </button>
            <button className="icon-button hidden sm:grid" aria-label="Account">
              <UserRound size={21} />
            </button>
            <button className="icon-button lg:hidden" aria-label="Open menu">
              <Menu size={23} />
            </button>
          </div>
        </div>
      </nav>
    </header>
  );
}
