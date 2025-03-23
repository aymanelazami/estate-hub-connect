
import { useState } from 'react';
import { Link } from 'react-router-dom';
import { MainNav } from '@/components/MainNav';
import { Footer } from '@/components/Footer';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Textarea } from '@/components/ui/textarea';
import { mockAgencies } from '@/data/mockData';
import { Agency, SubscriptionPlan, SUBSCRIPTION_PLANS } from '@/types';
import { useToast } from '@/hooks/use-toast';
import { AgencyCard } from '@/components/AgencyCard';
import { ArrowLeft, Building, Plus, Search, Check, X } from 'lucide-react';

const AdminAgencyManagement = () => {
  const [agencies, setAgencies] = useState<Agency[]>(mockAgencies);
  const [searchTerm, setSearchTerm] = useState('');
  const [newAgency, setNewAgency] = useState({
    name: '',
    email: '',
    website: '',
    address: '',
    location: '',
    subscriptionPlan: 'basic' as SubscriptionPlan,
  });
  const { toast } = useToast();

  const filteredAgencies = agencies.filter(agency => 
    agency.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    agency.location.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setNewAgency(prev => ({ ...prev, [name]: value }));
  };

  const handleSelectChange = (value: string) => {
    setNewAgency(prev => ({ ...prev, subscriptionPlan: value as SubscriptionPlan }));
  };

  const handleCreateAgency = () => {
    // In a real app, this would create the agency in the database
    const newId = `agency-${Date.now()}`;
    const newUserId = `user-${Date.now()}`;
    
    const agency: Agency = {
      id: newId,
      userId: newUserId,
      name: newAgency.name,
      website: newAgency.website || undefined,
      location: newAgency.location,
      address: newAgency.address,
      subscriptionPlan: newAgency.subscriptionPlan,
      verified: false,
      agents: [],
      properties: [],
      createdAt: new Date(),
    };
    
    setAgencies([...agencies, agency]);
    
    // Reset form
    setNewAgency({
      name: '',
      email: '',
      website: '',
      address: '',
      location: '',
      subscriptionPlan: 'basic',
    });
    
    toast({
      title: "Agency Created",
      description: `${agency.name} has been created successfully.`,
    });
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
            <Card>
              <CardHeader>
                <CardTitle>Create New Agency</CardTitle>
                <CardDescription>
                  Fill in the details to create a new agency account
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="name">Agency Name</Label>
                  <Input 
                    id="name" 
                    name="name" 
                    value={newAgency.name} 
                    onChange={handleInputChange} 
                  />
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="email">Contact Email</Label>
                  <Input 
                    id="email" 
                    name="email" 
                    type="email" 
                    value={newAgency.email} 
                    onChange={handleInputChange} 
                  />
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="website">Website (Optional)</Label>
                  <Input 
                    id="website" 
                    name="website" 
                    value={newAgency.website} 
                    onChange={handleInputChange} 
                  />
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="location">Location</Label>
                  <Input 
                    id="location" 
                    name="location" 
                    value={newAgency.location} 
                    onChange={handleInputChange} 
                  />
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="address">Address</Label>
                  <Textarea 
                    id="address" 
                    name="address" 
                    value={newAgency.address} 
                    onChange={handleInputChange} 
                  />
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="subscriptionPlan">Subscription Plan</Label>
                  <Select
                    value={newAgency.subscriptionPlan}
                    onValueChange={handleSelectChange}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Select a plan" />
                    </SelectTrigger>
                    <SelectContent>
                      {SUBSCRIPTION_PLANS.map(plan => (
                        <SelectItem key={plan.name} value={plan.name}>
                          {plan.displayName} (${plan.price}/month)
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
              </CardContent>
              <CardFooter>
                <Button onClick={handleCreateAgency} className="gap-2">
                  <Plus className="h-4 w-4" />
                  Create Agency
                </Button>
              </CardFooter>
            </Card>
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
