
import { useState, useEffect } from 'react';
import { SearchFilters, AdvancedSearchFilters } from './AdvancedSearchFilters';
import { MobileFilterDrawer } from './MobileFilterDrawer';
import { Search, SlidersHorizontal } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';
import {
  Sheet,
  SheetContent,
  SheetTrigger,
} from "@/components/ui/sheet";

interface AdvancedSearchContainerProps {
  type: 'properties' | 'agencies';
  onSearch: (searchTerm: string, filters: SearchFilters) => void;
  initialSearchTerm?: string;
  initialFilters?: SearchFilters;
}

export function AdvancedSearchContainer({
  type,
  onSearch,
  initialSearchTerm = '',
  initialFilters = {}
}: AdvancedSearchContainerProps) {
  const [searchTerm, setSearchTerm] = useState(initialSearchTerm);
  const [filters, setFilters] = useState<SearchFilters>(initialFilters);

  // Count active filters
  const countActiveFilters = (filters: SearchFilters) => {
    return Object.entries(filters).filter(([_, value]) => {
      if (value === undefined) return false;
      if (typeof value === 'boolean' && value === false) return false;
      return true;
    }).length;
  };

  const activeFiltersCount = countActiveFilters(filters);

  // Apply search and filters
  const handleSearch = () => {
    onSearch(searchTerm, filters);
  };

  // Clear all filters
  const clearFilters = () => {
    setFilters({});
  };

  // Handle filter changes
  const handleFilterChange = (newFilters: SearchFilters) => {
    setFilters(newFilters);
  };

  // Auto-search when filters change
  useEffect(() => {
    handleSearch();
  }, [filters]);

  return (
    <div className="w-full mb-6">
      <div className="flex flex-col gap-4">
        <div className="flex gap-2">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              onKeyDown={(e) => e.key === 'Enter' && handleSearch()}
              placeholder={`Search ${type}...`}
              className="pl-9"
            />
          </div>
          
          <Button onClick={handleSearch}>
            Search
          </Button>
        </div>
        
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <MobileFilterDrawer
              type={type}
              filters={filters}
              onFilterChange={handleFilterChange}
              onClearFilters={clearFilters}
              activeFiltersCount={activeFiltersCount}
            />
            
            <Sheet>
              <SheetTrigger asChild>
                <Button variant="outline" className="hidden lg:flex items-center gap-2">
                  <SlidersHorizontal className="h-4 w-4" />
                  Filters
                  {activeFiltersCount > 0 && (
                    <span className="ml-1 flex h-5 w-5 items-center justify-center rounded-full bg-primary text-[10px] font-medium text-primary-foreground">
                      {activeFiltersCount}
                    </span>
                  )}
                </Button>
              </SheetTrigger>
              <SheetContent side="left" className="w-[400px] sm:max-w-lg">
                <div className="px-1 py-6">
                  <AdvancedSearchFilters
                    type={type}
                    filters={filters}
                    onFilterChange={handleFilterChange}
                    onClearFilters={clearFilters}
                    activeFiltersCount={activeFiltersCount}
                  />
                </div>
              </SheetContent>
            </Sheet>
          </div>
          
          {activeFiltersCount > 0 && (
            <Button 
              variant="ghost" 
              size="sm" 
              onClick={clearFilters}
              className="text-sm text-muted-foreground"
            >
              Clear filters
            </Button>
          )}
        </div>
      </div>
    </div>
  );
}
