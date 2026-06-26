import React, { createContext, useContext, useState, useEffect } from 'react';

const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(() => {
    try {
      const savedUser = localStorage.getItem('agnesnest_user');
      return savedUser ? JSON.parse(savedUser) : null;
    } catch {
      return null;
    }
  });

  useEffect(() => {
    if (user) {
      localStorage.setItem('agnesnest_user', JSON.stringify(user));
    } else {
      localStorage.removeItem('agnesnest_user');
    }
  }, [user]);

  const login = (userData) => {
    // Merge default dummy data if not provided
    const userToSave = {
      id: userData.id || 'user_' + Date.now(),
      name: userData.name || "Jane D'Souza",
      email: userData.email || "jane@stagnes.edu.in",
      course: userData.course || "B.Com",
      year: userData.year || "3rd Year",
      phone: userData.phone || "+91 6361079075",
      avatar: userData.avatar || "https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=facearea&facepad=2&w=80&h=80&q=80",
      bio: userData.bio || "Hi, I'm a student at St Agnes College.",
    };
    setUser(userToSave);
  };

  const logout = () => {
    setUser(null);
  };

  const updateProfile = (updates) => {
    setUser(prev => ({ ...prev, ...updates }));
  };

  return (
    <AuthContext.Provider value={{ user, login, logout, updateProfile }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

export default AuthContext;
