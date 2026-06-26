import React, { createContext, useContext, useState, useCallback, useEffect } from 'react';
import lostFoundData from '../data/lostFoundData';
import { useAuth } from './AuthContext';

const LostFoundContext = createContext(null);

export const LostFoundProvider = ({ children }) => {
  const { user } = useAuth();

  const [items, setItems] = useState(() => {
    try {
      const saved = localStorage.getItem('agnesnest_lostfound');
      return saved ? JSON.parse(saved) : lostFoundData;
    } catch {
      return lostFoundData;
    }
  });

  useEffect(() => {
    localStorage.setItem('agnesnest_lostfound', JSON.stringify(items));
  }, [items]);

  useEffect(() => {
    if (user && user.id) {
      setItems((prev) => {
        let changed = false;
        const next = prev.map(item => {
          if (item.userId === user.id) {
            changed = true;
            return { ...item, finderName: user.name, phone: user.phone, email: user.email };
          }
          return item;
        });
        return changed ? next : prev;
      });
    }
  }, [user]);

  const addItem = useCallback((item) => {
    const newItem = {
      ...item,
      id: Date.now(),
      status: 'active',
      createdAt: new Date().toISOString(),
    };
    setItems((prev) => [newItem, ...prev]);
    return newItem;
  }, []);

  const getItem = useCallback((id) => {
    return items.find((i) => i.id === parseInt(id));
  }, [items]);

  const updateItemStatus = useCallback((id, status) => {
    setItems((prev) =>
      prev.map((i) => (i.id === id ? { ...i, status } : i))
    );
  }, []);

  const deleteItem = useCallback((id) => {
    setItems((prev) => prev.filter((i) => i.id !== id));
  }, []);

  return (
    <LostFoundContext.Provider value={{ items, addItem, getItem, updateItemStatus, deleteItem }}>
      {children}
    </LostFoundContext.Provider>
  );
};

export const useLostFound = () => {
  const ctx = useContext(LostFoundContext);
  if (!ctx) throw new Error('useLostFound must be used within LostFoundProvider');
  return ctx;
};

export default LostFoundContext;
