
import { useAuth } from '@/contexts/AuthContext';
import { Navigate } from 'react-router-dom';
import { MainNav } from '@/components/MainNav';
import { Footer } from '@/components/Footer';
import { Button } from '@/components/ui/button';
import { PropertyCard } from '@/components/PropertyCard';
import { mockAgents, mockProperties, initializeMockData } from '@/data/mockData';
import { useEffect, useState } from 'react';
import { Agent, Property } from '@/types';
import { User, Home, Building, Plus, ChevronRight, Mail, Phone } from 'lucide-react';

const AgentDashboard = () => {
  const { user } = useAuth();
  const [agent, setAgent] = useState<Agent | null>(null);
  const [properties, setProperties] = useState<Property[]>([]);
  
  useEffect(() => {
    // For demo purposes, just use the first agent from mock data
    const data = initializeMockData();
    setAgent(data.agents[0]);
    setProperties(data.agents[0].properties);
  }, []);
  
  // If user is not agent, redirect to home
  if (!user || user.role !== 'agent') {
    return <Navigate to="/" />;
  }

  if (!agent) {
    return <div className="min-h-screen flex items-center justify-center">Loading...</div>;
  }

  return (
    <div className="min-h-screen flex flex-col">
      <MainNav />
      
      <div className="bg-estate-50 dark:bg-estate-950 border-b">
        <div className="container py-8">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
            <div>
              <h1 className="text-3xl font-bold">Welcome, {agent.name}</h1>
              <p className="text-muted-foreground mt-2">
                Manage your properties and client interactions
              </p>
            </div>
            <Button asChild>
              <a href="/agent/edit-profile">Edit Profile</a>
            </Button>
          </div>
        </div>
      </div>
      
      <div className="container py-8 animate-fade-up">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <div className="md:col-span-1">
            <div className="bg-card border rounded-xl p-6">
              <div className="flex flex-col items-center text-center">
                <div className="relative mb-4">
                  <div className="h-24 w-24 rounded-full overflow-hidden border">
                    {agent.photo ? (
                      <img 
                        src={agent.photo} 
                        alt={agent.name}
                        className="object-cover w-full h-full"
                      />
                    ) : (
                      <User className="h-12 w-12 m-auto text-muted-foreground" />
                    )}
                  </div>
                </div>
                
                <h2 className="text-xl font-semibold mb-1">{agent.name}</h2>
                <p className="text-muted-foreground text-sm mb-4">Real Estate Agent</p>
                
                {agent.bio && (
                  <p className="text-sm mb-4">{agent.bio}</p>
                )}
                
                <div className="w-full space-y-2 mt-2">
                  <div className="flex items-center gap-2 text-sm">
                    <Mail className="h-4 w-4 text-muted-foreground" />
                    <span>{agent.email}</span>
                  </div>
                  <div className="flex items-center gap-2 text-sm">
                    <Phone className="h-4 w-4 text-muted-foreground" />
                    <span>{agent.phone}</span>
                  </div>
                  {agent.agencyId && (
                    <div className="flex items-center gap-2 text-sm">
                      <Building className="h-4 w-4 text-muted-foreground" />
                      <span>Agency: {agent.agencyId}</span>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
          
          <div className="md:col-span-2">
            <div className="bg-card border rounded-xl p-6 h-full">
              <h3 className="font-medium text-lg mb-4">Your Stats</h3>
              
              <div className="grid grid-cols-2 gap-4 mb-6">
                <div className="bg-secondary/50 p-4 rounded-lg">
                  <div className="flex items-start justify-between">
                    <div>
                      <p className="text-muted-foreground text-sm">Properties</p>
                      <h3 className="text-2xl font-bold mt-1">{properties.length}</h3>
                    </div>
                    <div className="bg-estate-100 p-2 rounded-full">
                      <Home className="h-5 w-5 text-estate-600" />
                    </div>
                  </div>
                </div>
                
                <div className="bg-secondary/50 p-4 rounded-lg">
                  <div className="flex items-start justify-between">
                    <div>
                      <p className="text-muted-foreground text-sm">Inquiries</p>
                      <h3 className="text-2xl font-bold mt-1">12</h3>
                    </div>
                    <div className="bg-estate-100 p-2 rounded-full">
                      <Mail className="h-5 w-5 text-estate-600" />
                    </div>
                  </div>
                </div>
              </div>
              
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <h4 className="font-medium">Recent Activity</h4>
                  <Button variant="ghost" size="sm" className="text-sm">
                    View All
                  </Button>
                </div>
                
                <div className="space-y-3">
                  {/* Placeholder activity items */}
                  <div className="bg-secondary/30 p-3 rounded-lg flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <div className="bg-estate-100 p-1.5 rounded-full">
                        <Mail className="h-4 w-4 text-estate-600" />
                      </div>
                      <div>
                        <p className="text-sm font-medium">New inquiry received</p>
                        <p className="text-xs text-muted-foreground">For Luxury Penthouse property</p>
                      </div>
                    </div>
                    <span className="text-xs text-muted-foreground">2 hours ago</span>
                  </div>
                  
                  <div className="bg-secondary/30 p-3 rounded-lg flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <div className="bg-estate-100 p-1.5 rounded-full">
                        <Home className="h-4 w-4 text-estate-600" />
                      </div>
                      <div>
                        <p className="text-sm font-medium">Property approved</p>
                        <p className="text-xs text-muted-foreground">Modern Loft in Downtown</p>
                      </div>
                    </div>
                    <span className="text-xs text-muted-foreground">1 day ago</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        
        {/* Properties Section */}
        <div className="mb-12">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-xl font-bold">Your Properties</h2>
            <Button asChild>
              <a href="/agent/add-property" className="flex items-center gap-2">
                <Plus className="h-4 w-4" />
                Add Property
              </a>
            </Button>
          </div>
          
          {properties.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {properties.map(property => (
                <PropertyCard key={property.id} property={property} />
              ))}
            </div>
          ) : (
            <div className="bg-muted/50 rounded-xl border p-8 text-center">
              <Home className="h-12 w-12 mx-auto text-muted-foreground mb-4" />
              <h3 className="text-lg font-medium mb-2">No properties yet</h3>
              <p className="text-muted-foreground mb-6">
                Start adding properties to showcase your listings.
              </p>
              <Button asChild>
                <a href="/agent/add-property">Add Your First Property</a>
              </Button>
            </div>
          )}
          
          {properties.length > 3 && (
            <div className="mt-6 text-center">
              <Button variant="outline" asChild>
                <a href="/agent/properties" className="flex items-center gap-2">
                  View All Properties
                  <ChevronRight className="h-4 w-4" />
                </a>
              </Button>
            </div>
          )}
        </div>
      </div>
      
      <div className="mt-auto">
        <Footer />
      </div>
    </div>
  );
};

export default AgentDashboard;
