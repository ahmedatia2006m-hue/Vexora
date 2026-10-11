import React, { useState } from 'react';
import { Product } from '../types';
import { HERO_PRODUCT, DROPSHIPPING_WINNERS } from '../data/products';

interface SocialReelsStripProps {
  onSelectProduct: (product: Product) => void;
  onAddToCart: (product: Product) => void;
}

const REELS = [
  {
    id: 'reel-1',
    title: 'Transforming my Cairo apartment into a cyberpunk arcade at 2 AM',
    creator: '@cyber_spaces_eg',
    views: '3.8M',
    likes: '412K',
    product: HERO_PRODUCT,
    image:
      'https://lh3.googleusercontent.com/aida-public/AB6AXuC00BX8Saz8O0tyO0WWksyVYEukV67Xz6Pe5WG5RifW_PavKiJi_lVajfC_XOsOELlgEYiWQiIgKAJPsay3V4T-QIZtDVlV7IMWrQKylFiicKPa9wrE6pR2MHNKWAHyiajgQmYqBq3h9ghZk3owqPpwYzfdbxFJq6QnffXPwAh8xEe0hqTkAsAm40iMqNin0Ny_2BXi9HZp0pg4nQevqY4J1bVDUI_lDeKIZJFZyryVUfwXM-Px-3atNw',
  },
  {
    id: 'reel-2',
    title: 'Threw away my bulky fitness tracker for this titanium biometric ring',
    creator: '@tech_review_uae',
    views: '2.1M',
    likes: '198K',
    product: DROPSHIPPING_WINNERS[0],
    image:
      'https://lh3.googleusercontent.com/aida-public/AB6AXuDSw3yvA099HdfT1Jngl365DuNVVrIIJGL9NU2XczMZ9Jb1JejCHDPak2LYcS0gKSwE4ZViBUwZ7mIlaOdw1ewWoCjdlWVTdxEHHQU7iSCHDirL0GNjj1dejjVNma9tJcIiqZHpO-k0VO-soiTM1wo9EC51eMewliqjz5aXO6OdIuXex1MkX7cqXV2zhMuTjSfPn0sjs8xobLBhE5oi9F_kaw79Qv1SsiGtuDFh7f1No05uJV8nojaq-w',
  },
  {
    id: 'reel-3',
    title: 'My car console has never been cleaner. 15,000Pa pocket turbo test',
    creator: '@speed_detailer',
    views: '1.9M',
    likes: '280K',
    product: DROPSHIPPING_WINNERS[1],
    image:
      'https://lh3.googleusercontent.com/aida-public/AB6AXuDZ40eKAJEXo_dVuXLf4DSY4IstxxSdS-CQZU7-nlhPCigh4u576njs_wQbG6PohFn2m4HrD9wN3mMlPOkirVFvny0thGSaK_mq9jke5eZUqJLs7G9DSQdT9AoaTWAR_es5XTHYjleEcI_w97FUuSoCw_nBeVilQWeSCaqXQHKkEGWGgDvH1kN7A388ZWKyi0DFv8hNCH-K7d_-bpZE0KRu4T0yc6TRPbky7HnojOH3GMhInAFpKu4uEQ',
  },
  {
    id: 'reel-4',
    title: 'Stuck this vacuum phone mount on my mirror for gym recording',
    creator: '@fitness_gear_daily',
    views: '4.5M',
    likes: '590K',
    product: DROPSHIPPING_WINNERS[3],
    image:
      'https://lh3.googleusercontent.com/aida-public/AB6AXuBHwwjzypk8gfcderANc8mzxCmPbTeKIRESVSeJYmY9JONzcPB2U9J4Q9XBMHAnXm5GL5DAvp3m-ElvO3ZuaMnmrDIBHQP0R5SqAiVAt5PxLuOoukAu_lUJnABlyGfK5F0rHdonQMCFah6bmdGW60sAFqzTKI0jHlSsV7F_xIwibAsMaAKoMaK-0kHO-DuAEO0KaCTFnGyrgPboDw0PiusFTqa5dBnRcssXFvE7puqOxiVpzm_E-BWZTQ',
  },
];

export const SocialReelsStrip: React.FC<SocialReelsStripProps> = ({
  onSelectProduct,
  onAddToCart,
}) => {
  const [playingId, setPlayingId] = useState<string | null>(null);

  return (
    <section className="w-full bg-[#111317] py-14 lg:py-20 border-t border-[#282a2d]/40">
      <div className="max-w-7xl mx-auto px-4 lg:px-12 flex flex-col gap-8">
        {/* Header */}
        <div className="flex flex-col sm:flex-row items-start sm:items-end justify-between gap-3">
          <div>
            <div className="flex items-center gap-1.5 text-[#ff3b56] font-space text-xs uppercase font-bold tracking-wider mb-1">
              <span className="material-symbols-outlined text-[16px]">local_fire_department</span>
              Viral Feeds &amp; Unboxing Reels
            </div>
            <h2 className="font-space font-bold text-2xl lg:text-3xl text-[#e2e2e6] tracking-tight">
              Watch Real Hardware in Action
            </h2>
            <p className="text-sm text-[#bac9cc] mt-1">
              Over 25 million views across TikTok, Instagram Reels, and YouTube Shorts.
            </p>
          </div>

          <div className="flex items-center gap-2">
            <span className="text-xs font-space text-[#00e5ff] font-bold bg-[#00e5ff]/10 px-3 py-1.5 rounded-lg border border-[#00e5ff]/20">
              #VexoraTech • Live Feed
            </span>
          </div>
        </div>

        {/* Reels Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {REELS.map((reel) => {
            const isPlaying = playingId === reel.id;
            return (
              <div
                key={reel.id}
                className="group relative rounded-2xl overflow-hidden bg-[#181e27] border border-[#3b494c]/40 hover:border-[#00e5ff]/60 shadow-xl transition-all duration-300 flex flex-col"
              >
                {/* Video Media Container */}
                <div className="relative aspect-[9/14] w-full overflow-hidden bg-[#090b0e]">
                  <img
                    src={reel.image}
                    alt={reel.title}
                    className="w-full h-full object-cover transform group-hover:scale-105 transition-transform duration-700"
                  />

                  {/* Scrim Overlay */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/20 to-black/30 pointer-events-none" />

                  {/* Top Stats */}
                  <div className="absolute top-3 left-3 right-3 z-10 flex items-center justify-between text-xs font-space text-white">
                    <span className="bg-black/60 backdrop-blur-md px-2 py-0.5 rounded text-[11px] font-bold flex items-center gap-1">
                      <span className="material-symbols-outlined text-[14px] text-[#00e5ff]">visibility</span>
                      {reel.views}
                    </span>
                    <button
                      onClick={() => setPlayingId(isPlaying ? null : reel.id)}
                      className="w-7 h-7 rounded-full bg-black/60 backdrop-blur-md flex items-center justify-center text-[#00e5ff] cursor-pointer"
                    >
                      <span className="material-symbols-outlined text-[16px]">
                        {isPlaying ? 'volume_up' : 'volume_off'}
                      </span>
                    </button>
                  </div>

                  {/* Play Center Button Indicator */}
                  <div
                    onClick={() => setPlayingId(isPlaying ? null : reel.id)}
                    className="absolute inset-0 flex items-center justify-center cursor-pointer"
                  >
                    <div
                      className={`w-12 h-12 rounded-full bg-[#00e5ff]/20 backdrop-blur-md border border-[#00e5ff] flex items-center justify-center text-[#00e5ff] group-hover:scale-110 transition-transform ${
                        isPlaying ? 'opacity-0 hover:opacity-100' : 'opacity-90'
                      }`}
                    >
                      <span className="material-symbols-outlined text-[28px]">
                        {isPlaying ? 'pause' : 'play_arrow'}
                      </span>
                    </div>
                  </div>

                  {/* Bottom Text in Video Frame */}
                  <div className="absolute bottom-3 left-3 right-3 z-10 flex flex-col gap-1.5">
                    <p className="font-space text-xs font-bold text-[#00e5ff]">
                      {reel.creator}
                    </p>
                    <p className="text-xs text-white leading-snug line-clamp-2">
                      {reel.title}
                    </p>
                  </div>
                </div>

                {/* Attached Product Action Foot */}
                <div className="p-3 bg-[#11151b] border-t border-[#3b494c]/30 flex items-center justify-between gap-2">
                  <div
                    onClick={() => onSelectProduct(reel.product)}
                    className="flex-1 min-w-0 cursor-pointer"
                  >
                    <p className="font-space font-bold text-xs text-[#e2e2e6] truncate hover:text-[#00e5ff]">
                      {reel.product.name}
                    </p>
                    <span className="text-[10px] text-[#00e5ff] font-space font-semibold">
                      50% OFF TODAY
                    </span>
                  </div>

                  <button
                    onClick={() => onAddToCart(reel.product)}
                    className="px-3 py-1.5 rounded-lg bg-[#00e5ff] hover:bg-[#9cf0ff] text-[#001f24] font-space font-bold text-[11px] uppercase tracking-wider shrink-0 cursor-pointer shadow-sm"
                  >
                    Buy
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
