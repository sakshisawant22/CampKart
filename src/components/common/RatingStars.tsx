import React from 'react';
import { Star } from 'lucide-react';

interface RatingStarsProps {
  rating: number;
  maxRating?: number;
  size?: number;
  interactive?: boolean;
  onRatingChange?: (rating: number) => void;
  showScore?: boolean;
  reviewCount?: number;
  className?: string;
}

export const RatingStars: React.FC<RatingStarsProps> = ({
  rating,
  maxRating = 5,
  size = 14,
  interactive = false,
  onRatingChange,
  showScore = false,
  reviewCount,
  className = '',
}) => {
  const [hoverRating, setHoverRating] = React.useState<number | null>(null);

  const current = hoverRating !== null ? hoverRating : rating;

  return (
    <div className={`inline-flex items-center gap-1.5 ${className}`}>
      <div className="flex items-center gap-0.5">
        {Array.from({ length: maxRating }).map((_, i) => {
          const starValue = i + 1;
          const isFilled = current >= starValue;
          const isHalf = current >= starValue - 0.5 && current < starValue;

          return (
            <button
              key={i}
              type="button"
              disabled={!interactive}
              onClick={() => interactive && onRatingChange && onRatingChange(starValue)}
              onMouseEnter={() => interactive && setHoverRating(starValue)}
              onMouseLeave={() => interactive && setHoverRating(null)}
              className={`${interactive ? 'cursor-pointer hover:scale-110 transition-transform p-0.5' : 'cursor-default'}`}
              aria-label={`Rate ${starValue} stars`}
            >
              <Star
                size={size}
                className={`${
                  isFilled
                    ? 'fill-amber-400 text-amber-400'
                    : isHalf
                    ? 'fill-amber-300 text-amber-400'
                    : 'fill-slate-100 text-slate-300'
                } transition-colors`}
              />
            </button>
          );
        })}
      </div>
      {showScore && (
        <span className="text-xs font-bold text-brand-dark">
          {rating.toFixed(1)}
        </span>
      )}
      {reviewCount !== undefined && (
        <span className="text-xs text-brand-muted">
          ({reviewCount})
        </span>
      )}
    </div>
  );
};
