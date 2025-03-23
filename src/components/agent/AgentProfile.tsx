
import { Agent } from '@/types';
import { Building, Mail, Phone, User } from 'lucide-react';
import { Link } from 'react-router-dom';

interface AgentProfileProps {
  agent: Agent;
}

export const AgentProfile = ({ agent }: AgentProfileProps) => {
  return (
    <div className="bg-card border rounded-xl p-6 sticky top-24">
      <div className="flex flex-col items-center text-center mb-6">
        {agent.photo ? (
          <img 
            src={agent.photo} 
            alt={agent.name}
            className="h-28 w-28 rounded-full object-cover border-4 border-background mb-4" 
          />
        ) : (
          <div className="h-28 w-28 rounded-full bg-muted flex items-center justify-center mb-4">
            <User className="h-12 w-12 text-muted-foreground" />
          </div>
        )}
        <h2 className="text-xl font-bold">{agent.name}</h2>
        <p className="text-muted-foreground text-sm mb-2">Licensed Real Estate Agent</p>
        
        {agent.agencyId && (
          <Link 
            to={`/agencies/${agent.agencyId}`}
            className="flex items-center gap-1 text-sm text-estate-600 hover:text-estate-700"
          >
            <Building className="h-3 w-3" />
            View Agency
          </Link>
        )}
      </div>
      
      <div className="space-y-4">
        <div className="flex items-start gap-3">
          <div className="bg-muted h-8 w-8 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
            <Mail className="h-4 w-4 text-muted-foreground" />
          </div>
          <div>
            <p className="text-xs text-muted-foreground mb-1">Email</p>
            <p className="text-sm font-medium break-all">{agent.email}</p>
          </div>
        </div>
        
        <div className="flex items-start gap-3">
          <div className="bg-muted h-8 w-8 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
            <Phone className="h-4 w-4 text-muted-foreground" />
          </div>
          <div>
            <p className="text-xs text-muted-foreground mb-1">Phone</p>
            <p className="text-sm font-medium">{agent.phone}</p>
          </div>
        </div>
        
        {agent.bio && (
          <div className="pt-4 border-t">
            <p className="text-sm">{agent.bio}</p>
          </div>
        )}
      </div>
    </div>
  );
};
