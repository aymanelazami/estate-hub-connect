
import { useState, useEffect } from 'react';
import { MainNav } from '@/components/MainNav';
import { Footer } from '@/components/Footer';
import { AgencyCard } from '@/components/AgencyCard';
import { Button } from '@/components/ui/button';
import { Agency } from '@/types';
import { mockAgencies, initializeMockData } from '@/data/mockData';
import { Building } from 'lucide-react';
import { AdvancedSearchContainer } from '@/components/search/AdvancedSearchContainer';
import { SearchFilters } from '@/components/search/AdvancedSearchFilters';

const Agencies = () => {
  const [agencies, setAgencies] = useState<Agency[]>([]);
  const [filteredAgencies, setFilteredAgencies] = useState<Agency[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const data = initializeMockData();
    setAgencies(data.agencies);
    setFilteredAgencies(data.agencies);
    setIsLoading(false);
  }, []);

  const handleSearch = (searchTerm: string, filters: SearchFilters) => {
    let results = [...agencies];
    
    // Filter by search term
    if (searchTerm) {
      results = results.filter(agency => 
        agency.name.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }
    
    // Apply specific filters
    if (filters.location) {
      results = results.filter(agency => 
        agency.location.toLowerCase() === filters.location?.toLowerCase()
      );
    }
    
    if (filters.subscriptionPlan) {
      results = results.filter(agency => 
        agency.subscriptionPlan === filters.subscriptionPlan
      );
    }
    
    setFilteredAgencies(results);
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
          <AdvancedSearchContainer 
            type="agencies"
            onSearch={handleSearch}
          />
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
              <Button onClick={() => handleSearch('', {})}>Clear Filters</Button>
            </div>
          )}
        </div>
      </section>
      
      <Footer />
    </div>
  );
}

export default Agencies;
