import React, { useState, useEffect } from 'react';
import { CurrencyConfig } from '../types';
import { formatPrice } from '../data/products';

interface LiveSalesTickerProps {
  currency: CurrencyConfig;
  onSelectProductById?: (productId: string) => void;
}

const RECENT_SALES = [
  { name: 'أحمد م.', city: 'القاهرة، مصر', product: 'CyberGlow Lumina Cube', time: 'منذ دقيقتين', price: 69.99, id: 'cyberglow-cube' },
  { name: 'Fahad A.', city: 'دبي، الإمارات', product: 'CyberPulse Health Ring', time: 'منذ 5 دقائق', price: 49.99, id: 'cyberpulse-ring' },
  { name: 'سارة ك.', city: 'الإسكندرية، مصر', product: 'MagneCharge 4-in-1', time: 'منذ 8 دقائق', price: 44.99, id: 'magnecharge-4in1' },
  { name: 'عمر ش.', city: 'الرياض، السعودية', product: 'AeroClean Turbo Vacuum', time: 'منذ 11 دقيقة', price: 39.99, id: 'aeroclean-vacuum' },
  { name: 'محمود ع.', city: 'الجيزة، مصر', product: 'CyberGlow Lumina Cube', time: 'منذ 14 دقيقة', price: 69.99, id: 'cyberglow-cube' },
];

export const LiveSalesTicker: React.FC<LiveSalesTickerProps> = ({ currency, onSelectProductById }) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isVisible, setIsVisible] = useState(true);

  useEffect(() => {
    const interval = setInterval(() => {
      setIsVisible(false);
      setTimeout(() => {
        setCurrentIndex((prev) => (prev + 1) % RECENT_SALES.length);
        setIsVisible(true);
      }, 400);
    }, 6000);
    return () => clearInterval(interval);
  }, []);

  const current = RECENT_SALES[currentIndex];

  return (
    <aside
      aria-label="Recent Purchases Notification"
      className="fixed bottom-5 left-5 z-40 hidden sm:block max-w-sm pointer-events-auto"
    >
      <div
        className={`bg-[#181e27]/95 backdrop-blur-md border border-[#00e5ff]/30 p-3 rounded-2xl shadow-[0_8px_32px_rgba(0,0,0,0.6)] flex items-center gap-3 transition-all duration-300 transform ${
          isVisible ? 'translate-y-0 opacity-100' : 'translate-y-4 opacity-0'
        }`}
      >
        <div className="w-10 h-10 rounded-xl bg-[#11151b] border border-[#3b494c]/40 flex items-center justify-center text-[#00e5ff] shrink-0 shadow-inner">
          <span className="material-symbols-outlined text-[20px]">local_mall</span>
        </div>

        <div className="flex-1 min-w-0 text-xs">
          <div className="flex items-center justify-between gap-1">
            <span className="font-space font-bold text-[#e2e2e6] truncate">
              {current.name} • {current.city}
            </span>
            <span className="text-[10px] text-[#00e5ff] font-mono-tabular shrink-0">
              {current.time}
            </span>
          </div>
          <p className="text-[11px] text-[#bac9cc] truncate mt-0.5">
            اشترى للتو{' '}
            <strong className="text-[#00e5ff] font-space">{current.product}</strong>
          </p>
          <div className="flex items-center gap-2 mt-0.5">
            <span className="font-space font-bold text-[11px] text-[#e2e2e6]">
              {formatPrice(current.price, currency)}
            </span>
            <span className="text-[9px] uppercase tracking-wider text-[#00f0a8] font-bold">
              ● تم حجز الشحنة
            </span>
          </div>
        </div>

        <button
          onClick={() => setIsVisible(false)}
          className="text-[#849396] hover:text-[#e2e2e6] text-xs p-1"
          title="إغلاق"
        >
          ✕
        </button>
      </div>
    </aside>
  );
};
