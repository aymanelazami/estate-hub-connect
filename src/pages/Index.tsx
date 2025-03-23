
import { useState, useEffect } from 'react';
import { MainNav } from '@/components/MainNav';
import { Footer } from '@/components/Footer';
import { HeroSection } from '@/components/HeroSection';
import { FeaturedProperties } from '@/components/home/FeaturedProperties';
import { SearchPrompt } from '@/components/home/SearchPrompt';
import { TopAgencies } from '@/components/home/TopAgencies';
import { SubscriptionPlansSection } from '@/components/home/SubscriptionPlansSection';
import { FeaturesSection } from '@/components/home/FeaturesSection';
import { mockProperties, mockAgencies, initializeMockData } from '@/data/mockData';
import { useAuth } from '@/contexts/AuthContext';

const Index = () => {
  const [featuredProperties, setFeaturedProperties] = useState(mockProperties.filter(p => p.featured));
  const [topAgencies, setTopAgencies] = useState(mockAgencies.slice(0, 4));
  const { user } = useAuth();

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
      <FeaturedProperties properties={featuredProperties} />
      
      {/* Search Prompt Section */}
      <SearchPrompt />
      
      {/* Top Agencies Section */}
      <TopAgencies agencies={topAgencies} />
      
      {/* Subscription Plans Section - Only visible to agencies or when not logged in */}
      <SubscriptionPlansSection user={user} />
      
      {/* Features Section */}
      <FeaturesSection />
      
      <Footer />
    </div>
  );
};

export default Index;
