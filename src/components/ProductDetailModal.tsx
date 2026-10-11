import React, { useState } from 'react';
import { CurrencyConfig, Product } from '../types';
import { formatPrice } from '../data/products';

interface ProductDetailModalProps {
  product: Product | null;
  onClose: () => void;
  currency: CurrencyConfig;
  onAddToCart: (product: Product, variant?: string, size?: string) => void;
  onInstantBuy: (product: Product, variant?: string, size?: string) => void;
  isWishlisted?: boolean;
  onToggleWishlist?: (productId: string) => void;
}

export const ProductDetailModal: React.FC<ProductDetailModalProps> = ({
  product,
  onClose,
  currency,
  onAddToCart,
  onInstantBuy,
  isWishlisted = false,
  onToggleWishlist,
}) => {
  if (!product) return null;

  const [selectedVariant, setSelectedVariant] = useState(
    product.variants?.[0]?.options[0] || ''
  );
  const [selectedSize, setSelectedSize] = useState(
    product.variants?.find((v) => v.name.toLowerCase().includes('size'))?.options[0] || ''
  );
  const [quantity, setQuantity] = useState(1);

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md overflow-y-auto">
      <div className="bg-[#181e27] border border-[#3b494c] rounded-2xl max-w-4xl w-full p-6 lg:p-8 shadow-2xl relative my-8 text-[#e2e2e6]">
        {/* Top Actions: Wishlist & Close */}
        <div className="absolute top-5 right-5 flex items-center gap-2 z-20">
          {onToggleWishlist && (
            <button
              type="button"
              onClick={() => onToggleWishlist(product.id)}
              className="p-2 rounded-lg bg-[#11151b] border border-[#3b494c]/50 text-[#849396] hover:text-[#ff3b56] transition-all cursor-pointer flex items-center justify-center"
              title={isWishlisted ? 'Saved in Wishlist' : 'Save for Later'}
            >
              <span
                className={`material-symbols-outlined text-[20px] ${
                  isWishlisted ? 'text-[#ff3b56]' : 'text-[#849396]'
                }`}
                style={isWishlisted ? { fontVariationSettings: "'FILL' 1" } : {}}
              >
                favorite
              </span>
            </button>
          )}
          <button
            onClick={onClose}
            className="text-[#849396] hover:text-[#e2e2e6] text-sm p-2 rounded-lg hover:bg-[#282a2d] transition-colors cursor-pointer"
          >
            ✕
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-start">
          {/* Left Media */}
          <div className="md:col-span-5 flex flex-col gap-3">
            <div className="relative aspect-square rounded-xl overflow-hidden bg-[#11151b] border border-[#3b494c]/40">
              <div className="absolute top-3 left-3 z-10 flex flex-col gap-1">
                {product.badges.map((badge, idx) => (
                  <span
                    key={idx}
                    className="px-2.5 py-0.5 rounded font-space text-[10px] font-bold uppercase shadow bg-[#00e5ff] text-[#001f24]"
                  >
                    {badge}
                  </span>
                ))}
              </div>
              <img
                src={product.image}
                alt={product.name}
                className="w-full h-full object-cover"
              />
            </div>

            {/* Quick Guarantees */}
            <div className="grid grid-cols-2 gap-2 text-xs text-[#bac9cc]">
              <div className="p-2.5 rounded-lg bg-[#11151b] border border-[#3b494c]/30 flex items-center gap-2">
                <span className="material-symbols-outlined text-[#00e5ff] text-[18px]">verified</span>
                <span>100% Authentic</span>
              </div>
              <div className="p-2.5 rounded-lg bg-[#11151b] border border-[#3b494c]/30 flex items-center gap-2">
                <span className="material-symbols-outlined text-[#00e5ff] text-[18px]">replay_30</span>
                <span>30-Day Zero Risk</span>
              </div>
            </div>
          </div>

          {/* Right Product Hub */}
          <div className="md:col-span-7 flex flex-col gap-4">
            {/* Rating */}
            <div className="flex items-center gap-2">
              <div className="flex text-[#00e5ff]">
                {[...Array(5)].map((_, i) => (
                  <span
                    key={i}
                    className="material-symbols-outlined text-[18px]"
                    style={{ fontVariationSettings: "'FILL' 1" }}
                  >
                    star
                  </span>
                ))}
              </div>
              <span className="font-space font-bold text-xs text-[#e2e2e6]">
                {product.rating} / 5.0
              </span>
              <span className="text-xs text-[#849396]">({product.reviewsCount} Reviews)</span>
              <span className="text-xs text-[#00e5ff] font-space font-bold ml-auto">
                {product.deliveredCount} Delivered
              </span>
            </div>

            <div>
              <h2 className="font-space font-bold text-2xl text-[#e2e2e6] tracking-tight">
                {product.name}
              </h2>
              <p className="text-xs text-[#00e5ff] font-space uppercase tracking-wider font-semibold mt-1">
                {product.tagline}
              </p>
              <p className="text-xs text-[#bac9cc] mt-2 leading-relaxed">
                {product.description}
              </p>
            </div>

            {/* Price block */}
            <div className="p-3.5 rounded-xl bg-[#11151b] border border-[#3b494c]/40 flex items-center justify-between">
              <div>
                <div className="flex items-baseline gap-2">
                  <span className="font-space font-bold text-2xl text-[#00e5ff]">
                    {formatPrice(product.price, currency)}
                  </span>
                  <span className="font-space text-sm text-[#849396] line-through">
                    {formatPrice(product.originalPrice, currency)}
                  </span>
                </div>
                <span className="text-[10px] font-space text-[#ffb4ab] uppercase font-bold">
                  Instant {product.discountPct}% Discount Applied
                </span>
              </div>
              <div className="text-right">
                <span className="px-2.5 py-1 rounded bg-[#00e5ff] text-[#001f24] font-space text-[11px] font-bold uppercase">
                  In Stock ({product.stockLeft} Left)
                </span>
              </div>
            </div>

            {/* Variants */}
            {product.variants && product.variants.length > 0 && (
              <div className="flex flex-col gap-3">
                {product.variants.map((v) => {
                  const isSize = v.name.toLowerCase().includes('size');
                  const currentVal = isSize ? selectedSize : selectedVariant;
                  const setVal = isSize ? setSelectedSize : setSelectedVariant;

                  return (
                    <div key={v.name}>
                      <label className="block text-xs font-space font-bold uppercase text-[#bac9cc] mb-1.5">
                        {v.name}: <span className="text-[#00e5ff]">{currentVal}</span>
                      </label>
                      <div className="flex flex-wrap gap-2">
                        {v.options.map((opt) => (
                          <button
                            key={opt}
                            type="button"
                            onClick={() => setVal(opt)}
                            className={`py-1.5 px-3 rounded-lg font-space text-xs font-semibold border transition-all cursor-pointer ${
                              currentVal === opt
                                ? 'border-[#00e5ff] bg-[#00e5ff]/10 text-[#00e5ff]'
                                : 'border-[#3b494c] bg-[#11151b] text-[#bac9cc] hover:border-[#849396]'
                            }`}
                          >
                            {opt}
                          </button>
                        ))}
                      </div>
                    </div>
                  );
                })}
              </div>
            )}

            {/* Quantity Stepper */}
            <div className="flex items-center gap-3">
              <span className="text-xs font-space uppercase text-[#bac9cc]">Quantity:</span>
              <div className="flex items-center border border-[#3b494c] rounded-lg bg-[#11151b]">
                <button
                  type="button"
                  onClick={() => setQuantity(Math.max(1, quantity - 1))}
                  className="px-3 py-1 text-xs text-[#bac9cc] hover:text-[#00e5ff]"
                >
                  -
                </button>
                <span className="px-3 text-xs font-mono-tabular font-bold text-[#e2e2e6]">
                  {quantity}
                </span>
                <button
                  type="button"
                  onClick={() => setQuantity(quantity + 1)}
                  className="px-3 py-1 text-xs text-[#bac9cc] hover:text-[#00e5ff]"
                >
                  +
                </button>
              </div>
            </div>

            {/* CTAs */}
            <div className="flex flex-col sm:flex-row gap-3 pt-2">
              <button
                onClick={() => {
                  onInstantBuy(product, selectedVariant, selectedSize);
                  onClose();
                }}
                className="flex-1 py-3.5 rounded-xl bg-[#00e5ff] text-[#001f24] font-space text-xs uppercase font-extrabold tracking-wider hover:bg-[#9cf0ff] transition-all cursor-pointer shadow-lg flex items-center justify-center gap-1.5"
              >
                <span className="material-symbols-outlined text-[18px]">flash_on</span>
                Claim 50% Off &amp; Checkout
              </button>

              <button
                onClick={() => {
                  for (let i = 0; i < quantity; i++) {
                    onAddToCart(product, selectedVariant, selectedSize);
                  }
                  onClose();
                }}
                className="py-3.5 px-5 rounded-xl bg-[#282a2d] hover:bg-[#333538] text-[#e2e2e6] font-space text-xs uppercase font-bold tracking-wider border border-[#3b494c] transition-all cursor-pointer flex items-center justify-center gap-1.5"
              >
                <span className="material-symbols-outlined text-[18px]">add_shopping_cart</span>
                Add to Cart
              </button>
            </div>

            {/* Specs Table */}
            <div className="pt-2">
              <h4 className="font-space font-bold text-xs uppercase text-[#bac9cc] mb-2">
                Engineered Specifications
              </h4>
              <div className="grid grid-cols-2 gap-2 text-xs">
                {product.specs.map((s, idx) => (
                  <div
                    key={idx}
                    className="p-2 rounded bg-[#11151b] border border-[#3b494c]/20"
                  >
                    <span className="text-[#849396] block text-[10px]">{s.label}</span>
                    <span className="text-[#e2e2e6] font-space font-medium">{s.value}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
