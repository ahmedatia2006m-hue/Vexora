import React, { useState, useEffect } from 'react';
import { CurrencyConfig, Product } from '../types';
import { HERO_PRODUCT, formatPrice } from '../data/products';

interface StickyBuyBarProps {
  currency: CurrencyConfig;
  onInstantBuy: (product: Product) => void;
}

export const StickyBuyBar: React.FC<StickyBuyBarProps> = ({ currency, onInstantBuy }) => {
  const [showBar, setShowBar] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 650) {
        setShowBar(true);
      } else {
        setShowBar(false);
      }
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  if (!showBar) return null;

  return (
    <div className="fixed bottom-0 left-0 right-0 z-40 bg-[#11151b]/95 backdrop-blur-xl border-t border-[#00e5ff]/30 py-3 px-4 shadow-[0_-8px_32px_rgba(0,0,0,0.6)] animate-in slide-in-from-bottom duration-300">
      <div className="max-w-7xl mx-auto flex items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          <img
            src={HERO_PRODUCT.image}
            alt={HERO_PRODUCT.name}
            className="w-11 h-11 rounded-lg object-cover bg-[#090b0e] border border-[#3b494c] shrink-0 hidden sm:block"
          />
          <div>
            <div className="flex items-center gap-2">
              <span className="font-space font-bold text-xs sm:text-sm text-[#e2e2e6] line-clamp-1">
                {HERO_PRODUCT.name}
              </span>
              <span className="hidden md:inline-block px-1.5 py-0.5 rounded bg-[#ff3b56]/20 text-[#ffb4ab] font-space text-[10px] font-bold uppercase">
                50% OFF
              </span>
            </div>
            <p className="text-[11px] text-[#00f0a8] font-space font-semibold">
              ● Stock Left: 14 Units • Ships Within 24 Hours
            </p>
          </div>
        </div>

        <div className="flex items-center gap-3 sm:gap-4 shrink-0">
          <div className="text-right">
            <div className="flex items-baseline gap-1.5 justify-end">
              <span className="font-space font-bold text-base sm:text-xl text-[#00e5ff]">
                {formatPrice(HERO_PRODUCT.price, currency)}
              </span>
              <span className="text-xs text-[#849396] line-through font-space hidden sm:inline">
                {formatPrice(HERO_PRODUCT.originalPrice, currency)}
              </span>
            </div>
            <span className="text-[10px] text-[#bac9cc] block">
              الدفع عند الاستلام متاح
            </span>
          </div>

          <button
            onClick={() => onInstantBuy(HERO_PRODUCT)}
            className="px-5 sm:px-7 py-2.5 sm:py-3 rounded-xl bg-[#00e5ff] hover:bg-[#9cf0ff] text-[#001f24] font-space text-xs sm:text-sm uppercase font-extrabold tracking-wider shadow-[0_0_20px_rgba(0,229,255,0.45)] hover:shadow-[0_0_28px_rgba(0,229,255,0.65)] transition-all cursor-pointer flex items-center gap-1.5"
          >
            <span className="material-symbols-outlined text-[18px]">flash_on</span>
            Order Now
          </button>
        </div>
      </div>
    </div>
  );
};
