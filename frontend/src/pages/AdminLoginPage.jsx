import { Eye, LockKeyhole, Mail, ShieldCheck } from 'lucide-react';
import { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import heroImage from '../assets/home-hero.png';
import Footer from '../components/Footer.jsx';
import Header from '../components/Header.jsx';
import { loginAdmin } from '../services/authService.js';

export default function AdminLoginPage() {
  return (
    <div className="min-h-screen bg-white text-ink">
      <Header />
      <main className="px-4 py-8">
        <section className="mx-auto grid max-w-7xl gap-8 lg:grid-cols-[1.1fr_0.95fr]">
          <AdminPortalPanel />
          <LoginPanel />
        </section>
      </main>
      <Footer />
    </div>
  );
}

function AdminPortalPanel() {
  return (
    <section className="relative min-h-[620px] overflow-hidden rounded-lg bg-[#f4dfd5] shadow-sm">
      <img src={heroImage} alt="Shara Shopping admin portal" className="absolute inset-0 h-full w-full object-cover object-center" />
      <div className="absolute inset-0 bg-gradient-to-r from-[#f6eadf]/95 via-[#f6eadf]/72 to-transparent" />
      <div className="relative z-10 flex h-full min-h-[620px] flex-col justify-center px-10 py-12 sm:px-16">
        <h1 className="max-w-sm font-serif text-6xl uppercase leading-[0.92]">Admin Portal</h1>
        <div className="title-mark mt-8" />
        <p className="mt-8 max-w-sm text-lg leading-8 text-neutral-800">
          Manage products, orders, and customer enquiries with ease.
        </p>
      </div>
    </section>
  );
}

function LoginPanel() {
  const navigate = useNavigate();
  const location = useLocation();
  const redirectTo = location.state?.from || '/admin/dashboard';
  const [credentials, setCredentials] = useState({ email: '', password: '' });
  const [errors, setErrors] = useState({});
  const [feedback, setFeedback] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  const updateField = (field, value) => {
    setCredentials((current) => ({ ...current, [field]: value }));
    setErrors((current) => ({ ...current, [field]: '' }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    setFeedback('');
    const normalizedCredentials = normalizeCredentials(credentials);
    const nextErrors = validateCredentials(normalizedCredentials);

    if (Object.keys(nextErrors).length) {
      setErrors(nextErrors);
      setFeedback('Please enter your email and password.');
      return;
    }

    setIsSubmitting(true);

    try {
      await loginAdmin(normalizedCredentials);
      navigate(redirectTo, { replace: true });
    } catch (error) {
      setFeedback(error.response?.data?.message || 'Unable to login. Please check your credentials.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section className="flex min-h-[620px] items-center rounded-lg border border-[#eadfd8] bg-white px-6 py-10 shadow-soft sm:px-12">
      <div className="mx-auto w-full max-w-xl">
        <div className="text-center">
          <p className="text-sm font-extrabold uppercase tracking-[0.34em] text-gold">Welcome Back</p>
          <h2 className="mt-4 font-serif text-6xl leading-none">Admin Login</h2>
          <div className="title-mark mx-auto" />
          <p className="mt-7 text-neutral-700">Sign in to access the Shara Shopping admin dashboard.</p>
        </div>

        <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
          <label className="block">
            <span className="form-label">Email Address</span>
            <span className="relative mt-2 block">
              <Mail className="absolute left-4 top-1/2 -translate-y-1/2 text-neutral-500" size={20} />
              <input
                className="form-control h-14 pl-12"
                aria-invalid={Boolean(errors.email)}
                placeholder="Enter your email address"
                type="email"
                value={credentials.email}
                onChange={(event) => updateField('email', event.target.value)}
              />
            </span>
            {errors.email && <span className="mt-2 block text-xs font-semibold text-rosewood">{errors.email}</span>}
          </label>

          <label className="block">
            <span className="form-label">Password</span>
            <span className="relative mt-2 block">
              <LockKeyhole className="absolute left-4 top-1/2 -translate-y-1/2 text-neutral-500" size={20} />
              <input
                className="form-control h-14 px-12"
                aria-invalid={Boolean(errors.password)}
                placeholder="Enter your password"
                type={showPassword ? 'text' : 'password'}
                value={credentials.password}
                onChange={(event) => updateField('password', event.target.value)}
              />
              <button
                className="absolute right-4 top-1/2 -translate-y-1/2 text-neutral-600"
                type="button"
                onClick={() => setShowPassword((current) => !current)}
                aria-label={showPassword ? 'Hide password' : 'Show password'}
              >
                <Eye size={20} />
              </button>
            </span>
            {errors.password && <span className="mt-2 block text-xs font-semibold text-rosewood">{errors.password}</span>}
          </label>

          <div className="flex items-center justify-between gap-4 text-sm">
            <label className="flex items-center gap-3 text-neutral-700">
              <span className="h-5 w-5 rounded border border-[#d6cbc2]" />
              Remember me
            </label>
            <a href="#forgot-password" className="font-semibold text-rosewood">Forgot password?</a>
          </div>

          {feedback && (
            <p className="rounded border border-[#f4b8c1] bg-[#fff1f3] px-4 py-3 text-sm font-semibold text-rosewood">
              {feedback}
            </p>
          )}

          <button className="btn-primary h-14 w-full disabled:cursor-not-allowed disabled:opacity-70" type="submit" disabled={isSubmitting}>
            {isSubmitting ? 'Logging in...' : 'Login'}
          </button>
          <a href="/" className="btn-outline h-14 w-full bg-white">Back To Store</a>

          <p className="flex items-center justify-center gap-2 text-sm text-neutral-700">
            <ShieldCheck size={18} /> Authorized staff only.
          </p>
        </form>
      </div>
    </section>
  );
}

function validateCredentials(credentials) {
  const errors = {};

  if (!credentials.email) {
    errors.email = 'Email address is required.';
  } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(credentials.email)) {
    errors.email = 'Enter a valid email address.';
  }

  if (!credentials.password) {
    errors.password = 'Password is required.';
  } else if (credentials.password.length < 8) {
    errors.password = 'Password must be at least 8 characters.';
  }

  return errors;
}

function normalizeCredentials(credentials) {
  return {
    email: credentials.email.trim().toLowerCase(),
    password: credentials.password,
  };
}
