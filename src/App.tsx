import React, { useState } from 'react';
import { CurrencyCode, Product, CartItem, Order } from './types';
import {
  HERO_PRODUCT,
  DROPSHIPPING_WINNERS,
  CURRENCIES,
  SAMPLE_ORDERS,
} from './data/products';
import { Header } from './components/Header';
import { HeroShowcase } from './components/HeroShowcase';
import { TrustStrip } from './components/TrustStrip';
import { WinnersGrid } from './components/WinnersGrid';
import { CustomerReviews } from './components/CustomerReviews';
import { FaqSection } from './components/FaqSection';
import { FinalCta } from './components/FinalCta';
import { Footer } from './components/Footer';
import { CartDrawer } from './components/CartDrawer';
import { CheckoutModal } from './components/CheckoutModal';
import { ProductDetailModal } from './components/ProductDetailModal';
import { TrackOrderScreen } from './components/TrackOrderScreen';
import { SupportScreen } from './components/SupportScreen';
import { CatalogView } from './components/CatalogView';
import { VideoDemoModal } from './components/VideoDemoModal';
import { PolicyModal } from './components/PolicyModal';
import { EngineeringComparison } from './components/EngineeringComparison';
import { BundleSaver } from './components/BundleSaver';
import { SocialReelsStrip } from './components/SocialReelsStrip';
import { LogisticsRadar } from './components/LogisticsRadar';
import { StickyBuyBar } from './components/StickyBuyBar';
import { LiveSalesTicker } from './components/LiveSalesTicker';

export default function App() {
  const [currency, setCurrency] = useState<CurrencyCode>('EGP');
  const [activeTab, setActiveTab] = useState<string>('trending');

  // Initial cart items (badge shows 3 in the screenshot)
  const [cartItems, setCartItems] = useState<CartItem[]>([
    {
      product: HERO_PRODUCT,
      quantity: 1,
      selectedColor: 'Gunmetal Titanium',
    },
    {
      product: DROPSHIPPING_WINNERS[0],
      quantity: 1,
      selectedColor: 'Titanium Slate',
      selectedSize: 'US 10',
    },
    {
      product: DROPSHIPPING_WINNERS[2],
      quantity: 1,
      selectedColor: 'Dark Graphite',
    },
  ]);

  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isCheckoutOpen, setIsCheckoutOpen] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [isVideoDemoOpen, setIsVideoDemoOpen] = useState(false);
  const [selectedPolicy, setSelectedPolicy] = useState<string | null>(null);
  const [appliedDiscount, setAppliedDiscount] = useState<number>(0);
  const [orders, setOrders] = useState<Order[]>(SAMPLE_ORDERS);
  const [trackingOrderId, setTrackingOrderId] = useState<string | undefined>('VX-71029');
  const [notification, setNotification] = useState<string | null>(null);
  const [wishlist, setWishlist] = useState<string[]>(['smart-ring-gen4', 'cyberglow-cube']);

  const handleToggleWishlist = (productId: string) => {
    setWishlist((prev) => {
      const exists = prev.includes(productId);
      if (exists) {
        showToast('تمت إزالة المنتج من قائمة الرغبات');
        return prev.filter((id) => id !== productId);
      } else {
        showToast('تم حفظ المنتج في المفضلة ❤️');
        return [...prev, productId];
      }
    });
  };

  const showToast = (msg: string) => {
    setNotification(msg);
    setTimeout(() => {
      setNotification((curr) => (curr === msg ? null : curr));
    }, 2800);
  };

  const handleAddToCart = (product: Product, color?: string, size?: string) => {
    setCartItems((prev) => {
      const existingIdx = prev.findIndex(
        (item) =>
          item.product.id === product.id &&
          item.selectedColor === color &&
          item.selectedSize === size
      );

      if (existingIdx > -1) {
        const updated = [...prev];
        updated[existingIdx].quantity += 1;
        return updated;
      }
      return [
        ...prev,
        {
          product,
          quantity: 1,
          selectedColor: color || product.variants?.[0]?.options[0],
          selectedSize: size,
        },
      ];
    });

    showToast(`Claimed 50% discount on ${product.name}!`);
    setIsCartOpen(true);
  };

  const handleInstantBuy = (product: Product, color?: string, size?: string) => {
    handleAddToCart(product, color, size);
    setIsCartOpen(false);
    setIsCheckoutOpen(true);
  };

  const handleUpdateQuantity = (productId: string, quantity: number) => {
    if (quantity <= 0) {
      handleRemoveItem(productId);
      return;
    }
    setCartItems((prev) =>
      prev.map((item) =>
        item.product.id === productId ? { ...item, quantity } : item
      )
    );
  };

  const handleRemoveItem = (productId: string) => {
    setCartItems((prev) => prev.filter((item) => item.product.id !== productId));
  };

  const handleSelectBundle = (bundleType: 'solo' | 'duo' | 'trio') => {
    if (bundleType === 'solo') {
      handleAddToCart(HERO_PRODUCT);
    } else if (bundleType === 'duo') {
      setCartItems((prev) => [
        ...prev,
        { product: HERO_PRODUCT, quantity: 2, selectedColor: 'Gunmetal Titanium' },
      ]);
      showToast('تمت إضافة باقة 2x CyberGlow Cubes بخصم 58% وشحن جوي مجاني!');
      setIsCartOpen(true);
    } else if (bundleType === 'trio') {
      setCartItems((prev) => [
        ...prev,
        { product: HERO_PRODUCT, quantity: 3, selectedColor: 'Gunmetal Titanium' },
        { product: DROPSHIPPING_WINNERS[3], quantity: 1, selectedColor: 'Matte Gunmetal' },
      ]);
      showToast('تمت إضافة الباقة التنفيذية (3x Cubes + حامل هاتف مجاني) بخصم 64%!');
      setIsCartOpen(true);
    }
  };

  const handleApplyPromo = (code: string): boolean => {
    const upper = code.trim().toUpperCase();
    if (upper === 'CYBER50') {
      setAppliedDiscount(20); // Extra 20% off entire order
      showToast('VIP Voucher CYBER50 applied (-20%)!');
      return true;
    }
    if (upper === 'GCCVIP') {
      setAppliedDiscount(15);
      showToast('GCC VIP Voucher applied (-15%)!');
      return true;
    }
    if (upper === 'SHIPFREE') {
      setAppliedDiscount(10);
      showToast('Free Express Air upgrade unlocked!');
      return true;
    }
    return false;
  };

  const handleOrderSuccess = (newOrder: Order) => {
    setOrders([newOrder, ...orders]);
    setCartItems([]);
    setTrackingOrderId(newOrder.id);
    showToast(`Order #${newOrder.id} confirmed and air cargo dispatched!`);
  };

  const totalCartCount = cartItems.reduce((acc, item) => acc + item.quantity, 0);

  return (
    <div className="min-h-screen bg-[#111317] text-[#e2e2e6] flex flex-col font-inter">
      {/* Toast Notification */}
      {notification && (
        <div className="fixed bottom-6 right-6 z-50 bg-[#1e2023] border border-[#00e5ff] text-[#e2e2e6] px-4 py-3 rounded-xl shadow-[0_0_24px_rgba(0,229,255,0.4)] flex items-center gap-3 animate-bounce">
          <span className="material-symbols-outlined text-[#00e5ff] text-[20px]">
            task_alt
          </span>
          <span className="font-space text-xs font-bold">{notification}</span>
        </div>
      )}

      {/* Main Header */}
      <Header
        currentCurrency={currency}
        onCurrencyChange={setCurrency}
        activeTab={activeTab}
        onTabChange={(tab) => {
          setActiveTab(tab);
          window.scrollTo({ top: 0, behavior: 'smooth' });
        }}
        cartCount={totalCartCount}
        savedCount={wishlist.length}
        onOpenCart={() => setIsCartOpen(true)}
        onSelectProduct={(prod) => setSelectedProduct(prod)}
        onOpenTrackOrder={() => {
          setActiveTab('track-order');
          window.scrollTo({ top: 0, behavior: 'smooth' });
        }}
        onOpenSupport={() => {
          setActiveTab('support');
          window.scrollTo({ top: 0, behavior: 'smooth' });
        }}
      />

      {/* Main Body Routing */}
      <main className="w-full pt-20 bg-[#111317] flex-1">
        {activeTab === 'trending' && (
          <div className="flex flex-col w-full">
            {/* Hero Section */}
            <HeroShowcase
              currency={CURRENCIES[currency]}
              onAddToCart={handleAddToCart}
              onInstantBuy={handleInstantBuy}
              onOpenVideoDemo={() => setIsVideoDemoOpen(true)}
            />

            {/* 4-Column Trust Strip */}
            <TrustStrip />

            {/* Dropshipping Winners Grid */}
            <WinnersGrid
              currency={CURRENCIES[currency]}
              onAddToCart={handleAddToCart}
              onSelectProduct={(p) => setSelectedProduct(p)}
              wishlist={wishlist}
              onToggleWishlist={handleToggleWishlist}
            />

            {/* Volume Bundle & Save Selector */}
            <BundleSaver
              currency={CURRENCIES[currency]}
              onSelectBundle={handleSelectBundle}
            />

            {/* Social Feeds & Video Reels */}
            <SocialReelsStrip
              onSelectProduct={(p) => setSelectedProduct(p)}
              onAddToCart={handleAddToCart}
            />

            {/* Engineering Precision Teardown Matrix */}
            <EngineeringComparison />

            {/* Live Regional Logistics Radar */}
            <LogisticsRadar />

            {/* Verified Customer Unboxings */}
            <CustomerReviews />

            {/* FAQ Accordion */}
            <FaqSection />

            {/* Final Conversion CTA */}
            <FinalCta
              onShopNow={() => {
                setActiveTab('smart-gadgets');
                window.scrollTo({ top: 0, behavior: 'smooth' });
              }}
              onTrackOrder={() => {
                setActiveTab('track-order');
                window.scrollTo({ top: 0, behavior: 'smooth' });
              }}
            />
          </div>
        )}

        {(activeTab === 'smart-gadgets' || activeTab === 'best-sellers' || activeTab === 'saved') && (
          <CatalogView
            viewType={activeTab as 'smart-gadgets' | 'best-sellers' | 'saved'}
            currency={CURRENCIES[currency]}
            onAddToCart={handleAddToCart}
            onSelectProduct={(p) => setSelectedProduct(p)}
            wishlist={wishlist}
            onToggleWishlist={handleToggleWishlist}
            onBackToHome={() => {
              setActiveTab('trending');
              window.scrollTo({ top: 0, behavior: 'smooth' });
            }}
          />
        )}

        {activeTab === 'track-order' && (
          <TrackOrderScreen
            orders={orders}
            currency={CURRENCIES[currency]}
            initialOrderId={trackingOrderId}
            onBackToHome={() => {
              setActiveTab('trending');
              window.scrollTo({ top: 0, behavior: 'smooth' });
            }}
          />
        )}

        {activeTab === 'support' && (
          <SupportScreen
            onBackToHome={() => {
              setActiveTab('trending');
              window.scrollTo({ top: 0, behavior: 'smooth' });
            }}
            onOpenTrackOrder={() => {
              setActiveTab('track-order');
              window.scrollTo({ top: 0, behavior: 'smooth' });
            }}
          />
        )}
      </main>

      {/* Footer */}
      <Footer
        onOpenTrackOrder={() => {
          setActiveTab('track-order');
          window.scrollTo({ top: 0, behavior: 'smooth' });
        }}
        onOpenSupport={() => {
          setActiveTab('support');
          window.scrollTo({ top: 0, behavior: 'smooth' });
        }}
        onOpenPolicy={(title) => setSelectedPolicy(title)}
      />

      {/* Slide-over Cart Drawer */}
      <CartDrawer
        isOpen={isCartOpen}
        onClose={() => setIsCartOpen(false)}
        items={cartItems}
        onUpdateQuantity={handleUpdateQuantity}
        onRemoveItem={handleRemoveItem}
        onProceedToCheckout={() => {
          setIsCartOpen(false);
          setIsCheckoutOpen(true);
        }}
        currency={CURRENCIES[currency]}
        appliedDiscount={appliedDiscount}
        onApplyPromo={handleApplyPromo}
      />

      {/* Checkout Modal */}
      <CheckoutModal
        isOpen={isCheckoutOpen}
        onClose={() => setIsCheckoutOpen(false)}
        items={cartItems}
        currency={CURRENCIES[currency]}
        discountPct={appliedDiscount}
        onOrderSuccess={handleOrderSuccess}
      />

      {/* Product Detail Modal */}
      <ProductDetailModal
        product={selectedProduct}
        onClose={() => setSelectedProduct(null)}
        currency={CURRENCIES[currency]}
        onAddToCart={handleAddToCart}
        onInstantBuy={handleInstantBuy}
      />

      {/* Video Demo Simulator Modal */}
      <VideoDemoModal
        isOpen={isVideoDemoOpen}
        onClose={() => setIsVideoDemoOpen(false)}
        currency={CURRENCIES[currency]}
        onOrderNow={(prod) => {
          handleInstantBuy(prod);
        }}
      />

      {/* Policy and Trust Modal */}
      <PolicyModal
        title={selectedPolicy}
        onClose={() => setSelectedPolicy(null)}
      />

      {/* Floating Sticky Buy Bar (Appears on scroll) */}
      <StickyBuyBar
        currency={CURRENCIES[currency]}
        onInstantBuy={handleInstantBuy}
      />

      {/* Real-time Sales Ticker Notification */}
      <LiveSalesTicker
        currency={CURRENCIES[currency]}
        onSelectProductById={(id) => {
          const found = [HERO_PRODUCT, ...DROPSHIPPING_WINNERS].find((p) => p.id === id);
          if (found) setSelectedProduct(found);
        }}
      />
    </div>
  );
}
