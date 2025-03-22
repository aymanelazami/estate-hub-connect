
import { Link } from 'react-router-dom';
import { Property } from '@/types';
import { 
  Building,
  BedDouble, 
  Bath, 
  Square, 
  MapPin,
  Star,
  CalendarDays
} from 'lucide-react';
import { formatDistanceToNow } from 'date-fns';
import { cn } from '@/lib/utils';
import { AspectRatio } from "@/components/ui/aspect-ratio";
import { Badge } from "@/components/ui/badge";

interface PropertyCardProps {
  property: Property;
  className?: string;
}

export function PropertyCard({ property, className }: PropertyCardProps) {
  const { 
    id, 
    title, 
    price, 
    bedrooms, 
    bathrooms, 
    area, 
    city, 
    state, 
    images, 
    propertyType,
    createdAt,
    featured
  } = property;

  return (
    <Link 
      to={`/properties/${id}`}
      className={cn(
        "group overflow-hidden rounded-xl border bg-card card-hover",
        className
      )}
    >
      <div className="relative">
        <AspectRatio ratio={16 / 9}>
          <img 
            src={images[0]} 
            alt={title}
            className="object-cover w-full h-full transition-transform duration-300 group-hover:scale-105"
          />
        </AspectRatio>
        {featured && (
          <Badge 
            variant="secondary" 
            className="absolute top-2 right-2 gap-1 font-medium bg-estate-500 text-white"
          >
            <Star className="h-3 w-3 fill-white" />
            Featured
          </Badge>
        )}
        <Badge 
          variant="outline" 
          className="absolute top-2 left-2 bg-black/60 text-white border-none font-semibold"
        >
          {propertyType}
        </Badge>
        <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
      </div>
      
      <div className="p-4 space-y-3">
        <div className="flex justify-between items-start">
          <h3 className="font-medium line-clamp-1 group-hover:text-estate-600 transition-colors">
            {title}
          </h3>
          <p className="font-semibold text-estate-600">
            ${price.toLocaleString()}
          </p>
        </div>
        
        <div className="flex items-center text-sm text-muted-foreground">
          <MapPin className="h-3.5 w-3.5 mr-1" />
          <span>{city}, {state}</span>
        </div>

        <div className="grid grid-cols-3 gap-2 py-2">
          <div className="flex items-center gap-1.5 text-sm">
            <BedDouble className="h-4 w-4 text-muted-foreground" />
            <span>{bedrooms} {bedrooms === 1 ? 'Bed' : 'Beds'}</span>
          </div>
          <div className="flex items-center gap-1.5 text-sm">
            <Bath className="h-4 w-4 text-muted-foreground" />
            <span>{bathrooms} {bathrooms === 1 ? 'Bath' : 'Baths'}</span>
          </div>
          <div className="flex items-center gap-1.5 text-sm">
            <Square className="h-4 w-4 text-muted-foreground" />
            <span>{area} sqft</span>
          </div>
        </div>

        <div className="pt-2 flex justify-between items-center border-t text-xs text-muted-foreground">
          <div className="flex items-center gap-1">
            <Building className="h-3.5 w-3.5" />
            <span>Agent: {property.agentId}</span>
          </div>
          <div className="flex items-center gap-1">
            <CalendarDays className="h-3.5 w-3.5" />
            <span>{formatDistanceToNow(createdAt, { addSuffix: true })}</span>
          </div>
        </div>
      </div>
    </Link>
  );
}
