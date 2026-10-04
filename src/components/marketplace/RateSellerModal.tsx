import React, { useState } from 'react';
import { useCampusKart } from '../../context/CampusKartContext';
import { Star, ThumbsUp, ThumbsDown, Sparkles } from 'lucide-react';
import { Modal } from '../common/Modal';
import { Button } from '../common/Button';
import { RatingStars } from '../common/RatingStars';
import { triggerCelebration } from '../../utils/confetti';

interface RateSellerModalProps {
  sellerId: string;
  sellerName: string;
  itemTitle: string;
  isOpen: boolean;
  onClose: () => void;
  onSuccess?: () => void;
}

export const RateSellerModal: React.FC<RateSellerModalProps> = ({
  sellerId,
  sellerName,
  itemTitle,
  isOpen,
  onClose,
  onSuccess,
}) => {
  const { rateSeller } = useCampusKart();
  const [rating, setRating] = useState<number>(5);
  const [recommended, setRecommended] = useState<boolean>(true);
  const [comment, setComment] = useState<string>('');
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setTimeout(() => {
      rateSeller(
        sellerId,
        rating,
        comment.trim() || 'Great campus exchange! Item was in excellent shape and pickup was quick.',
        recommended,
        itemTitle
      );
      setIsSubmitting(false);
      triggerCelebration();
      if (onSuccess) onSuccess();
      onClose();
    }, 500);
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose} maxWidth="md">
      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="text-center space-y-1">
          <div className="w-12 h-12 rounded-2xl bg-amber-50 text-amber-500 border border-amber-200 flex items-center justify-center mx-auto mb-2 shadow-xs">
            <Star size={24} className="fill-amber-400" />
          </div>
          <h3 className="text-lg font-bold text-brand-dark">How was your experience?</h3>
          <p className="text-xs text-brand-muted">
            Rate your exchange with <strong>{sellerName}</strong> for <em>"{itemTitle}"</em>
          </p>
        </div>

        {/* Interactive Star Rating */}
        <div className="flex flex-col items-center justify-center p-4 bg-pastel-warm/60 rounded-2xl border border-slate-200/80 space-y-2">
          <RatingStars
            rating={rating}
            size={28}
            interactive={true}
            onRatingChange={(newRating) => setRating(newRating)}
          />
          <span className="text-xs font-bold text-brand-dark">
            {rating === 5 && '🌟 Outstanding Experience!'}
            {rating === 4 && '👍 Very Good Exchange!'}
            {rating === 3 && '👌 Decent & Satisfactory'}
            {rating === 2 && '⚠️ Needs Improvement'}
            {rating === 1 && '❌ Unsatisfactory'}
          </span>
        </div>

        {/* Would you recommend */}
        <div className="space-y-2">
          <label className="text-xs font-bold text-brand-muted uppercase tracking-wider block">
            Would you recommend this student?
          </label>
          <div className="grid grid-cols-2 gap-2">
            <button
              type="button"
              onClick={() => setRecommended(true)}
              className={`p-3 rounded-2xl border text-xs font-bold flex items-center justify-center gap-2 transition-all ${
                recommended
                  ? 'bg-emerald-50 border-emerald-400 text-emerald-800 shadow-xs'
                  : 'bg-white border-slate-200 text-brand-muted hover:border-slate-300'
              }`}
            >
              <ThumbsUp size={16} className={recommended ? 'text-emerald-600' : ''} />
              <span>Yes, Highly Recommend</span>
            </button>

            <button
              type="button"
              onClick={() => setRecommended(false)}
              className={`p-3 rounded-2xl border text-xs font-bold flex items-center justify-center gap-2 transition-all ${
                !recommended
                  ? 'bg-rose-50 border-rose-400 text-rose-800 shadow-xs'
                  : 'bg-white border-slate-200 text-brand-muted hover:border-slate-300'
              }`}
            >
              <ThumbsDown size={16} className={!recommended ? 'text-rose-600' : ''} />
              <span>No</span>
            </button>
          </div>
        </div>

        {/* Review Comment Textarea */}
        <div className="space-y-1.5">
          <label className="text-xs font-bold text-brand-muted uppercase tracking-wider block">
            Write your review (Optional)
          </label>
          <textarea
            value={comment}
            onChange={(e) => setComment(e.target.value)}
            rows={3}
            placeholder="E.g., Great condition, met quickly at the campus library, very polite!"
            className="w-full p-3.5 rounded-2xl border border-brand-border text-xs sm:text-sm text-brand-dark focus:ring-2 focus:ring-pastel-sage focus:outline-none placeholder:text-brand-muted/70"
          />
        </div>

        {/* Actions */}
        <div className="grid grid-cols-2 gap-3 pt-2">
          <Button
            type="button"
            variant="outline"
            size="md"
            onClick={onClose}
            disabled={isSubmitting}
            className="font-bold"
          >
            Cancel
          </Button>
          <Button
            type="submit"
            variant="primary"
            size="md"
            isLoading={isSubmitting}
            className="font-bold"
          >
            Submit Review
          </Button>
        </div>
      </form>
    </Modal>
  );
};
