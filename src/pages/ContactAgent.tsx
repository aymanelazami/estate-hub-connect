
import { useState } from 'react';
import { MainNav } from '@/components/MainNav';
import { Footer } from '@/components/Footer';
import { useAuth } from '@/contexts/AuthContext';
import { useNavigate, useParams, Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { ArrowLeft } from 'lucide-react';
import { Agent } from '@/types';
import { AgentProfile } from '@/components/agent/AgentProfile';
import { ContactForm } from '@/components/agent/ContactForm';

const ContactAgent = () => {
  const { user } = useAuth();
  const navigate = useNavigate();
  const { id } = useParams<{ id: string }>();
  const [agent, setAgent] = useState<Agent | null>(null);
  const [propertyTitle, setPropertyTitle] = useState<string | null>(null);

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
            <AgentProfile agent={agent} />
          </div>
          
          {/* Contact Form */}
          <div className="col-span-1 md:col-span-8">
            <ContactForm 
              initialValues={{
                name: user ? user.name : '',
                email: user ? user.email : '',
                phone: '',
                message: '',
              }}
              propertyTitle={propertyTitle}
            />
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
