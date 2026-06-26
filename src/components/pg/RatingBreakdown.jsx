import React, { useState } from 'react';

// RatingBreakdown — shows 5★–1★ bars with percentage fills
const RatingBreakdown = ({ reviews = [] }) => {
  const total = reviews.length;
  const counts = [5, 4, 3, 2, 1].map(star => ({
    star,
    count: reviews.filter(r => Math.round(r.rating) === star).length,
  }));

  return (
    <div className="flex flex-col gap-2 w-full">
      {counts.map(({ star, count }) => {
        const pct = total > 0 ? Math.round((count / total) * 100) : 0;
        return (
          <div key={star} className="flex items-center gap-3 text-sm">
            <span className="text-xs font-bold text-brandTextSec w-4 text-right">{star}</span>
            <span className="text-amber-400 text-xs">★</span>
            <div className="flex-grow h-2 bg-gray-100 rounded-full overflow-hidden">
              <div
                className="h-full bg-amber-400 rounded-full transition-all duration-700"
                style={{ width: `${pct}%` }}
              />
            </div>
            <span className="text-xs font-bold text-brandTextSec w-6">{count}</span>
          </div>
        );
      })}
    </div>
  );
};

export default RatingBreakdown;
