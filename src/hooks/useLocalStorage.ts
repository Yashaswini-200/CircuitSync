/**
 * Custom hook for localStorage integration
 * Provides React state synchronized with localStorage
 * Handles updates, errors, and persistence
 */

import { useState, useCallback } from 'react';
import { saveData, loadData } from '../utils/storage';

/**
 * Hook for syncing state with localStorage
 * @param key - Storage key
 * @param initialValue - Initial value if not in storage
 * @returns [value, setValue] tuple
 */
export const useLocalStorage = <T>(key: string, initialValue: T) => {
  // Load initial value from storage or use provided initial
  const [storedValue, setStoredValue] = useState<T>(() => {
    return loadData<T>(key, initialValue);
  });

  // Callback to set value (updates both state and storage)
  const setValue = useCallback(
    (value: T | ((val: T) => T)) => {
      try {
        // Allow value to be a function like setState
        const valueToStore = value instanceof Function ? value(storedValue) : value;

        // Update state
        setStoredValue(valueToStore);

        // Save to localStorage
        if (!saveData(key, valueToStore)) {
          console.warn(`Failed to save ${key} to localStorage`);
        }
      } catch (error) {
        console.error('useLocalStorage error:', error);
      }
    },
    [key, storedValue]
  );

  return [storedValue, setValue] as const;
};
