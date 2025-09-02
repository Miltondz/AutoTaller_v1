import { useState, useEffect } from 'react';

export interface PaymentMethod {
  id: string;
  name: string;
  type: 'cash' | 'credit_card' | 'debit_card' | 'check' | 'bank_transfer' | 'financing';
  description: string;
}

export interface PaymentRecord {
  id: string;
  appointmentId: string;
  trackingCode: string;
  customerName: string;
  customerEmail: string;
  serviceName: string;
  vehicleInfo: {
    make: string;
    model: string;
    year: number;
    licensePlate: string;
  };
  
  // Cost breakdown
  serviceCost: number;
  partsCost: number;
  laborCost: number;
  taxAmount: number;
  discountAmount: number;
  totalAmount: number;
  
  // Payment details
  paymentMethod: PaymentMethod;
  paymentStatus: 'pending' | 'partial' | 'paid' | 'refunded' | 'failed';
  amountPaid: number;
  amountDue: number;
  
  // Payment tracking
  paymentDate?: string;
  dueDate: string;
  paymentNotes?: string;
  transactionId?: string;
  
  // Timestamps
  createdAt: string;
  updatedAt: string;
}

const mockPaymentMethods: PaymentMethod[] = [
  {
    id: '1',
    name: 'Cash',
    type: 'cash',
    description: 'Cash payment'
  },
  {
    id: '2',
    name: 'Credit Card',
    type: 'credit_card',
    description: 'Visa, MasterCard, American Express'
  },
  {
    id: '3',
    name: 'Debit Card',
    type: 'debit_card',
    description: 'Bank debit card'
  },
  {
    id: '4',
    name: 'Check',
    type: 'check',
    description: 'Personal or business check'
  },
  {
    id: '5',
    name: 'Bank Transfer',
    type: 'bank_transfer',
    description: 'Direct bank transfer or ACH'
  },
  {
    id: '6',
    name: 'Financing',
    type: 'financing',
    description: 'Third-party financing'
  }
];

const mockPaymentRecords: PaymentRecord[] = [
  {
    id: '1',
    appointmentId: '1',
    trackingCode: 'MC-2024-001234',
    customerName: 'John Smith',
    customerEmail: 'john.smith@email.com',
    serviceName: 'Oil Change & Filter',
    vehicleInfo: {
      make: 'Toyota',
      model: 'Camry',
      year: 2020,
      licensePlate: 'ABC-123'
    },
    serviceCost: 45.99,
    partsCost: 0, // Parts included in service
    laborCost: 45.99,
    taxAmount: 3.68,
    discountAmount: 0,
    totalAmount: 49.67,
    paymentMethod: mockPaymentMethods[1], // Credit Card
    paymentStatus: 'paid',
    amountPaid: 49.67,
    amountDue: 0,
    paymentDate: '2024-01-15T10:30:00Z',
    dueDate: '2024-01-15T23:59:59Z',
    paymentNotes: 'Paid at time of service completion',
    transactionId: 'TXN-2024-001234',
    createdAt: '2024-01-15T09:00:00Z',
    updatedAt: '2024-01-15T10:30:00Z'
  },
  {
    id: '2',
    appointmentId: '2',
    trackingCode: 'MC-2024-001235',
    customerName: 'Sarah Johnson',
    customerEmail: 'sarah.j@email.com',
    serviceName: 'Brake Inspection & Repair',
    vehicleInfo: {
      make: 'Honda',
      model: 'Civic',
      year: 2018,
      licensePlate: 'XYZ-789'
    },
    serviceCost: 189.99,
    partsCost: 85.50, // Additional brake pads
    laborCost: 189.99,
    taxAmount: 22.04,
    discountAmount: 10.00, // Customer discount
    totalAmount: 287.53,
    paymentMethod: mockPaymentMethods[5], // Bank Transfer
    paymentStatus: 'partial',
    amountPaid: 150.00,
    amountDue: 137.53,
    dueDate: '2024-01-22T23:59:59Z',
    paymentNotes: 'Partial payment received, balance due in 7 days',
    transactionId: 'TXN-2024-001235',
    createdAt: '2024-01-15T11:00:00Z',
    updatedAt: '2024-01-15T16:00:00Z'
  },
  {
    id: '3',
    appointmentId: '3',
    trackingCode: 'MC-2024-001233',
    customerName: 'Mike Davis',
    customerEmail: 'mike.davis@email.com',
    serviceName: 'Engine Diagnostic',
    vehicleInfo: {
      make: 'Ford',
      model: 'F-150',
      year: 2019,
      licensePlate: 'DEF-456'
    },
    serviceCost: 125.00,
    partsCost: 95.00, // Oxygen sensor
    laborCost: 125.00,
    taxAmount: 17.60,
    discountAmount: 0,
    totalAmount: 237.60,
    paymentMethod: mockPaymentMethods[0], // Cash
    paymentStatus: 'paid',
    amountPaid: 237.60,
    amountDue: 0,
    paymentDate: '2024-01-14T16:00:00Z',
    dueDate: '2024-01-14T23:59:59Z',
    paymentNotes: 'Cash payment received upon completion',
    createdAt: '2024-01-14T14:00:00Z',
    updatedAt: '2024-01-14T16:00:00Z'
  },
  {
    id: '4',
    appointmentId: '4',
    trackingCode: 'MC-2024-001236',
    customerName: 'Lisa Wilson',
    customerEmail: 'lisa.wilson@email.com',
    serviceName: 'Transmission Service',
    vehicleInfo: {
      make: 'Chevrolet',
      model: 'Malibu',
      year: 2017,
      licensePlate: 'GHI-789'
    },
    serviceCost: 299.99,
    partsCost: 45.00, // Transmission fluid and filter
    laborCost: 299.99,
    taxAmount: 27.60,
    discountAmount: 25.00, // Loyalty customer discount
    totalAmount: 347.59,
    paymentMethod: mockPaymentMethods[5], // Financing
    paymentStatus: 'pending',
    amountPaid: 0,
    amountDue: 347.59,
    dueDate: '2024-01-20T23:59:59Z',
    paymentNotes: 'Financing application in progress',
    createdAt: '2024-01-16T09:30:00Z',
    updatedAt: '2024-01-16T09:30:00Z'
  },
  {
    id: '5',
    appointmentId: '5',
    trackingCode: 'MC-2024-001237',
    customerName: 'Robert Brown',
    customerEmail: 'robert.brown@email.com',
    serviceName: 'AC System Repair',
    vehicleInfo: {
      make: 'BMW',
      model: 'X3',
      year: 2021,
      licensePlate: 'JKL-012'
    },
    serviceCost: 450.00,
    partsCost: 125.00, // AC compressor parts
    laborCost: 450.00,
    taxAmount: 46.00,
    discountAmount: 0,
    totalAmount: 621.00,
    paymentMethod: mockPaymentMethods[2], // Debit Card
    paymentStatus: 'failed',
    amountPaid: 0,
    amountDue: 621.00,
    dueDate: '2024-01-18T23:59:59Z',
    paymentNotes: 'Payment failed - insufficient funds. Customer contacted.',
    transactionId: 'TXN-2024-001237-FAILED',
    createdAt: '2024-01-17T11:15:00Z',
    updatedAt: '2024-01-17T14:30:00Z'
  }
];

export const useMockAutomotivePayments = () => {
  const [payments, setPayments] = useState<PaymentRecord[]>([]);
  const [paymentMethods, setPaymentMethods] = useState<PaymentMethod[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    // Simulate API call delay
    const timer = setTimeout(() => {
      setPayments(mockPaymentRecords);
      setPaymentMethods(mockPaymentMethods);
      setLoading(false);
    }, 500);

    return () => clearTimeout(timer);
  }, []);

  const getPaymentStats = () => {
    const totalRevenue = payments
      .filter(p => p.paymentStatus === 'paid')
      .reduce((sum, p) => sum + p.amountPaid, 0);
    
    const pendingAmount = payments
      .filter(p => p.paymentStatus === 'pending' || p.paymentStatus === 'partial')
      .reduce((sum, p) => sum + p.amountDue, 0);
    
    const paidCount = payments.filter(p => p.paymentStatus === 'paid').length;
    const pendingCount = payments.filter(p => p.paymentStatus === 'pending').length;
    const partialCount = payments.filter(p => p.paymentStatus === 'partial').length;
    const failedCount = payments.filter(p => p.paymentStatus === 'failed').length;

    const serviceCostsTotal = payments.reduce((sum, p) => sum + p.serviceCost, 0);
    const partsCostsTotal = payments.reduce((sum, p) => sum + p.partsCost, 0);
    const laborCostsTotal = payments.reduce((sum, p) => sum + p.laborCost, 0);

    return {
      totalRevenue,
      pendingAmount,
      paidCount,
      pendingCount,
      partialCount,
      failedCount,
      serviceCostsTotal,
      partsCostsTotal,
      laborCostsTotal,
      totalTransactions: payments.length
    };
  };

  const updatePaymentStatus = async (paymentId: string, status: PaymentRecord['paymentStatus'], notes?: string) => {
    return new Promise<void>((resolve) => {
      setTimeout(() => {
        setPayments(prev => prev.map(payment => 
          payment.id === paymentId 
            ? { 
                ...payment, 
                paymentStatus: status,
                paymentNotes: notes || payment.paymentNotes,
                updatedAt: new Date().toISOString(),
                ...(status === 'paid' ? {
                  amountPaid: payment.totalAmount,
                  amountDue: 0,
                  paymentDate: new Date().toISOString()
                } : {})
              }
            : payment
        ));
        resolve();
      }, 300);
    });
  };

  const addPaymentRecord = async (paymentData: Omit<PaymentRecord, 'id' | 'createdAt' | 'updatedAt'>) => {
    return new Promise<PaymentRecord>((resolve) => {
      setTimeout(() => {
        const newPayment: PaymentRecord = {
          ...paymentData,
          id: Date.now().toString(),
          createdAt: new Date().toISOString(),
          updatedAt: new Date().toISOString()
        };
        setPayments(prev => [...prev, newPayment]);
        resolve(newPayment);
      }, 300);
    });
  };

  return {
    payments,
    paymentMethods,
    loading,
    error,
    getPaymentStats,
    updatePaymentStatus,
    addPaymentRecord
  };
};