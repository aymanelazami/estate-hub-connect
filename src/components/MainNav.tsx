
import { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
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
import { NavLogo } from './nav/NavLogo';
import { DesktopNav } from './nav/DesktopNav';
import { MobileNav } from './nav/MobileNav';
import { NavItem } from '@/types';

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

  const navLinks: NavItem[] = [
    { name: 'Home', href: '/', icon: <Home className="h-4 w-4" /> },
    { name: 'Agencies', href: '/agencies', icon: <Building className="h-4 w-4" /> },
  ];

  const authLinks: NavItem[] = user 
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
        <NavLogo />

        {/* Desktop Navigation */}
        <DesktopNav 
          navLinks={navLinks} 
          authLinks={authLinks} 
          currentPath={location.pathname} 
          user={user} 
          logout={logout} 
        />

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
      <MobileNav 
        isOpen={isMobileMenuOpen}
        navLinks={navLinks}
        authLinks={authLinks}
        currentPath={location.pathname}
        user={user}
        logout={logout}
      />
    </header>
  );
}
