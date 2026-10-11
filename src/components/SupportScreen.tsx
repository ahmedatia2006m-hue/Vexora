import React, { useState } from 'react';

interface SupportScreenProps {
  onBackToHome: () => void;
  onOpenTrackOrder: () => void;
}

export const SupportScreen: React.FC<SupportScreenProps> = ({
  onBackToHome,
  onOpenTrackOrder,
}) => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    orderId: '',
    category: 'Order Dispatch Tracking',
    message: '',
  });
  const [ticketSubmitted, setTicketSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name.trim() || !formData.email.trim() || !formData.message.trim()) return;
    setTicketSubmitted(true);
    setTimeout(() => {
      setTicketSubmitted(false);
      setFormData({
        name: '',
        email: '',
        orderId: '',
        category: 'Order Dispatch Tracking',
        message: '',
      });
    }, 4000);
  };

  return (
    <div className="w-full bg-[#111317] py-10 lg:py-16 min-h-[80vh]">
      <div className="max-w-4xl mx-auto px-4 lg:px-12 flex flex-col gap-8">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div>
            <div className="flex items-center gap-2 text-[#00e5ff] font-space text-xs uppercase font-bold tracking-wider mb-1">
              <span className="material-symbols-outlined text-[16px]">support_agent</span>
              24/7 Priority Concierge Desk
            </div>
            <h1 className="font-space font-bold text-2xl lg:text-3xl text-[#e2e2e6] tracking-tight">
              Customer Care &amp; Warranty Support
            </h1>
            <p className="text-sm text-[#bac9cc] mt-1">
              Guaranteed under 15-minute response time for global orders and GCC deliveries.
            </p>
          </div>

          <button
            onClick={onBackToHome}
            className="px-4 py-2 rounded-xl bg-[#1e2023] hover:bg-[#282a2d] text-xs font-space font-bold uppercase text-[#bac9cc] hover:text-[#e2e2e6] border border-[#3b494c]/40 cursor-pointer"
          >
            ← Storefront
          </button>
        </div>

        {/* 3 Quick Channels */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="p-4 rounded-xl bg-[#1a1c1f] border border-[#3b494c]/40 flex flex-col gap-2">
            <span className="material-symbols-outlined text-[#00e5ff] text-2xl">local_shipping</span>
            <h4 className="font-space font-bold text-sm text-[#e2e2e6]">Instant Parcel Tracker</h4>
            <p className="text-xs text-[#bac9cc]">
              Locate active air express cargo with direct live status reports.
            </p>
            <button
              onClick={onOpenTrackOrder}
              className="mt-2 text-xs text-[#00e5ff] font-space font-bold text-left hover:underline"
            >
              Open Radar Tracker →
            </button>
          </div>

          <div className="p-4 rounded-xl bg-[#1a1c1f] border border-[#3b494c]/40 flex flex-col gap-2">
            <span className="material-symbols-outlined text-[#00e5ff] text-2xl">assignment_return</span>
            <h4 className="font-space font-bold text-sm text-[#e2e2e6]">30-Day RMA Returns</h4>
            <p className="text-xs text-[#bac9cc]">
              Zero questions asked. Instant prepaid return labels issued.
            </p>
            <span className="mt-2 text-xs text-[#00e5ff] font-space font-bold">
              100% Full Refund Guarantee
            </span>
          </div>

          <div className="p-4 rounded-xl bg-[#1a1c1f] border border-[#3b494c]/40 flex flex-col gap-2">
            <span className="material-symbols-outlined text-[#00e5ff] text-2xl">chat</span>
            <h4 className="font-space font-bold text-sm text-[#e2e2e6]">Egypt, GCC &amp; Global Desk</h4>
            <p className="text-xs text-[#bac9cc]">
              خدمة العملاء باللغة العربية والإنجليزية على مدار الساعة لمصر والخليج.
            </p>
            <span className="mt-2 text-xs text-[#00e5ff] font-space font-bold">
              WhatsApp: +20 100 VEXORA / +971 4 800
            </span>
          </div>
        </div>

        {/* Ticket Submission Form */}
        <div className="bg-[#1a1c1f] rounded-2xl border border-[#3b494c]/40 p-6 lg:p-8 shadow-2xl">
          <h3 className="font-space font-bold text-xl text-[#e2e2e6] mb-1">
            Open a Priority Support Ticket
          </h3>
          <p className="text-xs text-[#bac9cc] mb-6">
            Our hardware engineers will review your request and get back immediately.
          </p>

          {ticketSubmitted ? (
            <div className="p-6 rounded-xl bg-[#00e5ff]/10 border border-[#00e5ff] text-center flex flex-col items-center gap-2">
              <span className="material-symbols-outlined text-[#00e5ff] text-4xl">check_circle</span>
              <h4 className="font-space font-bold text-lg text-[#e2e2e6]">
                Ticket #VX-TK{Math.floor(1000 + Math.random() * 9000)} Created
              </h4>
              <p className="text-xs text-[#bac9cc] max-w-sm">
                We have notified our on-call concierge team. You will receive an instant update on your email shortly.
              </p>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="flex flex-col gap-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-space uppercase text-[#bac9cc] mb-1">
                    Your Name
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. Alex Robinson"
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    className="w-full bg-[#11151b] border border-[#3b494c] rounded-lg px-3.5 py-2.5 text-xs text-[#e2e2e6] focus:outline-none focus:border-[#00e5ff]"
                  />
                </div>
                <div>
                  <label className="block text-xs font-space uppercase text-[#bac9cc] mb-1">
                    Email Address
                  </label>
                  <input
                    type="email"
                    required
                    placeholder="e.g. alex@example.com"
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    className="w-full bg-[#11151b] border border-[#3b494c] rounded-lg px-3.5 py-2.5 text-xs text-[#e2e2e6] focus:outline-none focus:border-[#00e5ff]"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-space uppercase text-[#bac9cc] mb-1">
                    Order ID (Optional)
                  </label>
                  <input
                    type="text"
                    placeholder="e.g. VX-84920"
                    value={formData.orderId}
                    onChange={(e) => setFormData({ ...formData, orderId: e.target.value })}
                    className="w-full bg-[#11151b] border border-[#3b494c] rounded-lg px-3.5 py-2.5 text-xs text-[#e2e2e6] font-mono-tabular focus:outline-none focus:border-[#00e5ff]"
                  />
                </div>
                <div>
                  <label className="block text-xs font-space uppercase text-[#bac9cc] mb-1">
                    Inquiry Type
                  </label>
                  <select
                    value={formData.category}
                    onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                    className="w-full bg-[#11151b] border border-[#3b494c] rounded-lg px-3.5 py-2.5 text-xs text-[#e2e2e6] focus:outline-none focus:border-[#00e5ff]"
                  >
                    <option value="Order Dispatch Tracking">Order Dispatch &amp; Tracking</option>
                    <option value="Return / 30-Day Money Back">Return / 30-Day Money Back</option>
                    <option value="Hardware Specs Inquiry">Hardware Specs &amp; Compatibility</option>
                    <option value="Egypt & GCC Delivery / Cash on Delivery">Egypt &amp; GCC Delivery / Cash on Delivery (مصر والخليج)</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-xs font-space uppercase text-[#bac9cc] mb-1">
                  How can we help you?
                </label>
                <textarea
                  required
                  rows={4}
                  placeholder="Detail your question, order issue, or feedback..."
                  value={formData.message}
                  onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                  className="w-full bg-[#11151b] border border-[#3b494c] rounded-lg px-3.5 py-2.5 text-xs text-[#e2e2e6] focus:outline-none focus:border-[#00e5ff]"
                />
              </div>

              <button
                type="submit"
                className="w-full sm:w-auto px-8 py-3.5 rounded-xl bg-[#00e5ff] text-[#001f24] font-space font-extrabold text-xs uppercase tracking-wider hover:bg-[#9cf0ff] transition-all cursor-pointer shadow-lg mt-2"
              >
                Send Priority Inquiry
              </button>
            </form>
          )}
        </div>
      </div>
    </div>
  );
};
