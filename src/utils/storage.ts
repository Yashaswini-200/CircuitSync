/**
 * Safe localStorage utilities with corruption protection
 * Handles JSON parsing, fallbacks, and error recovery
 */

/**
 * Safely save data to localStorage
 * @param key - Storage key
 * @param data - Data to save
 * @returns boolean indicating success
 */
export const saveData = <T>(key: string, data: T): boolean => {
  try {
    if (!key || key.trim() === '') {
      console.warn('saveData: Invalid key provided');
      return false;
    }

    const serialized = JSON.stringify(data);

    // Check for storage quota exceeded
    localStorage.setItem(key, serialized);
    return true;
  } catch (error) {
    if (error instanceof DOMException && error.code === 22) {
      console.error('saveData: localStorage quota exceeded');
    } else {
      console.error('saveData: Failed to serialize or save data', error);
    }
    return false;
  }
};

/**
 * Safely load data from localStorage
 * @param key - Storage key
 * @param fallback - Fallback value if load fails
 * @returns Parsed data or fallback
 */
export const loadData = <T>(key: string, fallback: T): T => {
  try {
    if (!key || key.trim() === '') {
      console.warn('loadData: Invalid key provided');
      return fallback;
    }

    const item = localStorage.getItem(key);

    if (item === null) {
      return fallback;
    }

    // Parse with strict JSON validation
    const parsed = JSON.parse(item) as T;
    return parsed;
  } catch (error) {
    if (error instanceof SyntaxError) {
      console.warn('loadData: Corrupted data in localStorage, using fallback', error);
      // Attempt to remove corrupted data
      try {
        localStorage.removeItem(key);
      } catch (removeError) {
        console.error('loadData: Could not remove corrupted data', removeError);
      }
    } else {
      console.error('loadData: Error loading data', error);
    }
    return fallback;
  }
};

/**
 * Safely remove data from localStorage
 * @param key - Storage key
 * @returns boolean indicating success
 */
export const removeData = (key: string): boolean => {
  try {
    if (!key || key.trim() === '') {
      console.warn('removeData: Invalid key provided');
      return false;
    }

    localStorage.removeItem(key);
    return true;
  } catch (error) {
    console.error('removeData: Failed to remove data', error);
    return false;
  }
};

/**
 * Safely clear all localStorage data (use with caution)
 * @returns boolean indicating success
 */
export const clearAllData = (): boolean => {
  try {
    localStorage.clear();
    return true;
  } catch (error) {
    console.error('clearAllData: Failed to clear localStorage', error);
    return false;
  }
};

/**
 * Verify if localStorage is available
 * @returns boolean indicating availability
 */
export const isStorageAvailable = (): boolean => {
  try {
    const testKey = '__storage_test__';
    localStorage.setItem(testKey, 'test');
    localStorage.removeItem(testKey);
    return true;
  } catch {
    return false;
  }
};
