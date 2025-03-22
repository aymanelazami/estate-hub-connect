
import React, { useState } from 'react';
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from '@/components/ui/card';
import { Tabs, TabsList, TabsTrigger, TabsContent } from '@/components/ui/tabs';
import { Button } from '@/components/ui/button';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { SUBSCRIPTION_PLANS, SubscriptionPlan, SubscriptionPlanDetails } from '@/types';
import { SubscriptionPlanCard } from '@/components/SubscriptionPlanCard';
import { CreditCard, Receipt, Download, CheckCircle2, AlertCircle } from 'lucide-react';
import { toast } from 'sonner';

export default function BillingManagement() {
  const [currentPlan, setCurrentPlan] = useState<SubscriptionPlan>('standard');
  const [selectedPlan, setSelectedPlan] = useState<SubscriptionPlan>(currentPlan);

  const handlePlanSelect = (planName: string) => {
    setSelectedPlan(planName as SubscriptionPlan);
  };

  const handleUpdatePlan = () => {
    if (selectedPlan === currentPlan) {
      toast('You are already on this plan');
      return;
    }
    
    setCurrentPlan(selectedPlan);
    toast.success(`Successfully updated to ${selectedPlan.charAt(0).toUpperCase() + selectedPlan.slice(1)} plan!`);
  };

  // Mock invoices data
  const invoices = [
    { id: 'INV-001', date: '2023-09-01', amount: 79, status: 'paid' },
    { id: 'INV-002', date: '2023-08-01', amount: 79, status: 'paid' },
    { id: 'INV-003', date: '2023-07-01', amount: 79, status: 'paid' },
    { id: 'INV-004', date: '2023-06-01', amount: 29, status: 'paid' },
  ];

  return (
    <div className="container py-8 max-w-7xl mx-auto">
      <div className="flex flex-col space-y-8">
        <div>
          <h1 className="text-3xl font-bold">Billing Management</h1>
          <p className="text-muted-foreground mt-2">
            Manage your subscription and billing information
          </p>
        </div>

        <Tabs defaultValue="subscriptions">
          <TabsList className="mb-4">
            <TabsTrigger value="subscriptions">Subscription Plans</TabsTrigger>
            <TabsTrigger value="billing-history">Billing History</TabsTrigger>
            <TabsTrigger value="payment-methods">Payment Methods</TabsTrigger>
          </TabsList>
          
          <TabsContent value="subscriptions" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Current Plan</CardTitle>
                <CardDescription>
                  You are currently on the {currentPlan.charAt(0).toUpperCase() + currentPlan.slice(1)} plan.
                </CardDescription>
              </CardHeader>
              <CardContent>
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
              </CardContent>
              <CardFooter className="flex justify-between">
                <p className="text-sm text-muted-foreground">
                  * Plans are billed monthly. You can upgrade or downgrade at any time.
                </p>
                {selectedPlan !== currentPlan && (
                  <Button onClick={handleUpdatePlan}>
                    Update Subscription
                  </Button>
                )}
              </CardFooter>
            </Card>
          </TabsContent>
          
          <TabsContent value="billing-history">
            <Card>
              <CardHeader>
                <CardTitle>Billing History</CardTitle>
                <CardDescription>
                  View your past invoices and payment history
                </CardDescription>
              </CardHeader>
              <CardContent>
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Invoice</TableHead>
                      <TableHead>Date</TableHead>
                      <TableHead>Amount</TableHead>
                      <TableHead>Status</TableHead>
                      <TableHead></TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {invoices.map((invoice) => (
                      <TableRow key={invoice.id}>
                        <TableCell className="font-medium">{invoice.id}</TableCell>
                        <TableCell>{invoice.date}</TableCell>
                        <TableCell>${invoice.amount}</TableCell>
                        <TableCell>
                          <div className="flex items-center">
                            {invoice.status === 'paid' ? (
                              <>
                                <CheckCircle2 className="h-4 w-4 text-green-500 mr-1" />
                                <span>Paid</span>
                              </>
                            ) : (
                              <>
                                <AlertCircle className="h-4 w-4 text-yellow-500 mr-1" />
                                <span>Pending</span>
                              </>
                            )}
                          </div>
                        </TableCell>
                        <TableCell>
                          <Button variant="ghost" size="sm" className="flex items-center gap-1">
                            <Download className="h-4 w-4" />
                            <span>Download</span>
                          </Button>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </CardContent>
            </Card>
          </TabsContent>
          
          <TabsContent value="payment-methods">
            <Card>
              <CardHeader>
                <CardTitle>Payment Methods</CardTitle>
                <CardDescription>
                  Manage your payment methods and billing address
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="border rounded-lg p-4 flex items-start space-x-4">
                  <CreditCard className="h-10 w-10 text-muted-foreground" />
                  <div className="space-y-1">
                    <p className="font-medium">Visa ending in 4242</p>
                    <p className="text-sm text-muted-foreground">Expiring 12/2025</p>
                    <div className="flex items-center mt-2 text-xs bg-green-100 text-green-600 px-2 py-1 rounded-full w-fit">
                      <CheckCircle2 className="h-3 w-3 mr-1" />
                      Default payment method
                    </div>
                  </div>
                </div>
                
                <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-2">
                  <Button variant="outline" className="gap-1">
                    <CreditCard className="h-4 w-4" />
                    Add payment method
                  </Button>
                  
                  <Button variant="outline" className="gap-1">
                    <Receipt className="h-4 w-4" />
                    Update billing address
                  </Button>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}
