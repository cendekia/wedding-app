/**
 * State management utility functions
 * These functions help with initializing and synchronizing state with localStorage and server
 */

// Load theme from localStorage
export function getInitialTheme(): 'light' | 'dark' {
  if (typeof window === 'undefined') {
    return 'light'; // Default to light theme on server
  }
  
  const savedTheme = localStorage.getItem('theme');
  
  // Check if user has a preference
  if (savedTheme === 'light' || savedTheme === 'dark') {
    return savedTheme;
  }
  
  // Check for system preference
  if (window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches) {
    return 'dark';
  }
  
  // Default to light theme
  return 'light';
}

// Load authentication state from localStorage or cookies
export function getInitialAuthState(): { isAuthenticated: boolean; userRole: 'ADMIN' | 'USER' | null } {
  if (typeof window === 'undefined') {
    return { isAuthenticated: false, userRole: null };
  }
  
  try {
    const authData = localStorage.getItem('authState');
    if (authData) {
      const parsedData = JSON.parse(authData);
      return {
        isAuthenticated: Boolean(parsedData.isAuthenticated),
        userRole: parsedData.userRole === 'ADMIN' || parsedData.userRole === 'USER' 
          ? parsedData.userRole 
          : null
      };
    }
  } catch (error) {
    console.error('Error loading auth state from localStorage:', error);
  }
  
  return { isAuthenticated: false, userRole: null };
}

// Persist authentication state to localStorage
export function persistAuthState(isAuthenticated: boolean, userRole: 'ADMIN' | 'USER' | null): void {
  if (typeof window === 'undefined') {
    return;
  }
  
  try {
    localStorage.setItem('authState', JSON.stringify({ isAuthenticated, userRole }));
  } catch (error) {
    console.error('Error saving auth state to localStorage:', error);
  }
}

// Clear all app state from localStorage
export function clearPersistedState(): void {
  if (typeof window === 'undefined') {
    return;
  }
  
  try {
    localStorage.removeItem('theme');
    localStorage.removeItem('authState');
  } catch (error) {
    console.error('Error clearing persisted state:', error);
  }
}

// Helper function to apply theme class to document
export function applyTheme(theme: 'light' | 'dark'): void {
  if (typeof window === 'undefined' || !document) {
    return;
  }

  if (theme === 'dark') {
    document.documentElement.classList.add('dark');
  } else {
    document.documentElement.classList.remove('dark');
  }
} 