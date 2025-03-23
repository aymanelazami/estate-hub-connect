
import { Building, Users, Home } from 'lucide-react';

export function FeaturesSection() {
  return (
    <section className="py-16 container">
      <div className="text-center max-w-2xl mx-auto mb-12">
        <h2 className="text-3xl font-bold mb-4">Why Choose EstateHub?</h2>
        <p className="text-muted-foreground">
          We provide a comprehensive platform for real estate professionals and clients to connect and transact with confidence.
        </p>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        <div className="bg-card p-6 rounded-xl border transition-all hover:shadow-md">
          <div className="h-12 w-12 bg-estate-100 rounded-full flex items-center justify-center mb-4">
            <Building className="h-6 w-6 text-estate-600" />
          </div>
          <h3 className="text-xl font-semibold mb-2">Agency Management</h3>
          <p className="text-muted-foreground">
            Powerful tools for agencies to manage their agents, property listings, and client relationships.
          </p>
        </div>
        
        <div className="bg-card p-6 rounded-xl border transition-all hover:shadow-md">
          <div className="h-12 w-12 bg-estate-100 rounded-full flex items-center justify-center mb-4">
            <Users className="h-6 w-6 text-estate-600" />
          </div>
          <h3 className="text-xl font-semibold mb-2">Agent Support</h3>
          <p className="text-muted-foreground">
            Resources and tools to help agents list properties, connect with clients, and grow their business.
          </p>
        </div>
        
        <div className="bg-card p-6 rounded-xl border transition-all hover:shadow-md">
          <div className="h-12 w-12 bg-estate-100 rounded-full flex items-center justify-center mb-4">
            <Home className="h-6 w-6 text-estate-600" />
          </div>
          <h3 className="text-xl font-semibold mb-2">Property Listings</h3>
          <p className="text-muted-foreground">
            High-quality, verified property listings with detailed information and beautiful presentations.
          </p>
        </div>
      </div>
    </section>
  );
}
