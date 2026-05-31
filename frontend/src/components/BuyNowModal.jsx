import { Check, ChevronRight, Minus, Plus, X } from 'lucide-react';
import { useState } from 'react';
import { createOrder } from '../services/orderService.js';

const steps = ['Product', 'Your Details', 'Delivery'];
const defaultColour = { name: 'Blush Pink', hex: '#eeb5b6' };

export default function BuyNowModal({ product, selectedSize, onClose }) {
  const [step, setStep] = useState(1);
  const [submitted, setSubmitted] = useState(false);
  const [quantity, setQuantity] = useState(1);
  const [size, setSize] = useState(selectedSize);
  const [customer, setCustomer] = useState({
    fullName: '',
    phone: '',
    email: '',
    whatsapp: '',
  });
  const [delivery, setDelivery] = useState({
    address: '',
    city: '',
    district: '',
    note: '',
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState('');

  const next = () => setStep((current) => Math.min(current + 1, 3));
  const back = () => setStep((current) => Math.max(current - 1, 1));
  const handleCustomerChange = (field, value) => {
    setCustomer((current) => ({ ...current, [field]: value }));
  };
  const handleDeliveryChange = (field, value) => {
    setDelivery((current) => ({ ...current, [field]: value }));
  };
  const handleSubmit = async () => {
    setSubmitError('');

    if (!customer.fullName || !customer.phone || !customer.email || !delivery.address || !delivery.city || !delivery.district) {
      setSubmitError('Please complete all required fields before submitting your order.');
      return;
    }

    setIsSubmitting(true);

    try {
      await createOrder({
        customer,
        delivery,
        items: [
          {
            productName: product.name,
            sku: product.sku || slugify(product.name).toUpperCase(),
            size,
            colour: defaultColour,
            quantity,
            price: parsePrice(product.price),
          },
        ],
      });
      setSubmitted(true);
    } catch (error) {
      setSubmitError(error.response?.data?.message || 'We could not submit your order right now. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 grid place-items-center bg-black/58 px-4 py-8">
      <section className="w-full max-w-2xl overflow-hidden rounded-lg bg-white shadow-soft" role="dialog" aria-modal="true" aria-label="Place your order">
        <header className="flex items-center justify-between bg-gradient-to-r from-maroon to-rosewood px-7 py-5 text-white">
          <h2 className="font-serif text-3xl">Place Your Order</h2>
          <button className="grid h-9 w-9 place-items-center rounded-full hover:bg-white/10" onClick={onClose} aria-label="Close order popup">
            <X size={22} />
          </button>
        </header>

        <ProductSummary product={product} />

        <div className="border-t border-[#eadfd8] px-7 py-5">
          <StepTabs currentStep={submitted ? 3 : step} />

          {submitted ? (
            <SuccessStep onClose={onClose} />
          ) : (
            <>
              {step === 1 && (
                <ProductOptions
                  product={product}
                  selectedSize={size}
                  setSelectedSize={setSize}
                  quantity={quantity}
                  setQuantity={setQuantity}
                  onNext={next}
                />
              )}
              {step === 2 && (
                <CustomerDetails
                  customer={customer}
                  onBack={back}
                  onChange={handleCustomerChange}
                  onNext={next}
                />
              )}
              {step === 3 && (
                <DeliveryDetails
                  delivery={delivery}
                  isSubmitting={isSubmitting}
                  submitError={submitError}
                  onBack={back}
                  onChange={handleDeliveryChange}
                  onSubmit={handleSubmit}
                />
              )}
            </>
          )}
        </div>
      </section>
    </div>
  );
}

function ProductSummary({ product }) {
  return (
    <div className="flex gap-5 bg-[#fffaf7] px-7 py-5">
      <span className={`relative h-24 w-20 shrink-0 overflow-hidden rounded border border-rosewood/55 bg-gradient-to-br ${product.accent}`}>
        <span className={`product-silhouette ${product.figure || ''} !h-[90%] !w-[45%]`} />
      </span>
      <div className="pt-1">
        <h3 className="text-lg font-extrabold text-rosewood">{product.name}</h3>
        <p className="mt-1 text-sm uppercase tracking-[0.14em] text-neutral-500">ID: PRD-938649</p>
        <p className="mt-2 font-serif text-2xl font-bold text-maroon">{product.price}</p>
      </div>
    </div>
  );
}

function StepTabs({ currentStep }) {
  return (
    <div className="grid grid-cols-3 overflow-hidden rounded border border-[#eadfcf]">
      {steps.map((label, index) => {
        const stepNumber = index + 1;
        const active = stepNumber === currentStep;

        return (
          <div
            className={`h-11 border-r border-white text-center text-xs font-extrabold uppercase tracking-[0.18em] last:border-r-0 ${
              active ? 'bg-rosewood text-white' : 'bg-[#efe3d2] text-[#9a8174]'
            }`}
            key={label}
          >
            <span className="grid h-full place-items-center">
              {stepNumber}. {label}
            </span>
          </div>
        );
      })}
    </div>
  );
}

function ProductOptions({ product, selectedSize, setSelectedSize, quantity, setQuantity, onNext }) {
  return (
    <div className="pt-6">
      <SectionLabel>Product Options</SectionLabel>
      <div className="mt-5 grid gap-5 sm:grid-cols-2">
        <label>
          <span className="form-label">Size</span>
          <select className="form-control mt-2" value={selectedSize} onChange={(event) => setSelectedSize(event.target.value)}>
            {product.sizes.map((size) => (
              <option value={size} key={size}>
                {size}
              </option>
            ))}
          </select>
        </label>
        <label>
          <span className="form-label">Colour</span>
          <div className="form-control mt-2 flex items-center gap-3">
            <span className="h-7 w-7 rounded-full" style={{ backgroundColor: defaultColour.hex }} />
            {defaultColour.name}
          </div>
        </label>
      </div>
      <div className="mt-5">
        <span className="form-label">Quantity</span>
        <div className="mt-2 inline-grid h-12 w-44 grid-cols-3 overflow-hidden rounded border border-[#d9d1cb]">
          <button className="grid place-items-center" onClick={() => setQuantity(Math.max(1, quantity - 1))} aria-label="Decrease quantity">
            <Minus size={17} />
          </button>
          <span className="grid place-items-center font-bold">{quantity}</span>
          <button className="grid place-items-center" onClick={() => setQuantity(quantity + 1)} aria-label="Increase quantity">
            <Plus size={17} />
          </button>
        </div>
      </div>
      <button className="btn-primary mt-6 w-full gap-3" onClick={onNext}>
        Next - Your Details <ChevronRight size={18} />
      </button>
    </div>
  );
}

function CustomerDetails({ customer, onBack, onChange, onNext }) {
  return (
    <div className="pt-6">
      <SectionLabel>Your Details</SectionLabel>
      <div className="mt-5 grid gap-5 sm:grid-cols-2">
        <Field label="Full Name" placeholder="Your full name" required value={customer.fullName} onChange={(event) => onChange('fullName', event.target.value)} />
        <Field label="Phone Number" placeholder="+94 7X XXX XXXX" required value={customer.phone} onChange={(event) => onChange('phone', event.target.value)} />
        <Field label="Email Address" placeholder="your@email.com" required type="email" help="We'll send your order confirmation here" value={customer.email} onChange={(event) => onChange('email', event.target.value)} />
        <Field label="WhatsApp Number" placeholder="+94 7X XXX XXXX" help="Optional, for order updates" value={customer.whatsapp} onChange={(event) => onChange('whatsapp', event.target.value)} />
      </div>
      <div className="mt-6 grid gap-4 sm:grid-cols-2">
        <button className="btn-outline bg-white" onClick={onBack}>Back</button>
        <button className="btn-primary gap-3" onClick={onNext}>
          Next - Delivery <ChevronRight size={18} />
        </button>
      </div>
    </div>
  );
}

function DeliveryDetails({ delivery, isSubmitting, submitError, onBack, onChange, onSubmit }) {
  return (
    <div className="pt-6">
      <SectionLabel>Delivery Details</SectionLabel>
      <div className="mt-5 space-y-5">
        <Field label="Address" placeholder="House number, street address" required value={delivery.address} onChange={(event) => onChange('address', event.target.value)} />
        <div className="grid gap-5 sm:grid-cols-2">
          <Field label="City" placeholder="Enter city" required value={delivery.city} onChange={(event) => onChange('city', event.target.value)} />
          <label>
            <span className="form-label">District <span className="text-rosewood">*</span></span>
            <select className="form-control mt-2" value={delivery.district} onChange={(event) => onChange('district', event.target.value)}>
              <option value="">Select district</option>
              <option>Colombo</option>
              <option>Gampaha</option>
              <option>Kandy</option>
              <option>Galle</option>
            </select>
          </label>
        </div>
        <label>
          <span className="form-label">Delivery Note</span>
          <textarea className="form-control mt-2 min-h-24 py-3" placeholder="Landmark, apartment, or special instructions (optional)" value={delivery.note} onChange={(event) => onChange('note', event.target.value)} />
          <span className="mt-2 block text-xs text-neutral-500">We will use these details to arrange your order delivery.</span>
        </label>
      </div>
      {submitError && (
        <p className="mt-5 rounded border border-[#f4b8c1] bg-[#fff1f3] px-4 py-3 text-sm font-semibold text-rosewood">
          {submitError}
        </p>
      )}
      <div className="mt-6 grid gap-4 sm:grid-cols-2">
        <button className="btn-outline bg-white" onClick={onBack} disabled={isSubmitting}>Back</button>
        <button className="btn-primary gap-3 disabled:cursor-not-allowed disabled:opacity-70" onClick={onSubmit} disabled={isSubmitting}>
          {isSubmitting ? 'Submitting...' : 'Submit Order'} <ChevronRight size={18} />
        </button>
      </div>
    </div>
  );
}

function SuccessStep({ onClose }) {
  return (
    <div className="pt-6">
      <div className="rounded-lg border border-[#b7d8b2] bg-gradient-to-br from-[#f8fff5] to-[#eef9ea] px-6 py-10 text-center shadow-sm">
        <span className="mx-auto grid h-20 w-20 place-items-center rounded-full border-4 border-[#9bd29b] bg-[#f7fff4] text-[#15803d]">
          <Check size={44} strokeWidth={2.4} />
        </span>
        <h3 className="mt-6 text-2xl font-extrabold text-ink">Order submitted successfully!</h3>
        <p className="mx-auto mt-4 max-w-md text-neutral-700">
          We will contact you within 24 hours by phone or WhatsApp.
        </p>
      </div>
      <button className="btn-outline mt-6 w-full border-rosewood bg-white text-rosewood" onClick={onClose}>
        Continue Shopping
      </button>
    </div>
  );
}

function Field({ label, required = false, help, ...props }) {
  return (
    <label>
      <span className="form-label">
        {label} {required && <span className="text-rosewood">*</span>}
      </span>
      <input className="form-control mt-2" {...props} />
      {help && <span className="mt-2 block text-xs text-neutral-500">{help}</span>}
    </label>
  );
}

function SectionLabel({ children }) {
  return <p className="text-xs font-extrabold uppercase tracking-[0.22em] text-gold">{children}</p>;
}

function parsePrice(price) {
  return Number(String(price).replace(/[^0-9.]/g, '')) || 0;
}

function slugify(value) {
  return value.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '');
}
