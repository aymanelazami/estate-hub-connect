
import { Link } from 'react-router-dom';
import { Search, Filter, ChevronRight } from 'lucide-react';
import { Button } from '@/components/ui/button';

export function SearchPrompt() {
  return (
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
  );
}
