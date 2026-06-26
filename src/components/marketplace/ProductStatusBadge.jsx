import React from 'react';

const STATUS_CONFIG = {
  available: { label: 'Available',  bg: 'bg-green-100',  text: 'text-green-700',  dot: 'bg-green-500' },
  reserved:  { label: 'Reserved',   bg: 'bg-amber-100',  text: 'text-amber-700',  dot: 'bg-amber-500' },
  sold:      { label: 'Sold',       bg: 'bg-red-100',    text: 'text-red-700',    dot: 'bg-red-500' },
};

const ProductStatusBadge = ({ status = 'available', size = 'sm' }) => {
  const cfg = STATUS_CONFIG[status] || STATUS_CONFIG.available;
  const sizeClass = size === 'lg' ? 'text-sm px-3 py-1.5' : 'text-[10px] px-2.5 py-1';
  return (
    <span className={`inline-flex items-center gap-1.5 font-bold rounded-full ${cfg.bg} ${cfg.text} ${sizeClass}`}>
      <span className={`w-1.5 h-1.5 rounded-full ${cfg.dot}`} />
      {cfg.label}
    </span>
  );
};

export default ProductStatusBadge;
