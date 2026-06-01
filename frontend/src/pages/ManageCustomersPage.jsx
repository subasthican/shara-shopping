import { useEffect, useMemo, useState } from 'react';
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
import { getCustomers } from '../services/customerService.js';

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

const customers = [
  ['Heshani Perera', 'heshani@gmail.com', '077 123 4567', 'Colombo', '12', 'LKR 184,500', 'VIP', 'May 31, 2026'],
  ['Nethmi Fernando', 'nethmi@gmail.com', '077 234 5678', 'Gampaha', '8', 'LKR 96,300', 'Active', 'May 30, 2026'],
  ['Dinuli Rathnayake', 'dinuli@gmail.com', '077 345 6789', 'Kandy', '5', 'LKR 62,100', 'Active', 'May 29, 2026'],
  ['Sewmini Jayawardena', 'sewmini@gmail.com', '077 456 7890', 'Galle', '3', 'LKR 29,450', 'New', 'May 28, 2026'],
  ['Tharushi Silva', 'tharushi@gmail.com', '077 567 8901', 'Colombo', '9', 'LKR 128,900', 'VIP', 'May 27, 2026'],
  ['Maleesha Bandara', 'maleesha@gmail.com', '077 678 9012', 'Matara', '2', 'LKR 18,700', 'New', 'May 26, 2026'],
].map(([name, email, phone, district, orders, value, type, lastOrder]) => ({
  name,
  email,
  phone,
  district,
  orders: Number(orders),
  value,
  valueNumber: Number(value.replace(/[^0-9]/g, '')),
  type,
  typeKey: type.toLowerCase(),
  lastOrder,
  customerSince: 'Customer since 2025',
  hasWhatsapp: true,
}));

export default function ManageCustomersPage() {
  const [customerRows, setCustomerRows] = useState(customers);
  const [filters, setFilters] = useState({
    search: '',
    district: '',
    type: 'all',
  });
  const [activeType, setActiveType] = useState('all');
  const [isLoading, setIsLoading] = useState(true);
  const [apiError, setApiError] = useState('');

  useEffect(() => {
    let isMounted = true;

    const loadCustomers = async () => {
      setIsLoading(true);
      setApiError('');

      try {
        const data = await getCustomers({
          search: filters.search || undefined,
          district: filters.district || undefined,
        });

        if (isMounted) {
          setCustomerRows(data.map(mapApiCustomer));
        }
      } catch (error) {
        if (isMounted) {
          setCustomerRows(customers);
          setApiError('Showing demo customers until admin API access is available.');
        }
      } finally {
        if (isMounted) {
          setIsLoading(false);
        }
      }
    };

    loadCustomers();

    return () => {
      isMounted = false;
    };
  }, [filters.district, filters.search]);

  const visibleCustomers = useMemo(() => {
    const typeFilteredCustomers = filters.type === 'all' ? customerRows : customerRows.filter((customer) => customer.typeKey === filters.type);

    if (activeType === 'all') return typeFilteredCustomers;
    return typeFilteredCustomers.filter((customer) => customer.typeKey === activeType);
  }, [activeType, customerRows, filters.type]);

  const stats = useMemo(() => buildStats(customerRows), [customerRows]);

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
            <Stats stats={stats} />
            <Filters filters={filters} setFilters={setFilters} />
            <CustomersTable
              activeType={activeType}
              apiError={apiError}
              customers={visibleCustomers}
              isLoading={isLoading}
              setActiveType={setActiveType}
              totalCount={customerRows.length}
            />
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

function Stats({ stats }) {
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

function Filters({ filters, setFilters }) {
  const updateFilter = (key, value) => {
    setFilters((current) => ({ ...current, [key]: value }));
  };

  const resetFilters = () => {
    setFilters({ search: '', district: '', type: 'all' });
  };

  return (
    <section className="mt-6 rounded-lg border border-[#eadfd8] bg-white p-5 shadow-sm">
      <div className="grid gap-5 lg:grid-cols-[1.4fr_0.9fr_0.9fr_auto_auto] lg:items-end">
        <Control
          label="Search Customer"
          icon={Search}
          onChange={(event) => updateFilter('search', event.target.value)}
          placeholder="Search by name, email, or phone..."
          value={filters.search}
        />
        <Select
          label="District"
          onChange={(event) => updateFilter('district', event.target.value)}
          options={[
            ['', 'All Districts'],
            ['Colombo', 'Colombo'],
            ['Gampaha', 'Gampaha'],
            ['Kandy', 'Kandy'],
            ['Galle', 'Galle'],
            ['Matara', 'Matara'],
          ]}
          value={filters.district}
        />
        <Select
          label="Customer Type"
          onChange={(event) => updateFilter('type', event.target.value)}
          options={[
            ['all', 'All Customers'],
            ['vip', 'VIP'],
            ['active', 'Active'],
            ['new', 'New'],
          ]}
          value={filters.type}
        />
        <button className="h-12 rounded border border-[#ded3c9] px-6 font-semibold" onClick={resetFilters}>
          Reset
        </button>
        <button className="btn-primary h-12 gap-2 px-6">
          <Filter size={17} /> Filter
        </button>
      </div>
    </section>
  );
}

function Control({ label, icon: Icon, onChange, placeholder, value }) {
  return (
    <label>
      <span className="form-label">{label}</span>
      <span className="relative mt-2 block">
        <Icon className="absolute right-4 top-1/2 -translate-y-1/2 text-neutral-500" size={18} />
        <input className="form-control pr-11" onChange={onChange} placeholder={placeholder} value={value} />
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

function CustomersTable({ activeType, apiError, customers, isLoading, setActiveType, totalCount }) {
  const tabs = [
    ['all', 'All'],
    ['vip', 'VIP'],
    ['active', 'Active'],
    ['new', 'New'],
  ];

  return (
    <section className="mt-6 overflow-hidden rounded-lg border border-[#eadfd8] bg-white p-5 shadow-sm">
      <div className="flex flex-col gap-4 border-b border-[#eadfd8] pb-5 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h2 className="text-xl font-bold">Customer List</h2>
          <p className="mt-1 text-sm text-neutral-600">Review customer history, contact preferences, and lifetime value.</p>
        </div>
        <div className="flex rounded-lg bg-[#f6eee7] p-1 text-sm font-semibold">
          {tabs.map(([type, tab]) => (
            <button
              className={`h-9 rounded px-4 ${activeType === type ? 'bg-white text-rosewood shadow-sm' : 'text-neutral-600'}`}
              key={type}
              onClick={() => setActiveType(type)}
            >
              {tab}
            </button>
          ))}
        </div>
      </div>

      {(isLoading || apiError) && (
        <div className={`mt-5 rounded-lg px-4 py-3 text-sm font-semibold ${apiError ? 'bg-[#fff3d8] text-[#9b6613]' : 'bg-blush text-rosewood'}`}>
          {isLoading ? 'Loading customers...' : apiError}
        </div>
      )}

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
              <CustomerRow customer={customer} key={customer.email || customer.phone} />
            ))}
          </tbody>
        </table>
      </div>

      <div className="flex flex-col gap-4 border-t border-[#eadfd8] pt-5 text-sm text-neutral-600 sm:flex-row sm:items-center sm:justify-between">
        <p>
          Showing {customers.length ? 1 : 0} to {customers.length} of {totalCount} customers
        </p>
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
  return (
    <tr>
      <td className="py-4">
        <span className="block h-4 w-4 rounded border border-[#d8cec4]" />
      </td>
      <td>
        <div className="flex items-center gap-3">
          <span className="grid h-12 w-12 place-items-center rounded-full bg-blush font-serif text-xl font-bold text-rosewood">
            {customer.name.charAt(0)}
          </span>
          <div>
            <p className="font-bold">{customer.name}</p>
            <p className="mt-1 text-neutral-600">{customer.customerSince}</p>
          </div>
        </div>
      </td>
      <td>
        <p className="flex items-center gap-2"><Mail size={15} /> {customer.email || 'No email'}</p>
        <p className="mt-1 flex items-center gap-2 text-neutral-600"><Phone size={15} /> {customer.phone}</p>
      </td>
      <td>{customer.district}</td>
      <td className="font-semibold">{customer.orders}</td>
      <td className="font-semibold">{customer.value}</td>
      <td>
        <TypePill type={customer.type} />
      </td>
      <td className="text-neutral-600">{customer.lastOrder}</td>
      <td>
        <div className="flex justify-end gap-2">
          <button className="grid h-9 w-9 place-items-center rounded border border-[#ded3c9]" aria-label={`View ${customer.name}`}>
            <Eye size={16} />
          </button>
          <button className="grid h-9 w-9 place-items-center rounded border border-[#ded3c9]" aria-label={`Message ${customer.name}`}>
            <MessageCircle size={16} />
          </button>
          <button className="grid h-9 w-9 place-items-center rounded border border-[#ded3c9]" aria-label={`More actions for ${customer.name}`}>
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

function buildStats(customersList) {
  const newCustomers = customersList.filter((customer) => customer.typeKey === 'new').length;
  const repeatBuyers = customersList.filter((customer) => customer.orders > 1).length;
  const whatsappLeads = customersList.filter((customer) => customer.hasWhatsapp).length;
  const totalValue = customersList.reduce((total, customer) => total + customer.valueNumber, 0);
  const totalOrders = customersList.reduce((total, customer) => total + customer.orders, 0);
  const averageOrderValue = totalOrders ? totalValue / totalOrders : 0;

  return [
    { icon: UsersRound, label: 'Total Customers', value: String(customersList.length), color: 'bg-[#ebe5ff] text-[#6d4dd8]' },
    { icon: UserRound, label: 'New This Month', value: String(newCustomers), color: 'bg-blush text-rosewood' },
    { icon: ShoppingBag, label: 'Repeat Buyers', value: String(repeatBuyers), color: 'bg-[#dcf5ea] text-[#15945d]' },
    { icon: MessageCircle, label: 'WhatsApp Leads', value: String(whatsappLeads), color: 'bg-[#e2f1ff] text-[#1d68c4]' },
    { icon: BarChart3, label: 'Avg. Order Value', value: formatCurrency(averageOrderValue), color: 'bg-[#fff3d8] text-[#cc8b18]' },
  ];
}

function mapApiCustomer(customer) {
  const orders = customer.orderCount || 0;
  const createdAt = customer.createdAt ? new Date(customer.createdAt) : null;
  const type = getCustomerType(orders, createdAt);
  const district = customer.addresses?.[0]?.district || 'Not set';

  return {
    name: customer.fullName,
    email: customer.email || '',
    phone: customer.phone,
    district,
    orders,
    value: formatCurrency(0),
    valueNumber: 0,
    type,
    typeKey: type.toLowerCase(),
    lastOrder: 'No orders yet',
    customerSince: createdAt ? `Customer since ${createdAt.getFullYear()}` : 'Customer since recently',
    hasWhatsapp: Boolean(customer.whatsapp),
  };
}

function getCustomerType(orderCount, createdAt) {
  const thirtyDays = 1000 * 60 * 60 * 24 * 30;
  const isNew = createdAt ? Date.now() - createdAt.getTime() <= thirtyDays : false;

  if (orderCount >= 8) return 'VIP';
  if (isNew || orderCount <= 2) return 'New';
  return 'Active';
}

function formatCurrency(value) {
  return new Intl.NumberFormat('en-LK', {
    currency: 'LKR',
    maximumFractionDigits: 0,
    style: 'currency',
  }).format(value || 0);
}

function PageButton({ children, active = false }) {
  return (
    <button className={`grid h-10 min-w-10 place-items-center rounded border px-3 font-semibold ${active ? 'border-rosewood bg-rosewood text-white' : 'border-[#ded3c9] bg-white text-ink'}`}>
      {children}
    </button>
  );
}
