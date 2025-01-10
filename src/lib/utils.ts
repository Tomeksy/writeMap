import { type ClassValue, clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function formatFileSize(bytes: number): string {
  if (bytes === 0) return '0 Bytes';
  const k = 1024;
  const sizes = ['Bytes', 'KB', 'MB', 'GB'];
  const i = Math.floor(Math.log(bytes) / Math.log(k));
  return `${parseFloat((bytes / Math.pow(k, i)).toFixed(2))} ${sizes[i]}`;
}

const STORAGE_KEY = 'submissionCount';

// Initialize submission count from localStorage or default to 0
export function getSubmissionCount(): number {
  try {
    const count = localStorage.getItem(STORAGE_KEY);
    if (count === null) return 0;
    const parsed = parseInt(count, 10);
    return isNaN(parsed) ? 0 : parsed;
  } catch (error) {
    console.warn('Error reading submission count from localStorage:', error);
    return 0;
  }
}

// Increment and save submission count
export function incrementSubmissionCount(): number {
  try {
    const currentCount = getSubmissionCount();
    const newCount = currentCount + 1;
    localStorage.setItem(STORAGE_KEY, newCount.toString());
    return newCount;
  } catch (error) {
    console.warn('Error saving submission count to localStorage:', error);
    return getSubmissionCount(); // Return current count if save fails
  }
}

// Reset submission count (useful for testing)
export function resetSubmissionCount(): void {
  try {
    localStorage.setItem(STORAGE_KEY, '0');
  } catch (error) {
    console.warn('Error resetting submission count in localStorage:', error);
  }
}