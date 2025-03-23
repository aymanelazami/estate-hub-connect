
import React from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { AgencyCard } from '@/components/AgencyCard';
import { PropertyCard } from '@/components/PropertyCard';
import { Agency, Property } from '@/types';
import { Building, Home, CheckCircle, XCircle, Download, Upload, PlusCircle } from 'lucide-react';

interface PendingAgenciesProps {
  pendingAgencies: Agency[];
  onApprove: (id: string) => void;
  onReject: (id: string) => void;
}

export const PendingAgencies = ({ pendingAgencies, onApprove, onReject }: PendingAgenciesProps) => {
  return (
    <div>
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-xl font-bold">Pending Agency Approvals</h2>
        <div className="flex gap-3">
          <Button variant="outline" size="sm" asChild>
            <Link to="/admin-agency-management" className="flex items-center gap-2">
              <PlusCircle className="h-4 w-4" />
              Manage Agencies
            </Link>
          </Button>
          <Button variant="outline" size="sm" className="flex items-center gap-2">
            <Upload className="h-4 w-4" />
            Import
          </Button>
          <Button variant="outline" size="sm" className="flex items-center gap-2">
            <Download className="h-4 w-4" />
            Export
          </Button>
        </div>
      </div>
      
      {pendingAgencies.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {pendingAgencies.map(agency => (
            <div key={agency.id} className="relative">
              <AgencyCard agency={agency} />
              <div className="absolute inset-0 bg-black/5 backdrop-blur-[1px] rounded-xl flex items-center justify-center">
                <div className="bg-card p-4 rounded-lg border shadow-lg">
                  <div className="flex gap-3">
                    <Button 
                      variant="outline" 
                      className="flex items-center gap-2" 
                      onClick={() => onApprove(agency.id)}
                    >
                      <CheckCircle className="h-4 w-4 text-green-600" />
                      Approve
                    </Button>
                    <Button 
                      variant="outline" 
                      className="flex items-center gap-2" 
                      onClick={() => onReject(agency.id)}
                    >
                      <XCircle className="h-4 w-4 text-red-600" />
                      Reject
                    </Button>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="bg-muted/50 rounded-xl border p-8 text-center">
          <Building className="h-12 w-12 mx-auto text-muted-foreground mb-4" />
          <h3 className="text-lg font-medium mb-2">No pending agencies</h3>
          <p className="text-muted-foreground">
            All agency approval requests have been processed.
          </p>
        </div>
      )}
    </div>
  );
};

interface PendingPropertiesProps {
  pendingProperties: Property[];
  onApprove: (id: string) => void;
  onReject: (id: string) => void;
}

export const PendingProperties = ({ pendingProperties, onApprove, onReject }: PendingPropertiesProps) => {
  return (
    <div>
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-xl font-bold">Pending Property Approvals</h2>
        <div className="flex gap-3">
          <Button variant="outline" size="sm" asChild>
            <Link to="/properties" className="flex items-center gap-2">
              <PlusCircle className="h-4 w-4" />
              Manage Properties
            </Link>
          </Button>
          <Button variant="outline" size="sm" className="flex items-center gap-2">
            <Upload className="h-4 w-4" />
            Import
          </Button>
          <Button variant="outline" size="sm" className="flex items-center gap-2">
            <Download className="h-4 w-4" />
            Export
          </Button>
        </div>
      </div>
      
      {pendingProperties.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {pendingProperties.map(property => (
            <div key={property.id} className="relative">
              <PropertyCard property={property} />
              <div className="absolute inset-0 bg-black/5 backdrop-blur-[1px] rounded-xl flex items-center justify-center">
                <div className="bg-card p-4 rounded-lg border shadow-lg">
                  <div className="flex gap-3">
                    <Button 
                      variant="outline" 
                      className="flex items-center gap-2" 
                      onClick={() => onApprove(property.id)}
                    >
                      <CheckCircle className="h-4 w-4 text-green-600" />
                      Approve
                    </Button>
                    <Button 
                      variant="outline" 
                      className="flex items-center gap-2" 
                      onClick={() => onReject(property.id)}
                    >
                      <XCircle className="h-4 w-4 text-red-600" />
                      Reject
                    </Button>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="bg-muted/50 rounded-xl border p-8 text-center">
          <Home className="h-12 w-12 mx-auto text-muted-foreground mb-4" />
          <h3 className="text-lg font-medium mb-2">No pending properties</h3>
          <p className="text-muted-foreground">
            All property approval requests have been processed.
          </p>
        </div>
      )}
    </div>
  );
};

interface PendingApprovalsProps {
  pendingAgencies: Agency[];
  pendingProperties: Property[];
  onApproveAgency: (id: string) => void;
  onRejectAgency: (id: string) => void;
  onApproveProperty: (id: string) => void;
  onRejectProperty: (id: string) => void;
}

export const PendingApprovals = ({
  pendingAgencies,
  pendingProperties,
  onApproveAgency,
  onRejectAgency,
  onApproveProperty,
  onRejectProperty
}: PendingApprovalsProps) => {
  return (
    <div className="space-y-8">
      <PendingAgencies 
        pendingAgencies={pendingAgencies} 
        onApprove={onApproveAgency} 
        onReject={onRejectAgency} 
      />
      
      <PendingProperties 
        pendingProperties={pendingProperties} 
        onApprove={onApproveProperty} 
        onReject={onRejectProperty} 
      />
    </div>
  );
};
