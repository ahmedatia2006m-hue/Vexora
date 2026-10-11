import React, { useState } from 'react';
import { CurrencyConfig, Order } from '../types';
import { SAMPLE_ORDERS, formatPrice } from '../data/products';

interface TrackOrderScreenProps {
  orders: Order[];
  currency: CurrencyConfig;
  initialOrderId?: string;
  onBackToHome: () => void;
}

export const TrackOrderScreen: React.FC<TrackOrderScreenProps> = ({
  orders,
  currency,
  initialOrderId,
  onBackToHome,
}) => {
  const allOrders = [...orders, ...SAMPLE_ORDERS];
  const [searchId, setSearchId] = useState(initialOrderId || 'VX-84920');
  const [selectedOrder, setSelectedOrder] = useState<Order | null>(
    allOrders.find(
      (o) => o.id.toLowerCase() === (initialOrderId || 'VX-84920').toLowerCase()
    ) || allOrders[0]
  );
  const [searchNotFound, setSearchNotFound] = useState(false);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    const query = searchId.trim().toLowerCase();
    const match = allOrders.find(
      (o) =>
        o.id.toLowerCase() === query ||
        o.trackingNumber.toLowerCase() === query ||
        o.email.toLowerCase() === query
    );

    if (match) {
      setSelectedOrder(match);
      setSearchNotFound(false);
    } else {
      setSearchNotFound(true);
    }
  };

  return (
    <div className="w-full bg-[#111317] py-10 lg:py-16 min-h-[80vh]">
      <div className="max-w-4xl mx-auto px-4 lg:px-12 flex flex-col gap-8">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div>
            <div className="flex items-center gap-2 text-[#00e5ff] font-space text-xs uppercase font-bold tracking-wider mb-1">
              <span className="material-symbols-outlined text-[16px]">local_shipping</span>
              Live Global Logistics Telemetry
            </div>
            <h1 className="font-space font-bold text-2xl lg:text-3xl text-[#e2e2e6] tracking-tight">
              Track Your Air Express Dispatch
            </h1>
            <p className="text-sm text-[#bac9cc] mt-1">
              Real-time radar tracking across Europe, USA, and GCC regional logistics nodes.
            </p>
          </div>

          <button
            onClick={onBackToHome}
            className="px-4 py-2 rounded-xl bg-[#1e2023] hover:bg-[#282a2d] text-xs font-space font-bold uppercase text-[#bac9cc] hover:text-[#e2e2e6] border border-[#3b494c]/40 cursor-pointer"
          >
            ← Storefront
          </button>
        </div>

        {/* Search Bar & Demo Pills */}
        <div className="bg-[#1a1c1f] p-5 rounded-2xl border border-[#3b494c]/40 shadow-xl">
          <form onSubmit={handleSearch} className="flex gap-2">
            <div className="flex-1 relative">
              <span className="material-symbols-outlined absolute left-3 top-2.5 text-[#849396] text-[18px]">
                search
              </span>
              <input
                type="text"
                value={searchId}
                onChange={(e) => setSearchId(e.target.value)}
                placeholder="Enter Order ID (e.g. VX-84920) or Tracking Number..."
                className="w-full bg-[#11151b] border border-[#3b494c] rounded-xl pl-9 pr-3 py-2.5 text-xs text-[#e2e2e6] placeholder-[#849396] font-mono-tabular focus:outline-none focus:border-[#00e5ff]"
              />
            </div>
            <button
              type="submit"
              className="px-6 py-2.5 rounded-xl bg-[#00e5ff] text-[#001f24] font-space text-xs font-extrabold uppercase tracking-wider hover:bg-[#9cf0ff] cursor-pointer"
            >
              Locate Parcel
            </button>
          </form>

          {/* Preset Demo Order Chips */}
          <div className="flex flex-wrap items-center gap-2 mt-3 pt-3 border-t border-[#3b494c]/20 text-xs text-[#849396]">
            <span>نماذج تتبع الشحنات المباشرة:</span>
            <button
              type="button"
              onClick={() => {
                setSearchId('VX-71029');
                const o = allOrders.find((x) => x.id === 'VX-71029') || allOrders[0];
                setSelectedOrder(o);
                setSearchNotFound(false);
              }}
              className="px-2.5 py-1 rounded bg-[#282a2d] hover:bg-[#333538] text-[#ff4d4d] font-mono-tabular text-[11px] font-bold border border-[#e60000]/30 cursor-pointer"
            >
              VX-71029 (القاهرة • فودافون كاش)
            </button>
            <button
              type="button"
              onClick={() => {
                setSearchId('VX-60481');
                const o = allOrders.find((x) => x.id === 'VX-60481') || allOrders[1];
                setSelectedOrder(o);
                setSearchNotFound(false);
              }}
              className="px-2.5 py-1 rounded bg-[#282a2d] hover:bg-[#333538] text-[#ff9933] font-mono-tabular text-[11px] font-bold border border-[#ff7900]/30 cursor-pointer"
            >
              VX-60481 (الإسكندرية • أورنج كاش)
            </button>
            <button
              type="button"
              onClick={() => {
                setSearchId('VX-84920');
                const o = allOrders.find((x) => x.id === 'VX-84920') || allOrders[2];
                setSelectedOrder(o);
                setSearchNotFound(false);
              }}
              className="px-2 py-0.5 rounded bg-[#282a2d] hover:bg-[#333538] text-[#00e5ff] font-mono-tabular text-[11px] cursor-pointer"
            >
              VX-84920 (Dubai Hub)
            </button>
            <button
              type="button"
              onClick={() => {
                setSearchId('VX-92041');
                const o = allOrders.find((x) => x.id === 'VX-92041') || allOrders[3];
                setSelectedOrder(o);
                setSearchNotFound(false);
              }}
              className="px-2 py-0.5 rounded bg-[#282a2d] hover:bg-[#333538] text-[#00e5ff] font-mono-tabular text-[11px] cursor-pointer"
            >
              VX-92041 (US Express)
            </button>
          </div>

          {searchNotFound && (
            <p className="text-xs text-[#ffb4ab] mt-2">
              No active shipment located with that ID. Try checking your confirmation email.
            </p>
          )}
        </div>

        {/* Order Details & Progress Stepper */}
        {selectedOrder && (
          <div className="bg-[#1a1c1f] rounded-2xl border border-[#3b494c]/40 p-6 lg:p-8 flex flex-col gap-6 shadow-2xl">
            {/* Top Bar of Order */}
            <div className="flex flex-wrap items-center justify-between gap-4 pb-6 border-b border-[#3b494c]/40">
              <div>
                <div className="flex items-center gap-2">
                  <span className="font-space font-bold text-xl text-[#e2e2e6]">
                    Order #{selectedOrder.id}
                  </span>
                  <span className="px-2.5 py-0.5 rounded-full bg-[#00e5ff]/20 text-[#00e5ff] font-space text-[11px] font-bold uppercase tracking-wider border border-[#00e5ff]/30">
                    {selectedOrder.status}
                  </span>
                </div>
                <p className="text-xs text-[#849396] mt-1 font-mono-tabular">
                  Waybill: {selectedOrder.trackingNumber} • Booked: {new Date(selectedOrder.createdAt).toLocaleDateString()}
                </p>
              </div>

              <div className="text-right">
                <span className="text-xs text-[#849396] block">Estimated Arrival</span>
                <span className="font-space font-bold text-sm text-[#00e5ff]">
                  {selectedOrder.estimatedDelivery}
                </span>
              </div>
            </div>

            {/* Carrier & Route Card */}
            <div className="grid grid-cols-1 sm:grid-cols-4 gap-3 bg-[#11151b] p-4 rounded-xl border border-[#3b494c]/30 text-xs">
              <div>
                <span className="text-[#849396] block text-[11px]">Primary Dispatch Carrier</span>
                <span className="font-space font-bold text-[#e2e2e6]">
                  {selectedOrder.country.includes('Egypt') ? 'Egypt Express Logistics / DHL' : 'Emirates SkyCargo / DHL Air'}
                </span>
              </div>
              <div>
                <span className="text-[#849396] block text-[11px]">طريقة الدفع المسدد بها</span>
                <span className="font-space font-bold text-[#e2e2e6] flex items-center gap-1 mt-0.5">
                  {selectedOrder.paymentMethod === 'vodafone_cash' && (
                    <span className="text-[#ff4d4d] font-bold">فودافون كاش (Vodafone)</span>
                  )}
                  {selectedOrder.paymentMethod === 'orange_cash' && (
                    <span className="text-[#ff9933] font-bold">أورنج كاش (Orange)</span>
                  )}
                  {selectedOrder.paymentMethod === 'visa' && (
                    <span className="text-[#4da6ff] font-bold">فيزا / كارت بنكي</span>
                  )}
                  {selectedOrder.paymentMethod === 'cod' && (
                    <span className="text-[#00e5ff] font-bold">عند الاستلام (COD)</span>
                  )}
                  {selectedOrder.paymentMethod === 'applepay' && (
                    <span className="text-[#e2e2e6] font-bold">Apple Pay</span>
                  )}
                </span>
              </div>
              <div>
                <span className="text-[#849396] block text-[11px]">Delivery Destination</span>
                <span className="font-space font-bold text-[#e2e2e6]">{selectedOrder.country}</span>
              </div>
              <div>
                <span className="text-[#849396] block text-[11px]">Recipient</span>
                <span className="font-space font-bold text-[#e2e2e6]">{selectedOrder.customerName}</span>
              </div>
            </div>

            {/* Visual Timeline Steps */}
            <div>
              <h3 className="font-space font-bold text-xs uppercase text-[#bac9cc] tracking-wider mb-4">
                Air Cargo Progression
              </h3>
              <div className="relative pl-6 flex flex-col gap-6 border-l-2 border-[#282a2d] ml-3">
                {selectedOrder.timeline.map((step, idx) => (
                  <div key={idx} className="relative">
                    {/* Step Icon Indicator */}
                    <div
                      className={`absolute -left-[31px] top-0 w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold ${
                        step.completed
                          ? 'bg-[#00e5ff] text-[#001f24] shadow-[0_0_12px_rgba(0,229,255,0.6)]'
                          : 'bg-[#282a2d] text-[#849396] border border-[#3b494c]'
                      }`}
                    >
                      {step.completed ? '✓' : idx + 1}
                    </div>

                    <div>
                      <div className="flex items-center gap-2">
                        <h4
                          className={`font-space font-bold text-sm ${
                            step.completed ? 'text-[#e2e2e6]' : 'text-[#849396]'
                          }`}
                        >
                          {step.title}
                        </h4>
                        <span className="font-mono-tabular text-[11px] text-[#00e5ff]">
                          {step.date}
                        </span>
                      </div>
                      <p className="text-xs text-[#bac9cc] mt-1 leading-relaxed">
                        {step.description}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Items Included */}
            <div className="pt-4 border-t border-[#3b494c]/30">
              <h3 className="font-space font-bold text-xs uppercase text-[#bac9cc] tracking-wider mb-3">
                Items in This Flight Manifest
              </h3>
              <div className="flex flex-col gap-2">
                {selectedOrder.items.map((item, idx) => (
                  <div
                    key={idx}
                    className="flex items-center justify-between p-3 rounded-xl bg-[#11151b] border border-[#3b494c]/20 text-xs"
                  >
                    <div className="flex items-center gap-3">
                      <img
                        src={item.product.image}
                        alt={item.product.name}
                        className="w-12 h-12 rounded object-cover bg-[#090b0e]"
                      />
                      <div>
                        <p className="font-space font-bold text-[#e2e2e6]">
                          {item.product.name}
                        </p>
                        <p className="text-[11px] text-[#849396]">
                          Qty: {item.quantity} {item.selectedColor ? `• ${item.selectedColor}` : ''}
                        </p>
                      </div>
                    </div>
                    <span className="font-space font-bold text-[#00e5ff]">
                      {formatPrice(item.product.price * item.quantity, currency)}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
