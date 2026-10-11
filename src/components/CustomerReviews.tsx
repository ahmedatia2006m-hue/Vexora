import React, { useState } from 'react';
import { REVIEWS } from '../data/products';
import { Review } from '../types';

export const CustomerReviews: React.FC = () => {
  const [reviewsList, setReviewsList] = useState<Review[]>(REVIEWS);
  const [isSubmitModalOpen, setIsSubmitModalOpen] = useState(false);
  const [newAuthor, setNewAuthor] = useState('');
  const [newLocation, setNewLocation] = useState('');
  const [newComment, setNewComment] = useState('');
  const [newProduct, setNewProduct] = useState('CyberGlow Lumina Cube');
  const [newRating, setNewRating] = useState(5);
  const [submittedMessage, setSubmittedMessage] = useState(false);

  const handleSubmitReview = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newAuthor.trim() || !newComment.trim()) return;

    const newRev: Review = {
      id: `rev-${Date.now()}`,
      author: newAuthor,
      location: newLocation || 'Verified Customer',
      productPurchased: newProduct,
      rating: newRating,
      comment: `"${newComment}"`,
      verified: true,
      image:
        'https://lh3.googleusercontent.com/aida-public/AB6AXuA-PhOcu79QrEpyDKSntR_cU-JctQnFEKO5VQXaOHqCq8lWD4SMw4dLVhYeIziz3IZFY5A8F_l6XQb0uRkm41sUgPDiKJlpLqxMJMjlkb9ckH7pavlCTulPu7867qfw0dQFTYdWzjBSW4aDx2i3YcSNIIYgBhojUAZkaXoYvEf5VFDrD-qMC5YFR1m4kmChTWeMYi8zULtC9I0RRdrRsm7ruZU4WH4LSxZZTznSHTHU0B4omXHYF0FSdA',
      date: 'Just now',
    };

    setReviewsList([newRev, ...reviewsList]);
    setSubmittedMessage(true);
    setTimeout(() => {
      setSubmittedMessage(false);
      setIsSubmitModalOpen(false);
      setNewAuthor('');
      setNewLocation('');
      setNewComment('');
    }, 1800);
  };

  return (
    <section className="w-full bg-[#1a1c1f] py-12 lg:py-16 border-t border-b border-[#282a2d]/40">
      <div className="max-w-7xl mx-auto px-4 lg:px-12 flex flex-col gap-8">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row items-start md:items-end justify-between gap-4">
          <div>
            <div className="flex items-center gap-1.5 text-[#00e5ff] font-space text-xs uppercase font-bold tracking-wider mb-1">
              <span className="material-symbols-outlined text-[16px]">verified</span>
              Real Vexora Owners
            </div>
            <h2 className="font-space font-bold text-2xl lg:text-3xl text-[#e2e2e6] tracking-tight">
              Customer Unboxings &amp; Live Feedback
            </h2>
            <p className="text-sm text-[#bac9cc] mt-1 max-w-2xl leading-relaxed">
              Over 14,200 satisfied global tech enthusiasts. Here is what they are sharing on feeds.
            </p>
          </div>

          {/* Rating Aggregate Pill */}
          <div className="flex items-center gap-4">
            <div className="bg-[#282a2d] px-4 py-2 rounded-xl flex items-center gap-4 border border-[#3b494c]/40">
              <div className="text-right">
                <p className="font-space font-bold text-xl text-[#00e5ff]">4.94 / 5.0</p>
                <p className="font-space text-[10px] uppercase text-[#849396] tracking-wider">
                  Based on 3,842 Reviews
                </p>
              </div>
              <div className="w-px h-8 bg-[#3b494c]" />
              <div>
                <p className="font-space font-bold text-sm text-[#e2e2e6]">99.2%</p>
                <p className="font-space text-[10px] uppercase text-[#849396] tracking-wider">
                  Recommend Rate
                </p>
              </div>
            </div>

            <button
              onClick={() => setIsSubmitModalOpen(true)}
              className="hidden sm:flex items-center gap-1.5 px-3.5 py-2.5 rounded-xl bg-[#1e2023] hover:bg-[#333538] border border-[#00e5ff]/40 text-[#00e5ff] font-space text-xs font-bold uppercase tracking-wider transition-all cursor-pointer"
            >
              <span className="material-symbols-outlined text-[16px]">rate_review</span>
              Share Feedback
            </button>
          </div>
        </div>

        {/* Reviews Grid with Customer Photos */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {reviewsList.slice(0, 3).map((review) => (
            <div
              key={review.id}
              className="bg-[#1e2023] p-5 rounded-2xl flex flex-col justify-between gap-4 border border-[#3b494c]/30 shadow-md hover:border-[#00e5ff]/40 transition-colors"
            >
              <div className="flex flex-col gap-3">
                <div className="flex items-center justify-between">
                  <div className="flex text-[#00e5ff]">
                    {[...Array(review.rating)].map((_, i) => (
                      <span
                        key={i}
                        className="material-symbols-outlined text-[18px]"
                        style={{ fontVariationSettings: "'FILL' 1" }}
                      >
                        star
                      </span>
                    ))}
                  </div>
                  <span className="font-space text-[10px] text-[#849396] uppercase tracking-wider bg-[#282a2d] px-2 py-0.5 rounded">
                    Verified Delivery
                  </span>
                </div>

                {/* Customer Photo Snippet */}
                {review.image && (
                  <div className="w-full h-44 rounded-xl bg-[#282a2d] overflow-hidden">
                    <img
                      src={review.image}
                      alt={`Unboxing by ${review.author}`}
                      className="w-full h-full object-cover hover:scale-105 transition-transform duration-500"
                    />
                  </div>
                )}

                <p className="text-sm text-[#e2e2e6] italic leading-relaxed">
                  {review.comment}
                </p>
              </div>

              <div className="flex items-center justify-between pt-3 border-t border-[#3b494c]/40">
                <div>
                  <p className="font-space font-bold text-sm text-[#e2e2e6]">
                    {review.author}
                  </p>
                  <p className="text-xs text-[#bac9cc]">
                    {review.location} ● Purchased {review.productPurchased}
                  </p>
                </div>
                <span
                  className="material-symbols-outlined text-[#00e5ff] text-[20px]"
                  title="Verified Purchase"
                >
                  verified
                </span>
              </div>
            </div>
          ))}
        </div>

        {/* Review Submission Modal */}
        {isSubmitModalOpen && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-sm">
            <div className="bg-[#1e2023] border border-[#3b494c] rounded-2xl max-w-md w-full p-6 shadow-2xl relative">
              <button
                onClick={() => setIsSubmitModalOpen(false)}
                className="absolute top-4 right-4 text-[#849396] hover:text-[#e2e2e6] text-sm p-1"
              >
                ✕
              </button>

              <h3 className="font-space font-bold text-xl text-[#e2e2e6]">
                Share Your Unboxing Experience
              </h3>
              <p className="text-xs text-[#bac9cc] mt-1">
                Post feedback and inspire other tech enthusiasts worldwide.
              </p>

              {submittedMessage ? (
                <div className="mt-6 p-4 rounded-xl bg-[#00e5ff]/10 border border-[#00e5ff] text-center">
                  <span className="material-symbols-outlined text-[#00e5ff] text-3xl">task_alt</span>
                  <p className="font-space font-bold text-[#e2e2e6] mt-2">
                    Review Submitted Successfully!
                  </p>
                  <p className="text-xs text-[#bac9cc]">
                    Thank you for supporting Vexora Hardware.
                  </p>
                </div>
              ) : (
                <form onSubmit={handleSubmitReview} className="mt-4 flex flex-col gap-3">
                  <div>
                    <label className="block text-xs font-space uppercase text-[#bac9cc] mb-1">
                      Your Name
                    </label>
                    <input
                      type="text"
                      required
                      placeholder="e.g. Omar Al-Kadi"
                      value={newAuthor}
                      onChange={(e) => setNewAuthor(e.target.value)}
                      className="w-full bg-[#111317] border border-[#3b494c] rounded-lg px-3 py-2 text-sm text-[#e2e2e6] focus:outline-none focus:border-[#00e5ff]"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-space uppercase text-[#bac9cc] mb-1">
                      Location
                    </label>
                    <input
                      type="text"
                      placeholder="e.g. Riyadh, KSA or Berlin, Germany"
                      value={newLocation}
                      onChange={(e) => setNewLocation(e.target.value)}
                      className="w-full bg-[#111317] border border-[#3b494c] rounded-lg px-3 py-2 text-sm text-[#e2e2e6] focus:outline-none focus:border-[#00e5ff]"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-space uppercase text-[#bac9cc] mb-1">
                      Product
                    </label>
                    <select
                      value={newProduct}
                      onChange={(e) => setNewProduct(e.target.value)}
                      className="w-full bg-[#111317] border border-[#3b494c] rounded-lg px-3 py-2 text-sm text-[#e2e2e6] focus:outline-none focus:border-[#00e5ff]"
                    >
                      <option value="CyberGlow Lumina Cube">CyberGlow Lumina Cube</option>
                      <option value="Smart Health Ring">CyberPulse Smart Health Ring</option>
                      <option value="MagneCharge 4-in-1">MagneCharge 4-in-1</option>
                      <option value="AeroClean Turbo Vacuum">AeroClean Turbo Vacuum</option>
                      <option value="LuminaGrip Mount">LuminaGrip Phone Mount</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-xs font-space uppercase text-[#bac9cc] mb-1">
                      Rating
                    </label>
                    <div className="flex gap-2">
                      {[1, 2, 3, 4, 5].map((star) => (
                        <button
                          key={star}
                          type="button"
                          onClick={() => setNewRating(star)}
                          className={`material-symbols-outlined text-2xl ${
                            star <= newRating ? 'text-[#00e5ff]' : 'text-[#3b494c]'
                          }`}
                          style={{ fontVariationSettings: "'FILL' 1" }}
                        >
                          star
                        </button>
                      ))}
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-space uppercase text-[#bac9cc] mb-1">
                      Feedback / Review
                    </label>
                    <textarea
                      required
                      rows={3}
                      placeholder="Share your thoughts on build quality, speed of delivery, and performance..."
                      value={newComment}
                      onChange={(e) => setNewComment(e.target.value)}
                      className="w-full bg-[#111317] border border-[#3b494c] rounded-lg px-3 py-2 text-sm text-[#e2e2e6] focus:outline-none focus:border-[#00e5ff]"
                    />
                  </div>

                  <button
                    type="submit"
                    className="mt-2 w-full py-3 rounded-xl bg-[#00e5ff] text-[#001f24] font-space font-bold text-sm uppercase tracking-wider hover:bg-[#9cf0ff] transition-colors cursor-pointer"
                  >
                    Submit Verified Review
                  </button>
                </form>
              )}
            </div>
          </div>
        )}
      </div>
    </section>
  );
};
