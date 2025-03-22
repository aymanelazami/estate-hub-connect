
import { Agency, Agent, Property, SubscriptionPlan } from '@/types';

// Mock Agencies
export const mockAgencies: Agency[] = [
  {
    id: '1',
    userId: '101',
    name: 'Luxury Homes Real Estate',
    logo: 'https://images.unsplash.com/photo-1560518883-ce09059eeffa?q=80&w=100&auto=format&fit=crop',
    website: 'https://luxuryhomes.example.com',
    facebook: 'luxuryhomes',
    instagram: 'luxuryhomesrealestate',
    location: 'New York, NY',
    address: '123 Fifth Avenue, New York, NY 10001',
    subscriptionPlan: 'premium',
    verified: true,
    agents: [],
    properties: [],
    createdAt: new Date('2023-01-15')
  },
  {
    id: '2',
    userId: '102',
    name: 'Urban Living Properties',
    logo: 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?q=80&w=100&auto=format&fit=crop',
    website: 'https://urbanliving.example.com',
    facebook: 'urbanlivingproperties',
    instagram: 'urbanlivingre',
    location: 'Los Angeles, CA',
    address: '456 Wilshire Blvd, Los Angeles, CA 90024',
    subscriptionPlan: 'standard',
    verified: true,
    agents: [],
    properties: [],
    createdAt: new Date('2023-02-20')
  },
  {
    id: '3',
    userId: '103',
    name: 'Coastal Realty Group',
    logo: 'https://images.unsplash.com/photo-1502005229762-cf1b2da7c5d6?q=80&w=100&auto=format&fit=crop',
    website: 'https://coastalrealty.example.com',
    facebook: 'coastalrealtygroup',
    instagram: 'coastalrealty',
    location: 'Miami, FL',
    address: '789 Ocean Drive, Miami, FL 33139',
    subscriptionPlan: 'basic',
    verified: true,
    agents: [],
    properties: [],
    createdAt: new Date('2023-03-10')
  },
  {
    id: '4',
    userId: '104',
    name: 'Metropolitan Properties',
    logo: 'https://images.unsplash.com/photo-1555980457-13dd21a13870?q=80&w=100&auto=format&fit=crop',
    website: 'https://metropolitan.example.com',
    facebook: 'metropolitanproperties',
    instagram: 'metropolitan_re',
    location: 'Chicago, IL',
    address: '321 Michigan Ave, Chicago, IL 60601',
    subscriptionPlan: 'premium',
    verified: true,
    agents: [],
    properties: [],
    createdAt: new Date('2023-04-05')
  }
];

// Mock Agents
export const mockAgents: Agent[] = [
  {
    id: '1',
    userId: '201',
    name: 'Sarah Johnson',
    email: 'sarah@luxuryhomes.example.com',
    phone: '+1 (212) 555-1234',
    photo: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?q=80&w=100&auto=format&fit=crop',
    bio: 'Specializing in luxury properties in Manhattan with over 10 years of experience.',
    agencyId: '1',
    properties: [],
    verified: true,
    createdAt: new Date('2023-01-20')
  },
  {
    id: '2',
    userId: '202',
    name: 'Michael Chen',
    email: 'michael@urbanliving.example.com',
    phone: '+1 (323) 555-5678',
    photo: 'https://images.unsplash.com/photo-1566492031773-4f4e44671857?q=80&w=100&auto=format&fit=crop',
    bio: 'Focused on urban lofts and condos throughout Los Angeles.',
    agencyId: '2',
    properties: [],
    verified: true,
    createdAt: new Date('2023-02-25')
  },
  {
    id: '3',
    userId: '203',
    name: 'Sophia Rodriguez',
    email: 'sophia@coastalrealty.example.com',
    phone: '+1 (305) 555-9876',
    photo: 'https://images.unsplash.com/photo-1508214751196-bcfd4ca60f91?q=80&w=100&auto=format&fit=crop',
    bio: 'Miami native with expertise in waterfront properties and vacation homes.',
    agencyId: '3',
    properties: [],
    verified: true,
    createdAt: new Date('2023-03-15')
  },
  {
    id: '4',
    userId: '204',
    name: 'David Williams',
    email: 'david@metropolitan.example.com',
    phone: '+1 (312) 555-4321',
    photo: 'https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?q=80&w=100&auto=format&fit=crop',
    bio: 'Commercial real estate specialist with a focus on downtown Chicago properties.',
    agencyId: '4',
    properties: [],
    verified: true,
    createdAt: new Date('2023-04-10')
  }
];

// Mock Properties
export const mockProperties: Property[] = [
  {
    id: '1',
    title: 'Luxury Penthouse with City Views',
    description: 'Stunning penthouse with panoramic views of the Manhattan skyline, featuring high-end finishes and a private roof terrace.',
    price: 4500000,
    bedrooms: 3,
    bathrooms: 3.5,
    area: 2800,
    images: [
      'https://images.unsplash.com/photo-1512917774080-9991f1c4c750?q=80&w=500&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1600210492486-724fe5c67fb0?q=80&w=500&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?q=80&w=500&auto=format&fit=crop'
    ],
    address: '150 Central Park South',
    city: 'New York',
    state: 'NY',
    country: 'USA',
    zipCode: '10019',
    propertyType: 'Apartment',
    status: 'approved',
    featured: true,
    agentId: '1',
    agencyId: '1',
    createdAt: new Date('2023-01-25')
  },
  {
    id: '2',
    title: 'Modern Loft in Downtown',
    description: 'Industrial-chic loft with exposed brick walls, high ceilings, and state-of-the-art appliances in the heart of downtown.',
    price: 1750000,
    bedrooms: 2,
    bathrooms: 2,
    area: 1600,
    images: [
      'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?q=80&w=500&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1600566752355-35792bedcfea?q=80&w=500&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1615873968403-89e068629265?q=80&w=500&auto=format&fit=crop'
    ],
    address: '520 Broadway',
    city: 'Los Angeles',
    state: 'CA',
    country: 'USA',
    zipCode: '90013',
    propertyType: 'Loft',
    status: 'approved',
    featured: true,
    agentId: '2',
    agencyId: '2',
    createdAt: new Date('2023-03-01')
  },
  {
    id: '3',
    title: 'Beachfront Villa with Private Pool',
    description: 'Exquisite beachfront villa offering direct access to the white sand beaches, with a private infinity pool and lush tropical gardens.',
    price: 6800000,
    bedrooms: 5,
    bathrooms: 5.5,
    area: 4500,
    images: [
      'https://images.unsplash.com/photo-1600607687644-c7f34c52d337?q=80&w=500&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1584738766473-61c083514bf4?q=80&w=500&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1613977257363-707ba9348227?q=80&w=500&auto=format&fit=crop'
    ],
    address: '2300 Collins Avenue',
    city: 'Miami',
    state: 'FL',
    country: 'USA',
    zipCode: '33139',
    propertyType: 'Villa',
    status: 'approved',
    featured: true,
    agentId: '3',
    agencyId: '3',
    createdAt: new Date('2023-03-20')
  },
  {
    id: '4',
    title: 'High-Rise Condo in the Loop',
    description: 'Elegant high-rise condo featuring floor-to-ceiling windows with stunning views of Lake Michigan and Millennium Park.',
    price: 2200000,
    bedrooms: 3,
    bathrooms: 2,
    area: 1800,
    images: [
      'https://images.unsplash.com/photo-1600566753086-00f18fb6b3ea?q=80&w=500&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1598928506311-c55ded91a20c?q=80&w=500&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1617104876903-c8f7309a8d66?q=80&w=500&auto=format&fit=crop'
    ],
    address: '400 E Randolph St',
    city: 'Chicago',
    state: 'IL',
    country: 'USA',
    zipCode: '60601',
    propertyType: 'Condo',
    status: 'approved',
    featured: false,
    agentId: '4',
    agencyId: '4',
    createdAt: new Date('2023-04-15')
  },
  {
    id: '5',
    title: 'Classic Brownstone Townhouse',
    description: 'Historic brownstone townhouse with original details beautifully preserved, featuring a renovated kitchen and private garden.',
    price: 3750000,
    bedrooms: 4,
    bathrooms: 3.5,
    area: 3200,
    images: [
      'https://images.unsplash.com/photo-1600585152220-90363fe7e115?q=80&w=500&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1600047509807-ba8f99d2cdde?q=80&w=500&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1560448204-603b3fc33ddc?q=80&w=500&auto=format&fit=crop'
    ],
    address: '25 W 88th St',
    city: 'New York',
    state: 'NY',
    country: 'USA',
    zipCode: '10024',
    propertyType: 'Townhouse',
    status: 'approved',
    featured: false,
    agentId: '1',
    agencyId: '1',
    createdAt: new Date('2023-05-10')
  },
  {
    id: '6',
    title: 'Contemporary Hollywood Hills Home',
    description: 'Architectural masterpiece in the Hollywood Hills with sweeping views, an infinity pool, and a home theater.',
    price: 8500000,
    bedrooms: 5,
    bathrooms: 6,
    area: 5200,
    images: [
      'https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?q=80&w=500&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1600585154526-990dced4db0d?q=80&w=500&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1592247350045-b3e5301f11f2?q=80&w=500&auto=format&fit=crop'
    ],
    address: '1500 Blue Jay Way',
    city: 'Los Angeles',
    state: 'CA',
    country: 'USA',
    zipCode: '90069',
    propertyType: 'House',
    status: 'approved',
    featured: true,
    agentId: '2',
    agencyId: '2',
    createdAt: new Date('2023-05-25')
  }
];

// Update references between entities
export const initializeMockData = () => {
  // Add properties to agents
  mockAgents.forEach(agent => {
    agent.properties = mockProperties.filter(prop => prop.agentId === agent.id);
  });

  // Add agents and properties to agencies
  mockAgencies.forEach(agency => {
    agency.agents = mockAgents.filter(agent => agent.agencyId === agency.id);
    agency.properties = mockProperties.filter(prop => prop.agencyId === agency.id);
  });

  return {
    agencies: mockAgencies,
    agents: mockAgents,
    properties: mockProperties
  };
};
