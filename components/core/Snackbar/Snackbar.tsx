"use client"
import { cn } from '@/lib/utils';
import React, { useEffect } from 'react';
import { useSnackbar } from '../context/SnackbarContext';


const Snackbar: React.FC = () => {
  const { state, dispatch } = useSnackbar();

  // Close the snackbar after 3 seconds
  useEffect(() => {
    if (state.isVisible) {
      const timer = setTimeout(() => {
        dispatch({ type: 'HIDE_SNACKBAR', payload: { message: '', type: 'info' } });
      }, 3000);

      return () => clearTimeout(timer);
    }
  }, [state.isVisible, dispatch]);

  const snackbarClass = cn(
    'fixed top-4 right-4 p-4 rounded-lg shadow-lg transition-all z-[999]',
    {
      'bg-blue-500 text-white': state.type === 'info',
      'bg-green-500 text-white': state.type === 'success',
      'bg-red-500 text-white': state.type === 'error',
      'opacity-100': state.isVisible,
      'opacity-0': !state.isVisible,
      'transform translate-y-0': state.isVisible,
      'transform translate-y-4': !state.isVisible,
    }
  );

  return (
    state.isVisible && (
      <div className={snackbarClass}>
        {state.message}
      </div>
    )
  );
};

export default Snackbar;
