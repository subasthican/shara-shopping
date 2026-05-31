import {
  BarChart3,
  Box,
  ChevronDown,
  ChevronLeft,
  ChevronRight,
  ClipboardCheck,
  Download,
  Eye,
  Filter,
  Home,
  LogOut,
  Mail,
  Menu,
  MessageCircle,
  MoreVertical,
  Package,
  PackageCheck,
  Phone,
  Search,
  Settings,
  ShoppingBag,
  Star,
  Tag,
  Timer,
  UserRound,
  UsersRound,
} from 'lucide-react';

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
  [Settings, 'Settings', '#settings'],
  [UsersRound, 'Users', '#users'],
  [LogOut, 'Logout', '#logout'],
];

const stats = [
  { icon: UsersRound, label: 'Total Customers', value: '2,856', color: 'bg-[#ebe5ff] text-[#6d4dd8]' },
  { icon: UserRound, label: 'New This Month', value: '184', color: 'bg-blush text-rosewood' },
  { icon: ShoppingBag, label: 'Repeat Buyers', value: '912', color: 'bg-[#dcf5ea] text-[#15945d]' },
  { icon: MessageCircle, label: 'WhatsApp Leads', value: '428', color: 'bg-[#e2f1ff] text-[#1d68c4]' },
  { icon: BarChart3, label: 'Avg. Order Value', value: 'LKR 15,840', color: 'bg-[#fff3d8] text-[#cc8b18]' },
];

const customers = [
  ['Heshani Perera', 'heshani@gmail.com', '077 123 4567', 'Colombo', '12', 'LKR 184,500', 'VIP', 'May 31, 2026'],
  ['Nethmi Fernando', 'nethmi@gmail.com', '077 234 5678', 'Gampaha', '8', 'LKR 96,300', 'Active', 'May 30, 2026'],
  ['Dinuli Rathnayake', 'dinuli@gmail.com', '077 345 6789', 'Kandy', '5', 'LKR 62,100', 'Active', 'May 29, 2026'],
  ['Sewmini Jayawardena', 'sewmini@gmail.com', '077 456 7890', 'Galle', '3', 'LKR 29,450', 'New', 'May 28, 2026'],
  ['Tharushi Silva', 'tharushi@gmail.com', '077 567 8901', 'Colombo', '9', 'LKR 128,900', 'VIP', 'May 27, 2026'],
  ['Maleesha Bandara', 'maleesha@gmail.com', '077 678 9012', 'Matara', '2', 'LKR 18,700', 'New', 'May 26, 2026'],
];

export default function ManageCustomersPage() {
  return (
    <div className="min-h-screen bg-[#fbf7f4] text-ink">
      <div className="grid lg:grid-cols-[280px_1fr]">
        <CustomersSidebar />
        <main className="min-w-0">
          <CustomersTopbar />
          <div className="px-4 py-7 sm:px-8">
            <div className="flex flex-col gap-4 xl:flex-row xl:items-start xl:justify-between">
              <div>
                <h1 className="text-3xl font-extrabold">Manage Customers</h1>
                <p className="mt-3 text-sm text-neutral-600">
                  Dashboard <span className="mx-2">›</span> Customers
                </p>
              </div>
              <div className="flex flex-wrap gap-3">
                <button className="inline-flex h-11 items-center gap-2 rounded border border-[#ded3c9] bg-white px-5 font-semibold">
                  <Download size={17} /> Export Customers
                </button>
                <button className="btn-primary h-11 gap-2 px-5">
                  <Mail size={17} /> Send Campaign
                </button>
              </div>
            </div>
            <Stats />
            <Filters />
            <CustomersTable />
          </div>
        </main>
      </div>
    </div>
  );
}

function CustomersSidebar() {
  return (
    <aside className="hidden min-h-screen border-r border-[#eadfd8] bg-[#fff8f4] px-5 py-7 lg:block">
      <h2 className="font-serif text-4xl text-[#7a4c29]">Shara Shopping</h2>
      <p className="mt-3 text-xs font-extrabold uppercase tracking-[0.34em]">Admin Panel</p>
      <nav className="mt-10 space-y-2">
        {nav.map(([Icon, label, href]) => (
          <a
            className={`flex h-12 items-center gap-4 rounded-lg px-4 text-sm font-semibold ${
              label === 'Customers' ? 'bg-blush text-rosewood' : 'hover:bg-white'
            }`}
            href={href}
            key={label}
          >
            <Icon size={19} /> {label}
          </a>
        ))}
      </nav>
      <div className="mt-10 overflow-hidden rounded-lg bg-blush p-4">
        <div className="relative h-44 rounded bg-gradient-to-br from-[#f1cbc8] to-[#d39b99]">
          <span className="product-silhouette figure-blush !h-[92%] !w-[34%]" />
        </div>
        <p className="mt-4 font-serif text-lg leading-7">Every loyal customer starts with one thoughtful order.</p>
        <p className="mt-3 text-sm font-semibold text-rosewood">- Customers</p>
      </div>
    </aside>
  );
}

function CustomersTopbar() {
  return (
    <header className="flex flex-wrap items-center justify-between gap-4 border-b border-[#eadfd8] bg-white px-4 py-5 sm:px-8">
      <div className="flex items-center gap-5">
        <button className="icon-button bg-white" aria-label="Open admin menu">
          <Menu size={24} />
        </button>
        <label className="relative block w-[min(520px,60vw)]">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-neutral-500" size={19} />
          <input className="h-12 w-full rounded-lg border border-[#eadfd8] bg-[#fbfaf9] px-12 outline-none focus:border-rosewood" placeholder="Search customers, phone, email..." />
        </label>
      </div>
      <div className="flex items-center gap-3">
        <button className="relative icon-button bg-white shadow-sm" aria-label="Customer messages">
          <MessageCircle size={20} />
          <span className="absolute -right-1 -top-1 grid h-5 w-5 place-items-center rounded-full bg-rosewood text-xs font-bold text-white">7</span>
        </button>
        <span className="relative grid h-12 w-12 place-items-center rounded-full bg-gradient-to-br from-[#f1cbc8] to-[#d39b99]">
          <span className="product-silhouette figure-blush !h-[88%] !w-[38%]" />
        </span>
        <div>
          <p className="font-bold">Admin</p>
          <p className="text-sm text-neutral-600">Super Admin</p>
        </div>
        <ChevronDown size={17} />
      </div>
    </header>
  );
}

function Stats() {
  return (
    <section className="mt-7 grid gap-4 md:grid-cols-2 xl:grid-cols-5">
      {stats.map(({ icon: Icon, label, value, color }) => (
        <article className="rounded-lg border border-[#eadfd8] bg-white p-5 shadow-sm" key={label}>
          <div className="flex items-center gap-4">
            <span className={`grid h-14 w-14 place-items-center rounded-full ${color}`}>
              <Icon size={27} />
            </span>
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

function Filters() {
  return (
    <section className="mt-6 rounded-lg border border-[#eadfd8] bg-white p-5 shadow-sm">
      <div className="grid gap-5 lg:grid-cols-[1.4fr_0.9fr_0.9fr_auto_auto] lg:items-end">
        <Control label="Search Customer" icon={Search} placeholder="Search by name, email, or phone..." />
        <Select label="District" text="All Districts" />
        <Select label="Customer Type" text="All Customers" />
        <button className="h-12 rounded border border-[#ded3c9] px-6 font-semibold">Reset</button>
        <button className="btn-primary h-12 gap-2 px-6">
          <Filter size={17} /> Filter
        </button>
      </div>
    </section>
  );
}

function Control({ label, icon: Icon, placeholder }) {
  return (
    <label>
      <span className="form-label">{label}</span>
      <span className="relative mt-2 block">
        <Icon className="absolute right-4 top-1/2 -translate-y-1/2 text-neutral-500" size={18} />
        <input className="form-control pr-11" placeholder={placeholder} />
      </span>
    </label>
  );
}

function Select({ label, text }) {
  return (
    <label>
      <span className="form-label">{label}</span>
      <button className="form-control mt-2 flex items-center justify-between text-left" type="button">
        {text} <ChevronDown size={17} />
      </button>
    </label>
  );
}

function CustomersTable() {
  return (
    <section className="mt-6 overflow-hidden rounded-lg border border-[#eadfd8] bg-white p-5 shadow-sm">
      <div className="flex flex-col gap-4 border-b border-[#eadfd8] pb-5 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h2 className="text-xl font-bold">Customer List</h2>
          <p className="mt-1 text-sm text-neutral-600">Review customer history, contact preferences, and lifetime value.</p>
        </div>
        <div className="flex rounded-lg bg-[#f6eee7] p-1 text-sm font-semibold">
          {['All', 'VIP', 'Active', 'New'].map((tab, index) => (
            <button className={`h-9 rounded px-4 ${index === 0 ? 'bg-white text-rosewood shadow-sm' : 'text-neutral-600'}`} key={tab}>
              {tab}
            </button>
          ))}
        </div>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full min-w-[1080px] text-left text-sm">
          <thead>
            <tr className="border-b border-[#eadfd8] text-neutral-700">
              <th className="w-10 py-4">
                <span className="block h-4 w-4 rounded border border-[#d8cec4]" />
              </th>
              <th>Customer</th>
              <th>Contact</th>
              <th>District</th>
              <th>Orders</th>
              <th>Lifetime Value</th>
              <th>Type</th>
              <th>Last Order</th>
              <th className="text-right">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-[#eadfd8]">
            {customers.map((customer) => (
              <CustomerRow customer={customer} key={customer[1]} />
            ))}
          </tbody>
        </table>
      </div>

      <div className="flex flex-col gap-4 border-t border-[#eadfd8] pt-5 text-sm text-neutral-600 sm:flex-row sm:items-center sm:justify-between">
        <p>Showing 1 to 6 of 2,856 customers</p>
        <div className="flex items-center gap-2">
          <PageButton>
            <ChevronLeft size={16} />
          </PageButton>
          {[1, 2, 3].map((page) => (
            <PageButton active={page === 1} key={page}>
              {page}
            </PageButton>
          ))}
          <span className="px-2">...</span>
          <PageButton>476</PageButton>
          <PageButton>
            <ChevronRight size={16} />
          </PageButton>
          <button className="ml-3 h-10 rounded border border-[#ded3c9] px-4">
            10 / page <ChevronDown className="inline" size={15} />
          </button>
        </div>
      </div>
    </section>
  );
}

function CustomerRow({ customer }) {
  const [name, email, phone, district, orders, value, type, lastOrder] = customer;

  return (
    <tr>
      <td className="py-4">
        <span className="block h-4 w-4 rounded border border-[#d8cec4]" />
      </td>
      <td>
        <div className="flex items-center gap-3">
          <span className="grid h-12 w-12 place-items-center rounded-full bg-blush font-serif text-xl font-bold text-rosewood">
            {name.charAt(0)}
          </span>
          <div>
            <p className="font-bold">{name}</p>
            <p className="mt-1 text-neutral-600">Customer since 2025</p>
          </div>
        </div>
      </td>
      <td>
        <p className="flex items-center gap-2"><Mail size={15} /> {email}</p>
        <p className="mt-1 flex items-center gap-2 text-neutral-600"><Phone size={15} /> {phone}</p>
      </td>
      <td>{district}</td>
      <td className="font-semibold">{orders}</td>
      <td className="font-semibold">{value}</td>
      <td>
        <TypePill type={type} />
      </td>
      <td className="text-neutral-600">{lastOrder}</td>
      <td>
        <div className="flex justify-end gap-2">
          <button className="grid h-9 w-9 place-items-center rounded border border-[#ded3c9]" aria-label={`View ${name}`}>
            <Eye size={16} />
          </button>
          <button className="grid h-9 w-9 place-items-center rounded border border-[#ded3c9]" aria-label={`Message ${name}`}>
            <MessageCircle size={16} />
          </button>
          <button className="grid h-9 w-9 place-items-center rounded border border-[#ded3c9]" aria-label={`More actions for ${name}`}>
            <MoreVertical size={16} />
          </button>
        </div>
      </td>
    </tr>
  );
}

function TypePill({ type }) {
  const styles = {
    VIP: 'bg-blush text-rosewood',
    Active: 'bg-[#d8f8df] text-[#12833c]',
    New: 'bg-[#e2f1ff] text-[#1d68c4]',
  };

  return <span className={`rounded px-3 py-1 text-xs font-bold ${styles[type]}`}>{type}</span>;
}

function PageButton({ children, active = false }) {
  return (
    <button className={`grid h-10 min-w-10 place-items-center rounded border px-3 font-semibold ${active ? 'border-rosewood bg-rosewood text-white' : 'border-[#ded3c9] bg-white text-ink'}`}>
      {children}
    </button>
  );
}
