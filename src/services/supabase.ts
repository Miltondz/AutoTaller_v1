import { createClient } from '@supabase/supabase-js'
import { mockAutomotiveServices } from '../data/mockAutomotiveServices'

const USE_MOCK_DATA = !import.meta.env.VITE_SUPABASE_URL;

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY

// Create a mock client for development with JSON data
const createMockClient = () => {
  // Create a proper thenable mock that resolves to mock data
  const createMockPromise = (data: any = [], single = false) => {
    const promise = Promise.resolve({ 
      data: single ? (data.length > 0 ? data[0] : null) : data, 
      error: null 
    })
    
    // Add chainable methods that return new promises
    const chainable = {
      select: (columns?: string) => createMockPromise(data, single),
      insert: (insertData: any) => createMockPromise([insertData], true),
      update: (updateData: any) => createMockPromise([updateData], single),
      delete: () => createMockPromise([], false),
      upsert: (upsertData: any) => createMockPromise([upsertData], single),
      eq: (column: string, value: any) => createMockPromise(data, single),
      gte: (column: string, value: any) => createMockPromise(data, single),
      lte: (column: string, value: any) => createMockPromise(data, single),
      order: (column: string, options?: any) => createMockPromise(data, single),
      single: () => createMockPromise(data, true),
      maybeSingle: () => createMockPromise(data, true),
      then: promise.then.bind(promise),
      catch: promise.catch.bind(promise),
    }
    
    return Object.assign(promise, chainable)
  }

  return {
    from: (table: string) => {
      switch (table) {
        case 'services':
          return createMockPromise(mockAutomotiveServices)
        default:
          return createMockPromise([])
      }
    },
    auth: {
      signUp: () => Promise.resolve({ data: { user: null }, error: null }),
      signIn: () => Promise.resolve({ data: { user: null }, error: null }),
      signInWithPassword: () => Promise.resolve({ data: { user: null }, error: null }),
      signOut: () => Promise.resolve({ error: null }),
      getUser: () => Promise.resolve({ data: { user: null }, error: null }),
      onAuthStateChange: (callback: any) => ({
        data: { subscription: { unsubscribe: () => {} } }
      }),
    },
    functions: {
      invoke: (name: string, options?: any) => Promise.resolve({ data: null, error: null }),
    },
  }
}

// Use mock client during development, real client for production
export const supabase = USE_MOCK_DATA 
  ? createMockClient()
  : (() => {
      if (!supabaseUrl || !supabaseAnonKey) {
        throw new Error('Missing Supabase environment variables')
      }
      return createClient(supabaseUrl, supabaseAnonKey)
    })()

export default supabase