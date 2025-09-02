import React, { createContext, useContext } from 'react';
import { AuthProvider, AuthContext, AuthContextType } from './AuthContext';
import { MockAuthProvider, MockAuthContext, IMockAuthContextType } from './MockAuthContext';

const USE_MOCK_AUTH = import.meta.env.DEV && !import.meta.env.VITE_SUPABASE_URL;

type UnifiedAuthContextType = AuthContextType | IMockAuthContextType;

const UnifiedAuthContext = createContext<UnifiedAuthContextType | undefined>(undefined);

export const UnifiedAuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const AuthContextProvider = USE_MOCK_AUTH ? MockAuthProvider : AuthProvider;
  return <AuthContextProvider>{children}</AuthContextProvider>;
};

export const useUnifiedAuth = () => {
    const authContext = useContext(AuthContext);
    const mockAuthContext = useContext(MockAuthContext);
    const context = USE_MOCK_AUTH ? mockAuthContext : authContext;
  
    if (context === undefined) {
      throw new Error('useUnifiedAuth must be used within a UnifiedAuthProvider');
    }
  
    return context;
  };
  
