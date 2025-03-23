
import { Building, Home, Users } from 'lucide-react';
import { Agency, Property } from '@/types';

interface StatsCardProps {
  title: string;
  value: number;
  percentChange: string;
  icon: React.ReactNode;
}

const StatsCard = ({ title, value, percentChange, icon }: StatsCardProps) => (
  <div className="bg-card border rounded-xl p-6">
    <div className="flex items-start justify-between">
      <div>
        <p className="text-muted-foreground text-sm">{title}</p>
        <h3 className="text-3xl font-bold mt-1">{value}</h3>
      </div>
      <div className="bg-estate-100 p-3 rounded-full">
        {icon}
      </div>
    </div>
    <div className="mt-4 flex items-center gap-2 text-sm text-muted-foreground">
      <span className="text-green-600">{percentChange}</span>
      <span>from last month</span>
    </div>
  </div>
);

interface DashboardStatsProps {
  agencies: Agency[];
  properties: Property[];
}

export const DashboardStats = ({ agencies, properties }: DashboardStatsProps) => {
  const totalAgents = agencies.reduce((acc, agency) => acc + agency.agents.length, 0);
  
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
      <StatsCard 
        title="Total Agencies" 
        value={agencies.length} 
        percentChange="+12%" 
        icon={<Building className="h-6 w-6 text-estate-600" />} 
      />
      
      <StatsCard 
        title="Total Properties" 
        value={properties.length} 
        percentChange="+23%" 
        icon={<Home className="h-6 w-6 text-estate-600" />} 
      />
      
      <StatsCard 
        title="Total Agents" 
        value={totalAgents} 
        percentChange="+8%" 
        icon={<Users className="h-6 w-6 text-estate-600" />} 
      />
    </div>
  );
};
