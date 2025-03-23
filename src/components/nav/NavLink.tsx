
import { Link } from 'react-router-dom';
import { cn } from '@/lib/utils';

interface NavLinkProps {
  href: string;
  currentPath: string;
  icon?: React.ReactNode;
  children: React.ReactNode;
  className?: string;
}

export function NavLink({ href, currentPath, icon, children, className }: NavLinkProps) {
  return (
    <Link
      to={href}
      className={cn(
        "text-sm font-medium transition-colors flex items-center gap-1.5",
        currentPath === href
          ? "text-estate-600"
          : "text-muted-foreground hover:text-foreground",
        className
      )}
    >
      {icon}
      {children}
    </Link>
  );
}
