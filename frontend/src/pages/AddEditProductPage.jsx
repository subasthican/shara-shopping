import {
  ArrowLeft,
  Bold,
  Box,
  ChevronDown,
  ClipboardCheck,
  Eye,
  Home,
  Image,
  Italic,
  Link,
  List,
  LogOut,
  Menu,
  Package,
  PackageCheck,
  Save,
  Search,
  Settings,
  Star,
  Tag,
  Timer,
  Trash2,
  Type,
  Underline,
  UploadCloud,
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

const thumbs = ['figure-floral', 'figure-blush', 'figure-champagne', 'figure-lace'];

export default function AddEditProductPage() {
  return (
    <div className="min-h-screen bg-[#fbf7f4] text-ink">
      <div className="grid lg:grid-cols-[280px_1fr]">
        <AdminSidebar />
        <main className="min-w-0">
          <AdminTopbar />
          <div className="px-4 py-7 sm:px-8">
            <div className="flex flex-col gap-4 xl:flex-row xl:items-start xl:justify-between">
              <div>
                <h1 className="text-3xl font-extrabold">Add / Edit Product</h1>
                <p className="mt-3 text-sm text-neutral-600">Dashboard <span className="mx-2">›</span> Products <span className="mx-2">›</span> Add / Edit Product</p>
              </div>
              <div className="flex flex-wrap gap-3">
                <button className="inline-flex h-11 items-center gap-2 rounded border border-[#ded3c9] bg-white px-5 font-semibold"><ArrowLeft size={17} /> Back</button>
                <button className="inline-flex h-11 items-center gap-2 rounded border border-[#ded3c9] bg-white px-5 font-semibold"><Eye size={17} /> Preview</button>
                <button className="btn-primary h-11 gap-2"><Save size={17} /> Save Product</button>
              </div>
            </div>

            <div className="mt-6 grid gap-6 xl:grid-cols-[1fr_520px]">
              <div className="space-y-6">
                <ProductInformation />
                <Pricing />
                <div className="grid gap-6 xl:grid-cols-[1fr_1fr]">
                  <Stock />
                  <Shipping />
                </div>
              </div>
              <aside className="space-y-6">
                <ProductImages />
                <ProductStatus />
                <SeoInfo />
              </aside>
            </div>
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
          <a className={`flex h-12 items-center gap-4 rounded-lg px-4 text-sm font-semibold ${label === 'Products' ? 'bg-blush text-rosewood' : 'hover:bg-white'}`} href={href} key={label}>
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
          <input className="h-12 w-full rounded-lg border border-[#eadfd8] bg-[#fbfaf9] px-12 outline-none focus:border-rosewood" placeholder="Search orders, products, customers..." />
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

function ProductInformation() {
  return (
    <Card title="Product Information">
      <div className="grid gap-5 md:grid-cols-2">
        <Field label="Product Name" value="Floral Chiffon Midi Dress" required />
        <Field label="SKU" value="DRE-CHIF-001" required />
        <Select label="Category" value="Dresses" required />
        <Select label="Sub Category" value="Midi Dresses" />
        <Field label="Brand" value="Shara Collection" />
        <Field label="Tags" value="floral, chiffon, midi, casual" help="Enter tags separated by comma" />
      </div>
      <Field label="Short Description" value="Elegant floral chiffon midi dress with a flowy silhouette and feminine charm." required />
      <div>
        <Label text="Description" required />
        <div className="mt-2 overflow-hidden rounded border border-[#d9d1cb] bg-white">
          <div className="flex flex-wrap items-center gap-3 border-b border-[#eadfd8] px-4 py-3">
            <button className="inline-flex items-center gap-2 text-sm">Paragraph <ChevronDown size={15} /></button>
            {[Bold, Italic, Underline, List, Type, Link, Image].map((Icon, index) => <Icon size={18} key={index} />)}
          </div>
          <textarea className="min-h-32 w-full resize-y px-4 py-4 text-sm outline-none" defaultValue={'This floral chiffon midi dress is crafted from premium lightweight chiffon fabric, featuring a delicate floral print, soft lining, and a flattering silhouette.\nPerfect for brunches, day outings, and special occasions.'} />
        </div>
      </div>
    </Card>
  );
}

function Pricing() {
  return (
    <Card title="Pricing">
      <div className="grid gap-5 md:grid-cols-4">
        <Field label="Regular Price (LKR)" value="14,500" required />
        <Field label="Sale Price (LKR)" value="11,500" />
        <Field label="Cost Price (LKR)" value="7,500" />
        <Field label="Tax (%)" value="15" />
      </div>
    </Card>
  );
}

function Stock() {
  return (
    <Card title="Stock">
      <div className="grid gap-5 md:grid-cols-3">
        <Field label="Stock Quantity" value="50" required />
        <Field label="Low Stock Alert" value="5" />
        <Select label="Unit" value="Pcs" />
      </div>
    </Card>
  );
}

function Shipping() {
  return (
    <Card title="Weight & Shipping">
      <div className="grid gap-5 md:grid-cols-2">
        <Field label="Weight (kg)" value="0.40" />
        <Field label="Shipping Fee (LKR)" value="350" />
      </div>
    </Card>
  );
}

function ProductImages() {
  return (
    <Card title="Product Images">
      <div className="grid min-h-32 place-items-center rounded border border-dashed border-[#bfb3a8] bg-[#fffdfb] p-6 text-center">
        <UploadCloud size={34} />
        <p className="mt-2 font-medium">Drag & drop images here<br />or click to browse</p>
        <p className="mt-2 text-xs text-neutral-500">Recommended size: 800 x 1000px</p>
      </div>
      <div className="mt-5 grid grid-cols-4 gap-4">
        {thumbs.map((figure, index) => (
          <div className="relative h-28 overflow-hidden rounded bg-gradient-to-br from-[#f6d7c7] to-[#d99c7e]" key={figure}>
            <span className={`product-silhouette ${figure} !h-[90%] !w-[40%]`} />
            <button className="absolute right-2 top-2 grid h-6 w-6 place-items-center rounded-full bg-white">×</button>
            {index === 0 && <span className="absolute bottom-2 left-2 rounded bg-rosewood px-3 py-1 text-xs font-bold text-white">Cover</span>}
          </div>
        ))}
      </div>
      <p className="mt-3 text-sm text-neutral-600">You can upload up to 6 images</p>
    </Card>
  );
}

function ProductStatus() {
  return (
    <Card title="Product Status">
      <Select label="Status" value="Active" />
      <Toggle label="Featured Product" enabled />
      <Toggle label="New Arrival" enabled />
      <Toggle label="Best Seller" />
    </Card>
  );
}

function SeoInfo() {
  return (
    <Card title="SEO Information">
      <Field label="Meta Title" value="Floral Chiffon Midi Dress - Shara Shopping" help="Recommended length: 50-60 characters" />
      <label>
        <Label text="Meta Description" />
        <textarea className="form-control mt-2 min-h-20 py-3" defaultValue="Shop the elegant floral chiffon midi dress at Shara Shopping. Perfect for casual outings and special occasions." />
        <p className="mt-2 text-xs text-neutral-500">Recommended length: 150-160 characters</p>
      </label>
      <Field label="URL Slug" value="floral-chiffon-midi-dress" help="https://sharashopping.lk/product/floral-chiffon-midi-dress" />
    </Card>
  );
}

function Card({ title, children }) {
  return <section className="rounded-lg border border-[#eadfd8] bg-white p-6 shadow-sm"><h2 className="text-xl font-bold">{title}</h2><div className="mt-6 space-y-5">{children}</div></section>;
}

function Field({ label, value, required = false, help }) {
  return (
    <label>
      <Label text={label} required={required} />
      <input className="form-control mt-2" defaultValue={value} />
      {help && <p className="mt-2 text-xs text-neutral-500">{help}</p>}
    </label>
  );
}

function Select({ label, value, required = false }) {
  return (
    <label>
      <Label text={label} required={required} />
      <button className="form-control mt-2 flex items-center justify-between text-left" type="button">{value} <ChevronDown size={17} /></button>
    </label>
  );
}

function Label({ text, required = false }) {
  return <span className="form-label">{text} {required && <span className="text-rosewood">*</span>}</span>;
}

function Toggle({ label, enabled = false }) {
  return (
    <div className="flex items-center justify-between">
      <span className="form-label">{label}</span>
      <button className={`relative h-6 w-11 rounded-full ${enabled ? 'bg-rosewood' : 'bg-neutral-200'}`} type="button">
        <span className={`absolute top-1 h-4 w-4 rounded-full bg-white transition ${enabled ? 'right-1' : 'left-1'}`} />
      </button>
    </div>
  );
}
