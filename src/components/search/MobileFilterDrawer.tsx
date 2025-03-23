
import { Button } from "@/components/ui/button";
import { Drawer, DrawerClose, DrawerContent, DrawerFooter, DrawerHeader, DrawerTitle, DrawerTrigger } from "@/components/ui/drawer";
import { Filter, X } from "lucide-react";
import { AdvancedSearchFilters, SearchFilters } from "./AdvancedSearchFilters";

interface MobileFilterDrawerProps {
  type: 'properties' | 'agencies';
  filters: SearchFilters;
  onFilterChange: (filters: SearchFilters) => void;
  onClearFilters: () => void;
  activeFiltersCount: number;
}

export function MobileFilterDrawer({
  type,
  filters,
  onFilterChange,
  onClearFilters,
  activeFiltersCount
}: MobileFilterDrawerProps) {
  return (
    <Drawer>
      <DrawerTrigger asChild>
        <Button variant="outline" className="lg:hidden flex items-center gap-2">
          <Filter className="h-4 w-4" />
          Filters
          {activeFiltersCount > 0 && (
            <span className="ml-1 flex h-5 w-5 items-center justify-center rounded-full bg-primary text-[10px] font-medium text-primary-foreground">
              {activeFiltersCount}
            </span>
          )}
        </Button>
      </DrawerTrigger>
      <DrawerContent className="p-6 pt-0">
        <DrawerHeader className="px-0">
          <DrawerTitle className="flex items-center justify-between">
            <span>Filters</span>
            {activeFiltersCount > 0 && (
              <Button 
                variant="ghost" 
                size="sm" 
                onClick={onClearFilters}
                className="text-sm text-muted-foreground"
              >
                Clear all
              </Button>
            )}
          </DrawerTitle>
        </DrawerHeader>
        
        <div className="max-h-[70vh] overflow-y-auto pb-8">
          <AdvancedSearchFilters
            type={type}
            filters={filters}
            onFilterChange={onFilterChange}
            onClearFilters={onClearFilters}
            activeFiltersCount={activeFiltersCount}
          />
        </div>
        
        <DrawerFooter className="pt-2 px-0">
          <DrawerClose asChild>
            <Button>Apply Filters</Button>
          </DrawerClose>
        </DrawerFooter>
      </DrawerContent>
    </Drawer>
  );
}
