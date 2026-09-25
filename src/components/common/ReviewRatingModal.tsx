import React, { useState } from 'react';
import { Star, CheckCircle, X } from 'lucide-react';

interface ReviewRatingModalProps {
  isOpen: boolean;
  onClose: () => void;
  partnerName: string;
  skillTitle: string;
  credits: number;
  onSubmit: (rating: number, comment: string) => void;
}

export const ReviewRatingModal: React.FC<ReviewRatingModalProps> = ({
  isOpen,
  onClose,
  partnerName,
  skillTitle,
  credits,
  onSubmit
}) => {
  const [rating, setRating] = useState<number>(5);
  const [comment, setComment] = useState<string>('');
  const [hoveredRating, setHoveredRating] = useState<number | null>(null);

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit(rating, comment || 'Great skill exchange! Friendly, on time, and very helpful.');
  };

  return (
    <div className="absolute inset-0 bg-black/60 backdrop-blur-sm z-50 flex items-center justify-center p-4">
      <div className="w-full max-w-sm bg-stone-50 rounded-3xl p-6 shadow-2xl border border-stone-200 text-stone-900">
        <div className="flex items-center justify-between pb-3 border-b border-stone-200">
          <div className="flex items-center gap-2 text-emerald-800">
            <CheckCircle className="w-5 h-5" />
            <span className="font-bold text-sm">Exchange Complete!</span>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="p-1 text-stone-400 hover:text-stone-700 rounded-full"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="mt-4 space-y-4">
          <div className="text-center">
            <p className="text-xs text-stone-500 uppercase tracking-wider font-semibold">
              Leave a Community Review
            </p>
            <h3 className="font-bold text-base text-stone-900 mt-1">
              How was your swap with {partnerName}?
            </h3>
            <p className="text-xs text-stone-600 mt-0.5 italic">"{skillTitle}"</p>
          </div>

          <div className="flex items-center justify-center gap-2 py-2">
            {[1, 2, 3, 4, 5].map((star) => (
              <button
                type="button"
                key={star}
                onMouseEnter={() => setHoveredRating(star)}
                onMouseLeave={() => setHoveredRating(null)}
                onClick={() => setRating(star)}
                className="p-1 text-amber-500 transition-transform hover:scale-110 active:scale-95"
              >
                <Star
                  className={`w-7 h-7 ${
                    (hoveredRating ?? rating) >= star
                      ? 'fill-amber-400 text-amber-500'
                      : 'text-stone-300'
                  }`}
                />
              </button>
            ))}
          </div>

          <div className="p-3 bg-emerald-50 rounded-2xl border border-emerald-100 text-center">
            <span className="text-xs font-semibold text-emerald-900">
              ⚡ Transferring {credits} Time Credits
            </span>
            <p className="text-[11px] text-emerald-700 mt-0.5">
              Credits will be securely transferred upon rating submission.
            </p>
          </div>

          <div>
            <label className="block text-xs font-medium text-stone-700 mb-1">
              Share your experience
            </label>
            <textarea
              rows={3}
              value={comment}
              onChange={(e) => setComment(e.target.value)}
              placeholder="e.g. Carlos was super patient, brought all necessary tools, and explained how the shelf anchors work!"
              className="w-full text-xs p-3 rounded-xl border border-stone-300 bg-white text-stone-900 focus:outline-none focus:ring-2 focus:ring-emerald-700 resize-none"
            />
          </div>

          <div className="flex gap-2 pt-1">
            <button
              type="button"
              onClick={onClose}
              className="flex-1 py-2.5 rounded-xl border border-stone-300 text-stone-700 font-medium text-xs hover:bg-stone-100 transition-colors"
            >
              Skip for now
            </button>
            <button
              type="submit"
              className="flex-1 py-2.5 rounded-xl bg-emerald-800 hover:bg-emerald-900 text-white font-medium text-xs transition-colors"
            >
              Submit & Transfer
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
