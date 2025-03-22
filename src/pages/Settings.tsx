
import { useState } from 'react';
import { useAuth } from '@/contexts/AuthContext';
import { Navigate } from 'react-router-dom';
import { MainNav } from '@/components/MainNav';
import { Footer } from '@/components/Footer';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { initializeMockData } from '@/data/mockData';
import { Agency, SubscriptionPlanDetails, SUBSCRIPTION_PLANS } from '@/types';
import { toast } from 'sonner';
import { 
  Building, 
  User, 
  Settings as SettingsIcon, 
  CreditCard, 
  LogOut, 
  Mail, 
  Bell, 
  Shield, 
  Upload
} from 'lucide-react';
import { SubscriptionPlanCard } from '@/components/SubscriptionPlanCard';

const Settings = () => {
  const { user, logout } = useAuth();
  const [isLoading, setIsLoading] = useState(false);
  
  // For demo purposes, we'll use the first agency from mock data
  const agencyData = initializeMockData().agencies[0];
  const [agencyForm, setAgencyForm] = useState<Partial<Agency>>({
    name: agencyData.name,
    logo: agencyData.logo,
    website: agencyData.website,
    facebook: agencyData.facebook,
    instagram: agencyData.instagram,
    location: agencyData.location,
    address: agencyData.address,
  });
  
  // Redirect if not logged in
  if (!user) {
    return <Navigate to="/login" />;
  }
  
  const handleAgencyFormChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setAgencyForm(prev => ({ ...prev, [name]: value }));
  };
  
  const handleSaveAgencyDetails = (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    
    // Simulate API call
    setTimeout(() => {
      setIsLoading(false);
      toast.success('Agency details updated successfully');
    }, 1000);
  };
  
  const handleLogout = () => {
    logout();
    // Will redirect due to the Navigate component above
  };

  return (
    <div className="min-h-screen flex flex-col">
      <MainNav />
      
      <div className="bg-estate-50 dark:bg-estate-950 border-b">
        <div className="container py-8">
          <h1 className="text-3xl font-bold">Settings</h1>
          <p className="text-muted-foreground mt-2">
            Manage your account settings and preferences
          </p>
        </div>
      </div>
      
      <div className="container py-8 animate-fade-up">
        <Tabs defaultValue="profile" className="w-full">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            {/* Sidebar */}
            <div className="md:col-span-1">
              <TabsList className="flex flex-col h-auto bg-transparent space-y-2 p-0">
                <TabsTrigger 
                  value="profile" 
                  className="justify-start w-full px-3 py-2 h-auto"
                >
                  <div className="flex items-center gap-2">
                    <User className="h-4 w-4" />
                    <span>Profile</span>
                  </div>
                </TabsTrigger>
                
                <TabsTrigger 
                  value="agency" 
                  className="justify-start w-full px-3 py-2 h-auto"
                >
                  <div className="flex items-center gap-2">
                    <Building className="h-4 w-4" />
                    <span>Agency Details</span>
                  </div>
                </TabsTrigger>
                
                <TabsTrigger 
                  value="subscription" 
                  className="justify-start w-full px-3 py-2 h-auto"
                >
                  <div className="flex items-center gap-2">
                    <CreditCard className="h-4 w-4" />
                    <span>Subscription</span>
                  </div>
                </TabsTrigger>
                
                <TabsTrigger 
                  value="notifications" 
                  className="justify-start w-full px-3 py-2 h-auto"
                >
                  <div className="flex items-center gap-2">
                    <Bell className="h-4 w-4" />
                    <span>Notifications</span>
                  </div>
                </TabsTrigger>
                
                <TabsTrigger 
                  value="security" 
                  className="justify-start w-full px-3 py-2 h-auto"
                >
                  <div className="flex items-center gap-2">
                    <Shield className="h-4 w-4" />
                    <span>Security</span>
                  </div>
                </TabsTrigger>
                
                <div className="pt-4 mt-4 border-t">
                  <Button 
                    variant="destructive" 
                    className="w-full justify-start" 
                    onClick={handleLogout}
                  >
                    <LogOut className="h-4 w-4 mr-2" />
                    Log Out
                  </Button>
                </div>
              </TabsList>
            </div>
            
            {/* Content */}
            <div className="md:col-span-3">
              <TabsContent value="profile" className="mt-0">
                <div className="bg-card rounded-lg border p-6">
                  <h2 className="text-xl font-bold mb-6">Personal Information</h2>
                  
                  <form className="space-y-6">
                    <div className="space-y-4">
                      <div className="flex flex-col md:flex-row items-start gap-8">
                        <div className="w-full">
                          <Label htmlFor="name">Full Name</Label>
                          <Input id="name" value={user.name} disabled className="mt-1" />
                        </div>
                        
                        <div className="w-full">
                          <Label htmlFor="email">Email Address</Label>
                          <Input id="email" value={user.email} disabled className="mt-1" />
                        </div>
                      </div>
                      
                      <div className="flex flex-col md:flex-row items-start gap-8">
                        <div className="w-full">
                          <Label htmlFor="role">Role</Label>
                          <Input 
                            id="role" 
                            value={user.role.charAt(0).toUpperCase() + user.role.slice(1)} 
                            disabled 
                            className="mt-1" 
                          />
                        </div>
                        
                        <div className="w-full">
                          <Label htmlFor="joined">Joined</Label>
                          <Input 
                            id="joined" 
                            value={new Date(user.createdAt).toLocaleDateString()} 
                            disabled 
                            className="mt-1" 
                          />
                        </div>
                      </div>
                    </div>
                    
                    <div className="pt-4 border-t">
                      <Button disabled>Update Profile</Button>
                      <p className="text-sm text-muted-foreground mt-2">
                        Profile information is managed by the administrator
                      </p>
                    </div>
                  </form>
                </div>
              </TabsContent>
              
              <TabsContent value="agency" className="mt-0">
                <div className="bg-card rounded-lg border p-6">
                  <h2 className="text-xl font-bold mb-6">Agency Details</h2>
                  
                  <form onSubmit={handleSaveAgencyDetails} className="space-y-6">
                    <div className="space-y-4">
                      <div>
                        <Label htmlFor="agency-name">Agency Name</Label>
                        <Input 
                          id="agency-name" 
                          name="name" 
                          value={agencyForm.name} 
                          onChange={handleAgencyFormChange} 
                          className="mt-1" 
                        />
                      </div>
                      
                      <div>
                        <Label htmlFor="agency-logo">Logo</Label>
                        <div className="flex items-start gap-4 mt-1">
                          <div className="w-20 h-20 rounded border flex items-center justify-center bg-white">
                            {agencyForm.logo ? (
                              <img 
                                src={agencyForm.logo} 
                                alt="Agency logo" 
                                className="max-w-full max-h-full object-contain" 
                              />
                            ) : (
                              <Building className="h-8 w-8 text-muted-foreground" />
                            )}
                          </div>
                          
                          <div className="flex-1">
                            <div className="flex items-center gap-2">
                              <Button type="button" variant="outline" size="sm">
                                <Upload className="h-4 w-4 mr-1" />
                                Change Logo
                              </Button>
                              {agencyForm.logo && (
                                <Button 
                                  type="button" 
                                  variant="ghost" 
                                  size="sm"
                                  onClick={() => setAgencyForm(prev => ({ ...prev, logo: '' }))}
                                >
                                  Remove
                                </Button>
                              )}
                            </div>
                            <p className="text-xs text-muted-foreground mt-2">
                              Recommended size: 400x400px. Max file size: 2MB. Supported formats: JPG, PNG.
                            </p>
                          </div>
                        </div>
                      </div>
                      
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div>
                          <Label htmlFor="agency-website">Website</Label>
                          <Input 
                            id="agency-website" 
                            name="website" 
                            value={agencyForm.website} 
                            onChange={handleAgencyFormChange} 
                            placeholder="https://yourwebsite.com" 
                            className="mt-1" 
                          />
                        </div>
                        
                        <div>
                          <Label htmlFor="agency-location">Location</Label>
                          <Input 
                            id="agency-location" 
                            name="location" 
                            value={agencyForm.location} 
                            onChange={handleAgencyFormChange} 
                            placeholder="City, State" 
                            className="mt-1" 
                          />
                        </div>
                      </div>
                      
                      <div>
                        <Label htmlFor="agency-address">Address</Label>
                        <Textarea 
                          id="agency-address" 
                          name="address" 
                          value={agencyForm.address} 
                          onChange={handleAgencyFormChange} 
                          placeholder="Full office address" 
                          className="mt-1" 
                        />
                      </div>
                      
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div>
                          <Label htmlFor="agency-facebook">Facebook</Label>
                          <Input 
                            id="agency-facebook" 
                            name="facebook" 
                            value={agencyForm.facebook} 
                            onChange={handleAgencyFormChange} 
                            placeholder="https://facebook.com/youragency" 
                            className="mt-1" 
                          />
                        </div>
                        
                        <div>
                          <Label htmlFor="agency-instagram">Instagram</Label>
                          <Input 
                            id="agency-instagram" 
                            name="instagram" 
                            value={agencyForm.instagram} 
                            onChange={handleAgencyFormChange} 
                            placeholder="https://instagram.com/youragency" 
                            className="mt-1" 
                          />
                        </div>
                      </div>
                    </div>
                    
                    <div className="pt-4 border-t">
                      <Button type="submit" disabled={isLoading}>
                        {isLoading ? 'Saving...' : 'Save Changes'}
                      </Button>
                    </div>
                  </form>
                </div>
              </TabsContent>
              
              <TabsContent value="subscription" className="mt-0">
                <div className="bg-card rounded-lg border p-6">
                  <h2 className="text-xl font-bold mb-2">Current Plan</h2>
                  <p className="text-muted-foreground mb-6">
                    You are currently on the <span className="font-medium capitalize">{agencyData.subscriptionPlan}</span> plan
                  </p>
                  
                  <div className="space-y-6">
                    <div className="bg-muted/50 rounded-lg p-4 border">
                      <div className="flex items-center justify-between">
                        <div>
                          <h3 className="font-medium capitalize">{agencyData.subscriptionPlan} Plan</h3>
                          <p className="text-sm text-muted-foreground">
                            Next billing date: December 15, 2023
                          </p>
                        </div>
                        <Button variant="outline" size="sm">Manage Billing</Button>
                      </div>
                    </div>
                    
                    <div className="pt-4 border-t">
                      <h3 className="font-medium text-lg mb-4">Available Plans</h3>
                      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
                        {SUBSCRIPTION_PLANS.map((plan: SubscriptionPlanDetails) => (
                          <SubscriptionPlanCard 
                            key={plan.name} 
                            plan={plan} 
                            isActive={plan.name === agencyData.subscriptionPlan}
                          />
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              </TabsContent>
              
              <TabsContent value="notifications" className="mt-0">
                <div className="bg-card rounded-lg border p-6">
                  <h2 className="text-xl font-bold mb-6">Notification Preferences</h2>
                  
                  <div className="space-y-6">
                    <div className="space-y-4">
                      <h3 className="font-medium">Email Notifications</h3>
                      
                      <div className="flex items-center justify-between border-b pb-4">
                        <div>
                          <p className="font-medium">New Inquiries</p>
                          <p className="text-sm text-muted-foreground">
                            Receive emails when someone inquires about a property
                          </p>
                        </div>
                        <div className="flex items-center h-5">
                          <input
                            id="notifications-inquiries"
                            type="checkbox"
                            defaultChecked={true}
                            className="h-4 w-4 rounded border-gray-300 text-estate-600 focus:ring-estate-600"
                          />
                        </div>
                      </div>
                      
                      <div className="flex items-center justify-between border-b pb-4">
                        <div>
                          <p className="font-medium">Property Updates</p>
                          <p className="text-sm text-muted-foreground">
                            Receive emails when your property status changes
                          </p>
                        </div>
                        <div className="flex items-center h-5">
                          <input
                            id="notifications-properties"
                            type="checkbox"
                            defaultChecked={true}
                            className="h-4 w-4 rounded border-gray-300 text-estate-600 focus:ring-estate-600"
                          />
                        </div>
                      </div>
                      
                      <div className="flex items-center justify-between border-b pb-4">
                        <div>
                          <p className="font-medium">Account Updates</p>
                          <p className="text-sm text-muted-foreground">
                            Receive emails about your account activity and security
                          </p>
                        </div>
                        <div className="flex items-center h-5">
                          <input
                            id="notifications-account"
                            type="checkbox"
                            defaultChecked={true}
                            className="h-4 w-4 rounded border-gray-300 text-estate-600 focus:ring-estate-600"
                          />
                        </div>
                      </div>
                      
                      <div className="flex items-center justify-between">
                        <div>
                          <p className="font-medium">Marketing & Promotions</p>
                          <p className="text-sm text-muted-foreground">
                            Receive emails about new features, offers and surveys
                          </p>
                        </div>
                        <div className="flex items-center h-5">
                          <input
                            id="notifications-marketing"
                            type="checkbox"
                            defaultChecked={false}
                            className="h-4 w-4 rounded border-gray-300 text-estate-600 focus:ring-estate-600"
                          />
                        </div>
                      </div>
                    </div>
                    
                    <div className="pt-4 border-t">
                      <Button>Save Preferences</Button>
                    </div>
                  </div>
                </div>
              </TabsContent>
              
              <TabsContent value="security" className="mt-0">
                <div className="bg-card rounded-lg border p-6">
                  <h2 className="text-xl font-bold mb-6">Security Settings</h2>
                  
                  <div className="space-y-6">
                    <div>
                      <h3 className="font-medium mb-4">Change Password</h3>
                      <form className="space-y-4">
                        <div>
                          <Label htmlFor="current-password">Current Password</Label>
                          <Input 
                            id="current-password" 
                            type="password" 
                            placeholder="••••••••" 
                            className="mt-1" 
                          />
                        </div>
                        
                        <div>
                          <Label htmlFor="new-password">New Password</Label>
                          <Input 
                            id="new-password" 
                            type="password" 
                            placeholder="••••••••" 
                            className="mt-1" 
                          />
                        </div>
                        
                        <div>
                          <Label htmlFor="confirm-password">Confirm New Password</Label>
                          <Input 
                            id="confirm-password" 
                            type="password" 
                            placeholder="••••••••" 
                            className="mt-1" 
                          />
                        </div>
                        
                        <Button type="submit">Update Password</Button>
                      </form>
                    </div>
                    
                    <div className="pt-6 border-t">
                      <h3 className="font-medium mb-4">Two-Factor Authentication</h3>
                      <div className="bg-muted/50 rounded-lg p-4 border">
                        <div className="flex items-center justify-between">
                          <div>
                            <p className="font-medium">Two-Factor Authentication</p>
                            <p className="text-sm text-muted-foreground">
                              Add an extra layer of security to your account
                            </p>
                          </div>
                          <Button variant="outline">Enable</Button>
                        </div>
                      </div>
                    </div>
                    
                    <div className="pt-6 border-t">
                      <h3 className="font-medium mb-4">Danger Zone</h3>
                      <div className="bg-destructive/10 rounded-lg p-4 border border-destructive/20">
                        <div className="flex items-center justify-between">
                          <div>
                            <p className="font-medium">Delete Account</p>
                            <p className="text-sm text-muted-foreground">
                              Permanently delete your account and all data
                            </p>
                          </div>
                          <Button variant="destructive">Delete Account</Button>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </TabsContent>
            </div>
          </div>
        </Tabs>
      </div>
      
      <div className="mt-auto">
        <Footer />
      </div>
    </div>
  );
};

export default Settings;
