import React, { useState } from 'react';

export const LogisticsRadar: React.FC = () => {
  const [selectedDest, setSelectedDest] = useState<'EG' | 'SA' | 'AE' | 'KW' | 'US' | 'EU'>('EG');

  const deliveryEstimates = {
    EG: {
      country: 'مصر (جمهورية مصر العربية)',
      hub: 'Cairo International Cargo Village (مطار القاهرة)',
      time: '24-48 ساعة داخل القاهرة والجيزة • 48-72 ساعة لباقي المحافظات',
      carrier: 'Bosta / Aramex Express Air',
      cod: 'متاح نقداً عند الاستلام ومعاينة الجهاز',
      status: '🟢 جاهز للشحن الفوري',
    },
    SA: {
      country: 'المملكة العربية السعودية',
      hub: 'King Khalid International Cargo (مطار الملك خالد - الرياض)',
      time: '3 - 5 أيام عمل لجميع المدن',
      carrier: 'SMSA Express / DHL Express',
      cod: 'متاح عند الاستلام أو مدى وآبل باي',
      status: '🟢 جاهز للشحن الفوري',
    },
    AE: {
      country: 'الإمارات العربية المتحدة',
      hub: 'Emirates SkyCargo DXB / DWC (دبي)',
      time: '24 - 48 ساعة (توصيل فائق السرعة)',
      carrier: 'Emirates Post / Careem Box Direct',
      cod: 'متاح نقداً عند الاستلام',
      status: '🟢 جاهز للشحن الفوري',
    },
    KW: {
      country: 'دولة الكويت',
      hub: 'Kuwait International Logistics Hub',
      time: '3 - 5 أيام عمل',
      carrier: 'Aramex International Air',
      cod: 'متاح بالدينار الكويتي أو البطاقات',
      status: '🟢 جاهز للشحن الفوري',
    },
    US: {
      country: 'United States & North America',
      hub: 'Houston International Terminal (IAH Logistics)',
      time: '3 - 5 Business Days Door-to-Door',
      carrier: 'USPS Priority Air / FedEx Express',
      cod: 'Encrypted Credit Card / Apple Pay / PayPal',
      status: '🟢 Operational',
    },
    EU: {
      country: 'European Union & United Kingdom',
      hub: 'Frankfurt Central Air Cargo (FRA Hub)',
      time: '4 - 6 Business Days Door-to-Door',
      carrier: 'DHL Global Forwarding / DPD Air',
      cod: 'Klarna / Apple Pay / Visa / MC',
      status: '🟢 Operational',
    },
  };

  const current = deliveryEstimates[selectedDest];

  return (
    <section className="w-full bg-[#181e27] py-14 lg:py-20 border-t border-[#282a2d]/50">
      <div className="max-w-6xl mx-auto px-4 lg:px-12 flex flex-col gap-10">
        {/* Header */}
        <div className="text-center flex flex-col items-center gap-2">
          <span className="font-space text-xs uppercase text-[#00e5ff] font-bold tracking-widest bg-[#00e5ff]/10 px-3.5 py-1 rounded-full border border-[#00e5ff]/20">
            Live Global Supply Chain Tracking
          </span>
          <h2 className="font-space font-bold text-2xl lg:text-4xl text-[#e2e2e6] tracking-tight">
            Air Express Logistics Radar
          </h2>
          <p className="text-sm text-[#bac9cc] max-w-xl leading-relaxed">
            Real-time fulfillment telemetry. Select your destination to preview exact delivery timeframes and courier assignments.
          </p>
        </div>

        {/* Destination Picker */}
        <div className="flex flex-wrap items-center justify-center gap-2">
          {[
            { id: 'EG', label: '🇪🇬 مصر (Egypt)' },
            { id: 'SA', label: '🇸🇦 السعودية (KSA)' },
            { id: 'AE', label: '🇦🇪 الإمارات (UAE)' },
            { id: 'KW', label: '🇰🇼 الكويت (Kuwait)' },
            { id: 'US', label: '🇺🇸 United States' },
            { id: 'EU', label: '🇪🇺 Europe / UK' },
          ].map((dest) => (
            <button
              key={dest.id}
              onClick={() => setSelectedDest(dest.id as any)}
              className={`px-4 py-2.5 rounded-xl font-space text-xs font-bold transition-all cursor-pointer ${
                selectedDest === dest.id
                  ? 'bg-[#00e5ff] text-[#001f24] shadow-[0_0_16px_rgba(0,229,255,0.4)]'
                  : 'bg-[#11151b] text-[#bac9cc] hover:text-[#e2e2e6] border border-[#3b494c]/40'
              }`}
            >
              {dest.label}
            </button>
          ))}
        </div>

        {/* Radar Telemetry Card */}
        <div className="bg-[#11151b] rounded-2xl p-6 lg:p-8 border border-[#3b494c]/50 shadow-2xl grid grid-cols-1 md:grid-cols-12 gap-6 items-center">
          <div className="md:col-span-7 flex flex-col gap-4">
            <div className="flex items-center justify-between">
              <span className="text-xs font-space font-bold uppercase text-[#00e5ff] flex items-center gap-2">
                <span className="w-2.5 h-2.5 rounded-full bg-[#00f0a8] animate-ping" />
                {current.status}
              </span>
              <span className="font-space text-xs text-[#849396]">
                Radar Node: Online
              </span>
            </div>

            <div>
              <h3 className="font-space font-bold text-2xl text-[#e2e2e6]">
                {current.country}
              </h3>
              <p className="text-xs text-[#bac9cc] mt-1 flex items-center gap-1.5">
                <span className="material-symbols-outlined text-[#00e5ff] text-[16px]">flight_takeoff</span>
                {current.hub}
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2">
              <div className="p-3 rounded-xl bg-[#181e27] border border-[#3b494c]/30">
                <span className="text-[11px] text-[#849396] block">وقت التوصيل المتوقع:</span>
                <span className="font-space font-bold text-xs text-[#00e5ff]">
                  {current.time}
                </span>
              </div>

              <div className="p-3 rounded-xl bg-[#181e27] border border-[#3b494c]/30">
                <span className="text-[11px] text-[#849396] block">شركة الشحن الجوي:</span>
                <span className="font-space font-bold text-xs text-[#e2e2e6]">
                  {current.carrier}
                </span>
              </div>
            </div>

            <div className="p-3 rounded-xl bg-[#00e5ff]/10 border border-[#00e5ff]/30 text-xs text-[#c3f5ff] flex items-center gap-2">
              <span className="material-symbols-outlined text-[#00e5ff] text-[20px]">payments</span>
              <span><strong>الدفع والمعاينة:</strong> {current.cod}</span>
            </div>
          </div>

          <div className="md:col-span-5 flex flex-col items-center justify-center p-6 bg-[#181e27] rounded-xl border border-[#3b494c]/40 text-center gap-3">
            <div className="w-16 h-16 rounded-full bg-[#00e5ff]/10 border border-[#00e5ff] flex items-center justify-center text-[#00e5ff] shadow-[0_0_24px_rgba(0,229,255,0.3)]">
              <span className="material-symbols-outlined text-3xl">radar</span>
            </div>
            <h4 className="font-space font-bold text-base text-[#e2e2e6]">
              24-Hour Express Guarantee
            </h4>
            <p className="text-xs text-[#bac9cc] leading-relaxed">
              Every package is barcode-indexed and assigned to priority air cargo containers within 24 hours of booking.
            </p>
            <div className="flex items-center gap-2 text-[10px] uppercase font-space font-bold text-[#00e5ff]">
              <span>Zero Customs Duty</span> • <span>Trackable via SMS</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
