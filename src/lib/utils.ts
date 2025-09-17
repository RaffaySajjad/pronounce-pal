// See PRD Section 4: Scope — MVP Features
// Utility functions for PronouncePal

/**
 * Format duration in minutes to human-readable string
 */
export const formatDuration = (minutes: number): string => {
  if (minutes < 60) {
    return `${minutes} min`;
  }
  
  const hours = Math.floor(minutes / 60);
  const remainingMinutes = minutes % 60;
  
  if (remainingMinutes === 0) {
    return `${hours}h`;
  }
  
  return `${hours}h ${remainingMinutes}min`;
};

/**
 * Format date to relative time (e.g., "2 days ago")
 */
export const formatRelativeTime = (date: Date): string => {
  const now = new Date();
  const diffInSeconds = Math.floor((now.getTime() - date.getTime()) / 1000);
  
  if (diffInSeconds < 60) {
    return 'Just now';
  }
  
  const diffInMinutes = Math.floor(diffInSeconds / 60);
  if (diffInMinutes < 60) {
    return `${diffInMinutes} min ago`;
  }
  
  const diffInHours = Math.floor(diffInMinutes / 60);
  if (diffInHours < 24) {
    return `${diffInHours}h ago`;
  }
  
  const diffInDays = Math.floor(diffInHours / 24);
  if (diffInDays < 7) {
    return `${diffInDays} days ago`;
  }
  
  return date.toLocaleDateString();
};

/**
 * Calculate pronunciation accuracy percentage
 */
export const calculateAccuracy = (mistakes: number, totalWords: number): number => {
  if (totalWords === 0) return 100;
  return Math.max(0, Math.round(((totalWords - mistakes) / totalWords) * 100));
};

/**
 * Get difficulty color for UI consistency
 */
export const getDifficultyColor = (difficulty: 'beginner' | 'intermediate' | 'advanced'): string => {
  switch (difficulty) {
    case 'beginner':
      return '#10b981'; // Green
    case 'intermediate':
      return '#f59e0b'; // Orange
    case 'advanced':
      return '#ef4444'; // Red
    default:
      return '#6b7280'; // Gray
  }
};

/**
 * Validate email format
 */
export const isValidEmail = (email: string): boolean => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
};

/**
 * Generate random ID for temporary use
 */
export const generateId = (prefix: string = 'id'): string => {
  return `${prefix}-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`;
};

/**
 * Debounce function for performance optimization
 */
export const debounce = <T extends (...args: any[]) => any>(
  func: T,
  wait: number
): ((...args: Parameters<T>) => void) => {
  let timeout: ReturnType<typeof setTimeout>;
  
  return (...args: Parameters<T>) => {
    clearTimeout(timeout);
    timeout = setTimeout(() => func(...args), wait);
  };
};

/**
 * Clamp a number between min and max values
 */
export const clamp = (value: number, min: number, max: number): number => {
  return Math.min(Math.max(value, min), max);
};

/**
 * Convert phonetic symbols to more readable format
 */
export const formatPhonetic = (phonetic: string): string => {
  // TODO: Implement phonetic symbol formatting
  return phonetic;
};

/**
 * Check if device has microphone permission
 */
export const checkMicrophonePermission = async (): Promise<boolean> => {
  // TODO: Implement actual permission check
  // This would use react-native-permissions or similar
  console.log('Checking microphone permission...');
  return true;
};

/**
 * Request microphone permission
 */
export const requestMicrophonePermission = async (): Promise<boolean> => {
  // TODO: Implement actual permission request
  // This would use react-native-permissions or similar
  console.log('Requesting microphone permission...');
  return true;
};

/**
 * Log analytics event (placeholder)
 */
export const logEvent = (eventName: string, parameters?: Record<string, any>): void => {
  // TODO: Implement analytics tracking
  console.log('Analytics event:', eventName, parameters);
};

/**
 * Handle API errors consistently
 */
export const handleAPIError = (error: any): string => {
  if (typeof error === 'string') {
    return error;
  }
  
  if (error?.message) {
    return error.message;
  }
  
  return 'An unexpected error occurred. Please try again.';
};
