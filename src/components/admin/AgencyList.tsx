
import { useState } from 'react';
import { Agency } from '@/types';
import { Building, Check, Search, X } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { AgencyCard } from '@/components/AgencyCard';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { useToast } from '@/hooks/use-toast';

interface AgencyListProps {
  agencies: Agency[];
  onVerification: (agencyId: string) => void;
}

export const AgencyList = ({ agencies, onVerification }: AgencyListProps) => {
  const [searchTerm, setSearchTerm] = useState('');
  const { toast } = useToast();

  const filteredAgencies = agencies.filter(agency => 
    agency.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    agency.location.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <>
      <Card className="mb-6">
        <CardHeader>
          <CardTitle>Search Agencies</CardTitle>
          <CardDescription>
            Search for agencies by name or location
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="relative max-w-md">
            <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
            <Input
              type="text"
              placeholder="Search agencies..."
              className="pl-8"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
        </CardContent>
      </Card>
      
      {filteredAgencies.length === 0 ? (
        <div className="bg-muted/50 rounded-xl border p-8 text-center">
          <Building className="h-12 w-12 mx-auto text-muted-foreground mb-4" />
          <h3 className="text-lg font-medium mb-2">No agencies found</h3>
          <p className="text-muted-foreground">
            {searchTerm ? "Try adjusting your search terms." : "Create your first agency to get started."}
          </p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredAgencies.map(agency => (
            <div key={agency.id} className="relative">
              <AgencyCard agency={agency} />
              <div className="absolute top-2 right-2 flex gap-2">
                <Button
                  variant={agency.verified ? "outline" : "default"}
                  size="sm"
                  onClick={() => onVerification(agency.id)}
                  className={`${agency.verified ? 'bg-white text-green-600' : 'bg-green-600'}`}
                >
                  {agency.verified ? <X className="h-4 w-4" /> : <Check className="h-4 w-4" />}
                  {agency.verified ? 'Unverify' : 'Verify'}
                </Button>
              </div>
            </div>
          ))}
        </div>
      )}
    </>
  );
};
