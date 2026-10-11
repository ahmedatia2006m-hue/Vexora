import React from 'react';
import { CurrencyConfig, Product } from '../types';
import { HERO_PRODUCT, DROPSHIPPING_WINNERS, formatPrice } from '../data/products';

interface BundleSaverProps {
  currency: CurrencyConfig;
  onSelectBundle: (bundleType: 'solo' | 'duo' | 'trio') => void;
}

export const BundleSaver: React.FC<BundleSaverProps> = ({ currency, onSelectBundle }) => {
  return (
    <section className="w-full bg-[#16191e] py-14 lg:py-20 border-t border-b border-[#282a2d]/50">
      <div className="max-w-6xl mx-auto px-4 lg:px-12 flex flex-col gap-10">
        {/* Header */}
        <div className="text-center flex flex-col items-center gap-2">
          <span className="font-space text-xs uppercase text-[#00e5ff] font-bold tracking-widest bg-[#00e5ff]/10 px-3.5 py-1 rounded-full border border-[#00e5ff]/20">
            Exclusive Multi-Unit Allocation
          </span>
          <h2 className="font-space font-bold text-2xl lg:text-4xl text-[#e2e2e6] tracking-tight">
            Bundle &amp; Save Up To 60% Off
          </h2>
          <p className="text-sm text-[#bac9cc] max-w-xl leading-relaxed">
            Upgrade multiple rooms or gift the future to family and friends. Includes Free Priority Air Courier and bonus cyber accessories.
          </p>
        </div>

        {/* 3 Bundle Tier Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 items-stretch">
          {/* Tier 1: Solo */}
          <div className="bg-[#1a1c1f] rounded-2xl p-6 border border-[#3b494c]/40 flex flex-col justify-between gap-6 hover:border-[#00e5ff]/50 transition-all">
            <div className="flex flex-col gap-3">
              <span className="text-xs font-space font-bold uppercase text-[#849396]">
                Standard Allocation
              </span>
              <h3 className="font-space font-bold text-xl text-[#e2e2e6]">
                1x CyberGlow Cube
              </h3>
              <p className="text-xs text-[#bac9cc] leading-relaxed">
                Single room setup with Gen 4.2 optical matrix and 360° acoustic engine.
              </p>

              <div className="py-4 border-t border-b border-[#3b494c]/30 my-2">
                <div className="flex items-baseline gap-2">
                  <span className="font-space font-bold text-3xl text-[#00e5ff]">
                    {formatPrice(69.99, currency)}
                  </span>
                  <span className="text-sm text-[#849396] line-through font-space">
                    {formatPrice(139.99, currency)}
                  </span>
                </div>
                <span className="text-[10px] font-space text-[#00f0a8] font-bold uppercase block mt-1">
                  Save 50% ($70 Off)
                </span>
              </div>

              <ul className="text-xs text-[#bac9cc] flex flex-col gap-2">
                <li className="flex items-center gap-2">
                  <span className="text-[#00e5ff]">✓</span> 1x CyberGlow Lumina Projection Cube
                </li>
                <li className="flex items-center gap-2">
                  <span className="text-[#00e5ff]">✓</span> Type-C Fast PD Braided Cable
                </li>
                <li className="flex items-center gap-2">
                  <span className="text-[#00e5ff]">✓</span> 24-Month Hardware Guarantee
                </li>
              </ul>
            </div>

            <button
              onClick={() => onSelectBundle('solo')}
              className="w-full py-3 rounded-xl bg-[#282a2d] hover:bg-[#333538] text-[#e2e2e6] font-space text-xs uppercase font-bold tracking-wider border border-[#3b494c] transition-all cursor-pointer"
            >
              Claim Solo Pack
            </button>
          </div>

          {/* Tier 2: Duo (Most Popular) */}
          <div className="bg-[#1e232b] rounded-2xl p-6 border-2 border-[#00e5ff] flex flex-col justify-between gap-6 shadow-[0_0_32px_rgba(0,229,255,0.25)] relative transform md:-translate-y-2">
            <div className="absolute -top-3.5 left-1/2 -translate-x-1/2 bg-[#00e5ff] text-[#001f24] font-space font-extrabold text-[10px] uppercase tracking-wider px-3 py-1 rounded-full shadow-md">
              🔥 MOST POPULAR (الأكثر طلباً)
            </div>

            <div className="flex flex-col gap-3 mt-1">
              <span className="text-xs font-space font-bold uppercase text-[#00e5ff]">
                Dual Room / Couple Pack
              </span>
              <h3 className="font-space font-bold text-xl text-[#e2e2e6]">
                2x CyberGlow Cubes
              </h3>
              <p className="text-xs text-[#bac9cc] leading-relaxed">
                Bedroom + Living room immersion or matching gifts with extra 15% discount.
              </p>

              <div className="py-4 border-t border-b border-[#3b494c]/40 my-2 bg-[#11151b]/50 p-3 rounded-xl">
                <div className="flex items-baseline gap-2">
                  <span className="font-space font-bold text-3xl text-[#00e5ff]">
                    {formatPrice(119.99, currency)}
                  </span>
                  <span className="text-sm text-[#849396] line-through font-space">
                    {formatPrice(279.98, currency)}
                  </span>
                </div>
                <span className="text-[10px] font-space text-[#00f0a8] font-bold uppercase block mt-1">
                  Save 58% + Free Worldwide Air Shipping
                </span>
              </div>

              <ul className="text-xs text-[#bac9cc] flex flex-col gap-2">
                <li className="flex items-center gap-2">
                  <span className="text-[#00e5ff]">✓</span> 2x CyberGlow Projection Cubes
                </li>
                <li className="flex items-center gap-2">
                  <span className="text-[#00e5ff]">✓</span> 2x Hard-Shell Cyber Travel Pouches
                </li>
                <li className="flex items-center gap-2">
                  <span className="text-[#00e5ff]">✓</span> <strong>FREE Express Air Courier</strong>
                </li>
                <li className="flex items-center gap-2">
                  <span className="text-[#00e5ff]">✓</span> Priority VIP Concierge Dispatch
                </li>
              </ul>
            </div>

            <button
              onClick={() => onSelectBundle('duo')}
              className="w-full py-3.5 rounded-xl bg-[#00e5ff] hover:bg-[#9cf0ff] text-[#001f24] font-space text-xs uppercase font-extrabold tracking-wider shadow-lg transition-all cursor-pointer flex items-center justify-center gap-2"
            >
              <span className="material-symbols-outlined text-[18px]">bolt</span>
              Claim Duo Pack &amp; Save 58%
            </button>
          </div>

          {/* Tier 3: Trio Cyber Executive */}
          <div className="bg-[#1a1c1f] rounded-2xl p-6 border border-[#3b494c]/40 flex flex-col justify-between gap-6 hover:border-[#00e5ff]/50 transition-all">
            <div className="flex flex-col gap-3">
              <span className="text-xs font-space font-bold uppercase text-[#849396]">
                Ultimate Cyber Executive
              </span>
              <h3 className="font-space font-bold text-xl text-[#e2e2e6]">
                3x Cubes + Free Mount
              </h3>
              <p className="text-xs text-[#bac9cc] leading-relaxed">
                Equip your whole space. Includes a Free LuminaGrip Anti-Gravity Phone Mount ($49.99 value).
              </p>

              <div className="py-4 border-t border-b border-[#3b494c]/30 my-2">
                <div className="flex items-baseline gap-2">
                  <span className="font-space font-bold text-3xl text-[#00e5ff]">
                    {formatPrice(169.99, currency)}
                  </span>
                  <span className="text-sm text-[#849396] line-through font-space">
                    {formatPrice(469.96, currency)}
                  </span>
                </div>
                <span className="text-[10px] font-space text-[#00f0a8] font-bold uppercase block mt-1">
                  Save 64% + Free Phone Mount
                </span>
              </div>

              <ul className="text-xs text-[#bac9cc] flex flex-col gap-2">
                <li className="flex items-center gap-2">
                  <span className="text-[#00e5ff]">✓</span> 3x CyberGlow Projection Cubes
                </li>
                <li className="flex items-center gap-2">
                  <span className="text-[#00e5ff]">✓</span> <strong>FREE Anti-Gravity Mount</strong>
                </li>
                <li className="flex items-center gap-2">
                  <span className="text-[#00e5ff]">✓</span> Free Air Cargo with Signature
                </li>
                <li className="flex items-center gap-2">
                  <span className="text-[#00e5ff]">✓</span> Lifetime Hardware VIP Replacement
                </li>
              </ul>
            </div>

            <button
              onClick={() => onSelectBundle('trio')}
              className="w-full py-3 rounded-xl bg-[#282a2d] hover:bg-[#00e5ff] hover:text-[#001f24] text-[#e2e2e6] font-space text-xs uppercase font-bold tracking-wider border border-[#3b494c] transition-all cursor-pointer"
            >
              Claim Executive Pack
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};
