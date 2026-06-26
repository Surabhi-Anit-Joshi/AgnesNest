// Mock data for AgnesNest application
// pgListings is now sourced from pgData.js (12 full entries)
// This file re-exports for backward compatibility with the Home page

import pgData from './pgData';
export { pgData };
export const pgListings = pgData; // backward compat alias

export const marketplaceItems = [
  {
    id: 1,
    title: "Engineering Mechanics Book",
    price: "₹350",
    condition: "Good Condition",
    pickupLocation: "Kadri, Mangalore",
    seller: "Alya D'Souza",
    image: "https://images.unsplash.com/photo-1543002588-bfa74002ed7e?auto=format&fit=crop&w=600&q=80",
    category: "Books"
  },
  {
    id: 2,
    title: "Wooden Study Table",
    price: "₹1,200",
    condition: "Good Condition",
    pickupLocation: "Kankanady, Mangalore",
    seller: "John Pereira",
    image: "https://images.unsplash.com/photo-1518455027359-f3f8164ba6bd?auto=format&fit=crop&w=600&q=80",
    category: "Furniture"
  },
  {
    id: 3,
    title: "Scientific Calculator (Casio)",
    price: "₹600",
    condition: "Excellent",
    pickupLocation: "Kankanady, Mangalore",
    seller: "Adithya Rao",
    image: "https://images.unsplash.com/photo-1629198688000-71f23e745b6e?auto=format&fit=crop&w=600&q=80",
    category: "Electronics"
  },
  {
    id: 4,
    title: "Single Bed Mattress",
    price: "₹1,000",
    condition: "Good Condition",
    pickupLocation: "Kadri, Mangalore",
    seller: "Melisha Fernandes",
    image: "https://images.unsplash.com/photo-1631049307264-da0ec9d70304?auto=format&fit=crop&w=600&q=80",
    category: "Study Essentials"
  }
];

export const lostFoundItems = [
  {
    id: 1,
    title: "Student ID Card",
    type: "Lost",
    location: "Hampankatta",
    date: "2 hours ago",
    contact: "+91 6361079075",
    image: "https://images.unsplash.com/photo-1578894381163-e72c17f2d45f?auto=format&fit=crop&w=600&q=80"
  },
  {
    id: 2,
    title: "OnePlus Dash Charger",
    type: "Found",
    location: "College Library",
    date: "5 hours ago",
    contact: "+91 7453829103",
    image: "https://images.unsplash.com/photo-1583863788434-e58a36330cf0?auto=format&fit=crop&w=600&q=80"
  },
  {
    id: 3,
    title: "Leather Wallet (Black)",
    type: "Lost",
    location: "College Canteen",
    date: "1 day ago",
    contact: "+91 8839201948",
    image: "https://images.unsplash.com/photo-1627123424574-724758594e93?auto=format&fit=crop&w=600&q=80"
  },
  {
    id: 4,
    title: "Bunch of Keys with Keychain",
    type: "Found",
    location: "St Agnes College Playground",
    date: "2 days ago",
    contact: "+91 9483029104",
    image: "https://images.unsplash.com/photo-1582139329536-e7284fece509?auto=format&fit=crop&w=600&q=80"
  }
];

export const dummyStudent = {
  name: "Jane D'Souza",
  email: "jane@stagnes.edu.in",
  phone: "+91 6361079075",
  avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=facearea&facepad=2&w=256&h=256&q=80"
};
