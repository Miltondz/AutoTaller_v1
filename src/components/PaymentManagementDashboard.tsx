import React, { useState, useMemo } from 'react';
import { 
  DollarSign, 
  CreditCard, 
  Clock, 
  CheckCircle, 
  XCircle, 
  AlertCircle,
  Filter,
  Search,
  Eye,
  Edit,
  Plus,
  TrendingUp,
  TrendingDown,
  Calendar,
  User,
  Car
} from 'lucide-react';
import { useMockAutomotivePayments, PaymentRecord } from '../hooks/useMockAutomotivePayments';

const PaymentManagementDashboard: React.FC = () => {
  const { payments, paymentMethods, loading, error, getPaymentStats, updatePaymentStatus } = useMockAutomotivePayments();
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState<string>('all');
  const [methodFilter, setMethodFilter] = useState<string>('all');
  const [sortBy, setSortBy] = useState<'date' | 'amount' | 'status' | 'customer'>('date');
  const [selectedPayment, setSelectedPayment] = useState<PaymentRecord | null>(null);
  const [updatingPayment, setUpdatingPayment] = useState<string | null>(null);

  const stats = useMemo(() => getPaymentStats(), [getPaymentStats]);

  // Filter and sort payments
  const filteredAndSortedPayments = useMemo(() => {
    const filtered = payments.filter(payment => {
      const matchesSearch = 
        payment.customerName.toLowerCase().includes(searchTerm.toLowerCase()) ||
        payment.trackingCode.toLowerCase().includes(searchTerm.toLowerCase()) ||
        payment.vehicleInfo.licensePlate.toLowerCase().includes(searchTerm.toLowerCase()) ||
        payment.serviceName.toLowerCase().includes(searchTerm.toLowerCase());
      
      const matchesStatus = statusFilter === 'all' || payment.paymentStatus === statusFilter;
      const matchesMethod = methodFilter === 'all' || payment.paymentMethod.id === methodFilter;
      
      return matchesSearch && matchesStatus && matchesMethod;
    });

    // Sort payments
    filtered.sort((a, b) => {
      switch (sortBy) {
        case 'date':
          return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime();
        case 'amount':
          return b.totalAmount - a.totalAmount;
        case 'status': {
          const statusOrder = { 'failed': 1, 'pending': 2, 'partial': 3, 'paid': 4, 'refunded': 5 };
          return statusOrder[a.paymentStatus] - statusOrder[b.paymentStatus];
        }
        case 'customer':
          return a.customerName.localeCompare(b.customerName);
        default:
          return 0;
      }
    });

    return filtered;
  }, [payments, searchTerm, statusFilter, methodFilter, sortBy]);

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'paid':
        return <CheckCircle className="w-4 h-4 text-green-500" />;
      case 'pending':
        return <Clock className="w-4 h-4 text-yellow-500" />;
      case 'partial':
        return <AlertCircle className="w-4 h-4 text-orange-500" />;
      case 'failed':
        return <XCircle className="w-4 h-4 text-red-500" />;
      case 'refunded':
        return <TrendingDown className="w-4 h-4 text-secondary-500" />;
      default:
        return <Clock className="w-4 h-4 text-gray-500" />;
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'paid':
        return 'bg-green-100 text-green-800 border-green-200';
      case 'pending':
        return 'bg-yellow-100 text-yellow-800 border-yellow-200';
      case 'partial':
        return 'bg-orange-100 text-orange-800 border-orange-200';
      case 'failed':
        return 'bg-red-100 text-red-800 border-red-200';
      case 'refunded':
        return 'bg-secondary-100 text-secondary-800 border-secondary-200';
      default:
        return 'bg-gray-100 text-gray-800 border-gray-200';
    }
  };

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('es-ES', {
      style: 'currency',
      currency: 'EUR'
    }).format(amount);
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('es-ES', {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    });
  };

  const handleStatusUpdate = async (paymentId: string, newStatus: PaymentRecord['paymentStatus']) => {
    setUpdatingPayment(paymentId);
    try {
      await updatePaymentStatus(paymentId, newStatus);
    } catch (error) {
      console.error('Failed to update payment status:', error);
    } finally {
      setUpdatingPayment(null);
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
          <AlertCircle className="w-12 h-12 text-red-500 mx-auto mb-4" />
          <h3 className="text-lg font-semibold text-gray-900 mb-2">Error al cargar los pagos</h3>
          <p className="text-gray-600">{error}</p>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto p-6 bg-gray-50 min-h-screen">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">Gestión de Pagos</h1>
        <p className="text-gray-600">Rastrea y gestiona los pagos de clientes y los registros financieros</p>
      </div>

      {/* Financial Reporting Link */}
      <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 mb-6">
        <div className="flex items-center justify-between">
          <div>
            <h3 className="text-lg font-semibold text-blue-900">Informes Financieros</h3>
            <p className="text-blue-700 text-sm">Ver análisis financieros detallados y exportar informes</p>
          </div>
          <button className="inline-flex items-center space-x-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors">
            <TrendingUp className="w-4 h-4" />
            <span>Ver Informes</span>
          </button>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-500">Ingresos Totales</p>
              <h2 className="text-2xl font-bold text-green-600">{formatCurrency(stats.totalRevenue)}</h2>
            </div>
            <TrendingUp className="w-8 h-8 text-green-500" />
          </div>
          <p className="text-xs text-gray-500 mt-2">{stats.paidCount} pagos completados</p>
        </div>

        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-500">Monto Pendiente</p>
              <h2 className="text-2xl font-bold text-yellow-600">{formatCurrency(stats.pendingAmount)}</h2>
            </div>
            <Clock className="w-8 h-8 text-yellow-500" />
          </div>
          <p className="text-xs text-gray-500 mt-2">{stats.pendingCount + stats.partialCount} pagos pendientes</p>
        </div>

        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-500">Ingresos por Servicios</p>
              <h2 className="text-2xl font-bold text-blue-600">{formatCurrency(stats.serviceCostsTotal)}</h2>
            </div>
            <DollarSign className="w-8 h-8 text-blue-500" />
          </div>
          <p className="text-xs text-gray-500 mt-2">Cargos por mano de obra y servicios</p>
        </div>

        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-500">Ingresos por Repuestos</p>
              <h2 className="text-2xl font-bold text-secondary-600">{formatCurrency(stats.partsCostsTotal)}</h2>
            </div>
            <Car className="w-8 h-8 text-secondary-500" />
          </div>
          <p className="text-xs text-gray-500 mt-2">Repuestos y materiales</p>
        </div>
      </div>

      {/* Filters and Search */}
      <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6 mb-6">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4">
          {/* Search */}
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
            <input
              type="text"
              placeholder="Buscar por cliente, código de seguimiento..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
          </div>

          {/* Status Filter */}
          <div className="relative">
            <Filter className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
            <select
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
              className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent appearance-none"
            >
              <option value="all">Todos los Estados</option>
              <option value="pending">Pendiente</option>
              <option value="partial">Parcial</option>
              <option value="paid">Pagado</option>
              <option value="failed">Fallido</option>
              <option value="refunded">Reembolsado</option>
            </select>
          </div>

          {/* Payment Method Filter */}
          <div className="relative">
            <CreditCard className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
            <select
              value={methodFilter}
              onChange={(e) => setMethodFilter(e.target.value)}
              className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent appearance-none"
            >
              <option value="all">Todos los Métodos</option>
              {paymentMethods.map(method => (
                <option key={method.id} value={method.id}>{method.name}</option>
              ))}
            </select>
          </div>

          {/* Sort By */}
          <div>
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value as 'date' | 'amount' | 'status' | 'customer')}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent appearance-none"
            >
              <option value="date">Ordenar por Fecha</option>
              <option value="amount">Ordenar por Monto</option>
              <option value="status">Ordenar por Estado</option>
              <option value="customer">Ordenar por Cliente</option>
            </select>
          </div>

          {/* Add Payment Button */}
          <div>
            <button className="w-full inline-flex items-center justify-center space-x-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors">
              <Plus className="w-4 h-4" />
              <span>Añadir Pago</span>
            </button>
          </div>
        </div>
      </div>

      {/* Payments List */}
      <div className="bg-white rounded-lg shadow-sm border border-gray-200">
        <div className="p-6 border-b border-gray-200">
          <h2 className="text-xl font-semibold text-gray-900">
            Registros de Pagos ({filteredAndSortedPayments.length})
          </h2>
        </div>

        <div className="divide-y divide-gray-200">
          {filteredAndSortedPayments.map((payment) => (
            <div key={payment.id} className="p-6 hover:bg-gray-50 transition-colors">
              <div className="flex items-start justify-between">
                <div className="flex-1 grid grid-cols-1 lg:grid-cols-4 gap-6">
                  {/* Customer & Vehicle Info */}
                  <div className="space-y-2">
                    <div className="flex items-center space-x-2">
                      <User className="w-4 h-4 text-gray-400" />
                      <span className="font-medium text-gray-900">{payment.customerName}</span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Car className="w-4 h-4 text-gray-400" />
                      <span className="text-sm text-gray-600">
                        {payment.vehicleInfo.year} {payment.vehicleInfo.make} {payment.vehicleInfo.model}
                      </span>
                    </div>
                    <div className="text-xs font-mono bg-gray-100 px-2 py-1 rounded w-fit">
                      {payment.trackingCode}
                    </div>
                  </div>

                  {/* Service & Payment Info */}
                  <div className="space-y-2">
                    <div>
                      <p className="font-medium text-gray-900">{payment.serviceName}</p>
                      <p className="text-sm text-gray-600">{payment.paymentMethod.name}</p>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Calendar className="w-4 h-4 text-gray-400" />
                      <span className="text-sm text-gray-600">{formatDate(payment.createdAt)}</span>
                    </div>
                  </div>

                  {/* Cost Breakdown */}
                  <div className="space-y-2">
                    <div className="text-sm text-gray-600">
                      <div className="flex justify-between">
                        <span>Servicio:</span>
                        <span>{formatCurrency(payment.serviceCost)}</span>
                      </div>
                      {payment.partsCost > 0 && (
                        <div className="flex justify-between">
                          <span>Repuestos:</span>
                          <span>{formatCurrency(payment.partsCost)}</span>
                        </div>
                      )}
                      <div className="flex justify-between font-medium text-gray-900 border-t pt-1">
                        <span>Total:</span>
                        <span>{formatCurrency(payment.totalAmount)}</span>
                      </div>
                    </div>
                  </div>

                  {/* Status & Actions */}
                  <div className="space-y-3">
                    <div className={`inline-flex items-center space-x-2 px-3 py-1 rounded-full border text-sm font-medium ${getStatusColor(payment.paymentStatus)}`}>
                      {getStatusIcon(payment.paymentStatus)}
                      <span className="capitalize">{payment.paymentStatus}</span>
                    </div>
                    
                    {payment.amountDue > 0 && (
                      <div className="text-sm text-red-600">
                        <p className="font-medium">Monto Adeudado: {formatCurrency(payment.amountDue)}</p>
                      </div>
                    )}

                    <div className="flex flex-wrap gap-2">
                      <button
                        onClick={() => setSelectedPayment(payment)}
                        className="inline-flex items-center space-x-1 px-3 py-1 bg-blue-600 text-white text-sm rounded-lg hover:bg-blue-700 transition-colors"
                      >
                        <Eye className="w-4 h-4" />
                        <span>Ver</span>
                      </button>
                      
                      {payment.paymentStatus === 'pending' && (
                        <button
                          onClick={() => handleStatusUpdate(payment.id, 'paid')}
                          disabled={updatingPayment === payment.id}
                          className="inline-flex items-center space-x-1 px-3 py-1 bg-green-600 text-white text-sm rounded-lg hover:bg-green-700 disabled:opacity-50 transition-colors"
                        >
                          {updatingPayment === payment.id ? (
                            <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                          ) : (
                            <CheckCircle className="w-4 h-4" />
                          )}
                          <span>Marcar como Pagado</span>
                        </button>
                      )}
                      
                      {payment.paymentStatus === 'failed' && (
                        <button
                          onClick={() => handleStatusUpdate(payment.id, 'pending')}
                          disabled={updatingPayment === payment.id}
                          className="inline-flex items-center space-x-1 px-3 py-1 bg-yellow-600 text-white text-sm rounded-lg hover:bg-yellow-700 disabled:opacity-50 transition-colors"
                        >
                          {updatingPayment === payment.id ? (
                            <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                          ) : (
                            <Clock className="w-4 h-4" />
                          )}
                          <span>Reintentar</span>
                        </button>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {filteredAndSortedPayments.length === 0 && (
          <div className="p-12 text-center">
            <DollarSign className="w-12 h-12 text-gray-400 mx-auto mb-4" />
            <h3 className="text-lg font-medium text-gray-900 mb-2">No se encontraron pagos</h3>
            <p className="text-gray-600">Intenta ajustar tus criterios de búsqueda o filtro.</p>
          </div>
        )}
      </div>

      {/* Payment Detail Modal (placeholder) */}
      {selectedPayment && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-lg max-w-2xl w-full max-h-[90vh] overflow-y-auto">
            <div className="p-6 border-b border-gray-200">
              <div className="flex items-center justify-between">
                <h3 className="text-lg font-semibold text-gray-900">Detalles del Pago</h3>
                <button
                  onClick={() => setSelectedPayment(null)}
                  className="text-gray-400 hover:text-gray-600"
                >
                  <XCircle className="w-6 h-6" />
                </button>
              </div>
            </div>
            <div className="p-6">
              <p className="text-gray-600">La vista detallada de pagos se implementará en la siguiente fase.</p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default PaymentManagementDashboard;