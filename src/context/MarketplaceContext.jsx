import React, { createContext, useContext, useState, useCallback } from 'react';
import marketplaceData from '../data/marketplaceData';

const MarketplaceContext = createContext(null);

export const MarketplaceProvider = ({ children }) => {
  const [listings, setListings] = useState(marketplaceData);
  const [wishlist, setWishlist] = useState([]); // array of listing ids

  // Get a single listing by id
  const getListing = useCallback(
    (id) => listings.find((l) => l.id === parseInt(id)),
    [listings]
  );

  // Add a new listing (from Sell Item form)
  const addListing = useCallback((listing) => {
    const newItem = {
      ...listing,
      id: Date.now(),
      status: 'available',
      postedDate: 'Just now',
      createdAt: new Date().toISOString(),
      wishlistedBy: [],
    };
    setListings((prev) => [newItem, ...prev]);
    return newItem.id;
  }, []);

  // Update listing status: 'available' | 'reserved' | 'sold'
  const updateStatus = useCallback((id, status) => {
    setListings((prev) =>
      prev.map((l) =>
        l.id === id
          ? { ...l, status, soldAt: status === 'sold' ? new Date().toISOString() : l.soldAt }
          : l
      )
    );
  }, []);

  // Delete a listing
  const deleteListing = useCallback((id) => {
    setListings((prev) => prev.filter((l) => l.id !== id));
  }, []);

  // Toggle wishlist
  const toggleWishlist = useCallback((id) => {
    setWishlist((prev) =>
      prev.includes(id) ? prev.filter((wId) => wId !== id) : [...prev, id]
    );
  }, []);

  const isWishlisted = useCallback((id) => wishlist.includes(id), [wishlist]);

  // Recently sold (within 24h simulation — show last 4 sold items)
  const recentlySold = listings.filter((l) => l.status === 'sold').slice(0, 4);

  // Active listings (not sold)
  const activeListings = listings.filter((l) => l.status !== 'sold');

  return (
    <MarketplaceContext.Provider
      value={{
        listings,
        activeListings,
        recentlySold,
        getListing,
        addListing,
        updateStatus,
        deleteListing,
        toggleWishlist,
        isWishlisted,
        wishlist,
      }}
    >
      {children}
    </MarketplaceContext.Provider>
  );
};

export const useMarketplace = () => {
  const ctx = useContext(MarketplaceContext);
  if (!ctx) throw new Error('useMarketplace must be used inside MarketplaceProvider');
  return ctx;
};

export default MarketplaceContext;
