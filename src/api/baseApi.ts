import { supabase } from '../services/supabase'

export function createSupabaseApi<T>(tableName: string) {
  return {
    async getAll(): Promise<T[]> {
      const { data, error } = await supabase
        .from(tableName)
        .select('*')
        .order('created_at', { ascending: false }) as { data: T[]; error: any }

      if (error) throw error
      return data || []
    },

    async getById(id: string): Promise<T | null> {
      const { data, error } = await supabase
        .from(tableName)
        .select('*')
        .eq('id', id)
        .maybeSingle() as { data: T | null; error: any }

      if (error) throw error
      return data
    },

    async create(itemData: Omit<T, 'id' | 'created_at' | 'updated_at'>): Promise<T> {
      const { data, error } = await supabase
        .from(tableName)
        .insert([itemData])
        .select()
        .single() as { data: T; error: any }

      if (error) throw error
      return data
    },

    async update(id: string, updates: Partial<Omit<T, 'id' | 'created_at'>>): Promise<T> {
      const { data, error } = await supabase
        .from(tableName)
        .update({ ...updates, updated_at: new Date().toISOString() })
        .eq('id', id)
        .select()
        .single() as { data: T; error: any }

      if (error) throw error
      return data
    },

    async delete(id: string): Promise<void> {
      const { error } = await supabase
        .from(tableName)
        .delete()
        .eq('id', id) as { error: any }

      if (error) throw error
    }
  }
}