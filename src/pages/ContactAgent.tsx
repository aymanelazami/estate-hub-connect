
import { useState } from 'react';
import { MainNav } from '@/components/MainNav';
import { Footer } from '@/components/Footer';
import { useAuth } from '@/contexts/AuthContext';
import { useNavigate, useParams, Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { 
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Send, Phone, Mail, MapPin, User, Building, ArrowLeft } from 'lucide-react';
import { useForm } from 'react-hook-form';
import { toast } from 'sonner';
import { Agent } from '@/types';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';

// Create a schema for form validation
const contactFormSchema = z.object({
  name: z.string().min(2, { message: "Name must be at least 2 characters" }),
  email: z.string().email({ message: "Please enter a valid email address" }),
  phone: z.string().min(5, { message: "Please enter a valid phone number" }),
  message: z.string().min(10, { message: "Message must be at least 10 characters" }),
});

type ContactFormValues = z.infer<typeof contactFormSchema>;

const ContactAgent = () => {
  const { user } = useAuth();
  const navigate = useNavigate();
  const { id } = useParams<{ id: string }>();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [agent, setAgent] = useState<Agent | null>(null);
  const [propertyTitle, setPropertyTitle] = useState<string | null>(null);

  // Initialize form
  const form = useForm<ContactFormValues>({
    resolver: zodResolver(contactFormSchema),
    defaultValues: {
      name: user ? user.name : '',
      email: user ? user.email : '',
      phone: '',
      message: '',
    },
  });

  // Simulate fetching agent data
  useState(() => {
    // In a real app, this would be an API call to fetch the agent by ID
    setTimeout(() => {
      setAgent({
        id: '1',
        userId: '1',
        name: 'Sarah Johnson',
        email: 'sarah.johnson@example.com',
        phone: '+1 (555) 123-4567',
        photo: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?q=80&w=1000&auto=format&fit=crop',
        bio: 'Sarah is a top-performing real estate agent with over 10 years of experience in the luxury property market.',
        agencyId: '1',
        properties: [],
        verified: true,
        createdAt: new Date(),
      });
      
      setPropertyTitle('Luxury Beachfront Villa with Private Pool');
    }, 500);
  });

  const onSubmit = async (data: ContactFormValues) => {
    setIsSubmitting(true);
    
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1500));
    
    toast.success('Your message has been sent successfully!');
    setIsSubmitting(false);
    
    // Redirect back to the property page or show a success message
    setTimeout(() => navigate(-1), 1000);
  };

  if (!agent) {
    return (
      <div className="min-h-screen flex flex-col">
        <MainNav />
        <div className="flex-1 flex items-center justify-center">
          <div className="animate-pulse flex flex-col items-center">
            <div className="h-24 w-24 bg-muted rounded-full mb-4"></div>
            <div className="h-6 w-48 bg-muted rounded mb-2"></div>
            <div className="h-4 w-64 bg-muted rounded"></div>
          </div>
        </div>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col">
      <MainNav />
      
      <div className="container py-8 animate-fade-up mt-20">
        <Button
          variant="ghost"
          size="sm"
          className="mb-4"
          onClick={() => navigate(-1)}
        >
          <ArrowLeft className="h-4 w-4 mr-2" />
          Back to property
        </Button>
        
        <div className="grid grid-cols-1 md:grid-cols-12 gap-8">
          {/* Agent Profile */}
          <div className="col-span-1 md:col-span-4">
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
          </div>
          
          {/* Contact Form */}
          <div className="col-span-1 md:col-span-8">
            <div className="bg-card border rounded-xl p-6">
              <h1 className="text-2xl font-bold mb-1">Contact Agent</h1>
              {propertyTitle && (
                <p className="text-muted-foreground mb-6">
                  Regarding: <span className="text-foreground font-medium">{propertyTitle}</span>
                </p>
              )}
              
              <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <FormField
                      control={form.control}
                      name="name"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Full Name</FormLabel>
                          <FormControl>
                            <Input placeholder="Your name" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    
                    <FormField
                      control={form.control}
                      name="email"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Email</FormLabel>
                          <FormControl>
                            <Input type="email" placeholder="Your email address" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>
                  
                  <FormField
                    control={form.control}
                    name="phone"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Phone Number</FormLabel>
                        <FormControl>
                          <Input placeholder="Your phone number" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  
                  <FormField
                    control={form.control}
                    name="message"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Message</FormLabel>
                        <FormControl>
                          <Textarea 
                            placeholder="I'm interested in this property and would like more information..." 
                            className="min-h-32"
                            {...field}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  
                  <div className="pt-2">
                    <Button
                      type="submit"
                      className="w-full sm:w-auto"
                      disabled={isSubmitting}
                    >
                      <Send className="h-4 w-4 mr-2" />
                      {isSubmitting ? "Sending message..." : "Send Message"}
                    </Button>
                  </div>
                </form>
              </Form>
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

export default ContactAgent;
