import React, { useState, useRef, useEffect } from 'react';
import { CurrencyCode, CurrencyConfig, Product } from '../types';
import { ALL_PRODUCTS, CURRENCIES, formatPrice } from '../data/products';

interface HeaderProps {
  currentCurrency: CurrencyCode;
  onCurrencyChange: (currency: CurrencyCode) => void;
  activeTab: string;
  onTabChange: (tab: string) => void;
  cartCount: number;
  savedCount: number;
  onOpenCart: () => void;
  onSelectProduct: (product: Product) => void;
  onOpenTrackOrder: () => void;
  onOpenSupport: () => void;
}

export const Header: React.FC<HeaderProps> = ({
  currentCurrency,
  onCurrencyChange,
  activeTab,
  onTabChange,
  cartCount,
  savedCount,
  onOpenCart,
  onSelectProduct,
  onOpenTrackOrder,
  onOpenSupport,
}) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [isAccountOpen, setIsAccountOpen] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const searchRef = useRef<HTMLDivElement>(null);
  const accountRef = useRef<HTMLDivElement>(null);

  const filteredProducts = searchQuery.trim()
    ? ALL_PRODUCTS.filter(
        (p) =>
          p.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
          p.tagline.toLowerCase().includes(searchQuery.toLowerCase()) ||
          p.category.toLowerCase().includes(searchQuery.toLowerCase())
      )
    : [];

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (searchRef.current && !searchRef.current.contains(e.target as Node)) {
        setIsSearchOpen(false);
      }
      if (accountRef.current && !accountRef.current.contains(e.target as Node)) {
        setIsAccountOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  return (
    <header className="fixed top-0 left-0 w-full z-50">
      {/* Top Urgency / Info Bar */}
      <div className="bg-[#0c0e11] text-[#bac9cc] px-4 lg:px-12 py-1.5 flex items-center justify-between text-xs border-b border-[#282a2d]/40">
        <div className="flex items-center gap-1.5">
          <span className="material-symbols-outlined text-[#00e5ff] text-[15px]">local_shipping</span>
          <span className="font-space tracking-wider uppercase text-[#e2e2e6] font-semibold text-[11px] sm:text-xs">
            Free Express Worldwide Shipping on Orders Over 3,500 ج.م ($75)
          </span>
        </div>
        <div className="hidden sm:flex items-center gap-5">
          <div className="flex items-center gap-1.5 font-space text-[11px] uppercase tracking-wide">
            <span className="text-[#00e5ff] animate-pulse">●</span>
            <span>24/7 Global Dispatch</span>
          </div>
          <div className="flex items-center gap-1 text-[11px] text-[#bac9cc]">
            <span className="material-symbols-outlined text-[15px]">language</span>
            <select
              aria-label="Select Currency"
              value={currentCurrency}
              onChange={(e) => onCurrencyChange(e.target.value as CurrencyCode)}
              className="bg-transparent text-[#e2e2e6] font-space text-[11px] font-semibold focus:outline-none cursor-pointer uppercase py-0.5"
            >
              <option className="bg-[#1e2023] text-[#e2e2e6]" value="EGP">EGP (ج.م)</option>
              <option className="bg-[#1e2023] text-[#e2e2e6]" value="USD">USD ($)</option>
              <option className="bg-[#1e2023] text-[#e2e2e6]" value="SAR">SAR (﷼)</option>
              <option className="bg-[#1e2023] text-[#e2e2e6]" value="AED">AED (د.إ)</option>
              <option className="bg-[#1e2023] text-[#e2e2e6]" value="EUR">EUR (€)</option>
            </select>
          </div>
        </div>
      </div>

      {/* Main Navigation Bar */}
      <div className="bg-[#111317]/95 backdrop-blur-xl border-b border-[#282a2d]/50">
        <div className="max-w-7xl mx-auto px-4 lg:px-12 h-20 flex items-center justify-between gap-4">
          {/* Logo & Brand */}
          <div
            onClick={() => onTabChange('trending')}
            className="flex items-center gap-3 cursor-pointer group"
          >
            <img
              alt="Vexora Brand Emblem"
              className="h-8 w-auto object-contain transition-transform group-hover:scale-105"
              src="https://lh3.googleusercontent.com/aida/AEtjO1WuOb2QTN_heGnq_KcvcZRl1AtbIwQyyCh-Uj4k4wIRLwYS-UdrCbEN0DcOvqcmZc-fcvyl5fvpzN3Sk6OhPXlepWcJAMeCenoPKNK1nXdj3V9Xc2z7Zyhsj3U_FcKKxuZ9KZEtgEtzkBukjKoWHRorJZAmy7TQUTkD1lxZbE8XQ8ysAGVqIrFWE3ObhgIbvMJ50vWOUMWmSx5XyEjDH-WNhlxLGvMq3z8SrNaYLa7-FQ0WJTdwRmAJdiwF08KiWEF9poW0rPO3K_Q"
            />
            <span className="font-space font-bold text-2xl text-[#e2e2e6] tracking-tight uppercase group-hover:text-[#00e5ff] transition-colors">
              VEXORA
            </span>
          </div>

          {/* Search Bar */}
          <div ref={searchRef} className="hidden md:flex flex-1 max-w-md mx-4 relative">
            <div className="w-full flex items-center bg-[#1a1c1f] px-3.5 py-2 rounded-xl border border-[#3b494c]/40 focus-within:border-[#00e5ff] transition-colors">
              <span className="material-symbols-outlined text-[#849396] text-[18px] mr-2">search</span>
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => {
                  setSearchQuery(e.target.value);
                  setIsSearchOpen(true);
                }}
                onFocus={() => setIsSearchOpen(true)}
                placeholder="Search ultra-engineered gadgets..."
                className="w-full bg-transparent text-[#e2e2e6] placeholder-[#849396] text-sm focus:outline-none"
              />
              {searchQuery && (
                <button
                  onClick={() => setSearchQuery('')}
                  className="text-[#849396] hover:text-[#e2e2e6] text-xs p-1"
                >
                  ✕
                </button>
              )}
            </div>

            {/* Live Search Results Dropdown */}
            {isSearchOpen && searchQuery.trim().length > 0 && (
              <div className="absolute top-full left-0 right-0 mt-2 bg-[#1e2023] border border-[#3b494c] rounded-xl shadow-2xl p-2 z-50 max-h-96 overflow-y-auto">
                {filteredProducts.length === 0 ? (
                  <div className="p-4 text-center text-sm text-[#849396]">
                    No hardware found for "{searchQuery}".
                  </div>
                ) : (
                  <div className="flex flex-col gap-1">
                    {filteredProducts.map((product) => (
                      <div
                        key={product.id}
                        onClick={() => {
                          onSelectProduct(product);
                          setIsSearchOpen(false);
                          setSearchQuery('');
                        }}
                        className="flex items-center gap-3 p-2 rounded-lg hover:bg-[#282a2d] cursor-pointer transition-colors"
                      >
                        <img
                          src={product.image}
                          alt={product.name}
                          className="w-12 h-12 rounded object-cover bg-[#0c0e11]"
                        />
                        <div className="flex-1 min-w-0">
                          <p className="text-sm font-space font-semibold text-[#e2e2e6] truncate">
                            {product.name}
                          </p>
                          <p className="text-xs text-[#00e5ff] font-medium">
                            {formatPrice(product.price, CURRENCIES[currentCurrency])}
                            <span className="text-[#849396] line-through ml-2 text-[11px]">
                              {formatPrice(product.originalPrice, CURRENCIES[currentCurrency])}
                            </span>
                          </p>
                        </div>
                        <span className="text-[10px] uppercase font-bold tracking-wider px-2 py-0.5 rounded bg-[#00e5ff]/10 text-[#00e5ff]">
                          View
                        </span>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            )}
          </div>

          {/* Right Controls */}
          <div className="flex items-center gap-3.5">
            {/* Mobile Currency selector */}
            <div className="sm:hidden flex items-center">
              <select
                aria-label="Select Currency"
                value={currentCurrency}
                onChange={(e) => onCurrencyChange(e.target.value as CurrencyCode)}
                className="bg-[#1a1c1f] text-[#e2e2e6] font-space text-xs font-semibold px-2 py-1 rounded border border-[#3b494c] focus:outline-none cursor-pointer uppercase"
              >
                <option value="EGP">EGP</option>
                <option value="USD">USD</option>
                <option value="SAR">SAR</option>
                <option value="AED">AED</option>
                <option value="EUR">EUR</option>
              </select>
            </div>

            {/* Saved / Wishlist Button */}
            <button
              onClick={() => onTabChange('saved')}
              aria-label="Saved Gadgets"
              className={`relative p-2.5 rounded-lg border transition-all cursor-pointer group ${
                activeTab === 'saved'
                  ? 'bg-[#00e5ff]/15 border-[#00e5ff] text-[#00e5ff]'
                  : 'bg-[#1a1c1f] hover:bg-[#282a2d] border-[#3b494c]/40 text-[#bac9cc] hover:text-[#ff3b56]'
              }`}
              title="Saved for Later (Wishlist)"
            >
              <span
                className={`material-symbols-outlined text-[22px] transition-transform group-hover:scale-110 ${
                  savedCount > 0 ? 'text-[#ff3b56]' : ''
                }`}
                style={savedCount > 0 ? { fontVariationSettings: "'FILL' 1" } : {}}
              >
                favorite
              </span>
              {savedCount > 0 && (
                <span className="absolute -top-1 -right-1 w-5 h-5 bg-[#ff3b56] text-white font-space text-[11px] rounded-full flex items-center justify-center font-bold shadow-[0_0_10px_rgba(255,59,86,0.6)]">
                  {savedCount}
                </span>
              )}
            </button>

            {/* Cart Button */}
            <button
              onClick={onOpenCart}
              aria-label="Shopping Cart"
              className="relative p-2.5 rounded-lg bg-[#1a1c1f] hover:bg-[#282a2d] border border-[#3b494c]/40 text-[#bac9cc] hover:text-[#00e5ff] transition-all cursor-pointer group"
            >
              <span className="material-symbols-outlined text-[22px]">shopping_bag</span>
              {cartCount > 0 && (
                <span className="absolute -top-1 -right-1 w-5 h-5 bg-[#00e5ff] text-[#001f24] font-space text-[11px] rounded-full flex items-center justify-center font-bold shadow-[0_0_10px_rgba(0,229,255,0.6)]">
                  {cartCount}
                </span>
              )}
            </button>

            {/* Profile Avatar & Popover */}
            <div ref={accountRef} className="relative">
              <button
                onClick={() => setIsAccountOpen(!isAccountOpen)}
                className="w-9 h-9 rounded-full bg-[#c3f5ff] hover:bg-[#00e5ff] text-[#00363d] flex items-center justify-center transition-all shadow-md cursor-pointer"
                title="Account & Orders"
              >
                <span className="material-symbols-outlined text-[20px]">person</span>
              </button>

              {isAccountOpen && (
                <div className="absolute right-0 mt-2 w-64 bg-[#1e2023] border border-[#3b494c] rounded-xl shadow-2xl p-3 z-50">
                  <div className="p-2 border-b border-[#3b494c]/50">
                    <p className="font-space font-bold text-sm text-[#e2e2e6]">Cyber VIP Portal</p>
                    <p className="text-xs text-[#849396]">Priority Dispatch Active</p>
                  </div>
                  <div className="py-2 flex flex-col gap-1 text-xs">
                    <button
                      onClick={() => {
                        onOpenTrackOrder();
                        setIsAccountOpen(false);
                      }}
                      className="w-full text-left px-2 py-2 rounded hover:bg-[#282a2d] text-[#e2e2e6] flex items-center gap-2"
                    >
                      <span className="material-symbols-outlined text-[18px] text-[#00e5ff]">local_shipping</span>
                      Track Active Orders
                    </button>
                    <button
                      onClick={() => {
                        onOpenSupport();
                        setIsAccountOpen(false);
                      }}
                      className="w-full text-left px-2 py-2 rounded hover:bg-[#282a2d] text-[#e2e2e6] flex items-center gap-2"
                    >
                      <span className="material-symbols-outlined text-[18px] text-[#00e5ff]">support_agent</span>
                      Concierge Support
                    </button>
                  </div>
                  <div className="pt-2 border-t border-[#3b494c]/50 text-[11px] text-[#849396] flex items-center justify-between">
                    <span>Warranty: 24 Months</span>
                    <span className="text-[#00e5ff] font-bold">100% Protected</span>
                  </div>
                </div>
              )}
            </div>

            {/* Mobile Hamburger */}
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="md:hidden p-2 text-[#bac9cc] hover:text-[#e2e2e6]"
              aria-label="Toggle Navigation"
            >
              <span className="material-symbols-outlined text-[24px]">
                {isMobileMenuOpen ? 'close' : 'menu'}
              </span>
            </button>
          </div>
        </div>

        {/* Secondary Category / Navigation Bar (Desktop) */}
        <div className="hidden md:block bg-[#0c0e11]/80 border-t border-[#282a2d]/40">
          <div className="max-w-7xl mx-auto px-4 lg:px-12">
            <nav className="flex items-center gap-6 py-2.5">
              <button
                onClick={() => onTabChange('trending')}
                className={`font-space text-sm tracking-wide transition-all py-1 px-3 rounded-md cursor-pointer ${
                  activeTab === 'trending'
                    ? 'bg-[#39485a] text-[#c3f5ff] font-bold shadow-[0_0_12px_rgba(0,229,255,0.2)]'
                    : 'text-[#bac9cc] hover:text-[#e2e2e6]'
                }`}
              >
                Trending Tech
              </button>
              <button
                onClick={() => onTabChange('smart-gadgets')}
                className={`font-space text-sm tracking-wide transition-all py-1 px-3 rounded-md cursor-pointer ${
                  activeTab === 'smart-gadgets'
                    ? 'bg-[#39485a] text-[#c3f5ff] font-bold'
                    : 'text-[#bac9cc] hover:text-[#e2e2e6]'
                }`}
              >
                Smart Gadgets
              </button>
              <button
                onClick={() => onTabChange('best-sellers')}
                className={`font-space text-sm tracking-wide transition-all py-1 px-3 rounded-md cursor-pointer ${
                  activeTab === 'best-sellers'
                    ? 'bg-[#39485a] text-[#c3f5ff] font-bold'
                    : 'text-[#bac9cc] hover:text-[#e2e2e6]'
                }`}
              >
                Best Sellers
              </button>
              <button
                onClick={() => onTabChange('saved')}
                className={`font-space text-sm tracking-wide transition-all py-1 px-3 rounded-md cursor-pointer flex items-center gap-1.5 ${
                  activeTab === 'saved'
                    ? 'bg-[#39485a] text-[#c3f5ff] font-bold shadow-[0_0_12px_rgba(0,229,255,0.2)]'
                    : 'text-[#bac9cc] hover:text-[#e2e2e6]'
                }`}
              >
                <span
                  className="material-symbols-outlined text-[16px] text-[#ff3b56]"
                  style={savedCount > 0 ? { fontVariationSettings: "'FILL' 1" } : {}}
                >
                  favorite
                </span>
                <span>Saved {savedCount > 0 ? `(${savedCount})` : ''}</span>
              </button>
              <button
                onClick={() => {
                  onTabChange('track-order');
                  onOpenTrackOrder();
                }}
                className={`font-space text-sm tracking-wide transition-all py-1 px-3 rounded-md cursor-pointer ${
                  activeTab === 'track-order'
                    ? 'bg-[#39485a] text-[#c3f5ff] font-bold'
                    : 'text-[#bac9cc] hover:text-[#e2e2e6]'
                }`}
              >
                Track Order
              </button>
              <button
                onClick={() => {
                  onTabChange('support');
                  onOpenSupport();
                }}
                className={`font-space text-sm tracking-wide transition-all py-1 px-3 rounded-md cursor-pointer ${
                  activeTab === 'support'
                    ? 'bg-[#39485a] text-[#c3f5ff] font-bold'
                    : 'text-[#bac9cc] hover:text-[#e2e2e6]'
                }`}
              >
                Support
              </button>
            </nav>
          </div>
        </div>

        {/* Mobile Nav Drawer */}
        {isMobileMenuOpen && (
          <div className="md:hidden bg-[#111317] border-t border-[#282a2d] px-4 py-4 flex flex-col gap-3">
            <div className="w-full flex items-center bg-[#1a1c1f] px-3 py-2 rounded-lg border border-[#3b494c]">
              <span className="material-symbols-outlined text-[#849396] text-[18px] mr-2">search</span>
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search gadgets..."
                className="w-full bg-transparent text-[#e2e2e6] text-sm focus:outline-none"
              />
            </div>
            <button
              onClick={() => {
                onTabChange('trending');
                setIsMobileMenuOpen(false);
              }}
              className="text-left font-space py-2 text-sm text-[#e2e2e6]"
            >
              Trending Tech
            </button>
            <button
              onClick={() => {
                onTabChange('smart-gadgets');
                setIsMobileMenuOpen(false);
              }}
              className="text-left font-space py-2 text-sm text-[#e2e2e6]"
            >
              Smart Gadgets
            </button>
            <button
              onClick={() => {
                onTabChange('best-sellers');
                setIsMobileMenuOpen(false);
              }}
              className="text-left font-space py-2 text-sm text-[#e2e2e6]"
            >
              Best Sellers
            </button>
            <button
              onClick={() => {
                onTabChange('saved');
                setIsMobileMenuOpen(false);
              }}
              className="text-left font-space py-2 text-sm text-[#e2e2e6] flex items-center justify-between"
            >
              <span className="flex items-center gap-2">
                <span className="material-symbols-outlined text-[18px] text-[#ff3b56]" style={savedCount > 0 ? { fontVariationSettings: "'FILL' 1" } : {}}>
                  favorite
                </span>
                Saved Wishlist
              </span>
              {savedCount > 0 && (
                <span className="px-2 py-0.5 rounded-full bg-[#ff3b56] text-white text-[10px] font-bold">
                  {savedCount}
                </span>
              )}
            </button>
            <button
              onClick={() => {
                onTabChange('track-order');
                onOpenTrackOrder();
                setIsMobileMenuOpen(false);
              }}
              className="text-left font-space py-2 text-sm text-[#e2e2e6]"
            >
              Track Order
            </button>
            <button
              onClick={() => {
                onTabChange('support');
                onOpenSupport();
                setIsMobileMenuOpen(false);
              }}
              className="text-left font-space py-2 text-sm text-[#e2e2e6]"
            >
              Support & Concierge
            </button>
          </div>
        )}
      </div>
    </header>
  );
};
