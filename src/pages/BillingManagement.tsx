
import { useState } from 'react';
import { MainNav } from '@/components/MainNav';
import { Footer } from '@/components/Footer';
import { useAuth } from '@/contexts/AuthContext';
import { SubscriptionPlanCard } from '@/components/SubscriptionPlanCard';
import { SUBSCRIPTION_PLANS, SubscriptionPlan } from '@/types';
import { Button } from '@/components/ui/button';
import { Link, useNavigate } from 'react-router-dom';
import { ArrowLeft, CreditCard } from 'lucide-react';
import { toast } from 'sonner';

const BillingManagement = () => {
  const { user } = useAuth();
  const navigate = useNavigate();
  const [selectedPlan, setSelectedPlan] = useState<SubscriptionPlan>(user?.role === 'agency' ? 'standard' : 'basic');
  const [processing, setProcessing] = useState(false);

  const handlePlanSelect = (plan: string) => {
    setSelectedPlan(plan as SubscriptionPlan);
  };

  const handleSubscribe = () => {
    setProcessing(true);
    
    // Simulate API call to update subscription
    setTimeout(() => {
      setProcessing(false);
      toast.success(`Successfully subscribed to ${selectedPlan} plan!`);
    }, 1500);
  };

  return (
    <div className="min-h-screen flex flex-col">
      <MainNav />
      
      <div className="container py-8 mt-20">
        <Button
          variant="ghost"
          size="sm"
          className="mb-4"
          onClick={() => navigate('/settings')}
        >
          <ArrowLeft className="h-4 w-4 mr-2" />
          Back to Settings
        </Button>
        
        <h1 className="text-3xl font-bold mb-2">Billing & Subscription</h1>
        <p className="text-muted-foreground mb-8">
          Manage your subscription plans and billing details
        </p>
        
        <div className="space-y-8">
          <div>
            <h2 className="text-xl font-semibold mb-4">Choose a Plan</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {SUBSCRIPTION_PLANS.map((plan) => (
                <SubscriptionPlanCard
                  key={plan.name}
                  plan={plan}
                  isSelected={selectedPlan === plan.name}
                  onSelect={handlePlanSelect}
                />
              ))}
            </div>
          </div>
          
          <div className="pt-6 border-t">
            <h2 className="text-xl font-semibold mb-4">Payment Details</h2>
            {/* Payment form would go here in a real application */}
            <div className="bg-muted/50 p-8 rounded-xl border text-center">
              <CreditCard className="h-12 w-12 mx-auto text-muted-foreground mb-4" />
              <h3 className="text-lg font-medium mb-2">Payment Gateway Integration</h3>
              <p className="text-muted-foreground mb-6 max-w-md mx-auto">
                In a production app, this would be integrated with Stripe, PayPal, or another payment processor.
              </p>
              <Button 
                onClick={handleSubscribe} 
                disabled={processing}
                className="min-w-32"
              >
                {processing ? "Processing..." : "Subscribe Now"}
              </Button>
            </div>
          </div>
        </div>
      </div>
      
      <div className="mt-auto">
        <Footer />
      </div>
    </div>
  );
};

export default BillingManagement;
