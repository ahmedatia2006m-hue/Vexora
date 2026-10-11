import React from 'react';
import { CurrencyConfig, Product } from '../types';
import { formatPrice } from '../data/products';

interface SavedScreenProps {
  savedProducts: Product[];
  currency: CurrencyConfig;
  onAddToCart: (product: Product) => void;
  onSelectProduct: (product: Product) => void;
  onRemoveFromWishlist: (productId: string) => void;
  onAddAllToCart: () => void;
  onClearWishlist: () => void;
  onBackToHome: () => void;
}

export const SavedScreen: React.FC<SavedScreenProps> = ({
  savedProducts,
  currency,
  onAddToCart,
  onSelectProduct,
  onRemoveFromWishlist,
  onAddAllToCart,
  onClearWishlist,
  onBackToHome,
}) => {
  return (
    <div className="w-full bg-[#111317] py-10 lg:py-16 min-h-[80vh]">
      <div className="max-w-7xl mx-auto px-4 lg:px-12 flex flex-col gap-8">
        {/* Header */}
        <div className="flex flex-col sm:flex-row items-start sm:items-end justify-between gap-4 border-b border-[#282a2d]/50 pb-6">
          <div>
            <div className="flex items-center gap-2 text-[#ff3b56] font-space text-xs uppercase font-bold tracking-wider mb-1">
              <span className="material-symbols-outlined text-[16px]" style={{ fontVariationSettings: "'FILL' 1" }}>
                favorite
              </span>
              Your Saved Cyber Vault
            </div>
            <h1 className="font-space font-bold text-2xl lg:text-3xl text-[#e2e2e6] tracking-tight">
              Saved For Later ({savedProducts.length})
            </h1>
            <p className="text-sm text-[#bac9cc] mt-1 max-w-xl leading-relaxed">
              Reserved hardware configurations stored securely in your session. Claim before launch allocations sell out.
            </p>
          </div>

          <div className="flex items-center gap-3">
            {savedProducts.length > 0 && (
              <>
                <button
                  onClick={onAddAllToCart}
                  className="px-4 py-2 rounded-xl bg-[#00e5ff] hover:bg-[#9cf0ff] text-[#001f24] font-space text-xs font-bold uppercase tracking-wider transition-all cursor-pointer shadow-md flex items-center gap-1.5"
                >
                  <span className="material-symbols-outlined text-[16px]">add_shopping_cart</span>
                  Move All To Cart
                </button>
                <button
                  onClick={onClearWishlist}
                  className="px-3 py-2 rounded-xl bg-[#1e2023] hover:bg-[#282a2d] text-[#849396] hover:text-[#ff3b56] text-xs font-space font-bold transition-all border border-[#3b494c]/30 cursor-pointer"
                  title="Clear all saved items"
                >
                  Clear All
                </button>
              </>
            )}
            <button
              onClick={onBackToHome}
              className="px-4 py-2 rounded-xl bg-[#1e2023] hover:bg-[#282a2d] text-xs font-space font-bold uppercase text-[#bac9cc] hover:text-[#e2e2e6] border border-[#3b494c]/40 cursor-pointer"
            >
              ← Storefront
            </button>
          </div>
        </div>

        {/* Empty State */}
        {savedProducts.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-20 text-center bg-[#181e27] rounded-2xl border border-[#3b494c]/30 p-8 shadow-xl">
            <div className="w-20 h-20 rounded-full bg-[#11151b] border border-[#3b494c] flex items-center justify-center text-[#ff3b56] shadow-inner mb-4">
              <span className="material-symbols-outlined text-4xl">favorite_border</span>
            </div>
            <h3 className="font-space font-bold text-2xl text-[#e2e2e6]">
              Your Cyber Vault is Empty
            </h3>
            <p className="text-sm text-[#bac9cc] max-w-md mt-2 leading-relaxed">
              You haven't saved any hardware devices yet. Click the heart icon on any product to bookmark it for quick access and price tracking.
            </p>
            <button
              onClick={onBackToHome}
              className="mt-6 px-8 py-3.5 rounded-xl bg-[#00e5ff] text-[#001f24] font-space text-xs font-extrabold uppercase tracking-wider hover:bg-[#9cf0ff] shadow-lg transition-all cursor-pointer flex items-center gap-2"
            >
              <span className="material-symbols-outlined text-[18px]">explore</span>
              Discover Viral Gadgets
            </button>
          </div>
        ) : (
          /* Grid of Saved Items */
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {savedProducts.map((product) => (
              <div
                key={product.id}
                onClick={() => onSelectProduct(product)}
                className="group bg-[#181e27] rounded-2xl overflow-hidden flex flex-col border border-[#3b494c]/40 hover:border-[#00e5ff]/60 shadow-xl hover:shadow-[0_0_24px_rgba(0,229,255,0.2)] transition-all duration-300 cursor-pointer relative"
              >
                {/* Media */}
                <div className="relative w-full aspect-square bg-[#11151b] overflow-hidden">
                  {/* Badges */}
                  <div className="absolute top-3 left-3 z-10 flex flex-col gap-1">
                    {product.badges.map((badge, idx) => (
                      <span
                        key={idx}
                        className="px-2 py-0.5 rounded font-space text-[10px] font-bold uppercase shadow bg-[#00e5ff] text-[#001f24]"
                      >
                        {badge}
                      </span>
                    ))}
                  </div>

                  {/* Remove from Wishlist Heart Button */}
                  <div className="absolute top-3 right-3 z-10">
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        onRemoveFromWishlist(product.id);
                      }}
                      className="w-8 h-8 rounded-full bg-[#111317]/80 backdrop-blur-md flex items-center justify-center text-[#ff3b56] hover:bg-[#ff3b56] hover:text-white transition-all cursor-pointer shadow-md"
                      title="Remove from saved"
                    >
                      <span
                        className="material-symbols-outlined text-[18px]"
                        style={{ fontVariationSettings: "'FILL' 1" }}
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

                {/* Info & Buy Action */}
                <div className="p-4 flex flex-col flex-1 justify-between gap-3">
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
                      <span className="text-[#00f0a8] font-space text-[11px] font-semibold">
                        ● Stock: {product.stockLeft} Units Left
                      </span>
                    </div>

                    <h3 className="font-space font-bold text-base text-[#e2e2e6] mt-2 line-clamp-1 group-hover:text-[#00e5ff] transition-colors">
                      {product.name}
                    </h3>
                    <p className="text-xs text-[#bac9cc] mt-1 line-clamp-2 leading-relaxed">
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
                      <span className="font-space text-[10px] text-[#ffb4ab] font-bold ml-auto bg-[#ff3b56]/20 px-1.5 py-0.5 rounded">
                        {product.discountPct}% OFF
                      </span>
                    </div>

                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        onAddToCart(product);
                      }}
                      className="w-full mt-3 py-2.5 px-3 rounded-xl bg-[#00e5ff] hover:bg-[#9cf0ff] text-[#001f24] font-space text-xs uppercase font-extrabold tracking-wider transition-all flex items-center justify-center gap-1.5 cursor-pointer shadow-md"
                    >
                      <span className="material-symbols-outlined text-[18px]">add_shopping_cart</span>
                      Claim &amp; Add To Cart
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};
