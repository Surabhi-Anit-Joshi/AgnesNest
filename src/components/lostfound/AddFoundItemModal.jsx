import React, { useState, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { HiOutlineX, HiOutlinePhotograph, HiOutlineSparkles, HiCheckCircle } from 'react-icons/hi';
import { useLostFound } from '../../context/LostFoundContext';

const FieldLabel = ({ children, required }) => (
  <label className="block text-[11px] font-bold text-brandNavy uppercase tracking-wider mb-1.5">
    {children}{required && <span className="text-red-400 ml-0.5">*</span>}
  </label>
);

const inputCls = 'w-full text-sm text-brandNavy placeholder-brandTextSec/40 bg-brandBgSoft border border-brandNavy/10 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-brandAccent/20 focus:border-brandAccent transition-all';

const AddFoundItemModal = ({ isOpen, onClose }) => {
  const { addItem } = useLostFound();
  
  const [image, setImage] = useState('');
  const [itemName, setItemName] = useState('');
  const [description, setDescription] = useState('');
  const [foundLocation, setFoundLocation] = useState('');
  const [foundDate, setFoundDate] = useState('');
  const [finderName, setFinderName] = useState('');
  const [phone, setPhone] = useState('');
  const [email, setEmail] = useState('');
  const [errors, setErrors] = useState({});
  const [submitting, setSubmitting] = useState(false);
  const [success, setSuccess] = useState(false);
  
  const fileRef = useRef();

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setImage(URL.createObjectURL(file));
    }
  };

  const validate = () => {
    const e = {};
    if (!itemName.trim()) e.itemName = 'Required';
    if (!description.trim() || description.length < 10) e.description = 'Write at least 10 characters';
    if (!foundLocation.trim()) e.foundLocation = 'Required';
    if (!foundDate.trim()) e.foundDate = 'Required';
    if (!finderName.trim()) e.finderName = 'Required';
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
      const placeholderImg = 'https://images.unsplash.com/photo-1544816155-12df9643f363?auto=format&fit=crop&w=800&q=80';
      
      addItem({
        itemName: itemName.trim(),
        image: image || placeholderImg,
        description: description.trim(),
        foundLocation: foundLocation.trim(),
        foundDate: foundDate.trim(),
        finderName: finderName.trim(),
        phone: phone.trim(),
        email: email.trim(),
      });

      setSubmitting(false);
      setSuccess(true);
      setTimeout(() => { setSuccess(false); onClose(); resetForm(); }, 1800);
    }, 500);
  };

  const resetForm = () => {
    setImage(''); setItemName(''); setDescription(''); setFoundLocation('');
    setFoundDate(''); setFinderName(''); setPhone(''); setEmail(''); setErrors({});
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          <motion.div
            initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/50 backdrop-blur-sm z-40"
            onClick={onClose}
          />

          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 20 }}
            transition={{ type: 'spring', stiffness: 280, damping: 28 }}
            className="fixed inset-0 z-50 flex items-center justify-center p-4"
            onClick={e => e.stopPropagation()}
          >
            <div className="bg-white rounded-3xl shadow-2xl w-full max-w-xl max-h-[90vh] overflow-y-auto">

              {/* Header */}
              <div className="sticky top-0 bg-white z-10 flex items-center justify-between px-6 py-5 border-b border-brandNavy/5 rounded-t-3xl">
                <div className="flex items-center gap-3">
                  <div className="w-9 h-9 bg-brandAccent/10 rounded-xl flex items-center justify-center text-brandAccent">
                    <HiOutlineSparkles className="text-lg" />
                  </div>
                  <div>
                    <p className="font-bold text-brandNavy text-base">Post Found Item</p>
                    <p className="text-[11px] text-brandTextSec font-medium">Help someone recover their lost belonging.</p>
                  </div>
                </div>
                <button onClick={onClose} className="p-2 hover:bg-brandBgSoft rounded-xl transition-colors text-brandTextSec">
                  <HiOutlineX className="text-xl" />
                </button>
              </div>

              {/* Success */}
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
                    <h3 className="text-xl font-bold text-brandNavy">Item Posted Successfully!</h3>
                    <p className="text-sm text-brandTextSec">Thank you for helping the AgnesNest community.</p>
                  </motion.div>
                )}
              </AnimatePresence>

              {!success && (
                <form onSubmit={handleSubmit} className="p-6 flex flex-col gap-5">
                  
                  {/* Image Upload */}
                  <div>
                    <FieldLabel>Item Photo</FieldLabel>
                    <div className="flex gap-3">
                      {image ? (
                        <div className="relative w-24 h-24 rounded-xl overflow-hidden border border-brandNavy/10">
                          <img src={image} alt="Preview" className="w-full h-full object-cover" />
                          <button type="button" onClick={() => setImage('')}
                            className="absolute top-1 right-1 w-6 h-6 bg-black/60 rounded-full text-white flex items-center justify-center text-xs">
                            <HiOutlineX />
                          </button>
                        </div>
                      ) : (
                        <button type="button" onClick={() => fileRef.current.click()}
                          className="w-24 h-24 rounded-xl border-2 border-dashed border-brandNavy/20 flex flex-col items-center justify-center text-brandTextSec hover:border-brandAccent hover:text-brandAccent transition-colors gap-1">
                          <HiOutlinePhotograph className="text-2xl" />
                          <span className="text-[10px] font-bold">Add Photo</span>
                        </button>
                      )}
                      <input ref={fileRef} type="file" accept="image/*" className="hidden" onChange={handleImageChange} />
                    </div>
                  </div>

                  {/* Item Details */}
                  <div>
                    <FieldLabel required>Item Name</FieldLabel>
                    <input type="text" value={itemName} onChange={e => setItemName(e.target.value)} placeholder="e.g., Blue Titan Watch" className={inputCls} />
                    {errors.itemName && <p className="text-red-500 text-xs mt-1">{errors.itemName}</p>}
                  </div>

                  <div>
                    <FieldLabel required>Description</FieldLabel>
                    <textarea value={description} onChange={e => setDescription(e.target.value)} rows={3}
                      placeholder="Any specific marks, color, or details that help identify the item."
                      className={`${inputCls} resize-none`} />
                    {errors.description && <p className="text-red-500 text-xs mt-1">{errors.description}</p>}
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <FieldLabel required>Found Location</FieldLabel>
                      <input type="text" value={foundLocation} onChange={e => setFoundLocation(e.target.value)} placeholder="e.g., Canteen, Library" className={inputCls} />
                      {errors.foundLocation && <p className="text-red-500 text-xs mt-1">{errors.foundLocation}</p>}
                    </div>
                    <div>
                      <FieldLabel required>Found Date</FieldLabel>
                      <input type="text" value={foundDate} onChange={e => setFoundDate(e.target.value)} placeholder="e.g., 26 June 2026" className={inputCls} />
                      {errors.foundDate && <p className="text-red-500 text-xs mt-1">{errors.foundDate}</p>}
                    </div>
                  </div>

                  {/* Contact Details */}
                  <div className="pt-4 border-t border-brandNavy/5">
                    <h3 className="font-bold text-brandNavy text-sm mb-4">Your Contact Details</h3>
                    <div className="flex flex-col gap-4">
                      <div>
                        <FieldLabel required>Your Name</FieldLabel>
                        <input type="text" value={finderName} onChange={e => setFinderName(e.target.value)} placeholder="e.g., Riya D'Souza" className={inputCls} />
                        {errors.finderName && <p className="text-red-500 text-xs mt-1">{errors.finderName}</p>}
                      </div>
                      <div className="grid grid-cols-2 gap-4">
                        <div>
                          <FieldLabel required>Phone Number</FieldLabel>
                          <input type="tel" value={phone} onChange={e => setPhone(e.target.value)} placeholder="+91 XXXXX XXXXX" className={inputCls} />
                          {errors.phone && <p className="text-red-500 text-xs mt-1">{errors.phone}</p>}
                        </div>
                        <div>
                          <FieldLabel required>Email Address</FieldLabel>
                          <input type="email" value={email} onChange={e => setEmail(e.target.value)} placeholder="you@stagnes.edu.in" className={inputCls} />
                          {errors.email && <p className="text-red-500 text-xs mt-1">{errors.email}</p>}
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Actions */}
                  <div className="flex gap-3 pt-4">
                    <button type="button" onClick={onClose}
                      className="flex-1 py-3.5 border border-brandNavy/15 rounded-2xl text-brandNavy font-bold hover:border-brandNavy/40 transition-colors text-sm">
                      Cancel
                    </button>
                    <motion.button whileHover={{ scale: 1.01 }} whileTap={{ scale: 0.99 }} type="submit" disabled={submitting}
                      className={`flex-[2] py-3.5 font-bold rounded-2xl text-sm transition-all ${
                        submitting ? 'bg-brandNavy/50 text-white cursor-not-allowed' : 'bg-brandNavy text-white hover:bg-brandMedium shadow-sm hover:shadow-md'
                      }`}>
                      {submitting ? 'Posting...' : 'Post Item'}
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

export default AddFoundItemModal;
