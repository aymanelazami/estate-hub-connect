
import { useAuth } from '@/contexts/AuthContext';
import { Navigate } from 'react-router-dom';
import { MainNav } from '@/components/MainNav';
import { Footer } from '@/components/Footer';
import { mockAgencies, mockProperties, initializeMockData } from '@/data/mockData';
import { useEffect, useState } from 'react';
import { Agency, Property } from '@/types';

// Import refactored components
import { DashboardStats } from '@/components/dashboard/DashboardStats';
import { DashboardQuickLinks } from '@/components/dashboard/DashboardQuickLinks';
import { PendingApprovals } from '@/components/dashboard/PendingApprovals';

const AdminDashboard = () => {
  const { user } = useAuth();
  const [pendingAgencies, setPendingAgencies] = useState<Agency[]>([]);
  const [pendingProperties, setPendingProperties] = useState<Property[]>([]);
  
  useEffect(() => {
    const data = initializeMockData();
    
    // For demo purposes, pretend some are pending
    const pendingAgenciesData = [...data.agencies].slice(0, 2);
    pendingAgenciesData.forEach(agency => {
      agency.verified = false;
    });
    setPendingAgencies(pendingAgenciesData);
    
    const pendingPropertiesData = [...data.properties].slice(0, 3);
    pendingPropertiesData.forEach(property => {
      property.status = 'pending';
    });
    setPendingProperties(pendingPropertiesData);
  }, []);
  
  // If user is not admin, redirect to home
  if (!user || user.role !== 'admin') {
    return <Navigate to="/" />;
  }

  const approveAgency = (agencyId: string) => {
    setPendingAgencies(prev => prev.filter(agency => agency.id !== agencyId));
  };

  const rejectAgency = (agencyId: string) => {
    setPendingAgencies(prev => prev.filter(agency => agency.id !== agencyId));
  };

  const approveProperty = (propertyId: string) => {
    setPendingProperties(prev => prev.filter(property => property.id !== propertyId));
  };

  const rejectProperty = (propertyId: string) => {
    setPendingProperties(prev => prev.filter(property => property.id !== propertyId));
  };

  return (
    <div className="min-h-screen flex flex-col">
      <MainNav />
      
      <div className="bg-estate-50 dark:bg-estate-950 border-b">
        <div className="container py-8">
          <h1 className="text-3xl font-bold">Administrator Dashboard</h1>
          <p className="text-muted-foreground mt-2">
            Manage agencies, properties, and platform operations
          </p>
        </div>
      </div>
      
      <div className="container py-8 animate-fade-up">
        {/* Admin Quick Links */}
        <DashboardQuickLinks />
      
        {/* Stats Cards */}
        <DashboardStats agencies={mockAgencies} properties={mockProperties} />
        
        {/* Pending Approvals Sections */}
        <PendingApprovals 
          pendingAgencies={pendingAgencies}
          pendingProperties={pendingProperties}
          onApproveAgency={approveAgency}
          onRejectAgency={rejectAgency}
          onApproveProperty={approveProperty}
          onRejectProperty={rejectProperty}
        />
      </div>
      
      <div className="mt-auto">
        <Footer />
      </div>
    </div>
  );
};

export default AdminDashboard;
