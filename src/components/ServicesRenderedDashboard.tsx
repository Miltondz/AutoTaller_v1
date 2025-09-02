import React, { useState, useEffect, useCallback } from 'react';
import { motion } from 'framer-motion';
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  PieChart,
  Pie,
  Cell,
  LineChart,
  Line,
  ResponsiveContainer,
} from 'recharts';
import {
  Wrench,
  TrendingUp,
  Calendar,
  DollarSign,
  Clock,
  Users,
  Car,
  CheckCircle,
  AlertCircle,
  Filter,
  Download,
  RefreshCw,
} from 'lucide-react';
import { IndustrialButton, IndustrialSelect, IndustrialBadge, IndustrialAlert } from './IndustrialComponents';
import { generateMockServiceRecords } from '../utils/mockDataGenerator';

/**
 * Services Rendered Dashboard
 * Comprehensive analytics and reporting for automotive services
 */

export interface ServiceRecord {
  id: string;
  service_name: string;
  category: string;
  customer_name: string;
  vehicle_info: string;
  technician: string;
  start_time: string;
  completion_time: string;
  duration_minutes: number;
  status: 'completed' | 'in_progress' | 'cancelled';
  revenue: number;
  parts_used: Array<{
    name: string;
    quantity: number;
    cost: number;
  }>;
  labor_hours: number;
  customer_satisfaction?: number;
  warranty_period: number;
  notes?: string;
}

interface ServiceMetrics {
  total_services: number;
  completed_services: number;
  total_revenue: number;
  average_service_time: number;
  customer_satisfaction: number;
  most_popular_service: string;
  busiest_technician: string;
  services_by_category: Record<string, number>;
  revenue_by_service: Record<string, number>;
  monthly_trends: Array<{
    month: string;
    services: number;
    revenue: number;
  }>;
}

interface ServicesRenderedDashboardProps {
  dateRange?: {
    start: string;
    end: string;
  };
  onExport?: (data: any) => void;
}

export function ServicesRenderedDashboard({
  dateRange,
  onExport,
}: ServicesRenderedDashboardProps) {
  const [services, setServices] = useState<ServiceRecord[]>([]);
  const [metrics, setMetrics] = useState<ServiceMetrics | null>(null);
  const [loading, setLoading] = useState(true);
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [selectedTechnician, setSelectedTechnician] = useState<string>('all');
  const [viewMode, setViewMode] = useState<'overview' | 'detailed' | 'analytics'>('overview');

  const filterServices = useCallback((allServices: ServiceRecord[]): ServiceRecord[] => {
    return allServices.filter(service => {
      // Date range filter
      if (dateRange) {
        const serviceDate = new Date(service.start_time);
        const startDate = new Date(dateRange.start);
        const endDate = new Date(dateRange.end);
        if (serviceDate < startDate || serviceDate > endDate) {
          return false;
        }
      }

      // Category filter
      if (selectedCategory !== 'all' && service.category !== selectedCategory) {
        return false;
      }

      // Technician filter
      if (selectedTechnician !== 'all' && service.technician !== selectedTechnician) {
        return false;
      }

      return true;
    });
  }, [dateRange, selectedCategory, selectedTechnician]);

  const calculateMetrics = useCallback((serviceList: ServiceRecord[]): ServiceMetrics => {
    const completedServices = serviceList.filter(s => s.status === 'completed');
    
    const totalRevenue = completedServices.reduce((sum, s) => sum + s.revenue, 0);
    const averageServiceTime = completedServices.length > 0 
      ? completedServices.reduce((sum, s) => sum + s.duration_minutes, 0) / completedServices.length 
      : 0;
    
    const satisfactionScores = completedServices
      .filter(s => s.customer_satisfaction)
      .map(s => s.customer_satisfaction!);
    const averageSatisfaction = satisfactionScores.length > 0
      ? satisfactionScores.reduce((sum, score) => sum + score, 0) / satisfactionScores.length
      : 0;

    // Services by category
    const servicesByCategory: Record<string, number> = {};
    completedServices.forEach(service => {
      servicesByCategory[service.category] = (servicesByCategory[service.category] || 0) + 1;
    });

    // Revenue by service
    const revenueByService: Record<string, number> = {};
    completedServices.forEach(service => {
      revenueByService[service.service_name] = (revenueByService[service.service_name] || 0) + service.revenue;
    });

    // Most popular service
    const serviceCounts: Record<string, number> = {};
    completedServices.forEach(service => {
      serviceCounts[service.service_name] = (serviceCounts[service.service_name] || 0) + 1;
    });
    const mostPopularService = Object.entries(serviceCounts)
      .sort(([,a], [,b]) => b - a)[0]?.[0] || 'N/A';

    // Busiest technician
    const technicianCounts: Record<string, number> = {};
    completedServices.forEach(service => {
      technicianCounts[service.technician] = (technicianCounts[service.technician] || 0) + 1;
    });
    const busiestTechnician = Object.entries(technicianCounts)
      .sort(([,a], [,b]) => b - a)[0]?.[0] || 'N/A';

    // Monthly trends
    const monthlyData: Record<string, { services: number; revenue: number }> = {};
    completedServices.forEach(service => {
      const month = new Date(service.start_time).toISOString().slice(0, 7);
      if (!monthlyData[month]) {
        monthlyData[month] = { services: 0, revenue: 0 };
      }
      monthlyData[month].services += 1;
      monthlyData[month].revenue += service.revenue;
    });

    const monthlyTrends = Object.entries(monthlyData)
      .map(([month, data]) => ({ month, ...data }))
      .sort((a, b) => a.month.localeCompare(b.month));

    return {
      total_services: serviceList.length,
      completed_services: completedServices.length,
      total_revenue: totalRevenue,
      average_service_time: averageServiceTime,
      customer_satisfaction: averageSatisfaction,
      most_popular_service: mostPopularService,
      busiest_technician: busiestTechnician,
      services_by_category: servicesByCategory,
      revenue_by_service: revenueByService,
      monthly_trends: monthlyTrends,
    };
  }, []);

  const loadServicesData = useCallback(async () => {
    setLoading(true);
    try {
      // Simulate API call - in real implementation, fetch from backend
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      const mockServices = generateMockServiceRecords(50);
      const filteredServices = filterServices(mockServices);
      
      setServices(filteredServices);
      setMetrics(calculateMetrics(filteredServices));
    } catch (error) {
      console.error('Error loading services data:', error);
    } finally {
      setLoading(false);
    }
  }, [calculateMetrics, filterServices]);

  useEffect(() => {
    loadServicesData();
  }, [dateRange, selectedCategory, selectedTechnician, loadServicesData]);
}