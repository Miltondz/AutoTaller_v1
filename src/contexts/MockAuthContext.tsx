import React, { useState, createContext } from 'react';
import { User } from '../types';

export interface IMockAuthContextType {
  user: User | null
  loading: boolean
  signIn: (email: string, password: string) => Promise<void>
  signOut: () => Promise<void>
}

export const MockAuthContext = createContext<IMockAuthContextType | undefined>(undefined)

// Demo users for testing
const DEMO_USERS = {
  'admin@autotallerpro.com': {
    id: '1',
    email: 'admin@autotallerpro.com',
    name: 'Administrador',
    role: 'admin' as const,
    password: 'admin123'
  },
  'mecanico@autotallerpro.com': {
    id: '2',
    email: 'mecanico@autotallerpro.com',
    name: 'Usuario de Taller',
    role: 'mechanic' as const,
    password: 'mecanico123'
  }
}

export function MockAuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null)
  const [loading, setLoading] = useState(false)

  const signIn = async (email: string, password: string) => {
    setLoading(true)
    
    // Simulate API delay
    await new Promise(resolve => setTimeout(resolve, 1000))
    
    const demoUser = DEMO_USERS[email as keyof typeof DEMO_USERS]
    
    if (demoUser && demoUser.password === password) {
      const { password: _, ...userWithoutPassword } = demoUser
      setUser(userWithoutPassword)
      localStorage.setItem('mockUser', JSON.stringify(userWithoutPassword))
    } else {
      throw new Error('Credenciales inválidas. Usa admin@example.com o user@example.com con la contraseña 123456')
    }
    
    setLoading(false)
  }

  const signOut = async () => {
    setUser(null)
    localStorage.removeItem('mockUser')
  }

  // Load user from localStorage on mount
  React.useEffect(() => {
    const savedUser = localStorage.getItem('mockUser')
    if (savedUser) {
      try {
        setUser(JSON.parse(savedUser))
      } catch (error) {
        console.error('Error loading saved user:', error)
        localStorage.removeItem('mockUser')
      }
    }
  }, [])

  return (
    <MockAuthContext.Provider value={{ user, loading, signIn, signOut }}>
      {children}
    </MockAuthContext.Provider>
  )
}