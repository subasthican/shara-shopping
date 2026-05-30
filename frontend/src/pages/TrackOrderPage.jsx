import {
  ClipboardCheck,
  CreditCard,
  Gift,
  Headphones,
  Mail,
  MapPin,
  Package,
  PackageCheck,
  Phone,
  Printer,
  ShieldCheck,
  ShoppingBag,
  Truck,
  UserRound,
} from 'lucide-react';
import Footer from '../components/Footer.jsx';
import Header from '../components/Header.jsx';

const timeline = [
  { icon: ClipboardCheck, title: 'Order Placed', date: 'May 26, 2025', time: '10:30 AM' },
  { icon: Package, title: 'Confirmed', date: 'May 26, 2025', time: '10:45 AM' },
  { icon: Truck, title: 'Shipped', date: 'May 27, 2025', time: '05:20 PM' },
  { icon: MapPin, title: 'Out for Delivery', date: 'May 28, 2025', time: '09:30 AM' },
  { icon: ShoppingBag, title: 'Delivered', date: 'May 28, 2025', time: '11:45 AM' },
];

const customerDetails = [
  { icon: UserRound, label: 'Customer Name', value: 'Heshani Perera' },
  { icon: Mail, label: 'Email', value: 'heshani@gmail.com' },
  { icon: Phone, label: 'Phone', value: '077 123 4567' },
  { icon: MapPin, label: 'Shipping Address', value: '23/4, Flower Road, Borella, Colombo 08, Sri Lanka' },
  { icon: Truck, label: 'Shipping Method', value: 'Standard Delivery' },
  { icon: CreditCard, label: 'Payment Method', value: 'Paid via Card' },
];

const items = [
  { name: 'Floral Chiffon Midi Dress', meta: 'Size: M  |  Color: Peach', price: 'LKR 5,625', accent: 'from-[#f6d7c7] to-[#d99c7e]' },
  { name: 'Lace Overlay Mini Dress', meta: 'Size: S  |  Color: Mint Green', price: 'LKR 5,250', accent: 'from-[#eef0dc] to-[#9aa884]' },
  { name: 'One Shoulder Satin Dress', meta: 'Size: M  |  Color: Pink', price: 'LKR 5,475', accent: 'from-[#f1cbc8] to-[#d39b99]' },
];

export default function TrackOrderPage() {
  return (
    <div className="min-h-screen bg-white text-ink">
      <Header />
      <main className="bg-[#fffaf7]">
        <TrackHero />
        <section className="px-4 pb-8">
          <div className="mx-auto max-w-7xl rounded-lg border border-[#eadfd8] bg-white p-5 shadow-sm sm:p-8">
            <OrderHeader />
            <OrderTimeline />
            <div className="mt-9 grid gap-6 lg:grid-cols-[1fr_340px]">
              <OrderDetails />
              <DeliveryAside />
            </div>
          </div>
        </section>
        <ContinueBanner />
      </main>
      <Footer />
    </div>
  );
}

function TrackHero() {
  return (
    <section className="relative overflow-hidden px-4 py-10 sm:py-12">
      <div className="absolute right-[5%] top-6 hidden h-56 w-56 rounded-full bg-blush/60 lg:block" />
      <div className="absolute right-[18%] top-20 hidden h-44 w-44 rounded-full bg-[#f6e2dc]/80 lg:block" />
      <div className="mx-auto grid max-w-7xl items-center gap-8 lg:grid-cols-[1fr_360px]">
        <div className="text-center lg:text-left">
          <h1 className="font-serif text-5xl leading-none sm:text-6xl">Track Your Order</h1>
          <p className="mt-4 text-neutral-700">Enter your order ID and email address to check your order status.</p>
          <form className="mt-7 rounded-lg border border-[#eadfd8] bg-white p-5 shadow-sm">
            <div className="grid gap-5 md:grid-cols-[1fr_1fr_auto] md:items-end">
              <Field label="Order ID" placeholder="e.g. SH2505261" />
              <Field label="Email Address" placeholder="e.g. youremail@example.com" type="email" />
              <button className="btn-primary h-12 gap-3" type="submit">
                <PackageCheck size={18} /> Track Order
              </button>
            </div>
            <p className="mt-4 flex items-center gap-2 text-sm text-neutral-600">
              <ShieldCheck size={16} className="text-rosewood" /> Your information is secure and used only to track your order.
            </p>
          </form>
        </div>
        <div className="relative mx-auto hidden h-64 w-full max-w-sm lg:block">
          <span className="package-box" />
          <span className="shopping-bag-illustration" />
          <span className="absolute bottom-7 right-1 h-20 w-8 rounded-t-full bg-[#8aa66f]" />
        </div>
      </div>
    </section>
  );
}

function Field({ label, ...props }) {
  return (
    <label className="block text-left">
      <span className="form-label">
        {label} <span className="text-rosewood">*</span>
      </span>
      <input className="form-control mt-2" {...props} />
    </label>
  );
}

function OrderHeader() {
  return (
    <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
      <div>
        <h2 className="font-serif text-3xl">Order Status</h2>
        <p className="mt-4 font-semibold">
          Order ID: <span className="font-extrabold">SH2505261</span>
          <span className="ml-3 rounded bg-[#d8f4dc] px-4 py-1 text-xs font-bold text-[#159447]">Delivered</span>
        </p>
        <p className="mt-2 text-sm text-neutral-600">Placed on May 26, 2025 at 10:30 AM</p>
      </div>
      <button className="inline-flex h-11 items-center justify-center gap-2 rounded border border-[#ded3c9] px-5 text-sm font-semibold">
        <Printer size={17} /> Print Order Details
      </button>
    </div>
  );
}

function OrderTimeline() {
  return (
    <div className="mt-8 grid gap-6 md:grid-cols-5">
      {timeline.map(({ icon: Icon, title, date, time }, index) => (
        <div className="relative text-center" key={title}>
          {index < timeline.length - 1 && <span className="absolute left-1/2 top-8 hidden h-0.5 w-full bg-[#22b84f] md:block" />}
          <span className="relative z-10 mx-auto grid h-16 w-16 place-items-center rounded-full border-2 border-[#22b84f] bg-white text-[#159447]">
            <Icon size={28} />
            <span className="absolute -bottom-1 -right-1 grid h-6 w-6 place-items-center rounded-full bg-[#16a34a] text-xs text-white">✓</span>
          </span>
          <h3 className="mt-4 font-bold">{title}</h3>
          <p className="mt-1 text-sm text-neutral-600">{date}</p>
          <p className="text-sm text-neutral-600">{time}</p>
        </div>
      ))}
    </div>
  );
}

function OrderDetails() {
  return (
    <section className="rounded-lg border border-[#eadfd8] bg-white p-5">
      <div className="grid gap-7 xl:grid-cols-[0.9fr_1fr]">
        <div>
          <h3 className="font-bold">Order Details</h3>
          <div className="mt-5 space-y-5">
            {customerDetails.map(({ icon: Icon, label, value }) => (
              <div className="grid grid-cols-[24px_1fr_1.25fr] gap-3 text-sm" key={label}>
                <Icon size={17} className="text-[#2f6690]" />
                <span className="font-semibold text-neutral-700">{label}</span>
                <span className="leading-6">{value}</span>
              </div>
            ))}
          </div>
        </div>
        <div className="border-[#eadfd8] xl:border-l xl:pl-7">
          <h3 className="font-bold">Items (3)</h3>
          <div className="mt-5 space-y-4">
            {items.map((item) => (
              <div className="grid grid-cols-[56px_1fr_auto] gap-4 text-sm" key={item.name}>
                <span className={`relative overflow-hidden rounded bg-gradient-to-br ${item.accent}`}>
                  <span className="product-silhouette !h-[88%] !w-[42%]" />
                </span>
                <div>
                  <h4 className="font-bold">{item.name}</h4>
                  <p className="mt-1 text-neutral-600">{item.meta}</p>
                  <p className="mt-1 text-neutral-600">Qty: 1</p>
                </div>
                <p className="font-semibold">{item.price}</p>
              </div>
            ))}
          </div>
          <div className="mt-5 space-y-3 border-t border-[#eadfd8] pt-4 text-sm">
            <Line label="Subtotal (3 Items)" value="LKR 16,350" />
            <Line label="Discount (WELCOME10)" value="- LKR 1,635" danger />
            <Line label="Shipping Charge" value="LKR 250" />
            <Line label="Tax (15%)" value="LKR 2,813" />
            <div className="flex justify-between border-t border-dashed border-[#d9ccc2] pt-4 text-xl font-extrabold">
              <span>Total Amount</span>
              <span>LKR 18,900</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

function Line({ label, value, danger = false }) {
  return (
    <div className="flex justify-between">
      <span>{label}</span>
      <span className={danger ? 'font-bold text-rosewood' : ''}>{value}</span>
    </div>
  );
}

function DeliveryAside() {
  return (
    <aside className="space-y-5">
      <section className="rounded-lg border border-[#eadfd8] bg-white p-5">
        <h3 className="font-bold">Delivery Information</h3>
        <div className="mt-5 rounded bg-[#ddf7df] p-4 text-sm">
          <p className="flex items-center gap-2 font-bold text-[#12833c]">
            <PackageCheck size={18} /> Delivered
          </p>
          <p className="mt-2 text-neutral-700">Your order has been delivered successfully.</p>
        </div>
        <Info label="Delivered On" value="May 28, 2025 at 11:45 AM" />
        <Info label="Received By" value="Heshani Perera" />
        <Info label="Notes" value="Left at the front door." />
      </section>
      <section className="rounded-lg border border-[#eadfd8] bg-white p-5">
        <h3 className="font-bold">Need Help?</h3>
        <p className="mt-3 text-sm leading-6 text-neutral-700">
          If you have any questions about your order, our support team is here to help.
        </p>
        <button className="btn-outline mt-5 h-11 w-full gap-2 bg-white">
          <Headphones size={17} /> Contact Support
        </button>
      </section>
    </aside>
  );
}

function Info({ label, value }) {
  return (
    <div className="mt-5 text-sm">
      <p className="font-bold">{label}</p>
      <p className="mt-1 leading-6 text-neutral-700">{value}</p>
    </div>
  );
}

function ContinueBanner() {
  return (
    <section className="px-4 pb-8">
      <div className="mx-auto flex max-w-7xl flex-col gap-6 rounded-lg bg-[#fbefed] px-7 py-8 sm:flex-row sm:items-center sm:justify-between">
        <div className="flex items-center gap-6">
          <span className="grid h-16 w-16 shrink-0 place-items-center rounded-full bg-blush text-rosewood">
            <Gift size={32} />
          </span>
          <div>
            <h2 className="font-serif text-3xl">Enjoying your purchase?</h2>
            <p className="mt-2 max-w-xl text-sm leading-6 text-neutral-700">
              We hope you love your order. Do not forget to check out our latest collections.
            </p>
          </div>
        </div>
        <a href="/dresses" className="btn-primary">Continue Shopping</a>
      </div>
    </section>
  );
}
