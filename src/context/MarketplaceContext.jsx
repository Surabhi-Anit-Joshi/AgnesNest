import React, { createContext, useContext, useState, useCallback, useEffect } from 'react';
import marketplaceData from '../data/marketplaceData';
import { useAuth } from './AuthContext';

const MarketplaceContext = createContext(null);

export const MarketplaceProvider = ({ children }) => {
  const { user } = useAuth();
  
  const [listings, setListings] = useState(() => {
    try {
      const saved = localStorage.getItem('agnesnest_marketplace');
      return saved ? JSON.parse(saved) : marketplaceData;
    } catch {
      return marketplaceData;
    }
  });

  const [wishlist, setWishlist] = useState(() => {
    try {
      const saved = localStorage.getItem('agnesnest_wishlist');
      return saved ? JSON.parse(saved) : [];
    } catch {
      return [];
    }
  });

  useEffect(() => {
    localStorage.setItem('agnesnest_marketplace', JSON.stringify(listings));
  }, [listings]);

  // Sync listings when user profile updates
  useEffect(() => {
    if (user && user.id) {
      setListings((prev) => {
        let changed = false;
        const next = prev.map(l => {
          if (l.seller && l.seller.id === user.id) {
            changed = true;
            return { ...l, seller: { ...user, phone: l.seller.phone, email: l.seller.email } }; // Preserve specific listing contact if different, or just overwrite with user's current info? Requirements say "immediately appear everywhere", so we overwrite.
          }
          return l;
        });
        
        // Actually let's just overwrite with the full user object to ensure everything is in sync
        const nextSync = prev.map(l => {
          if (l.seller && l.seller.id === user.id) {
            changed = true;
            return { ...l, seller: { ...user } };
          }
          return l;
        });
        
        return changed ? nextSync : prev;
      });
    }
  }, [user]);

  useEffect(() => {
    localStorage.setItem('agnesnest_wishlist', JSON.stringify(wishlist));
  }, [wishlist]);

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
