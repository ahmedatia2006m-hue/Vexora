import React, { useState, useEffect } from 'react';
import { CurrencyConfig, Product } from '../types';
import { HERO_PRODUCT, formatPrice } from '../data/products';

interface HeroShowcaseProps {
  currency: CurrencyConfig;
  onAddToCart: (product: Product, selectedColor?: string) => void;
  onInstantBuy: (product: Product, selectedColor?: string) => void;
  onOpenVideoDemo: () => void;
  isWishlisted?: boolean;
  onToggleWishlist?: () => void;
}

export const HeroShowcase: React.FC<HeroShowcaseProps> = ({
  currency,
  onAddToCart,
  onInstantBuy,
  onOpenVideoDemo,
  isWishlisted = false,
  onToggleWishlist,
}) => {
  const [activeImageIndex, setActiveImageIndex] = useState(0);
  const [selectedFinish, setSelectedFinish] = useState(
    HERO_PRODUCT.variants?.[0]?.options[0] || 'Gunmetal Titanium'
  );
  const [stockCount, setStockCount] = useState(HERO_PRODUCT.stockLeft);

  // High-conversion countdown timer
  const [timeLeft, setTimeLeft] = useState({
    hours: 4,
    minutes: 28,
    seconds: 59,
  });

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev.seconds > 0) {
          return { ...prev, seconds: prev.seconds - 1 };
        } else if (prev.minutes > 0) {
          return { ...prev, minutes: 59, seconds: 59 };
        } else if (prev.hours > 0) {
          return { hours: prev.hours - 1, minutes: 59, seconds: 59 };
        }
        return { hours: 4, minutes: 28, seconds: 59 }; // reset loop
      });
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  // Organic stock fluctuation for authentic dropshipping urgency
  useEffect(() => {
    const stockInterval = setInterval(() => {
      setStockCount((prev) => {
        if (prev > 6 && Math.random() > 0.7) {
          return prev - 1;
        }
        return prev;
      });
    }, 15000);
    return () => clearInterval(stockInterval);
  }, []);

  const [ambientTheme, setAmbientTheme] = useState<'cyan' | 'violet' | 'emerald'>('cyan');

  const galleryImages = [
    HERO_PRODUCT.image,
    ...(HERO_PRODUCT.thumbnails || []),
  ];

  const currentDisplayImage = galleryImages[activeImageIndex] || HERO_PRODUCT.image;

  const ambientGlowColors = {
    cyan: { glow1: 'bg-[#00e5ff]/15', glow2: 'bg-[#00daf3]/15', border: 'border-[#00e5ff]/40' },
    violet: { glow1: 'bg-[#a855f7]/20', glow2: 'bg-[#6366f1]/20', border: 'border-[#a855f7]/40' },
    emerald: { glow1: 'bg-[#10b981]/20', glow2: 'bg-[#06b6d4]/20', border: 'border-[#10b981]/40' },
  };

  return (
    <div className="w-full flex flex-col">
      {/* Top Urgency Cyber Banner */}
      <section className="w-full bg-[#0c0e11] border-b border-[#3b494c]/30 py-2.5 px-4 lg:px-12">
        <div className="max-w-7xl mx-auto flex flex-wrap items-center justify-between gap-2 text-[#e2e2e6]">
          <div className="flex items-center gap-2">
            <span className="inline-flex w-2.5 h-2.5 rounded-full bg-[#00e5ff] animate-ping" />
            <span className="font-space text-xs uppercase font-bold tracking-wider text-[#00e5ff]">
              Viral Tech Launch Event
            </span>
            <span className="hidden sm:inline text-xs text-[#849396]">|</span>
            <span className="hidden sm:inline text-xs text-[#bac9cc]">
              Global Air Express Guaranteed
            </span>
          </div>

          <div className="flex items-center gap-4">
            <div className="flex items-center gap-2 text-xs uppercase font-space">
              <span className="text-[#ffb4ab] font-bold">Offer Ends In:</span>
              <div className="flex items-center gap-1 font-mono-tabular font-bold text-sm text-[#00e5ff] tracking-wider">
                <span className="bg-[#282a2d] px-1.5 py-0.5 rounded text-white">
                  {String(timeLeft.hours).padStart(2, '0')}
                </span>
                :
                <span className="bg-[#282a2d] px-1.5 py-0.5 rounded text-white">
                  {String(timeLeft.minutes).padStart(2, '0')}
                </span>
                :
                <span className="bg-[#282a2d] px-1.5 py-0.5 rounded text-white">
                  {String(timeLeft.seconds).padStart(2, '0')}
                </span>
              </div>
            </div>

            <div className="hidden lg:flex items-center gap-2 text-[#bac9cc] text-xs font-semibold">
              <span>شحن مجاني دولي</span>
              <span className="text-[#00e5ff] font-bold">●</span>
              <span>ضمان ٣٠ يوماً</span>
            </div>
          </div>
        </div>
      </section>

      {/* Hero Viral Showcase Section */}
      <section className="relative w-full bg-gradient-to-b from-[#0c0e11] via-[#1a1c1f] to-[#111317] py-6 lg:py-12 overflow-hidden border-b border-[#282a2d]/40 transition-colors duration-700">
        {/* Ambient Cyber Glows */}
        <div className={`absolute -top-32 -left-20 w-96 h-96 ${ambientGlowColors[ambientTheme].glow1} rounded-full blur-3xl pointer-events-none transition-all duration-700`} />
        <div className={`absolute -bottom-24 right-0 w-[30rem] h-[30rem] ${ambientGlowColors[ambientTheme].glow2} rounded-full blur-3xl pointer-events-none transition-all duration-700`} />

        <div className="max-w-7xl mx-auto px-4 lg:px-12 relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            {/* Left Visual PDP Column */}
            <div className="lg:col-span-7 flex flex-col gap-3">
              <div className="relative w-full rounded-2xl overflow-hidden bg-[#1e2023] shadow-2xl border border-[#3b494c]/40 group">
                {/* Floating Badges */}
                <div className="absolute top-4 left-4 z-20 flex flex-wrap gap-2">
                  <span className="px-3 py-1 rounded bg-[#ff3b56] text-white font-space text-[11px] uppercase font-bold tracking-wider shadow-lg flex items-center gap-1">
                    <span className="material-symbols-outlined text-[15px]">local_fire_department</span>
                    VIRAL ON TIKTOK
                  </span>
                  <span className="px-3 py-1 rounded bg-[#333538]/90 backdrop-blur-md text-[#00e5ff] font-space text-[11px] uppercase font-semibold border border-[#00e5ff]/30">
                    GEN 4.2 OPTICAL MATRIX
                  </span>
                </div>

                {/* Wishlist Heart Button */}
                {onToggleWishlist && (
                  <div className="absolute top-4 right-4 z-20">
                    <button
                      type="button"
                      onClick={(e) => {
                        e.stopPropagation();
                        onToggleWishlist();
                      }}
                      className="w-10 h-10 rounded-full bg-[#111317]/80 backdrop-blur-md border border-[#3b494c]/50 flex items-center justify-center text-[#e2e2e6] hover:text-[#ff3b56] transition-all cursor-pointer shadow-xl hover:scale-110"
                      title={isWishlisted ? 'Saved in Wishlist' : 'Save for Later'}
                    >
                      <span
                        className={`material-symbols-outlined text-[22px] transition-colors ${
                          isWishlisted ? 'text-[#ff3b56]' : 'text-[#bac9cc]'
                        }`}
                        style={isWishlisted ? { fontVariationSettings: "'FILL' 1" } : {}}
                      >
                        favorite
                      </span>
                    </button>
                  </div>
                )}

                {/* Main Product Media */}
                <div className="relative w-full aspect-[4/3] bg-[#282a2d] overflow-hidden">
                  <img
                    src={currentDisplayImage}
                    alt={HERO_PRODUCT.name}
                    className="w-full h-full object-cover transform group-hover:scale-105 transition-transform duration-700 ease-out"
                  />

                  {/* Live Floating Spec Tag */}
                  <div className="absolute bottom-4 left-4 bg-[#111317]/90 backdrop-blur-md p-3 rounded-xl flex items-center gap-3 shadow-xl border border-[#3b494c]/50">
                    <div className="w-2.5 h-2.5 rounded-full bg-[#00e5ff] animate-pulse" />
                    <div>
                      <p className="font-space text-xs uppercase font-bold text-[#e2e2e6]">
                        {HERO_PRODUCT.highlightSpec?.title}
                      </p>
                      <p className="text-[11px] text-[#bac9cc]">
                        {HERO_PRODUCT.highlightSpec?.subtitle}
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Ambient Atmosphere Mode Switcher */}
              <div className="flex items-center justify-between bg-[#11151b] px-3.5 py-2 rounded-xl border border-[#3b494c]/30 text-xs">
                <span className="text-[#849396] font-space font-medium text-[11px] flex items-center gap-1.5">
                  <span className="material-symbols-outlined text-[#00e5ff] text-[16px]">tune</span>
                  Live Nebula Glow Simulator:
                </span>
                <div className="flex items-center gap-1.5">
                  <button
                    onClick={() => { setAmbientTheme('cyan'); setActiveImageIndex(0); }}
                    className={`px-2.5 py-1 rounded-lg text-[10px] font-space font-bold transition-all cursor-pointer ${
                      ambientTheme === 'cyan'
                        ? 'bg-[#00e5ff] text-[#001f24]'
                        : 'bg-[#1e2023] text-[#bac9cc] hover:text-white'
                    }`}
                  >
                    Cyan Laser
                  </button>
                  <button
                    onClick={() => { setAmbientTheme('violet'); setActiveImageIndex(1); }}
                    className={`px-2.5 py-1 rounded-lg text-[10px] font-space font-bold transition-all cursor-pointer ${
                      ambientTheme === 'violet'
                        ? 'bg-[#a855f7] text-white'
                        : 'bg-[#1e2023] text-[#bac9cc] hover:text-white'
                    }`}
                  >
                    Violet Cosmos
                  </button>
                  <button
                    onClick={() => { setAmbientTheme('emerald'); setActiveImageIndex(2); }}
                    className={`px-2.5 py-1 rounded-lg text-[10px] font-space font-bold transition-all cursor-pointer ${
                      ambientTheme === 'emerald'
                        ? 'bg-[#10b981] text-white'
                        : 'bg-[#1e2023] text-[#bac9cc] hover:text-white'
                    }`}
                  >
                    Aurora Emerald
                  </button>
                </div>
              </div>

              {/* PDP Thumbnails & Live Proof Strip */}
              <div className="grid grid-cols-4 gap-2.5">
                {galleryImages.map((imgUrl, idx) => (
                  <div
                    key={idx}
                    onClick={() => setActiveImageIndex(idx)}
                    className={`p-1 rounded-xl bg-[#282a2d] hover:bg-[#37393d] cursor-pointer transition-all border ${
                      activeImageIndex === idx
                        ? 'border-[#00e5ff] shadow-[0_0_12px_rgba(0,229,255,0.4)]'
                        : 'border-transparent'
                    }`}
                  >
                    <div className="aspect-square rounded-lg bg-[#1e2023] overflow-hidden">
                      <img
                        src={imgUrl}
                        alt={`Preview ${idx + 1}`}
                        className="w-full h-full object-cover"
                      />
                    </div>
                  </div>
                ))}

                {/* Video Demo Tile */}
                <div
                  onClick={onOpenVideoDemo}
                  className="p-1 rounded-xl bg-[#282a2d] hover:bg-[#37393d] cursor-pointer transition-all border border-[#3b494c]/40 hover:border-[#00e5ff]"
                >
                  <div className="aspect-square rounded-lg bg-[#333538] overflow-hidden flex flex-col items-center justify-center text-center p-1 group">
                    <span className="material-symbols-outlined text-[#00e5ff] text-[26px] group-hover:scale-110 transition-transform">
                      play_circle
                    </span>
                    <span className="font-space text-[10px] uppercase font-bold text-[#e2e2e6] mt-1 tracking-wider">
                      Video Demo
                    </span>
                  </div>
                </div>
              </div>
            </div>

            {/* Right Purchase & Conversion Hub */}
            <div className="lg:col-span-5 flex flex-col gap-4 bg-[#1a1c1f] p-6 lg:p-7 rounded-2xl border border-[#3b494c]/40 shadow-2xl">
              {/* Rating & Social Proof Tag */}
              <div className="flex items-center justify-between flex-wrap gap-2">
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
                  <span className="font-space text-xs text-[#e2e2e6] font-bold">
                    4.96 / 5.0
                  </span>
                  <span className="text-xs text-[#bac9cc]">(3,842 Reviews)</span>
                </div>

                <span className="inline-flex items-center gap-1 font-space text-[11px] text-[#00e5ff] uppercase font-bold bg-[#00e5ff]/15 px-2.5 py-1 rounded border border-[#00e5ff]/20">
                  <span className="material-symbols-outlined text-[14px]">check_circle</span>
                  14,200+ Delivered
                </span>
              </div>

              {/* Product Title & One Liner */}
              <div>
                <h1 className="font-space font-bold text-2xl lg:text-3xl text-[#e2e2e6] tracking-tight leading-snug">
                  CyberGlow Lumina Projection Cube
                </h1>
                <p className="text-sm text-[#bac9cc] mt-2 leading-relaxed">
                  Atmospheric laser optics paired with 360° Hi-Fi acoustic resonator. Transform any bedroom, game room, or desk into a multi-sensory cyber universe.
                </p>
              </div>

              {/* Price & Flash Savings Block */}
              <div className="bg-[#1e2023] p-4 rounded-xl flex items-center justify-between border border-[#3b494c]/40">
                <div>
                  <div className="flex items-baseline gap-2">
                    <span className="font-space font-bold text-3xl text-[#00e5ff]">
                      {formatPrice(HERO_PRODUCT.price, currency)}
                    </span>
                    <span className="font-space text-lg text-[#849396] line-through">
                      {formatPrice(HERO_PRODUCT.originalPrice, currency)}
                    </span>
                  </div>
                  <span className="font-space text-[11px] uppercase text-[#ffb4ab] font-bold flex items-center gap-1 mt-1">
                    <span className="material-symbols-outlined text-[15px]">trending_down</span>
                    Instant 50% Early Bird Discount
                  </span>
                </div>

                <div className="text-right">
                  <span className="px-3 py-1 rounded bg-[#00e5ff] text-[#00363d] font-space text-xs uppercase font-extrabold shadow-sm">
                    Save {formatPrice(70.0, currency)}
                  </span>
                  <p className="text-xs text-[#bac9cc] mt-1.5">
                    Stock Left:{' '}
                    <span className="text-[#ff3b56] font-mono-tabular font-bold">
                      {stockCount} Units
                    </span>
                  </p>
                </div>
              </div>

              {/* High Scarcity Progress Bar */}
              <div className="w-full flex flex-col gap-1.5">
                <div className="flex justify-between items-center font-space text-[11px] uppercase text-[#bac9cc]">
                  <span>Allocated Flash Stock Claimed</span>
                  <span className="text-[#00e5ff] font-bold">89% Reserved</span>
                </div>
                <div className="w-full bg-[#282a2d] h-2 rounded-full overflow-hidden">
                  <div className="bg-gradient-to-r from-[#00daf3] via-[#00e5ff] to-[#9cf0ff] h-full w-[89%] rounded-full animate-pulse shadow-[0_0_10px_rgba(0,229,255,0.7)]" />
                </div>
              </div>

              {/* Core Value Bullet Points */}
              <div className="grid grid-cols-2 gap-2 pt-1">
                <div className="flex items-center gap-2 text-[#e2e2e6] text-xs">
                  <span className="material-symbols-outlined text-[#00e5ff] text-[18px]">auto_awesome</span>
                  <span>16 Aurora Modes</span>
                </div>
                <div className="flex items-center gap-2 text-[#e2e2e6] text-xs">
                  <span className="material-symbols-outlined text-[#00e5ff] text-[18px]">bluetooth_audio</span>
                  <span>Hi-Res BT 5.3 Speaker</span>
                </div>
                <div className="flex items-center gap-2 text-[#e2e2e6] text-xs">
                  <span className="material-symbols-outlined text-[#00e5ff] text-[18px]">timer</span>
                  <span>Smart Sleep Timer</span>
                </div>
                <div className="flex items-center gap-2 text-[#e2e2e6] text-xs">
                  <span className="material-symbols-outlined text-[#00e5ff] text-[18px]">battery_charging_full</span>
                  <span>10-Hr Battery Backup</span>
                </div>
              </div>

              {/* Variant Selector (Finish) */}
              <div className="pt-2">
                <label className="block font-space text-xs uppercase font-bold text-[#bac9cc] mb-1.5">
                  Finish: <span className="text-[#00e5ff]">{selectedFinish}</span>
                </label>
                <div className="grid grid-cols-3 gap-2">
                  {HERO_PRODUCT.variants?.[0]?.options.map((option) => (
                    <button
                      key={option}
                      type="button"
                      onClick={() => setSelectedFinish(option)}
                      className={`py-2 px-2 rounded-lg font-space text-[11px] font-semibold border transition-all text-center cursor-pointer truncate ${
                        selectedFinish === option
                          ? 'border-[#00e5ff] bg-[#00e5ff]/10 text-[#00e5ff] shadow-[0_0_10px_rgba(0,229,255,0.2)]'
                          : 'border-[#3b494c]/60 bg-[#1e2023] text-[#bac9cc] hover:border-[#849396]'
                      }`}
                    >
                      {option}
                    </button>
                  ))}
                </div>
              </div>

              {/* Interactive CTAs */}
              <div className="flex flex-col gap-2 pt-2">
                <button
                  onClick={() => onInstantBuy(HERO_PRODUCT, selectedFinish)}
                  className="w-full py-4 px-6 rounded-xl bg-[#00e5ff] hover:bg-[#9cf0ff] text-[#001f24] font-space text-base uppercase tracking-wider flex items-center justify-center gap-2 shadow-[0_0_28px_rgba(0,229,255,0.45)] hover:shadow-[0_0_36px_rgba(0,229,255,0.6)] transition-all transform active:scale-[0.99] font-extrabold cursor-pointer"
                >
                  <span className="material-symbols-outlined text-[24px]">flash_on</span>
                  ORDER NOW - 50% OFF TODAY ONLY
                </button>

                <button
                  onClick={() => onAddToCart(HERO_PRODUCT, selectedFinish)}
                  className="w-full py-2.5 px-4 rounded-xl bg-[#282a2d] hover:bg-[#333538] text-[#e2e2e6] font-space text-xs uppercase font-bold tracking-wider border border-[#3b494c] transition-all cursor-pointer flex items-center justify-center gap-2"
                >
                  <span className="material-symbols-outlined text-[18px] text-[#00e5ff]">add_shopping_cart</span>
                  Add To Cart
                </button>

                <div className="flex items-center justify-center gap-6 py-1 text-[#bac9cc] font-space text-[11px]">
                  <span className="flex items-center gap-1.5">
                    <span className="material-symbols-outlined text-[#00e5ff] text-[16px]">lock</span>
                    256-Bit SSL Encrypted
                  </span>
                  <span className="flex items-center gap-1.5">
                    <span className="material-symbols-outlined text-[#00e5ff] text-[16px]">replay_30</span>
                    30-Day Money Back
                  </span>
                </div>
              </div>

              {/* Bilingual Trust Capsule */}
              <div className="bg-[#282a2d]/70 p-3 rounded-xl flex flex-col sm:flex-row items-start sm:items-center justify-between text-[#bac9cc] border border-[#3b494c]/40 text-xs gap-2">
                <div className="flex items-center gap-2">
                  <span className="material-symbols-outlined text-[#00e5ff] text-[18px]">public</span>
                  <span>شحن سريع لجميع محافظات مصر والخليج خلال 24-48 ساعة</span>
                </div>
                <div className="flex items-center gap-1.5 flex-wrap">
                  <span className="text-[10px] text-[#849396]">دفع معتمد:</span>
                  <span className="px-1.5 py-0.5 rounded bg-[#4da6ff]/20 text-[#4da6ff] font-bold text-[10px]">فيزا</span>
                  <span className="px-1.5 py-0.5 rounded bg-[#e60000]/20 text-[#ff4d4d] font-bold text-[10px]">فودافون كاش</span>
                  <span className="px-1.5 py-0.5 rounded bg-[#ff7900]/20 text-[#ff9933] font-bold text-[10px]">أورنج كاش</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};
