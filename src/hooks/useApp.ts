/**
 * Custom hook for accessing app context
 * Provides type-safe context consumption
 */

import { useContext } from 'react';
import { AppContext } from '../context/AppContext';
import type { AppContextType } from '../types/index';

export const useApp = (): AppContextType => {
  const context = useContext(AppContext);

  if (!context) {
    throw new Error('useApp must be used within AppProvider');
  }

  return context;
};
