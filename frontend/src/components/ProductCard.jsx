import { Heart } from 'lucide-react';
import { useState } from 'react';
import BuyNowModal from './BuyNowModal.jsx';

export default function ProductCard({ product, selectedSize, className = '', imageClassName = 'aspect-[4/4.55]' }) {
  const [isOrderOpen, setIsOrderOpen] = useState(false);

  return (
    <>
      <article className={`overflow-hidden rounded border border-[#ded3c9] bg-white shadow-sm ${className}`}>
        <div className={`relative flex ${imageClassName} items-end justify-center bg-gradient-to-br ${product.accent}`}>
          {product.badge && (
            <span
              className={`absolute left-3 top-3 rounded px-3 py-1 text-[11px] font-bold uppercase text-white ${
                product.badge === 'Bestseller' ? 'bg-[#b58135]' : 'bg-rosewood'
              }`}
            >
              {product.badge}
            </span>
          )}
          <button className="icon-button absolute right-3 top-3 bg-white/80" aria-label={`Add ${product.name} to wishlist`}>
            <Heart size={20} />
          </button>
          <span className={`product-silhouette ${product.figure || ''}`} />
        </div>
        <div className="p-4">
          <h3 className="text-sm font-semibold">{product.name}</h3>
          <p className="mt-2 text-sm font-bold">{product.price}</p>
          <div className="mt-4 flex flex-wrap gap-2">
            {product.sizes.map((size) => (
              <span
                className={`grid h-7 w-8 place-items-center rounded border text-xs ${
                  size === selectedSize ? 'border-ink bg-ink text-white' : 'border-[#d5ccc2]'
                }`}
                key={size}
              >
                {size}
              </span>
            ))}
          </div>
          <div className="mt-4 flex gap-3">
            <button className="btn-primary h-11 flex-1 px-4 text-xs" onClick={() => setIsOrderOpen(true)}>
              Buy Now
            </button>
            <button className="grid h-11 w-11 shrink-0 place-items-center rounded border border-gold text-gold" aria-label="WhatsApp order">
              W
            </button>
          </div>
        </div>
      </article>
      {isOrderOpen && (
        <BuyNowModal
          product={product}
          selectedSize={selectedSize}
          onClose={() => setIsOrderOpen(false)}
        />
      )}
    </>
  );
}
