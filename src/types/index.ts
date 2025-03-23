export type UserRole = 'agent' | 'agency' | 'admin';

export type SubscriptionPlan = 'basic' | 'standard' | 'premium';

export interface User {
  id: string;
  email: string;
  name: string;
  role: UserRole;
  createdAt: Date;
}

export interface Agent {
  id: string;
  userId: string;
  name: string;
  email: string;
  phone: string;
  photo?: string;
  bio?: string;
  agencyId?: string;
  properties: Property[];
  verified: boolean;
  createdAt: Date;
}

export interface Agency {
  id: string;
  userId: string;
  name: string;
  logo?: string;
  website?: string;
  facebook?: string;
  instagram?: string;
  location: string;
  address: string;
  subscriptionPlan: SubscriptionPlan;
  verified: boolean;
  agents: Agent[];
  properties: Property[];
  createdAt: Date;
}

export interface Property {
  id: string;
  title: string;
  description: string;
  price: number;
  bedrooms?: number;
  bathrooms?: number;
  area?: number;
  images: string[];
  address: string;
  city: string;
  state?: string;
  country: string;
  zipCode?: string;
  propertyType: string;
  status: 'pending' | 'approved' | 'rejected' | 'sold';
  featured: boolean;
  agentId?: string;
  agencyId?: string;
  createdAt: Date;
}

export interface SubscriptionPlanDetails {
  name: SubscriptionPlan;
  displayName: string;
  price: number;
  propertyLimit: number;
  features: string[];
  recommended?: boolean;
}

export const SUBSCRIPTION_PLANS: SubscriptionPlanDetails[] = [
  {
    name: 'basic',
    displayName: 'Basic',
    price: 29,
    propertyLimit: 5,
    features: [
      'List up to 5 properties',
      'Basic agency profile',
      'Email support',
      'Standard visibility in search'
    ]
  },
  {
    name: 'standard',
    displayName: 'Standard',
    price: 79,
    propertyLimit: 20,
    features: [
      'List up to 20 properties',
      'Enhanced agency profile',
      'Priority email support',
      'Higher visibility in search',
      'Property analytics'
    ],
    recommended: true
  },
  {
    name: 'premium',
    displayName: 'Premium',
    price: 199,
    propertyLimit: 100,
    features: [
      'List up to 100 properties',
      'Premium agency profile with custom branding',
      'Priority phone & email support',
      'Top visibility in search',
      'Advanced property analytics',
      'Featured listings',
      'Dedicated account manager'
    ]
  }
];

export interface NavItem {
  name: string;
  href: string;
  icon: React.ReactNode;
}
