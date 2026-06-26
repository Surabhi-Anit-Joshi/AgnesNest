import React, { createContext, useContext, useState, useCallback } from 'react';
import lostFoundData from '../data/lostFoundData';

const LostFoundContext = createContext(null);

export const LostFoundProvider = ({ children }) => {
  const [items, setItems] = useState(lostFoundData);

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

  return (
    <LostFoundContext.Provider value={{ items, addItem, getItem }}>
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
