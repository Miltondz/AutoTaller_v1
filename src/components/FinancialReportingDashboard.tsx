import React, { useState, useMemo } from 'react';
import { 
  BarChart3, 
  TrendingUp, 
  TrendingDown, 
  DollarSign, 
  Calendar, 
  Download,
  Filter,
  PieChart,
  FileText,
  CreditCard,
  Clock,
  CheckCircle
} from 'lucide-react';
import { useMockAutomotivePayments } from '../hooks/useMockAutomotivePayments';

interface DateRange {
  start: string;
  end: string;
  label: string;
}

const FinancialReportingDashboard: React.FC = () => {
  const { payments, paymentMethods, loading, error, getPaymentStats } = useMockAutomotivePayments();
  const [selectedDateRange, setSelectedDateRange] = useState<string>('all');
  const [selectedPaymentMethod, setSelectedPaymentMethod] = useState<string>('all');

  // Date range options
  const dateRanges: Record<string, DateRange> = useMemo(() => ({
    'all': { start: '', end: '', label: 'All Time' },
    'today': { 
      start: new Date().toISOString().split('T')[0], 
      end: new Date().toISOString().split('T')[0], 
      label: 'Today' 
    },
    'week': { 
      start: new Date(Date.now() - 7 * 24 * 60 * 60 * 1000).toISOString().split('T')[0], 
      end: new Date().toISOString().split('T')[0], 
      label: 'Last 7 Days' 
    },
    'month': { 
      start: new Date(Date.now() - 30 * 24 * 60 * 60 * 1000).toISOString().split('T')[0], 
      end: new Date().toISOString().split('T')[0], 
      label: 'Last 30 Days' 
    },
    'quarter': { 
      start: new Date(Date.now() - 90 * 24 * 60 * 60 * 1000).toISOString().split('T')[0], 
      end: new Date().toISOString().split('T')[0], 
      label: 'Last 90 Days' 
    }
  }), []);

  // Filter payments based on selected criteria
  const filteredPayments = useMemo(() => {
    let filtered = payments;

    // Filter by date range
    if (selectedDateRange !== 'all') {
      const range = dateRanges[selectedDateRange];
      filtered = filtered.filter(payment => {
        const paymentDate = payment.paymentDate || payment.createdAt;
        const date = new Date(paymentDate).toISOString().split('T')[0];
        return date >= range.start && date <= range.end;
      });
    }

    // Filter by payment method
    if (selectedPaymentMethod !== 'all') {
      filtered = filtered.filter(payment => payment.paymentMethod.id === selectedPaymentMethod);
    }

    return filtered;
  }, [payments, selectedDateRange, selectedPaymentMethod, dateRanges]);

  // Calculate filtered stats
  const filteredStats = useMemo(() => {
    const totalRevenue = filteredPayments
      .filter(p => p.paymentStatus === 'paid')
      .reduce((sum, p) => sum + p.amountPaid, 0);
    
    const pendingAmount = filteredPayments
      .filter(p => p.paymentStatus === 'pending' || p.paymentStatus === 'partial')
      .reduce((sum, p) => sum + p.amountDue, 0);
    
    const serviceCostsTotal = filteredPayments.reduce((sum, p) => sum + p.serviceCost, 0);
    const partsCostsTotal = filteredPayments.reduce((sum, p) => sum + p.partsCost, 0);
    const laborCostsTotal = filteredPayments.reduce((sum, p) => sum + p.laborCost, 0);
    const taxTotal = filteredPayments.reduce((sum, p) => sum + p.taxAmount, 0);
    const discountTotal = filteredPayments.reduce((sum, p) => sum + p.discountAmount, 0);

    const paidCount = filteredPayments.filter(p => p.paymentStatus === 'paid').length;
    const pendingCount = filteredPayments.filter(p => p.paymentStatus === 'pending').length;
    const partialCount = filteredPayments.filter(p => p.paymentStatus === 'partial').length;
    const failedCount = filteredPayments.filter(p => p.paymentStatus === 'failed').length;

    // Payment method breakdown
    const paymentMethodBreakdown = paymentMethods.map(method => {
      const methodPayments = filteredPayments.filter(p => p.paymentMethod.id === method.id);
      const revenue = methodPayments
        .filter(p => p.paymentStatus === 'paid')
        .reduce((sum, p) => sum + p.amountPaid, 0);
      const count = methodPayments.length;
      return { method, revenue, count };
    }).filter(item => item.count > 0);

    // Daily revenue trend (last 7 days)
    const dailyRevenue = [];
    for (let i = 6; i >= 0; i--) {
      const date = new Date(Date.now() - i * 24 * 60 * 60 * 1000);
      const dateStr = date.toISOString().split('T')[0];
      const dayRevenue = filteredPayments
        .filter(p => {
          const paymentDate = p.paymentDate || p.createdAt;
          return new Date(paymentDate).toISOString().split('T')[0] === dateStr && p.paymentStatus === 'paid';
        })
        .reduce((sum, p) => sum + p.amountPaid, 0);
      
      dailyRevenue.push({
        date: dateStr,
        day: date.toLocaleDateString('en-US', { weekday: 'short' }),
        revenue: dayRevenue
      });
    }

    return {
      totalRevenue,
      pendingAmount,
      serviceCostsTotal,
      partsCostsTotal,
      laborCostsTotal,
      taxTotal,
      discountTotal,
      paidCount,
      pendingCount,
      partialCount,
      failedCount,
      paymentMethodBreakdown,
      dailyRevenue,
      totalTransactions: filteredPayments.length,
      averageTransactionValue: filteredPayments.length > 0 ? totalRevenue / paidCount || 0 : 0
    };
  }, [filteredPayments, paymentMethods]);

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD'
    }).format(amount);
  };

  const formatPercentage = (value: number, total: number) => {
    if (total === 0) return '0%';
    return `${((value / total) * 100).toFixed(1)}%`;
  };

  const exportReport = (format: 'csv' | 'pdf') => {
    if (format === 'csv') {
      const csvData = [
        ['Financial Report', dateRanges[selectedDateRange].label],
        [''],
        ['Summary'],
        ['Total Revenue', filteredStats.totalRevenue],
        ['Pending Amount', filteredStats.pendingAmount],
        ['Service Revenue', filteredStats.serviceCostsTotal],
        ['Parts Revenue', filteredStats.partsCostsTotal],
        ['Labor Revenue', filteredStats.laborCostsTotal],
        ['Tax Collected', filteredStats.taxTotal],
        ['Discounts Given', filteredStats.discountTotal],
        [''],
        ['Payment Status'],
        ['Paid Transactions', filteredStats.paidCount],
        ['Pending Transactions', filteredStats.pendingCount],
        ['Partial Transactions', filteredStats.partialCount],
        ['Failed Transactions', filteredStats.failedCount],
        [''],
        ['Payment Methods'],
        ...filteredStats.paymentMethodBreakdown.map(item => [
          item.method.name,
          item.revenue,
          item.count
        ])
      ];

      const csvContent = csvData.map(row => row.join(',')).join('\n');
      const blob = new Blob([csvContent], { type: 'text/csv' });
      const url = URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = `financial-report-${selectedDateRange}.csv`;
      a.click();
      URL.revokeObjectURL(url);
    }
  };

  if (loading) {
    return (
      <div className="max-w-7xl mx-auto p-6 bg-gray-50 min-h-screen">
        <div className="flex items-center justify-center h-64">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="max-w-7xl mx-auto p-6 bg-gray-50 min-h-screen">
        <div className="text-center py-8">
          <FileText className="w-12 h-12 text-red-500 mx-auto mb-4" />
          <h3 className="text-lg font-semibold text-gray-900 mb-2">Error loading financial data</h3>
          <p className="text-gray-600">{error}</p>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto p-6 bg-gray-50 min-h-screen">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">Financial Reporting</h1>
        <p className="text-gray-600">Comprehensive financial analytics and reporting dashboard</p>
      </div>

      {/* Filters */}
      <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6 mb-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="relative">
            <Calendar className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
            <select
              value={selectedDateRange}
              onChange={(e) => setSelectedDateRange(e.target.value)}
              className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent appearance-none"
            >
              {Object.entries(dateRanges).map(([key, range]) => (
                <option key={key} value={key}>{range.label}</option>
              ))}
            </select>
          </div>

          <div className="relative">
            <CreditCard className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
            <select
              value={selectedPaymentMethod}
              onChange={(e) => setSelectedPaymentMethod(e.target.value)}
              className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent appearance-none"
            >
              <option value="all">All Payment Methods</option>
              {paymentMethods.map(method => (
                <option key={method.id} value={method.id}>{method.name}</option>
              ))}
            </select>
          </div>

          <div className="flex space-x-2">
            <button
              onClick={() => exportReport('csv')}
              className="flex-1 inline-flex items-center justify-center space-x-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
            >
              <Download className="w-4 h-4" />
              <span>Export CSV</span>
            </button>
          </div>
        </div>
      </div>

      {/* Key Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-500">Total Revenue</p>
              <h2 className="text-2xl font-bold text-green-600">{formatCurrency(filteredStats.totalRevenue)}</h2>
            </div>
            <TrendingUp className="w-8 h-8 text-green-500" />
          </div>
          <p className="text-xs text-gray-500 mt-2">{filteredStats.paidCount} completed transactions</p>
        </div>

        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-500">Pending Revenue</p>
              <h2 className="text-2xl font-bold text-yellow-600">{formatCurrency(filteredStats.pendingAmount)}</h2>
            </div>
            <Clock className="w-8 h-8 text-yellow-500" />
          </div>
          <p className="text-xs text-gray-500 mt-2">{filteredStats.pendingCount + filteredStats.partialCount} pending payments</p>
        </div>

        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-500">Average Transaction</p>
              <h2 className="text-2xl font-bold text-blue-600">{formatCurrency(filteredStats.averageTransactionValue)}</h2>
            </div>
            <BarChart3 className="w-8 h-8 text-blue-500" />
          </div>
          <p className="text-xs text-gray-500 mt-2">Per completed transaction</p>
        </div>

        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-500">Success Rate</p>
              <h2 className="text-2xl font-bold text-secondary-600">
                {formatPercentage(filteredStats.paidCount, filteredStats.totalTransactions)}
              </h2>
            </div>
            <CheckCircle className="w-8 h-8 text-secondary-500" />
          </div>
          <p className="text-xs text-gray-500 mt-2">Payment completion rate</p>
        </div>
      </div>

      {/* Revenue Breakdown */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
        {/* Revenue Sources */}
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
            <PieChart className="w-5 h-5 mr-2" />
            Revenue Breakdown
          </h3>
          <div className="space-y-4">
            <div className="flex justify-between items-center">
              <span className="text-gray-700">Service Revenue:</span>
              <div className="text-right">
                <span className="font-medium">{formatCurrency(filteredStats.serviceCostsTotal)}</span>
                <div className="text-xs text-gray-500">
                  {formatPercentage(filteredStats.serviceCostsTotal, filteredStats.totalRevenue)}
                </div>
              </div>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-gray-700">Parts Revenue:</span>
              <div className="text-right">
                <span className="font-medium">{formatCurrency(filteredStats.partsCostsTotal)}</span>
                <div className="text-xs text-gray-500">
                  {formatPercentage(filteredStats.partsCostsTotal, filteredStats.totalRevenue)}
                </div>
              </div>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-gray-700">Labor Revenue:</span>
              <div className="text-right">
                <span className="font-medium">{formatCurrency(filteredStats.laborCostsTotal)}</span>
                <div className="text-xs text-gray-500">
                  {formatPercentage(filteredStats.laborCostsTotal, filteredStats.totalRevenue)}
                </div>
              </div>
            </div>
            <div className="border-t pt-4">
              <div className="flex justify-between items-center">
                <span className="text-gray-700">Tax Collected:</span>
                <span className="font-medium text-blue-600">{formatCurrency(filteredStats.taxTotal)}</span>
              </div>
              <div className="flex justify-between items-center mt-2">
                <span className="text-gray-700">Discounts Given:</span>
                <span className="font-medium text-red-600">-{formatCurrency(filteredStats.discountTotal)}</span>
              </div>
            </div>
          </div>
        </div>

        {/* Payment Methods */}
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
            <CreditCard className="w-5 h-5 mr-2" />
            Payment Methods
          </h3>
          <div className="space-y-4">
            {filteredStats.paymentMethodBreakdown.map((item, index) => (
              <div key={index} className="flex justify-between items-center">
                <div>
                  <span className="text-gray-700">{item.method.name}</span>
                  <div className="text-xs text-gray-500">{item.count} transactions</div>
                </div>
                <div className="text-right">
                  <span className="font-medium">{formatCurrency(item.revenue)}</span>
                  <div className="text-xs text-gray-500">
                    {formatPercentage(item.revenue, filteredStats.totalRevenue)}
                  </div>
                </div>
              </div>
            ))}
            {filteredStats.paymentMethodBreakdown.length === 0 && (
              <p className="text-gray-500 text-center py-4">No payment data for selected period</p>
            )}
          </div>
        </div>
      </div>

      {/* Daily Revenue Trend */}
      <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6 mb-8">
        <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
          <TrendingUp className="w-5 h-5 mr-2" />
          Daily Revenue Trend (Last 7 Days)
        </h3>
        <div className="grid grid-cols-7 gap-4">
          {filteredStats.dailyRevenue.map((day, index) => {
            const maxRevenue = Math.max(...filteredStats.dailyRevenue.map(d => d.revenue));
            const height = maxRevenue > 0 ? (day.revenue / maxRevenue) * 100 : 0;
            
            return (
              <div key={index} className="text-center">
                <div className="h-32 flex items-end justify-center mb-2">
                  <div 
                    className="w-8 bg-blue-500 rounded-t"
                    style={{ height: `${Math.max(height, 5)}%` }}
                    title={formatCurrency(day.revenue)}
                  ></div>
                </div>
                <div className="text-xs text-gray-600">{day.day}</div>
                <div className="text-xs font-medium text-gray-900">{formatCurrency(day.revenue)}</div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Payment Status Summary */}
      <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
          <BarChart3 className="w-5 h-5 mr-2" />
          Payment Status Summary
        </h3>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <div className="text-center p-4 bg-green-50 rounded-lg">
            <div className="text-2xl font-bold text-green-600">{filteredStats.paidCount}</div>
            <div className="text-sm text-green-700">Paid</div>
            <div className="text-xs text-gray-500">
              {formatPercentage(filteredStats.paidCount, filteredStats.totalTransactions)}
            </div>
          </div>
          <div className="text-center p-4 bg-yellow-50 rounded-lg">
            <div className="text-2xl font-bold text-yellow-600">{filteredStats.pendingCount}</div>
            <div className="text-sm text-yellow-700">Pending</div>
            <div className="text-xs text-gray-500">
              {formatPercentage(filteredStats.pendingCount, filteredStats.totalTransactions)}
            </div>
          </div>
          <div className="text-center p-4 bg-orange-50 rounded-lg">
            <div className="text-2xl font-bold text-orange-600">{filteredStats.partialCount}</div>
            <div className="text-sm text-orange-700">Partial</div>
            <div className="text-xs text-gray-500">
              {formatPercentage(filteredStats.partialCount, filteredStats.totalTransactions)}
            </div>
          </div>
          <div className="text-center p-4 bg-red-50 rounded-lg">
            <div className="text-2xl font-bold text-red-600">{filteredStats.failedCount}</div>
            <div className="text-sm text-red-700">Fallido</div>
            <div className="text-xs text-gray-500">
              {formatPercentage(filteredStats.failedCount, filteredStats.totalTransactions)}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FinancialReportingDashboard;