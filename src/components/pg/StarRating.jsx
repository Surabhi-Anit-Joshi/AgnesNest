import React from 'react';
import { HiStar } from 'react-icons/hi';

// StarRating — supports interactive (clickable) and read-only display modes
const StarRating = ({
  rating = 0,
  maxStars = 5,
  size = 'md',
  interactive = false,
  onRate,
  showValue = false,
}) => {
  const sizeMap = { sm: 'text-sm', md: 'text-lg', lg: 'text-2xl', xl: 'text-3xl' };
  const sizeClass = sizeMap[size] || 'text-lg';

  return (
    <div className="flex items-center gap-0.5">
      {Array.from({ length: maxStars }, (_, i) => {
        const filled = i < Math.floor(rating);
        const half = !filled && i < rating;
        return (
          <button
            key={i}
            type={interactive ? 'button' : undefined}
            disabled={!interactive}
            onClick={() => interactive && onRate && onRate(i + 1)}
            className={`${sizeClass} transition-transform duration-150 ${
              interactive
                ? 'hover:scale-125 cursor-pointer focus:outline-none'
                : 'cursor-default'
            } ${filled || half ? 'text-amber-400' : 'text-gray-200'}`}
          >
            <HiStar />
          </button>
        );
      })}
      {showValue && (
        <span className="ml-1.5 text-sm font-bold text-brandNavy font-mono">
          {rating > 0 ? rating.toFixed(1) : '—'}
        </span>
      )}
    </div>
  );
};

export default StarRating;
