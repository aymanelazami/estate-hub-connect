
import { Building, Home } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';

export const DashboardQuickLinks = () => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
      <Button variant="outline" size="lg" className="h-auto p-6 justify-start" asChild>
        <Link to="/admin-agency-management" className="flex items-start gap-4">
          <div className="bg-estate-100 p-3 rounded-full">
            <Building className="h-6 w-6 text-estate-600" />
          </div>
          <div className="text-left">
            <h3 className="font-semibold text-lg">Agency Management</h3>
            <p className="text-muted-foreground text-sm mt-1">
              Create, edit, and manage agencies on the platform
            </p>
          </div>
        </Link>
      </Button>
      
      <Button variant="outline" size="lg" className="h-auto p-6 justify-start" asChild>
        <Link to="/properties" className="flex items-start gap-4">
          <div className="bg-estate-100 p-3 rounded-full">
            <Home className="h-6 w-6 text-estate-600" />
          </div>
          <div className="text-left">
            <h3 className="font-semibold text-lg">Property Management</h3>
            <p className="text-muted-foreground text-sm mt-1">
              Review, edit, and manage all property listings
            </p>
          </div>
        </Link>
      </Button>
    </div>
  );
};
