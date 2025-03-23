
import { useState } from 'react';
import { Link } from 'react-router-dom';
import { MainNav } from '@/components/MainNav';
import { Footer } from '@/components/Footer';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { mockAgencies } from '@/data/mockData';
import { Agency } from '@/types';
import { useToast } from '@/hooks/use-toast';
import { AgencyCard } from '@/components/AgencyCard';
import { ArrowLeft, Building, Search, Check, X } from 'lucide-react';
import { CreateAgencyForm } from '@/components/admin/CreateAgencyForm';

const AdminAgencyManagement = () => {
  const [agencies, setAgencies] = useState<Agency[]>(mockAgencies);
  const [searchTerm, setSearchTerm] = useState('');
  const { toast } = useToast();

  const filteredAgencies = agencies.filter(agency => 
    agency.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    agency.location.toLowerCase().includes(searchTerm.toLowerCase())
  );

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
            <Card className="mb-6">
              <CardHeader>
                <CardTitle>Search Agencies</CardTitle>
                <CardDescription>
                  Search for agencies by name or location
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="relative max-w-md">
                  <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                  <Input
                    type="text"
                    placeholder="Search agencies..."
                    className="pl-8"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                  />
                </div>
              </CardContent>
            </Card>
            
            {filteredAgencies.length === 0 ? (
              <div className="bg-muted/50 rounded-xl border p-8 text-center">
                <Building className="h-12 w-12 mx-auto text-muted-foreground mb-4" />
                <h3 className="text-lg font-medium mb-2">No agencies found</h3>
                <p className="text-muted-foreground">
                  {searchTerm ? "Try adjusting your search terms." : "Create your first agency to get started."}
                </p>
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {filteredAgencies.map(agency => (
                  <div key={agency.id} className="relative">
                    <AgencyCard agency={agency} />
                    <div className="absolute top-2 right-2 flex gap-2">
                      <Button
                        variant={agency.verified ? "outline" : "default"}
                        size="sm"
                        onClick={() => toggleVerification(agency.id)}
                        className={`${agency.verified ? 'bg-white text-green-600' : 'bg-green-600'}`}
                      >
                        {agency.verified ? <X className="h-4 w-4" /> : <Check className="h-4 w-4" />}
                        {agency.verified ? 'Unverify' : 'Verify'}
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
            )}
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
