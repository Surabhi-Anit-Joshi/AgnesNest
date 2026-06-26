import React, { useState, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { HiOutlineX, HiOutlinePhotograph, HiOutlineTag, HiCheckCircle, HiXCircle } from 'react-icons/hi';
import { useMarketplace } from '../../context/MarketplaceContext';

const CATEGORIES = ['Books', 'Study Materials', 'Furniture', 'Electronics', 'Kitchen Essentials', 'Room Essentials', 'Cycles', 'Others'];
const CONDITIONS = ['New', 'Like New', 'Good', 'Fair'];
const COURSES = ['BCA', 'B.Com', 'B.Sc', 'B.Tech', 'BBA', 'MCA', 'Other', 'Not Applicable'];
const AVAILABLE_UNTIL_PRESETS = ['Until Semester Ends', 'Until I Vacate PG', '30 June 2026', '31 July 2026', '31 August 2026'];
const PREFERRED_CONTACT = ['WhatsApp', 'Phone', 'Email'];

const DUMMY_SELLER = {
  name: "Jane D'Souza",
  course: 'B.Com',
  year: '3rd Year',
  phone: '+91 6361079075',
  email: 'jane@stagnes.edu.in',
  avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=facearea&facepad=2&w=80&h=80&q=80',
};

const FieldLabel = ({ children, required }) => (
  <label className="block text-[11px] font-bold text-brandNavy uppercase tracking-wider mb-1.5">
    {children}{required && <span className="text-red-400 ml-0.5">*</span>}
  </label>
);

const inputCls = 'w-full text-sm text-brandNavy placeholder-brandTextSec/40 bg-brandBgSoft border border-brandNavy/10 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-brandAccent/20 focus:border-brandAccent transition-all';

const SellItemModal = ({ isOpen, onClose }) => {
  const { addListing } = useMarketplace();

  const [listingType, setListingType] = useState('sell');
  const [images, setImages] = useState([]);
  const [title, setTitle] = useState('');
  const [category, setCategory] = useState('');
  const [description, setDescription] = useState('');
  const [price, setPrice] = useState('');
  const [negotiable, setNegotiable] = useState(false);
  const [condition, setCondition] = useState('');
  const [course, setCourse] = useState('');
  const [pickupLocation, setPickupLocation] = useState('');
  const [availableUntil, setAvailableUntil] = useState('');
  const [preferredContact, setPreferredContact] = useState('WhatsApp');
  const [phone, setPhone] = useState('');
  const [email, setEmail] = useState('');
  const [errors, setErrors] = useState({});
  const [submitting, setSubmitting] = useState(false);
  const [success, setSuccess] = useState(false);
  const fileRef = useRef();

  const handleImageChange = (e) => {
    const files = Array.from(e.target.files).slice(0, 4);
    const urls = files.map(f => URL.createObjectURL(f));
    setImages(prev => [...prev, ...urls].slice(0, 4));
  };

  const removeImage = (i) => setImages(prev => prev.filter((_, idx) => idx !== i));

  const validate = () => {
    const e = {};
    if (!title.trim()) e.title = 'Required';
    if (!category) e.category = 'Required';
    if (!description.trim() || description.length < 20) e.description = 'Write at least 20 characters';
    if (listingType === 'sell' && (!price || isNaN(price) || Number(price) <= 0)) e.price = 'Enter a valid price';
    if (!condition) e.condition = 'Required';
    if (!pickupLocation.trim()) e.pickupLocation = 'Required';
    if (!phone.trim()) e.phone = 'Required';
    if (!email.trim() || !email.includes('@')) e.email = 'Valid email required';
    setErrors(e);
    return Object.keys(e).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!validate()) return;
    setSubmitting(true);

    setTimeout(() => {
      const PLACEHOLDER_IMAGES = [
        'https://images.unsplash.com/photo-1543002588-bfa74002ed7e?auto=format&fit=crop&w=800&q=80',
        'https://images.unsplash.com/photo-1518455027359-f3f8164ba6bd?auto=format&fit=crop&w=800&q=80',
        'https://images.unsplash.com/photo-1629198688000-71f23e745b6e?auto=format&fit=crop&w=800&q=80',
      ];

      addListing({
        title: title.trim(),
        images: images.length > 0 ? images : [PLACEHOLDER_IMAGES[Math.floor(Math.random() * 3)]],
        category,
        description: description.trim(),
        listingType,
        price: listingType === 'sell' ? Number(price) : 0,
        negotiable: listingType === 'sell' ? negotiable : false,
        condition,
        course: course || null,
        pickupLocation: pickupLocation.trim(),
        availableUntil: availableUntil || 'Until further notice',
        preferredContact,
        seller: { ...DUMMY_SELLER, phone: phone || DUMMY_SELLER.phone, email: email || DUMMY_SELLER.email },
      });

      setSubmitting(false);
      setSuccess(true);
      setTimeout(() => { setSuccess(false); onClose(); resetForm(); }, 1800);
    }, 500);
  };

  const resetForm = () => {
    setListingType('sell'); setImages([]); setTitle(''); setCategory('');
    setDescription(''); setPrice(''); setNegotiable(false); setCondition('');
    setCourse(''); setPickupLocation(''); setAvailableUntil('');
    setPreferredContact('WhatsApp'); setPhone(''); setEmail(''); setErrors({});
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/50 backdrop-blur-sm z-40"
            onClick={onClose}
          />

          {/* Modal */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 20 }}
            transition={{ type: 'spring', stiffness: 280, damping: 28 }}
            className="fixed inset-0 z-50 flex items-center justify-center p-4"
            onClick={e => e.stopPropagation()}
          >
            <div className="bg-white rounded-3xl shadow-2xl w-full max-w-2xl max-h-[90vh] overflow-y-auto">

              {/* Header */}
              <div className="sticky top-0 bg-white z-10 flex items-center justify-between px-6 py-5 border-b border-brandNavy/5 rounded-t-3xl">
                <div className="flex items-center gap-3">
                  <div className="w-9 h-9 bg-brandAccent/10 rounded-xl flex items-center justify-center text-brandAccent">
                    <HiOutlineTag className="text-lg" />
                  </div>
                  <div>
                    <p className="font-bold text-brandNavy text-base">Post a Listing</p>
                    <p className="text-[11px] text-brandTextSec font-medium">Sell or give away items to fellow Agnes students</p>
                  </div>
                </div>
                <button onClick={onClose} className="p-2 hover:bg-brandBgSoft rounded-xl transition-colors text-brandTextSec">
                  <HiOutlineX className="text-xl" />
                </button>
              </div>

              {/* Success State */}
              <AnimatePresence>
                {success && (
                  <motion.div
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    className="p-12 flex flex-col items-center gap-4 text-center"
                  >
                    <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center text-green-500 text-4xl">
                      <HiCheckCircle />
                    </div>
                    <h3 className="text-xl font-bold text-brandNavy">Listing Posted!</h3>
                    <p className="text-sm text-brandTextSec">Your item is now live in the Marketplace.</p>
                  </motion.div>
                )}
              </AnimatePresence>

              {!success && (
                <form onSubmit={handleSubmit} className="p-6 flex flex-col gap-5">

                  {/* Listing Type */}
                  <div>
                    <FieldLabel required>Listing Type</FieldLabel>
                    <div className="flex gap-3">
                      {[{ val: 'sell', label: '💰 Sell Item' }, { val: 'free', label: '🎁 Give Away for Free' }].map(({ val, label }) => (
                        <button key={val} type="button" onClick={() => setListingType(val)}
                          className={`flex-1 py-3 rounded-xl text-sm font-bold border transition-all ${
                            listingType === val
                              ? (val === 'sell' ? 'bg-brandNavy text-white border-brandNavy' : 'bg-green-500 text-white border-green-500')
                              : 'bg-brandBgSoft text-brandNavy border-brandNavy/10 hover:border-brandNavy/30'
                          }`}
                        >{label}</button>
                      ))}
                    </div>
                  </div>

                  {/* Image Upload */}
                  <div>
                    <FieldLabel>Photos (up to 4)</FieldLabel>
                    <div className="flex flex-wrap gap-2">
                      {images.map((img, i) => (
                        <div key={i} className="relative w-20 h-20 rounded-xl overflow-hidden border border-brandNavy/10">
                          <img src={img} alt="" className="w-full h-full object-cover" />
                          <button type="button" onClick={() => removeImage(i)}
                            className="absolute top-1 right-1 w-5 h-5 bg-black/60 rounded-full text-white flex items-center justify-center text-xs">
                            <HiOutlineX />
                          </button>
                        </div>
                      ))}
                      {images.length < 4 && (
                        <button type="button" onClick={() => fileRef.current.click()}
                          className="w-20 h-20 rounded-xl border-2 border-dashed border-brandNavy/20 flex flex-col items-center justify-center text-brandTextSec hover:border-brandAccent hover:text-brandAccent transition-colors gap-1">
                          <HiOutlinePhotograph className="text-xl" />
                          <span className="text-[9px] font-bold">Add Photo</span>
                        </button>
                      )}
                    </div>
                    <input ref={fileRef} type="file" accept="image/*" multiple className="hidden" onChange={handleImageChange} />
                  </div>

                  {/* Item Name */}
                  <div>
                    <FieldLabel required>Item Name</FieldLabel>
                    <input type="text" value={title} onChange={e => setTitle(e.target.value)} placeholder="e.g., BCA Semester 1 Books" className={inputCls} />
                    {errors.title && <p className="text-red-500 text-xs mt-1">{errors.title}</p>}
                  </div>

                  {/* Category + Condition */}
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <FieldLabel required>Category</FieldLabel>
                      <select value={category} onChange={e => setCategory(e.target.value)} className={inputCls}>
                        <option value="">Select category</option>
                        {CATEGORIES.map(c => <option key={c}>{c}</option>)}
                      </select>
                      {errors.category && <p className="text-red-500 text-xs mt-1">{errors.category}</p>}
                    </div>
                    <div>
                      <FieldLabel required>Condition</FieldLabel>
                      <select value={condition} onChange={e => setCondition(e.target.value)} className={inputCls}>
                        <option value="">Select condition</option>
                        {CONDITIONS.map(c => <option key={c}>{c}</option>)}
                      </select>
                      {errors.condition && <p className="text-red-500 text-xs mt-1">{errors.condition}</p>}
                    </div>
                  </div>

                  {/* Description */}
                  <div>
                    <FieldLabel required>Description</FieldLabel>
                    <textarea value={description} onChange={e => setDescription(e.target.value)} rows={3}
                      placeholder="Describe the item clearly — condition, why selling, what's included, etc."
                      className={`${inputCls} resize-none`} />
                    {errors.description && <p className="text-red-500 text-xs mt-1">{errors.description}</p>}
                  </div>

                  {/* Price (conditional) */}
                  {listingType === 'sell' && (
                    <div>
                      <FieldLabel required>Price (₹)</FieldLabel>
                      <div className="flex gap-3">
                        <input type="number" value={price} onChange={e => setPrice(e.target.value)} placeholder="e.g., 500" className={`${inputCls} flex-grow`} min="1" />
                        <button type="button" onClick={() => setNegotiable(n => !n)}
                          className={`flex-shrink-0 flex items-center gap-1.5 px-4 py-2.5 rounded-xl text-sm font-bold border transition-all ${
                            negotiable ? 'bg-brandNavy text-white border-brandNavy' : 'bg-brandBgSoft text-brandNavy border-brandNavy/10'
                          }`}>
                          Negotiable
                        </button>
                      </div>
                      {errors.price && <p className="text-red-500 text-xs mt-1">{errors.price}</p>}
                    </div>
                  )}

                  {/* Course + Available Until */}
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <FieldLabel>Course (if applicable)</FieldLabel>
                      <select value={course} onChange={e => setCourse(e.target.value)} className={inputCls}>
                        <option value="">Not applicable</option>
                        {COURSES.map(c => <option key={c}>{c}</option>)}
                      </select>
                    </div>
                    <div>
                      <FieldLabel>Available Until</FieldLabel>
                      <select value={availableUntil} onChange={e => setAvailableUntil(e.target.value)} className={inputCls}>
                        <option value="">Select or type below</option>
                        {AVAILABLE_UNTIL_PRESETS.map(p => <option key={p}>{p}</option>)}
                      </select>
                    </div>
                  </div>

                  {/* Pickup Location */}
                  <div>
                    <FieldLabel required>Pickup Location</FieldLabel>
                    <input type="text" value={pickupLocation} onChange={e => setPickupLocation(e.target.value)} placeholder="e.g., Kankanady, Mangalore" className={inputCls} />
                    {errors.pickupLocation && <p className="text-red-500 text-xs mt-1">{errors.pickupLocation}</p>}
                  </div>

                  {/* Contact */}
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <FieldLabel required>Phone Number</FieldLabel>
                      <input type="tel" value={phone} onChange={e => setPhone(e.target.value)} placeholder="+91 XXXXX XXXXX" className={inputCls} />
                      {errors.phone && <p className="text-red-500 text-xs mt-1">{errors.phone}</p>}
                    </div>
                    <div>
                      <FieldLabel required>Email</FieldLabel>
                      <input type="email" value={email} onChange={e => setEmail(e.target.value)} placeholder="you@stagnes.edu.in" className={inputCls} />
                      {errors.email && <p className="text-red-500 text-xs mt-1">{errors.email}</p>}
                    </div>
                  </div>

                  {/* Preferred Contact */}
                  <div>
                    <FieldLabel>Preferred Contact Method</FieldLabel>
                    <div className="flex gap-2">
                      {PREFERRED_CONTACT.map(p => (
                        <button key={p} type="button" onClick={() => setPreferredContact(p)}
                          className={`flex-1 py-2.5 rounded-xl text-xs font-bold border transition-all ${
                            preferredContact === p ? 'bg-brandNavy text-white border-brandNavy' : 'bg-brandBgSoft text-brandNavy border-brandNavy/10'
                          }`}>{p}</button>
                      ))}
                    </div>
                  </div>

                  {/* Actions */}
                  <div className="flex gap-3 pt-2">
                    <button type="button" onClick={onClose}
                      className="flex-1 py-3.5 border border-brandNavy/15 rounded-2xl text-brandNavy font-bold hover:border-brandNavy/40 transition-colors text-sm">
                      Cancel
                    </button>
                    <motion.button whileHover={{ scale: 1.01 }} whileTap={{ scale: 0.99 }} type="submit" disabled={submitting}
                      className={`flex-[2] py-3.5 font-bold rounded-2xl text-sm transition-all ${
                        submitting ? 'bg-brandNavy/50 text-white cursor-not-allowed' : 'bg-brandNavy text-white hover:bg-brandMedium shadow-sm hover:shadow-md'
                      }`}>
                      {submitting ? 'Posting…' : '🚀 Post Listing'}
                    </motion.button>
                  </div>
                </form>
              )}
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
};

export default SellItemModal;
