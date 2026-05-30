import { Facebook, Instagram, Mail, MapPin, Music2, Phone, Send } from 'lucide-react';

export default function Footer() {
  return (
    <footer className="border-t border-linen bg-white px-4 py-8">
      <div className="mx-auto grid max-w-7xl gap-8 md:grid-cols-[1.6fr_1fr_1fr_1fr_1.2fr]">
        <div>
          <h2 className="font-serif text-3xl text-[#7a4c29]">Shara Shopping</h2>
          <p className="mt-4 max-w-xs text-sm leading-6 text-neutral-600">
            Curated fashion for the modern woman. Timeless style, exceptional quality, unforgettable you.
          </p>
          <div className="mt-5 flex gap-3">
            {[Instagram, Facebook, Music2, Send].map((Icon, index) => (
              <button className="icon-button bg-pearl" key={index} aria-label="Social link">
                <Icon size={18} />
              </button>
            ))}
          </div>
        </div>

        <FooterGroup title="Shop" links={['New In', 'Dresses', 'Clothing', 'Occasion', 'Bridal', 'Sale']} />
        <FooterGroup
          title="Customer Care"
          links={['How to Order', 'Delivery Information', 'Returns & Exchanges', 'Size Guide', 'FAQs', 'Track Your Order']}
        />
        <FooterGroup title="About" links={['About Us', 'Our Story', 'Careers', 'Privacy Policy', 'Terms & Conditions']} />

        <div>
          <h3 className="footer-heading">Contact Us</h3>
          <div className="mt-4 space-y-3 text-sm text-neutral-700">
            <p className="flex items-center gap-2">
              <Phone size={16} /> +94 77 123 4567
            </p>
            <p className="flex items-center gap-2">
              <Mail size={16} /> hello@sharashopping.lk
            </p>
            <p className="flex items-center gap-2">
              <MapPin size={16} /> Colombo, Sri Lanka
            </p>
          </div>
          <div className="mt-5 flex items-center gap-3 rounded-md bg-[#e8f7eb] px-3 py-3 text-sm font-semibold text-[#16753b]">
            <span className="grid h-8 w-8 place-items-center rounded-full bg-[#25d366] text-white">W</span>
            WhatsApp Orders Available
          </div>
        </div>
      </div>
      <p className="mt-7 text-center text-xs text-neutral-500">© 2026 Shara Shopping. All Rights Reserved.</p>
    </footer>
  );
}

function FooterGroup({ title, links }) {
  return (
    <div>
      <h3 className="footer-heading">{title}</h3>
      <ul className="mt-4 space-y-2 text-sm text-neutral-700">
        {links.map((link) => (
          <li key={link}>
            <a href={`#${link.toLowerCase().replaceAll(' ', '-')}`} className="hover:text-rosewood">
              {link}
            </a>
          </li>
        ))}
      </ul>
    </div>
  );
}
