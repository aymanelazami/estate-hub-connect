
import { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { MainNav } from '@/components/MainNav';
import { Footer } from '@/components/Footer';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { PropertyCard } from '@/components/PropertyCard';
import { mockAgents, mockProperties } from '@/data/mockData';
import { Agent, Property } from '@/types';
import { ArrowLeft, Mail, Phone, User, Home, Calendar, MessageSquare } from 'lucide-react';
import { Textarea } from '@/components/ui/textarea';
import { useToast } from '@/hooks/use-toast';
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';

const AgentProfile = () => {
  const { id } = useParams<{ id: string }>();
  const [agent, setAgent] = useState<Agent | null>(null);
  const [agentProperties, setAgentProperties] = useState<Property[]>([]);
  const [messageContent, setMessageContent] = useState('');
  const [isMessageDialogOpen, setIsMessageDialogOpen] = useState(false);
  const [question, setQuestion] = useState('');
  const { toast } = useToast();

  useEffect(() => {
    // Find agent by ID
    const foundAgent = mockAgents.find(a => a.id === id);
    if (foundAgent) {
      setAgent(foundAgent);
      
      // Find properties associated with this agent
      const agentProps = mockProperties.filter(p => p.agentId === id);
      setAgentProperties(agentProps);
    }
  }, [id]);

  const handleSendMessage = () => {
    // In a real app, this would send the message to the backend
    toast({
      title: "Message Sent",
      description: "Your message has been sent to the agent.",
    });
    setMessageContent('');
    setIsMessageDialogOpen(false);
  };

  const handleAskQuestion = () => {
    // In a real app, this would send the question to the backend
    toast({
      title: "Question Submitted",
      description: "Your question has been submitted. The agent will respond shortly.",
    });
    setQuestion('');
  };

  if (!agent) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl font-bold">Agent not found</h2>
          <p className="text-muted-foreground mt-2">
            The agent you are looking for does not exist or has been removed.
          </p>
          <Button asChild className="mt-4">
            <Link to="/agencies">Back to Agencies</Link>
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col">
      <MainNav />
      
      <div className="container py-8 mt-16 max-w-5xl mx-auto">
        <div className="mb-8 flex items-center gap-2">
          <Button variant="outline" size="sm" asChild>
            <Link to="/agencies" className="flex items-center gap-2">
              <ArrowLeft className="h-4 w-4" />
              Back to Agencies
            </Link>
          </Button>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* Agent Profile Card */}
          <Card className="md:col-span-1">
            <CardHeader className="text-center">
              <div className="mx-auto mb-4 relative">
                {agent.photo ? (
                  <img 
                    src={agent.photo} 
                    alt={agent.name}
                    className="h-32 w-32 rounded-full object-cover border-4 border-white shadow-md"
                  />
                ) : (
                  <div className="h-32 w-32 rounded-full bg-muted flex items-center justify-center mx-auto">
                    <User className="h-16 w-16 text-muted-foreground" />
                  </div>
                )}
                {agent.verified && (
                  <div className="absolute bottom-0 right-0 bg-green-500 text-white p-1 rounded-full">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                      <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                    </svg>
                  </div>
                )}
              </div>
              <CardTitle>{agent.name}</CardTitle>
              <CardDescription>Real Estate Agent</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center gap-3">
                <Mail className="h-5 w-5 text-muted-foreground" />
                <span>{agent.email}</span>
              </div>
              <div className="flex items-center gap-3">
                <Phone className="h-5 w-5 text-muted-foreground" />
                <span>{agent.phone}</span>
              </div>
              <div className="flex items-center gap-3">
                <Calendar className="h-5 w-5 text-muted-foreground" />
                <span>Joined {new Date(agent.createdAt).toLocaleDateString()}</span>
              </div>
              <div className="flex items-center gap-3">
                <Home className="h-5 w-5 text-muted-foreground" />
                <span>{agentProperties.length} Properties</span>
              </div>
            </CardContent>
            <CardFooter>
              <Dialog open={isMessageDialogOpen} onOpenChange={setIsMessageDialogOpen}>
                <DialogTrigger asChild>
                  <Button className="w-full">
                    <Mail className="h-4 w-4 mr-2" />
                    Contact Agent
                  </Button>
                </DialogTrigger>
                <DialogContent>
                  <DialogHeader>
                    <DialogTitle>Send a Message to {agent.name}</DialogTitle>
                    <DialogDescription>
                      Your message will be sent directly to the agent. They will respond to you as soon as possible.
                    </DialogDescription>
                  </DialogHeader>
                  <div className="space-y-4 py-4">
                    <Textarea 
                      placeholder="Write your message here..."
                      value={messageContent}
                      onChange={(e) => setMessageContent(e.target.value)}
                      className="min-h-32"
                    />
                  </div>
                  <DialogFooter>
                    <Button variant="outline" onClick={() => setIsMessageDialogOpen(false)}>Cancel</Button>
                    <Button onClick={handleSendMessage}>Send Message</Button>
                  </DialogFooter>
                </DialogContent>
              </Dialog>
            </CardFooter>
          </Card>
          
          {/* Agent Content */}
          <div className="md:col-span-2 space-y-6">
            <Tabs defaultValue="about">
              <TabsList className="w-full">
                <TabsTrigger value="about" className="flex-1">About</TabsTrigger>
                <TabsTrigger value="properties" className="flex-1">Properties</TabsTrigger>
                <TabsTrigger value="questions" className="flex-1">Ask a Question</TabsTrigger>
              </TabsList>
              
              <TabsContent value="about" className="mt-6">
                <Card>
                  <CardHeader>
                    <CardTitle>About {agent.name}</CardTitle>
                  </CardHeader>
                  <CardContent>
                    {agent.bio ? (
                      <p>{agent.bio}</p>
                    ) : (
                      <p className="text-muted-foreground">
                        No bio information available for this agent.
                      </p>
                    )}
                  </CardContent>
                </Card>
              </TabsContent>
              
              <TabsContent value="properties" className="mt-6">
                <Card>
                  <CardHeader>
                    <CardTitle>Properties Managed by {agent.name}</CardTitle>
                  </CardHeader>
                  <CardContent>
                    {agentProperties.length > 0 ? (
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        {agentProperties.map(property => (
                          <PropertyCard key={property.id} property={property} />
                        ))}
                      </div>
                    ) : (
                      <div className="text-center py-8">
                        <Home className="h-12 w-12 mx-auto text-muted-foreground mb-2" />
                        <p>This agent doesn't have any properties listed yet.</p>
                      </div>
                    )}
                  </CardContent>
                </Card>
              </TabsContent>
              
              <TabsContent value="questions" className="mt-6">
                <Card>
                  <CardHeader>
                    <CardTitle>Ask a Question</CardTitle>
                    <CardDescription>
                      Have a question about a property or real estate in general? Ask {agent.name} directly.
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <Input
                      placeholder="Your name"
                      className="mb-2"
                    />
                    <Input
                      placeholder="Your email"
                      type="email"
                      className="mb-2"
                    />
                    <Textarea
                      placeholder="What would you like to ask?"
                      value={question}
                      onChange={(e) => setQuestion(e.target.value)}
                      className="min-h-32"
                    />
                    <Button onClick={handleAskQuestion} className="w-full">
                      <MessageSquare className="h-4 w-4 mr-2" />
                      Submit Question
                    </Button>
                  </CardContent>
                </Card>
              </TabsContent>
            </Tabs>
          </div>
        </div>
      </div>
      
      <div className="mt-auto">
        <Footer />
      </div>
    </div>
  );
};

export default AgentProfile;
