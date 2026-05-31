import { Check, ChevronRight, Minus, Plus, X } from 'lucide-react';
import { useState } from 'react';

const steps = ['Product', 'Your Details', 'Delivery'];

export default function BuyNowModal({ product, selectedSize, onClose }) {
  const [step, setStep] = useState(1);
  const [submitted, setSubmitted] = useState(false);
  const [quantity, setQuantity] = useState(1);

  const next = () => setStep((current) => Math.min(current + 1, 3));
  const back = () => setStep((current) => Math.max(current - 1, 1));

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
          <StepTabs currentStep={step} />

          {submitted ? (
            <SuccessStep onClose={onClose} />
          ) : (
            <>
              {step === 1 && (
                <ProductOptions
                  product={product}
                  selectedSize={selectedSize}
                  quantity={quantity}
                  setQuantity={setQuantity}
                  onNext={next}
                />
              )}
              {step === 2 && <CustomerDetails onBack={back} onNext={next} />}
              {step === 3 && <DeliveryDetails onBack={back} onSubmit={() => setSubmitted(true)} />}
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

function ProductOptions({ product, selectedSize, quantity, setQuantity, onNext }) {
  return (
    <div className="pt-6">
      <SectionLabel>Product Options</SectionLabel>
      <div className="mt-5 grid gap-5 sm:grid-cols-2">
        <label>
          <span className="form-label">Size</span>
          <select className="form-control mt-2" defaultValue={selectedSize}>
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
            <span className="h-7 w-7 rounded-full bg-[#eeb5b6]" />
            Blush Pink
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

function CustomerDetails({ onBack, onNext }) {
  return (
    <div className="pt-6">
      <SectionLabel>Your Details</SectionLabel>
      <div className="mt-5 grid gap-5 sm:grid-cols-2">
        <Field label="Full Name" placeholder="Your full name" required />
        <Field label="Phone Number" placeholder="+94 7X XXX XXXX" required />
        <Field label="Email Address" placeholder="your@email.com" required type="email" help="We'll send your order confirmation here" />
        <Field label="WhatsApp Number" placeholder="+94 7X XXX XXXX" help="Optional, for order updates" />
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

function DeliveryDetails({ onBack, onSubmit }) {
  return (
    <div className="pt-6">
      <SectionLabel>Delivery Details</SectionLabel>
      <div className="mt-5 space-y-5">
        <Field label="Address" placeholder="House number, street address" required />
        <div className="grid gap-5 sm:grid-cols-2">
          <Field label="City" placeholder="Enter city" required />
          <label>
            <span className="form-label">District <span className="text-rosewood">*</span></span>
            <select className="form-control mt-2">
              <option>Select district</option>
              <option>Colombo</option>
              <option>Gampaha</option>
              <option>Kandy</option>
              <option>Galle</option>
            </select>
          </label>
        </div>
        <label>
          <span className="form-label">Delivery Note</span>
          <textarea className="form-control mt-2 min-h-24 py-3" placeholder="Landmark, apartment, or special instructions (optional)" />
          <span className="mt-2 block text-xs text-neutral-500">We will use these details to arrange your order delivery.</span>
        </label>
      </div>
      <div className="mt-6 grid gap-4 sm:grid-cols-2">
        <button className="btn-outline bg-white" onClick={onBack}>Back</button>
        <button className="btn-primary gap-3" onClick={onSubmit}>
          Submit Order <ChevronRight size={18} />
        </button>
      </div>
    </div>
  );
}

function SuccessStep({ onClose }) {
  return (
    <div className="pt-6">
      <div className="rounded-lg border border-[#c7e3c6] bg-[#f4fbf1] px-6 py-10 text-center">
        <span className="mx-auto grid h-20 w-20 place-items-center rounded-full border-4 border-[#9fd29d] text-[#15803d]">
          <Check size={42} />
        </span>
        <h3 className="mt-6 text-2xl font-extrabold">Order submitted successfully!</h3>
        <p className="mt-4 text-neutral-700">
          We will contact you within 24 hours by phone or WhatsApp.
        </p>
      </div>
      <button className="btn-outline mt-6 w-full bg-white" onClick={onClose}>
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
