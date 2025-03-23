
import { Button } from "@/components/ui/button";
import { Drawer, DrawerContent, DrawerTrigger } from "@/components/ui/drawer";
import { Filter } from "lucide-react";
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
        <div className="mt-6 max-h-[80vh] overflow-y-auto pb-8">
          <AdvancedSearchFilters
            type={type}
            filters={filters}
            onFilterChange={onFilterChange}
            onClearFilters={onClearFilters}
            activeFiltersCount={activeFiltersCount}
          />
        </div>
      </DrawerContent>
    </Drawer>
  );
}
