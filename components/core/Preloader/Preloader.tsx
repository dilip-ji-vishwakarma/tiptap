import React from 'react';

export const Preloader = () => {
  return (
    <div className="fixed inset-0 flex items-center justify-center bg-white z-50">
      <div className="w-16 h-16 border-4 border-black border-t-transparent rounded-full animate-spin"></div>
    </div>
  );
};

