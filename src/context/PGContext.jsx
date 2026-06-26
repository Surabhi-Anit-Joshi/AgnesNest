import React, { createContext, useContext, useState, useCallback } from 'react';
import pgData from '../data/pgData';

const PGContext = createContext(null);

export const PGProvider = ({ children }) => {
  const [pgs, setPgs] = useState(pgData);

  // Add a review to a specific PG and recalculate rating
  const addReview = useCallback((pgId, review) => {
    setPgs(prev =>
      prev.map(pg => {
        if (pg.id !== pgId) return pg;
        const updatedReviews = [review, ...pg.reviews];
        const avgRating = +(
          updatedReviews.reduce((acc, r) => acc + r.rating, 0) / updatedReviews.length
        ).toFixed(1);
        return {
          ...pg,
          reviews: updatedReviews,
          reviewCount: updatedReviews.length,
          rating: avgRating,
        };
      })
    );
  }, []);

  // Get a single PG by id
  const getPG = useCallback((id) => pgs.find(pg => pg.id === parseInt(id)), [pgs]);

  // Top N PGs sorted by rating descending
  const getTopPGs = useCallback((n = 4) =>
    [...pgs].sort((a, b) => b.rating - a.rating).slice(0, n),
    [pgs]
  );

  return (
    <PGContext.Provider value={{ pgs, addReview, getPG, getTopPGs }}>
      {children}
    </PGContext.Provider>
  );
};

export const usePG = () => {
  const ctx = useContext(PGContext);
  if (!ctx) throw new Error('usePG must be used inside PGProvider');
  return ctx;
};

export default PGContext;
