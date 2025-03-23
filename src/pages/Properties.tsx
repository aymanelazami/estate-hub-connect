
import { useState, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { PropertyCard } from '@/components/PropertyCard';
import { mockProperties } from '@/data/mockData';
import { Property } from '@/types';
import { 
  Building,
  Plus, 
  ArrowLeft 
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { 
  Pagination, 
  PaginationContent, 
  PaginationItem, 
  PaginationLink, 
  PaginationNext, 
  PaginationPrevious 
} from '@/components/ui/pagination';
import { PropertyDialog } from '@/components/PropertyDialog';
import { useAuth } from '@/contexts/AuthContext';
import { AdvancedSearchContainer } from '@/components/search/AdvancedSearchContainer';
import { SearchFilters } from '@/components/search/AdvancedSearchFilters';

export default function Properties() {
  const navigate = useNavigate();
  const { user } = useAuth();
  const [allProperties, setAllProperties] = useState<Property[]>(mockProperties);
  const [filteredProperties, setFilteredProperties] = useState<Property[]>(mockProperties);
  const [showPropertyDialog, setShowPropertyDialog] = useState(false);
  const [currentProperty, setCurrentProperty] = useState<Property | null>(null);
  
  const handleSearch = (searchTerm: string, filters: SearchFilters) => {
    let results = [...allProperties];
    
    // Filter by search term
    if (searchTerm) {
      results = results.filter(property => 
        property.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        property.city.toLowerCase().includes(searchTerm.toLowerCase()) ||
        property.propertyType.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }
    
    // Apply specific filters
    if (filters.location) {
      results = results.filter(property => 
        property.city.toLowerCase() === filters.location?.toLowerCase()
      );
    }
    
    if (filters.propertyType) {
      results = results.filter(property => 
        property.propertyType.toLowerCase() === filters.propertyType?.toLowerCase()
      );
    }
    
    if (filters.minPrice !== undefined) {
      results = results.filter(property => property.price >= (filters.minPrice || 0));
    }
    
    if (filters.maxPrice !== undefined) {
      results = results.filter(property => property.price <= (filters.maxPrice || Infinity));
    }
    
    if (filters.minBedrooms) {
      results = results.filter(property => 
        property.bedrooms ? property.bedrooms >= filters.minBedrooms! : false
      );
    }
    
    if (filters.minBathrooms) {
      results = results.filter(property => 
        property.bathrooms ? property.bathrooms >= filters.minBathrooms! : false
      );
    }
    
    if (filters.status) {
      results = results.filter(property => property.status === filters.status);
    }
    
    if (filters.featured) {
      results = results.filter(property => property.featured);
    }
    
    setFilteredProperties(results);
  };

  const handleAddProperty = () => {
    setCurrentProperty(null);
    setShowPropertyDialog(true);
  };

  const handleEditProperty = (property: Property) => {
    setCurrentProperty(property);
    setShowPropertyDialog(true);
  };

  const handleDeleteProperty = (propertyId: string) => {
    const updatedProperties = allProperties.filter(p => p.id !== propertyId);
    setAllProperties(updatedProperties);
    setFilteredProperties(filteredProperties.filter(p => p.id !== propertyId));
  };

  const handleSaveProperty = (property: Property) => {
    let updatedProperties;
    
    if (currentProperty) {
      // Update existing property
      updatedProperties = allProperties.map(p => p.id === property.id ? property : p);
    } else {
      // Add new property
      updatedProperties = [...allProperties, property];
    }
    
    setAllProperties(updatedProperties);
    // Re-apply current search and filters
    handleSearch('', {});
    setShowPropertyDialog(false);
  };

  // Determine back link based on user role
  const getBackLink = () => {
    if (user?.role === 'admin') {
      return '/admin-dashboard';
    } else if (user?.role === 'agency') {
      return '/agency-dashboard';
    } else if (user?.role === 'agent') {
      return '/agent-dashboard';
    }
    return '/';
  };

  return (
    <div className="container py-8 max-w-7xl mx-auto">
      <div className="flex flex-col space-y-6">
        <div className="flex items-center justify-between">
          <div className="flex flex-col space-y-2">
            <h1 className="text-3xl font-bold">Properties</h1>
            <p className="text-muted-foreground">
              Manage your property listings
            </p>
          </div>
          <Button variant="outline" size="sm" asChild>
            <Link to={getBackLink()} className="flex items-center gap-2">
              <ArrowLeft className="h-4 w-4" />
              Back to Dashboard
            </Link>
          </Button>
        </div>
        
        <div className="flex flex-wrap items-center justify-between gap-4">
          <AdvancedSearchContainer 
            type="properties"
            onSearch={handleSearch}
          />
          
          <Button onClick={handleAddProperty} className="gap-1">
            <Plus className="h-4 w-4" />
            Add Property
          </Button>
        </div>
        
        {filteredProperties.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-12 border rounded-lg bg-muted/20">
            <Building className="h-12 w-12 text-muted-foreground mb-4" />
            <h3 className="text-lg font-medium">No properties found</h3>
            <p className="text-muted-foreground mt-1">
              Try adjusting your search filters.
            </p>
            <Button onClick={handleAddProperty} className="mt-4">
              <Plus className="h-4 w-4 mr-2" />
              Add Property
            </Button>
          </div>
        ) : (
          <>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredProperties.map((property) => (
                <div key={property.id} className="relative group">
                  <PropertyCard property={property} />
                  <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-2 rounded-xl">
                    <Button 
                      variant="outline" 
                      size="sm" 
                      className="bg-white hover:bg-white/90"
                      onClick={() => handleEditProperty(property)}
                    >
                      Edit
                    </Button>
                    <Button 
                      variant="destructive" 
                      size="sm"
                      onClick={() => handleDeleteProperty(property.id)}
                    >
                      Delete
                    </Button>
                  </div>
                </div>
              ))}
            </div>
            
            <Pagination>
              <PaginationContent>
                <PaginationItem>
                  <PaginationPrevious href="#" />
                </PaginationItem>
                <PaginationItem>
                  <PaginationLink href="#" isActive>1</PaginationLink>
                </PaginationItem>
                <PaginationItem>
                  <PaginationLink href="#">2</PaginationLink>
                </PaginationItem>
                <PaginationItem>
                  <PaginationLink href="#">3</PaginationLink>
                </PaginationItem>
                <PaginationItem>
                  <PaginationNext href="#" />
                </PaginationItem>
              </PaginationContent>
            </Pagination>
          </>
        )}
      </div>
      
      {showPropertyDialog && (
        <PropertyDialog
          property={currentProperty}
          open={showPropertyDialog}
          onOpenChange={setShowPropertyDialog}
          onSave={handleSaveProperty}
        />
      )}
    </div>
  );
}
