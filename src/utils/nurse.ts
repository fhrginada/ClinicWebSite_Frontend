/**
 * Get the current logged-in nurse ID
 * In a real app, this would come from authentication context or session
 * For now, we'll try to get it from localStorage or use a default
 */
export function getCurrentNurseId(): number {
  if (typeof window !== 'undefined') {
    const nurseId = localStorage.getItem('nurseId');
    if (nurseId) {
      return parseInt(nurseId, 10);
    }
  }
  // Default to nurse ID 1 for development
  // In production, this should come from authentication
  return 1;
}

