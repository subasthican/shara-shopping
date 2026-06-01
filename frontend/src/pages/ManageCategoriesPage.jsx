import { useEffect, useMemo, useState } from 'react';
import {
  Box,
  CheckCircle2,
  ChevronDown,
  ChevronLeft,
  ChevronRight,
  ClipboardCheck,
  Filter,
  Grid2X2,
  Home,
  LogOut,
  Menu,
  Package,
  PackageCheck,
  Pencil,
  Plus,
  RefreshCw,
  Search,
  Settings,
  Star,
  Tag,
  Timer,
  Trash2,
  UsersRound,
} from 'lucide-react';
import { getCategories } from '../services/categoryService.js';

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

const categories = [
  ['Dresses', 'Explore our wide range of stylish dresses for every occasion.', 142, 'Active', 'May 10, 2025', 'figure-floral'],
  ['Tops', 'Trendy tops, shirts and blouses for everyday fashion.', 68, 'Active', 'May 10, 2025', 'figure-sage'],
  ['Bottoms', 'Pants, jeans, skirts and more to match your style.', 54, 'Active', 'May 11, 2025', 'figure-champagne'],
  ['Ethnic Wear', 'Elegant ethnic collection for festive and traditional looks.', 41, 'Active', 'May 12, 2025', 'figure-maroon'],
  ['Accessories', 'Bags, scarves, belts and more to complete your look.', 22, 'Active', 'May 12, 2025', 'figure-lace'],
  ['Footwear', 'Stylish footwear for every occasion and comfort.', 18, 'Active', 'May 13, 2025', 'figure-sage'],
  ['Jewellery', 'Beautiful jewelry to add sparkle to your style.', 8, 'Inactive', 'May 14, 2025', 'figure-blush'],
  ['Handbags', 'Trendy and elegant handbags for every need.', 3, 'Inactive', 'May 14, 2025', 'figure-champagne'],
  ['Sunglasses', 'Stylish sunglasses for all seasons and moods.', 0, 'Inactive', 'May 15, 2025', 'figure-navy'],
  ['Watches', 'Modern and classic watches for every moment.', 0, 'Inactive', 'May 15, 2025', 'figure-maroon'],
].map(([name, description, products, status, created, figure]) => ({
  name,
  description,
  products,
  status,
  statusKey: status.toLowerCase(),
  created,
  figure,
  image: '',
}));

export default function ManageCategoriesPage() {
  const [categoryRows, setCategoryRows] = useState(categories);
  const [filters, setFilters] = useState({
    search: '',
    status: 'all',
  });
  const [isLoading, setIsLoading] = useState(true);
  const [apiError, setApiError] = useState('');

  useEffect(() => {
    let isMounted = true;

    const loadCategories = async () => {
      setIsLoading(true);
      setApiError('');

      try {
        const data = await getCategories({
          search: filters.search || undefined,
          status: filters.status,
        });

        if (isMounted) {
          setCategoryRows(data.map(mapApiCategory));
        }
      } catch (error) {
        if (isMounted) {
          setCategoryRows(categories);
          setApiError('Showing demo categories until the backend catalog is available.');
        }
      } finally {
        if (isMounted) {
          setIsLoading(false);
        }
      }
    };

    loadCategories();

    return () => {
      isMounted = false;
    };
  }, [filters]);

  const stats = useMemo(() => buildStats(categoryRows), [categoryRows]);

  return (
    <div className="min-h-screen bg-[#fbf7f4] text-ink">
      <div className="grid lg:grid-cols-[280px_1fr]">
        <AdminSidebar />
        <main className="min-w-0">
          <AdminTopbar />
          <div className="px-4 py-7 sm:px-8">
            <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
              <div>
                <h1 className="text-3xl font-extrabold">Manage Categories</h1>
                <p className="mt-3 text-sm text-neutral-600">Dashboard <span className="mx-2">›</span> Categories</p>
              </div>
              <button className="btn-primary h-12 gap-2"><Plus size={18} /> Add New Category</button>
            </div>
            <Stats stats={stats} />
            <Filters filters={filters} setFilters={setFilters} />
            <CategoryTable apiError={apiError} categories={categoryRows} isLoading={isLoading} />
          </div>
        </main>
      </div>
    </div>
  );
}

function AdminSidebar() {
  return (
    <aside className="hidden min-h-screen border-r border-[#eadfd8] bg-[#fff8f4] px-5 py-7 lg:block">
      <h2 className="font-serif text-4xl text-[#7a4c29]">Shara Shopping</h2>
      <p className="mt-3 text-xs font-extrabold uppercase tracking-[0.34em]">Admin Panel</p>
      <nav className="mt-10 space-y-2">
        {nav.map(([Icon, label, href]) => (
          <a className={`flex h-12 items-center gap-4 rounded-lg px-4 text-sm font-semibold ${label === 'Categories' ? 'bg-blush text-rosewood' : 'hover:bg-white'}`} href={href} key={label}>
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

function AdminTopbar() {
  return (
    <header className="flex flex-wrap items-center justify-between gap-4 border-b border-[#eadfd8] bg-white px-4 py-5 sm:px-8">
      <div className="flex items-center gap-5">
        <button className="icon-button bg-white" aria-label="Open admin menu"><Menu size={24} /></button>
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

function Stats({ stats }) {
  return (
    <section className="mt-7 grid gap-5 md:grid-cols-2 xl:grid-cols-4">
      {stats.map(({ icon: Icon, label, value, color }) => (
        <article className="rounded-lg border border-[#eadfd8] bg-white p-6 shadow-sm" key={label}>
          <div className="flex items-center gap-5">
            <span className={`grid h-16 w-16 place-items-center rounded-full ${color}`}><Icon size={29} /></span>
            <div><p className="text-sm text-neutral-700">{label}</p><p className="mt-2 text-3xl font-extrabold">{value}</p></div>
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
    setFilters({ search: '', status: 'all' });
  };

  return (
    <section className="mt-6 rounded-lg border border-[#eadfd8] bg-white p-5 shadow-sm">
      <div className="grid gap-5 lg:grid-cols-[1fr_0.75fr_auto_auto] lg:items-end">
        <label className="relative block">
          <Search className="absolute right-4 top-1/2 -translate-y-1/2 text-neutral-500" size={19} />
          <input
            className="form-control pr-12"
            onChange={(event) => updateFilter('search', event.target.value)}
            placeholder="Search categories..."
            value={filters.search}
          />
        </label>
        <label>
          <span className="form-label">Status</span>
          <span className="relative mt-2 block">
            <select
              className="form-control appearance-none pr-11"
              onChange={(event) => updateFilter('status', event.target.value)}
              value={filters.status}
            >
              <option value="all">All Status</option>
              <option value="active">Active</option>
              <option value="inactive">Inactive</option>
            </select>
            <ChevronDown className="pointer-events-none absolute right-4 top-1/2 -translate-y-1/2" size={17} />
          </span>
        </label>
        <button className="h-12 rounded border border-[#ded3c9] px-6 font-semibold" onClick={resetFilters}><RefreshCw className="inline" size={17} /> Reset</button>
        <button className="btn-primary h-12 gap-2 px-7"><Filter size={17} /> Filter</button>
      </div>
    </section>
  );
}

function CategoryTable({ apiError, categories, isLoading }) {
  return (
    <section className="mt-6 overflow-hidden rounded-lg border border-[#eadfd8] bg-white p-5 shadow-sm">
      {(isLoading || apiError) && (
        <div className={`mb-5 rounded-lg px-4 py-3 text-sm font-semibold ${apiError ? 'bg-[#fff3d8] text-[#9b6613]' : 'bg-blush text-rosewood'}`}>
          {isLoading ? 'Loading categories...' : apiError}
        </div>
      )}
      <div className="overflow-x-auto">
        <table className="w-full min-w-[980px] text-left text-sm">
          <thead>
            <tr className="border-b border-[#eadfd8] text-neutral-700">
              <th className="w-12 py-4">#</th>
              <th>Category Name</th>
              <th>Description</th>
              <th>Products</th>
              <th>Status</th>
              <th>Created At</th>
              <th className="text-right">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-[#eadfd8]">
            {categories.map((category, index) => (
              <CategoryRow category={category} index={index + 1} key={category.name} />
            ))}
          </tbody>
        </table>
      </div>
      <div className="flex flex-col gap-4 border-t border-[#eadfd8] pt-5 text-sm text-neutral-600 sm:flex-row sm:items-center sm:justify-between">
        <p>
          Showing {categories.length ? 1 : 0} to {categories.length} of {categories.length} categories
        </p>
        <div className="flex items-center gap-2">
          <PageButton><ChevronLeft size={16} /></PageButton>
          <PageButton active>1</PageButton>
          <PageButton>2</PageButton>
          <PageButton><ChevronRight size={16} /></PageButton>
          <button className="ml-3 h-10 rounded border border-[#ded3c9] px-4">10 / page <ChevronDown className="inline" size={15} /></button>
        </div>
      </div>
    </section>
  );
}

function CategoryRow({ category, index }) {
  return (
    <tr>
      <td className="py-3 font-semibold">{index}</td>
      <td>
        <div className="flex items-center gap-4">
          <span className="relative h-12 w-10 shrink-0 overflow-hidden rounded bg-gradient-to-br from-[#f6d7c7] to-[#d99c7e]">
            {category.image ? (
              <img className="h-full w-full object-cover" src={category.image} alt="" />
            ) : (
              <span className={`product-silhouette ${category.figure} !h-[90%] !w-[44%]`} />
            )}
          </span>
          <span className="font-bold">{category.name}</span>
        </div>
      </td>
      <td className="max-w-md text-neutral-700">{category.description}</td>
      <td className="font-semibold">{category.products}</td>
      <td><Status status={category.status} /></td>
      <td>{category.created}</td>
      <td>
        <div className="flex justify-end gap-3">
          <button className="grid h-10 w-10 place-items-center rounded border border-[#ded3c9]" aria-label={`Edit ${category.name}`}><Pencil size={17} /></button>
          <button className="grid h-10 w-10 place-items-center rounded border border-[#ded3c9] text-rosewood" aria-label={`Delete ${category.name}`}><Trash2 size={17} /></button>
        </div>
      </td>
    </tr>
  );
}

function Status({ status }) {
  return <span className={`rounded px-4 py-1 text-sm font-bold ${status === 'Active' ? 'bg-[#d8f8df] text-[#12833c]' : 'bg-[#ffe0e8] text-[#c83248]'}`}>{status}</span>;
}

function buildStats(categoriesList) {
  const activeCategories = categoriesList.filter((category) => category.statusKey === 'active').length;
  const inactiveCategories = categoriesList.filter((category) => category.statusKey === 'inactive').length;
  const totalProducts = categoriesList.reduce((total, category) => total + category.products, 0);

  return [
    { icon: Grid2X2, label: 'Total Categories', value: String(categoriesList.length), color: 'bg-blush text-rosewood' },
    { icon: CheckCircle2, label: 'Active Categories', value: String(activeCategories), color: 'bg-[#dcf5ea] text-[#15945d]' },
    { icon: Timer, label: 'Inactive Categories', value: String(inactiveCategories), color: 'bg-[#fff3d8] text-[#cc8b18]' },
    { icon: Tag, label: 'Total Products in Categories', value: String(totalProducts), color: 'bg-[#ebe5ff] text-[#6d4dd8]' },
  ];
}

function mapApiCategory(category, index) {
  const figures = ['figure-floral', 'figure-sage', 'figure-champagne', 'figure-maroon', 'figure-lace', 'figure-blush'];
  const status = category.isActive ? 'Active' : 'Inactive';

  return {
    name: category.name,
    description: category.description || 'No description added yet.',
    products: 0,
    status,
    statusKey: status.toLowerCase(),
    created: formatDate(category.createdAt),
    figure: figures[index % figures.length],
    image: category.image?.url || '',
  };
}

function formatDate(value) {
  if (!value) return 'Recently';

  return new Intl.DateTimeFormat('en-US', {
    day: 'numeric',
    month: 'short',
    year: 'numeric',
  }).format(new Date(value));
}

function PageButton({ children, active = false }) {
  return <button className={`grid h-10 min-w-10 place-items-center rounded border px-3 font-semibold ${active ? 'border-rosewood bg-rosewood text-white' : 'border-[#ded3c9] bg-white text-ink'}`}>{children}</button>;
}
