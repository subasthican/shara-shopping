import {
  ArrowRight,
  Award,
  Headphones,
  Heart,
  Mail,
  PackageCheck,
  ShieldCheck,
  ShoppingBag,
  Star,
  Truck,
} from 'lucide-react';
import aboutBoutique from '../assets/about-boutique.png';
import heroImage from '../assets/home-hero.png';
import Footer from '../components/Footer.jsx';
import Header from '../components/Header.jsx';

const values = [
  { icon: Award, title: 'Premium Quality', copy: 'Carefully selected fabrics for lasting comfort.' },
  { icon: Truck, title: 'Fast Delivery', copy: 'Quick and reliable delivery right to your doorstep.' },
  { icon: ShieldCheck, title: 'Secure Process', copy: 'A simple order flow with careful confirmation.' },
  { icon: Headphones, title: 'Customer Support', copy: "We're here to help you anytime." },
];

const stats = [
  { icon: ShoppingBag, value: '10K+', label: 'Happy Customers' },
  { icon: PackageCheck, value: '5K+', label: 'Styles Available' },
  { icon: Star, value: '4.8/5', label: 'Customer Rating' },
  { icon: Award, value: '3+', label: 'Years of Trust' },
];

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-white text-ink">
      <Header />
      <main>
        <AboutHero />
        <StorySection />
        <ValueStrip />
        <StatsSection />
        <NewsletterBand />
      </main>
      <Footer />
    </div>
  );
}

function AboutHero() {
  return (
    <section className="relative overflow-hidden bg-[#f6ebe2]">
      <img src={heroImage} alt="Shara Shopping occasionwear styling" className="absolute inset-0 h-full w-full object-cover object-center" />
      <div className="absolute inset-0 bg-gradient-to-r from-white via-white/86 to-transparent" />
      <div className="relative mx-auto grid min-h-[520px] max-w-7xl items-center px-4 py-16 lg:grid-cols-[0.92fr_1.08fr]">
        <div className="max-w-xl">
          <p className="text-sm font-bold uppercase tracking-[0.3em] text-rosewood">About Us</p>
          <h1 className="mt-5 font-serif text-6xl leading-[0.95] sm:text-7xl">
            We Dress You in Style & Confidence
          </h1>
          <div className="mt-8 h-px w-16 bg-rosewood" />
          <p className="mt-7 text-base leading-8 text-neutral-700">
            At Shara Shopping, we believe that fashion is more than just clothing. It is a way to express who you are.
          </p>
          <p className="mt-5 text-base leading-8 text-neutral-700">
            We bring you the latest trends, timeless styles, and exceptional quality dresses that make you look and feel your best.
          </p>
          <a href="/dresses" className="btn-primary mt-8 gap-3">
            Shop Our Collection <ArrowRight size={18} />
          </a>
        </div>
      </div>
    </section>
  );
}

function StorySection() {
  return (
    <section className="px-4 py-12 lg:py-16">
      <div className="mx-auto grid max-w-7xl items-center gap-12 lg:grid-cols-[1fr_1.1fr]">
        <img
          src={aboutBoutique}
          alt="Shara Shopping boutique interior"
          className="aspect-[4/3] w-full rounded-lg object-cover shadow-soft"
        />
        <div>
          <p className="text-sm font-bold uppercase tracking-[0.3em] text-rosewood">Our Story</p>
          <h2 className="mt-4 max-w-xl font-serif text-5xl leading-none">
            Passion for Fashion, Commitment to You
          </h2>
          <p className="mt-7 max-w-2xl text-base leading-8 text-neutral-700">
            Shara Shopping was founded with a simple mission: to make every woman feel beautiful and confident through fashion. We carefully curate collections that blend elegance, comfort, and affordability.
          </p>
          <p className="mt-5 max-w-2xl text-base leading-8 text-neutral-700">
            From casual everyday wear to stunning outfits for life&apos;s special moments, we are here to be part of your story.
          </p>
          <div className="mt-8 flex gap-4">
            <span className="grid h-14 w-14 shrink-0 place-items-center rounded-full bg-blush text-rosewood">
              <Heart size={26} />
            </span>
            <div>
              <h3 className="font-bold">Made with Love</h3>
              <p className="mt-1 text-sm text-neutral-600">Every piece is selected with love and attention to detail.</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

function ValueStrip() {
  return (
    <section className="px-4 pb-12">
      <div className="mx-auto grid max-w-7xl gap-5 rounded-lg bg-[#f8eeea] px-6 py-8 md:grid-cols-2 lg:grid-cols-4">
        {values.map(({ icon: Icon, title, copy }) => (
          <div className="flex gap-4 border-[#dec8c0] lg:border-r lg:last:border-r-0" key={title}>
            <span className="grid h-14 w-14 shrink-0 place-items-center rounded-full bg-blush text-rosewood">
              <Icon size={27} />
            </span>
            <div>
              <h3 className="font-bold">{title}</h3>
              <p className="mt-2 text-sm leading-6 text-neutral-700">{copy}</p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}

function StatsSection() {
  return (
    <section className="px-4 pb-12">
      <div className="mx-auto max-w-7xl text-center">
        <h2 className="font-serif text-4xl">Our Journey in Numbers</h2>
        <div className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {stats.map(({ icon: Icon, value, label }) => (
            <div className="flex items-center justify-center gap-5 border-[#e3d3ca] lg:border-r lg:last:border-r-0" key={label}>
              <span className="grid h-16 w-16 place-items-center rounded-full bg-blush text-rosewood">
                <Icon size={30} />
              </span>
              <div className="text-left">
                <p className="text-4xl font-extrabold text-rosewood">{value}</p>
                <p className="mt-1 text-sm text-neutral-700">{label}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function NewsletterBand() {
  return (
    <section className="px-4 pb-8">
      <div className="mx-auto grid max-w-7xl overflow-hidden rounded-lg bg-gradient-to-r from-blush via-[#fbf0ed] to-[#f8e5e0] md:grid-cols-[0.8fr_1fr_1.15fr]">
        <div className="relative hidden min-h-40 md:block">
          <span className="promo-model left-[36%]" />
        </div>
        <div className="flex flex-col justify-center px-6 py-8">
          <h2 className="font-serif text-4xl">Stay in Style</h2>
          <p className="mt-3 text-sm leading-6 text-neutral-700">
            Subscribe to get special offers, free giveaways, and once-in-a-lifetime deals.
          </p>
        </div>
        <form className="flex flex-col justify-center gap-3 px-6 pb-8 md:py-8">
          <div className="flex flex-col gap-3 sm:flex-row">
            <label className="sr-only" htmlFor="newsletter-email">
              Email address
            </label>
            <input
              id="newsletter-email"
              className="h-12 flex-1 rounded border border-transparent bg-white px-4 text-sm outline-none focus:border-rosewood"
              placeholder="Enter your email address"
              type="email"
            />
            <button className="btn-primary h-12 px-7" type="submit">
              Subscribe
            </button>
          </div>
          <p className="flex items-center gap-2 text-xs text-neutral-600">
            <Mail size={14} /> We respect your privacy. Unsubscribe anytime.
          </p>
        </form>
      </div>
    </section>
  );
}
