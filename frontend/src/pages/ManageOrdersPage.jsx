import { useEffect, useMemo, useState } from 'react';
import {
  Box,
  CalendarDays,
  ChevronDown,
  ChevronLeft,
  ChevronRight,
  ClipboardCheck,
  Eye,
  Filter,
  Home,
  LogOut,
  Menu,
  MoreVertical,
  Package,
  PackageCheck,
  RefreshCcw,
  Search,
  Settings,
  ShoppingBag,
  Star,
  Tag,
  Timer,
  UserRound,
  UsersRound,
  XCircle,
} from 'lucide-react';
import { getOrders } from '../services/orderService.js';

const nav = [
  [Home, 'Dashboard', '/admin/dashboard'],
  [ClipboardCheck, 'Orders', '/admin/orders'],
  [Package, 'Products', '/admin/products'],
  [Box, 'Categories', '/admin/categories'],
  [UsersRound, 'Customers', '/admin/customers'],
  [Tag, 'Offers & Coupons', '#offers'],
  [PackageCheck, 'Inventory', '#inventory'],
  [Star, 'Reviews', '#reviews'],
  [Timer, 'Reports', '#reports'],
  [Settings, 'Settings', '/admin/settings'],
  [UsersRound, 'Users', '#users'],
  [LogOut, 'Logout', '#logout'],
];

const rows = [
  ['#SH2505261', 'Heshani Perera', 'heshani@gmail.com', '077 123 4567', 'May 26, 2025', '10:30 AM', '3 Items', 'LKR 18,900', 'Paid', 'Card', 'Delivered', 'May 28, 2025'],
  ['#SH2505260', 'Nethmi Fernando', 'nethmi@gmail.com', '077 234 5678', 'May 26, 2025', '09:15 AM', '2 Items', 'LKR 7,450', 'Paid', 'Card', 'Processing', ''],
  ['#SH2505259', 'Dinuli Rathnayake', 'dinuli@gmail.com', '077 345 6789', 'May 25, 2025', '08:45 PM', '1 Item', 'LKR 12,300', 'Paid', 'COD', 'Shipped', 'May 26, 2025'],
  ['#SH2505258', 'Sewmini Jayawardena', 'sewmini@gmail.com', '077 456 7890', 'May 25, 2025', '06:20 PM', '2 Items', 'LKR 5,950', 'Paid', 'Card', 'Cancelled', ''],
  ['#SH2505257', 'Tharushi Silva', 'tharushi@gmail.com', '077 567 8901', 'May 24, 2025', '04:10 PM', '4 Items', 'LKR 14,800', 'Pending', 'Bank Transfer', 'Pending', ''],
  ['#SH2505256', 'Maleesha Bandara', 'maleesha@gmail.com', '077 678 9012', 'May 24, 2025', '02:05 PM', '1 Item', 'LKR 4,200', 'Paid', 'Card', 'Delivered', 'May 25, 2025'],
].map(([id, customer, email, phone, date, time, itemCount, amount, payment, method, status, statusDate]) => ({
  id,
  customer,
  email,
  phone,
  date,
  time,
  itemCount,
  amount,
  amountNumber: Number(amount.replace(/[^0-9]/g, '')),
  payment,
  paymentKey: payment.toLowerCase(),
  method,
  status,
  statusKey: status.toLowerCase(),
  statusDate,
}));

export default function ManageOrdersPage() {
  const [orders, setOrders] = useState(rows);
  const [filters, setFilters] = useState({
    search: '',
    status: 'all',
    paymentStatus: 'all',
  });
  const [isLoading, setIsLoading] = useState(true);
  const [apiError, setApiError] = useState('');

  useEffect(() => {
    let isMounted = true;

    const loadOrders = async () => {
      setIsLoading(true);
      setApiError('');

      try {
        const data = await getOrders({
          search: filters.search || undefined,
          status: filters.status,
          paymentStatus: filters.paymentStatus,
        });

        if (isMounted) {
          setOrders(data.map(mapApiOrder));
        }
      } catch (error) {
        if (isMounted) {
          setOrders(rows);
          setApiError('Showing demo orders until admin API access is available.');
        }
      } finally {
        if (isMounted) {
          setIsLoading(false);
        }
      }
    };

    loadOrders();

    return () => {
      isMounted = false;
    };
  }, [filters]);

  const stats = useMemo(() => buildStats(orders), [orders]);

  return (
    <div className="min-h-screen bg-[#fbf7f4] text-ink">
      <div className="grid lg:grid-cols-[280px_1fr]">
        <OrdersSidebar />
        <main className="min-w-0">
          <OrdersTopbar />
          <div className="px-4 py-7 sm:px-8">
            <h1 className="text-3xl font-extrabold">Manage Orders</h1>
            <p className="mt-3 text-sm text-neutral-600">Dashboard <span className="mx-2">›</span> Orders</p>
            <Stats stats={stats} />
            <Filters filters={filters} setFilters={setFilters} />
            <OrdersTable apiError={apiError} isLoading={isLoading} orders={orders} />
          </div>
        </main>
      </div>
    </div>
  );
}

function OrdersSidebar() {
  return (
    <aside className="hidden min-h-screen border-r border-[#eadfd8] bg-[#fff8f4] px-5 py-7 lg:block">
      <h2 className="font-serif text-4xl text-[#7a4c29]">Shara Shopping</h2>
      <p className="mt-3 text-xs font-extrabold uppercase tracking-[0.34em]">Admin Panel</p>
      <nav className="mt-10 space-y-2">
        {nav.map(([Icon, label, href]) => (
          <a
            className={`flex h-12 items-center gap-4 rounded-lg px-4 text-sm font-semibold ${
              label === 'Orders' ? 'bg-blush text-rosewood' : 'hover:bg-white'
            }`}
            href={href}
            key={label}
          >
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

function OrdersTopbar() {
  return (
    <header className="flex flex-wrap items-center justify-between gap-4 border-b border-[#eadfd8] bg-white px-4 py-5 sm:px-8">
      <div className="flex items-center gap-5">
        <button className="icon-button bg-white" aria-label="Open admin menu"><Menu size={24} /></button>
        <label className="relative block w-[min(520px,60vw)]">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-neutral-500" size={19} />
          <input className="h-12 w-full rounded-lg border border-[#eadfd8] bg-[#fbfaf9] px-12 outline-none focus:border-rosewood" placeholder="Search orders, customers, products..." />
        </label>
      </div>
      <div className="flex items-center gap-5">
        <button className="relative icon-button bg-white shadow-sm" aria-label="Notifications">
          <Timer size={20} />
          <span className="absolute -right-1 -top-1 grid h-5 w-5 place-items-center rounded-full bg-rosewood text-xs font-bold text-white">5</span>
        </button>
        <div className="flex items-center gap-3">
          <span className="relative grid h-12 w-12 place-items-center rounded-full bg-gradient-to-br from-[#f1cbc8] to-[#d39b99]">
            <span className="product-silhouette figure-blush !h-[88%] !w-[38%]" />
          </span>
          <div>
            <p className="font-bold">Admin</p>
            <p className="text-sm text-neutral-600">Super Admin</p>
          </div>
          <ChevronDown size={17} />
        </div>
      </div>
    </header>
  );
}

function Stats({ stats }) {
  return (
    <section className="mt-7 grid gap-4 md:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-6">
      {stats.map(({ icon: Icon, label, value, color }) => (
        <article className="rounded-lg border border-[#eadfd8] bg-white p-5 shadow-sm" key={label}>
          <div className="flex items-center gap-4">
            <span className={`grid h-14 w-14 place-items-center rounded-full ${color}`}><Icon size={27} /></span>
            <div>
              <p className="text-sm text-neutral-700">{label}</p>
              <p className="mt-2 text-2xl font-extrabold">{value}</p>
            </div>
          </div>
        </article>
      ))}
    </section>
  );
}

function Filters({ filters, setFilters }) {
  const updateFilter = (key, value) => {
    setFilters((current) => ({ ...current, [key]: value }));
  };

  const resetFilters = () => {
    setFilters({ search: '', status: 'all', paymentStatus: 'all' });
  };

  return (
    <section className="mt-6 rounded-lg border border-[#eadfd8] bg-white p-5 shadow-sm">
      <div className="grid gap-5 lg:grid-cols-[1.2fr_1fr_0.86fr_0.9fr_auto_auto] lg:items-end">
        <Control
          label="Search Order"
          icon={Search}
          onChange={(event) => updateFilter('search', event.target.value)}
          placeholder="Search by Order ID or Customer..."
          value={filters.search}
        />
        <Control label="Date Range" icon={CalendarDays} placeholder="Select date range" />
        <Select
          label="Order Status"
          onChange={(event) => updateFilter('status', event.target.value)}
          options={[
            ['all', 'All Status'],
            ['pending', 'Pending'],
            ['confirmed', 'Confirmed'],
            ['processing', 'Processing'],
            ['shipped', 'Shipped'],
            ['delivered', 'Delivered'],
            ['cancelled', 'Cancelled'],
          ]}
          value={filters.status}
        />
        <Select
          label="Payment Status"
          onChange={(event) => updateFilter('paymentStatus', event.target.value)}
          options={[
            ['all', 'All Payment Status'],
            ['pending', 'Pending'],
            ['paid', 'Paid'],
            ['cancelled', 'Cancelled'],
          ]}
          value={filters.paymentStatus}
        />
        <button className="h-12 rounded border border-[#ded3c9] px-6 font-semibold" onClick={resetFilters}>Reset</button>
        <button className="btn-primary h-12 gap-2 px-6"><Filter size={17} /> Filter</button>
      </div>
    </section>
  );
}

function Control({ label, icon: Icon, onChange, placeholder, value = '' }) {
  const inputProps = onChange ? { onChange, value } : {};

  return (
    <label>
      <span className="form-label">{label}</span>
      <span className="relative mt-2 block">
        <Icon className="absolute right-4 top-1/2 -translate-y-1/2 text-neutral-500" size={18} />
        <input className="form-control pr-11" placeholder={placeholder} {...inputProps} />
      </span>
    </label>
  );
}

function Select({ label, onChange, options, value }) {
  return (
    <label>
      <span className="form-label">{label}</span>
      <span className="relative mt-2 block">
        <select className="form-control appearance-none pr-11" onChange={onChange} value={value}>
          {options.map(([optionValue, labelText]) => (
            <option key={labelText} value={optionValue}>
              {labelText}
            </option>
          ))}
        </select>
        <ChevronDown className="pointer-events-none absolute right-4 top-1/2 -translate-y-1/2" size={17} />
      </span>
    </label>
  );
}

function OrdersTable({ apiError, isLoading, orders }) {
  return (
    <section className="mt-6 overflow-hidden rounded-lg border border-[#eadfd8] bg-white p-5 shadow-sm">
      {(isLoading || apiError) && (
        <div className={`mb-5 rounded-lg px-4 py-3 text-sm font-semibold ${apiError ? 'bg-[#fff3d8] text-[#9b6613]' : 'bg-blush text-rosewood'}`}>
          {isLoading ? 'Loading orders...' : apiError}
        </div>
      )}
      <div className="overflow-x-auto">
        <table className="w-full min-w-[1080px] text-left text-sm">
          <thead>
            <tr className="border-b border-[#eadfd8] text-neutral-700">
              <th className="w-10 py-4"><span className="block h-4 w-4 rounded border border-[#d8cec4]" /></th>
              <th>Order ID</th>
              <th>Customer</th>
              <th>Date</th>
              <th>Items</th>
              <th>Amount</th>
              <th>Payment</th>
              <th>Status</th>
              <th className="text-right">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-[#eadfd8]">
            {orders.map((row) => (
              <OrderRow row={row} key={row.id} />
            ))}
          </tbody>
        </table>
      </div>
      <div className="flex flex-col gap-4 border-t border-[#eadfd8] pt-5 text-sm text-neutral-600 sm:flex-row sm:items-center sm:justify-between">
        <p>
          Showing {orders.length ? 1 : 0} to {orders.length} of {orders.length} orders
        </p>
        <div className="flex items-center gap-2">
          <PageButton><ChevronLeft size={16} /></PageButton>
          {[1, 2, 3].map((page) => <PageButton active={page === 1} key={page}>{page}</PageButton>)}
          <span className="px-2">...</span>
          <PageButton>126</PageButton>
          <PageButton><ChevronRight size={16} /></PageButton>
          <button className="ml-3 h-10 rounded border border-[#ded3c9] px-4">10 / page <ChevronDown className="inline" size={15} /></button>
        </div>
      </div>
    </section>
  );
}

function OrderRow({ row }) {
  return (
    <tr>
      <td className="py-4"><span className="block h-4 w-4 rounded border border-[#d8cec4]" /></td>
      <td className="font-bold">{row.id}</td>
      <td>
        <div className="flex items-center gap-3">
          <span className="relative h-11 w-11 overflow-hidden rounded-full bg-gradient-to-br from-[#f1cbc8] to-[#d39b99]">
            <span className="product-silhouette figure-blush !h-[90%] !w-[38%]" />
          </span>
          <div>
            <p className="font-semibold">{row.customer}</p>
            <p className="text-neutral-600">{row.email || 'No email'}</p>
            <p className="text-neutral-600">{row.phone}</p>
          </div>
        </div>
      </td>
      <td><p>{row.date}</p><p className="text-neutral-600">{row.time}</p></td>
      <td><p>{row.itemCount}</p><a className="font-semibold text-rosewood" href="#items">View Items</a></td>
      <td className="font-semibold">{row.amount}</td>
      <td><StatusPill status={row.payment} payment /><p className="mt-1 text-neutral-600">{row.method}</p></td>
      <td><StatusPill status={row.status} /><p className="mt-1 text-neutral-600">{row.statusDate}</p></td>
      <td>
        <div className="flex justify-end gap-2">
          <a className="grid h-9 w-9 place-items-center rounded border border-[#ded3c9]" href={`/admin/orders/${row.id.replace('#', '')}`} aria-label={`View ${row.id}`}><Eye size={16} /></a>
          <button className="grid h-9 w-9 place-items-center rounded border border-[#ded3c9]" aria-label={`More actions for ${row.id}`}><MoreVertical size={16} /></button>
        </div>
      </td>
    </tr>
  );
}

function StatusPill({ status, payment = false }) {
  const styles = {
    Confirmed: 'bg-[#e2f1ff] text-[#1d68c4]',
    Delivered: 'bg-[#d8f8df] text-[#12833c]',
    Processing: 'bg-[#fff0d8] text-[#c76b11]',
    Shipped: 'bg-[#e2e8ff] text-[#5841c6]',
    Cancelled: 'bg-[#ffe0e8] text-[#c83248]',
    Pending: 'bg-[#ffe0e8] text-[#c83248]',
    Paid: 'bg-[#d8f8df] text-[#12833c]',
  };
  return <span className={`rounded px-3 py-1 text-xs font-bold ${styles[status] || (payment ? styles.Paid : '')}`}>{status}</span>;
}

function buildStats(orders) {
  const totalSales = orders.reduce((total, order) => total + order.amountNumber, 0);
  const pendingOrders = orders.filter((order) => order.statusKey === 'pending').length;
  const processingOrders = orders.filter((order) => ['confirmed', 'processing', 'shipped'].includes(order.statusKey)).length;
  const deliveredOrders = orders.filter((order) => order.statusKey === 'delivered').length;
  const cancelledOrders = orders.filter((order) => order.statusKey === 'cancelled').length;

  return [
    { icon: ShoppingBag, label: 'Total Orders', value: String(orders.length), color: 'bg-[#fff0df] text-[#bd6c25]' },
    { icon: ShoppingBag, label: 'Total Sales', value: formatCurrency(totalSales), color: 'bg-blush text-rosewood' },
    { icon: Timer, label: 'Pending Orders', value: String(pendingOrders), color: 'bg-[#fff3d8] text-[#cc8b18]' },
    { icon: RefreshCcw, label: 'Processing Orders', value: String(processingOrders), color: 'bg-[#ebe5ff] text-[#6d4dd8]' },
    { icon: PackageCheck, label: 'Delivered Orders', value: String(deliveredOrders), color: 'bg-[#dcf5ea] text-[#15945d]' },
    { icon: XCircle, label: 'Cancelled Orders', value: String(cancelledOrders), color: 'bg-[#ffe0e8] text-[#d61f3a]' },
  ];
}

function mapApiOrder(order) {
  const createdAt = order.createdAt ? new Date(order.createdAt) : null;
  const itemCount = order.items?.reduce((total, item) => total + Number(item.quantity || 1), 0) || 0;
  const status = formatStatus(order.orderStatus || 'pending');
  const payment = formatStatus(order.paymentStatus || 'pending');
  const latestTimeline = order.timeline?.at(-1);

  return {
    id: `#${order.orderNumber}`,
    customer: order.customer?.fullName || 'Customer',
    email: order.customer?.email || '',
    phone: order.customer?.phone || '',
    date: createdAt ? formatDate(createdAt) : 'Recently',
    time: createdAt ? formatTime(createdAt) : '',
    itemCount: `${itemCount} ${itemCount === 1 ? 'Item' : 'Items'}`,
    amount: formatCurrency(order.totalAmount),
    amountNumber: order.totalAmount || 0,
    payment,
    paymentKey: order.paymentStatus || 'pending',
    method: formatStatus(order.contactMethod || 'whatsapp'),
    status,
    statusKey: order.orderStatus || 'pending',
    statusDate: latestTimeline?.date ? formatDate(new Date(latestTimeline.date)) : '',
  };
}

function formatCurrency(value) {
  return new Intl.NumberFormat('en-LK', {
    currency: 'LKR',
    maximumFractionDigits: 0,
    style: 'currency',
  }).format(value || 0);
}

function formatDate(value) {
  return new Intl.DateTimeFormat('en-US', {
    day: 'numeric',
    month: 'short',
    year: 'numeric',
  }).format(value);
}

function formatTime(value) {
  return new Intl.DateTimeFormat('en-US', {
    hour: 'numeric',
    minute: '2-digit',
  }).format(value);
}

function formatStatus(value) {
  return value
    .split('-')
    .map((part) => part.charAt(0).toUpperCase() + part.slice(1))
    .join(' ');
}

function PageButton({ children, active = false }) {
  return (
    <button className={`grid h-10 min-w-10 place-items-center rounded border px-3 font-semibold ${active ? 'border-rosewood bg-rosewood text-white' : 'border-[#ded3c9] bg-white text-ink'}`}>
      {children}
    </button>
  );
}
