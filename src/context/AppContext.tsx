'use client';

import React, { createContext, useContext, useReducer, ReactNode, useEffect } from 'react';
import { getInitialTheme, getInitialAuthState, persistAuthState, applyTheme } from '@/lib/state';

// Define the shape of our application state
export interface AppState {
  theme: 'light' | 'dark';
  activeInvitation: string | null;
  notifications: Array<{
    id: string;
    message: string;
    type: 'success' | 'error' | 'info';
  }>;
  isAuthenticated: boolean;
  userRole: 'ADMIN' | 'USER' | null;
}

// Initialize state with defaults (will be overridden in useEffect)
const initialState: AppState = {
  theme: 'light',
  activeInvitation: null,
  notifications: [],
  isAuthenticated: false,
  userRole: null,
};

// Define action types
type Action =
  | { type: 'SET_THEME'; payload: 'light' | 'dark' }
  | { type: 'SET_ACTIVE_INVITATION'; payload: string | null }
  | { type: 'ADD_NOTIFICATION'; payload: { id: string; message: string; type: 'success' | 'error' | 'info' } }
  | { type: 'REMOVE_NOTIFICATION'; payload: string }
  | { type: 'SET_AUTH_STATUS'; payload: { isAuthenticated: boolean; userRole: 'ADMIN' | 'USER' | null } };

// Create the context with undefined as initial value
export const AppContext = createContext<{
  state: AppState;
  dispatch: React.Dispatch<Action>;
}>({
  state: initialState,
  dispatch: () => null,
});

// Reducer to handle state updates
function appReducer(state: AppState, action: Action): AppState {
  switch (action.type) {
    case 'SET_THEME':
      return { ...state, theme: action.payload };
    case 'SET_ACTIVE_INVITATION':
      return { ...state, activeInvitation: action.payload };
    case 'ADD_NOTIFICATION':
      return {
        ...state,
        notifications: [...state.notifications, action.payload],
      };
    case 'REMOVE_NOTIFICATION':
      return {
        ...state,
        notifications: state.notifications.filter(
          (notification) => notification.id !== action.payload
        ),
      };
    case 'SET_AUTH_STATUS':
      return {
        ...state,
        isAuthenticated: action.payload.isAuthenticated,
        userRole: action.payload.userRole,
      };
    default:
      return state;
  }
}

// AppProvider component
export function AppProvider({ children }: { children: ReactNode }) {
  const [state, dispatch] = useReducer(appReducer, initialState);
  
  // Initialize state from localStorage or other persistent storage
  useEffect(() => {
    // Load theme
    const initialTheme = getInitialTheme();
    dispatch({ type: 'SET_THEME', payload: initialTheme });
    
    // Apply theme to document
    applyTheme(initialTheme);
    
    // Load auth state
    const initialAuthState = getInitialAuthState();
    dispatch({ 
      type: 'SET_AUTH_STATUS', 
      payload: initialAuthState
    });
  }, []);
  
  // Persist auth state changes to localStorage
  useEffect(() => {
    persistAuthState(state.isAuthenticated, state.userRole);
  }, [state.isAuthenticated, state.userRole]);
  
  // Apply theme changes
  useEffect(() => {
    applyTheme(state.theme);
    localStorage.setItem('theme', state.theme);
  }, [state.theme]);

  return (
    <AppContext.Provider value={{ state, dispatch }}>
      {children}
    </AppContext.Provider>
  );
}

// Custom hook to use the AppContext
export const useAppContext = () => useContext(AppContext); 