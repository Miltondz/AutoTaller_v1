import { supabase } from '../services/supabase'
import type { Payment, CreatePaymentData } from '../types'

export const paymentsApi = {
  // Get all payments
  async getAll(): Promise<Payment[]> {
    const { data, error } = await supabase
      .from('payments')
      .select('*')
      .order('payment_date', { ascending: false }) as { data: Payment[]; error: any }

    if (error) throw error
    return data || []
  },

  // Get payment by ID
  async getById(id: string): Promise<Payment | null> {
    const { data, error } = await supabase
      .from('payments')
      .select('*')
      .eq('id', id)
      .maybeSingle() as { data: Payment | null; error: any }

    if (error) throw error
    return data
  },

  // Get payments by appointment ID
  async getByAppointmentId(appointmentId: string): Promise<Payment[]> {
    const { data, error } = await supabase
      .from('payments')
      .select('*')
      .eq('appointment_id', appointmentId)
      .order('payment_date', { ascending: false }) as { data: Payment[]; error: any }

    if (error) throw error
    return data || []
  },

  // Get payments by status
  async getByStatus(status: 'completed' | 'pending' | 'cancelled' | 'failed'): Promise<Payment[]> {
    const { data, error } = await supabase
      .from('payments')
      .select('*')
      .eq('status', status)
      .order('payment_date', { ascending: false }) as { data: Payment[]; error: any }

    if (error) throw error
    return data || []
  },

  // Create new payment
  async create(paymentData: CreatePaymentData): Promise<Payment> {
    const { data, error } = await supabase
      .from('payments')
      .insert([paymentData])
      .select()
      .single() as { data: Payment; error: any }

    if (error) throw error
    return data
  },

  // Update payment
  async update(id: string, updates: Partial<CreatePaymentData>): Promise<Payment> {
    const { data, error } = await supabase
      .from('payments')
      .update({ ...updates, updated_at: new Date().toISOString() })
      .eq('id', id)
      .select()
      .single() as { data: Payment; error: any }

    if (error) throw error
    return data
  },

  // Update payment status
  async updateStatus(id: string, status: 'completed' | 'pending' | 'cancelled' | 'failed'): Promise<Payment> {
    const { data, error } = await supabase
      .from('payments')
      .update({ status, updated_at: new Date().toISOString() })
      .eq('id', id)
      .select()
      .single() as { data: Payment; error: any }

    if (error) throw error
    return data
  },

  // Delete payment
  async delete(id: string): Promise<void> {
    const { error } = await supabase
      .from('payments')
      .delete()
      .eq('id', id) as { error: any }

    if (error) throw error
  },

  // Get payment statistics
  async getStats(): Promise<{
    totalRevenue: number
    pendingAmount: number
    paidCount: number
    pendingCount: number
  }> {
    const { data, error } = await supabase
      .from('payments')
      .select('amount, status') as { data: { amount: number; status: string }[]; error: any }

    if (error) throw error

    const payments = data || []
    const totalRevenue = payments.filter(p => p.status === 'completed').reduce((sum, p) => sum + p.amount, 0)
    const pendingAmount = payments.filter(p => p.status === 'pending').reduce((sum, p) => sum + p.amount, 0)
    const paidCount = payments.filter(p => p.status === 'completed').length
    const pendingCount = payments.filter(p => p.status === 'pending').length

    return {
      totalRevenue,
      pendingAmount,
      paidCount,
      pendingCount
    }
  }
}
