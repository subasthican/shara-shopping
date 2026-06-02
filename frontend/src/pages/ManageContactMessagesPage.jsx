import { useEffect, useMemo, useState } from 'react';
import {
  Archive,
  Bell,
  Box,
  CheckCircle2,
  ChevronDown,
  ClipboardCheck,
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
  RefreshCcw,
  Search,
  Send,
  Settings,
  Star,
  Tag,
  Timer,
  UsersRound,
} from 'lucide-react';
import { getContactMessages, updateContactMessageStatus } from '../services/contactService.js';

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

const demoMessages = [
  {
    _id: 'demo-msg-1',
    fullName: 'Heshani Perera',
    email: 'heshani@gmail.com',
    phone: '077 123 4567',
    subject: 'Sizing help for blush maxi dress',
    message: 'Can you help me choose between medium and large for the Blush Drape Maxi Dress? I need it for an engagement next week.',
    status: 'new',
    createdAt: '2026-06-01T08:20:00.000Z',
  },
  {
    _id: 'demo-msg-2',
    fullName: 'Nethmi Fernando',
    email: 'nethmi@gmail.com',
    phone: '077 234 5678',
    subject: 'Delivery to Gampaha',
    message: 'I want to confirm whether same week delivery is available to Gampaha before placing the order.',
    status: 'read',
    createdAt: '2026-05-31T11:45:00.000Z',
  },
  {
    _id: 'demo-msg-3',
    fullName: 'Dinuli Rathnayake',
    email: 'dinuli@gmail.com',
    phone: '077 345 6789',
    subject: 'Wedding guest dress recommendations',
    message: 'Please suggest a modest pastel dress for a morning wedding. I prefer long sleeves and soft colours.',
    status: 'replied',
    createdAt: '2026-05-30T14:10:00.000Z',
  },
  {
    _id: 'demo-msg-4',
    fullName: 'Sewmini Jayawardena',
    email: 'sewmini@gmail.com',
    phone: '077 456 7890',
    subject: 'Return policy question',
    message: 'If the size does not fit, can I exchange the dress after the owner calls me to confirm the order?',
    status: 'archived',
    createdAt: '2026-05-29T09:30:00.000Z',
  },
];

const statusTabs = [
  ['all', 'All'],
  ['new', 'New'],
  ['read', 'Read'],
  ['replied', 'Replied'],
  ['archived', 'Archived'],
];

export default function ManageContactMessagesPage() {
  const [messages, setMessages] = useState(demoMessages);
  const [filters, setFilters] = useState({ search: '', status: 'all' });
  const [selectedMessage, setSelectedMessage] = useState(demoMessages[0]);
  const [isLoading, setIsLoading] = useState(true);
  const [apiError, setApiError] = useState('');
  const [statusMessage, setStatusMessage] = useState('');

  useEffect(() => {
    let isMounted = true;

    const loadMessages = async () => {
      setIsLoading(true);
      setApiError('');

      try {
        const data = await getContactMessages({
          search: filters.search || undefined,
          status: filters.status,
        });

        if (isMounted) {
          const rows = data.length ? data : [];
          setMessages(rows);
          setSelectedMessage((current) => rows.find((message) => message._id === current?._id) || rows[0] || null);
        }
      } catch (error) {
        if (isMounted) {
          const fallbackRows = filterDemoMessages(filters);
          setMessages(fallbackRows);
          setSelectedMessage((current) => fallbackRows.find((message) => message._id === current?._id) || fallbackRows[0] || null);
          setApiError('Showing demo messages until admin API access is available.');
        }
      } finally {
        if (isMounted) {
          setIsLoading(false);
        }
      }
    };

    loadMessages();

    return () => {
      isMounted = false;
    };
  }, [filters.search, filters.status]);

  const stats = useMemo(() => buildStats(messages), [messages]);

  const handleStatusChange = async (messageId, nextStatus) => {
    setStatusMessage('');

    try {
      const updatedMessage = await updateContactMessageStatus(messageId, { status: nextStatus });
      setMessages((current) => current.map((message) => (message._id === messageId ? updatedMessage : message)));
      setSelectedMessage(updatedMessage);
      setStatusMessage('Message status updated.');
    } catch (error) {
      setMessages((current) => current.map((message) => (message._id === messageId ? { ...message, status: nextStatus } : message)));
      setSelectedMessage((current) => (current?._id === messageId ? { ...current, status: nextStatus } : current));
      setStatusMessage('Demo status updated locally.');
    }
  };

  return (
    <div className="min-h-screen bg-[#fbf7f4] text-ink">
      <div className="grid lg:grid-cols-[280px_1fr]">
        <MessagesSidebar />
        <main className="min-w-0">
          <MessagesTopbar />
          <div className="px-4 py-7 sm:px-8">
            <div className="flex flex-col gap-4 xl:flex-row xl:items-start xl:justify-between">
              <div>
                <h1 className="text-3xl font-extrabold">Contact Messages</h1>
                <p className="mt-3 text-sm text-neutral-600">
                  Dashboard <span className="mx-2">&gt;</span> Messages
                </p>
              </div>
              <div className="flex flex-wrap gap-3">
                <button className="inline-flex h-11 items-center gap-2 rounded border border-[#ded3c9] bg-white px-5 font-semibold">
                  <RefreshCcw size={17} /> Refresh
                </button>
                <button className="btn-primary h-11 gap-2 px-5">
                  <Send size={17} /> Reply by Email
                </button>
              </div>
            </div>

            <Stats stats={stats} />
            <Filters filters={filters} setFilters={setFilters} />

            <section className="mt-6 grid gap-6 xl:grid-cols-[1.2fr_0.8fr]">
              <MessagesTable
                apiError={apiError}
                filters={filters}
                isLoading={isLoading}
                messages={messages}
                selectedMessage={selectedMessage}
                setFilters={setFilters}
                setSelectedMessage={setSelectedMessage}
                statusMessage={statusMessage}
              />
              <MessageDetails message={selectedMessage} onStatusChange={handleStatusChange} />
            </section>
          </div>
        </main>
      </div>
    </div>
  );
}

function MessagesSidebar() {
  return (
    <aside className="hidden min-h-screen border-r border-[#eadfd8] bg-[#fff8f4] px-5 py-7 lg:block">
      <h2 className="font-serif text-4xl text-[#7a4c29]">Shara Shopping</h2>
      <p className="mt-3 text-xs font-extrabold uppercase tracking-[0.34em]">Admin Panel</p>
      <nav className="mt-10 space-y-2">
        {nav.map(([Icon, label, href]) => (
          <a
            className={`flex h-12 items-center gap-4 rounded-lg px-4 text-sm font-semibold ${
              label === 'Messages' ? 'bg-blush text-rosewood' : 'hover:bg-white'
            }`}
            href={href}
            key={label}
          >
            <Icon size={19} /> {label}
          </a>
        ))}
      </nav>
      <div className="mt-10 rounded-lg bg-blush p-5">
        <span className="grid h-14 w-14 place-items-center rounded-full bg-white text-rosewood shadow-sm">
          <Mail size={27} />
        </span>
        <p className="mt-4 font-serif text-lg leading-7">Every message is a chance to make the order personal.</p>
        <p className="mt-3 text-sm font-semibold text-rosewood">- Customer Care</p>
      </div>
    </aside>
  );
}

function MessagesTopbar() {
  return (
    <header className="flex flex-wrap items-center justify-between gap-4 border-b border-[#eadfd8] bg-white px-4 py-5 sm:px-8">
      <div className="flex items-center gap-5">
        <button className="icon-button bg-white" aria-label="Open admin menu">
          <Menu size={24} />
        </button>
        <label className="relative block w-[min(520px,60vw)]">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-neutral-500" size={19} />
          <input className="h-12 w-full rounded-lg border border-[#eadfd8] bg-[#fbfaf9] px-12 outline-none focus:border-rosewood" placeholder="Search messages, subject, email..." />
        </label>
      </div>
      <div className="flex items-center gap-3">
        <button className="relative icon-button bg-white shadow-sm" aria-label="Message alerts">
          <Bell size={20} />
          <span className="absolute -right-1 -top-1 grid h-5 w-5 place-items-center rounded-full bg-rosewood text-xs font-bold text-white">4</span>
        </button>
        <span className="grid h-12 w-12 place-items-center rounded-full bg-blush font-serif text-xl font-bold text-rosewood">A</span>
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
    <section className="mt-7 grid gap-4 md:grid-cols-2 xl:grid-cols-4">
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

  return (
    <section className="mt-6 rounded-lg border border-[#eadfd8] bg-white p-5 shadow-sm">
      <div className="grid gap-5 lg:grid-cols-[1.5fr_0.8fr_auto] lg:items-end">
        <label>
          <span className="form-label">Search Messages</span>
          <span className="relative mt-2 block">
            <Search className="absolute right-4 top-1/2 -translate-y-1/2 text-neutral-500" size={18} />
            <input
              className="form-control pr-11"
              onChange={(event) => updateFilter('search', event.target.value)}
              placeholder="Search by name, email, subject, or message..."
              value={filters.search}
            />
          </span>
        </label>
        <label>
          <span className="form-label">Status</span>
          <span className="relative mt-2 block">
            <select className="form-control appearance-none pr-11" onChange={(event) => updateFilter('status', event.target.value)} value={filters.status}>
              {statusTabs.map(([value, label]) => (
                <option key={value} value={value}>
                  {label} Messages
                </option>
              ))}
            </select>
            <ChevronDown className="pointer-events-none absolute right-4 top-1/2 -translate-y-1/2" size={17} />
          </span>
        </label>
        <button className="btn-primary h-12 gap-2 px-6">
          <Filter size={17} /> Filter
        </button>
      </div>
    </section>
  );
}

function MessagesTable({ apiError, filters, isLoading, messages, selectedMessage, setFilters, setSelectedMessage, statusMessage }) {
  return (
    <section className="overflow-hidden rounded-lg border border-[#eadfd8] bg-white p-5 shadow-sm">
      <div className="flex flex-col gap-4 border-b border-[#eadfd8] pb-5 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h2 className="text-xl font-bold">Inbox</h2>
          <p className="mt-1 text-sm text-neutral-600">Review customer questions and keep follow-up status clear.</p>
        </div>
        <div className="flex rounded-lg bg-[#f6eee7] p-1 text-sm font-semibold">
          {statusTabs.map(([value, label]) => (
            <button
              className={`h-9 rounded px-4 ${filters.status === value ? 'bg-white text-rosewood shadow-sm' : 'text-neutral-600'}`}
              key={value}
              onClick={() => setFilters((current) => ({ ...current, status: value }))}
            >
              {label}
            </button>
          ))}
        </div>
      </div>

      {(isLoading || apiError || statusMessage) && (
        <div className={`mt-5 rounded-lg px-4 py-3 text-sm font-semibold ${apiError ? 'bg-[#fff3d8] text-[#9b6613]' : 'bg-blush text-rosewood'}`}>
          {isLoading ? 'Loading messages...' : apiError || statusMessage}
        </div>
      )}

      <div className="mt-2 divide-y divide-[#eadfd8]">
        {messages.map((message) => (
          <button
            className={`block w-full px-1 py-5 text-left ${selectedMessage?._id === message._id ? 'bg-[#fffaf7]' : ''}`}
            key={message._id}
            onClick={() => setSelectedMessage(message)}
          >
            <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
              <div className="flex min-w-0 gap-4">
                <span className="grid h-12 w-12 shrink-0 place-items-center rounded-full bg-blush font-serif text-xl font-bold text-rosewood">
                  {message.fullName?.charAt(0) || 'C'}
                </span>
                <div className="min-w-0">
                  <div className="flex flex-wrap items-center gap-3">
                    <p className="font-bold">{message.fullName}</p>
                    <StatusPill status={message.status} />
                  </div>
                  <p className="mt-2 font-semibold">{message.subject}</p>
                  <p className="mt-2 line-clamp-2 text-sm leading-6 text-neutral-600">{message.message}</p>
                  <div className="mt-3 flex flex-wrap gap-4 text-xs font-semibold text-neutral-600">
                    <span className="inline-flex items-center gap-1"><Mail size={14} /> {message.email}</span>
                    <span className="inline-flex items-center gap-1"><Phone size={14} /> {message.phone || 'No phone'}</span>
                  </div>
                </div>
              </div>
              <div className="shrink-0 text-sm text-neutral-600">{formatDate(message.createdAt)}</div>
            </div>
          </button>
        ))}
      </div>

      {!messages.length && !isLoading && (
        <div className="py-12 text-center">
          <p className="font-bold">No messages found</p>
          <p className="mt-2 text-sm text-neutral-600">Try a different search or status filter.</p>
        </div>
      )}
    </section>
  );
}

function MessageDetails({ message, onStatusChange }) {
  if (!message) {
    return (
      <aside className="rounded-lg border border-[#eadfd8] bg-white p-6 shadow-sm">
        <p className="font-bold">No message selected</p>
        <p className="mt-2 text-sm text-neutral-600">Choose a customer message to see the full conversation details.</p>
      </aside>
    );
  }

  return (
    <aside className="rounded-lg border border-[#eadfd8] bg-white p-6 shadow-sm">
      <div className="flex items-start justify-between gap-4">
        <div>
          <p className="text-xs font-extrabold uppercase tracking-[0.18em] text-gold">Selected Message</p>
          <h2 className="mt-3 font-serif text-3xl leading-tight">{message.subject}</h2>
        </div>
        <button className="grid h-10 w-10 place-items-center rounded border border-[#ded3c9]" aria-label="More message actions">
          <MoreVertical size={17} />
        </button>
      </div>

      <div className="mt-6 rounded-lg bg-[#fffaf7] p-5">
        <div className="flex items-center gap-4">
          <span className="grid h-14 w-14 place-items-center rounded-full bg-blush font-serif text-2xl font-bold text-rosewood">
            {message.fullName?.charAt(0) || 'C'}
          </span>
          <div>
            <p className="font-bold">{message.fullName}</p>
            <p className="mt-1 text-sm text-neutral-600">{formatDate(message.createdAt)}</p>
          </div>
          <StatusPill status={message.status} />
        </div>
        <div className="mt-5 space-y-2 text-sm">
          <p className="flex items-center gap-2"><Mail size={15} /> {message.email}</p>
          <p className="flex items-center gap-2"><Phone size={15} /> {message.phone || 'No phone number'}</p>
        </div>
      </div>

      <div className="mt-6">
        <p className="form-label">Message</p>
        <p className="mt-2 rounded-lg border border-[#eadfd8] bg-white px-4 py-4 text-sm leading-7 text-neutral-700">{message.message}</p>
      </div>

      <div className="mt-6">
        <p className="form-label">Update Status</p>
        <div className="mt-3 grid gap-3 sm:grid-cols-2">
          {[
            ['read', Eye, 'Mark Read'],
            ['replied', CheckCircle2, 'Replied'],
            ['archived', Archive, 'Archive'],
            ['new', MessageCircle, 'Mark New'],
          ].map(([status, Icon, label]) => (
            <button
              className={`inline-flex h-11 items-center justify-center gap-2 rounded border px-4 font-semibold ${
                message.status === status ? 'border-rosewood bg-rosewood text-white' : 'border-[#ded3c9] bg-white'
              }`}
              key={status}
              onClick={() => onStatusChange(message._id, status)}
            >
              <Icon size={17} /> {label}
            </button>
          ))}
        </div>
      </div>
    </aside>
  );
}

function StatusPill({ status }) {
  const styles = {
    new: 'bg-blush text-rosewood',
    read: 'bg-[#e2f1ff] text-[#1d68c4]',
    replied: 'bg-[#dcf5ea] text-[#15945d]',
    archived: 'bg-[#f0ebe6] text-neutral-600',
  };

  return <span className={`rounded px-3 py-1 text-xs font-bold capitalize ${styles[status] || styles.new}`}>{status || 'new'}</span>;
}

function buildStats(messageRows) {
  return [
    { icon: Mail, label: 'Total Messages', value: String(messageRows.length), color: 'bg-[#e2f1ff] text-[#1d68c4]' },
    { icon: MessageCircle, label: 'New Messages', value: String(messageRows.filter((message) => message.status === 'new').length), color: 'bg-blush text-rosewood' },
    { icon: CheckCircle2, label: 'Replied', value: String(messageRows.filter((message) => message.status === 'replied').length), color: 'bg-[#dcf5ea] text-[#15945d]' },
    { icon: Archive, label: 'Archived', value: String(messageRows.filter((message) => message.status === 'archived').length), color: 'bg-[#f0ebe6] text-neutral-600' },
  ];
}

function filterDemoMessages(filters) {
  const search = filters.search.trim().toLowerCase();

  return demoMessages.filter((message) => {
    const matchesStatus = filters.status === 'all' || message.status === filters.status;
    const matchesSearch = !search
      || [message.fullName, message.email, message.phone, message.subject, message.message]
        .filter(Boolean)
        .some((value) => value.toLowerCase().includes(search));

    return matchesStatus && matchesSearch;
  });
}

function formatDate(value) {
  if (!value) return 'Recently';

  return new Intl.DateTimeFormat('en-LK', {
    day: 'numeric',
    month: 'short',
    year: 'numeric',
  }).format(new Date(value));
}
