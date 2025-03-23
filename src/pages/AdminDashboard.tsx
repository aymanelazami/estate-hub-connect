
import { useAuth } from '@/contexts/AuthContext';
import { Navigate, Link } from 'react-router-dom';
import { MainNav } from '@/components/MainNav';
import { Footer } from '@/components/Footer';
import { Button } from '@/components/ui/button';
import { AgencyCard } from '@/components/AgencyCard';
import { PropertyCard } from '@/components/PropertyCard';
import { mockAgencies, mockProperties, initializeMockData } from '@/data/mockData';
import { useEffect, useState } from 'react';
import { Agency, Property } from '@/types';
import { Building, Home, CheckCircle, XCircle, Users, Download, Upload, PlusCircle } from 'lucide-react';

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
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
          <Button variant="outline" size="lg" className="h-auto p-6 justify-start" asChild>
            <Link to="/admin-agency-management" className="flex items-start gap-4">
              <div className="bg-estate-100 p-3 rounded-full">
                <Building className="h-6 w-6 text-estate-600" />
              </div>
              <div className="text-left">
                <h3 className="font-semibold text-lg">Agency Management</h3>
                <p className="text-muted-foreground text-sm mt-1">
                  Create, edit, and manage agencies on the platform
                </p>
              </div>
            </Link>
          </Button>
          
          <Button variant="outline" size="lg" className="h-auto p-6 justify-start" asChild>
            <Link to="/properties" className="flex items-start gap-4">
              <div className="bg-estate-100 p-3 rounded-full">
                <Home className="h-6 w-6 text-estate-600" />
              </div>
              <div className="text-left">
                <h3 className="font-semibold text-lg">Property Management</h3>
                <p className="text-muted-foreground text-sm mt-1">
                  Review, edit, and manage all property listings
                </p>
              </div>
            </Link>
          </Button>
        </div>
      
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <div className="bg-card border rounded-xl p-6">
            <div className="flex items-start justify-between">
              <div>
                <p className="text-muted-foreground text-sm">Total Agencies</p>
                <h3 className="text-3xl font-bold mt-1">{mockAgencies.length}</h3>
              </div>
              <div className="bg-estate-100 p-3 rounded-full">
                <Building className="h-6 w-6 text-estate-600" />
              </div>
            </div>
            <div className="mt-4 flex items-center gap-2 text-sm text-muted-foreground">
              <span className="text-green-600">+12%</span>
              <span>from last month</span>
            </div>
          </div>
          
          <div className="bg-card border rounded-xl p-6">
            <div className="flex items-start justify-between">
              <div>
                <p className="text-muted-foreground text-sm">Total Properties</p>
                <h3 className="text-3xl font-bold mt-1">{mockProperties.length}</h3>
              </div>
              <div className="bg-estate-100 p-3 rounded-full">
                <Home className="h-6 w-6 text-estate-600" />
              </div>
            </div>
            <div className="mt-4 flex items-center gap-2 text-sm text-muted-foreground">
              <span className="text-green-600">+23%</span>
              <span>from last month</span>
            </div>
          </div>
          
          <div className="bg-card border rounded-xl p-6">
            <div className="flex items-start justify-between">
              <div>
                <p className="text-muted-foreground text-sm">Total Agents</p>
                <h3 className="text-3xl font-bold mt-1">{mockAgencies.reduce((acc, agency) => acc + agency.agents.length, 0)}</h3>
              </div>
              <div className="bg-estate-100 p-3 rounded-full">
                <Users className="h-6 w-6 text-estate-600" />
              </div>
            </div>
            <div className="mt-4 flex items-center gap-2 text-sm text-muted-foreground">
              <span className="text-green-600">+8%</span>
              <span>from last month</span>
            </div>
          </div>
        </div>
        
        {/* Pending Approvals Sections */}
        <div className="space-y-8">
          {/* Pending Agencies */}
          <div>
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-xl font-bold">Pending Agency Approvals</h2>
              <div className="flex gap-3">
                <Button variant="outline" size="sm" asChild>
                  <Link to="/admin-agency-management" className="flex items-center gap-2">
                    <PlusCircle className="h-4 w-4" />
                    Manage Agencies
                  </Link>
                </Button>
                <Button variant="outline" size="sm" className="flex items-center gap-2">
                  <Upload className="h-4 w-4" />
                  Import
                </Button>
                <Button variant="outline" size="sm" className="flex items-center gap-2">
                  <Download className="h-4 w-4" />
                  Export
                </Button>
              </div>
            </div>
            
            {pendingAgencies.length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {pendingAgencies.map(agency => (
                  <div key={agency.id} className="relative">
                    <AgencyCard agency={agency} />
                    <div className="absolute inset-0 bg-black/5 backdrop-blur-[1px] rounded-xl flex items-center justify-center">
                      <div className="bg-card p-4 rounded-lg border shadow-lg">
                        <div className="flex gap-3">
                          <Button 
                            variant="outline" 
                            className="flex items-center gap-2" 
                            onClick={() => approveAgency(agency.id)}
                          >
                            <CheckCircle className="h-4 w-4 text-green-600" />
                            Approve
                          </Button>
                          <Button 
                            variant="outline" 
                            className="flex items-center gap-2" 
                            onClick={() => rejectAgency(agency.id)}
                          >
                            <XCircle className="h-4 w-4 text-red-600" />
                            Reject
                          </Button>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="bg-muted/50 rounded-xl border p-8 text-center">
                <Building className="h-12 w-12 mx-auto text-muted-foreground mb-4" />
                <h3 className="text-lg font-medium mb-2">No pending agencies</h3>
                <p className="text-muted-foreground">
                  All agency approval requests have been processed.
                </p>
              </div>
            )}
          </div>
          
          {/* Pending Properties */}
          <div>
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-xl font-bold">Pending Property Approvals</h2>
              <div className="flex gap-3">
                <Button variant="outline" size="sm" asChild>
                  <Link to="/properties" className="flex items-center gap-2">
                    <PlusCircle className="h-4 w-4" />
                    Manage Properties
                  </Link>
                </Button>
                <Button variant="outline" size="sm" className="flex items-center gap-2">
                  <Upload className="h-4 w-4" />
                  Import
                </Button>
                <Button variant="outline" size="sm" className="flex items-center gap-2">
                  <Download className="h-4 w-4" />
                  Export
                </Button>
              </div>
            </div>
            
            {pendingProperties.length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {pendingProperties.map(property => (
                  <div key={property.id} className="relative">
                    <PropertyCard property={property} />
                    <div className="absolute inset-0 bg-black/5 backdrop-blur-[1px] rounded-xl flex items-center justify-center">
                      <div className="bg-card p-4 rounded-lg border shadow-lg">
                        <div className="flex gap-3">
                          <Button 
                            variant="outline" 
                            className="flex items-center gap-2" 
                            onClick={() => approveProperty(property.id)}
                          >
                            <CheckCircle className="h-4 w-4 text-green-600" />
                            Approve
                          </Button>
                          <Button 
                            variant="outline" 
                            className="flex items-center gap-2" 
                            onClick={() => rejectProperty(property.id)}
                          >
                            <XCircle className="h-4 w-4 text-red-600" />
                            Reject
                          </Button>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="bg-muted/50 rounded-xl border p-8 text-center">
                <Home className="h-12 w-12 mx-auto text-muted-foreground mb-4" />
                <h3 className="text-lg font-medium mb-2">No pending properties</h3>
                <p className="text-muted-foreground">
                  All property approval requests have been processed.
                </p>
              </div>
            )}
          </div>
        </div>
      </div>
      
      <div className="mt-auto">
        <Footer />
      </div>
    </div>
  );
};

export default AdminDashboard;
