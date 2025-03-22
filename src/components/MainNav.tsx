
import { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { useAuth } from '@/contexts/AuthContext';
import { 
  Building, 
  Home, 
  LogIn, 
  Menu, 
  X, 
  UserPlus, 
  LogOut, 
  User,
  LayoutDashboard,
  Settings
} from 'lucide-react';
import { cn } from '@/lib/utils';

export function MainNav() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const { user, logout } = useAuth();
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    // Close mobile menu when navigating
    setIsMobileMenuOpen(false);
  }, [location]);

  const navLinks = [
    { name: 'Home', href: '/', icon: <Home className="h-4 w-4" /> },
    { name: 'Agencies', href: '/agencies', icon: <Building className="h-4 w-4" /> },
  ];

  const authLinks = user 
    ? [
        { 
          name: 'Dashboard', 
          href: `/${user.role}-dashboard`, 
          icon: <LayoutDashboard className="h-4 w-4" /> 
        },
        { 
          name: 'Settings', 
          href: '/settings', 
          icon: <Settings className="h-4 w-4" /> 
        },
      ]
    : [
        { 
          name: 'Log In', 
          href: '/login', 
          icon: <LogIn className="h-4 w-4" /> 
        },
        { 
          name: 'Sign Up', 
          href: '/sign-up', 
          icon: <UserPlus className="h-4 w-4" /> 
        },
      ];

  return (
    <header className={cn(
      "fixed top-0 left-0 right-0 z-50 transition-all duration-300",
      isScrolled 
        ? "bg-white/80 backdrop-blur-md shadow-sm py-3" 
        : "bg-transparent py-5"
    )}>
      <div className="container flex items-center justify-between">
        <Link to="/" className="flex items-center gap-2">
          <Building className="h-8 w-8 text-estate-600" strokeWidth={1.5} />
          <span className="font-semibold text-xl tracking-tight">EstateHub</span>
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center gap-8">
          <div className="flex items-center gap-6">
            {navLinks.map((link) => (
              <Link
                key={link.name}
                to={link.href}
                className={cn(
                  "text-sm font-medium transition-colors flex items-center gap-1.5",
                  location.pathname === link.href
                    ? "text-estate-600"
                    : "text-muted-foreground hover:text-foreground"
                )}
              >
                {link.icon}
                {link.name}
              </Link>
            ))}
          </div>

          <div className="flex items-center gap-3">
            {user ? (
              <>
                {authLinks.map((link) => (
                  <Button
                    key={link.name}
                    variant="ghost"
                    size="sm"
                    asChild
                    className={cn(
                      location.pathname === link.href
                        ? "bg-secondary text-foreground"
                        : ""
                    )}
                  >
                    <Link to={link.href} className="flex items-center gap-1.5">
                      {link.icon}
                      {link.name}
                    </Link>
                  </Button>
                ))}
                <Button 
                  variant="outline" 
                  size="sm"
                  onClick={logout}
                  className="flex items-center gap-1.5"
                >
                  <LogOut className="h-4 w-4" />
                  Log Out
                </Button>
              </>
            ) : (
              <>
                <Button variant="ghost" size="sm" asChild>
                  <Link to="/login" className="flex items-center gap-1.5">
                    <LogIn className="h-4 w-4" />
                    Log In
                  </Link>
                </Button>
                <Button size="sm" asChild>
                  <Link to="/sign-up" className="flex items-center gap-1.5">
                    <UserPlus className="h-4 w-4" />
                    Sign Up
                  </Link>
                </Button>
              </>
            )}
          </div>
        </nav>

        {/* Mobile Menu Button */}
        <Button
          variant="ghost"
          size="icon"
          className="md:hidden"
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
        >
          {isMobileMenuOpen ? (
            <X className="h-6 w-6" />
          ) : (
            <Menu className="h-6 w-6" />
          )}
        </Button>
      </div>

      {/* Mobile Menu */}
      {isMobileMenuOpen && (
        <div className="md:hidden glass animate-fade-in border-t border-border">
          <div className="container py-4 flex flex-col gap-4">
            {navLinks.map((link) => (
              <Link
                key={link.name}
                to={link.href}
                className={cn(
                  "flex items-center gap-2 p-2 rounded-md transition-colors",
                  location.pathname === link.href
                    ? "bg-secondary text-foreground"
                    : "text-muted-foreground hover:bg-secondary/50"
                )}
              >
                {link.icon}
                {link.name}
              </Link>
            ))}
            
            <div className="h-px bg-border my-2" />
            
            {user ? (
              <>
                {authLinks.map((link) => (
                  <Link
                    key={link.name}
                    to={link.href}
                    className={cn(
                      "flex items-center gap-2 p-2 rounded-md transition-colors",
                      location.pathname === link.href
                        ? "bg-secondary text-foreground"
                        : "text-muted-foreground hover:bg-secondary/50"
                    )}
                  >
                    {link.icon}
                    {link.name}
                  </Link>
                ))}
                <button
                  onClick={logout}
                  className="flex items-center gap-2 p-2 rounded-md transition-colors text-muted-foreground hover:bg-secondary/50"
                >
                  <LogOut className="h-4 w-4" />
                  Log Out
                </button>
              </>
            ) : (
              <>
                {authLinks.map((link) => (
                  <Link
                    key={link.name}
                    to={link.href}
                    className={cn(
                      "flex items-center gap-2 p-2 rounded-md transition-colors",
                      location.pathname === link.href
                        ? "bg-secondary text-foreground"
                        : "text-muted-foreground hover:bg-secondary/50"
                    )}
                  >
                    {link.icon}
                    {link.name}
                  </Link>
                ))}
              </>
            )}
          </div>
        </div>
      )}
    </header>
  );
}
