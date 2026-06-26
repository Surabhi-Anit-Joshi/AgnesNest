import React, { useState } from 'react';
import { HiThumbUp, HiFlag, HiCheckCircle, HiXCircle } from 'react-icons/hi';
import StarRating from './StarRating';

const ReviewCard = ({ review }) => {
  const [helpfulCount, setHelpfulCount] = useState(review.helpful ?? 0);
  const [markedHelpful, setMarkedHelpful] = useState(false);

  const handleHelpful = () => {
    if (!markedHelpful) {
      setHelpfulCount(c => c + 1);
      setMarkedHelpful(true);
    }
  };

  return (
    <div className="bg-white rounded-2xl border border-brandNavy/5 shadow-soft p-6 flex flex-col gap-4">
      {/* Header: Avatar + Info + Rating */}
      <div className="flex items-start justify-between gap-3">
        <div className="flex items-center gap-3">
          <img
            src={review.avatar}
            alt={review.studentName}
            className="w-11 h-11 rounded-full object-cover border-2 border-brandBgSoft flex-shrink-0"
          />
          <div>
            <p className="font-semibold text-brandNavy text-sm leading-tight">{review.studentName}</p>
            <p className="text-[11px] text-brandTextSec font-medium">{review.course} · {review.year}</p>
            <p className="text-[11px] text-brandTextSec font-medium">Stayed: {review.duration}</p>
          </div>
        </div>
        <div className="flex flex-col items-end gap-1">
          <StarRating rating={review.rating} size="sm" />
          <span className="text-[10px] text-brandTextSec font-medium">{review.date}</span>
        </div>
      </div>

      {/* Pros & Cons */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
        {review.pros && (
          <div className="bg-green-50 rounded-xl p-3 border border-green-100">
            <p className="text-[10px] font-bold text-green-700 uppercase tracking-wider mb-1 flex items-center gap-1">
              <HiCheckCircle className="text-sm" /> Pros
            </p>
            <p className="text-xs text-green-800 leading-relaxed">{review.pros}</p>
          </div>
        )}
        {review.cons && (
          <div className="bg-red-50 rounded-xl p-3 border border-red-100">
            <p className="text-[10px] font-bold text-red-700 uppercase tracking-wider mb-1 flex items-center gap-1">
              <HiXCircle className="text-sm" /> Cons
            </p>
            <p className="text-xs text-red-800 leading-relaxed">{review.cons}</p>
          </div>
        )}
      </div>

      {/* Feedback */}
      {review.feedback && (
        <p className="text-sm text-brandTextSec leading-relaxed border-l-2 border-brandAccent/30 pl-3 italic">
          {`"${review.feedback}"`}
        </p>
      )}

      {/* Would Recommend + Actions */}
      <div className="flex items-center justify-between pt-2 border-t border-brandNavy/5">
        <div className={`flex items-center gap-1.5 text-xs font-semibold px-2.5 py-1 rounded-full ${
          review.wouldRecommend
            ? 'bg-green-50 text-green-700 border border-green-200'
            : 'bg-red-50 text-red-600 border border-red-200'
        }`}>
          {review.wouldRecommend ? <HiCheckCircle /> : <HiXCircle />}
          {review.wouldRecommend ? 'Would Recommend' : 'Would Not Recommend'}
        </div>

        <div className="flex items-center gap-3">
          <button
            onClick={handleHelpful}
            className={`flex items-center gap-1.5 text-xs font-semibold transition-colors px-3 py-1.5 rounded-xl border ${
              markedHelpful
                ? 'bg-brandAccent/10 text-brandAccent border-brandAccent/20'
                : 'bg-brandBgSoft text-brandTextSec border-transparent hover:border-brandNavy/10'
            }`}
          >
            <HiThumbUp /> Helpful ({helpfulCount})
          </button>
          <button className="flex items-center gap-1 text-xs text-brandTextSec/60 hover:text-red-500 transition-colors font-medium">
            <HiFlag className="text-xs" /> Report
          </button>
        </div>
      </div>
    </div>
  );
};

export default ReviewCard;
