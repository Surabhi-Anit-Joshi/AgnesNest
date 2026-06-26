import React from 'react';
import { FiWifi, FiCoffee, FiDroplet, FiZap, FiCamera, FiTruck } from 'react-icons/fi';
import {
  HiOutlineCheckCircle, HiOutlineXCircle,
  HiOutlineBookOpen, HiOutlineArchive, HiOutlineHome, HiOutlineShieldCheck,
} from 'react-icons/hi';
import { MdLocalLaundryService } from 'react-icons/md';

// Facility definitions — icons must be declared after their components are resolved
const facilityConfig = {
  wifi:             { label: 'WiFi',             icon: <FiWifi /> },
  food:             { label: 'Food / Mess',       icon: <FiCoffee /> },
  laundry:          { label: 'Laundry',           icon: <MdLocalLaundryService /> },
  parking:          { label: 'Parking',           icon: <FiTruck /> },
  hotWater:         { label: 'Hot Water',         icon: <FiDroplet /> },
  powerBackup:      { label: 'Power Backup',      icon: <FiZap /> },
  attachedBathroom: { label: 'Attached Bathroom', icon: <HiOutlineHome /> },
  cupboard:         { label: 'Cupboard',          icon: <HiOutlineArchive /> },
  studyTable:       { label: 'Study Table',       icon: <HiOutlineBookOpen /> },
  roWater:          { label: 'RO Water',          icon: <FiDroplet /> },
  housekeeping:     { label: 'Housekeeping',      icon: <HiOutlineHome /> },
  security24x7:     { label: '24×7 Security',     icon: <HiOutlineShieldCheck /> },
  cctv:             { label: 'CCTV',              icon: <FiCamera /> },
};

const FacilityBadge = ({ facilities = {} }) => {
  return (
    <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3">
      {Object.entries(facilityConfig).map(([key, { label, icon }]) => {
        const available = facilities[key] === true;
        return (
          <div
            key={key}
            className={`flex items-center gap-2.5 px-3 py-2.5 rounded-xl border text-sm font-medium transition-all ${
              available
                ? 'bg-brandAccent/5 border-brandAccent/20 text-brandNavy'
                : 'bg-gray-50 border-gray-100 text-gray-300'
            }`}
          >
            <span className={`text-base flex-shrink-0 ${available ? 'text-brandAccent' : 'text-gray-300'}`}>
              {icon}
            </span>
            <span className={`text-xs leading-tight ${available ? 'text-brandNavy font-semibold' : 'text-gray-300 line-through'}`}>
              {label}
            </span>
            <span className="ml-auto flex-shrink-0">
              {available
                ? <HiOutlineCheckCircle className="text-green-500 text-sm" />
                : <HiOutlineXCircle className="text-gray-200 text-sm" />
              }
            </span>
          </div>
        );
      })}
    </div>
  );
};

export default FacilityBadge;
