
import { Link } from 'react-router-dom';
import { Users, ArrowRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { SubscriptionPlanCard } from '@/components/SubscriptionPlanCard';
import { SUBSCRIPTION_PLANS } from '@/types';
import { User } from '@/types';

interface SubscriptionPlansSectionProps {
  user: User | null;
}

export function SubscriptionPlansSection({ user }: SubscriptionPlansSectionProps) {
  // Only show for agencies or when not logged in
  if (user && user.role !== 'agency') {
    return null;
  }

  return (
    <section className="py-16 bg-secondary/50 border-y animate-fade-up">
      <div className="container">
        <div className="text-center max-w-2xl mx-auto mb-12">
          <div className="inline-flex items-center px-3 py-1 rounded-full bg-estate-100 text-estate-800 text-sm font-medium mb-4">
            <Users className="h-4 w-4 mr-2" />
            For Agencies
          </div>
          <h2 className="text-3xl font-bold mb-4">Choose the Right Plan for Your Agency</h2>
          <p className="text-muted-foreground">
            Select a subscription plan that fits your agency's needs and helps you reach more clients.
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl mx-auto">
          {SUBSCRIPTION_PLANS.map((plan) => (
            <SubscriptionPlanCard 
              key={plan.name} 
              plan={plan} 
              onSelect={() => {}}
            />
          ))}
        </div>
        
        <div className="text-center mt-12">
          <Button size="lg" asChild>
            <Link to="/sign-up" className="flex items-center gap-2">
              Join as an Agency
              <ArrowRight className="h-4 w-4" />
            </Link>
          </Button>
        </div>
      </div>
    </section>
  );
}
