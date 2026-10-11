import React, { useState } from 'react';
import { CartItem, CurrencyConfig } from '../types';
import { formatPrice } from '../data/products';

interface CartDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  items: CartItem[];
  onUpdateQuantity: (productId: string, quantity: number) => void;
  onRemoveItem: (productId: string) => void;
  onProceedToCheckout: () => void;
  currency: CurrencyConfig;
  appliedDiscount: number;
  onApplyPromo: (code: string) => boolean;
}

export const CartDrawer: React.FC<CartDrawerProps> = ({
  isOpen,
  onClose,
  items,
  onUpdateQuantity,
  onRemoveItem,
  onProceedToCheckout,
  currency,
  appliedDiscount,
  onApplyPromo,
}) => {
  const [promoCode, setPromoCode] = useState('');
  const [promoError, setPromoError] = useState('');
  const [promoSuccess, setPromoSuccess] = useState('');

  if (!isOpen) return null;

  const rawSubtotal = items.reduce(
    (acc, item) => acc + item.product.price * item.quantity,
    0
  );

  const discountAmount = appliedDiscount > 0 ? (rawSubtotal * appliedDiscount) / 100 : 0;
  const subtotalAfterDiscount = Math.max(0, rawSubtotal - discountAmount);

  // Free shipping over $75
  const freeShippingThreshold = 75.0;
  const needsForFreeShipping = Math.max(0, freeShippingThreshold - rawSubtotal);
  const shippingCost = rawSubtotal >= freeShippingThreshold || rawSubtotal === 0 ? 0 : 9.99;
  const total = subtotalAfterDiscount + shippingCost;

  const handlePromoSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!promoCode.trim()) return;
    const success = onApplyPromo(promoCode.trim());
    if (success) {
      setPromoSuccess(`Code ${promoCode.toUpperCase()} applied!`);
      setPromoError('');
    } else {
      setPromoError('Invalid promo code. Try CYBER50 or GCCVIP');
      setPromoSuccess('');
    }
  };

  return (
    <div className="fixed inset-0 z-50 overflow-hidden">
      {/* Backdrop */}
      <div
        onClick={onClose}
        className="absolute inset-0 bg-black/75 backdrop-blur-sm transition-opacity"
      />

      {/* Drawer */}
      <div className="absolute inset-y-0 right-0 max-w-full flex pl-10">
        <div className="w-screen max-w-md bg-[#181e27] border-l border-[#3b494c]/50 text-[#e2e2e6] flex flex-col shadow-2xl">
          {/* Header */}
          <div className="p-5 border-b border-[#3b494c]/40 flex items-center justify-between bg-[#11151b]">
            <div className="flex items-center gap-2">
              <span className="material-symbols-outlined text-[#00e5ff] text-[24px]">shopping_bag</span>
              <h2 className="font-space font-bold text-lg uppercase tracking-tight text-[#e2e2e6]">
                Cyber Cart ({items.reduce((sum, item) => sum + item.quantity, 0)})
              </h2>
            </div>
            <button
              onClick={onClose}
              className="p-1.5 rounded-lg text-[#849396] hover:text-[#e2e2e6] hover:bg-[#282a2d] transition-colors"
            >
              ✕
            </button>
          </div>

          {/* Free Shipping Progress */}
          <div className="bg-[#111317] p-3.5 border-b border-[#3b494c]/30">
            {needsForFreeShipping > 0 ? (
              <div>
                <p className="text-xs text-[#bac9cc] flex items-center justify-between">
                  <span>
                    Add{' '}
                    <strong className="text-[#00e5ff] font-space font-bold">
                      {formatPrice(needsForFreeShipping, currency)}
                    </strong>{' '}
                    for Free Air Express
                  </span>
                  <span className="font-space font-bold text-[11px] text-[#00e5ff]">
                    {Math.round((rawSubtotal / freeShippingThreshold) * 100)}%
                  </span>
                </p>
                <div className="w-full bg-[#282a2d] h-1.5 rounded-full mt-2 overflow-hidden">
                  <div
                    className="bg-[#00e5ff] h-full transition-all duration-300"
                    style={{
                      width: `${Math.min(100, (rawSubtotal / freeShippingThreshold) * 100)}%`,
                    }}
                  />
                </div>
              </div>
            ) : (
              <div className="flex items-center gap-2 text-xs text-[#00e5ff] font-space font-bold">
                <span className="material-symbols-outlined text-[18px]">verified</span>
                <span>You qualify for FREE Worldwide Express Air Shipping!</span>
              </div>
            )}
          </div>

          {/* Cart Item List */}
          <div className="flex-1 overflow-y-auto p-5 flex flex-col gap-4">
            {items.length === 0 ? (
              <div className="flex flex-col items-center justify-center h-full text-center py-12">
                <span className="material-symbols-outlined text-[#3b494c] text-6xl">shopping_cart_off</span>
                <p className="font-space font-bold text-lg text-[#e2e2e6] mt-4">Your cart is empty</p>
                <p className="text-xs text-[#849396] mt-1 max-w-xs">
                  Claim high-velocity gadgets with 50% early bird launch discounts.
                </p>
                <button
                  onClick={onClose}
                  className="mt-6 px-6 py-2.5 rounded-xl bg-[#00e5ff] text-[#001f24] font-space text-xs uppercase font-extrabold tracking-wider"
                >
                  Explore Viral Drops
                </button>
              </div>
            ) : (
              items.map((item) => (
                <div
                  key={`${item.product.id}-${item.selectedColor || ''}-${item.selectedSize || ''}`}
                  className="flex gap-3.5 p-3 rounded-xl bg-[#11151b] border border-[#3b494c]/30 relative group"
                >
                  <img
                    src={item.product.image}
                    alt={item.product.name}
                    className="w-20 h-20 rounded-lg object-cover bg-[#090b0e] shrink-0"
                  />
                  <div className="flex-1 flex flex-col justify-between">
                    <div>
                      <div className="flex items-start justify-between pr-4">
                        <h4 className="font-space font-semibold text-xs text-[#e2e2e6] line-clamp-1">
                          {item.product.name}
                        </h4>
                        <button
                          onClick={() => onRemoveItem(item.product.id)}
                          className="text-[#849396] hover:text-[#ff3b56] text-xs transition-colors p-0.5"
                          title="Remove item"
                        >
                          ✕
                        </button>
                      </div>
                      {(item.selectedColor || item.selectedSize) && (
                        <p className="text-[11px] text-[#849396] mt-0.5">
                          {item.selectedColor} {item.selectedSize ? `• Size ${item.selectedSize}` : ''}
                        </p>
                      )}
                    </div>

                    <div className="flex items-center justify-between mt-2">
                      <div className="flex items-center border border-[#3b494c] rounded-lg bg-[#181e27]">
                        <button
                          onClick={() => onUpdateQuantity(item.product.id, item.quantity - 1)}
                          className="px-2 py-0.5 text-[#bac9cc] hover:text-[#00e5ff] text-xs font-bold"
                        >
                          -
                        </button>
                        <span className="px-2 text-xs font-mono-tabular font-bold text-[#e2e2e6]">
                          {item.quantity}
                        </span>
                        <button
                          onClick={() => onUpdateQuantity(item.product.id, item.quantity + 1)}
                          className="px-2 py-0.5 text-[#bac9cc] hover:text-[#00e5ff] text-xs font-bold"
                        >
                          +
                        </button>
                      </div>

                      <div className="text-right">
                        <p className="font-space font-bold text-sm text-[#00e5ff]">
                          {formatPrice(item.product.price * item.quantity, currency)}
                        </p>
                        <p className="text-[10px] text-[#849396] line-through">
                          {formatPrice(item.product.originalPrice * item.quantity, currency)}
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              ))
            )}
          </div>

          {/* Footer & Checkout Trigger */}
          {items.length > 0 && (
            <div className="p-5 border-t border-[#3b494c]/40 bg-[#11151b] flex flex-col gap-3">
              {/* Promo Code Form */}
              <form onSubmit={handlePromoSubmit} className="flex gap-2">
                <input
                  type="text"
                  placeholder="Voucher code (try CYBER50)"
                  value={promoCode}
                  onChange={(e) => setPromoCode(e.target.value)}
                  className="flex-1 bg-[#181e27] border border-[#3b494c]/60 rounded-lg px-3 py-1.5 text-xs text-[#e2e2e6] placeholder-[#849396] uppercase font-space focus:outline-none focus:border-[#00e5ff]"
                />
                <button
                  type="submit"
                  className="px-3 py-1.5 bg-[#282a2d] hover:bg-[#333538] text-xs font-space font-bold uppercase rounded-lg text-[#00e5ff] border border-[#00e5ff]/30 cursor-pointer"
                >
                  Apply
                </button>
              </form>
              {promoSuccess && <p className="text-[11px] text-[#00e5ff] font-bold">{promoSuccess}</p>}
              {promoError && <p className="text-[11px] text-[#ffb4ab]">{promoError}</p>}

              {/* Cost Breakdown */}
              <div className="flex flex-col gap-1.5 text-xs text-[#bac9cc] pt-1">
                <div className="flex justify-between">
                  <span>Subtotal</span>
                  <span className="font-space text-[#e2e2e6]">
                    {formatPrice(rawSubtotal, currency)}
                  </span>
                </div>
                {appliedDiscount > 0 && (
                  <div className="flex justify-between text-[#00e5ff]">
                    <span>Launch Discount ({appliedDiscount}%)</span>
                    <span className="font-space">
                      -{formatPrice(discountAmount, currency)}
                    </span>
                  </div>
                )}
                <div className="flex justify-between">
                  <span>Global Express Shipping</span>
                  <span className="font-space text-[#e2e2e6]">
                    {shippingCost === 0 ? (
                      <span className="text-[#00e5ff] font-bold">FREE</span>
                    ) : (
                      formatPrice(shippingCost, currency)
                    )}
                  </span>
                </div>
                <div className="flex justify-between text-sm font-bold text-[#e2e2e6] pt-2 border-t border-[#3b494c]/30">
                  <span className="font-space uppercase">Total</span>
                  <span className="font-space text-base text-[#00e5ff]">
                    {formatPrice(total, currency)}
                  </span>
                </div>
              </div>

              {/* Checkout Button */}
              <button
                onClick={onProceedToCheckout}
                className="w-full mt-2 py-4 rounded-xl bg-[#00e5ff] hover:bg-[#9cf0ff] text-[#001f24] font-space text-sm uppercase tracking-wider font-extrabold shadow-[0_0_24px_rgba(0,229,255,0.4)] transition-all cursor-pointer flex items-center justify-center gap-2"
              >
                <span className="material-symbols-outlined text-[20px]">lock</span>
                Proceed to Checkout
              </button>

              <div className="flex flex-wrap items-center justify-center gap-2 text-[10px] text-[#849396] font-space pt-1">
                <span className="text-[#4da6ff] font-bold">فيزا (Visa)</span>
                <span>•</span>
                <span className="text-[#ff4d4d] font-bold">فودافون كاش</span>
                <span>•</span>
                <span className="text-[#ff9933] font-bold">أورنج كاش</span>
                <span>•</span>
                <span>الدفع عند الاستلام</span>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
