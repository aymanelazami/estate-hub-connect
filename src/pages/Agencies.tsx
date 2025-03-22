
import { useState, useEffect } from 'react';
import { MainNav } from '@/components/MainNav';
import { Footer } from '@/components/Footer';
import { AgencyCard } from '@/components/AgencyCard';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Agency, SubscriptionPlan } from '@/types';
import { mockAgencies, initializeMockData } from '@/data/mockData';
import { Building, Search, Filter, MapPin } from 'lucide-react';
import { 
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

const Agencies = () => {
  const [agencies, setAgencies] = useState<Agency[]>([]);
  const [filteredAgencies, setFilteredAgencies] = useState<Agency[]>([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedLocation, setSelectedLocation] = useState('');
  const [selectedPlan, setSelectedPlan] = useState<SubscriptionPlan | ''>('');
  const [isLoading, setIsLoading] = useState(true);

  // Get unique locations from agencies
  const locations = [...new Set(mockAgencies.map(agency => agency.location))];

  useEffect(() => {
    const data = initializeMockData();
    setAgencies(data.agencies);
    setFilteredAgencies(data.agencies);
    setIsLoading(false);
  }, []);

  useEffect(() => {
    // Apply filters when any filter changes
    let results = agencies;

    if (searchTerm) {
      results = results.filter(agency => 
        agency.name.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    if (selectedLocation) {
      results = results.filter(agency => 
        agency.location === selectedLocation
      );
    }

    if (selectedPlan) {
      results = results.filter(agency => 
        agency.subscriptionPlan === selectedPlan
      );
    }

    setFilteredAgencies(results);
  }, [searchTerm, selectedLocation, selectedPlan, agencies]);

  const clearFilters = () => {
    setSearchTerm('');
    setSelectedLocation('');
    setSelectedPlan('');
  };

  return (
    <div className="min-h-screen flex flex-col">
      <MainNav />
      
      {/* Page Header */}
      <div className="bg-estate-50 dark:bg-estate-950 border-b animate-fade-up">
        <div className="container py-12">
          <div className="flex items-center text-sm text-muted-foreground mb-2">
            <a href="/" className="hover:text-foreground">Home</a>
            <span className="mx-2">/</span>
            <span>Agencies</span>
          </div>
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
            <div>
              <h1 className="text-3xl font-bold mb-2">Real Estate Agencies</h1>
              <p className="text-muted-foreground">
                Browse and connect with our verified real estate agencies
              </p>
            </div>
            <Button className="flex items-center gap-2">
              <Building className="h-4 w-4" />
              Register Agency
            </Button>
          </div>
        </div>
      </div>
      
      {/* Filter Section */}
      <div className="border-b py-4 bg-background animate-fade-up" style={{ animationDelay: '100ms' }}>
        <div className="container">
          <div className="flex flex-col md:flex-row gap-4">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Search agencies..."
                className="pl-9"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
            
            <div className="flex flex-col sm:flex-row gap-4">
              <div className="w-full sm:w-48">
                <Select
                  value={selectedLocation}
                  onValueChange={setSelectedLocation}
                >
                  <SelectTrigger>
                    <div className="flex gap-2 items-center">
                      <MapPin className="h-4 w-4 text-muted-foreground" />
                      <SelectValue placeholder="Location" />
                    </div>
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="">All Locations</SelectItem>
                    {locations.map(location => (
                      <SelectItem key={location} value={location}>
                        {location}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              
              <div className="w-full sm:w-48">
                <Select
                  value={selectedPlan}
                  onValueChange={(value) => setSelectedPlan(value as SubscriptionPlan | '')}
                >
                  <SelectTrigger>
                    <div className="flex gap-2 items-center">
                      <Filter className="h-4 w-4 text-muted-foreground" />
                      <SelectValue placeholder="Plan" />
                    </div>
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="">All Plans</SelectItem>
                    <SelectItem value="basic">Basic</SelectItem>
                    <SelectItem value="standard">Standard</SelectItem>
                    <SelectItem value="premium">Premium</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              
              <Button variant="outline" onClick={clearFilters}>
                Clear Filters
              </Button>
            </div>
          </div>
        </div>
      </div>
      
      {/* Agencies List */}
      <section className="py-12 flex-1 animate-fade-up" style={{ animationDelay: '200ms' }}>
        <div className="container">
          {isLoading ? (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {Array.from({ length: 4 }).map((_, i) => (
                <div key={i} className="rounded-xl border bg-card p-6 animate-pulse">
                  <div className="flex gap-4">
                    <div className="h-16 w-16 rounded-full bg-muted" />
                    <div className="space-y-2 flex-1">
                      <div className="h-4 bg-muted rounded w-3/4" />
                      <div className="h-3 bg-muted rounded w-1/2" />
                    </div>
                  </div>
                  <div className="grid grid-cols-3 gap-3 mt-4">
                    {Array.from({ length: 3 }).map((_, j) => (
                      <div key={j} className="h-16 bg-muted rounded" />
                    ))}
                  </div>
                </div>
              ))}
            </div>
          ) : filteredAgencies.length > 0 ? (
            <>
              <div className="text-sm text-muted-foreground mb-6">
                Showing {filteredAgencies.length} agencies
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {filteredAgencies.map((agency) => (
                  <AgencyCard key={agency.id} agency={agency} />
                ))}
              </div>
            </>
          ) : (
            <div className="text-center py-12">
              <Building className="h-12 w-12 mx-auto text-muted-foreground mb-4" />
              <h3 className="text-xl font-medium mb-2">No agencies found</h3>
              <p className="text-muted-foreground mb-6">
                No agencies match your current search criteria.
              </p>
              <Button onClick={clearFilters}>Clear Filters</Button>
            </div>
          )}
        </div>
      </section>
      
      <Footer />
    </div>
  );
};

export default Agencies;
