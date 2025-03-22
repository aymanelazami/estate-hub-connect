
import { Link } from 'react-router-dom';
import { Agency } from '@/types';
import { 
  Building,
  Users, 
  Home, 
  MapPin,
  Award,
  Check
} from 'lucide-react';
import { formatDistanceToNow } from 'date-fns';
import { cn } from '@/lib/utils';
import { Badge } from "@/components/ui/badge";

interface AgencyCardProps {
  agency: Agency;
  className?: string;
}

export function AgencyCard({ agency, className }: AgencyCardProps) {
  const { 
    id, 
    name, 
    logo, 
    location, 
    subscriptionPlan,
    agents,
    properties,
    createdAt,
    verified
  } = agency;

  // Subscription plan badge variants
  const planVariant = {
    basic: 'bg-secondary text-foreground',
    standard: 'bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-300',
    premium: 'bg-estate-100 text-estate-800 dark:bg-estate-900 dark:text-estate-300',
  };

  return (
    <Link 
      to={`/agencies/${id}`}
      className={cn(
        "group overflow-hidden rounded-xl border bg-card card-hover p-5",
        className
      )}
    >
      <div className="flex items-center gap-4">
        <div className="relative h-16 w-16 rounded-full overflow-hidden border bg-muted flex-shrink-0">
          {logo ? (
            <img 
              src={logo} 
              alt={name}
              className="object-cover w-full h-full"
            />
          ) : (
            <Building className="h-8 w-8 m-auto text-muted-foreground" />
          )}
        </div>
        
        <div className="space-y-1">
          <div className="flex items-center gap-2">
            <h3 className="font-medium line-clamp-1 group-hover:text-estate-600 transition-colors">
              {name}
            </h3>
            {verified && (
              <Badge variant="outline" className="bg-green-50 text-green-700 border-green-200 flex items-center gap-1 px-1.5 h-5">
                <Check className="h-3 w-3" />
                <span className="text-xs">Verified</span>
              </Badge>
            )}
          </div>
          
          <div className="flex items-center text-sm text-muted-foreground">
            <MapPin className="h-3.5 w-3.5 mr-1 flex-shrink-0" />
            <span className="truncate">{location}</span>
          </div>
        </div>
      </div>
      
      <div className="grid grid-cols-3 gap-3 mt-4">
        <div className="flex flex-col items-center justify-center p-2 bg-secondary/50 rounded-md">
          <Users className="h-4 w-4 mb-1 text-muted-foreground" />
          <span className="text-sm font-medium">{agents.length}</span>
          <span className="text-xs text-muted-foreground">Agents</span>
        </div>
        <div className="flex flex-col items-center justify-center p-2 bg-secondary/50 rounded-md">
          <Home className="h-4 w-4 mb-1 text-muted-foreground" />
          <span className="text-sm font-medium">{properties.length}</span>
          <span className="text-xs text-muted-foreground">Properties</span>
        </div>
        <div className="flex flex-col items-center justify-center p-2 bg-secondary/50 rounded-md">
          <Award className="h-4 w-4 mb-1 text-muted-foreground" />
          <span className="text-sm font-medium capitalize">{subscriptionPlan}</span>
          <span className="text-xs text-muted-foreground">Plan</span>
        </div>
      </div>

      <div className="mt-4 pt-3 flex justify-between items-center border-t text-xs text-muted-foreground">
        <Badge className={cn("font-normal capitalize", planVariant[subscriptionPlan])}>
          {subscriptionPlan}
        </Badge>
        <div className="flex items-center">
          <span>Member {formatDistanceToNow(createdAt, { addSuffix: true })}</span>
        </div>
      </div>
    </Link>
  );
}
