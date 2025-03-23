
import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Home, ArrowRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { PropertyCard } from '@/components/PropertyCard';
import { Property } from '@/types';

interface FeaturedPropertiesProps {
  properties: Property[];
}

export function FeaturedProperties({ properties }: FeaturedPropertiesProps) {
  return (
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
        {properties.slice(0, 3).map((property) => (
          <PropertyCard key={property.id} property={property} />
        ))}
      </div>
    </section>
  );
}
