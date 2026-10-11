import React from 'react';

interface FinalCtaProps {
  onShopNow: () => void;
  onTrackOrder: () => void;
}

export const FinalCta: React.FC<FinalCtaProps> = ({ onShopNow, onTrackOrder }) => {
  return (
    <section className="w-full bg-gradient-to-r from-[#0c0e11] via-[#1e2023] to-[#0c0e11] py-14 lg:py-20 border-t border-[#3b494c]/30 text-center relative overflow-hidden">
      {/* Background ambient lighting */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-64 bg-[#00e5ff]/5 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-4xl mx-auto px-4 lg:px-12 flex flex-col items-center gap-5 relative z-10">
        <span className="px-4 py-1 rounded-full bg-[#00e5ff]/10 text-[#00e5ff] font-space text-xs uppercase font-bold tracking-widest border border-[#00e5ff]/20">
          Exclusive Launch Allocation
        </span>

        <h2 className="font-space font-bold text-3xl lg:text-4xl text-[#e2e2e6] tracking-tight">
          Upgrade Your Tech Gear Today.
        </h2>

        <p className="text-base text-[#bac9cc] max-w-xl leading-relaxed">
          Experience zero-latency hardware precision. Claim your 50% discount voucher before our current production batch sells out.
        </p>

        <div className="flex flex-col sm:flex-row items-center gap-4 w-full justify-center pt-2">
          <button
            onClick={onShopNow}
            className="w-full sm:w-auto px-8 py-4 rounded-xl bg-[#00e5ff] hover:bg-[#9cf0ff] text-[#001f24] font-space text-sm uppercase tracking-wider font-extrabold shadow-[0_0_32px_rgba(0,229,255,0.45)] hover:shadow-[0_0_40px_rgba(0,229,255,0.65)] transition-all flex items-center justify-center gap-2 cursor-pointer"
          >
            <span className="material-symbols-outlined text-[22px]">shopping_bag</span>
            Shop Viral Collection Now
          </button>

          <button
            onClick={onTrackOrder}
            className="w-full sm:w-auto px-8 py-4 rounded-xl bg-[#282a2d] hover:bg-[#37393d] text-[#e2e2e6] font-space text-xs uppercase tracking-wider font-bold transition-all border border-[#3b494c] cursor-pointer"
          >
            Track Existing Order
          </button>
        </div>

        {/* Trust Badges Strip */}
        <div className="flex flex-wrap items-center justify-center gap-6 pt-4 text-[#bac9cc] font-space text-xs">
          <span className="flex items-center gap-1.5">
            <span className="material-symbols-outlined text-[#00e5ff] text-[18px]">verified</span>
            100% Authentic Guaranteed
          </span>
          <span className="flex items-center gap-1.5">
            <span className="material-symbols-outlined text-[#00e5ff] text-[18px]">local_shipping</span>
            Express Worldwide Dispatch
          </span>
          <span className="flex items-center gap-1.5">
            <span className="material-symbols-outlined text-[#00e5ff] text-[18px]">lock</span>
            PCI-DSS Compliant Checkout
          </span>
        </div>
      </div>
    </section>
  );
};
