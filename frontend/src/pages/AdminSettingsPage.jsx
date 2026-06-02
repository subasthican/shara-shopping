import { useEffect, useState } from 'react';
import {
  Bell,
  Box,
  ChevronDown,
  ClipboardCheck,
  Cloud,
  Home,
  KeyRound,
  LogOut,
  Mail,
  Menu,
  MessageCircle,
  Package,
  PackageCheck,
  Save,
  Settings,
  ShieldCheck,
  Star,
  Store,
  Tag,
  Timer,
  Truck,
  UsersRound,
} from 'lucide-react';
import {
  changeAdminPassword,
  getAdminProfile,
  getStoredAdmin,
  updateAdminProfile,
} from '../services/authService.js';

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

const panels = [
  { icon: Store, title: 'Store Profile', copy: 'Name, contact details, brand identity, and public store information.' },
  { icon: Truck, title: 'Delivery Rules', copy: 'Shipping districts, delivery fees, and estimated delivery windows.' },
  { icon: Mail, title: 'Email Alerts', copy: 'Admin notifications for new orders and customer messages.' },
  { icon: ShieldCheck, title: 'Security', copy: 'Admin sessions, password rules, and JWT authentication settings.' },
];

export default function AdminSettingsPage() {
  const storedAdmin = getStoredAdmin();
  const [profileForm, setProfileForm] = useState({
    email: storedAdmin?.email || 'support@sharashopping.lk',
    name: storedAdmin?.name || 'Admin',
    phone: '+94 77 123 4567',
    storeAddress: 'Colombo, Sri Lanka',
    storeName: 'Shara Shopping',
    whatsapp: '+94 77 123 4567',
  });
  const [passwordForm, setPasswordForm] = useState({
    currentPassword: '',
    newPassword: '',
  });
  const [profileStatus, setProfileStatus] = useState('');
  const [passwordStatus, setPasswordStatus] = useState('');
  const [isSavingProfile, setIsSavingProfile] = useState(false);
  const [isChangingPassword, setIsChangingPassword] = useState(false);

  useEffect(() => {
    let isMounted = true;

    const loadProfile = async () => {
      try {
        const { admin } = await getAdminProfile();

        if (isMounted) {
          setProfileForm((current) => ({
            ...current,
            email: admin.email || current.email,
            name: admin.name || current.name,
          }));
        }
      } catch (error) {
        if (isMounted) {
          setProfileStatus('Showing stored profile until admin API access is available.');
        }
      }
    };

    loadProfile();

    return () => {
      isMounted = false;
    };
  }, []);

  const updateProfileField = (field, value) => {
    setProfileForm((current) => ({ ...current, [field]: value }));
  };

  const updatePasswordField = (field, value) => {
    setPasswordForm((current) => ({ ...current, [field]: value }));
  };

  const handleSaveProfile = async () => {
    setIsSavingProfile(true);
    setProfileStatus('');

    try {
      await updateAdminProfile({
        email: profileForm.email,
        name: profileForm.name,
      });
      setProfileStatus('Admin profile saved successfully.');
    } catch (error) {
      setProfileStatus('Profile form saved locally. Connect admin API access to persist changes.');
    } finally {
      setIsSavingProfile(false);
    }
  };

  const handleChangePassword = async () => {
    setIsChangingPassword(true);
    setPasswordStatus('');

    try {
      await changeAdminPassword(passwordForm);
      setPasswordForm({ currentPassword: '', newPassword: '' });
      setPasswordStatus('Password updated successfully.');
    } catch (error) {
      setPasswordStatus('Password was not changed. Check the current password and try again.');
    } finally {
      setIsChangingPassword(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#fbf7f4] text-ink">
      <div className="grid lg:grid-cols-[280px_1fr]">
        <SettingsSidebar />
        <main className="min-w-0">
          <SettingsTopbar />
          <div className="px-4 py-7 sm:px-8">
            <div className="flex flex-col gap-4 xl:flex-row xl:items-start xl:justify-between">
              <div>
                <h1 className="text-3xl font-extrabold">Admin Settings</h1>
                <p className="mt-3 text-sm text-neutral-600">
                  Dashboard <span className="mx-2">›</span> Settings
                </p>
              </div>
              <button className="btn-primary h-11 gap-2 px-5" disabled={isSavingProfile} onClick={handleSaveProfile}>
                <Save size={17} /> {isSavingProfile ? 'Saving...' : 'Save Changes'}
              </button>
            </div>

            <SettingsOverview />
            <div className="mt-6 grid gap-6 xl:grid-cols-[1fr_420px]">
              <div className="space-y-6">
                <StoreProfile
                  form={profileForm}
                  onChange={updateProfileField}
                  onSave={handleSaveProfile}
                  status={profileStatus}
                />
                <DeliverySettings />
                <NotificationSettings />
              </div>
              <aside className="space-y-6">
                <SecuritySettings
                  form={passwordForm}
                  isChangingPassword={isChangingPassword}
                  onChange={updatePasswordField}
                  onSubmit={handleChangePassword}
                  status={passwordStatus}
                />
                <IntegrationStatus />
                <SupportCard />
              </aside>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}

function SettingsSidebar() {
  return (
    <aside className="hidden min-h-screen border-r border-[#eadfd8] bg-[#fff8f4] px-5 py-7 lg:block">
      <h2 className="font-serif text-4xl text-[#7a4c29]">Shara Shopping</h2>
      <p className="mt-3 text-xs font-extrabold uppercase tracking-[0.34em]">Admin Panel</p>
      <nav className="mt-10 space-y-2">
        {nav.map(([Icon, label, href]) => (
          <a
            className={`flex h-12 items-center gap-4 rounded-lg px-4 text-sm font-semibold ${
              label === 'Settings' ? 'bg-blush text-rosewood' : 'hover:bg-white'
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
        <p className="mt-4 font-serif text-lg leading-7">A polished store begins with careful settings.</p>
        <p className="mt-3 text-sm font-semibold text-rosewood">- Settings</p>
      </div>
    </aside>
  );
}

function SettingsTopbar() {
  return (
    <header className="flex flex-wrap items-center justify-between gap-4 border-b border-[#eadfd8] bg-white px-4 py-5 sm:px-8">
      <div className="flex items-center gap-5">
        <button className="icon-button bg-white" aria-label="Open admin menu">
          <Menu size={24} />
        </button>
        <div>
          <p className="font-bold">Store Configuration</p>
          <p className="mt-1 text-sm text-neutral-600">Manage operational preferences and integrations.</p>
        </div>
      </div>
      <div className="flex items-center gap-3">
        <button className="relative icon-button bg-white shadow-sm" aria-label="Settings alerts">
          <Bell size={20} />
          <span className="absolute -right-1 -top-1 grid h-5 w-5 place-items-center rounded-full bg-rosewood text-xs font-bold text-white">2</span>
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

function SettingsOverview() {
  return (
    <section className="mt-7 grid gap-4 md:grid-cols-2 xl:grid-cols-4">
      {panels.map(({ icon: Icon, title, copy }) => (
        <article className="rounded-lg border border-[#eadfd8] bg-white p-5 shadow-sm" key={title}>
          <span className="grid h-12 w-12 place-items-center rounded-full bg-blush text-rosewood">
            <Icon size={24} />
          </span>
          <h2 className="mt-4 font-bold">{title}</h2>
          <p className="mt-2 text-sm leading-6 text-neutral-700">{copy}</p>
        </article>
      ))}
    </section>
  );
}

function StoreProfile({ form, onChange, onSave, status }) {
  return (
    <Card title="Store Profile">
      {status && <StatusBanner message={status} />}
      <div className="grid gap-5 md:grid-cols-2">
        <Field label="Store Name" onChange={(value) => onChange('storeName', value)} value={form.storeName} />
        <Field label="Admin Name" onChange={(value) => onChange('name', value)} value={form.name} />
        <Field label="Support Email" onChange={(value) => onChange('email', value)} type="email" value={form.email} />
        <Field label="Phone Number" onChange={(value) => onChange('phone', value)} value={form.phone} />
        <Field label="WhatsApp Number" onChange={(value) => onChange('whatsapp', value)} value={form.whatsapp} />
      </div>
      <label className="block">
        <span className="form-label">Store Address</span>
        <textarea
          className="form-control mt-2 min-h-24 py-3"
          onChange={(event) => onChange('storeAddress', event.target.value)}
          value={form.storeAddress}
        />
      </label>
      <button className="btn-primary h-11 gap-2 px-5" onClick={onSave}>
        <Save size={17} /> Save Profile
      </button>
    </Card>
  );
}

function DeliverySettings() {
  return (
    <Card title="Delivery Settings">
      <div className="grid gap-5 md:grid-cols-3">
        <Field label="Standard Fee (LKR)" value="350" />
        <Field label="Free Shipping Over (LKR)" value="15000" />
        <Select label="Default Delivery Window" value="2 - 3 working days" />
      </div>
      <div className="grid gap-4 md:grid-cols-2">
        <Toggle label="Islandwide Delivery" enabled />
        <Toggle label="WhatsApp Order Confirmation" enabled />
      </div>
    </Card>
  );
}

function NotificationSettings() {
  return (
    <Card title="Notification Settings">
      <div className="grid gap-4 md:grid-cols-2">
        <Toggle label="Email admin on new order" enabled />
        <Toggle label="Email admin on contact message" enabled />
        <Toggle label="Low stock alerts" enabled />
        <Toggle label="Daily dashboard summary" />
      </div>
    </Card>
  );
}

function SecuritySettings({ form, isChangingPassword, onChange, onSubmit, status }) {
  return (
    <Card title="Security">
      {status && <StatusBanner message={status} />}
      <Select label="Admin Session Length" value="7 days" />
      <Field label="JWT Expiry" value="7d" />
      <Field
        label="Current Password"
        onChange={(value) => onChange('currentPassword', value)}
        type="password"
        value={form.currentPassword}
      />
      <Field
        label="New Password"
        onChange={(value) => onChange('newPassword', value)}
        type="password"
        value={form.newPassword}
      />
      <Toggle label="Require strong passwords" enabled />
      <Toggle label="Allow multiple admin roles" enabled />
      <button
        className="mt-2 inline-flex h-11 items-center gap-2 rounded border border-[#ded3c9] bg-white px-5 font-semibold disabled:opacity-60"
        disabled={isChangingPassword || !form.currentPassword || !form.newPassword}
        onClick={onSubmit}
      >
        <KeyRound size={17} /> {isChangingPassword ? 'Updating...' : 'Change Password'}
      </button>
    </Card>
  );
}

function IntegrationStatus() {
  const items = [
    { icon: Mail, title: 'SMTP Email', status: 'Needs .env setup', tone: 'bg-[#fff3d8] text-[#cc8b18]' },
    { icon: Cloud, title: 'Cloudinary Images', status: 'Optional', tone: 'bg-[#e2f1ff] text-[#1d68c4]' },
    { icon: MessageCircle, title: 'WhatsApp Orders', status: 'Manual flow', tone: 'bg-[#dcf5ea] text-[#15945d]' },
  ];

  return (
    <Card title="Integrations">
      <div className="space-y-4">
        {items.map(({ icon: Icon, title, status, tone }) => (
          <div className="flex items-center gap-4 rounded border border-[#eadfd8] bg-[#fffaf7] p-4" key={title}>
            <span className={`grid h-11 w-11 place-items-center rounded-full ${tone}`}>
              <Icon size={20} />
            </span>
            <div>
              <p className="font-bold">{title}</p>
              <p className="mt-1 text-sm text-neutral-600">{status}</p>
            </div>
          </div>
        ))}
      </div>
    </Card>
  );
}

function SupportCard() {
  return (
    <section className="rounded-lg border border-[#eadfd8] bg-gradient-to-br from-[#fffaf7] to-blush p-6 shadow-sm">
      <p className="text-xs font-extrabold uppercase tracking-[0.18em] text-gold">Admin Note</p>
      <h2 className="mt-3 font-serif text-3xl">Keep secrets in `.env` only</h2>
      <p className="mt-4 text-sm leading-6 text-neutral-700">
        Configure SMTP, JWT, MongoDB, and Cloudinary values in backend environment files. Never commit real secrets.
      </p>
    </section>
  );
}

function Card({ title, children }) {
  return (
    <section className="rounded-lg border border-[#eadfd8] bg-white p-6 shadow-sm">
      <h2 className="text-xl font-bold">{title}</h2>
      <div className="mt-6 space-y-5">{children}</div>
    </section>
  );
}

function Field({ label, onChange, type = 'text', value }) {
  return (
    <label className="block">
      <span className="form-label">{label}</span>
      <input
        className="form-control mt-2"
        onChange={(event) => onChange?.(event.target.value)}
        readOnly={!onChange}
        type={type}
        value={value}
      />
    </label>
  );
}

function StatusBanner({ message }) {
  const isWarning = message.includes('not') || message.includes('stored') || message.includes('locally');

  return (
    <div className={`rounded-lg px-4 py-3 text-sm font-semibold ${isWarning ? 'bg-[#fff3d8] text-[#9b6613]' : 'bg-blush text-rosewood'}`}>
      {message}
    </div>
  );
}

function Select({ label, value }) {
  return (
    <label className="block">
      <span className="form-label">{label}</span>
      <button className="form-control mt-2 flex items-center justify-between text-left" type="button">
        {value} <ChevronDown size={17} />
      </button>
    </label>
  );
}

function Toggle({ label, enabled = false }) {
  return (
    <div className="flex items-center justify-between gap-4">
      <span className="form-label">{label}</span>
      <button className={`relative h-6 w-11 rounded-full ${enabled ? 'bg-rosewood' : 'bg-neutral-200'}`} type="button">
        <span className={`absolute top-1 h-4 w-4 rounded-full bg-white transition ${enabled ? 'right-1' : 'left-1'}`} />
      </button>
    </div>
  );
}
