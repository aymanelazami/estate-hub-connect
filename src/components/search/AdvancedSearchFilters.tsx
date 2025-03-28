
import { useState } from 'react';
import { 
  MapPin,
  Building,
  BedDouble,
  Bath,
  DollarSign,
  Star,
  Filter,
  X,
  ArrowDownUp,
  Check
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Separator } from '@/components/ui/separator';
import { 
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { 
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Badge } from '@/components/ui/badge';
import { SubscriptionPlan } from '@/types';
import { cn } from '@/lib/utils';
import { Command, CommandEmpty, CommandGroup, CommandInput, CommandItem } from "@/components/ui/command";

// Property Types
const PROPERTY_TYPES = [
  'Apartment', 
  'House', 
  'Villa', 
  'Office', 
  'Commercial',
  'Land',
  'Industrial'
];

// Locations (could be fetched from API in a real app)
const LOCATIONS = [
  'New York', 
  'Los Angeles', 
  'Chicago', 
  'San Francisco', 
  'Miami',
  'Seattle',
  'Austin'
];

// Price ranges
const PRICE_RANGES = [
  { label: 'Any Price', min: 0, max: 10000000 },
  { label: 'Under $100k', min: 0, max: 100000 },
  { label: '$100k - $250k', min: 100000, max: 250000 },
  { label: '$250k - $500k', min: 250000, max: 500000 },
  { label: '$500k - $750k', min: 500000, max: 750000 },
  { label: '$750k - $1M', min: 750000, max: 1000000 },
  { label: 'Over $1M', min: 1000000, max: 10000000 },
];

export interface SearchFilters {
  location?: string | string[];
  propertyType?: string | string[];
  minPrice?: number;
  maxPrice?: number;
  minBedrooms?: number;
  minBathrooms?: number;
  subscriptionPlan?: SubscriptionPlan;
  status?: string;
  featured?: boolean;
}

interface AdvancedSearchFiltersProps {
  type: 'properties' | 'agencies';
  filters: SearchFilters;
  onFilterChange: (filters: SearchFilters) => void;
  onClearFilters: () => void;
  activeFiltersCount: number;
}

export function AdvancedSearchFilters({
  type,
  filters,
  onFilterChange,
  onClearFilters,
  activeFiltersCount,
}: AdvancedSearchFiltersProps) {

  // Handle filter changes
  const handleFilterChange = (key: keyof SearchFilters, value: any) => {
    onFilterChange({ ...filters, [key]: value });
  };

  // For price range selection
  const handlePriceRangeChange = (rangeIndex: string) => {
    const index = parseInt(rangeIndex);
    if (index >= 0 && index < PRICE_RANGES.length) {
      const range = PRICE_RANGES[index];
      onFilterChange({ 
        ...filters, 
        minPrice: range.min, 
        maxPrice: range.max 
      });
    }
  };

  // Get current price range label
  const getCurrentPriceRangeLabel = () => {
    const { minPrice, maxPrice } = filters;
    if (minPrice === undefined || maxPrice === undefined) return 'Any Price';
    
    const selectedRange = PRICE_RANGES.find(
      range => range.min === minPrice && range.max === maxPrice
    );
    
    return selectedRange?.label || 'Custom Range';
  };

  // Get the index of the current price range
  const getCurrentPriceRangeIndex = () => {
    const { minPrice, maxPrice } = filters;
    if (minPrice === undefined || maxPrice === undefined) return '0';
    
    const index = PRICE_RANGES.findIndex(
      range => range.min === minPrice && range.max === maxPrice
    );
    
    return index >= 0 ? index.toString() : '0';
  };

  // For multi-select handling
  const [locationOpen, setLocationOpen] = useState(false);
  const [propertyTypeOpen, setPropertyTypeOpen] = useState(false);

  // Convert location to array if it's a string or undefined
  const getLocationArray = (): string[] => {
    if (!filters.location) return [];
    return Array.isArray(filters.location) ? filters.location : [filters.location];
  };

  // Convert propertyType to array if it's a string or undefined
  const getPropertyTypeArray = (): string[] => {
    if (!filters.propertyType) return [];
    return Array.isArray(filters.propertyType) ? filters.propertyType : [filters.propertyType];
  };

  // Toggle item in array helper function
  const toggleArrayItem = (array: string[], item: string): string[] => {
    return array.includes(item)
      ? array.filter(i => i !== item)
      : [...array, item];
  };

  return (
    <div className="w-full">
      <div className="flex items-center justify-between mb-4">
        <h3 className="font-medium text-lg">Filters</h3>
        {activeFiltersCount > 0 && (
          <Button 
            variant="ghost" 
            size="sm" 
            onClick={onClearFilters}
            className="text-muted-foreground flex items-center gap-1"
          >
            <X className="h-3.5 w-3.5" />
            Clear All
          </Button>
        )}
      </div>

      <div className="space-y-4">
        {/* Location Filter - Now with multi-select */}
        <div className="space-y-2">
          <Label htmlFor="location" className="text-sm font-medium">Location</Label>
          <Popover open={locationOpen} onOpenChange={setLocationOpen}>
            <PopoverTrigger asChild>
              <Button 
                variant="outline" 
                role="combobox" 
                aria-expanded={locationOpen}
                className="w-full justify-start text-left font-normal"
              >
                <MapPin className="h-4 w-4 text-muted-foreground mr-2" />
                {getLocationArray().length > 0 ? (
                  getLocationArray().length === 1 
                    ? getLocationArray()[0]
                    : `${getLocationArray().length} locations selected`
                ) : (
                  "Any Location"
                )}
              </Button>
            </PopoverTrigger>
            <PopoverContent className="w-full p-0" align="start">
              <Command>
                <CommandInput placeholder="Search location..." />
                <CommandEmpty>No location found.</CommandEmpty>
                <CommandGroup className="max-h-64 overflow-auto">
                  {LOCATIONS.map((location) => {
                    const isSelected = getLocationArray().includes(location);
                    return (
                      <CommandItem
                        key={location}
                        value={location}
                        onSelect={() => {
                          const updatedLocations = toggleArrayItem(getLocationArray(), location);
                          handleFilterChange('location', updatedLocations.length > 0 ? updatedLocations : undefined);
                        }}
                      >
                        <div className={cn(
                          "mr-2 flex h-4 w-4 items-center justify-center rounded-sm border border-primary",
                          isSelected ? "bg-primary text-primary-foreground" : "opacity-50"
                        )}>
                          {isSelected && <Check className="h-3 w-3" />}
                        </div>
                        {location}
                      </CommandItem>
                    );
                  })}
                </CommandGroup>
              </Command>
            </PopoverContent>
          </Popover>
        </div>

        {/* Property Type Filter - Only shown for properties search - Now with multi-select */}
        {type === 'properties' && (
          <div className="space-y-2">
            <Label htmlFor="propertyType" className="text-sm font-medium">Property Type</Label>
            <Popover open={propertyTypeOpen} onOpenChange={setPropertyTypeOpen}>
              <PopoverTrigger asChild>
                <Button 
                  variant="outline" 
                  role="combobox" 
                  aria-expanded={propertyTypeOpen}
                  className="w-full justify-start text-left font-normal"
                >
                  <Building className="h-4 w-4 text-muted-foreground mr-2" />
                  {getPropertyTypeArray().length > 0 ? (
                    getPropertyTypeArray().length === 1 
                      ? getPropertyTypeArray()[0]
                      : `${getPropertyTypeArray().length} types selected`
                  ) : (
                    "Any Type"
                  )}
                </Button>
              </PopoverTrigger>
              <PopoverContent className="w-full p-0" align="start">
                <Command>
                  <CommandInput placeholder="Search property type..." />
                  <CommandEmpty>No property type found.</CommandEmpty>
                  <CommandGroup className="max-h-64 overflow-auto">
                    {PROPERTY_TYPES.map((type) => {
                      const isSelected = getPropertyTypeArray().includes(type.toLowerCase());
                      return (
                        <CommandItem
                          key={type}
                          value={type}
                          onSelect={() => {
                            const updatedTypes = toggleArrayItem(getPropertyTypeArray(), type.toLowerCase());
                            handleFilterChange('propertyType', updatedTypes.length > 0 ? updatedTypes : undefined);
                          }}
                        >
                          <div className={cn(
                            "mr-2 flex h-4 w-4 items-center justify-center rounded-sm border border-primary",
                            isSelected ? "bg-primary text-primary-foreground" : "opacity-50"
                          )}>
                            {isSelected && <Check className="h-3 w-3" />}
                          </div>
                          {type}
                        </CommandItem>
                      );
                    })}
                  </CommandGroup>
                </Command>
              </PopoverContent>
            </Popover>
          </div>
        )}

        {/* Price Range Filter - Only shown for properties search */}
        {type === 'properties' && (
          <div className="space-y-2">
            <Label htmlFor="priceRange" className="text-sm font-medium">Price Range</Label>
            <Select
              value={getCurrentPriceRangeIndex()}
              onValueChange={handlePriceRangeChange}
            >
              <SelectTrigger id="priceRange" className="w-full">
                <div className="flex items-center gap-2">
                  <DollarSign className="h-4 w-4 text-muted-foreground" />
                  <SelectValue placeholder="Any Price" />
                </div>
              </SelectTrigger>
              <SelectContent>
                {PRICE_RANGES.map((range, index) => (
                  <SelectItem key={range.label} value={index.toString()}>
                    {range.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            
            {/* Custom price range inputs */}
            {getCurrentPriceRangeLabel() === 'Custom Range' && (
              <div className="flex gap-2 mt-2">
                <div className="flex-1">
                  <Input
                    type="number"
                    placeholder="Min $"
                    value={filters.minPrice || ''}
                    onChange={(e) => handleFilterChange('minPrice', Number(e.target.value))}
                    className="w-full"
                  />
                </div>
                <div className="flex items-center">
                  <ArrowDownUp className="h-4 w-4 text-muted-foreground" />
                </div>
                <div className="flex-1">
                  <Input
                    type="number"
                    placeholder="Max $"
                    value={filters.maxPrice || ''}
                    onChange={(e) => handleFilterChange('maxPrice', Number(e.target.value))}
                    className="w-full"
                  />
                </div>
              </div>
            )}
          </div>
        )}

        {/* Bedrooms & Bathrooms - Only shown for properties search */}
        {type === 'properties' && (
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="bedrooms" className="text-sm font-medium">Bedrooms</Label>
              <Select
                value={filters.minBedrooms?.toString() || "any-bedrooms"}
                onValueChange={(value) => handleFilterChange('minBedrooms', value === "any-bedrooms" ? undefined : Number(value))}
              >
                <SelectTrigger id="bedrooms" className="w-full">
                  <div className="flex items-center gap-2">
                    <BedDouble className="h-4 w-4 text-muted-foreground" />
                    <SelectValue placeholder="Any" />
                  </div>
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="any-bedrooms">Any</SelectItem>
                  <SelectItem value="1">1+</SelectItem>
                  <SelectItem value="2">2+</SelectItem>
                  <SelectItem value="3">3+</SelectItem>
                  <SelectItem value="4">4+</SelectItem>
                  <SelectItem value="5">5+</SelectItem>
                </SelectContent>
              </Select>
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="bathrooms" className="text-sm font-medium">Bathrooms</Label>
              <Select
                value={filters.minBathrooms?.toString() || "any-bathrooms"}
                onValueChange={(value) => handleFilterChange('minBathrooms', value === "any-bathrooms" ? undefined : Number(value))}
              >
                <SelectTrigger id="bathrooms" className="w-full">
                  <div className="flex items-center gap-2">
                    <Bath className="h-4 w-4 text-muted-foreground" />
                    <SelectValue placeholder="Any" />
                  </div>
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="any-bathrooms">Any</SelectItem>
                  <SelectItem value="1">1+</SelectItem>
                  <SelectItem value="2">2+</SelectItem>
                  <SelectItem value="3">3+</SelectItem>
                  <SelectItem value="4">4+</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
        )}

        {/* Subscription Plan Filter - Only shown for agencies search */}
        {type === 'agencies' && (
          <div className="space-y-2">
            <Label htmlFor="subscriptionPlan" className="text-sm font-medium">Subscription Plan</Label>
            <Select
              value={filters.subscriptionPlan || "any-plan"}
              onValueChange={(value) => handleFilterChange('subscriptionPlan', value === "any-plan" ? undefined : value as SubscriptionPlan)}
            >
              <SelectTrigger id="subscriptionPlan" className="w-full">
                <div className="flex items-center gap-2">
                  <Star className="h-4 w-4 text-muted-foreground" />
                  <SelectValue placeholder="Any Plan" />
                </div>
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="any-plan">Any Plan</SelectItem>
                <SelectItem value="basic">Basic</SelectItem>
                <SelectItem value="standard">Standard</SelectItem>
                <SelectItem value="premium">Premium</SelectItem>
              </SelectContent>
            </Select>
          </div>
        )}

        {/* Status Filter - Only shown for properties search */}
        {type === 'properties' && (
          <div className="space-y-2">
            <Label htmlFor="status" className="text-sm font-medium">Status</Label>
            <Select
              value={filters.status || "any-status"}
              onValueChange={(value) => handleFilterChange('status', value === "any-status" ? undefined : value)}
            >
              <SelectTrigger id="status" className="w-full">
                <SelectValue placeholder="Any Status" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="any-status">Any Status</SelectItem>
                <SelectItem value="pending">Pending</SelectItem>
                <SelectItem value="approved">Approved</SelectItem>
                <SelectItem value="sold">Sold</SelectItem>
              </SelectContent>
            </Select>
          </div>
        )}

        {/* Featured Properties Toggle - Only shown for properties search */}
        {type === 'properties' && (
          <div className="flex items-center pt-2">
            <input
              id="featured"
              type="checkbox"
              className="h-4 w-4 rounded border-gray-300 text-primary focus:ring-primary/80"
              checked={filters.featured || false}
              onChange={(e) => handleFilterChange('featured', e.target.checked)}
            />
            <Label 
              htmlFor="featured"
              className="ml-2 text-sm font-medium cursor-pointer"
            >
              Featured Properties Only
            </Label>
          </div>
        )}
      </div>

      <div className="mt-4 pt-4 border-t">
        <div className="flex flex-wrap gap-2">
          {Array.isArray(filters.location) && filters.location.length > 0 ? (
            filters.location.map(loc => (
              <Badge key={loc} variant="outline" className="flex items-center gap-1.5">
                <MapPin className="h-3 w-3" />
                {loc}
                <button 
                  onClick={() => {
                    const updatedLocations = filters.location?.filter(l => l !== loc);
                    handleFilterChange('location', updatedLocations?.length ? updatedLocations : undefined);
                  }}
                  className="ml-1 text-muted-foreground hover:text-foreground"
                >
                  <X className="h-3 w-3" />
                </button>
              </Badge>
            ))
          ) : (
            filters.location && (
              <Badge variant="outline" className="flex items-center gap-1.5">
                <MapPin className="h-3 w-3" />
                {filters.location}
                <button 
                  onClick={() => handleFilterChange('location', undefined)}
                  className="ml-1 text-muted-foreground hover:text-foreground"
                >
                  <X className="h-3 w-3" />
                </button>
              </Badge>
            )
          )}

          {Array.isArray(filters.propertyType) && filters.propertyType.length > 0 ? (
            filters.propertyType.map(type => (
              <Badge key={type} variant="outline" className="flex items-center gap-1.5">
                <Building className="h-3 w-3" />
                {type}
                <button 
                  onClick={() => {
                    const updatedTypes = filters.propertyType?.filter(t => t !== type);
                    handleFilterChange('propertyType', updatedTypes?.length ? updatedTypes : undefined);
                  }}
                  className="ml-1 text-muted-foreground hover:text-foreground"
                >
                  <X className="h-3 w-3" />
                </button>
              </Badge>
            ))
          ) : (
            filters.propertyType && (
              <Badge variant="outline" className="flex items-center gap-1.5">
                <Building className="h-3 w-3" />
                {filters.propertyType}
                <button 
                  onClick={() => handleFilterChange('propertyType', undefined)}
                  className="ml-1 text-muted-foreground hover:text-foreground"
                >
                  <X className="h-3 w-3" />
                </button>
              </Badge>
            )
          )}

          {(filters.minPrice !== undefined || filters.maxPrice !== undefined) && (
            <Badge variant="outline" className="flex items-center gap-1.5">
              <DollarSign className="h-3 w-3" />
              {getCurrentPriceRangeLabel()}
              <button 
                onClick={() => {
                  handleFilterChange('minPrice', undefined);
                  handleFilterChange('maxPrice', undefined);
                }}
                className="ml-1 text-muted-foreground hover:text-foreground"
              >
                <X className="h-3 w-3" />
              </button>
            </Badge>
          )}

          {filters.minBedrooms && (
            <Badge variant="outline" className="flex items-center gap-1.5">
              <BedDouble className="h-3 w-3" />
              {filters.minBedrooms}+ Beds
              <button 
                onClick={() => handleFilterChange('minBedrooms', undefined)}
                className="ml-1 text-muted-foreground hover:text-foreground"
              >
                <X className="h-3 w-3" />
              </button>
            </Badge>
          )}

          {filters.minBathrooms && (
            <Badge variant="outline" className="flex items-center gap-1.5">
              <Bath className="h-3 w-3" />
              {filters.minBathrooms}+ Baths
              <button 
                onClick={() => handleFilterChange('minBathrooms', undefined)}
                className="ml-1 text-muted-foreground hover:text-foreground"
              >
                <X className="h-3 w-3" />
              </button>
            </Badge>
          )}

          {filters.subscriptionPlan && (
            <Badge variant="outline" className="flex items-center gap-1.5">
              <Star className="h-3 w-3" />
              {filters.subscriptionPlan}
              <button 
                onClick={() => handleFilterChange('subscriptionPlan', undefined)}
                className="ml-1 text-muted-foreground hover:text-foreground"
              >
                <X className="h-3 w-3" />
              </button>
            </Badge>
          )}

          {filters.status && (
            <Badge variant="outline" className="flex items-center gap-1.5">
              {filters.status}
              <button 
                onClick={() => handleFilterChange('status', undefined)}
                className="ml-1 text-muted-foreground hover:text-foreground"
              >
                <X className="h-3 w-3" />
              </button>
            </Badge>
          )}

          {filters.featured && (
            <Badge variant="outline" className="flex items-center gap-1.5">
              Featured
              <button 
                onClick={() => handleFilterChange('featured', false)}
                className="ml-1 text-muted-foreground hover:text-foreground"
              >
                <X className="h-3 w-3" />
              </button>
            </Badge>
          )}
        </div>
      </div>
    </div>
  );
}
