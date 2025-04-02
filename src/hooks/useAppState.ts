'use client';

import { useAppContext } from '@/context/AppContext';
import { applyTheme } from '@/lib/state';

/**
 * Custom hook for accessing and managing application state
 * Provides utility functions for common state operations
 */
export function useAppState() {
  const { state, dispatch } = useAppContext();

  // Theme management
  const setTheme = (theme: 'light' | 'dark') => {
    dispatch({ type: 'SET_THEME', payload: theme });
  };

  const toggleTheme = () => {
    const newTheme = state.theme === 'light' ? 'dark' : 'light';
    setTheme(newTheme);
  };

  // Invitation management
  const setActiveInvitation = (invitationId: string | null) => {
    dispatch({ type: 'SET_ACTIVE_INVITATION', payload: invitationId });
  };

  // Notification management
  const addNotification = (
    message: string,
    type: 'success' | 'error' | 'info' = 'info'
  ) => {
    const id = Date.now().toString();
    
    dispatch({
      type: 'ADD_NOTIFICATION',
      payload: { id, message, type },
    });

    // Auto-remove notification after 5 seconds
    setTimeout(() => {
      removeNotification(id);
    }, 5000);
    
    return id;
  };

  const removeNotification = (id: string) => {
    dispatch({ type: 'REMOVE_NOTIFICATION', payload: id });
  };

  // Authentication management
  const setAuthStatus = (
    isAuthenticated: boolean,
    userRole: 'ADMIN' | 'USER' | null
  ) => {
    dispatch({
      type: 'SET_AUTH_STATUS',
      payload: { isAuthenticated, userRole },
    });
  };

  return {
    // Current state
    theme: state.theme,
    activeInvitation: state.activeInvitation,
    notifications: state.notifications,
    isAuthenticated: state.isAuthenticated,
    userRole: state.userRole,

    // Utility functions
    setTheme,
    toggleTheme,
    setActiveInvitation,
    addNotification,
    removeNotification,
    setAuthStatus,
  };
} 