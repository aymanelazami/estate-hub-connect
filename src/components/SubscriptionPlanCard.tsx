
import { Button } from '@/components/ui/button';
import { Check } from 'lucide-react';
import { SubscriptionPlanDetails } from '@/types';
import { cn } from '@/lib/utils';

interface SubscriptionPlanCardProps {
  plan: SubscriptionPlanDetails;
  isSelected?: boolean;
  onSelect?: (planName: string) => void;
  className?: string;
}

export function SubscriptionPlanCard({ 
  plan, 
  isSelected = false, 
  onSelect,
  className
}: SubscriptionPlanCardProps) {
  const { name, displayName, price, propertyLimit, features, recommended } = plan;

  return (
    <div 
      className={cn(
        "relative rounded-xl border p-6 transition-all duration-200 hover:shadow-md",
        isSelected ? "border-estate-500 bg-estate-50/50 shadow dark:bg-estate-900/10" : "bg-card",
        recommended ? "ring-2 ring-estate-500 ring-offset-2 dark:ring-offset-background" : "",
        className
      )}
    >
      {recommended && (
        <div className="absolute -top-3 left-1/2 transform -translate-x-1/2">
          <span className="bg-estate-500 text-white text-xs font-medium px-3 py-1 rounded-full">
            Recommended
          </span>
        </div>
      )}
      
      <div className="text-center mb-6 mt-2">
        <h3 className="text-xl font-semibold">{displayName}</h3>
        <div className="mt-2">
          <span className="text-3xl font-bold">${price}</span>
          <span className="text-muted-foreground">/month</span>
        </div>
      </div>
      
      <div className="space-y-4">
        <div className="bg-secondary/50 py-2 px-3 rounded-md text-center">
          <span className="font-medium">Up to {propertyLimit} properties</span>
        </div>
        
        <ul className="space-y-2">
          {features.map((feature, index) => (
            <li key={index} className="flex items-start gap-2">
              <Check className="h-5 w-5 text-estate-500 mt-0.5 flex-shrink-0" />
              <span className="text-sm">{feature}</span>
            </li>
          ))}
        </ul>
      </div>
      
      <div className="mt-6">
        <Button 
          variant={isSelected ? "default" : "outline"} 
          className={cn(
            "w-full",
            isSelected && "bg-estate-600 hover:bg-estate-700"
          )}
          onClick={() => onSelect?.(name)}
        >
          {isSelected ? "Current Plan" : "Select Plan"}
        </Button>
      </div>
    </div>
  );
}
