
import { Button } from '@/components/ui/button';
import { NavLink } from './NavLink';
import { Link } from 'react-router-dom';
import { LogIn, LogOut, UserPlus } from 'lucide-react';
import { cn } from '@/lib/utils';
import { NavItem } from '@/types';

interface DesktopNavProps {
  navLinks: NavItem[];
  authLinks: NavItem[];
  currentPath: string;
  user: any;
  logout: () => void;
}

export function DesktopNav({ navLinks, authLinks, currentPath, user, logout }: DesktopNavProps) {
  return (
    <nav className="hidden md:flex items-center gap-8">
      <div className="flex items-center gap-6">
        {navLinks.map((link) => (
          <NavLink
            key={link.name}
            href={link.href}
            currentPath={currentPath}
            icon={link.icon}
          >
            {link.name}
          </NavLink>
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
                  currentPath === link.href
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
  );
}
