
import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { mockProperties } from '@/data/mockData';
import { Property } from '@/types';
import { 
  Building,
  BedDouble, 
  Bath, 
  Square, 
  MapPin,
  Calendar,
  DollarSign,
  Tag,
  Clock,
  ArrowLeft,
  Share2,
  Heart,
  Phone,
  Mail,
  User
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Separator } from '@/components/ui/separator';
import { AspectRatio } from '@/components/ui/aspect-ratio';
import { format } from 'date-fns';
import { toast } from '@/components/ui/use-toast';

export default function PropertyDetails() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [property, setProperty] = useState<Property | null>(null);
  const [loading, setLoading] = useState(true);
  const [mainImage, setMainImage] = useState('');

  useEffect(() => {
    // In a real app, this would be an API call
    const foundProperty = mockProperties.find(p => p.id === id);
    if (foundProperty) {
      setProperty(foundProperty);
      setMainImage(foundProperty.images[0]);
    }
    setLoading(false);
  }, [id]);

  const handleContactAgent = () => {
    toast({
      title: "Request Sent",
      description: "The agent will contact you shortly.",
    });
  };

  const handleFavorite = () => {
    toast({
      title: "Added to Favorites",
      description: "This property has been added to your favorites.",
    });
  };

  const handleShare = () => {
    navigator.clipboard.writeText(window.location.href);
    toast({
      title: "Link Copied",
      description: "Property link copied to clipboard.",
    });
  };

  if (loading) {
    return (
      <div className="container max-w-7xl mx-auto py-8 flex items-center justify-center min-h-[50vh]">
        <div className="animate-pulse">Loading property details...</div>
      </div>
    );
  }

  if (!property) {
    return (
      <div className="container max-w-7xl mx-auto py-8">
        <div className="text-center py-12">
          <h2 className="text-2xl font-bold">Property Not Found</h2>
          <p className="mt-2 text-muted-foreground">The property you're looking for doesn't exist.</p>
          <Button onClick={() => navigate('/properties')} className="mt-4">
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back to Properties
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="container max-w-7xl mx-auto py-8">
      <div className="mb-6 flex items-center justify-between">
        <Button variant="outline" onClick={() => navigate('/properties')}>
          <ArrowLeft className="mr-2 h-4 w-4" />
          Back to Properties
        </Button>
        <div className="flex gap-2">
          <Button variant="outline" onClick={handleShare}>
            <Share2 className="mr-2 h-4 w-4" />
            Share
          </Button>
          <Button variant="outline" onClick={handleFavorite}>
            <Heart className="mr-2 h-4 w-4" />
            Save
          </Button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="md:col-span-2 space-y-6">
          <div>
            <h1 className="text-3xl font-bold">{property.title}</h1>
            <div className="flex items-center mt-2 text-muted-foreground">
              <MapPin className="h-4 w-4 mr-1" />
              <span>{property.address}, {property.city}, {property.state}</span>
            </div>
          </div>

          <div className="space-y-3">
            <AspectRatio ratio={16 / 9} className="overflow-hidden rounded-lg border">
              <img 
                src={mainImage} 
                alt={property.title}
                className="w-full h-full object-cover"
              />
            </AspectRatio>
            
            <div className="grid grid-cols-4 gap-2">
              {property.images.map((img, index) => (
                <div 
                  key={index}
                  className={`cursor-pointer rounded-md overflow-hidden border-2 
                    ${img === mainImage ? 'border-primary' : 'border-transparent'}`}
                  onClick={() => setMainImage(img)}
                >
                  <AspectRatio ratio={1 / 1}>
                    <img src={img} alt={`View ${index + 1}`} className="w-full h-full object-cover" />
                  </AspectRatio>
                </div>
              ))}
            </div>
          </div>

          <Tabs defaultValue="details">
            <TabsList className="grid w-full grid-cols-3">
              <TabsTrigger value="details">Details</TabsTrigger>
              <TabsTrigger value="features">Features</TabsTrigger>
              <TabsTrigger value="location">Location</TabsTrigger>
            </TabsList>
            <TabsContent value="details" className="py-4">
              <div className="space-y-4">
                <h2 className="text-xl font-semibold">Property Description</h2>
                <p className="text-muted-foreground">{property.description}</p>
                
                <h3 className="text-lg font-medium mt-6">Property Details</h3>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                  <div className="flex flex-col p-3 bg-muted rounded-lg">
                    <span className="text-muted-foreground text-sm">Property Type</span>
                    <div className="flex items-center gap-1 mt-1">
                      <Building className="h-4 w-4" />
                      <span className="font-medium">{property.propertyType}</span>
                    </div>
                  </div>
                  <div className="flex flex-col p-3 bg-muted rounded-lg">
                    <span className="text-muted-foreground text-sm">Status</span>
                    <div className="flex items-center gap-1 mt-1">
                      <Tag className="h-4 w-4" />
                      <span className="font-medium capitalize">{property.status}</span>
                    </div>
                  </div>
                  <div className="flex flex-col p-3 bg-muted rounded-lg">
                    <span className="text-muted-foreground text-sm">Year Built</span>
                    <div className="flex items-center gap-1 mt-1">
                      <Calendar className="h-4 w-4" />
                      <span className="font-medium">2020</span>
                    </div>
                  </div>
                  <div className="flex flex-col p-3 bg-muted rounded-lg">
                    <span className="text-muted-foreground text-sm">Listed</span>
                    <div className="flex items-center gap-1 mt-1">
                      <Clock className="h-4 w-4" />
                      <span className="font-medium">{format(property.createdAt, 'MMM dd, yyyy')}</span>
                    </div>
                  </div>
                </div>
                
                <h3 className="text-lg font-medium mt-6">Specifications</h3>
                <div className="grid grid-cols-3 gap-4">
                  <div className="flex items-center gap-2 p-3 bg-muted rounded-lg">
                    <BedDouble className="h-4 w-4 text-muted-foreground" />
                    <div>
                      <span className="font-medium">{property.bedrooms}</span>
                      <span className="text-muted-foreground ml-1">Bedrooms</span>
                    </div>
                  </div>
                  <div className="flex items-center gap-2 p-3 bg-muted rounded-lg">
                    <Bath className="h-4 w-4 text-muted-foreground" />
                    <div>
                      <span className="font-medium">{property.bathrooms}</span>
                      <span className="text-muted-foreground ml-1">Bathrooms</span>
                    </div>
                  </div>
                  <div className="flex items-center gap-2 p-3 bg-muted rounded-lg">
                    <Square className="h-4 w-4 text-muted-foreground" />
                    <div>
                      <span className="font-medium">{property.area}</span>
                      <span className="text-muted-foreground ml-1">sqft</span>
                    </div>
                  </div>
                </div>
              </div>
            </TabsContent>
            <TabsContent value="features" className="py-4">
              <h2 className="text-xl font-semibold mb-4">Property Features</h2>
              <div className="grid grid-cols-2 md:grid-cols-3 gap-y-3">
                <div className="flex items-center gap-2">
                  <div className="h-2 w-2 rounded-full bg-primary"></div>
                  <span>Central Air Conditioning</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="h-2 w-2 rounded-full bg-primary"></div>
                  <span>Heating System</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="h-2 w-2 rounded-full bg-primary"></div>
                  <span>Laundry Room</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="h-2 w-2 rounded-full bg-primary"></div>
                  <span>Garage Parking</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="h-2 w-2 rounded-full bg-primary"></div>
                  <span>Home Office</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="h-2 w-2 rounded-full bg-primary"></div>
                  <span>Outdoor Space</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="h-2 w-2 rounded-full bg-primary"></div>
                  <span>Walk-in Closet</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="h-2 w-2 rounded-full bg-primary"></div>
                  <span>Kitchen Appliances</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="h-2 w-2 rounded-full bg-primary"></div>
                  <span>Hardwood Floors</span>
                </div>
              </div>
            </TabsContent>
            <TabsContent value="location" className="py-4">
              <h2 className="text-xl font-semibold mb-4">Location</h2>
              <div className="aspect-video bg-muted rounded-lg flex items-center justify-center">
                <p className="text-muted-foreground">Map view would be displayed here</p>
              </div>
              <div className="mt-4">
                <h3 className="text-lg font-medium">Address</h3>
                <p className="text-muted-foreground mt-1">{property.address}</p>
                <p className="text-muted-foreground">{property.city}, {property.state} {property.zipCode}</p>
                <p className="text-muted-foreground">{property.country}</p>
              </div>
            </TabsContent>
          </Tabs>
        </div>

        <div className="space-y-6">
          <Card>
            <CardContent className="p-6">
              <div className="flex justify-between items-start">
                <div>
                  <h2 className="text-2xl font-bold">${property.price.toLocaleString()}</h2>
                  {property.featured && (
                    <Badge className="mt-1 bg-estate-500 text-white">Featured</Badge>
                  )}
                </div>
                <Badge variant="outline" className="uppercase">{property.status}</Badge>
              </div>

              <Separator className="my-4" />

              <div className="space-y-4">
                <div className="flex items-center gap-2 text-sm">
                  <User className="h-4 w-4 text-muted-foreground" />
                  <span className="text-muted-foreground">Listed by</span>
                  <span className="font-medium">Agent #{property.agentId || 'Unknown'}</span>
                </div>

                <h3 className="font-medium">Contact Agent</h3>
                <div className="grid grid-cols-2 gap-3">
                  <Button variant="outline" className="gap-2">
                    <Phone className="h-4 w-4" />
                    Call
                  </Button>
                  <Button variant="outline" className="gap-2">
                    <Mail className="h-4 w-4" />
                    Email
                  </Button>
                </div>
                <Button className="w-full" onClick={handleContactAgent}>
                  Request Information
                </Button>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <h3 className="font-medium mb-3">Schedule a Tour</h3>
              <div className="grid grid-cols-2 gap-2 mb-3">
                <Button variant="outline" size="sm">Today</Button>
                <Button variant="outline" size="sm">Tomorrow</Button>
                <Button variant="outline" size="sm">Thu, Jun 15</Button>
                <Button variant="outline" size="sm">Fri, Jun 16</Button>
              </div>
              <Button variant="secondary" className="w-full">
                Schedule Tour
              </Button>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <h3 className="font-medium mb-3">Similar Properties</h3>
              <div className="space-y-3">
                {mockProperties.slice(0, 3).map((prop) => (
                  <div 
                    key={prop.id}
                    className="flex gap-3 cursor-pointer hover:bg-muted p-2 rounded-lg transition-colors"
                    onClick={() => navigate(`/properties/${prop.id}`)}
                  >
                    <div className="w-16 h-16 rounded overflow-hidden flex-shrink-0">
                      <img src={prop.images[0]} alt={prop.title} className="w-full h-full object-cover" />
                    </div>
                    <div>
                      <h4 className="font-medium line-clamp-1">{prop.title}</h4>
                      <p className="text-sm text-muted-foreground line-clamp-1">{prop.city}, {prop.state}</p>
                      <p className="text-sm font-medium">${prop.price.toLocaleString()}</p>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
