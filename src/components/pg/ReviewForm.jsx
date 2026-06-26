import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { HiCheckCircle, HiXCircle, HiStar, HiPencilAlt } from 'react-icons/hi';
import StarRating from './StarRating';

const DURATION_OPTIONS = [
  'Less than 3 months',
  '3–6 months',
  '6–12 months',
  'More than 1 year',
];

// Dummy logged-in student (replace with auth context when backend is added)
const CURRENT_USER = {
  name: "Jane D'Souza",
  course: 'B.Com',
  year: '3rd Year',
  avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=facearea&facepad=2&w=80&h=80&q=80',
};

const FieldLabel = ({ children, required }) => (
  <label className="block text-[11px] font-bold text-brandNavy uppercase tracking-wider mb-1.5">
    {children}
    {required && <span className="text-red-400 ml-0.5">*</span>}
  </label>
);

const ReviewForm = ({ pgId, onSubmit }) => {
  const [rating, setRating] = useState(0);
  const [pros, setPros] = useState('');
  const [cons, setCons] = useState('');
  const [feedback, setFeedback] = useState('');
  const [wouldRecommend, setWouldRecommend] = useState(true);
  const [duration, setDuration] = useState('');
  const [errors, setErrors] = useState({});
  const [submitting, setSubmitting] = useState(false);

  const validate = () => {
    const e = {};
    if (rating === 0) e.rating = 'Please select a star rating';
    if (!duration) e.duration = 'Please select how long you stayed';
    if (!feedback.trim() || feedback.trim().length < 10)
      e.feedback = 'Please write at least 10 characters';
    setErrors(e);
    return Object.keys(e).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!validate()) return;

    setSubmitting(true);

    // Simulate brief async delay for future API integration
    setTimeout(() => {
      const newReview = {
        // Core fields
        id: Date.now(),
        studentName: CURRENT_USER.name,
        course: CURRENT_USER.course,
        year: CURRENT_USER.year,
        avatar: CURRENT_USER.avatar,
        duration,
        rating,
        date: 'Just now',
        pros: pros.trim(),
        cons: cons.trim(),
        feedback: feedback.trim(),
        wouldRecommend,
        helpful: 0,

        // Future-ready admin approval field
        // status: "pending" | "approved"
        // Admin Dashboard will flip "pending" → "approved" via backend
        status: 'approved',

        // Metadata for future backend
        pgId,
        submittedAt: new Date().toISOString(),
      };

      onSubmit(newReview);
      setSubmitting(false);

      // Reset form
      setRating(0);
      setPros('');
      setCons('');
      setFeedback('');
      setWouldRecommend(true);
      setDuration('');
      setErrors({});
    }, 400);
  };

  return (
    <div className="bg-white rounded-3xl border border-brandNavy/5 shadow-soft overflow-hidden">
      {/* Form Header */}
      <div className="px-6 py-5 border-b border-brandNavy/5 bg-brandBgSoft flex items-center gap-3">
        <div className="w-9 h-9 bg-brandAccent/10 rounded-xl flex items-center justify-center text-brandAccent">
          <HiPencilAlt className="text-lg" />
        </div>
        <div>
          <p className="font-bold text-brandNavy text-base leading-tight">Write a Review</p>
          <p className="text-[11px] text-brandTextSec font-medium mt-0.5">
            Share your experience to help fellow students make informed decisions
          </p>
        </div>
      </div>

      <form onSubmit={handleSubmit} className="p-6 flex flex-col gap-6" noValidate>

        {/* ── Star Rating ─────────────────────────────── */}
        <div>
          <FieldLabel required>Overall Rating</FieldLabel>
          <div className="flex items-center gap-3">
            <StarRating rating={rating} size="xl" interactive onRate={setRating} />
            {rating > 0 && (
              <span className="text-sm font-bold text-brandNavy font-mono">
                {['', 'Poor', 'Fair', 'Good', 'Very Good', 'Excellent'][rating]}
              </span>
            )}
          </div>
          {errors.rating && (
            <p className="text-red-500 text-xs mt-1.5 flex items-center gap-1">
              <HiXCircle className="text-sm" /> {errors.rating}
            </p>
          )}
        </div>

        {/* ── Duration Stayed ──────────────────────────── */}
        <div>
          <FieldLabel required>Duration Stayed</FieldLabel>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
            {DURATION_OPTIONS.map(opt => (
              <button
                key={opt}
                type="button"
                onClick={() => setDuration(opt)}
                className={`px-3 py-2.5 rounded-xl text-xs font-semibold border text-center transition-all duration-200 ${
                  duration === opt
                    ? 'bg-brandNavy text-white border-brandNavy shadow-sm'
                    : 'bg-brandBgSoft text-brandNavy border-brandNavy/10 hover:border-brandNavy/30'
                }`}
              >
                {opt}
              </button>
            ))}
          </div>
          {errors.duration && (
            <p className="text-red-500 text-xs mt-1.5 flex items-center gap-1">
              <HiXCircle className="text-sm" /> {errors.duration}
            </p>
          )}
        </div>

        {/* ── Pros & Cons ──────────────────────────────── */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <FieldLabel>Pros</FieldLabel>
            <textarea
              value={pros}
              onChange={e => setPros(e.target.value)}
              rows={3}
              placeholder="What did you like most? (food, location, facilities…)"
              className="w-full text-sm text-brandNavy placeholder-brandTextSec/40 bg-brandBgSoft border border-brandNavy/10 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-brandAccent/20 focus:border-brandAccent transition-all resize-none"
            />
          </div>
          <div>
            <FieldLabel>Cons</FieldLabel>
            <textarea
              value={cons}
              onChange={e => setCons(e.target.value)}
              rows={3}
              placeholder="What could be improved? (WiFi, curfew, food…)"
              className="w-full text-sm text-brandNavy placeholder-brandTextSec/40 bg-brandBgSoft border border-brandNavy/10 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-brandAccent/20 focus:border-brandAccent transition-all resize-none"
            />
          </div>
        </div>

        {/* ── Overall Feedback ─────────────────────────── */}
        <div>
          <FieldLabel required>Overall Review</FieldLabel>
          <textarea
            value={feedback}
            onChange={e => setFeedback(e.target.value)}
            rows={4}
            placeholder="Share your overall experience. Was it safe? How was the food quality, cleanliness, and environment? Would you recommend it to a fellow Agnes student?"
            className="w-full text-sm text-brandNavy placeholder-brandTextSec/40 bg-brandBgSoft border border-brandNavy/10 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-brandAccent/20 focus:border-brandAccent transition-all resize-none"
          />
          <div className="flex items-center justify-between mt-1">
            {errors.feedback ? (
              <p className="text-red-500 text-xs flex items-center gap-1">
                <HiXCircle className="text-sm" /> {errors.feedback}
              </p>
            ) : (
              <span />
            )}
            <span className={`text-[10px] font-medium ml-auto ${
              feedback.length >= 10 ? 'text-green-500' : 'text-brandTextSec'
            }`}>
              {feedback.length} chars
            </span>
          </div>
        </div>

        {/* ── Would Recommend ──────────────────────────── */}
        <div>
          <FieldLabel>Would You Recommend?</FieldLabel>
          <div className="flex gap-3">
            <button
              type="button"
              onClick={() => setWouldRecommend(true)}
              className={`flex items-center gap-2 px-5 py-3 rounded-xl text-sm font-semibold border transition-all duration-200 ${
                wouldRecommend
                  ? 'bg-green-500 text-white border-green-500 shadow-sm'
                  : 'bg-white text-brandTextSec border-brandNavy/10 hover:border-green-300'
              }`}
            >
              <HiCheckCircle className="text-base" /> Yes, Recommend
            </button>
            <button
              type="button"
              onClick={() => setWouldRecommend(false)}
              className={`flex items-center gap-2 px-5 py-3 rounded-xl text-sm font-semibold border transition-all duration-200 ${
                !wouldRecommend
                  ? 'bg-red-500 text-white border-red-500 shadow-sm'
                  : 'bg-white text-brandTextSec border-brandNavy/10 hover:border-red-300'
              }`}
            >
              <HiXCircle className="text-base" /> No
            </button>
          </div>
        </div>

        {/* ── Submit ───────────────────────────────────── */}
        <motion.button
          whileHover={{ scale: 1.01, y: -1 }}
          whileTap={{ scale: 0.99 }}
          type="submit"
          disabled={submitting}
          className={`w-full py-4 font-bold rounded-2xl transition-all duration-300 shadow-sm text-base flex items-center justify-center gap-2 ${
            submitting
              ? 'bg-brandNavy/50 text-white cursor-not-allowed'
              : 'bg-brandNavy text-white hover:bg-brandMedium hover:shadow-lg'
          }`}
        >
          {submitting ? (
            <>
              <svg className="animate-spin w-4 h-4" viewBox="0 0 24 24" fill="none">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8H4z" />
              </svg>
              Submitting…
            </>
          ) : (
            <>
              <HiStar className="text-amber-300" />
              Submit Review
            </>
          )}
        </motion.button>

        {/* Privacy note */}
        <p className="text-[10px] text-brandTextSec text-center font-medium leading-relaxed">
          Your review will be visible immediately. Reported reviews may be moderated by the admin.
        </p>

      </form>
    </div>
  );
};

export default ReviewForm;
