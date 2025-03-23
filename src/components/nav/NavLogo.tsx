
import { Link } from 'react-router-dom';
import { Building } from 'lucide-react';

export function NavLogo() {
  return (
    <Link to="/" className="flex items-center gap-2">
      <Building className="h-8 w-8 text-estate-600" strokeWidth={1.5} />
      <span className="font-semibold text-xl tracking-tight">EstateHub</span>
    </Link>
  );
}
