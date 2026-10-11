import React, { useState } from 'react';
import { FAQS } from '../data/products';

export const FaqSection: React.FC = () => {
  const [openIndex, setOpenIndex] = useState<number | null>(0); // First item open by default

  const toggleFaq = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <section className="w-full bg-[#111317] py-12 lg:py-16">
      <div className="max-w-4xl mx-auto px-4 lg:px-12 flex flex-col gap-8">
        <div className="text-center flex flex-col gap-1.5">
          <span className="font-space text-xs uppercase text-[#00e5ff] font-bold tracking-wider">
            Zero Risk Guarantee
          </span>
          <h2 className="font-space font-bold text-2xl lg:text-3xl text-[#e2e2e6] tracking-tight">
            Frequently Asked Questions
          </h2>
          <p className="text-sm text-[#bac9cc] leading-relaxed">
            Everything you need to know about our guaranteed worldwide dispatch and return policies.
          </p>
        </div>

        <div className="flex flex-col gap-3">
          {FAQS.map((faq, index) => {
            const isOpen = openIndex === index;
            return (
              <div
                key={faq.id}
                className="bg-[#1a1c1f] rounded-xl overflow-hidden border border-[#3b494c]/30 transition-all hover:border-[#00e5ff]/40"
              >
                <button
                  type="button"
                  onClick={() => toggleFaq(index)}
                  className="w-full p-4 lg:p-5 text-left flex items-center justify-between text-[#e2e2e6] font-space font-semibold text-base focus:outline-none cursor-pointer"
                >
                  <span className="pr-4">{faq.question}</span>
                  <span
                    className={`material-symbols-outlined text-[#00e5ff] text-[22px] transition-transform duration-300 shrink-0 ${
                      isOpen ? 'rotate-180' : 'rotate-0'
                    }`}
                  >
                    expand_more
                  </span>
                </button>

                {isOpen && (
                  <div className="px-4 lg:px-5 pb-5 text-[#bac9cc] text-sm leading-relaxed border-t border-[#3b494c]/20 pt-3">
                    {faq.answer}
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
