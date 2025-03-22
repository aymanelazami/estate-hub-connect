
import { useAuth } from '@/contexts/AuthContext';
import { Navigate } from 'react-router-dom';
import { MainNav } from '@/components/MainNav';
import { Footer } from '@/components/Footer';
import { Button } from '@/components/ui/button';
import { PropertyCard } from '@/components/PropertyCard';
import { AgentCard } from '@/components/AgentCard';
import { mockAgencies, mockAgents, mockProperties, initializeMockData } from '@/data/mockData';
import { useEffect, useState } from 'react';
import { Agency, Agent, Property } from '@/types';
import { Building, Home, Users, Plus, ChevronRight, BarChart, PieChart, DollarSign } from 'lucide-react';

const AgencyDashboard = () => {
  const { user } = useAuth();
  const [agency, setAgency] = useState<Agency | null>(null);
  const [properties, setProperties] = useState<Property[]>([]);
  const [agents, setAgents] = useState<Agent[]>([]);
  
  useEffect(() => {
    // For demo purposes, just use the first agency from mock data
    const data = initializeMockData();
    setAgency(data.agencies[0]);
    setProperties(data.agencies[0].properties);
    setAgents(data.agencies[0].agents);
  }, []);
  
  // If user is not agency, redirect to home
  if (!user || user.role !== 'agency') {
    return <Navigate to="/" />;
  }

  if (!agency) {
    return <div className="min-h-screen flex items-center justify-center">Loading...</div>;
  }

  return (
    <div className="min-h-screen flex flex-col">
      <MainNav />
      
      <div className="bg-estate-50 dark:bg-estate-950 border-b">
        <div className="container py-8">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
            <div>
              <div className="flex items-center gap-3">
                <h1 className="text-3xl font-bold">{agency.name}</h1>
                <span className="badge bg-green-100 text-green-800 text-xs px-2 py-1 rounded-full">
                  {agency.subscriptionPlan.charAt(0).toUpperCase() + agency.subscriptionPlan.slice(1)} Plan
                </span>
              </div>
              <p className="text-muted-foreground mt-2">
                Manage your agency, agents, and property listings
              </p>
            </div>
            <Button asChild>
              <a href="/agency/edit-profile">Edit Agency Profile</a>
            </Button>
          </div>
        </div>
      </div>
      
      <div className="container py-8 animate-fade-up">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <div className="bg-card border rounded-xl p-6">
            <div className="flex items-start justify-between">
              <div>
                <p className="text-muted-foreground text-sm">Property Listings</p>
                <h3 className="text-3xl font-bold mt-1">{properties.length}</h3>
              </div>
              <div className="bg-estate-100 p-3 rounded-full">
                <Home className="h-6 w-6 text-estate-600" />
              </div>
            </div>
            <p className="text-sm mt-2">
              <span className="text-estate-600 font-medium">
                {agency.subscriptionPlan === 'basic' ? 5 : agency.subscriptionPlan === 'standard' ? 20 : 100}
              </span>
              <span className="text-muted-foreground">
                {' '}max listings on your plan
              </span>
            </p>
          </div>
          
          <div className="bg-card border rounded-xl p-6">
            <div className="flex items-start justify-between">
              <div>
                <p className="text-muted-foreground text-sm">Active Agents</p>
                <h3 className="text-3xl font-bold mt-1">{agents.length}</h3>
              </div>
              <div className="bg-estate-100 p-3 rounded-full">
                <Users className="h-6 w-6 text-estate-600" />
              </div>
            </div>
            <div className="mt-4 flex items-center gap-2 text-sm text-muted-foreground">
              <span className="text-green-600">All agents active</span>
            </div>
          </div>
          
          <div className="bg-card border rounded-xl p-6">
            <div className="flex items-start justify-between">
              <div>
                <p className="text-muted-foreground text-sm">Subscription</p>
                <h3 className="text-3xl font-bold mt-1 capitalize">{agency.subscriptionPlan}</h3>
              </div>
              <div className="bg-estate-100 p-3 rounded-full">
                <DollarSign className="h-6 w-6 text-estate-600" />
              </div>
            </div>
            <div className="mt-4">
              <Button variant="outline" size="sm" asChild>
                <a href="/agency/upgrade-plan">Upgrade Plan</a>
              </Button>
            </div>
          </div>
        </div>
        
        {/* Properties Section */}
        <div className="mb-12">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-xl font-bold">Your Properties</h2>
            <Button asChild>
              <a href="/agency/add-property" className="flex items-center gap-2">
                <Plus className="h-4 w-4" />
                Add Property
              </a>
            </Button>
          </div>
          
          {properties.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {properties.slice(0, 3).map(property => (
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
                <a href="/agency/add-property">Add Your First Property</a>
              </Button>
            </div>
          )}
          
          {properties.length > 3 && (
            <div className="mt-6 text-center">
              <Button variant="outline" asChild>
                <a href="/agency/properties" className="flex items-center gap-2">
                  View All Properties
                  <ChevronRight className="h-4 w-4" />
                </a>
              </Button>
            </div>
          )}
        </div>
        
        {/* Agents Section */}
        <div className="mb-12">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-xl font-bold">Your Agents</h2>
            <Button asChild>
              <a href="/agency/add-agent" className="flex items-center gap-2">
                <Plus className="h-4 w-4" />
                Add Agent
              </a>
            </Button>
          </div>
          
          {agents.length > 0 ? (
            <div className="grid grid-cols-1 gap-6">
              {agents.map(agent => (
                <AgentCard key={agent.id} agent={agent} />
              ))}
            </div>
          ) : (
            <div className="bg-muted/50 rounded-xl border p-8 text-center">
              <Users className="h-12 w-12 mx-auto text-muted-foreground mb-4" />
              <h3 className="text-lg font-medium mb-2">No agents yet</h3>
              <p className="text-muted-foreground mb-6">
                Add agents to your agency to help manage properties.
              </p>
              <Button asChild>
                <a href="/agency/add-agent">Add Your First Agent</a>
              </Button>
            </div>
          )}
        </div>
        
        {/* Analytics Section */}
        <div>
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-xl font-bold">Performance Analytics</h2>
            <Button variant="outline" asChild>
              <a href="/agency/analytics" className="flex items-center gap-2">
                <BarChart className="h-4 w-4" />
                Detailed Analytics
              </a>
            </Button>
          </div>
          
          <div className="bg-card border rounded-xl p-6">
            <div className="text-center py-12 px-4">
              <PieChart className="h-16 w-16 mx-auto text-muted-foreground mb-4" />
              <h3 className="text-lg font-medium mb-2">Analytics Available on Standard and Premium Plans</h3>
              <p className="text-muted-foreground mb-6 max-w-md mx-auto">
                Upgrade your subscription to access detailed analytics about your property listings and performance.
              </p>
              <Button asChild>
                <a href="/agency/upgrade-plan">Upgrade Your Plan</a>
              </Button>
            </div>
          </div>
        </div>
      </div>
      
      <div className="mt-auto">
        <Footer />
      </div>
    </div>
  );
};

export default AgencyDashboard;
