import { useEffect, useMemo, useState } from 'react';
import { useParams } from 'react-router-dom';
import {
  ArrowLeft,
  Box,
  ChevronDown,
  ClipboardCheck,
  Download,
  Edit3,
  Home,
  LogOut,
  Mail,
  MapPin,
  MoreVertical,
  Package,
  PackageCheck,
  Printer,
  RefreshCw,
  Search,
  Send,
  Settings,
  ShoppingBag,
  Star,
  Timer,
  Truck,
  UserRound,
  UsersRound,
  XCircle,
} from 'lucide-react';
import { getOrderById, updateOrderStatus } from '../services/orderService.js';

const nav = [
  [Home, 'Dashboard', '/admin/dashboard'],
  [ClipboardCheck, 'Orders', '/admin/orders'],
  [Package, 'Products', '/admin/products'],
  [Box, 'Categories', '#categories'],
  [UsersRound, 'Customers', '/admin/customers'],
  [PackageCheck, 'Inventory', '#inventory'],
  [Star, 'Reviews', '#reviews'],
  [Settings, 'Settings', '/admin/settings'],
  [UsersRound, 'Users', '#users'],
  [LogOut, 'Logout', '#logout'],
];

const demoOrder = {
  id: '#SH2505261',
  customer: {
    name: 'Heshani Perera',
    email: 'heshani@gmail.com',
    phone: '077 123 4567',
  },
  deliveryAddress: '23/4, Flower Road, Borella, Colombo 08, Sri Lanka',
  details: [
    ['Order Date', 'May 26, 2025 10:30 AM'],
    ['Payment Method', 'Card'],
    ['Payment Status', 'Paid'],
    ['Shipping Method', 'Standard Delivery'],
    ['Order Status', 'Delivered'],
  ],
  delivery: [
    ['Recipient Name', 'Heshani Perera'],
    ['Phone', '077 123 4567'],
    ['Address', '23/4, Flower Road, Borella, Colombo 08, Sri Lanka'],
    ['Delivered On', 'May 28, 2025 11:45 AM'],
  ],
  timeline: [
    ['Order Placed', 'May 26, 2025 10:30 AM', 'bg-[#17a34a]'],
    ['Payment Confirmed', 'May 26, 2025 10:31 AM', 'bg-[#17a34a]'],
    ['Processing', 'May 26, 2025 02:15 PM', 'bg-[#f59e0b]'],
    ['Shipped', 'May 27, 2025 05:20 PM', 'bg-[#7c3aed]'],
    ['Delivered', 'May 28, 2025 11:45 AM', 'bg-[#17a34a]'],
  ],
  items: [
    ['Floral Chiffon Midi Dress', 'DRE-CHIF-001', 'Size: M  |  Color: Peach', 'LKR 5,625', '1', 'LKR 5,625', 'figure-floral'],
    ['Lace Overlay Mini Dress', 'DRE-LACE-002', 'Size: S  |  Color: Mint Green', 'LKR 5,250', '1', 'LKR 5,250', 'figure-sage'],
    ['One Shoulder Satin Dress', 'DRE-SATIN-003', 'Size: M  |  Color: Pink', 'LKR 5,475', '1', 'LKR 5,475', 'figure-blush'],
  ],
  subtotal: 'LKR 16,350',
  discount: '- LKR 1,635',
  shipping: 'LKR 250',
  tax: 'LKR 2,813',
  total: 'LKR 18,900',
  paymentStatus: 'Paid',
  paymentMethod: 'Card',
  status: 'Delivered',
  notes: 'Please deliver in the morning if possible. Call before delivery.',
  customerNotes: 'I love this collection! Thank you so much.',
};

export default function ViewOrderDetailsPage() {
  const { orderId } = useParams();
  const [order, setOrder] = useState(demoOrder);
  const [isLoading, setIsLoading] = useState(true);
  const [apiError, setApiError] = useState('');
  const [notice, setNotice] = useState('');
  const [isUpdatingStatus, setIsUpdatingStatus] = useState(false);

  useEffect(() => {
    let isMounted = true;

    const loadOrder = async () => {
      setIsLoading(true);
      setApiError('');
      setNotice('');

      try {
        const data = await getOrderById(orderId);

        if (isMounted) {
          setOrder(mapApiOrder(data));
        }
      } catch (error) {
        if (isMounted) {
          setOrder(demoOrder);
          setApiError('Showing demo order details until admin API access is available.');
        }
      } finally {
        if (isMounted) {
          setIsLoading(false);
        }
      }
    };

    loadOrder();

    return () => {
      isMounted = false;
    };
  }, [orderId]);

  const statusClass = useMemo(() => getStatusClass(order.status), [order.status]);

  const handleUpdateStatus = async ({ note, status }) => {
    const apiOrderId = order.apiId || order.id.replace(/^#/, '');

    if (!order.apiId) {
      setApiError('Demo orders cannot be updated. Connect the backend order first.');
      return;
    }

    setIsUpdatingStatus(true);
    setApiError('');
    setNotice('');

    try {
      const updatedOrder = await updateOrderStatus(apiOrderId, { note, status });
      setOrder(mapApiOrder(updatedOrder));
      setNotice(`Order status updated to ${formatStatus(status)}.`);
    } catch (error) {
      setApiError(error.response?.data?.message || 'Unable to update order status. Check admin access and try again.');
    } finally {
      setIsUpdatingStatus(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#fbf7f4] text-ink">
      <div className="grid lg:grid-cols-[280px_1fr]">
        <Sidebar />
        <main className="min-w-0">
          <Topbar />
          <div className="px-4 py-6 sm:px-8">
            <div className="flex flex-col gap-4 xl:flex-row xl:items-center xl:justify-between">
              <div>
                <a className="inline-flex h-11 items-center gap-2 rounded border border-[#ded3c9] bg-white px-4 text-sm font-semibold" href="/admin/orders">
                  <ArrowLeft size={17} /> Back to Orders
                </a>
                <h1 className="mt-5 text-3xl font-extrabold">Order Details</h1>
                <p className="mt-2 text-xl font-semibold">
                  Order ID: <span className="font-extrabold">{order.id}</span>
                  <span className={`ml-4 rounded px-4 py-1 text-sm font-bold ${statusClass}`}>{order.status}</span>
                </p>
              </div>
              <div className="flex flex-wrap gap-3">
                <button className="inline-flex h-11 items-center gap-2 rounded border border-[#ded3c9] bg-white px-5 font-semibold">
                  <Printer size={17} /> Print Invoice
                </button>
                <button className="btn-primary h-11 gap-2">
                  <MoreVertical size={17} /> More Actions <ChevronDown size={16} />
                </button>
              </div>
            </div>

            {(isLoading || apiError || notice) && (
              <div className={`mt-6 rounded-lg px-4 py-3 text-sm font-semibold ${apiError ? 'bg-[#fff3d8] text-[#9b6613]' : notice ? 'bg-[#dcf5ea] text-[#15945d]' : 'bg-blush text-rosewood'}`}>
                {isLoading ? 'Loading order details...' : notice || apiError}
              </div>
            )}

            <div className="mt-6 grid gap-6 xl:grid-cols-[1fr_340px]">
              <div className="space-y-6">
                <InfoGrid order={order} />
                <OrderItems order={order} />
              </div>
              <Aside isUpdatingStatus={isUpdatingStatus} onUpdateStatus={handleUpdateStatus} order={order} />
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}

function Sidebar() {
  return (
    <aside className="hidden min-h-screen border-r border-[#eadfd8] bg-[#fff8f4] px-5 py-7 lg:block">
      <h2 className="font-serif text-4xl text-[#7a4c29]">Shara Shopping</h2>
      <p className="mt-3 text-xs font-extrabold uppercase tracking-[0.34em]">Admin Panel</p>
      <nav className="mt-10 space-y-2">
        {nav.map(([Icon, label, href]) => (
          <a className={`flex h-12 items-center gap-4 rounded-lg px-4 text-sm font-semibold ${label === 'Orders' ? 'bg-blush text-rosewood' : 'hover:bg-white'}`} href={href} key={label}>
            <Icon size={19} /> {label}
          </a>
        ))}
      </nav>
      <div className="mt-10 overflow-hidden rounded-lg bg-blush p-4">
        <div className="relative h-44 rounded bg-gradient-to-br from-[#f6d7c7] to-[#d99c7e]">
          <span className="product-silhouette figure-blush !h-[92%] !w-[34%]" />
        </div>
        <p className="mt-4 font-serif text-lg leading-7">Style is a way to say who you are without speaking.</p>
        <p className="mt-3 text-sm font-semibold text-rosewood">- Admin</p>
      </div>
    </aside>
  );
}

function Topbar() {
  return (
    <header className="flex flex-wrap items-center justify-between gap-4 border-b border-[#eadfd8] bg-white px-4 py-5 sm:px-8">
      <div className="flex items-center gap-5">
        <button className="icon-button bg-white" aria-label="Open admin menu"><MoreVertical size={23} /></button>
        <label className="relative block w-[min(520px,60vw)]">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-neutral-500" size={19} />
          <input className="h-12 w-full rounded-lg border border-[#eadfd8] bg-[#fbfaf9] px-12 outline-none focus:border-rosewood" placeholder="Search orders, customers, products..." />
        </label>
      </div>
      <div className="flex items-center gap-3">
        <span className="relative grid h-12 w-12 place-items-center rounded-full bg-gradient-to-br from-[#f1cbc8] to-[#d39b99]">
          <span className="product-silhouette figure-blush !h-[88%] !w-[38%]" />
        </span>
        <div><p className="font-bold">Admin</p><p className="text-sm text-neutral-600">Super Admin</p></div>
        <ChevronDown size={17} />
      </div>
    </header>
  );
}

function InfoGrid({ order }) {
  return (
    <section className="grid gap-6 rounded-lg border border-[#eadfd8] bg-white p-6 shadow-sm xl:grid-cols-4">
      <InfoBlock title="Customer Information" icon={UserRound}>
        <div className="flex gap-4">
          <span className="relative h-16 w-16 shrink-0 overflow-hidden rounded-full bg-gradient-to-br from-[#f1cbc8] to-[#d39b99]">
            <span className="product-silhouette figure-blush !h-[90%] !w-[38%]" />
          </span>
          <div>
            <p className="font-bold">{order.customer.name}</p>
            <p className="text-sm text-neutral-600">{order.customer.email || 'No email'}</p>
            <p className="text-sm text-neutral-600">{order.customer.phone}</p>
          </div>
        </div>
        <p className="mt-6 flex gap-3 leading-6"><MapPin className="shrink-0 text-rosewood" size={18} />{order.deliveryAddress}</p>
      </InfoBlock>
      <InfoBlock title="Order Information" icon={ClipboardCheck}>
        {order.details.map(([label, value]) => <Detail label={label} value={value} key={label} />)}
      </InfoBlock>
      <InfoBlock title="Delivery Information" icon={Truck}>
        {order.delivery.map(([label, value]) => <Detail label={label} value={value} key={label} />)}
      </InfoBlock>
      <InfoBlock title="Order Timeline" icon={Timer}>
        <div className="space-y-4">
          {order.timeline.map(([title, time, color]) => (
            <div className="grid grid-cols-[16px_1fr] gap-4" key={title}>
              <span className={`mt-1 h-3 w-3 rounded-full ${color}`} />
              <div><p className="font-bold">{title}</p><p className="text-sm text-neutral-600">{time}</p></div>
            </div>
          ))}
        </div>
      </InfoBlock>
    </section>
  );
}

function InfoBlock({ title, icon: Icon, children }) {
  return (
    <div className="border-[#eadfd8] xl:border-r xl:pr-5 xl:last:border-r-0">
      <h2 className="mb-5 flex items-center gap-3 font-bold"><Icon size={18} /> {title}</h2>
      {children}
    </div>
  );
}

function Detail({ label, value }) {
  return (
    <div className="mb-4">
      <p className="font-bold">{label}</p>
      <p className="mt-1 text-neutral-700">{value}</p>
    </div>
  );
}

function OrderItems({ order }) {
  return (
    <section className="rounded-lg border border-[#eadfd8] bg-white p-6 shadow-sm">
      <h2 className="text-xl font-bold">Order Items</h2>
      <div className="mt-5 overflow-x-auto">
        <table className="w-full min-w-[760px] text-left text-sm">
          <thead>
            <tr className="border-b border-[#eadfd8]">
              <th className="py-3">Product</th>
              <th>Price</th>
              <th>Quantity</th>
              <th className="text-right">Total</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-[#eadfd8]">
            {order.items.map(([name, sku, meta, price, qty, total, figure]) => (
              <tr key={sku}>
                <td className="py-4">
                  <div className="flex items-center gap-4">
                    <span className="relative h-16 w-14 shrink-0 overflow-hidden rounded bg-gradient-to-br from-[#f6d7c7] to-[#d99c7e]">
                      <span className={`product-silhouette ${figure} !h-[90%] !w-[42%]`} />
                    </span>
                    <div><p className="font-bold">{name}</p><p className="text-neutral-600">SKU: {sku}</p><p className="text-neutral-600">{meta}</p></div>
                  </div>
                </td>
                <td>{price}</td>
                <td>{qty}</td>
                <td className="text-right font-semibold">{total}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <div className="ml-auto mt-5 max-w-sm space-y-3 text-sm">
        <Line label="Subtotal" value={order.subtotal} />
        <Line label="Discount" value={order.discount} danger />
        <Line label="Shipping Charge" value={order.shipping} />
        <Line label="Tax" value={order.tax} />
        <div className="flex justify-between border-t border-dashed border-[#d9ccc2] pt-4 text-xl font-extrabold"><span>Total Amount</span><span>{order.total}</span></div>
      </div>
    </section>
  );
}

function Aside({ isUpdatingStatus, onUpdateStatus, order }) {
  return (
    <aside className="space-y-5">
      <Card title="Order Summary">
        <Line label={`Subtotal (${order.items.length} Items)`} value={order.subtotal} />
        <Line label="Discount" value={order.discount} danger />
        <Line label="Shipping Charge" value={order.shipping} />
        <Line label="Tax" value={order.tax} />
        <div className="mt-4 flex justify-between border-t border-dashed border-[#d9ccc2] pt-4 text-xl font-extrabold"><span>Total Amount</span><span>{order.total}</span></div>
        <p className="mt-4"><span className={`rounded px-4 py-1 text-sm font-bold ${getStatusClass(order.paymentStatus)}`}>{order.paymentStatus}</span> <span className="text-neutral-600">via {order.paymentMethod}</span></p>
        <button className="mt-5 inline-flex h-11 w-full items-center justify-center gap-2 rounded border border-[#ded3c9] font-semibold"><Download size={17} /> Download Invoice</button>
      </Card>
      <Card title="Notes" action={<Edit3 size={17} />}>
        <p className="leading-6 text-neutral-700">{order.notes}</p>
      </Card>
      <Card title="Customer Notes">
        <p className="leading-6 text-neutral-700">{order.customerNotes}</p>
      </Card>
      <Card title="Order Actions">
        <StatusUpdater currentStatus={order.statusKey || order.status.toLowerCase()} isUpdating={isUpdatingStatus} onUpdateStatus={onUpdateStatus} />
        <Action icon={Truck} label="Track Order" />
        <Action icon={Mail} label="Send Email to Customer" />
        <Action icon={XCircle} label="Cancel Order" danger />
      </Card>
    </aside>
  );
}

function Card({ title, children, action }) {
  return (
    <section className="rounded-lg border border-[#eadfd8] bg-white p-6 shadow-sm">
      <div className="mb-4 flex items-center justify-between"><h2 className="text-xl font-bold">{title}</h2>{action && <button className="icon-button border border-[#ded3c9]">{action}</button>}</div>
      <div className="space-y-3">{children}</div>
    </section>
  );
}

function Action({ icon: Icon, label, danger = false }) {
  return <button className={`inline-flex h-11 w-full items-center gap-3 rounded border px-4 font-semibold ${danger ? 'border-rosewood text-rosewood' : 'border-[#ded3c9]'}`}><Icon size={17} /> {label}</button>;
}

function StatusUpdater({ currentStatus, isUpdating, onUpdateStatus }) {
  const [status, setStatus] = useState(currentStatus);
  const [note, setNote] = useState('Status updated by admin.');

  useEffect(() => {
    setStatus(currentStatus);
  }, [currentStatus]);

  return (
    <div className="rounded border border-[#ded3c9] p-3">
      <label>
        <span className="form-label">Order Status</span>
        <span className="relative mt-2 block">
          <select className="form-control appearance-none pr-11" value={status} onChange={(event) => setStatus(event.target.value)}>
            {['pending', 'confirmed', 'processing', 'shipped', 'delivered', 'cancelled'].map((option) => (
              <option key={option} value={option}>{formatStatus(option)}</option>
            ))}
          </select>
          <ChevronDown className="pointer-events-none absolute right-4 top-1/2 -translate-y-1/2" size={17} />
        </span>
      </label>
      <label className="mt-3 block">
        <span className="form-label">Status Note</span>
        <textarea className="form-control mt-2 min-h-20 py-3" value={note} onChange={(event) => setNote(event.target.value)} />
      </label>
      <button className="btn-primary mt-3 h-11 w-full gap-2" disabled={isUpdating} onClick={() => onUpdateStatus({ note, status })} type="button">
        <RefreshCw size={17} /> {isUpdating ? 'Updating...' : 'Update Order Status'}
      </button>
    </div>
  );
}

function Line({ label, value, danger = false }) {
  return <div className="flex justify-between"><span>{label}</span><span className={danger ? 'font-bold text-rosewood' : 'font-semibold'}>{value}</span></div>;
}

function mapApiOrder(order) {
  const createdAt = order.createdAt ? new Date(order.createdAt) : null;
  const deliveryAddress = [
    order.delivery?.address,
    order.delivery?.city,
    order.delivery?.district,
  ].filter(Boolean).join(', ');
  const items = order.items?.length ? order.items.map(mapApiItem) : demoOrder.items;
  const subtotalValue = items.reduce((total, item) => total + item[6], 0);
  const totalValue = Number(order.totalAmount || subtotalValue);
  const status = formatStatus(order.orderStatus || 'pending');
  const paymentStatus = formatStatus(order.paymentStatus || 'pending');
  const timeline = order.timeline?.length
    ? order.timeline.map((entry) => [
        formatStatus(entry.status || 'pending'),
        entry.date ? formatDateTime(new Date(entry.date)) : 'Recently',
        getTimelineColor(entry.status),
      ])
    : [['Order Placed', createdAt ? formatDateTime(createdAt) : 'Recently', 'bg-[#17a34a]']];

  return {
    apiId: order._id,
    id: `#${order.orderNumber}`,
    customer: {
      name: order.customer?.fullName || 'Customer',
      email: order.customer?.email || '',
      phone: order.customer?.phone || '',
    },
    deliveryAddress: deliveryAddress || 'Delivery address not added.',
    details: [
      ['Order Date', createdAt ? formatDateTime(createdAt) : 'Recently'],
      ['Payment Method', formatStatus(order.contactMethod || 'whatsapp')],
      ['Payment Status', paymentStatus],
      ['Shipping Method', 'Standard Delivery'],
      ['Order Status', status],
    ],
    delivery: [
      ['Recipient Name', order.customer?.fullName || 'Customer'],
      ['Phone', order.customer?.phone || 'Not added'],
      ['Address', deliveryAddress || 'Delivery address not added.'],
      ['Delivery Note', order.delivery?.note || 'No delivery note'],
    ],
    timeline,
    items: items.map((item) => item.slice(0, 7)),
    subtotal: formatCurrency(subtotalValue),
    discount: formatCurrency(0),
    shipping: formatCurrency(0),
    tax: formatCurrency(0),
    total: formatCurrency(totalValue),
    paymentStatus,
    paymentMethod: formatStatus(order.contactMethod || 'whatsapp'),
    status,
    statusKey: order.orderStatus || 'pending',
    notes: order.adminNotes || 'No admin notes added yet.',
    customerNotes: order.delivery?.note || 'No customer notes added yet.',
  };
}

function mapApiItem(item, index) {
  const figures = ['figure-floral', 'figure-sage', 'figure-blush', 'figure-champagne', 'figure-maroon'];
  const quantity = Number(item.quantity || 1);
  const price = Number(item.price || 0);
  const meta = [
    item.size ? `Size: ${item.size}` : '',
    item.colour?.name ? `Color: ${item.colour.name}` : '',
  ].filter(Boolean).join('  |  ');

  return [
    item.productName,
    item.sku || 'N/A',
    meta || 'No options selected',
    formatCurrency(price),
    String(quantity),
    formatCurrency(price * quantity),
    figures[index % figures.length],
    price * quantity,
  ];
}

function formatCurrency(value) {
  return new Intl.NumberFormat('en-LK', {
    currency: 'LKR',
    maximumFractionDigits: 0,
    style: 'currency',
  }).format(value || 0);
}

function formatDateTime(value) {
  return new Intl.DateTimeFormat('en-US', {
    day: 'numeric',
    hour: 'numeric',
    minute: '2-digit',
    month: 'short',
    year: 'numeric',
  }).format(value);
}

function formatStatus(value) {
  return value
    .split('-')
    .map((part) => part.charAt(0).toUpperCase() + part.slice(1))
    .join(' ');
}

function getStatusClass(status) {
  const styles = {
    Cancelled: 'bg-[#ffe0e8] text-[#c83248]',
    Confirmed: 'bg-[#e2f1ff] text-[#1d68c4]',
    Delivered: 'bg-[#d8f8df] text-[#12833c]',
    Paid: 'bg-[#d8f8df] text-[#12833c]',
    Pending: 'bg-[#fff0d8] text-[#c76b11]',
    Processing: 'bg-[#fff0d8] text-[#c76b11]',
    Shipped: 'bg-[#e2e8ff] text-[#5841c6]',
  };

  return styles[status] || styles.Pending;
}

function getTimelineColor(status) {
  const colors = {
    cancelled: 'bg-[#c83248]',
    confirmed: 'bg-[#1d68c4]',
    delivered: 'bg-[#17a34a]',
    pending: 'bg-[#f59e0b]',
    processing: 'bg-[#f59e0b]',
    shipped: 'bg-[#7c3aed]',
  };

  return colors[status] || colors.pending;
}
