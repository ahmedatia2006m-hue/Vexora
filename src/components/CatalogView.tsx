import React, { useState } from 'react';
import { CurrencyConfig, Product } from '../types';
import { ALL_PRODUCTS, formatPrice } from '../data/products';

interface CatalogViewProps {
  viewType: 'smart-gadgets' | 'best-sellers' | 'saved';
  currency: CurrencyConfig;
  onAddToCart: (product: Product) => void;
  onSelectProduct: (product: Product) => void;
  onBackToHome: () => void;
  wishlist: string[];
  onToggleWishlist: (productId: string) => void;
}

export const CatalogView: React.FC<CatalogViewProps> = ({
  viewType,
  currency,
  onAddToCart,
  onSelectProduct,
  onBackToHome,
  wishlist,
  onToggleWishlist,
}) => {
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [sortBy, setSortBy] = useState<'trending' | 'price-low' | 'price-high' | 'rating'>('trending');
  const [searchFilter, setSearchFilter] = useState('');

  let filtered = ALL_PRODUCTS.filter((item) => {
    if (viewType === 'saved' && !wishlist.includes(item.id)) {
      return false;
    }
    const matchesCat =
      selectedCategory === 'all' || item.category === selectedCategory;
    const matchesSearch =
      item.name.toLowerCase().includes(searchFilter.toLowerCase()) ||
      item.tagline.toLowerCase().includes(searchFilter.toLowerCase());
    return matchesCat && matchesSearch;
  });

  if (viewType === 'best-sellers') {
    filtered = [...filtered].sort((a, b) => b.reviewsCount - a.reviewsCount);
  } else if (sortBy === 'price-low') {
    filtered = [...filtered].sort((a, b) => a.price - b.price);
  } else if (sortBy === 'price-high') {
    filtered = [...filtered].sort((a, b) => b.price - a.price);
  } else if (sortBy === 'rating') {
    filtered = [...filtered].sort((a, b) => b.rating - a.rating);
  }

  const categories = [
    { id: 'all', label: 'All Engineered Devices' },
    { id: 'projection', label: 'Atmospheric Lasers' },
    { id: 'wearable', label: 'Biometric Wearables' },
    { id: 'charging', label: 'MagSafe Power' },
    { id: 'cleaning', label: 'Cyclone Detailing' },
    { id: 'mount', label: 'Vacuum Adsorption' },
  ];

  return (
    <div className="w-full bg-[#111317] py-10 lg:py-16 min-h-[80vh]">
      <div className="max-w-7xl mx-auto px-4 lg:px-12 flex flex-col gap-8">
        {/* Header */}
        <div className="flex flex-col sm:flex-row items-start sm:items-end justify-between gap-4">
          <div>
            <div className="flex items-center gap-2 text-[#00e5ff] font-space text-xs uppercase font-bold tracking-wider mb-1">
              <span className={`material-symbols-outlined text-[16px] ${viewType === 'saved' ? 'text-[#ff3b56]' : ''}`}>
                {viewType === 'saved' ? 'favorite' : viewType === 'best-sellers' ? 'hotel_class' : 'devices'}
              </span>
              {viewType === 'saved'
                ? 'Your Saved Wishlist'
                : viewType === 'best-sellers'
                ? 'Global Sales Leaderboard'
                : 'Full Catalog Matrix'}
            </div>
            <h1 className="font-space font-bold text-2xl lg:text-3xl text-[#e2e2e6] tracking-tight">
              {viewType === 'saved'
                ? `Saved Hardware (${wishlist.length} Items)`
                : viewType === 'best-sellers'
                ? 'Viral Best Sellers of 2025'
                : 'Ultra-Engineered Smart Hardware'}
            </h1>
            <p className="text-sm text-[#bac9cc] mt-1 max-w-xl">
              {viewType === 'saved'
                ? 'Your curated collection of premium gadgets saved for later. Ready for express air dispatch.'
                : viewType === 'best-sellers'
                ? 'Ranked by verified global orders, social engagement, and customer satisfaction index.'
                : 'Explore our complete array of zero-latency lifestyle technology and precision tools.'}
            </p>
          </div>

          <button
            onClick={onBackToHome}
            className="px-4 py-2 rounded-xl bg-[#1e2023] hover:bg-[#282a2d] text-xs font-space font-bold uppercase text-[#bac9cc] hover:text-[#e2e2e6] border border-[#3b494c]/40 cursor-pointer"
          >
            ← Back to Featured
          </button>
        </div>

        {/* Filter Controls Bar */}
        <div className="flex flex-col md:flex-row items-stretch md:items-center justify-between gap-4 bg-[#1a1c1f] p-4 rounded-2xl border border-[#3b494c]/40">
          {/* Categories Tab Pill Strip */}
          <div className="flex items-center gap-1.5 overflow-x-auto pb-1 md:pb-0 scrollbar-none">
            {categories.map((cat) => (
              <button
                key={cat.id}
                type="button"
                onClick={() => setSelectedCategory(cat.id)}
                className={`px-3 py-1.5 rounded-lg text-xs font-space font-semibold uppercase whitespace-nowrap transition-all cursor-pointer ${
                  selectedCategory === cat.id
                    ? 'bg-[#00e5ff] text-[#001f24] font-bold shadow-[0_0_12px_rgba(0,229,255,0.3)]'
                    : 'bg-[#11151b] text-[#bac9cc] hover:text-[#e2e2e6] border border-[#3b494c]/30'
                }`}
              >
                {cat.label}
              </button>
            ))}
          </div>

          {/* Search & Sort */}
          <div className="flex items-center gap-3">
            <div className="relative flex-1 md:w-56">
              <span className="material-symbols-outlined absolute left-2.5 top-2 text-[#849396] text-[16px]">
                search
              </span>
              <input
                type="text"
                placeholder="Search catalog..."
                value={searchFilter}
                onChange={(e) => setSearchFilter(e.target.value)}
                className="w-full bg-[#11151b] border border-[#3b494c] rounded-lg pl-8 pr-2.5 py-1.5 text-xs text-[#e2e2e6] focus:border-[#00e5ff] focus:outline-none"
              />
            </div>

            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value as any)}
              className="bg-[#11151b] border border-[#3b494c] rounded-lg px-2.5 py-1.5 text-xs text-[#e2e2e6] font-space font-semibold focus:outline-none cursor-pointer"
            >
              <option value="trending">Sort: Viral Trending</option>
              <option value="rating">Sort: Highest Rated</option>
              <option value="price-low">Price: Low to High</option>
              <option value="price-high">Price: High to Low</option>
            </select>
          </div>
        </div>

        {/* Product Cards Grid */}
        {filtered.length === 0 ? (
          <div className="py-16 px-6 bg-[#181e27] border border-[#3b494c]/40 rounded-2xl flex flex-col items-center justify-center text-center gap-4">
            <div className="w-16 h-16 rounded-full bg-[#ff3b56]/15 text-[#ff3b56] flex items-center justify-center">
              <span className="material-symbols-outlined text-3xl">favorite_border</span>
            </div>
            <div>
              <h3 className="font-space font-bold text-lg text-[#e2e2e6]">
                {viewType === 'saved' ? 'No Saved Items Yet' : 'No Devices Found'}
              </h3>
              <p className="text-xs text-[#849396] max-w-md mt-1">
                {viewType === 'saved'
                  ? 'Click the heart icon on any product card across the store to save it here for later.'
                  : 'Try adjusting your search query or selecting a different category filter.'}
              </p>
            </div>
            <button
              onClick={onBackToHome}
              className="mt-2 px-5 py-2.5 rounded-xl bg-[#00e5ff] text-[#001f24] font-space font-bold text-xs uppercase tracking-wider hover:bg-[#9cf0ff] transition-all cursor-pointer"
            >
              Discover Viral Tech
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {filtered.map((product) => {
            const isFavorite = wishlist.includes(product.id);
            return (
              <div
                key={product.id}
                onClick={() => onSelectProduct(product)}
                className="group bg-[#1a1c1f] rounded-2xl overflow-hidden flex flex-col border border-[#3b494c]/30 hover:border-[#00e5ff]/60 shadow-lg hover:shadow-[0_0_24px_rgba(0,229,255,0.18)] transition-all duration-300 cursor-pointer"
              >
                <div className="relative w-full aspect-square bg-[#1e2023] overflow-hidden">
                  <div className="absolute top-3 left-3 z-10 flex flex-col gap-1">
                    {product.badges.map((badge, bIdx) => (
                      <span
                        key={bIdx}
                        className={`px-2 py-0.5 rounded font-space text-[10px] font-bold uppercase shadow ${
                          bIdx === 0
                            ? 'bg-[#00e5ff] text-[#001f24]'
                            : 'bg-[#333538] text-[#c3f5ff] border border-[#00e5ff]/20'
                        }`}
                      >
                        {badge}
                      </span>
                    ))}
                  </div>

                  {/* Wishlist Heart on Top-Right */}
                  <div className="absolute top-3 right-3 z-10">
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        onToggleWishlist(product.id);
                      }}
                      className="w-8 h-8 rounded-full bg-[#111317]/80 backdrop-blur-md flex items-center justify-center text-[#e2e2e6] hover:text-[#ff3b56] transition-colors cursor-pointer"
                      title={isFavorite ? 'Remove from Wishlist' : 'Add to Wishlist'}
                    >
                      <span
                        className={`material-symbols-outlined text-[18px] transition-transform ${
                          isFavorite ? 'text-[#ff3b56] scale-110' : ''
                        }`}
                        style={isFavorite ? { fontVariationSettings: "'FILL' 1" } : {}}
                      >
                        favorite
                      </span>
                    </button>
                  </div>

                  <img
                    src={product.image}
                    alt={product.name}
                    className="w-full h-full object-cover transform group-hover:scale-105 transition-transform duration-500 ease-out"
                  />
                </div>

              <div className="p-4 flex flex-col flex-1 justify-between gap-4">
                <div>
                  <div className="flex items-center justify-between text-xs text-[#bac9cc]">
                    <div className="flex items-center text-[#00e5ff]">
                      <span
                        className="material-symbols-outlined text-[16px]"
                        style={{ fontVariationSettings: "'FILL' 1" }}
                      >
                        star
                      </span>
                      <span className="font-space font-bold ml-1 text-[#e2e2e6]">
                        {product.rating}
                      </span>
                      <span className="ml-1 text-[#849396]">({product.reviewsCount})</span>
                    </div>
                    <span className="text-[#00e5ff] font-space text-[11px] font-semibold">
                      {product.stockLocation || 'In Stock'}
                    </span>
                  </div>

                  <h3 className="font-space font-bold text-base text-[#e2e2e6] mt-2 line-clamp-2 group-hover:text-[#00e5ff] transition-colors leading-snug">
                    {product.name}
                  </h3>

                  <p className="text-xs text-[#bac9cc] mt-1.5 line-clamp-2 leading-relaxed">
                    {product.description}
                  </p>
                </div>

                <div>
                  <div className="flex items-baseline gap-2">
                    <span className="font-space font-bold text-xl text-[#00e5ff]">
                      {formatPrice(product.price, currency)}
                    </span>
                    <span className="text-xs text-[#849396] line-through font-space">
                      {formatPrice(product.originalPrice, currency)}
                    </span>
                    <span className="font-space text-[10px] text-[#ffb4ab] font-bold ml-auto bg-[#ff3b56]/15 px-1.5 py-0.5 rounded">
                      {product.discountPct}% OFF
                    </span>
                  </div>

                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      onAddToCart(product);
                    }}
                    className="w-full mt-3 py-2.5 px-3 rounded-lg bg-[#282a2d] group-hover:bg-[#00e5ff] group-hover:text-[#001f24] text-[#e2e2e6] font-space text-xs uppercase font-bold tracking-wider transition-all flex items-center justify-center gap-1.5 cursor-pointer shadow-sm"
                  >
                    <span className="material-symbols-outlined text-[18px]">
                      add_shopping_cart
                    </span>
                    Claim 50% Off
                  </button>
                </div>
              </div>
            </div>
          );
        })}
        </div>
        )}
      </div>
    </div>
  );
};
