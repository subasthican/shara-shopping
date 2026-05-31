import {
  BarChart3,
  Bell,
  Boxes,
  CalendarDays,
  ChevronDown,
  ClipboardList,
  Gift,
  LayoutDashboard,
  Mail,
  Megaphone,
  Menu,
  PackageCheck,
  PackageSearch,
  RefreshCcw,
  Search,
  Settings,
  ShoppingBag,
  Star,
  Tag,
  Truck,
  UserRound,
  UsersRound,
} from 'lucide-react';

const sidebar = [
  [LayoutDashboard, 'Dashboard'],
  [ClipboardList, 'Orders'],
  [PackageSearch, 'Products'],
  [Boxes, 'Categories'],
  [UsersRound, 'Customers'],
  [Gift, 'Coupons'],
  [Star, 'Reviews'],
  [PackageCheck, 'Inventory'],
  [BarChart3, 'Sales & Analytics'],
  [RefreshCcw, 'Returns'],
  [Megaphone, 'Marketing'],
  [UsersRound, 'Users & Roles'],
  [Settings, 'Settings'],
  [Settings, 'Website Settings'],
];

const stats = [
  { icon: ShoppingBag, label: 'Total Sales', value: 'LKR 1,245,600', note: '↑ 24.5% vs last week', color: 'text-rosewood bg-blush' },
  { icon: ShoppingBag, label: 'Total Orders', value: '328', note: '↑ 18.3% vs last week', color: 'text-[#f26a21] bg-[#ffe4d6]' },
  { icon: UsersRound, label: 'Total Customers', value: '2,856', note: '↑ 22.7% vs last week', color: 'text-[#7c3aed] bg-[#eee2ff]' },
  { icon: ClipboardList, label: 'Pending Orders', value: '38', note: 'Need attention', color: 'text-[#f26a21] bg-[#ffe4d6]' },
  { icon: PackageSearch, label: 'Total Products', value: '154', note: 'Active listings', color: 'text-[#1d8ff2] bg-[#e2f1ff]' },
];

const orders = [
  ['#ORD-2081', 'Sarah Perera', 'LKR 17,900', 'Delivered', 'May 31, 2025'],
  ['#ORD-2080', 'Kavindi Silva', 'LKR 14,500', 'Processing', 'May 31, 2025'],
  ['#ORD-2079', 'Nethu Wijesinghe', 'LKR 12,900', 'Shipped', 'May 30, 2025'],
  ['#ORD-2078', 'Tharushi Bandara', 'LKR 16,800', 'Delivered', 'May 30, 2025'],
  ['#ORD-2077', 'Dinithi Fernando', 'LKR 11,500', 'Cancelled', 'May 29, 2025'],
];

const products = [
  ['Blush Drape Maxi Dress', '128 sold', 'LKR 2,291,200', 'figure-blush'],
  ['Floral Chiffon Midi Dress', '95 sold', 'LKR 1,377,500', 'figure-floral'],
  ['One Shoulder Satin Dress', '82 sold', 'LKR 1,378,400', 'figure-navy'],
  ['Lace Overlay Mini Dress', '71 sold', 'LKR 864,900', 'figure-lace'],
  ['Elegant Wrap Maxi Dress', '60 sold', 'LKR 717,000', 'figure-maroon'],
];

const activities = [
  [ShoppingBag, 'New order #ORD-2081', 'Placed by Sarah Perera', '10 min ago', 'bg-[#d8f8df] text-[#17a34a]'],
  [UserRound, 'New customer registered', 'Isuri Fernando', '30 min ago', 'bg-[#e2f1ff] text-[#1d8ff2]'],
  [PackageCheck, 'Order #ORD-2078 delivered', 'To Kavindi Silva', '1 hour ago', 'bg-[#fff0d8] text-[#e98320]'],
  [Tag, 'New coupon SUMMER20 created', 'By Admin', '2 hours ago', 'bg-[#eee2ff] text-[#7c3aed]'],
  [PackageSearch, 'New product “Blush Drape Maxi Dress”', 'Added to store', '3 hours ago', 'bg-blush text-rosewood'],
];

export default function AdminDashboardPage() {
  return (
    <div className="min-h-screen bg-[#fbf7f4] text-ink">
      <div className="grid lg:grid-cols-[320px_1fr]">
        <Sidebar />
        <main className="min-w-0 px-4 py-6 sm:px-7">
          <TopBar />
          <StatsGrid />
          <div className="mt-6 grid gap-6 xl:grid-cols-[1.5fr_1fr]">
            <SalesOverview />
            <CategoryChart />
          </div>
          <div className="mt-6 grid gap-6 xl:grid-cols-[1fr_0.84fr_1.24fr]">
            <RecentOrders />
            <TopProducts />
            <RecentActivities />
          </div>
        </main>
      </div>
    </div>
  );
}

function Sidebar() {
  return (
    <aside className="hidden min-h-screen border-r border-[#eadfd8] bg-[#fff8f4] px-5 py-6 lg:flex lg:flex-col">
      <div className="text-center">
        <div className="mx-auto text-gold">
          <CrownIcon />
        </div>
        <h1 className="mt-1 font-serif text-4xl text-[#7a4c29]">Shara Shopping</h1>
        <p className="mt-3 text-xs font-extrabold uppercase tracking-[0.28em]">Admin Panel</p>
      </div>
      <nav className="mt-8 space-y-2">
        {sidebar.map(([Icon, label], index) => (
          <a
            className={`flex h-12 items-center gap-4 rounded-lg px-5 text-sm font-semibold ${
              index === 0 ? 'bg-rosewood text-white shadow-soft' : 'hover:bg-white'
            }`}
            href={index === 0 ? '/admin/dashboard' : '#admin-section'}
            key={label}
          >
            <Icon size={19} /> {label}
          </a>
        ))}
      </nav>
      <div className="mt-auto flex items-center gap-4 rounded-lg border border-[#eadfd8] bg-[#f8ece6] p-4">
        <span className="relative grid h-14 w-14 place-items-center rounded-full bg-gradient-to-br from-[#f1cbc8] to-[#d39b99]">
          <span className="product-silhouette figure-blush !h-[88%] !w-[38%]" />
          <span className="absolute bottom-0 right-0 h-3 w-3 rounded-full border-2 border-white bg-[#1fb458]" />
        </span>
        <div>
          <p className="font-bold">Admin</p>
          <p className="text-xs">Super Admin</p>
        </div>
        <ChevronDown className="ml-auto" size={17} />
      </div>
    </aside>
  );
}

function TopBar() {
  return (
    <header className="flex flex-col gap-5 xl:flex-row xl:items-start xl:justify-between">
      <div className="flex items-start gap-5">
        <button className="icon-button bg-white shadow-sm lg:hidden" aria-label="Open admin menu"><Menu size={24} /></button>
        <div>
          <h2 className="font-serif text-4xl font-bold">Welcome back, Admin</h2>
          <p className="mt-1 text-neutral-700">Here&apos;s what&apos;s happening with your store today.</p>
        </div>
      </div>
      <div className="flex flex-wrap items-center gap-4">
        <label className="relative block w-full sm:w-80">
          <Search className="absolute right-4 top-1/2 -translate-y-1/2" size={21} />
          <input className="h-12 w-full rounded-lg border border-[#eadfd8] bg-white px-5 pr-12 outline-none focus:border-rosewood" placeholder="Search anything..." />
        </label>
        <BadgeIcon icon={Bell} count="5" />
        <BadgeIcon icon={Mail} count="2" />
        <button className="inline-flex h-12 items-center gap-3 rounded-lg bg-white px-4 shadow-sm">
          <CalendarDays size={18} /> May 25, 2025 - May 31, 2025 <ChevronDown size={16} />
        </button>
      </div>
    </header>
  );
}

function BadgeIcon({ icon: Icon, count }) {
  return (
    <button className="relative grid h-12 w-12 place-items-center rounded-full bg-white shadow-sm">
      <Icon size={21} />
      <span className="absolute -right-1 -top-1 grid h-6 w-6 place-items-center rounded-full bg-rosewood text-xs font-bold text-white">{count}</span>
    </button>
  );
}

function StatsGrid() {
  return (
    <section className="mt-7 grid gap-5 md:grid-cols-2 2xl:grid-cols-5">
      {stats.map(({ icon: Icon, label, value, note, color }) => (
        <article className="rounded-lg border border-[#eadfd8] bg-white p-6 shadow-sm" key={label}>
          <div className="flex items-center gap-5">
            <span className={`grid h-16 w-16 place-items-center rounded-full ${color}`}>
              <Icon size={31} />
            </span>
            <div>
              <p className="text-sm font-semibold">{label}</p>
              <p className="mt-2 text-3xl font-extrabold">{value}</p>
              <p className={`mt-2 text-sm font-semibold ${note.includes('Need') ? 'text-red-600' : 'text-[#17a34a]'}`}>{note}</p>
            </div>
          </div>
        </article>
      ))}
    </section>
  );
}

function SalesOverview() {
  const points = ['20%', '44%', '37%', '58%', '43%', '41%', '67%', '64%', '66%', '68%', '52%'];

  return (
    <section className="admin-card">
      <PanelHeader title="Sales Overview" actions={['This Week', 'Filter']} />
      <div className="mt-6 h-64">
        <div className="relative h-full border-b border-l border-[#eadfd8]">
          {[0, 1, 2, 3].map((line) => (
            <span className="absolute left-0 w-full border-t border-[#f0e7e1]" style={{ top: `${line * 25}%` }} key={line} />
          ))}
          <div className="absolute inset-x-4 bottom-0 flex h-full items-end justify-between">
            {points.map((height, index) => (
              <div className="flex h-full flex-col items-center justify-end gap-2" key={index}>
                <span className="w-10 rounded-t-full bg-gradient-to-t from-blush to-rosewood" style={{ height }} />
                <span className="text-xs text-neutral-600">May {25 + Math.min(index, 6)}</span>
              </div>
            ))}
          </div>
          <div className="absolute right-24 top-20 rounded bg-white p-4 text-sm shadow-soft">
            <p className="font-bold">May 29, 2025</p>
            <p className="mt-2 text-rosewood">Sales: LKR 280,500</p>
            <p className="mt-1 text-[#f39a6b]">Orders: 72</p>
          </div>
        </div>
      </div>
    </section>
  );
}

function CategoryChart() {
  return (
    <section className="admin-card">
      <PanelHeader title="Sales by Category" />
      <div className="mt-7 grid items-center gap-8 md:grid-cols-[220px_1fr]">
        <div className="donut-chart">
          <div className="grid h-32 w-32 place-items-center rounded-full bg-white text-center">
            <span className="text-sm font-bold">LKR<br />1,245,600<br /><span className="font-normal">Total</span></span>
          </div>
        </div>
        <div className="space-y-4">
          {[
            ['Dresses', '45%', '#c83248'],
            ['Clothing', '25%', '#ff995f'],
            ['Occasion', '15%', '#a772e7'],
            ['Bridal', '10%', '#f8b383'],
            ['Others', '5%', '#b6adbb'],
          ].map(([label, value, color]) => (
            <div className="flex items-center justify-between gap-4 text-sm" key={label}>
              <span className="flex items-center gap-3"><span className="h-3 w-3 rounded-full" style={{ backgroundColor: color }} />{label}</span>
              <span className="font-bold">{value}</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function RecentOrders() {
  return (
    <section className="admin-card">
      <PanelHeader title="Recent Orders" link />
      <div className="mt-4 space-y-3">
        {orders.map(([id, name, total, status, date]) => (
          <div className="grid grid-cols-[44px_1fr_auto_auto] items-center gap-3 text-sm" key={id}>
            <ProductThumb figure="figure-blush" />
            <div><p className="font-bold">{id}</p><p className="text-neutral-600">{name}</p></div>
            <p className="font-bold">{total}</p>
            <div className="text-right">
              <StatusPill status={status} />
              <p className="mt-1 text-xs text-neutral-600">{date}</p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}

function TopProducts() {
  return (
    <section className="admin-card">
      <PanelHeader title="Top Selling Products" link />
      <div className="mt-4 space-y-3">
        {products.map(([name, sold, total, figure], index) => (
          <div className="grid grid-cols-[28px_44px_1fr_auto] items-center gap-3 text-sm" key={name}>
            <span className={`grid h-7 w-7 place-items-center rounded-full text-xs font-bold ${index < 3 ? 'bg-gold text-white' : 'bg-neutral-200'}`}>{index + 1}</span>
            <ProductThumb figure={figure} />
            <div><p className="font-bold">{name}</p><p className="text-neutral-600">{sold}</p></div>
            <p className="font-bold">{total}</p>
          </div>
        ))}
      </div>
    </section>
  );
}

function RecentActivities() {
  return (
    <section className="admin-card">
      <PanelHeader title="Recent Activities" link />
      <div className="mt-5 space-y-5">
        {activities.map(([Icon, title, copy, time, color]) => (
          <div className="grid grid-cols-[44px_1fr_auto] gap-4 text-sm" key={title}>
            <span className={`grid h-11 w-11 place-items-center rounded-full ${color}`}><Icon size={21} /></span>
            <div><p className="font-bold">{title}</p><p className="mt-1 text-neutral-600">{copy}</p></div>
            <p className="text-neutral-600">{time}</p>
          </div>
        ))}
      </div>
    </section>
  );
}

function PanelHeader({ title, actions = [], link = false }) {
  return (
    <div className="flex items-center justify-between gap-4">
      <h3 className="text-xl font-extrabold">{title}</h3>
      {link ? (
        <a className="text-sm font-bold" href="#view-all">View All →</a>
      ) : (
        <div className="flex gap-3">
          {actions.map((action) => (
            <button className="h-10 rounded-lg border border-[#eadfd8] px-4 text-sm font-semibold" key={action}>{action}</button>
          ))}
        </div>
      )}
    </div>
  );
}

function ProductThumb({ figure }) {
  return <span className="relative h-12 overflow-hidden rounded bg-gradient-to-br from-[#f6d7c7] to-[#d99c7e]"><span className={`product-silhouette ${figure} !h-[90%] !w-[42%]`} /></span>;
}

function StatusPill({ status }) {
  const styles = {
    Delivered: 'bg-[#d8f8df] text-[#12833c]',
    Processing: 'bg-[#fff0d8] text-[#c76b11]',
    Shipped: 'bg-[#e2f1ff] text-[#1d68c4]',
    Cancelled: 'bg-[#ffe0e8] text-[#c83248]',
  };
  return <span className={`rounded px-3 py-1 text-xs font-bold ${styles[status]}`}>{status}</span>;
}

function CrownIcon() {
  return (
    <svg aria-hidden="true" className="mx-auto h-10 w-10" fill="none" viewBox="0 0 48 48">
      <path d="M8 18l9 9 7-16 7 16 9-9-3 22H11L8 18z" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" />
      <path d="M14 40h20" stroke="currentColor" strokeLinecap="round" strokeWidth="3" />
    </svg>
  );
}
