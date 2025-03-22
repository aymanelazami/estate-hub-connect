
import { Link } from 'react-router-dom';
import { Building, Facebook, Instagram, Twitter } from 'lucide-react';

export function Footer() {
  return (
    <footer className="bg-secondary/50 border-t border-border mt-auto">
      <div className="container py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div className="space-y-4">
            <Link to="/" className="flex items-center gap-2">
              <Building className="h-6 w-6 text-estate-600" strokeWidth={1.5} />
              <span className="font-semibold text-lg tracking-tight">EstateHub</span>
            </Link>
            <p className="text-sm text-muted-foreground">
              The premier platform connecting real estate agents, agencies, and clients.
            </p>
            <div className="flex gap-4">
              <a href="#" className="text-muted-foreground hover:text-estate-600 transition-colors">
                <Facebook className="h-5 w-5" />
              </a>
              <a href="#" className="text-muted-foreground hover:text-estate-600 transition-colors">
                <Instagram className="h-5 w-5" />
              </a>
              <a href="#" className="text-muted-foreground hover:text-estate-600 transition-colors">
                <Twitter className="h-5 w-5" />
              </a>
            </div>
          </div>
          
          <div>
            <h3 className="font-medium mb-4">For Agencies</h3>
            <ul className="space-y-2">
              <li>
                <Link to="/sign-up" className="text-sm text-muted-foreground hover:text-foreground transition-colors">
                  Create an Agency Account
                </Link>
              </li>
              <li>
                <Link to="#" className="text-sm text-muted-foreground hover:text-foreground transition-colors">
                  Subscription Plans
                </Link>
              </li>
              <li>
                <Link to="#" className="text-sm text-muted-foreground hover:text-foreground transition-colors">
                  Agency Dashboard
                </Link>
              </li>
              <li>
                <Link to="#" className="text-sm text-muted-foreground hover:text-foreground transition-colors">
                  Manage Agents
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="font-medium mb-4">For Agents</h3>
            <ul className="space-y-2">
              <li>
                <Link to="/sign-up" className="text-sm text-muted-foreground hover:text-foreground transition-colors">
                  Create an Agent Account
                </Link>
              </li>
              <li>
                <Link to="#" className="text-sm text-muted-foreground hover:text-foreground transition-colors">
                  List a Property
                </Link>
              </li>
              <li>
                <Link to="#" className="text-sm text-muted-foreground hover:text-foreground transition-colors">
                  Join an Agency
                </Link>
              </li>
              <li>
                <Link to="#" className="text-sm text-muted-foreground hover:text-foreground transition-colors">
                  Agent Resources
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="font-medium mb-4">Support</h3>
            <ul className="space-y-2">
              <li>
                <Link to="#" className="text-sm text-muted-foreground hover:text-foreground transition-colors">
                  Help Center
                </Link>
              </li>
              <li>
                <Link to="#" className="text-sm text-muted-foreground hover:text-foreground transition-colors">
                  Contact Us
                </Link>
              </li>
              <li>
                <Link to="#" className="text-sm text-muted-foreground hover:text-foreground transition-colors">
                  Privacy Policy
                </Link>
              </li>
              <li>
                <Link to="#" className="text-sm text-muted-foreground hover:text-foreground transition-colors">
                  Terms of Service
                </Link>
              </li>
            </ul>
          </div>
        </div>
        
        <div className="border-t border-border mt-8 pt-8 text-center text-sm text-muted-foreground">
          <p>© {new Date().getFullYear()} EstateHub. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
}
