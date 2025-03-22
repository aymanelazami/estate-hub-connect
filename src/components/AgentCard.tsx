
import { Link } from 'react-router-dom';
import { Agent } from '@/types';
import { 
  User,
  Mail, 
  Phone, 
  Home
} from 'lucide-react';
import { cn } from '@/lib/utils';
import { Button } from "@/components/ui/button";

interface AgentCardProps {
  agent: Agent;
  className?: string;
}

export function AgentCard({ agent, className }: AgentCardProps) {
  const { 
    id, 
    name, 
    email, 
    phone,
    photo, 
    bio,
    properties
  } = agent;

  return (
    <div
      className={cn(
        "overflow-hidden rounded-xl border bg-card card-hover p-5",
        className
      )}
    >
      <div className="flex flex-col sm:flex-row items-center sm:items-start gap-4">
        <div className="relative h-20 w-20 rounded-full overflow-hidden border bg-muted flex-shrink-0">
          {photo ? (
            <img 
              src={photo} 
              alt={name}
              className="object-cover w-full h-full"
            />
          ) : (
            <User className="h-10 w-10 m-auto text-muted-foreground" />
          )}
        </div>
        
        <div className="text-center sm:text-left">
          <Link to={`/agents/${id}`} className="inline-block group">
            <h3 className="font-medium text-lg group-hover:text-estate-600 transition-colors">
              {name}
            </h3>
          </Link>
          
          <p className="text-sm text-muted-foreground mt-1 line-clamp-2">
            {bio || "Real estate professional dedicated to finding the perfect home for clients."}
          </p>
          
          <div className="flex flex-col sm:flex-row gap-2 sm:gap-4 mt-3">
            <div className="flex items-center justify-center sm:justify-start gap-1.5 text-sm">
              <Mail className="h-4 w-4 text-muted-foreground" />
              <a href={`mailto:${email}`} className="hover:text-estate-600 transition-colors">{email}</a>
            </div>
            <div className="flex items-center justify-center sm:justify-start gap-1.5 text-sm">
              <Phone className="h-4 w-4 text-muted-foreground" />
              <a href={`tel:${phone}`} className="hover:text-estate-600 transition-colors">{phone}</a>
            </div>
          </div>
        </div>
      </div>
      
      <div className="flex items-center justify-between mt-5 pt-4 border-t">
        <div className="flex items-center gap-1.5">
          <Home className="h-4 w-4 text-muted-foreground" />
          <span className="text-sm font-medium">{properties.length} Properties</span>
        </div>
        
        <div className="flex gap-2">
          <Button size="sm" variant="outline" asChild>
            <Link to={`/agents/${id}`}>View Profile</Link>
          </Button>
          <Button size="sm" asChild>
            <Link to={`/contact-agent/${id}`}>Contact</Link>
          </Button>
        </div>
      </div>
    </div>
  );
}
