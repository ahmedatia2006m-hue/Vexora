import React, { useState } from 'react';
import { CurrencyConfig, Product } from '../types';
import { DROPSHIPPING_WINNERS, formatPrice } from '../data/products';

interface WinnersGridProps {
  currency: CurrencyConfig;
  onAddToCart: (product: Product) => void;
  onSelectProduct: (product: Product) => void;
  wishlist: string[];
  onToggleWishlist: (productId: string) => void;
}

export const WinnersGrid: React.FC<WinnersGridProps> = ({
  currency,
  onAddToCart,
  onSelectProduct,
  wishlist,
  onToggleWishlist,
}) => {

  return (
    <section className="w-full bg-[#111317] py-12 lg:py-16">
      <div className="max-w-7xl mx-auto px-4 lg:px-12 flex flex-col gap-8">
        {/* Section Header */}
        <div className="flex flex-col sm:flex-row items-start sm:items-end justify-between gap-3">
          <div>
            <div className="flex items-center gap-1.5 text-[#00e5ff] font-space text-xs uppercase font-bold tracking-wider mb-1">
              <span className="material-symbols-outlined text-[16px]">hotel_class</span>
              Top Viral Engineering
            </div>
            <h2 className="font-space font-bold text-2xl lg:text-3xl text-[#e2e2e6] tracking-tight">
              Trending Dropshipping Winners
            </h2>
            <p className="text-sm text-[#bac9cc] mt-1 max-w-2xl leading-relaxed">
              Verified best-performing gadgets going viral on social feeds. Hand-picked for durability and instant utility.
            </p>
          </div>

          <div className="flex items-center gap-2">
            <span className="font-space text-[11px] text-[#bac9cc] uppercase bg-[#1e2023] border border-[#3b494c]/40 px-3 py-1.5 rounded-lg flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-[#00e5ff] animate-ping" />
              Updated 12 Mins Ago
            </span>
          </div>
        </div>

        {/* 4 Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {DROPSHIPPING_WINNERS.map((product) => {
            const isFavorite = wishlist.includes(product.id);
            return (
              <div
                key={product.id}
                onClick={() => onSelectProduct(product)}
                className="group bg-[#1a1c1f] rounded-2xl overflow-hidden flex flex-col border border-[#3b494c]/30 hover:border-[#00e5ff]/60 shadow-lg hover:shadow-[0_0_24px_rgba(0,229,255,0.18)] transition-all duration-300 cursor-pointer"
              >
                {/* Product Image Area */}
                <div className="relative w-full aspect-square bg-[#1e2023] overflow-hidden">
                  {/* Badges on Top-Left */}
                  <div className="absolute top-3 left-3 z-10 flex flex-col gap-1">
                    {product.badges.map((badge, bIdx) => (
                      <span
                        key={bIdx}
                        className={`px-2 py-0.5 rounded font-space text-[10px] font-bold uppercase shadow tracking-wider ${
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

                {/* Content Area */}
                <div className="p-4 flex flex-col flex-1 justify-between gap-4">
                  <div>
                    {/* Rating & Stock */}
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

                    {/* Title */}
                    <h3 className="font-space font-bold text-base text-[#e2e2e6] mt-2 line-clamp-2 group-hover:text-[#00e5ff] transition-colors leading-snug">
                      {product.name}
                    </h3>

                    {/* Subtitle / Description */}
                    <p className="text-xs text-[#bac9cc] mt-1.5 line-clamp-2 leading-relaxed">
                      {product.description}
                    </p>
                  </div>

                  {/* Price & CTA */}
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
      </div>
    </section>
  );
};
