import {
  ArrowRight,
  CheckCircle2,
  Headphones,
  Mail,
  MapPin,
  MessageSquareText,
  Phone,
  Send,
  ShieldCheck,
} from 'lucide-react';
import { useState } from 'react';
import boutiqueImage from '../assets/about-boutique.png';
import Footer from '../components/Footer.jsx';
import Header from '../components/Header.jsx';
import { createContactMessage } from '../services/contactService.js';

const contactOptions = [
  { icon: Phone, title: 'Call Us', main: '077 123 4567', note: 'Mon - Sat: 9.00 AM - 6.00 PM' },
  { icon: Mail, title: 'Email Us', main: 'support@sharashopping.lk', note: 'We reply within 24 hours' },
  { icon: MapPin, title: 'Visit Our Store', main: '123, Fashion Street, Colombo 08, Sri Lanka', note: 'Mon - Sat: 9.00 AM - 6.00 PM' },
  { icon: Headphones, title: 'Live Chat', main: 'Chat with our support team', note: 'Start Live Chat' },
];

export default function ContactPage() {
  return (
    <div className="min-h-screen bg-white text-ink">
      <Header />
      <main>
        <ContactHero />
        <ContactCards />
        <ContactBody />
        <HelpBanner />
      </main>
      <Footer />
    </div>
  );
}

function ContactHero() {
  return (
    <section className="grid bg-white lg:grid-cols-2">
      <div className="flex min-h-[420px] items-center px-4 py-14">
        <div className="mx-auto w-full max-w-xl">
          <p className="text-sm font-bold uppercase tracking-[0.3em] text-rosewood">Contact Us</p>
          <h1 className="mt-5 max-w-lg font-serif text-6xl leading-[0.95] sm:text-7xl">
            We&apos;d Love to Hear From You
          </h1>
          <div className="mt-8 h-px w-16 bg-rosewood" />
          <p className="mt-7 max-w-md text-base leading-8 text-neutral-700">
            Have a question, need help, or want to share feedback? We&apos;re here for you. Reach out using any of the methods below.
          </p>
        </div>
      </div>
      <img src={boutiqueImage} alt="Shara Shopping boutique contact desk" className="h-[420px] w-full object-cover lg:h-full" />
    </section>
  );
}

function ContactCards() {
  return (
    <section className="border-t border-linen px-4 py-10">
      <div className="mx-auto grid max-w-7xl gap-6 md:grid-cols-2 xl:grid-cols-4">
        {contactOptions.map(({ icon: Icon, title, main, note }) => (
          <article className="rounded-lg border border-[#eadfd8] bg-white p-7 shadow-sm" key={title}>
            <span className="grid h-16 w-16 place-items-center rounded-full bg-blush text-rosewood">
              <Icon size={28} />
            </span>
            <h2 className="mt-7 font-bold">{title}</h2>
            <p className="mt-3 leading-7 text-ink">{main}</p>
            <p className={`mt-2 text-sm ${title === 'Live Chat' ? 'font-bold text-rosewood' : 'text-neutral-600'}`}>
              {note} {title === 'Live Chat' && <ArrowRight className="inline" size={15} />}
            </p>
          </article>
        ))}
      </div>
    </section>
  );
}

function ContactBody() {
  return (
    <section className="px-4 pb-8">
      <div className="mx-auto grid max-w-7xl gap-7 lg:grid-cols-[1.02fr_1fr]">
        <MessageForm />
        <MapPanel />
      </div>
    </section>
  );
}

function MessageForm() {
  const [form, setForm] = useState({
    fullName: '',
    email: '',
    phone: '',
    subject: '',
    message: '',
  });
  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [feedback, setFeedback] = useState({ type: '', message: '' });

  const updateField = (field, value) => {
    setForm((current) => ({ ...current, [field]: value }));
    setErrors((current) => ({ ...current, [field]: '' }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    setFeedback({ type: '', message: '' });

    const nextErrors = validateContactForm(form);

    if (Object.keys(nextErrors).length) {
      setErrors(nextErrors);
      setFeedback({ type: 'error', message: 'Please complete all required fields before sending your message.' });
      return;
    }

    setIsSubmitting(true);

    try {
      await createContactMessage(normalizeContactForm(form));
      setForm({ fullName: '', email: '', phone: '', subject: '', message: '' });
      setErrors({});
      setFeedback({ type: 'success', message: 'Message sent successfully. We will reply within 24 hours.' });
    } catch (error) {
      setFeedback({ type: 'error', message: error.response?.data?.message || 'We could not send your message right now. Please try again.' });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section className="rounded-lg border border-[#eadfd8] bg-gradient-to-br from-white to-[#fff7f4] p-7 shadow-sm">
      <h2 className="font-serif text-3xl">Send Us a Message</h2>
      <p className="mt-3 text-sm text-neutral-700">Fill out the form below and we&apos;ll get back to you as soon as possible.</p>
      <form className="mt-6 space-y-5" onSubmit={handleSubmit}>
        <div className="grid gap-5 sm:grid-cols-2">
          <Field error={errors.fullName} label="Your Name" required placeholder="Enter your name" value={form.fullName} onChange={(event) => updateField('fullName', event.target.value)} />
          <Field error={errors.email} label="Your Email" required placeholder="Enter your email" type="email" value={form.email} onChange={(event) => updateField('email', event.target.value)} />
        </div>
        <Field error={errors.phone} label="Phone Number" placeholder="+94 7X XXX XXXX" value={form.phone} onChange={(event) => updateField('phone', event.target.value)} />
        <label className="block">
          <span className="form-label">Subject <span className="text-rosewood">*</span></span>
          <select className="form-control mt-2" value={form.subject} onChange={(event) => updateField('subject', event.target.value)} aria-invalid={Boolean(errors.subject)}>
            <option value="">Select a subject</option>
            <option>Order support</option>
            <option>Product question</option>
            <option>Delivery information</option>
            <option>General inquiry</option>
          </select>
          {errors.subject && <span className="mt-2 block text-xs font-semibold text-rosewood">{errors.subject}</span>}
        </label>
        <label className="block">
          <span className="form-label">Your Message <span className="text-rosewood">*</span></span>
          <textarea className="form-control mt-2 min-h-32 resize-y py-3" placeholder="Type your message here..." value={form.message} onChange={(event) => updateField('message', event.target.value)} aria-invalid={Boolean(errors.message)} />
          {errors.message && <span className="mt-2 block text-xs font-semibold text-rosewood">{errors.message}</span>}
        </label>
        {feedback.message && (
          <p className={`flex items-center gap-2 rounded border px-4 py-3 text-sm font-semibold ${
            feedback.type === 'success'
              ? 'border-[#b7d8b2] bg-[#f3fbef] text-[#15803d]'
              : 'border-[#f4b8c1] bg-[#fff1f3] text-rosewood'
          }`}>
            {feedback.type === 'success' && <CheckCircle2 size={17} />}
            {feedback.message}
          </p>
        )}
        <button className="btn-primary gap-3 disabled:cursor-not-allowed disabled:opacity-70" type="submit" disabled={isSubmitting}>
          <Send size={17} /> {isSubmitting ? 'Sending...' : 'Send Message'}
        </button>
        <p className="flex items-center gap-2 text-xs text-neutral-600">
          <ShieldCheck size={15} className="text-rosewood" /> We respect your privacy. Your information is safe with us.
        </p>
      </form>
    </section>
  );
}

function Field({ error, label, required = false, ...props }) {
  return (
    <label className="block">
      <span className="form-label">
        {label} {required && <span className="text-rosewood">*</span>}
      </span>
      <input className="form-control mt-2" aria-invalid={Boolean(error)} {...props} />
      {error && <span className="mt-2 block text-xs font-semibold text-rosewood">{error}</span>}
    </label>
  );
}

function validateContactForm(form) {
  const values = normalizeContactForm(form);
  const nextErrors = {};

  if (!values.fullName) {
    nextErrors.fullName = 'Your name is required.';
  } else if (values.fullName.length < 2) {
    nextErrors.fullName = 'Enter at least 2 characters.';
  }

  if (!values.email) {
    nextErrors.email = 'Your email is required.';
  } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(values.email)) {
    nextErrors.email = 'Enter a valid email address.';
  }

  if (values.phone && !/^[+()\d\s-]{7,18}$/.test(values.phone)) {
    nextErrors.phone = 'Enter a valid phone number.';
  }

  if (!values.subject) {
    nextErrors.subject = 'Choose a subject.';
  }

  if (!values.message) {
    nextErrors.message = 'Your message is required.';
  } else if (values.message.length < 10) {
    nextErrors.message = 'Please write at least 10 characters.';
  }

  return nextErrors;
}

function normalizeContactForm(form) {
  return {
    fullName: form.fullName.trim(),
    email: form.email.trim().toLowerCase(),
    phone: form.phone.trim(),
    subject: form.subject.trim(),
    message: form.message.trim(),
  };
}

function MapPanel() {
  return (
    <section className="relative min-h-[520px] overflow-hidden rounded-lg border border-[#d9e5e7] bg-[#eef6f5] shadow-sm">
      <div className="absolute inset-0 map-grid" />
      <div className="absolute left-[8%] top-0 h-full w-24 bg-[#93dce4]/70" />
      <div className="absolute left-0 top-[68%] h-6 w-full -rotate-12 bg-white/80" />
      <div className="absolute left-[34%] top-0 h-full w-5 rotate-12 bg-white/85" />
      <div className="absolute left-[62%] top-0 h-full w-7 -rotate-12 bg-white/85" />
      <div className="absolute left-[18%] top-[30%] h-5 w-full rotate-3 bg-white/85" />
      <div className="absolute bottom-[10%] right-[7%] h-48 w-36 rounded-full bg-[#cdebd2]/90" />
      <div className="absolute left-8 top-8 rounded bg-white p-6 shadow-soft">
        <h3 className="font-bold">Shara Shopping</h3>
        <p className="mt-3 text-sm leading-6 text-neutral-700">123, Fashion Street,<br />Colombo 08, Sri Lanka</p>
        <a href="#map" className="mt-4 inline-block text-sm font-semibold text-rosewood">View larger map</a>
      </div>
      <div className="absolute left-1/2 top-1/2 grid h-12 w-12 -translate-x-1/2 -translate-y-1/2 place-items-center rounded-full bg-rosewood text-white shadow-soft">
        <MapPin size={28} fill="currentColor" />
      </div>
      <span className="absolute bottom-16 left-[24%] text-sm font-semibold text-[#2464d2]">Colombo Town Hall</span>
      <span className="absolute right-[18%] top-[36%] text-sm font-semibold text-[#2464d2]">Liberty Plaza</span>
      <span className="absolute bottom-28 right-[18%] text-sm font-semibold text-[#34834e]">Cinnamon Gardens</span>
    </section>
  );
}

function HelpBanner() {
  return (
    <section className="px-4 pb-8">
      <div className="mx-auto flex max-w-7xl flex-col gap-6 rounded-lg bg-[#fbefed] px-7 py-8 sm:flex-row sm:items-center sm:justify-between">
        <div className="flex items-center gap-6">
          <span className="grid h-16 w-16 shrink-0 place-items-center rounded-full bg-blush text-rosewood">
            <MessageSquareText size={30} />
          </span>
          <div>
            <h2 className="font-bold">Need Help?</h2>
            <p className="mt-2 max-w-xl text-sm leading-6 text-neutral-700">
              Browse our Help Center for answers to frequently asked questions or track your order.
            </p>
          </div>
        </div>
        <a href="#help-center" className="btn-primary gap-3">
          Visit Help Center <ArrowRight size={17} />
        </a>
      </div>
    </section>
  );
}
