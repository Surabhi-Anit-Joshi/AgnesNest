import React from 'react';

const Logo = ({ className = "h-8 w-auto", textClassName = "text-xl font-bold text-brandNavy" }) => {
  return (
    <div className="flex items-center gap-3 select-none">
      {/* House + Graduation Cap Icon */}
      <svg
        className={className}
        viewBox="0 0 48 48"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        {/* Graduation Cap Top */}
        <path
          d="M24 6L6 14L24 22L42 14L24 6Z"
          fill="#3E7BFA"
          stroke="#002B5B"
          strokeWidth="3.5"
          strokeLinejoin="round"
        />
        {/* Cap Tassel */}
        <path
          d="M38 16V25C38 27.5 36.5 28.5 35 28.5"
          stroke="#002B5B"
          strokeWidth="3.5"
          strokeLinecap="round"
        />
        {/* House Body (underneath cap) */}
        <path
          d="M13 22.5V36C13 39.3137 15.6863 42 19 42H29C32.3137 42 35 39.3137 35 36V22.5"
          stroke="#002B5B"
          strokeWidth="3.5"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        {/* Door/Nest Shape */}
        <path
          d="M20 34C20 31.7909 21.7909 30 24 30C26.2091 30 28 31.7909 28 34V42H20V34Z"
          fill="#002B5B"
        />
      </svg>
      {/* Brand Text */}
      <span className={`tracking-tight ${textClassName}`}>
        Agnes<span className="text-brandAccent">Nest</span>
      </span>
    </div>
  );
};

export default Logo;
