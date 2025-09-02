import React, { useState, useMemo } from 'react';
import { Calendar, Clock, User, Car, Phone, MapPin, Filter, Search, Eye, Edit, CheckCircle, AlertCircle, XCircle, Settings, DollarSign } from 'lucide-react';
import AppointmentStatusManager from './AppointmentStatusManager';
import AdditionalCostsManager from './AdditionalCostsManager';

interface VehicleInfo {
  make: string;
  model: string;
  year: number;
  licensePlate: string;
  mileage: number;
}

interface Appointment {
  id: string;
  customerName: string;
  customerEmail: string;
  customerPhone: string;
  serviceName: string;
  servicePrice: number;
  estimatedTime: number;
  includesParts: boolean;
  appointmentDate: string;
  appointmentTime: string;
  status: 'scheduled' | 'in_progress' | 'completed' | 'cancelled';
  trackingCode: string;
  vehicleInfo: VehicleInfo;
  workNotes?: string;
  additionalCosts?: number;
  createdAt: string;
  updatedAt: string;
}

// Mock data for appointments
const mockAppointments: Appointment[] = [
  {
    id: '1',
    customerName: 'John Smith',
    customerEmail: 'john.smith@email.com',
    customerPhone: '(555) 123-4567',
    serviceName: 'Oil Change & Filter',
    servicePrice: 45.99,
    estimatedTime: 30,
    includesParts: true,
    appointmentDate: '2024-01-15',
    appointmentTime: '09:00',
    status: 'scheduled',
    trackingCode: 'MC-2024-001234',
    vehicleInfo: {
      make: 'Toyota',
      model: 'Camry',
      year: 2020,
      licensePlate: 'ABC-123',
      mileage: 45000
    },
    createdAt: '2024-01-10T10:00:00Z',
    updatedAt: '2024-01-10T10:00:00Z'
  },
  {
    id: '2',
    customerName: 'Sarah Johnson',
    customerEmail: 'sarah.j@email.com',
    customerPhone: '(555) 987-6543',
    serviceName: 'Brake Inspection & Repair',
    servicePrice: 189.99,
    estimatedTime: 120,
    includesParts: false,
    appointmentDate: '2024-01-15',
    appointmentTime: '11:00',
    status: 'in_progress',
    trackingCode: 'MC-2024-001235',
    vehicleInfo: {
      make: 'Honda',
      model: 'Civic',
      year: 2018,
      licensePlate: 'XYZ-789',
      mileage: 62000
    },
    workNotes: 'Front brake pads need replacement. Rotors in good condition.',
    additionalCosts: 85.50,
    createdAt: '2024-01-12T14:30:00Z',
    updatedAt: '2024-01-15T11:30:00Z'
  },
  {
    id: '3',
    customerName: 'Mike Davis',
    customerEmail: 'mike.davis@email.com',
    customerPhone: '(555) 456-7890',
    serviceName: 'Engine Diagnostic',
    servicePrice: 125.00,
    estimatedTime: 60,
    includesParts: false,
    appointmentDate: '2024-01-14',
    appointmentTime: '14:00',
    status: 'completed',
    trackingCode: 'MC-2024-001233',
    vehicleInfo: {
      make: 'Ford',
      model: 'F-150',
      year: 2019,
      licensePlate: 'DEF-456',
      mileage: 38000
    },
    workNotes: 'Check engine light caused by faulty oxygen sensor. Sensor replaced.',
    additionalCosts: 95.00,
    createdAt: '2024-01-11T09:15:00Z',
    updatedAt: '2024-01-14T16:00:00Z'
  }
];

const AdminAppointmentDashboard: React.FC = () => {
  const [appointments] = useState<Appointment[]>(mockAppointments);
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState<string>('all');
  const [dateFilter, setDateFilter] = useState<string>('all');
  const [sortBy, setSortBy] = useState<'date' | 'status' | 'customer'>('date');
  const [selectedAppointment, setSelectedAppointment] = useState<Appointment | null>(null);
  const [statusManagerAppointment, setStatusManagerAppointment] = useState<Appointment | null>(null);
  const [costsManagerAppointment, setCostsManagerAppointment] = useState<Appointment | null>(null);

  // Filter and sort appointments
  const filteredAndSortedAppointments = useMemo(() => {
    const filtered = appointments.filter(appointment => {
      const matchesSearch = 
        appointment.customerName.toLowerCase().includes(searchTerm.toLowerCase()) ||
        appointment.trackingCode.toLowerCase().includes(searchTerm.toLowerCase()) ||
        appointment.vehicleInfo.licensePlate.toLowerCase().includes(searchTerm.toLowerCase());
      
      const matchesStatus = statusFilter === 'all' || appointment.status === statusFilter;
      
      const matchesDate = dateFilter === 'all' || 
        (dateFilter === 'today' && appointment.appointmentDate === new Date().toISOString().split('T')[0]) ||
        (dateFilter === 'upcoming' && new Date(appointment.appointmentDate) >= new Date());
      
      return matchesSearch && matchesStatus && matchesDate;
    });

    // Sort appointments
    filtered.sort((a, b) => {
      switch (sortBy) {
        case 'date':
          return new Date(a.appointmentDate + ' ' + a.appointmentTime).getTime() - 
                 new Date(b.appointmentDate + ' ' + b.appointmentTime).getTime();
        case 'status': {
          const statusOrder = { 'scheduled': 1, 'in_progress': 2, 'completed': 3, 'cancelled': 4 };
          return statusOrder[a.status] - statusOrder[b.status];
        }
        case 'customer':
          return a.customerName.localeCompare(b.customerName);
        default:
          return 0;
      }
    });

    return filtered;
  }, [appointments, searchTerm, statusFilter, dateFilter, sortBy]);

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'scheduled':
        return <Clock className="w-4 h-4 text-blue-500" />;
      case 'in_progress':
        return <AlertCircle className="w-4 h-4 text-yellow-500" />;
      case 'completed':
        return <CheckCircle className="w-4 h-4 text-green-500" />;
      case 'cancelled':
        return <XCircle className="w-4 h-4 text-red-500" />;
      default:
        return <Clock className="w-4 h-4 text-gray-500" />;
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'scheduled':
        return 'bg-blue-100 text-blue-800 border-blue-200';
      case 'in_progress':
        return 'bg-yellow-100 text-yellow-800 border-yellow-200';
      case 'completed':
        return 'bg-green-100 text-green-800 border-green-200';
      case 'cancelled':
        return 'bg-red-100 text-red-800 border-red-200';
      default:
        return 'bg-gray-100 text-gray-800 border-gray-200';
    }
  };

  const translateStatus = (status: string) => {
    switch (status) {
      case 'scheduled':
        return 'Programada';
      case 'in_progress':
        return 'En Progreso';
      case 'completed':
        return 'Completada';
      case 'cancelled':
        return 'Cancelada';
      default:
        return status;
    }
  };

  const formatDate = (date: string) => {
    return new Date(date).toLocaleDateString('es-ES', {
      weekday: 'short',
      month: 'short',
      day: 'numeric'
    });
  };

  const formatTime = (time: string) => {
    return new Date(`2000-01-01T${time}`).toLocaleTimeString('es-ES', {
      hour: 'numeric',
      minute: '2-digit',
      hour12: true
    });
  };

  const handleStatusUpdate = async (appointmentId: string, newStatus: 'scheduled' | 'in_progress' | 'completed' | 'cancelled', notes?: string) => {
    // In a real implementation, this would call an API
    console.log('Updating appointment status:', { appointmentId, newStatus, notes });
    // For now, just close the status manager
    setStatusManagerAppointment(null);
  };

  const handleWorkNotesUpdate = async (appointmentId: string, notes: string) => {
    // In a real implementation, this would call an API
    console.log('Updating work notes:', { appointmentId, notes });
  };

  const handleCostsUpdate = async (appointmentId: string, costs: any[], totalAdditionalCosts: number) => {
    // In a real implementation, this would call an API
    console.log('Updating additional costs:', { appointmentId, costs, totalAdditionalCosts });
    // For now, just close the costs manager
    setCostsManagerAppointment(null);
  };

  return (
    <div className="max-w-7xl mx-auto p-6 bg-gray-50 min-h-screen">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">Panel de Citas</h1>
        <p className="text-gray-600">Gestiona y rastrea todas las citas de clientes</p>
      </div>

      {/* Filters and Search */}
      <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6 mb-6">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {/* Search */}
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
            <input
              type="text"
              placeholder="Buscar por nombre, código de seguimiento o matrícula..."
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
              <option value="scheduled">Programada</option>
              <option value="in_progress">En Progreso</option>
              <option value="completed">Completada</option>
              <option value="cancelled">Cancelada</option>
            </select>
          </div>

          {/* Date Filter */}
          <div className="relative">
            <Calendar className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
            <select
              value={dateFilter}
              onChange={(e) => setDateFilter(e.target.value)}
              className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent appearance-none"
            >
              <option value="all">Todas las Fechas</option>
              <option value="today">Hoy</option>
              <option value="upcoming">Próximas</option>
            </select>
          </div>

          {/* Sort By */}
          <div>
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value as 'date' | 'status' | 'customer')}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent appearance-none"
            >
              <option value="date">Ordenar por Fecha</option>
              <option value="status">Ordenar por Estado</option>
              <option value="customer">Ordenar por Cliente</option>
            </select>
          </div>
        </div>
      </div>

      {/* Appointments List */}
      <div className="bg-white rounded-lg shadow-sm border border-gray-200">
        <div className="p-6 border-b border-gray-200">
          <h2 className="text-xl font-semibold text-gray-900">
            Citas ({filteredAndSortedAppointments.length})
          </h2>
        </div>

        <div className="divide-y divide-gray-200">
          {filteredAndSortedAppointments.map((appointment) => (
            <div key={appointment.id} className="p-6 hover:bg-gray-50 transition-colors">
              <div className="flex items-start justify-between">
                <div className="flex-1 grid grid-cols-1 lg:grid-cols-3 gap-6">
                  {/* Customer & Vehicle Info */}
                  <div className="space-y-3">
                    <div className="flex items-center space-x-2">
                      <User className="w-4 h-4 text-gray-400" />
                      <span className="font-medium text-gray-900">{appointment.customerName}</span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Phone className="w-4 h-4 text-gray-400" />
                      <span className="text-sm text-gray-600">{appointment.customerPhone}</span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Car className="w-4 h-4 text-gray-400" />
                      <span className="text-sm text-gray-600">
                        {appointment.vehicleInfo.year} {appointment.vehicleInfo.make} {appointment.vehicleInfo.model}
                      </span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <MapPin className="w-4 h-4 text-gray-400" />
                      <span className="text-sm text-gray-600">{appointment.vehicleInfo.licensePlate}</span>
                    </div>
                  </div>

                  {/* Service & Appointment Info */}
                  <div className="space-y-3">
                    <div>
                      <p className="font-medium text-gray-900">{appointment.serviceName}</p>
                      <p className="text-sm text-gray-600">${appointment.servicePrice.toFixed(2)}</p>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Calendar className="w-4 h-4 text-gray-400" />
                      <span className="text-sm text-gray-600">
                        {formatDate(appointment.appointmentDate)} a las {formatTime(appointment.appointmentTime)}
                      </span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Clock className="w-4 h-4 text-gray-400" />
                      <span className="text-sm text-gray-600">{appointment.estimatedTime} minutos</span>
                    </div>
                    <div>
                      <span className="text-xs font-mono bg-gray-100 px-2 py-1 rounded">
                        {appointment.trackingCode}
                      </span>
                    </div>
                  </div>

                  {/* Status & Actions */}
                  <div className="space-y-3">
                    <div className={`inline-flex items-center space-x-2 px-3 py-1 rounded-full border text-sm font-medium ${getStatusColor(appointment.status)}`}>
                      {getStatusIcon(appointment.status)}
                      <span className="capitalize">{translateStatus(appointment.status)}</span>
                    </div>
                    
                    {appointment.workNotes && (
                      <div className="text-sm text-gray-600">
                        <p className="font-medium">Notas de Trabajo:</p>
                        <p className="mt-1">{appointment.workNotes}</p>
                      </div>
                    )}
                    
                    {appointment.additionalCosts && (
                      <div className="text-sm text-gray-600">
                        <p className="font-medium">Costos Adicionales: ${appointment.additionalCosts.toFixed(2)}</p>
                      </div>
                    )}

                    <div className="flex flex-wrap gap-2">
                      <button
                        onClick={() => setSelectedAppointment(appointment)}
                        className="inline-flex items-center space-x-1 px-3 py-1 bg-blue-600 text-white text-sm rounded-lg hover:bg-blue-700 transition-colors"
                      >
                        <Eye className="w-4 h-4" />
                        <span>Ver</span>
                      </button>
                      <button 
                        onClick={() => setStatusManagerAppointment(appointment)}
                        className="inline-flex items-center space-x-1 px-3 py-1 bg-gray-600 text-white text-sm rounded-lg hover:bg-gray-700 transition-colors"
                      >
                        <Settings className="w-4 h-4" />
                        <span>Estado</span>
                      </button>
                      <button 
                        onClick={() => setCostsManagerAppointment(appointment)}
                        className="inline-flex items-center space-x-1 px-3 py-1 bg-green-600 text-white text-sm rounded-lg hover:bg-green-700 transition-colors"
                      >
                        <DollarSign className="w-4 h-4" />
                        <span>Costos</span>
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {filteredAndSortedAppointments.length === 0 && (
          <div className="p-12 text-center">
            <Calendar className="w-12 h-12 text-gray-400 mx-auto mb-4" />
            <h3 className="text-lg font-medium text-gray-900 mb-2">No se encontraron citas</h3>
            <p className="text-gray-600">Intenta ajustar tus criterios de búsqueda o filtro.</p>
          </div>
        )}
      </div>

      {/* Appointment Detail Modal (placeholder for future implementation) */}
      {selectedAppointment && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-lg max-w-2xl w-full max-h-[90vh] overflow-y-auto">
            <div className="p-6 border-b border-gray-200">
              <div className="flex items-center justify-between">
                <h3 className="text-lg font-semibold text-gray-900">Detalles de la Cita</h3>
                <button
                  onClick={() => setSelectedAppointment(null)}
                  className="text-gray-400 hover:text-gray-600"
                >
                  <XCircle className="w-6 h-6" />
                </button>
              </div>
            </div>
            <div className="p-6">
              <p className="text-gray-600">La vista detallada de la cita se implementará en la próxima tarea.</p>
            </div>
          </div>
        </div>
      )}

      {/* Appointment Status Manager */}
      {statusManagerAppointment && (
        <AppointmentStatusManager
          appointment={statusManagerAppointment}
          onStatusUpdate={handleStatusUpdate}
          onWorkNotesUpdate={handleWorkNotesUpdate}
          onClose={() => setStatusManagerAppointment(null)}
        />
      )}

      {/* Additional Costs Manager */}
      {costsManagerAppointment && (
        <AdditionalCostsManager
          appointment={costsManagerAppointment}
          onCostsUpdate={handleCostsUpdate}
          onClose={() => setCostsManagerAppointment(null)}
        />
      )}
    </div>
  );
};

export default AdminAppointmentDashboard;