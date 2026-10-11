import React from 'react';

export const TrustStrip: React.FC = () => {
  return (
    <section className="w-full bg-[#1e2023] py-4 border-b border-[#282a2d]">
      <div className="max-w-7xl mx-auto px-4 lg:px-12">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {/* Feature 1 */}
          <div className="flex items-center gap-3 p-3 rounded-xl bg-[#1a1c1f] border border-[#3b494c]/30 shadow-sm hover:border-[#00e5ff]/40 transition-colors">
            <div className="w-10 h-10 rounded-lg bg-[#282a2d] flex items-center justify-center text-[#00e5ff] shrink-0">
              <span className="material-symbols-outlined text-[24px]">rocket_launch</span>
            </div>
            <div>
              <p className="font-space text-xs uppercase text-[#e2e2e6] font-bold tracking-wide">
                Fast Air Express
              </p>
              <p className="text-[11px] text-[#bac9cc]">5-9 Business Days Worldwide</p>
            </div>
          </div>

          {/* Feature 2 */}
          <div className="flex items-center gap-3 p-3 rounded-xl bg-[#1a1c1f] border border-[#3b494c]/30 shadow-sm hover:border-[#00e5ff]/40 transition-colors">
            <div className="w-10 h-10 rounded-lg bg-[#282a2d] flex items-center justify-center text-[#00e5ff] shrink-0">
              <span className="material-symbols-outlined text-[24px]">verified_user</span>
            </div>
            <div>
              <p className="font-space text-xs uppercase text-[#e2e2e6] font-bold tracking-wide">
                30-Day Risk-Free
              </p>
              <p className="text-[11px] text-[#bac9cc]">Hassle-Free Returns</p>
            </div>
          </div>

          {/* Feature 3 */}
          <div className="flex items-center gap-3 p-3 rounded-xl bg-[#1a1c1f] border border-[#3b494c]/30 shadow-sm hover:border-[#00e5ff]/40 transition-colors">
            <div className="w-10 h-10 rounded-lg bg-[#282a2d] flex items-center justify-center text-[#00e5ff] shrink-0">
              <span className="material-symbols-outlined text-[24px]">support_agent</span>
            </div>
            <div>
              <p className="font-space text-xs uppercase text-[#e2e2e6] font-bold tracking-wide">
                24/7 Priority Desk
              </p>
              <p className="text-[11px] text-[#bac9cc]">Live Concierge Support</p>
            </div>
          </div>

          {/* Feature 4 */}
          <div className="flex items-center gap-3 p-3 rounded-xl bg-[#1a1c1f] border border-[#3b494c]/30 shadow-sm hover:border-[#00e5ff]/40 transition-colors">
            <div className="w-10 h-10 rounded-lg bg-[#282a2d] flex items-center justify-center text-[#00e5ff] shrink-0">
              <span className="material-symbols-outlined text-[24px]">encrypted</span>
            </div>
            <div>
              <p className="font-space text-xs uppercase text-[#e2e2e6] font-bold tracking-wide">
                Encrypted Vault
              </p>
              <p className="text-[11px] text-[#bac9cc]">100% Protected Payment</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
