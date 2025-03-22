
import { MainNav } from '@/components/MainNav';
import { Footer } from '@/components/Footer';
import { HeroSection } from '@/components/HeroSection';
import { PropertyCard } from '@/components/PropertyCard';
import { AgencyCard } from '@/components/AgencyCard';
import { SubscriptionPlanCard } from '@/components/SubscriptionPlanCard';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { Building, Home, Users, ArrowRight, Search, Filter, ChevronRight } from 'lucide-react';
import { mockProperties, mockAgencies, initializeMockData } from '@/data/mockData';
import { SUBSCRIPTION_PLANS } from '@/types';

const Index = () => {
  const [featuredProperties, setFeaturedProperties] = useState(mockProperties.filter(p => p.featured));
  const [topAgencies, setTopAgencies] = useState(mockAgencies.slice(0, 4));

  useEffect(() => {
    // Initialize the relationships between entities
    const data = initializeMockData();
    setFeaturedProperties(data.properties.filter(p => p.featured));
    setTopAgencies(data.agencies.slice(0, 4));
  }, []);

  return (
    <div className="min-h-screen flex flex-col">
      <MainNav />
      
      {/* Hero Section */}
      <HeroSection
        title="Find Your Perfect Property with EstateHub"
        subtitle="Connect with top real estate agents and agencies to find your dream home or investment property."
        ctaText="Explore Properties"
        ctaLink="/properties"
        secondaryCtaText="Join as Agent or Agency"
        secondaryCtaLink="/sign-up"
        backgroundImage="https://images.unsplash.com/photo-1582407947304-fd86f028f716?q=80&w=2000&auto=format&fit=crop"
        className="mt-0"
      />
      
      {/* Featured Properties Section */}
      <section className="py-16 container animate-fade-up">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-10">
          <div>
            <div className="inline-flex items-center px-3 py-1 rounded-full bg-estate-100 text-estate-800 text-sm font-medium mb-4">
              <Home className="h-4 w-4 mr-2" />
              Featured Properties
            </div>
            <h2 className="text-3xl font-bold">Discover Premium Listings</h2>
          </div>
          <Button variant="outline" asChild className="mt-4 md:mt-0">
            <Link to="/properties" className="flex items-center gap-2">
              View All Properties
              <ArrowRight className="h-4 w-4" />
            </Link>
          </Button>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {featuredProperties.slice(0, 3).map((property) => (
            <PropertyCard key={property.id} property={property} />
          ))}
        </div>
      </section>
      
      {/* Search Prompt Section */}
      <section className="py-16 bg-gradient-to-r from-estate-950 to-estate-800 text-white">
        <div className="container">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-8">
            <div className="md:max-w-lg">
              <h2 className="text-3xl font-bold mb-4">Ready to Find Your Dream Home?</h2>
              <p className="text-white/80 mb-6">
                Use our advanced search tools to find properties that match your exact requirements. Filter by location, price, number of bedrooms, and more.
              </p>
              <div className="flex flex-col sm:flex-row gap-4">
                <Button size="lg" className="bg-white text-estate-900 hover:bg-white/90" asChild>
                  <Link to="/properties" className="flex items-center gap-2">
                    <Search className="h-4 w-4" />
                    Search Properties
                  </Link>
                </Button>
                <Button size="lg" variant="outline" className="border-white/20 hover:bg-white/10" asChild>
                  <Link to="/properties/advanced-search" className="flex items-center gap-2">
                    <Filter className="h-4 w-4" />
                    Advanced Filters
                  </Link>
                </Button>
              </div>
            </div>
            
            <div className="glass rounded-xl p-6 md:w-96 backdrop-blur">
              <h3 className="font-semibold text-xl mb-4">Popular Searches</h3>
              <div className="space-y-3">
                <Link to="/properties?type=apartment" className="flex items-center justify-between p-3 rounded-lg bg-white/10 hover:bg-white/20 transition-colors">
                  <span>Apartments for Sale</span>
                  <ChevronRight className="h-4 w-4" />
                </Link>
                <Link to="/properties?type=house" className="flex items-center justify-between p-3 rounded-lg bg-white/10 hover:bg-white/20 transition-colors">
                  <span>Houses and Villas</span>
                  <ChevronRight className="h-4 w-4" />
                </Link>
                <Link to="/properties?type=commercial" className="flex items-center justify-between p-3 rounded-lg bg-white/10 hover:bg-white/20 transition-colors">
                  <span>Commercial Properties</span>
                  <ChevronRight className="h-4 w-4" />
                </Link>
                <Link to="/properties?feature=featured" className="flex items-center justify-between p-3 rounded-lg bg-white/10 hover:bg-white/20 transition-colors">
                  <span>Featured Listings</span>
                  <ChevronRight className="h-4 w-4" />
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>
      
      {/* Top Agencies Section */}
      <section className="py-16 container animate-fade-up">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-10">
          <div>
            <div className="inline-flex items-center px-3 py-1 rounded-full bg-estate-100 text-estate-800 text-sm font-medium mb-4">
              <Building className="h-4 w-4 mr-2" />
              Top Agencies
            </div>
            <h2 className="text-3xl font-bold">Leading Real Estate Agencies</h2>
          </div>
          <Button variant="outline" asChild className="mt-4 md:mt-0">
            <Link to="/agencies" className="flex items-center gap-2">
              View All Agencies
              <ArrowRight className="h-4 w-4" />
            </Link>
          </Button>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {topAgencies.slice(0, 4).map((agency) => (
            <AgencyCard key={agency.id} agency={agency} />
          ))}
        </div>
      </section>
      
      {/* Subscription Plans Section */}
      <section className="py-16 bg-secondary/50 border-y animate-fade-up">
        <div className="container">
          <div className="text-center max-w-2xl mx-auto mb-12">
            <div className="inline-flex items-center px-3 py-1 rounded-full bg-estate-100 text-estate-800 text-sm font-medium mb-4">
              <Users className="h-4 w-4 mr-2" />
              For Agencies
            </div>
            <h2 className="text-3xl font-bold mb-4">Choose the Right Plan for Your Agency</h2>
            <p className="text-muted-foreground">
              Select a subscription plan that fits your agency's needs and helps you reach more clients.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl mx-auto">
            {SUBSCRIPTION_PLANS.map((plan) => (
              <SubscriptionPlanCard 
                key={plan.name} 
                plan={plan} 
                onSelect={() => {}}
              />
            ))}
          </div>
          
          <div className="text-center mt-12">
            <Button size="lg" asChild>
              <Link to="/sign-up" className="flex items-center gap-2">
                Join as an Agency
                <ArrowRight className="h-4 w-4" />
              </Link>
            </Button>
          </div>
        </div>
      </section>
      
      {/* Features Section */}
      <section className="py-16 container">
        <div className="text-center max-w-2xl mx-auto mb-12">
          <h2 className="text-3xl font-bold mb-4">Why Choose EstateHub?</h2>
          <p className="text-muted-foreground">
            We provide a comprehensive platform for real estate professionals and clients to connect and transact with confidence.
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="bg-card p-6 rounded-xl border transition-all hover:shadow-md">
            <div className="h-12 w-12 bg-estate-100 rounded-full flex items-center justify-center mb-4">
              <Building className="h-6 w-6 text-estate-600" />
            </div>
            <h3 className="text-xl font-semibold mb-2">Agency Management</h3>
            <p className="text-muted-foreground">
              Powerful tools for agencies to manage their agents, property listings, and client relationships.
            </p>
          </div>
          
          <div className="bg-card p-6 rounded-xl border transition-all hover:shadow-md">
            <div className="h-12 w-12 bg-estate-100 rounded-full flex items-center justify-center mb-4">
              <Users className="h-6 w-6 text-estate-600" />
            </div>
            <h3 className="text-xl font-semibold mb-2">Agent Support</h3>
            <p className="text-muted-foreground">
              Resources and tools to help agents list properties, connect with clients, and grow their business.
            </p>
          </div>
          
          <div className="bg-card p-6 rounded-xl border transition-all hover:shadow-md">
            <div className="h-12 w-12 bg-estate-100 rounded-full flex items-center justify-center mb-4">
              <Home className="h-6 w-6 text-estate-600" />
            </div>
            <h3 className="text-xl font-semibold mb-2">Property Listings</h3>
            <p className="text-muted-foreground">
              High-quality, verified property listings with detailed information and beautiful presentations.
            </p>
          </div>
        </div>
      </section>
      
      <Footer />
    </div>
  );
};

export default Index;
