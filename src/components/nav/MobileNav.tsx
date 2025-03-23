
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';
import { LogOut } from 'lucide-react';
import { cn } from '@/lib/utils';
import { NavItem } from '@/types';

interface MobileNavProps {
  isOpen: boolean;
  navLinks: NavItem[];
  authLinks: NavItem[];
  currentPath: string;
  user: any;
  logout: () => void;
}

export function MobileNav({ isOpen, navLinks, authLinks, currentPath, user, logout }: MobileNavProps) {
  if (!isOpen) return null;

  return (
    <div className="md:hidden glass animate-fade-in border-t border-border">
      <div className="container py-4 flex flex-col gap-4">
        {navLinks.map((link) => (
          <Link
            key={link.name}
            to={link.href}
            className={cn(
              "flex items-center gap-2 p-2 rounded-md transition-colors",
              currentPath === link.href
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
                  currentPath === link.href
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
                  currentPath === link.href
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
  );
}
