
import { useState } from 'react';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Button } from '@/components/ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { SubscriptionPlan, SUBSCRIPTION_PLANS, Agency } from '@/types';
import { useToast } from '@/hooks/use-toast';
import { Plus } from 'lucide-react';

interface CreateAgencyFormProps {
  onAgencyCreated: (agency: Agency) => void;
}

export function CreateAgencyForm({ onAgencyCreated }: CreateAgencyFormProps) {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    website: '',
    address: '',
    location: '',
    subscriptionPlan: 'basic' as SubscriptionPlan,
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { toast } = useToast();

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSelectChange = (value: string) => {
    setFormData(prev => ({ ...prev, subscriptionPlan: value as SubscriptionPlan }));
  };

  const handleCreateAgency = () => {
    setIsSubmitting(true);
    
    // Simulate API call
    setTimeout(() => {
      // In a real app, this would create the agency in the database
      const newId = `agency-${Date.now()}`;
      const newUserId = `user-${Date.now()}`;
      
      const agency: Agency = {
        id: newId,
        userId: newUserId,
        name: formData.name,
        website: formData.website || undefined,
        location: formData.location,
        address: formData.address,
        subscriptionPlan: formData.subscriptionPlan,
        verified: false,
        agents: [],
        properties: [],
        createdAt: new Date(),
      };
      
      // Reset form
      setFormData({
        name: '',
        email: '',
        website: '',
        address: '',
        location: '',
        subscriptionPlan: 'basic',
      });
      
      toast({
        title: "Agency Created",
        description: `${agency.name} has been created successfully.`,
      });
      
      onAgencyCreated(agency);
      setIsSubmitting(false);
    }, 1000);
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Create New Agency</CardTitle>
        <CardDescription>
          Fill in the details to create a new agency account
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="space-y-2">
          <Label htmlFor="name">Agency Name</Label>
          <Input 
            id="name" 
            name="name" 
            value={formData.name} 
            onChange={handleInputChange} 
          />
        </div>
        
        <div className="space-y-2">
          <Label htmlFor="email">Contact Email</Label>
          <Input 
            id="email" 
            name="email" 
            type="email" 
            value={formData.email} 
            onChange={handleInputChange} 
          />
        </div>
        
        <div className="space-y-2">
          <Label htmlFor="website">Website (Optional)</Label>
          <Input 
            id="website" 
            name="website" 
            value={formData.website} 
            onChange={handleInputChange} 
          />
        </div>
        
        <div className="space-y-2">
          <Label htmlFor="location">Location</Label>
          <Input 
            id="location" 
            name="location" 
            value={formData.location} 
            onChange={handleInputChange} 
          />
        </div>
        
        <div className="space-y-2">
          <Label htmlFor="address">Address</Label>
          <Textarea 
            id="address" 
            name="address" 
            value={formData.address} 
            onChange={handleInputChange} 
          />
        </div>
        
        <div className="space-y-2">
          <Label htmlFor="subscriptionPlan">Subscription Plan</Label>
          <Select
            value={formData.subscriptionPlan}
            onValueChange={handleSelectChange}
          >
            <SelectTrigger>
              <SelectValue placeholder="Select a plan" />
            </SelectTrigger>
            <SelectContent>
              {SUBSCRIPTION_PLANS.map(plan => (
                <SelectItem key={plan.name} value={plan.name}>
                  {plan.displayName} (${plan.price}/month)
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
      </CardContent>
      <CardFooter>
        <Button 
          onClick={handleCreateAgency} 
          className="gap-2"
          disabled={isSubmitting}
        >
          <Plus className="h-4 w-4" />
          {isSubmitting ? "Creating..." : "Create Agency"}
        </Button>
      </CardFooter>
    </Card>
  );
}
