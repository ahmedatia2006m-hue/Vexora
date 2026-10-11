import React from 'react';

interface PolicyModalProps {
  title: string | null;
  onClose: () => void;
}

export const PolicyModal: React.FC<PolicyModalProps> = ({ title, onClose }) => {
  if (!title) return null;

  const contentMap: Record<string, { subtitle: string; body: string[] }> = {
    'Privacy Policy': {
      subtitle: 'Bank-Grade 256-Bit Data Encryption Standards',
      body: [
        'Vexora Technologies adheres to strict zero-knowledge transmission protocols. Customer shipping addresses and financial telemetry are processed exclusively through PCI-DSS Level 1 compliant secure gateways.',
        'We never sell, rent, or lease your biometric or personal information to third-party data brokers or marketing aggregators.',
        'All communications sent via SMS or email are strictly dedicated to order tracking numbers, delivery dispatch updates, and requested support inquiries.',
      ],
    },
    'Terms of Service': {
      subtitle: 'Global Warranty & Hardware Operating Agreement',
      body: [
        'By claiming products on the Vexora network, customers receive our comprehensive 24-Month Hardware Guarantee covering optical laser diodes, brushless vacuum motors, and wireless inductive coils.',
        'Orders are dispatched on the same business day for all requests confirmed before 16:00 UTC.',
        'Vexora reserves rights to limit promotional allocations per household to prevent wholesale gray-market arbitrage.',
      ],
    },
    'Shipping Policy': {
      subtitle: 'Guaranteed 24-Hour Express Logistics Hub Dispatch',
      body: [
        'All items are stocked and shipped directly from our primary air cargo distribution centers in Frankfurt, Dubai, Houston, and Hong Kong.',
        'Air Express orders qualify for 5 to 9 business day global transit with real-time waypoint radar tracking provided straight to SMS.',
        'Cash on Delivery (الدفع عند الاستلام) is fully supported across Egypt (جمهورية مصر العربية) and GCC territories (Saudi Arabia, UAE, Kuwait, Qatar) with no hidden import tariffs.',
      ],
    },
    'Refund & Returns': {
      subtitle: '30-Day Zero-Risk Trial Guarantee',
      body: [
        'If your Vexora gadget does not meet your highest expectations, you have 30 calendar days from parcel delivery to request a hassle-free RMA return.',
        'Upon contacting our 24/7 concierge support desk, a prepaid international return shipping label is automatically generated.',
        'Full refunds are credited back to the original payment method or refunded in cash upon return courier verification.',
      ],
    },
  };

  const details = contentMap[title] || {
    subtitle: 'Vexora Official Policy',
    body: ['Official documentation for Vexora global commerce operations.'],
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md">
      <div className="bg-[#181e27] border border-[#3b494c] rounded-2xl max-w-lg w-full p-6 shadow-2xl relative text-[#e2e2e6]">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-[#849396] hover:text-[#e2e2e6] text-sm p-1.5 rounded-lg hover:bg-[#282a2d] transition-colors cursor-pointer"
        >
          ✕
        </button>

        <span className="font-space text-[11px] uppercase tracking-wider text-[#00e5ff] font-bold">
          Legal &amp; Customer Trust
        </span>
        <h3 className="font-space font-bold text-2xl text-[#e2e2e6] mt-1">{title}</h3>
        <p className="text-xs text-[#849396] font-space mt-0.5">{details.subtitle}</p>

        <div className="mt-4 flex flex-col gap-3 text-xs text-[#bac9cc] leading-relaxed">
          {details.body.map((para, idx) => (
            <p key={idx}>{para}</p>
          ))}
        </div>

        <button
          onClick={onClose}
          className="mt-6 w-full py-3 rounded-xl bg-[#282a2d] hover:bg-[#333538] text-[#e2e2e6] font-space text-xs font-bold uppercase tracking-wider border border-[#3b494c] transition-all cursor-pointer"
        >
          Acknowledge &amp; Close
        </button>
      </div>
    </div>
  );
};
