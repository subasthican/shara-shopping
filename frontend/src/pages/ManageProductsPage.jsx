import {
  AlertTriangle,
  Archive,
  Box,
  ChevronDown,
  ChevronLeft,
  ChevronRight,
  ClipboardCheck,
  Edit3,
  Eye,
  Filter,
  Home,
  LogOut,
  Menu,
  MoreVertical,
  Package,
  PackageCheck,
  Plus,
  Search,
  Settings,
  Star,
  Tag,
  Timer,
  Trash2,
  TrendingUp,
  UsersRound,
} from 'lucide-react';
import { dressProducts } from '../data/shopData.js';

const nav = [
  [Home, 'Dashboard', '/admin/dashboard'],
  [ClipboardCheck, 'Orders', '/admin/orders'],
  [Package, 'Products', '/admin/products'],
  [Box, 'Categories', '/admin/categories'],
  [UsersRound, 'Customers', '#customers'],
  [Tag, 'Offers & Coupons', '#offers'],
  [PackageCheck, 'Inventory', '#inventory'],
  [Star, 'Reviews', '#reviews'],
  [Timer, 'Reports', '#reports'],
  [Settings, 'Settings', '#settings'],
  [UsersRound, 'Users', '#users'],
  [LogOut, 'Logout', '#logout'],
];

const stats = [
  { icon: Package, label: 'Total Products', value: '154', color: 'bg-[#e2f1ff] text-[#1d68c4]' },
  { icon: PackageCheck, label: 'Active Products', value: '132', color: 'bg-[#dcf5ea] text-[#15945d]' },
  { icon: AlertTriangle, label: 'Low Stock', value: '18', color: 'bg-[#fff3d8] text-[#cc8b18]' },
  { icon: Archive, label: 'Draft Products', value: '12', color: 'bg-[#ebe5ff] text-[#6d4dd8]' },
  { icon: TrendingUp, label: 'Best Sellers', value: '24', color: 'bg-blush text-rosewood' },
];

const productRows = dressProducts.map((product, index) => ({
  ...product,
  sku: `DRE-${String(index + 1).padStart(3, '0')}`,
  category: index % 2 === 0 ? 'Maxi Dresses' : 'Midi Dresses',
  stock: [48, 7, 22, 3, 35, 16, 64, 11][index],
  sales: [128, 95, 82, 71, 64, 58, 54, 49][index],
  status: index === 3 ? 'Draft' : index === 5 ? 'Inactive' : 'Active',
  updated: ['May 31, 2026', 'May 30, 2026', 'May 29, 2026', 'May 28, 2026'][index % 4],
}));

export default function ManageProductsPage() {
  return (
    <div className="min-h-screen bg-[#fbf7f4] text-ink">
      <div className="grid lg:grid-cols-[280px_1fr]">
        <ProductsSidebar />
        <main className="min-w-0">
          <ProductsTopbar />
          <div className="px-4 py-7 sm:px-8">
            <div className="flex flex-col gap-4 xl:flex-row xl:items-start xl:justify-between">
              <div>
                <h1 className="text-3xl font-extrabold">Manage Products</h1>
                <p className="mt-3 text-sm text-neutral-600">
                  Dashboard <span className="mx-2">›</span> Products
                </p>
              </div>
              <div className="flex flex-wrap gap-3">
                <button className="inline-flex h-11 items-center gap-2 rounded border border-[#ded3c9] bg-white px-5 font-semibold">
                  Export
                </button>
                <a className="btn-primary h-11 gap-2 px-5" href="/admin/products/new">
                  <Plus size={17} /> Add Product
                </a>
              </div>
            </div>

            <Stats />
            <Filters />
            <ProductsTable />
          </div>
        </main>
      </div>
    </div>
  );
}

function ProductsSidebar() {
  return (
    <aside className="hidden min-h-screen border-r border-[#eadfd8] bg-[#fff8f4] px-5 py-7 lg:block">
      <h2 className="font-serif text-4xl text-[#7a4c29]">Shara Shopping</h2>
      <p className="mt-3 text-xs font-extrabold uppercase tracking-[0.34em]">Admin Panel</p>
      <nav className="mt-10 space-y-2">
        {nav.map(([Icon, label, href]) => (
          <a
            className={`flex h-12 items-center gap-4 rounded-lg px-4 text-sm font-semibold ${
              label === 'Products' ? 'bg-blush text-rosewood' : 'hover:bg-white'
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
        <p className="mt-4 font-serif text-lg leading-7">Curate every listing like a boutique window.</p>
        <p className="mt-3 text-sm font-semibold text-rosewood">- Products</p>
      </div>
    </aside>
  );
}

function ProductsTopbar() {
  return (
    <header className="flex flex-wrap items-center justify-between gap-4 border-b border-[#eadfd8] bg-white px-4 py-5 sm:px-8">
      <div className="flex items-center gap-5">
        <button className="icon-button bg-white" aria-label="Open admin menu">
          <Menu size={24} />
        </button>
        <label className="relative block w-[min(520px,60vw)]">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-neutral-500" size={19} />
          <input className="h-12 w-full rounded-lg border border-[#eadfd8] bg-[#fbfaf9] px-12 outline-none focus:border-rosewood" placeholder="Search products, SKU, categories..." />
        </label>
      </div>
      <div className="flex items-center gap-3">
        <button className="relative icon-button bg-white shadow-sm" aria-label="Product alerts">
          <AlertTriangle size={20} />
          <span className="absolute -right-1 -top-1 grid h-5 w-5 place-items-center rounded-full bg-rosewood text-xs font-bold text-white">3</span>
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
      <div className="grid gap-5 lg:grid-cols-[1.3fr_0.9fr_0.9fr_0.9fr_auto_auto] lg:items-end">
        <Control label="Search Product" icon={Search} placeholder="Search by name or SKU..." />
        <Select label="Category" text="All Categories" />
        <Select label="Stock" text="All Stock" />
        <Select label="Status" text="All Status" />
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

function ProductsTable() {
  return (
    <section className="mt-6 overflow-hidden rounded-lg border border-[#eadfd8] bg-white p-5 shadow-sm">
      <div className="flex flex-col gap-4 border-b border-[#eadfd8] pb-5 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h2 className="text-xl font-bold">Product List</h2>
          <p className="mt-1 text-sm text-neutral-600">Manage catalog visibility, stock, and product details.</p>
        </div>
        <div className="flex rounded-lg bg-[#f6eee7] p-1 text-sm font-semibold">
          {['All', 'Active', 'Draft', 'Low Stock'].map((tab, index) => (
            <button className={`h-9 rounded px-4 ${index === 0 ? 'bg-white text-rosewood shadow-sm' : 'text-neutral-600'}`} key={tab}>
              {tab}
            </button>
          ))}
        </div>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full min-w-[1120px] text-left text-sm">
          <thead>
            <tr className="border-b border-[#eadfd8] text-neutral-700">
              <th className="w-10 py-4">
                <span className="block h-4 w-4 rounded border border-[#d8cec4]" />
              </th>
              <th>Product</th>
              <th>SKU</th>
              <th>Category</th>
              <th>Price</th>
              <th>Stock</th>
              <th>Sales</th>
              <th>Status</th>
              <th>Updated</th>
              <th className="text-right">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-[#eadfd8]">
            {productRows.map((product) => (
              <ProductRow product={product} key={product.sku} />
            ))}
          </tbody>
        </table>
      </div>

      <div className="flex flex-col gap-4 border-t border-[#eadfd8] pt-5 text-sm text-neutral-600 sm:flex-row sm:items-center sm:justify-between">
        <p>Showing 1 to 8 of 154 products</p>
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
          <PageButton>20</PageButton>
          <PageButton>
            <ChevronRight size={16} />
          </PageButton>
          <button className="ml-3 h-10 rounded border border-[#ded3c9] px-4">
            8 / page <ChevronDown className="inline" size={15} />
          </button>
        </div>
      </div>
    </section>
  );
}

function ProductRow({ product }) {
  return (
    <tr>
      <td className="py-4">
        <span className="block h-4 w-4 rounded border border-[#d8cec4]" />
      </td>
      <td>
        <div className="grid grid-cols-[58px_1fr] items-center gap-4">
          <span className={`relative h-16 overflow-hidden rounded bg-gradient-to-br ${product.accent}`}>
            <span className={`product-silhouette ${product.figure || ''} !h-[90%] !w-[42%]`} />
          </span>
          <div>
            <p className="font-bold">{product.name}</p>
            <p className="mt-1 text-neutral-600">{product.sizes.join(', ')} sizes</p>
          </div>
        </div>
      </td>
      <td className="font-semibold">{product.sku}</td>
      <td>{product.category}</td>
      <td className="font-semibold">{product.price}</td>
      <td>
        <span className={product.stock < 10 ? 'font-bold text-[#d96b00]' : 'font-semibold text-[#12833c]'}>
          {product.stock} pcs
        </span>
      </td>
      <td>{product.sales} sold</td>
      <td>
        <StatusPill status={product.status} />
      </td>
      <td className="text-neutral-600">{product.updated}</td>
      <td>
        <div className="flex justify-end gap-2">
          <a className="grid h-9 w-9 place-items-center rounded border border-[#ded3c9]" href={`/products/${slugify(product.name)}`} aria-label={`View ${product.name}`}>
            <Eye size={16} />
          </a>
          <a className="grid h-9 w-9 place-items-center rounded border border-[#ded3c9]" href="/admin/products/new" aria-label={`Edit ${product.name}`}>
            <Edit3 size={16} />
          </a>
          <button className="grid h-9 w-9 place-items-center rounded border border-[#ded3c9] text-rosewood" aria-label={`Delete ${product.name}`}>
            <Trash2 size={16} />
          </button>
          <button className="grid h-9 w-9 place-items-center rounded border border-[#ded3c9]" aria-label={`More actions for ${product.name}`}>
            <MoreVertical size={16} />
          </button>
        </div>
      </td>
    </tr>
  );
}

function StatusPill({ status }) {
  const styles = {
    Active: 'bg-[#d8f8df] text-[#12833c]',
    Draft: 'bg-[#fff0d8] text-[#c76b11]',
    Inactive: 'bg-[#ffe0e8] text-[#c83248]',
  };

  return <span className={`rounded px-3 py-1 text-xs font-bold ${styles[status]}`}>{status}</span>;
}

function PageButton({ children, active = false }) {
  return (
    <button className={`grid h-10 min-w-10 place-items-center rounded border px-3 font-semibold ${active ? 'border-rosewood bg-rosewood text-white' : 'border-[#ded3c9] bg-white text-ink'}`}>
      {children}
    </button>
  );
}

function slugify(value) {
  return value.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '');
}
