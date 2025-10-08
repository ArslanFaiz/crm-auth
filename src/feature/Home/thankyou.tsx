'use client'
import React from 'react';
import { Check } from 'lucide-react';
import { useRouter } from 'next/navigation';

interface ThankyouProps {
  isOpen: boolean;
  onClose: () => void;
}

export const Thankyou: React.FC<ThankyouProps> = ({ isOpen }) => {

  if (!isOpen) return null;

  return (
    <div className="absolute top-[200px] h-[300px] inset-0 flex justify-center z-50">
      <div className="bg-white rounded-lg p-8 max-w-[500px] w-full mx-4 text-center shadow-2xl border border-gray-200">
        <div className="mb-6">
          <div className="w-16 h-16 bg-[#28A745] rounded-full flex items-center justify-center mx-auto mb-4">
            <Check className="w-[50px] h-[50px] text-white radius-non " />
          </div>
          <h2 className="text-2xl text-[50px] font-semibold text-[#3C3C3CE8] mb-2">
            Thank You
          </h2>
          <p className="text-[#3C3C3CE8] text-[18px]">
            To Get The Our Policy
          </p>
        </div>
      </div>
    </div>
  );
};
