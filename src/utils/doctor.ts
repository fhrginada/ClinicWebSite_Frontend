/**
 * Get the current logged-in doctor ID
 * In a real app, this would come from authentication context or session
 * For now, we'll try to get it from localStorage or use a default
 */
export function getCurrentDoctorId(): number {
  if (typeof window !== 'undefined') {
    const doctorId = localStorage.getItem('doctorId');
    if (doctorId) {
      return parseInt(doctorId, 10);
    }
  }
  // Default to doctor ID 1 for development
  // In production, this should come from authentication
  return 1;
}

