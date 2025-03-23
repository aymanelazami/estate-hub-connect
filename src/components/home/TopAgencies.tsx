
import { Link } from 'react-router-dom';
import { Building, ArrowRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { AgencyCard } from '@/components/AgencyCard';
import { Agency } from '@/types';

interface TopAgenciesProps {
  agencies: Agency[];
}

export function TopAgencies({ agencies }: TopAgenciesProps) {
  return (
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
        {agencies.map((agency) => (
          <AgencyCard key={agency.id} agency={agency} />
        ))}
      </div>
    </section>
  );
}
