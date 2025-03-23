
import { useState } from 'react';
import { Link } from 'react-router-dom';
import { MainNav } from '@/components/MainNav';
import { Footer } from '@/components/Footer';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { mockAgencies } from '@/data/mockData';
import { Agency } from '@/types';
import { useToast } from '@/hooks/use-toast';
import { ArrowLeft } from 'lucide-react';
import { CreateAgencyForm } from '@/components/admin/CreateAgencyForm';
import { AgencyList } from '@/components/admin/AgencyList';

const AdminAgencyManagement = () => {
  const [agencies, setAgencies] = useState<Agency[]>(mockAgencies);
  const { toast } = useToast();

  const handleAgencyCreated = (newAgency: Agency) => {
    setAgencies([...agencies, newAgency]);
  };

  const toggleVerification = (agencyId: string) => {
    setAgencies(prev => 
      prev.map(agency => 
        agency.id === agencyId 
          ? { ...agency, verified: !agency.verified } 
          : agency
      )
    );
    
    const agency = agencies.find(a => a.id === agencyId);
    if (agency) {
      toast({
        title: agency.verified ? "Agency Unverified" : "Agency Verified",
        description: `${agency.name} has been ${agency.verified ? 'unverified' : 'verified'}.`,
      });
    }
  };

  return (
    <div className="min-h-screen flex flex-col">
      <MainNav />
      
      <div className="container py-8 mt-16 max-w-7xl mx-auto">
        <div className="mb-6 flex items-center gap-2">
          <Button variant="outline" size="sm" asChild>
            <Link to="/admin-dashboard" className="flex items-center gap-2">
              <ArrowLeft className="h-4 w-4" />
              Back to Admin Dashboard
            </Link>
          </Button>
        </div>
        
        <div className="flex flex-col space-y-2 mb-6">
          <h1 className="text-3xl font-bold">Agency Management</h1>
          <p className="text-muted-foreground">
            Create and manage real estate agencies on the platform
          </p>
        </div>
        
        <Tabs defaultValue="manage">
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="manage">Manage Agencies</TabsTrigger>
            <TabsTrigger value="create">Create New Agency</TabsTrigger>
          </TabsList>
          
          <TabsContent value="manage" className="mt-6">
            <AgencyList 
              agencies={agencies} 
              onVerification={toggleVerification} 
            />
          </TabsContent>
          
          <TabsContent value="create" className="mt-6">
            <CreateAgencyForm onAgencyCreated={handleAgencyCreated} />
          </TabsContent>
        </Tabs>
      </div>
      
      <div className="mt-auto">
        <Footer />
      </div>
    </div>
  );
};

export default AdminAgencyManagement;
