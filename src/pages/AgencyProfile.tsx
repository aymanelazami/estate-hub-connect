
import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { MainNav } from '@/components/MainNav';
import { Footer } from '@/components/Footer';
import { PropertyCard } from '@/components/PropertyCard';
import { AgentCard } from '@/components/AgentCard';
import { Button } from '@/components/ui/button';
import { 
  Building, 
  MapPin, 
  Globe, 
  Facebook, 
  Instagram, 
  Mail, 
  Phone, 
  Calendar,
  Users,
  Home,
} from 'lucide-react';
import { initializeMockData } from '@/data/mockData';
import { Agency } from '@/types';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';

const AgencyProfile = () => {
  const { id } = useParams<{ id: string }>();
  const [agency, setAgency] = useState<Agency | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // In a real application, you would fetch the agency data from the API
    const fetchAgency = async () => {
      setIsLoading(true);
      try {
        const data = initializeMockData();
        // Find the agency with the matching ID or use the first one for demo
        const foundAgency = id 
          ? data.agencies.find(a => a.id === id) 
          : data.agencies[0];
        
        setAgency(foundAgency || null);
      } catch (error) {
        console.error('Error fetching agency:', error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchAgency();
  }, [id]);

  if (isLoading) {
    return (
      <div className="min-h-screen flex flex-col">
        <MainNav />
        <div className="flex-1 flex items-center justify-center">
          <div className="text-center">
            <Building className="h-12 w-12 mx-auto text-muted-foreground animate-pulse" />
            <h2 className="mt-4 text-lg font-medium">Loading agency profile...</h2>
          </div>
        </div>
        <Footer />
      </div>
    );
  }

  if (!agency) {
    return (
      <div className="min-h-screen flex flex-col">
        <MainNav />
        <div className="flex-1 flex items-center justify-center">
          <div className="text-center">
            <Building className="h-12 w-12 mx-auto text-muted-foreground" />
            <h2 className="mt-4 text-lg font-medium">Agency not found</h2>
            <p className="text-muted-foreground mt-2">
              The agency you're looking for doesn't exist or has been removed.
            </p>
            <Button className="mt-6" asChild>
              <a href="/agencies">Browse Agencies</a>
            </Button>
          </div>
        </div>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col">
      <MainNav />
      
      {/* Agency Header */}
      <div className="bg-estate-50 dark:bg-estate-950 border-b animate-fade-up">
        <div className="container py-12">
          <div className="flex flex-col md:flex-row gap-8">
            {/* Logo */}
            <div className="w-24 h-24 rounded-lg border bg-white p-2 flex items-center justify-center overflow-hidden flex-shrink-0">
              {agency.logo ? (
                <img 
                  src={agency.logo} 
                  alt={`${agency.name} logo`} 
                  className="max-w-full max-h-full object-contain"
                />
              ) : (
                <Building className="h-12 w-12 text-muted-foreground" />
              )}
            </div>
            
            {/* Agency Info */}
            <div className="flex-1">
              <h1 className="text-3xl font-bold mb-2">{agency.name}</h1>
              <div className="flex flex-wrap gap-3 text-sm text-muted-foreground mb-4">
                <div className="flex items-center gap-1">
                  <MapPin className="h-4 w-4" />
                  <span>{agency.location}</span>
                </div>
                <div className="flex items-center gap-1">
                  <Calendar className="h-4 w-4" />
                  <span>Since {new Date(agency.createdAt).getFullYear()}</span>
                </div>
                <div className="flex items-center gap-1">
                  <Users className="h-4 w-4" />
                  <span>{agency.agents.length} Agents</span>
                </div>
                <div className="flex items-center gap-1">
                  <Home className="h-4 w-4" />
                  <span>{agency.properties.length} Properties</span>
                </div>
              </div>
              
              {/* Subscription Badge */}
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-medium capitalize bg-estate-100 text-estate-800 mb-4">
                {agency.subscriptionPlan} Plan
              </div>
              
              {/* Social Links */}
              <div className="flex flex-wrap items-center gap-3 mt-4">
                {agency.website && (
                  <a 
                    href={agency.website} 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="flex items-center gap-1 text-sm hover:text-estate-600 transition-colors"
                  >
                    <Globe className="h-4 w-4" />
                    <span>Website</span>
                  </a>
                )}
                
                {agency.facebook && (
                  <a 
                    href={agency.facebook} 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="flex items-center gap-1 text-sm hover:text-estate-600 transition-colors"
                  >
                    <Facebook className="h-4 w-4" />
                    <span>Facebook</span>
                  </a>
                )}
                
                {agency.instagram && (
                  <a 
                    href={agency.instagram} 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="flex items-center gap-1 text-sm hover:text-estate-600 transition-colors"
                  >
                    <Instagram className="h-4 w-4" />
                    <span>Instagram</span>
                  </a>
                )}
                
                <Button size="sm" variant="outline" asChild>
                  <a href={`mailto:${agency.userId}@example.com`}>
                    <Mail className="h-4 w-4 mr-1" />
                    Contact
                  </a>
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>
      
      {/* Agency Content */}
      <div className="container py-12 animate-fade-up" style={{ animationDelay: '100ms' }}>
        <Tabs defaultValue="properties" className="w-full">
          <TabsList className="mb-8">
            <TabsTrigger value="properties" className="flex items-center gap-2">
              <Home className="h-4 w-4" />
              Properties
            </TabsTrigger>
            <TabsTrigger value="agents" className="flex items-center gap-2">
              <Users className="h-4 w-4" />
              Agents
            </TabsTrigger>
            <TabsTrigger value="about" className="flex items-center gap-2">
              <Building className="h-4 w-4" />
              About
            </TabsTrigger>
          </TabsList>
          
          <TabsContent value="properties">
            <h2 className="text-2xl font-bold mb-6">Properties</h2>
            
            {agency.properties.length > 0 ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {agency.properties.map(property => (
                  <PropertyCard key={property.id} property={property} />
                ))}
              </div>
            ) : (
              <div className="text-center py-12 border rounded-lg bg-muted/30">
                <Home className="h-12 w-12 mx-auto text-muted-foreground mb-4" />
                <h3 className="text-lg font-medium mb-2">No properties listed</h3>
                <p className="text-muted-foreground max-w-md mx-auto">
                  This agency hasn't listed any properties yet.
                </p>
              </div>
            )}
          </TabsContent>
          
          <TabsContent value="agents">
            <h2 className="text-2xl font-bold mb-6">Agents</h2>
            
            {agency.agents.length > 0 ? (
              <div className="space-y-6">
                {agency.agents.map(agent => (
                  <AgentCard key={agent.id} agent={agent} />
                ))}
              </div>
            ) : (
              <div className="text-center py-12 border rounded-lg bg-muted/30">
                <Users className="h-12 w-12 mx-auto text-muted-foreground mb-4" />
                <h3 className="text-lg font-medium mb-2">No agents listed</h3>
                <p className="text-muted-foreground max-w-md mx-auto">
                  This agency hasn't added any agents yet.
                </p>
              </div>
            )}
          </TabsContent>
          
          <TabsContent value="about">
            <h2 className="text-2xl font-bold mb-6">About {agency.name}</h2>
            
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              <div className="space-y-6">
                <div>
                  <h3 className="text-lg font-medium mb-3">Agency Details</h3>
                  <div className="bg-card rounded-lg border p-6 space-y-4">
                    <div className="flex flex-col space-y-1">
                      <span className="text-sm text-muted-foreground">Agency Name</span>
                      <span className="font-medium">{agency.name}</span>
                    </div>
                    
                    <div className="flex flex-col space-y-1">
                      <span className="text-sm text-muted-foreground">Location</span>
                      <span className="font-medium">{agency.location}</span>
                    </div>
                    
                    <div className="flex flex-col space-y-1">
                      <span className="text-sm text-muted-foreground">Address</span>
                      <span className="font-medium">{agency.address}</span>
                    </div>
                    
                    <div className="flex flex-col space-y-1">
                      <span className="text-sm text-muted-foreground">Established</span>
                      <span className="font-medium">{new Date(agency.createdAt).toLocaleDateString()}</span>
                    </div>
                  </div>
                </div>
                
                <div>
                  <h3 className="text-lg font-medium mb-3">Connect with us</h3>
                  <div className="bg-card rounded-lg border p-6 space-y-4">
                    {agency.website && (
                      <div className="flex items-center gap-3">
                        <Globe className="h-5 w-5 text-muted-foreground" />
                        <a 
                          href={agency.website} 
                          target="_blank" 
                          rel="noopener noreferrer"
                          className="text-estate-600 hover:underline"
                        >
                          {agency.website.replace(/^https?:\/\//, '')}
                        </a>
                      </div>
                    )}
                    
                    {agency.facebook && (
                      <div className="flex items-center gap-3">
                        <Facebook className="h-5 w-5 text-muted-foreground" />
                        <a 
                          href={agency.facebook} 
                          target="_blank" 
                          rel="noopener noreferrer"
                          className="text-estate-600 hover:underline"
                        >
                          {agency.facebook.split('/').pop()}
                        </a>
                      </div>
                    )}
                    
                    {agency.instagram && (
                      <div className="flex items-center gap-3">
                        <Instagram className="h-5 w-5 text-muted-foreground" />
                        <a 
                          href={agency.instagram} 
                          target="_blank" 
                          rel="noopener noreferrer"
                          className="text-estate-600 hover:underline"
                        >
                          @{agency.instagram.split('/').pop()}
                        </a>
                      </div>
                    )}
                    
                    <div className="flex items-center gap-3">
                      <Mail className="h-5 w-5 text-muted-foreground" />
                      <a 
                        href={`mailto:${agency.userId}@example.com`}
                        className="text-estate-600 hover:underline"
                      >
                        {agency.userId}@example.com
                      </a>
                    </div>
                    
                    <div className="flex items-center gap-3">
                      <Phone className="h-5 w-5 text-muted-foreground" />
                      <span>+1 (555) 123-4567</span>
                    </div>
                  </div>
                </div>
              </div>
              
              <div>
                <h3 className="text-lg font-medium mb-3">About Us</h3>
                <div className="bg-card rounded-lg border p-6">
                  <p className="text-muted-foreground mb-4">
                    {agency.name} is a leading real estate agency based in {agency.location}, 
                    dedicated to providing exceptional service to our clients. With a team of 
                    {agency.agents.length} professional agents, we specialize in residential and 
                    commercial properties across the region.
                  </p>
                  
                  <p className="text-muted-foreground mb-4">
                    Our mission is to help our clients find their dream homes and make sound 
                    real estate investments. We pride ourselves on our deep market knowledge, 
                    personalized approach, and commitment to integrity.
                  </p>
                  
                  <p className="text-muted-foreground">
                    Whether you're looking to buy, sell, or rent, our team at {agency.name} is 
                    here to guide you through every step of the process, ensuring a smooth and 
                    successful real estate experience.
                  </p>
                </div>
              </div>
            </div>
          </TabsContent>
        </Tabs>
      </div>
      
      <Footer />
    </div>
  );
};

export default AgencyProfile;
