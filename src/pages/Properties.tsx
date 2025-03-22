
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { PropertyCard } from '@/components/PropertyCard';
import { mockProperties } from '@/data/mockData';
import { Property } from '@/types';
import { 
  Building,
  Plus, 
  Filter, 
  Search,
  SlidersHorizontal 
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { 
  Pagination, 
  PaginationContent, 
  PaginationItem, 
  PaginationLink, 
  PaginationNext, 
  PaginationPrevious 
} from '@/components/ui/pagination';
import { PropertyDialog } from '@/components/PropertyDialog';

export default function Properties() {
  const navigate = useNavigate();
  const [properties, setProperties] = useState<Property[]>(mockProperties);
  const [searchTerm, setSearchTerm] = useState('');
  const [showPropertyDialog, setShowPropertyDialog] = useState(false);
  const [currentProperty, setCurrentProperty] = useState<Property | null>(null);
  
  // Filter properties based on search term
  const filteredProperties = properties.filter(property => 
    property.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
    property.city.toLowerCase().includes(searchTerm.toLowerCase()) ||
    property.propertyType.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleAddProperty = () => {
    setCurrentProperty(null);
    setShowPropertyDialog(true);
  };

  const handleEditProperty = (property: Property) => {
    setCurrentProperty(property);
    setShowPropertyDialog(true);
  };

  const handleDeleteProperty = (propertyId: string) => {
    setProperties(properties.filter(p => p.id !== propertyId));
  };

  const handleSaveProperty = (property: Property) => {
    if (currentProperty) {
      // Update existing property
      setProperties(properties.map(p => p.id === property.id ? property : p));
    } else {
      // Add new property
      setProperties([...properties, property]);
    }
    setShowPropertyDialog(false);
  };

  return (
    <div className="container py-8 max-w-7xl mx-auto">
      <div className="flex flex-col space-y-6">
        <div className="flex flex-col space-y-2">
          <h1 className="text-3xl font-bold">Properties</h1>
          <p className="text-muted-foreground">
            Manage your property listings
          </p>
        </div>
        
        <div className="flex flex-wrap items-center justify-between gap-4">
          <div className="flex gap-2 items-center flex-1">
            <div className="relative flex-1 max-w-md">
              <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
              <Input
                type="text"
                placeholder="Search properties..."
                className="pl-8"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
            <Button variant="outline" size="icon">
              <Filter className="h-4 w-4" />
            </Button>
            <Button variant="outline" size="icon">
              <SlidersHorizontal className="h-4 w-4" />
            </Button>
          </div>
          
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
              {searchTerm ? "Try adjusting your search terms." : "Add your first property to get started."}
            </p>
            {!searchTerm && (
              <Button onClick={handleAddProperty} className="mt-4">
                <Plus className="h-4 w-4 mr-2" />
                Add Property
              </Button>
            )}
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
