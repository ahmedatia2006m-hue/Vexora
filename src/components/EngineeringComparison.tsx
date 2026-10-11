import React from 'react';

export const EngineeringComparison: React.FC = () => {
  const comparisons = [
    {
      feature: 'Optical Projection Matrix',
      vexora: '4K Ultra-Wide Nebula Laser Diodes with Dual-Refractive Quartz Prisms',
      generic: 'Low-density 480p blurry LED with plastic scratch-prone lens',
      icon: 'auto_awesome',
    },
    {
      feature: 'Acoustic Sound Architecture',
      vexora: '12W Spatial 360° Neodymium Resonator + Deep Passive Bass Radiator',
      generic: 'Tiny 2W mono smartphone speaker with tinny distortion over 50% volume',
      icon: 'speaker',
    },
    {
      feature: 'Chassis & Thermal Engineering',
      vexora: 'Grade 5 Aerospace Titanium with CNC Beveled Chamfers & Vapor Cooling',
      generic: 'Recycled lightweight ABS plastic that overheats in under 45 minutes',
      icon: 'precision_manufacturing',
    },
    {
      feature: 'Battery & Continuous Runtime',
      vexora: '5,200 mAh Dual Lithium-Ion Cells (10-Hour Standalone Playback)',
      generic: 'Uncertified 800 mAh battery requiring constant cable tethering',
      icon: 'battery_charging_full',
    },
    {
      feature: 'Logistics, Guarantee & COD',
      vexora: 'شحن جوي سريع خلال 24 ساعة + الدفع عند الاستلام وضمان استبدال سنتين',
      generic: 'شحن بحري بطيء يستغرق 4 أسابيع بدون ضمان أو معاينة عند الاستلام',
      icon: 'verified',
    },
  ];

  return (
    <section className="w-full bg-[#111317] py-14 lg:py-20 border-t border-[#282a2d]/50">
      <div className="max-w-6xl mx-auto px-4 lg:px-12 flex flex-col gap-10">
        {/* Header */}
        <div className="text-center flex flex-col items-center gap-2">
          <span className="font-space text-xs uppercase text-[#00e5ff] font-bold tracking-widest bg-[#00e5ff]/10 px-3.5 py-1 rounded-full border border-[#00e5ff]/20">
            Hardware Teardown &amp; Architectural Standard
          </span>
          <h2 className="font-space font-bold text-2xl lg:text-4xl text-[#e2e2e6] tracking-tight">
            Why Discerning Enthusiasts Choose Vexora.
          </h2>
          <p className="text-sm text-[#bac9cc] max-w-2xl leading-relaxed">
            We don’t cut corners on optical lenses, acoustics, or chassis metallurgy. See how our laboratory engineering compares to cheap generic gadgets.
          </p>
        </div>

        {/* Matrix Table */}
        <div className="w-full overflow-hidden rounded-2xl border border-[#3b494c]/40 bg-[#181e27] shadow-2xl">
          {/* Table Header */}
          <div className="grid grid-cols-12 bg-[#11151b] p-4 text-xs font-space font-bold uppercase tracking-wider border-b border-[#3b494c]/40 text-[#bac9cc]">
            <div className="col-span-4 sm:col-span-3 flex items-center gap-2">
              <span className="material-symbols-outlined text-[18px] text-[#00e5ff]">architecture</span>
              Specification
            </div>
            <div className="col-span-4 sm:col-span-5 text-[#00e5ff] flex items-center gap-1.5">
              <span className="material-symbols-outlined text-[18px]">verified</span>
              Vexora Labs Precision
            </div>
            <div className="col-span-4 sm:col-span-4 text-[#849396] flex items-center gap-1.5">
              <span className="material-symbols-outlined text-[18px]">cancel</span>
              Generic Market Clones
            </div>
          </div>

          {/* Rows */}
          <div className="divide-y divide-[#3b494c]/30">
            {comparisons.map((row, idx) => (
              <div
                key={idx}
                className="grid grid-cols-12 p-4 lg:p-5 text-xs items-center gap-2 hover:bg-[#1f2631] transition-colors"
              >
                <div className="col-span-4 sm:col-span-3 font-space font-bold text-[#e2e2e6] flex items-center gap-2.5">
                  <span className="material-symbols-outlined text-[#00e5ff] text-[20px] shrink-0">
                    {row.icon}
                  </span>
                  <span>{row.feature}</span>
                </div>

                <div className="col-span-4 sm:col-span-5 text-[#c3f5ff] font-medium leading-relaxed bg-[#00e5ff]/5 p-2 rounded-lg border border-[#00e5ff]/20">
                  <span className="text-[#00e5ff] font-bold mr-1">✓</span>
                  {row.vexora}
                </div>

                <div className="col-span-4 sm:col-span-4 text-[#849396] leading-relaxed">
                  <span className="text-[#ff5555] font-bold mr-1">✕</span>
                  {row.generic}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Bottom Proof Metric Banner */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          <div className="p-4 rounded-xl bg-[#1a1c1f] border border-[#3b494c]/30 text-center">
            <span className="font-space font-bold text-2xl text-[#00e5ff]">0.02%</span>
            <p className="font-space text-xs uppercase text-[#bac9cc] mt-1 font-semibold">
              Return RMA Rate
            </p>
            <p className="text-[11px] text-[#849396]">Tested against 14,200+ shipped units</p>
          </div>

          <div className="p-4 rounded-xl bg-[#1a1c1f] border border-[#3b494c]/30 text-center">
            <span className="font-space font-bold text-2xl text-[#00e5ff]">24 Months</span>
            <p className="font-space text-xs uppercase text-[#bac9cc] mt-1 font-semibold">
              Full Replacement Warranty
            </p>
            <p className="text-[11px] text-[#849396]">Instant RMA label with no repair delays</p>
          </div>

          <div className="p-4 rounded-xl bg-[#1a1c1f] border border-[#3b494c]/30 text-center">
            <span className="font-space font-bold text-2xl text-[#00e5ff]">100% COD</span>
            <p className="font-space text-xs uppercase text-[#bac9cc] mt-1 font-semibold">
              الدفع عند الاستلام والمعاينة
            </p>
            <p className="text-[11px] text-[#849396]">افحص جهازك بنفسك قبل سداد أي مبلغ</p>
          </div>
        </div>
      </div>
    </section>
  );
};
