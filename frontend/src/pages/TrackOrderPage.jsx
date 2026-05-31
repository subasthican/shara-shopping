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
import { useMemo, useState } from 'react';
import Footer from '../components/Footer.jsx';
import Header from '../components/Header.jsx';
import { trackOrder } from '../services/orderService.js';

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

const demoOrder = {
  orderNumber: 'SH2505261',
  status: 'Delivered',
  placedAt: 'May 26, 2025 at 10:30 AM',
  timeline,
  customerDetails,
  items,
  totals: [
    ['Subtotal (3 Items)', 'LKR 16,350'],
    ['Discount (WELCOME10)', '- LKR 1,635', true],
    ['Shipping Charge', 'LKR 250'],
    ['Tax (15%)', 'LKR 2,813'],
  ],
  totalAmount: 'LKR 18,900',
  deliveryInfo: {
    status: 'Delivered',
    message: 'Your order has been delivered successfully.',
    deliveredOn: 'May 28, 2025 at 11:45 AM',
    receivedBy: 'Heshani Perera',
    notes: 'Left at the front door.',
  },
};

export default function TrackOrderPage() {
  const [lookup, setLookup] = useState({ orderId: '', contact: '' });
  const [trackedOrder, setTrackedOrder] = useState(null);
  const [feedback, setFeedback] = useState({ type: '', message: '' });
  const [isTracking, setIsTracking] = useState(false);
  const order = useMemo(() => trackedOrder || demoOrder, [trackedOrder]);

  const handleLookupChange = (field, value) => {
    setLookup((current) => ({ ...current, [field]: value }));
  };

  const handleTrackOrder = async (event) => {
    event.preventDefault();
    setFeedback({ type: '', message: '' });

    if (!lookup.orderId || !lookup.contact) {
      setFeedback({ type: 'error', message: 'Please enter your order ID and email or phone number.' });
      return;
    }

    setIsTracking(true);

    try {
      const apiOrder = await trackOrder(lookup.orderId, lookup.contact);
      setTrackedOrder(formatApiOrder(apiOrder));
      setFeedback({ type: 'success', message: 'Order found. Your latest order status is shown below.' });
    } catch (error) {
      setFeedback({ type: 'error', message: error.response?.data?.message || 'We could not find an order for those details.' });
    } finally {
      setIsTracking(false);
    }
  };

  return (
    <div className="min-h-screen bg-white text-ink">
      <Header />
      <main className="bg-[#fffaf7]">
        <TrackHero
          feedback={feedback}
          isTracking={isTracking}
          lookup={lookup}
          onChange={handleLookupChange}
          onSubmit={handleTrackOrder}
        />
        <section className="px-4 pb-8">
          <div className="mx-auto max-w-7xl rounded-lg border border-[#eadfd8] bg-white p-5 shadow-sm sm:p-8">
            <OrderHeader order={order} />
            <OrderTimeline timelineItems={order.timeline} />
            <div className="mt-9 grid gap-6 lg:grid-cols-[1fr_340px]">
              <OrderDetails order={order} />
              <DeliveryAside info={order.deliveryInfo} />
            </div>
          </div>
        </section>
        <ContinueBanner />
      </main>
      <Footer />
    </div>
  );
}

function TrackHero({ feedback, isTracking, lookup, onChange, onSubmit }) {
  return (
    <section className="relative overflow-hidden px-4 py-10 sm:py-12">
      <div className="absolute right-[5%] top-6 hidden h-56 w-56 rounded-full bg-blush/60 lg:block" />
      <div className="absolute right-[18%] top-20 hidden h-44 w-44 rounded-full bg-[#f6e2dc]/80 lg:block" />
      <div className="mx-auto grid max-w-7xl items-center gap-8 lg:grid-cols-[1fr_360px]">
        <div className="text-center lg:text-left">
          <h1 className="font-serif text-5xl leading-none sm:text-6xl">Track Your Order</h1>
          <p className="mt-4 text-neutral-700">Enter your order ID and email address to check your order status.</p>
          <form className="mt-7 rounded-lg border border-[#eadfd8] bg-white p-5 shadow-sm" onSubmit={onSubmit}>
            <div className="grid gap-5 md:grid-cols-[1fr_1fr_auto] md:items-end">
              <Field label="Order ID" placeholder="e.g. SH2505261" value={lookup.orderId} onChange={(event) => onChange('orderId', event.target.value)} />
              <Field label="Email or Phone" placeholder="e.g. you@email.com or 0771234567" value={lookup.contact} onChange={(event) => onChange('contact', event.target.value)} />
              <button className="btn-primary h-12 gap-3 disabled:cursor-not-allowed disabled:opacity-70" type="submit" disabled={isTracking}>
                <PackageCheck size={18} /> {isTracking ? 'Tracking...' : 'Track Order'}
              </button>
            </div>
            {feedback.message && (
              <p className={`mt-4 rounded border px-4 py-3 text-sm font-semibold ${
                feedback.type === 'success'
                  ? 'border-[#b7d8b2] bg-[#f3fbef] text-[#15803d]'
                  : 'border-[#f4b8c1] bg-[#fff1f3] text-rosewood'
              }`}>
                {feedback.message}
              </p>
            )}
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

function OrderHeader({ order }) {
  return (
    <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
      <div>
        <h2 className="font-serif text-3xl">Order Status</h2>
        <p className="mt-4 font-semibold">
          Order ID: <span className="font-extrabold">{order.orderNumber}</span>
          <span className="ml-3 rounded bg-[#d8f4dc] px-4 py-1 text-xs font-bold text-[#159447]">{order.status}</span>
        </p>
        <p className="mt-2 text-sm text-neutral-600">Placed on {order.placedAt}</p>
      </div>
      <button className="inline-flex h-11 items-center justify-center gap-2 rounded border border-[#ded3c9] px-5 text-sm font-semibold">
        <Printer size={17} /> Print Order Details
      </button>
    </div>
  );
}

function OrderTimeline({ timelineItems }) {
  return (
    <div className="mt-8 grid gap-6 md:grid-cols-5">
      {timelineItems.map(({ icon: Icon, title, date, time }, index) => (
        <div className="relative text-center" key={title}>
          {index < timelineItems.length - 1 && <span className="absolute left-1/2 top-8 hidden h-0.5 w-full bg-[#22b84f] md:block" />}
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

function OrderDetails({ order }) {
  return (
    <section className="rounded-lg border border-[#eadfd8] bg-white p-5">
      <div className="grid gap-7 xl:grid-cols-[0.9fr_1fr]">
        <div>
          <h3 className="font-bold">Order Details</h3>
          <div className="mt-5 space-y-5">
            {order.customerDetails.map(({ icon: Icon, label, value }) => (
              <div className="grid grid-cols-[24px_1fr_1.25fr] gap-3 text-sm" key={label}>
                <Icon size={17} className="text-[#2f6690]" />
                <span className="font-semibold text-neutral-700">{label}</span>
                <span className="leading-6">{value}</span>
              </div>
            ))}
          </div>
        </div>
        <div className="border-[#eadfd8] xl:border-l xl:pl-7">
          <h3 className="font-bold">Items ({order.items.length})</h3>
          <div className="mt-5 space-y-4">
            {order.items.map((item) => (
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
            {order.totals.map(([label, value, danger = false]) => (
              <Line label={label} value={value} danger={danger} key={label} />
            ))}
            <div className="flex justify-between border-t border-dashed border-[#d9ccc2] pt-4 text-xl font-extrabold">
              <span>Total Amount</span>
              <span>{order.totalAmount}</span>
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

function DeliveryAside({ info }) {
  return (
    <aside className="space-y-5">
      <section className="rounded-lg border border-[#eadfd8] bg-white p-5">
        <h3 className="font-bold">Delivery Information</h3>
        <div className="mt-5 rounded bg-[#ddf7df] p-4 text-sm">
          <p className="flex items-center gap-2 font-bold text-[#12833c]">
            <PackageCheck size={18} /> {info.status}
          </p>
          <p className="mt-2 text-neutral-700">{info.message}</p>
        </div>
        <Info label="Last Updated" value={info.deliveredOn} />
        <Info label="Customer" value={info.receivedBy} />
        <Info label="Notes" value={info.notes} />
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

function formatApiOrder(order) {
  const status = titleCase(order.orderStatus || 'pending');
  const createdAt = order.createdAt ? new Date(order.createdAt) : new Date();
  const timelineItems = order.timeline?.length
    ? order.timeline.map((entry) => {
        const date = entry.date ? new Date(entry.date) : createdAt;
        return {
          icon: statusIcon(entry.status),
          title: titleCase(entry.status),
          date: formatDate(date),
          time: formatTime(date),
        };
      })
    : [{ icon: ClipboardCheck, title: 'Order Placed', date: formatDate(createdAt), time: formatTime(createdAt) }];

  return {
    orderNumber: order.orderNumber,
    status,
    placedAt: `${formatDate(createdAt)} at ${formatTime(createdAt)}`,
    timeline: timelineItems,
    customerDetails: [
      { icon: UserRound, label: 'Customer Name', value: order.customer?.fullName || 'Customer' },
      { icon: Mail, label: 'Email', value: order.customer?.email || 'Not provided' },
      { icon: Phone, label: 'Phone', value: order.customer?.phone || 'Not provided' },
      { icon: MapPin, label: 'Shipping Address', value: formatAddress(order.delivery) },
      { icon: Truck, label: 'Shipping Method', value: 'Standard Delivery' },
      { icon: CreditCard, label: 'Payment Method', value: titleCase(order.paymentStatus || 'pending') },
    ],
    items: (order.items || []).map((item) => ({
      name: item.productName,
      meta: `Size: ${item.size || '-'}  |  Color: ${item.colour?.name || 'Selected color'}`,
      price: formatCurrency(item.price),
      accent: 'from-[#f1cbc8] to-[#d39b99]',
    })),
    totals: [
      [`Subtotal (${order.items?.length || 0} Items)`, formatCurrency(order.totalAmount || 0)],
      ['Shipping Charge', 'To be confirmed'],
    ],
    totalAmount: formatCurrency(order.totalAmount || 0),
    deliveryInfo: {
      status,
      message: deliveryMessage(status),
      deliveredOn: timelineItems.at(-1)?.date ? `${timelineItems.at(-1).date} at ${timelineItems.at(-1).time}` : 'Pending update',
      receivedBy: order.customer?.fullName || 'Customer',
      notes: order.delivery?.note || 'No delivery notes.',
    },
  };
}

function formatAddress(delivery = {}) {
  return [delivery.address, delivery.city, delivery.district].filter(Boolean).join(', ') || 'Not provided';
}

function formatCurrency(value) {
  return `LKR ${Number(value || 0).toLocaleString('en-US')}`;
}

function formatDate(date) {
  return new Intl.DateTimeFormat('en-US', { month: 'short', day: 'numeric', year: 'numeric' }).format(date);
}

function formatTime(date) {
  return new Intl.DateTimeFormat('en-US', { hour: '2-digit', minute: '2-digit' }).format(date);
}

function titleCase(value = '') {
  return value
    .split(/[-_\s]+/)
    .filter(Boolean)
    .map((word) => `${word.charAt(0).toUpperCase()}${word.slice(1)}`)
    .join(' ');
}

function statusIcon(status = '') {
  const icons = {
    pending: ClipboardCheck,
    confirmed: Package,
    processing: Package,
    shipped: Truck,
    delivered: ShoppingBag,
    cancelled: PackageCheck,
  };

  return icons[status] || ClipboardCheck;
}

function deliveryMessage(status) {
  if (status === 'Delivered') {
    return 'Your order has been delivered successfully.';
  }

  if (status === 'Cancelled') {
    return 'This order has been cancelled. Please contact support for help.';
  }

  return 'Your order is being handled by the Shara Shopping team.';
}
