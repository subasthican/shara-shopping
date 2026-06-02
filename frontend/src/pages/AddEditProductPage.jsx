import {
  ArrowLeft,
  Box,
  ChevronDown,
  ClipboardCheck,
  Eye,
  Home,
  LogOut,
  Menu,
  MessageCircle,
  Package,
  PackageCheck,
  Save,
  Search,
  Settings,
  Star,
  Tag,
  Timer,
  UploadCloud,
  UsersRound,
} from 'lucide-react';
import { useEffect, useMemo, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { getCategories } from '../services/categoryService.js';
import { createProduct, getProductById, updateProduct } from '../services/productService.js';

const nav = [
  [Home, 'Dashboard', '/admin/dashboard'],
  [ClipboardCheck, 'Orders', '/admin/orders'],
  [Package, 'Products', '/admin/products'],
  [Box, 'Categories', '/admin/categories'],
  [UsersRound, 'Customers', '/admin/customers'],
  [MessageCircle, 'Messages', '/admin/messages'],
  [Tag, 'Offers & Coupons', '#offers'],
  [PackageCheck, 'Inventory', '#inventory'],
  [Star, 'Reviews', '#reviews'],
  [Timer, 'Reports', '#reports'],
  [Settings, 'Settings', '/admin/settings'],
  [UsersRound, 'Users', '#users'],
  [LogOut, 'Logout', '#logout'],
];

const defaultCategories = [
  { _id: 'maxi-dresses', name: 'Maxi Dresses' },
  { _id: 'midi-dresses', name: 'Midi Dresses' },
  { _id: 'mini-dresses', name: 'Mini Dresses' },
  { _id: 'evening-dresses', name: 'Evening Dresses' },
  { _id: 'party-dresses', name: 'Party Dresses' },
];

const initialForm = {
  name: 'Floral Chiffon Midi Dress',
  sku: 'DRE-CHIF-001',
  category: '',
  subcategory: 'Midi Dresses',
  brand: 'Shara Collection',
  tags: 'floral, chiffon, midi, casual',
  shortDescription: 'Elegant floral chiffon midi dress with a flowy silhouette and feminine charm.',
  description: 'This floral chiffon midi dress is crafted from premium lightweight chiffon fabric, featuring a delicate floral print, soft lining, and a flattering silhouette.',
  price: '14500',
  salePrice: '11500',
  stock: '50',
  sizes: ['XS', 'S', 'M', 'L'],
  colourName: 'Peach',
  colourHex: '#d99c7e',
  imageUrl: '',
  status: 'active',
  isFeatured: false,
  isNewArrival: true,
  isBestSeller: false,
};

export default function AddEditProductPage() {
  const { productId } = useParams();
  const navigate = useNavigate();
  const isEditMode = Boolean(productId);
  const [form, setForm] = useState(initialForm);
  const [categories, setCategories] = useState(defaultCategories);
  const [isLoading, setIsLoading] = useState(true);
  const [isSaving, setIsSaving] = useState(false);
  const [notice, setNotice] = useState('');
  const [error, setError] = useState('');

  useEffect(() => {
    let isMounted = true;

    const loadFormData = async () => {
      setIsLoading(true);
      setError('');
      setNotice('');

      try {
        const [categoryData, productData] = await Promise.all([
          getCategories({ status: 'active' }).catch(() => defaultCategories),
          isEditMode ? getProductById(productId) : Promise.resolve(null),
        ]);

        if (!isMounted) return;

        const nextCategories = categoryData.length ? categoryData : defaultCategories;
        setCategories(nextCategories);
        setForm((current) => ({
          ...current,
          category: current.category || nextCategories[0]?._id || '',
        }));

        if (productData) {
          setForm(mapProductToForm(productData));
        }
      } catch (loadError) {
        if (isMounted) {
          setError('Showing demo product form until admin API access is available.');
        }
      } finally {
        if (isMounted) {
          setIsLoading(false);
        }
      }
    };

    loadFormData();

    return () => {
      isMounted = false;
    };
  }, [isEditMode, productId]);

  const previewProduct = useMemo(() => ({
    name: form.name,
    price: formatCurrency(Number(form.salePrice || form.price || 0)),
    badge: form.isBestSeller ? 'Bestseller' : form.isNewArrival ? 'New' : '',
    accent: 'from-[#f6d7c7] via-[#fbf3ea] to-[#d99c7e]',
    figure: 'figure-floral',
    image: form.imageUrl,
    sizes: form.sizes,
  }), [form]);

  const updateField = (field, value) => {
    setForm((current) => ({ ...current, [field]: value }));
  };

  const toggleSize = (size) => {
    setForm((current) => ({
      ...current,
      sizes: current.sizes.includes(size)
        ? current.sizes.filter((item) => item !== size)
        : [...current.sizes, size],
    }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    setIsSaving(true);
    setError('');
    setNotice('');

    try {
      const payload = buildProductPayload(form);

      if (isEditMode) {
        await updateProduct(productId, payload);
        setNotice('Product updated successfully.');
      } else {
        const product = await createProduct(payload);
        setNotice('Product created successfully.');
        navigate(`/admin/products/${product._id}/edit`, { replace: true });
      }
    } catch (saveError) {
      setError(saveError.response?.data?.message || 'Unable to save product. Check required fields and admin access.');
    } finally {
      setIsSaving(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#fbf7f4] text-ink">
      <div className="grid lg:grid-cols-[280px_1fr]">
        <AdminSidebar />
        <main className="min-w-0">
          <AdminTopbar />
          <form className="px-4 py-7 sm:px-8" onSubmit={handleSubmit}>
            <div className="flex flex-col gap-4 xl:flex-row xl:items-start xl:justify-between">
              <div>
                <h1 className="text-3xl font-extrabold">{isEditMode ? 'Edit Product' : 'Add Product'}</h1>
                <p className="mt-3 text-sm text-neutral-600">
                  Dashboard <span className="mx-2">›</span> Products <span className="mx-2">›</span> {isEditMode ? 'Edit Product' : 'Add Product'}
                </p>
              </div>
              <div className="flex flex-wrap gap-3">
                <button className="inline-flex h-11 items-center gap-2 rounded border border-[#ded3c9] bg-white px-5 font-semibold" onClick={() => navigate('/admin/products')} type="button">
                  <ArrowLeft size={17} /> Back
                </button>
                <a className="inline-flex h-11 items-center gap-2 rounded border border-[#ded3c9] bg-white px-5 font-semibold" href={`/products/${form.slug || slugify(form.name)}`}>
                  <Eye size={17} /> Preview
                </a>
                <button className="btn-primary h-11 gap-2" disabled={isSaving} type="submit">
                  <Save size={17} /> {isSaving ? 'Saving...' : 'Save Product'}
                </button>
              </div>
            </div>

            {(isLoading || notice || error) && (
              <div className={`mt-6 rounded-lg px-4 py-3 text-sm font-semibold ${error ? 'bg-[#fff3d8] text-[#9b6613]' : notice ? 'bg-[#dcf5ea] text-[#15945d]' : 'bg-blush text-rosewood'}`}>
                {isLoading ? 'Loading product form...' : notice || error}
              </div>
            )}

            <div className="mt-6 grid gap-6 xl:grid-cols-[1fr_520px]">
              <div className="space-y-6">
                <ProductInformation categories={categories} form={form} updateField={updateField} />
                <Pricing form={form} updateField={updateField} />
                <div className="grid gap-6 xl:grid-cols-[1fr_1fr]">
                  <Stock form={form} toggleSize={toggleSize} updateField={updateField} />
                  <Shipping form={form} updateField={updateField} />
                </div>
              </div>
              <aside className="space-y-6">
                <ProductImages form={form} updateField={updateField} />
                <ProductStatus form={form} updateField={updateField} />
                <PreviewCard product={previewProduct} />
              </aside>
            </div>
          </form>
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
        <button className="icon-button bg-white" aria-label="Open admin menu" type="button"><Menu size={24} /></button>
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

function ProductInformation({ categories, form, updateField }) {
  return (
    <Card title="Product Information">
      <div className="grid gap-5 md:grid-cols-2">
        <Field label="Product Name" required value={form.name} onChange={(value) => updateField('name', value)} />
        <Field label="SKU" required value={form.sku} onChange={(value) => updateField('sku', value)} />
        <Select label="Category" required value={form.category} onChange={(value) => updateField('category', value)}>
          {categories.map((category) => (
            <option key={category._id} value={category._id}>{category.name}</option>
          ))}
        </Select>
        <Field label="Sub Category" value={form.subcategory} onChange={(value) => updateField('subcategory', value)} />
        <Field label="Brand" value={form.brand} onChange={(value) => updateField('brand', value)} />
        <Field label="Tags" value={form.tags} help="Enter tags separated by comma" onChange={(value) => updateField('tags', value)} />
      </div>
      <Field label="Short Description" required value={form.shortDescription} onChange={(value) => updateField('shortDescription', value)} />
      <label>
        <Label text="Description" required />
        <textarea className="form-control mt-2 min-h-32 py-3" value={form.description} onChange={(event) => updateField('description', event.target.value)} />
      </label>
    </Card>
  );
}

function Pricing({ form, updateField }) {
  return (
    <Card title="Pricing">
      <div className="grid gap-5 md:grid-cols-2">
        <Field label="Regular Price (LKR)" required type="number" value={form.price} onChange={(value) => updateField('price', value)} />
        <Field label="Sale Price (LKR)" type="number" value={form.salePrice} onChange={(value) => updateField('salePrice', value)} />
      </div>
    </Card>
  );
}

function Stock({ form, toggleSize, updateField }) {
  return (
    <Card title="Stock & Sizes">
      <Field label="Stock Quantity" required type="number" value={form.stock} onChange={(value) => updateField('stock', value)} />
      <div>
        <Label text="Sizes" />
        <div className="mt-2 flex flex-wrap gap-2">
          {['XS', 'S', 'M', 'L', 'XL', 'XXL'].map((size) => (
            <button className={`h-9 rounded border px-3 text-sm font-semibold ${form.sizes.includes(size) ? 'border-ink bg-ink text-white' : 'border-[#d8cec4] bg-white'}`} key={size} onClick={() => toggleSize(size)} type="button">
              {size}
            </button>
          ))}
        </div>
      </div>
    </Card>
  );
}

function Shipping({ form, updateField }) {
  return (
    <Card title="Colour">
      <Field label="Colour Name" value={form.colourName} onChange={(value) => updateField('colourName', value)} />
      <Field label="Colour Hex" value={form.colourHex} onChange={(value) => updateField('colourHex', value)} />
    </Card>
  );
}

function ProductImages({ form, updateField }) {
  return (
    <Card title="Product Images">
      <div className="grid min-h-32 place-items-center rounded border border-dashed border-[#bfb3a8] bg-[#fffdfb] p-6 text-center">
        <UploadCloud size={34} />
        <p className="mt-2 font-medium">Paste an image URL for this version</p>
        <p className="mt-2 text-xs text-neutral-500">Cloudinary upload can be added later</p>
      </div>
      <Field label="Image URL" value={form.imageUrl} onChange={(value) => updateField('imageUrl', value)} />
      <div className="mt-5 h-40 overflow-hidden rounded bg-gradient-to-br from-[#f6d7c7] to-[#d99c7e]">
        {form.imageUrl ? <img className="h-full w-full object-cover" src={form.imageUrl} alt="" /> : <span className="product-silhouette figure-floral !h-[92%] !w-[34%]" />}
      </div>
    </Card>
  );
}

function ProductStatus({ form, updateField }) {
  return (
    <Card title="Product Status">
      <Select label="Status" value={form.status} onChange={(value) => updateField('status', value)}>
        <option value="active">Active</option>
        <option value="draft">Draft</option>
        <option value="inactive">Inactive</option>
      </Select>
      <Toggle label="Featured Product" enabled={form.isFeatured} onChange={() => updateField('isFeatured', !form.isFeatured)} />
      <Toggle label="New Arrival" enabled={form.isNewArrival} onChange={() => updateField('isNewArrival', !form.isNewArrival)} />
      <Toggle label="Best Seller" enabled={form.isBestSeller} onChange={() => updateField('isBestSeller', !form.isBestSeller)} />
    </Card>
  );
}

function PreviewCard({ product }) {
  return (
    <Card title="Preview">
      <div className={`relative flex aspect-[4/3] items-end justify-center overflow-hidden rounded bg-gradient-to-br ${product.accent}`}>
        {product.image ? <img className="h-full w-full object-cover" src={product.image} alt="" /> : <span className={`product-silhouette ${product.figure}`} />}
      </div>
      <div>
        <p className="font-bold">{product.name}</p>
        <p className="mt-1 text-sm font-semibold text-rosewood">{product.price}</p>
      </div>
    </Card>
  );
}

function Card({ title, children }) {
  return <section className="rounded-lg border border-[#eadfd8] bg-white p-6 shadow-sm"><h2 className="text-xl font-bold">{title}</h2><div className="mt-6 space-y-5">{children}</div></section>;
}

function Field({ label, value, onChange, required = false, help, type = 'text' }) {
  const inputProps = onChange ? { onChange: (event) => onChange(event.target.value), value } : { defaultValue: value };

  return (
    <label>
      <Label text={label} required={required} />
      <input className="form-control mt-2" type={type} {...inputProps} />
      {help && <p className="mt-2 text-xs text-neutral-500">{help}</p>}
    </label>
  );
}

function Select({ label, value, onChange, required = false, children }) {
  return (
    <label>
      <Label text={label} required={required} />
      <span className="relative mt-2 block">
        <select className="form-control appearance-none pr-11" value={value} onChange={(event) => onChange(event.target.value)}>
          {children}
        </select>
        <ChevronDown className="pointer-events-none absolute right-4 top-1/2 -translate-y-1/2" size={17} />
      </span>
    </label>
  );
}

function Label({ text, required = false }) {
  return <span className="form-label">{text} {required && <span className="text-rosewood">*</span>}</span>;
}

function Toggle({ label, enabled = false, onChange }) {
  return (
    <div className="flex items-center justify-between">
      <span className="form-label">{label}</span>
      <button className={`relative h-6 w-11 rounded-full ${enabled ? 'bg-rosewood' : 'bg-neutral-200'}`} onClick={onChange} type="button">
        <span className={`absolute top-1 h-4 w-4 rounded-full bg-white transition ${enabled ? 'right-1' : 'left-1'}`} />
      </button>
    </div>
  );
}

function mapProductToForm(product) {
  const colour = product.colours?.[0] || {};
  const image = product.images?.find((item) => item.isCover) || product.images?.[0] || {};

  return {
    name: product.name || '',
    sku: product.sku || '',
    category: product.category?._id || product.category || '',
    subcategory: product.subcategory || '',
    brand: product.brand || 'Shara Collection',
    tags: product.tags?.join(', ') || '',
    shortDescription: product.shortDescription || '',
    description: product.description || '',
    price: String(product.price || ''),
    salePrice: String(product.salePrice || ''),
    stock: String(product.stock || 0),
    sizes: product.sizes?.length ? product.sizes : ['XS', 'S', 'M', 'L'],
    colourName: colour.name || '',
    colourHex: colour.hex || '#d99c7e',
    imageUrl: image.url || '',
    status: product.status || 'draft',
    isFeatured: Boolean(product.isFeatured),
    isNewArrival: Boolean(product.isNewArrival),
    isBestSeller: Boolean(product.isBestSeller),
    slug: product.slug || '',
  };
}

function buildProductPayload(form) {
  return {
    name: form.name,
    slug: slugify(form.name),
    sku: form.sku,
    category: form.category,
    subcategory: form.subcategory,
    brand: form.brand,
    tags: form.tags.split(',').map((tag) => tag.trim()).filter(Boolean),
    description: form.description,
    shortDescription: form.shortDescription,
    price: Number(form.price),
    salePrice: form.salePrice ? Number(form.salePrice) : undefined,
    stock: Number(form.stock),
    sizes: form.sizes,
    colours: form.colourName ? [{ name: form.colourName, hex: form.colourHex }] : [],
    images: form.imageUrl ? [{ url: form.imageUrl, isCover: true }] : [],
    status: form.status,
    isFeatured: form.isFeatured,
    isNewArrival: form.isNewArrival,
    isBestSeller: form.isBestSeller,
  };
}

function formatCurrency(value) {
  return new Intl.NumberFormat('en-LK', {
    currency: 'LKR',
    maximumFractionDigits: 0,
    style: 'currency',
  }).format(value || 0);
}

function slugify(value) {
  return value.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '');
}
