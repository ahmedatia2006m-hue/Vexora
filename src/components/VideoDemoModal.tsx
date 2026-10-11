import React, { useState, useEffect, useRef } from 'react';
import { CurrencyConfig, Product } from '../types';
import { HERO_PRODUCT, formatPrice } from '../data/products';

interface VideoDemoModalProps {
  isOpen: boolean;
  onClose: () => void;
  currency: CurrencyConfig;
  onOrderNow: (product: Product) => void;
}

export const VideoDemoModal: React.FC<VideoDemoModalProps> = ({
  isOpen,
  onClose,
  currency,
  onOrderNow,
}) => {
  const [activeMode, setActiveMode] = useState<'cyan' | 'violet' | 'emerald' | 'amber'>('cyan');
  const [isPlaying, setIsPlaying] = useState(true);
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    if (!isOpen || !canvasRef.current) return;
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animationFrameId: number;
    let angle = 0;

    const render = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      const colorMap = {
        cyan: { primary: '#00e5ff', secondary: '#00626e' },
        violet: { primary: '#c2cfff', secondary: '#7000ff' },
        emerald: { primary: '#00f0a8', secondary: '#004f38' },
        amber: { primary: '#ffb4ab', secondary: '#ff5500' },
      };

      const theme = colorMap[activeMode];

      // Draw dynamic futuristic circular laser nebula
      const centerX = canvas.width / 2;
      const centerY = canvas.height / 2;

      // Outer aurora ripples
      for (let i = 0; i < 4; i++) {
        const radius = 60 + i * 28 + Math.sin(angle + i) * 14;
        ctx.beginPath();
        ctx.arc(centerX, centerY, radius, 0, Math.PI * 2);
        ctx.strokeStyle = theme.primary;
        ctx.globalAlpha = 0.25 - i * 0.05;
        ctx.lineWidth = 3;
        ctx.stroke();
      }

      // Audio spectrum bars
      const numBars = 36;
      for (let i = 0; i < numBars; i++) {
        const barAngle = (i / numBars) * Math.PI * 2 + angle * 0.3;
        const barLength = 20 + Math.abs(Math.sin(angle * 2 + i * 0.5)) * 40;
        const startX = centerX + Math.cos(barAngle) * 45;
        const startY = centerY + Math.sin(barAngle) * 45;
        const endX = centerX + Math.cos(barAngle) * (45 + barLength);
        const endY = centerY + Math.sin(barAngle) * (45 + barLength);

        ctx.beginPath();
        ctx.moveTo(startX, startY);
        ctx.lineTo(endX, endY);
        ctx.strokeStyle = theme.primary;
        ctx.globalAlpha = 0.8;
        ctx.lineWidth = 2.5;
        ctx.stroke();
      }

      // Central optical aperture diode
      ctx.beginPath();
      ctx.arc(centerX, centerY, 24, 0, Math.PI * 2);
      ctx.fillStyle = theme.primary;
      ctx.globalAlpha = 0.9;
      ctx.fill();

      angle += isPlaying ? 0.04 : 0;
      animationFrameId = requestAnimationFrame(render);
    };

    render();

    return () => {
      cancelAnimationFrame(animationFrameId);
    };
  }, [isOpen, activeMode, isPlaying]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-md">
      <div className="bg-[#181e27] border border-[#3b494c] rounded-2xl max-w-2xl w-full p-6 shadow-2xl relative text-[#e2e2e6] overflow-hidden">
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-[#849396] hover:text-[#e2e2e6] text-sm p-1.5 rounded-lg hover:bg-[#282a2d] transition-colors cursor-pointer z-20"
        >
          ✕
        </button>

        {/* Header */}
        <div className="flex items-center gap-2 mb-4">
          <span className="material-symbols-outlined text-[#00e5ff] text-[24px]">play_circle</span>
          <div>
            <h3 className="font-space font-bold text-lg text-[#e2e2e6]">
              CyberGlow Lumina 360° Optical Simulator
            </h3>
            <p className="text-xs text-[#849396]">
              Real-time projection matrix &amp; spatial acoustic wave demonstration
            </p>
          </div>
        </div>

        {/* Video Canvas Visualizer */}
        <div className="relative w-full aspect-video rounded-xl bg-[#090b0e] border border-[#3b494c]/50 flex items-center justify-center overflow-hidden">
          <canvas
            ref={canvasRef}
            width={480}
            height={270}
            className="w-full h-full object-contain pointer-events-none"
          />

          <div className="absolute top-3 left-3 bg-[#111317]/80 backdrop-blur-md px-2.5 py-1 rounded text-[11px] font-space font-bold uppercase text-[#00e5ff] flex items-center gap-1.5">
            <span className="w-2 h-2 rounded-full bg-[#00e5ff] animate-ping" />
            4K Laser Matrix • {activeMode.toUpperCase()} AURORA
          </div>

          <div className="absolute bottom-3 right-3 flex items-center gap-2">
            <button
              onClick={() => setIsPlaying(!isPlaying)}
              className="bg-[#1e2023]/80 hover:bg-[#282a2d] p-2 rounded-lg text-xs text-[#e2e2e6] flex items-center gap-1 cursor-pointer"
            >
              <span className="material-symbols-outlined text-[16px]">
                {isPlaying ? 'pause' : 'play_arrow'}
              </span>
              {isPlaying ? 'Pause' : 'Play'}
            </button>
          </div>
        </div>

        {/* Nebula Mode Selector */}
        <div className="mt-4 flex flex-col gap-2">
          <label className="font-space font-bold text-xs uppercase text-[#bac9cc]">
            Select Projection Atmosphere Mode:
          </label>
          <div className="grid grid-cols-4 gap-2">
            <button
              type="button"
              onClick={() => setActiveMode('cyan')}
              className={`p-2 rounded-lg text-xs font-space font-bold border transition-all cursor-pointer ${
                activeMode === 'cyan'
                  ? 'border-[#00e5ff] bg-[#00e5ff]/20 text-[#00e5ff]'
                  : 'border-[#3b494c] bg-[#11151b] text-[#bac9cc]'
              }`}
            >
              Cyan Matrix
            </button>
            <button
              type="button"
              onClick={() => setActiveMode('violet')}
              className={`p-2 rounded-lg text-xs font-space font-bold border transition-all cursor-pointer ${
                activeMode === 'violet'
                  ? 'border-[#c2cfff] bg-[#c2cfff]/20 text-[#c2cfff]'
                  : 'border-[#3b494c] bg-[#11151b] text-[#bac9cc]'
              }`}
            >
              Violet Cosmos
            </button>
            <button
              type="button"
              onClick={() => setActiveMode('emerald')}
              className={`p-2 rounded-lg text-xs font-space font-bold border transition-all cursor-pointer ${
                activeMode === 'emerald'
                  ? 'border-[#00f0a8] bg-[#00f0a8]/20 text-[#00f0a8]'
                  : 'border-[#3b494c] bg-[#11151b] text-[#bac9cc]'
              }`}
            >
              Emerald Dream
            </button>
            <button
              type="button"
              onClick={() => setActiveMode('amber')}
              className={`p-2 rounded-lg text-xs font-space font-bold border transition-all cursor-pointer ${
                activeMode === 'amber'
                  ? 'border-[#ffb4ab] bg-[#ffb4ab]/20 text-[#ffb4ab]'
                  : 'border-[#3b494c] bg-[#11151b] text-[#bac9cc]'
              }`}
            >
              Solar Flare
            </button>
          </div>
        </div>

        {/* CTA */}
        <div className="mt-6 flex items-center justify-between pt-4 border-t border-[#3b494c]/30">
          <div>
            <span className="font-space font-bold text-xl text-[#00e5ff]">
              {formatPrice(HERO_PRODUCT.price, currency)}
            </span>
            <span className="text-xs text-[#849396] line-through ml-2 font-space">
              {formatPrice(HERO_PRODUCT.originalPrice, currency)}
            </span>
            <p className="text-[11px] text-[#ffb4ab] font-bold">50% Launch Discount Active</p>
          </div>

          <button
            onClick={() => {
              onOrderNow(HERO_PRODUCT);
              onClose();
            }}
            className="px-6 py-3 rounded-xl bg-[#00e5ff] text-[#001f24] font-space font-extrabold text-xs uppercase tracking-wider hover:bg-[#9cf0ff] shadow-lg cursor-pointer"
          >
            Claim 50% Off &amp; Order Now
          </button>
        </div>
      </div>
    </div>
  );
};
