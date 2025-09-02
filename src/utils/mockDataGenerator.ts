import { ServiceRecord } from '../components/ServicesRenderedDashboard';

export const generateMockServiceRecords = (count: number): ServiceRecord[] => {
  const mockRecords: ServiceRecord[] = [];
  const serviceNames = ['Oil Change', 'Tire Rotation', 'Brake Inspection', 'Engine Diagnostic', 'Wheel Alignment'];
  const categories = ['Maintenance', 'Repair', 'Inspection'];
  const technicians = ['Alice Smith', 'Bob Johnson', 'Charlie Brown'];
  const customerNames = ['John Doe', 'Jane Smith', 'Peter Jones', 'Sarah Lee'];
  const vehicleInfo = ['Toyota Camry 2018', 'Honda Civic 2020', 'Ford F-150 2022', 'BMW X5 2019'];
  const statuses = ['completed', 'in_progress', 'cancelled'] as const;

  for (let i = 0; i < count; i++) {
    const id = `srv_${Date.now()}_${i}`;
    const service_name = serviceNames[Math.floor(Math.random() * serviceNames.length)];
    const category = categories[Math.floor(Math.random() * categories.length)];
    const customer_name = customerNames[Math.floor(Math.random() * customerNames.length)];
    const vehicle_info = vehicleInfo[Math.floor(Math.random() * vehicleInfo.length)];
    const technician = technicians[Math.floor(Math.random() * technicians.length)];
    const startTime = new Date(Date.now() - Math.random() * 30 * 24 * 60 * 60 * 1000); // Last 30 days
    const completionTime = new Date(startTime.getTime() + Math.random() * 8 * 60 * 60 * 1000); // Up to 8 hours later
    const duration_minutes = Math.round((completionTime.getTime() - startTime.getTime()) / (60 * 1000));
    const status = statuses[Math.floor(Math.random() * statuses.length)];
    const revenue = parseFloat((Math.random() * 500 + 50).toFixed(2));
    const labor_hours = parseFloat((duration_minutes / 60).toFixed(2));
    const customer_satisfaction = status === 'completed' ? parseFloat((Math.random() * 5).toFixed(1)) : undefined;
    const warranty_period = Math.floor(Math.random() * 12) + 1; // 1-12 months

    mockRecords.push({
      id,
      service_name,
      category,
      customer_name,
      vehicle_info,
      technician,
      start_time: startTime.toISOString(),
      completion_time: completionTime.toISOString(),
      duration_minutes,
      status,
      revenue,
      parts_used: [], // Simplified for mock
      labor_hours,
      customer_satisfaction,
      warranty_period,
      notes: 'Mock service record',
    });
  }
  return mockRecords;
};
