import { useContext } from 'react'
import { MockAuthContext, IMockAuthContextType } from '../contexts/MockAuthContext'

export function useMockAuth(): IMockAuthContextType {
  const context = useContext(MockAuthContext)
  if (context === undefined) {
    throw new Error('useMockAuth must be used within a MockAuthProvider')
  }
  return context
}