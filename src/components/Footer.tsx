import React, { useState } from 'react';

interface FooterProps {
  onOpenTrackOrder: () => void;
  onOpenSupport: () => void;
  onOpenPolicy: (title: string) => void;
}

export const Footer: React.FC<FooterProps> = ({
  onOpenTrackOrder,
  onOpenSupport,
  onOpenPolicy,
}) => {
  const [email, setEmail] = useState('');
  const [isSubscribed, setIsSubscribed] = useState(false);

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email.trim() || !email.includes('@')) return;
    setIsSubscribed(true);
    setTimeout(() => {
      setEmail('');
      setIsSubscribed(false);
    }, 4000);
  };

  return (
    <footer className="w-full bg-[#0c0e11] border-t border-[#282a2d]">
      <div className="max-w-7xl mx-auto px-4 lg:px-12 py-12 lg:py-16">
        {/* Top 4 Assurance Boxes */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 pb-12 border-b border-[#282a2d]">
          <div className="p-4 bg-[#1a1c1f] rounded-xl flex items-center gap-3 border border-[#3b494c]/30">
            <span className="material-symbols-outlined text-[#00e5ff] text-[28px]">verified</span>
            <div>
              <p className="font-space text-xs uppercase text-[#e2e2e6] font-bold">
                30-Day Guarantee
              </p>
              <p className="text-xs text-[#bac9cc]">Zero-risk trials</p>
            </div>
          </div>

          <div className="p-4 bg-[#1a1c1f] rounded-xl flex items-center gap-3 border border-[#3b494c]/30">
            <span className="material-symbols-outlined text-[#00e5ff] text-[28px]">bolt</span>
            <div>
              <p className="font-space text-xs uppercase text-[#e2e2e6] font-bold">
                Fast Logistics
              </p>
              <p className="text-xs text-[#bac9cc]">Dispatched in 24h</p>
            </div>
          </div>

          <div className="p-4 bg-[#1a1c1f] rounded-xl flex items-center gap-3 border border-[#3b494c]/30">
            <span className="material-symbols-outlined text-[#00e5ff] text-[28px]">lock</span>
            <div>
              <p className="font-space text-xs uppercase text-[#e2e2e6] font-bold">
                Secure Vault
              </p>
              <p className="text-xs text-[#bac9cc]">256-bit encryption</p>
            </div>
          </div>

          <div className="p-4 bg-[#1a1c1f] rounded-xl flex items-center gap-3 border border-[#3b494c]/30">
            <span className="material-symbols-outlined text-[#00e5ff] text-[28px]">headset_mic</span>
            <div>
              <p className="font-space text-xs uppercase text-[#e2e2e6] font-bold">
                24/7 Support
              </p>
              <p className="text-xs text-[#bac9cc]">Dedicated concierge</p>
            </div>
          </div>
        </div>

        {/* 3 Main Columns */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-8 py-12 border-b border-[#282a2d]">
          {/* Brand Info */}
          <div className="md:col-span-5 flex flex-col gap-3">
            <div className="flex items-center gap-3">
              <span className="font-space font-bold text-2xl text-[#e2e2e6] uppercase tracking-tight">
                VEXORA
              </span>
            </div>
            <p className="text-xs text-[#bac9cc] max-w-sm leading-relaxed">
              Engineering precision hardware, ultra-responsive smart gear, and future-ready lifestyle devices directly to your doorstep.
            </p>
            <div className="flex flex-wrap items-center gap-1.5 pt-2">
              {[
                { name: 'VISA', color: 'text-[#4da6ff] border-[#4da6ff]/30' },
                { name: 'MASTERCARD', color: 'text-[#ff5f00] border-[#ff5f00]/30' },
                { name: 'فودافون كاش (VODAFONE CASH)', color: 'text-[#ff4d4d] border-[#e60000]/40 bg-[#e60000]/10' },
                { name: 'أورنج كاش (ORANGE CASH)', color: 'text-[#ff9933] border-[#ff7900]/40 bg-[#ff7900]/10' },
                { name: 'INSTAPAY مصر', color: 'text-[#00e5ff] border-[#00e5ff]/30' },
                { name: 'الدفع عند الاستلام (COD)', color: 'text-[#bac9cc] border-[#3b494c]/40' },
              ].map((pay) => (
                <span
                  key={pay.name}
                  className={`px-2.5 py-1 rounded bg-[#1e2023] border font-space text-[10px] font-bold uppercase tracking-wider ${pay.color}`}
                >
                  {pay.name}
                </span>
              ))}
            </div>
          </div>

          {/* Links */}
          <div className="md:col-span-3 flex flex-col gap-2">
            <p className="font-space text-xs font-bold text-[#e2e2e6] uppercase tracking-wider mb-1">
              Policies &amp; Information
            </p>
            <button
              onClick={() => onOpenPolicy('Privacy Policy')}
              className="text-left text-xs text-[#bac9cc] hover:text-[#00e5ff] transition-colors py-0.5 cursor-pointer"
            >
              Privacy Policy
            </button>
            <button
              onClick={() => onOpenPolicy('Terms of Service')}
              className="text-left text-xs text-[#bac9cc] hover:text-[#00e5ff] transition-colors py-0.5 cursor-pointer"
            >
              Terms of Service
            </button>
            <button
              onClick={() => onOpenPolicy('Shipping Policy')}
              className="text-left text-xs text-[#bac9cc] hover:text-[#00e5ff] transition-colors py-0.5 cursor-pointer"
            >
              Shipping Policy
            </button>
            <button
              onClick={() => onOpenPolicy('Refund & Returns')}
              className="text-left text-xs text-[#bac9cc] hover:text-[#00e5ff] transition-colors py-0.5 cursor-pointer"
            >
              Refund &amp; Returns
            </button>
            <button
              onClick={onOpenTrackOrder}
              className="text-left text-xs text-[#bac9cc] hover:text-[#00e5ff] transition-colors py-0.5 cursor-pointer"
            >
              Order Tracking
            </button>
            <button
              onClick={onOpenSupport}
              className="text-left text-xs text-[#bac9cc] hover:text-[#00e5ff] transition-colors py-0.5 cursor-pointer"
            >
              24/7 Concierge Support
            </button>
          </div>

          {/* Newsletter */}
          <div className="md:col-span-4 flex flex-col gap-2">
            <p className="font-space text-xs font-bold text-[#e2e2e6] uppercase tracking-wider mb-1">
              Cyber Insiders Newsletter
            </p>
            <p className="text-xs text-[#bac9cc] leading-relaxed">
              Get priority drops, private discount vouchers, and hardware releases directly to your inbox.
            </p>

            {isSubscribed ? (
              <div className="p-3 rounded-xl bg-[#00e5ff]/15 border border-[#00e5ff] text-xs text-[#00e5ff] font-space font-bold flex items-center gap-2 mt-2">
                <span className="material-symbols-outlined text-[18px]">verified</span>
                VIP Pass Activated! Check your inbox for $15 welcome code.
              </div>
            ) : (
              <form onSubmit={handleSubscribe} className="flex items-center gap-2 mt-2">
                <input
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Enter your email..."
                  className="w-full bg-[#1a1c1f] px-3.5 py-2.5 rounded-xl border border-[#3b494c]/50 text-xs text-[#e2e2e6] placeholder-[#849396] focus:outline-none focus:border-[#00e5ff]"
                />
                <button
                  type="submit"
                  className="bg-[#00e5ff] text-[#001f24] font-space text-xs uppercase px-4 py-2.5 rounded-xl hover:bg-[#9cf0ff] transition-all font-extrabold cursor-pointer shrink-0"
                >
                  Join
                </button>
              </form>
            )}
          </div>
        </div>

        {/* Bottom Credits */}
        <div className="pt-6 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs text-[#bac9cc]">
          <p>© 2025 Vexora Technologies Ltd. All rights reserved.</p>
          <p className="font-space text-[11px] text-[#849396] uppercase tracking-wider">
            Encrypted 256-Bit Global Commerce Hub
          </p>
        </div>
      </div>
    </footer>
  );
};
