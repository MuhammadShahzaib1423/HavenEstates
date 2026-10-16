export const TYPES = ['Villa', 'House', 'Apartment', 'Townhouse', 'Penthouse', 'Commercial'];

export const properties = [
  {
    id: 'palm-villa',
    name: 'The Palm Courtyard Villa',
    type: 'Villa',
    location: 'DHA Phase 2, Islamabad',
    price: 85000000,
    area: 5200,
    beds: 5,
    baths: 6,
    image: '/images/prop-villa.jpg',
    gallery: ['/images/prop-villa.jpg', '/images/interior-living.jpg', '/images/interior-kitchen.jpg', '/images/interior-bedroom.jpg'],
    featured: true,
    tag: 'Signature listing',
    year: 2021,
    description:
      'A resort-grade villa wrapped around a private palm courtyard. Double-height living spaces, a chef\'s kitchen in honed marble, and a primary suite that opens to sunrise views over the Margallas.',
    amenities: ['Private pool', 'Smart home system', 'Powder room', 'Servant quarter', 'Double garage', 'Landscaped lawn', 'Solar backup', 'CCTV security'],
    agent: { name: 'Sana Malik', phone: '+92 300 1234567' },
  },
  {
    id: 'skyline-residence',
    name: 'Skyline Residence 1402',
    type: 'Apartment',
    location: 'E-11, Islamabad',
    price: 38500000,
    area: 2150,
    beds: 3,
    baths: 4,
    image: '/images/prop-apartment.jpg',
    gallery: ['/images/prop-apartment.jpg', '/images/interior-living.jpg', '/images/interior-bedroom.jpg'],
    featured: true,
    tag: 'New launch',
    year: 2023,
    description:
      'Fourteenth-floor corner residence with wraparound glazing and Margalla views from every room. Hotel-grade lobby, residents\' lounge and a sky deck pool complete the picture.',
    amenities: ['Sky pool', 'Gym & spa', 'Concierge', 'Covered parking', 'Kids play area', 'Power backup', 'High-speed lifts'],
    agent: { name: 'Bilal Ahmed', phone: '+92 321 9876543' },
  },
  {
    id: 'meadow-house',
    name: 'Meadow View House',
    type: 'House',
    location: 'Bahria Town Phase 8, Rawalpindi',
    price: 62000000,
    area: 4200,
    beds: 5,
    baths: 5,
    image: '/images/prop-house.jpg',
    gallery: ['/images/prop-house.jpg', '/images/interior-living.jpg', '/images/interior-kitchen.jpg', '/images/interior-bath.jpg'],
    featured: true,
    year: 2019,
    description:
      'A warm family home on a corner plot facing the community park. Sun-washed interiors, a proper TV lounge, and a terrace made for evening chai as the sun drops behind the hills.',
    amenities: ['Corner plot', 'Park facing', 'Terrace', 'Store room', 'Laundry area', 'Gas + electric geyser', 'Boundary wall'],
    agent: { name: 'Sana Malik', phone: '+92 300 1234567' },
  },
  {
    id: 'elm-townhouse',
    name: 'Elm Row Townhouse 7',
    type: 'Townhouse',
    location: 'Gulberg Greens, Islamabad',
    price: 29500000,
    area: 2400,
    beds: 4,
    baths: 4,
    image: '/images/prop-townhouse.jpg',
    gallery: ['/images/prop-townhouse.jpg', '/images/interior-kitchen.jpg', '/images/interior-bedroom.jpg'],
    featured: false,
    year: 2022,
    description:
      'Low-maintenance modern living in a gated row — three floors of cleverly planned space, a roof deck with city glimpses, and finishes that feel a tier above the price.',
    amenities: ['Gated community', 'Roof deck', 'Modern fittings', 'Nearby school', 'Community park', 'Visitor parking'],
    agent: { name: 'Danish Raza', phone: '+92 333 4567890' },
  },
  {
    id: 'aurelia-penthouse',
    name: 'Aurelia Sky Penthouse',
    type: 'Penthouse',
    location: 'F-7, Islamabad',
    price: 140000000,
    area: 6800,
    beds: 4,
    baths: 6,
    image: '/images/prop-penthouse.jpg',
    gallery: ['/images/prop-penthouse.jpg', '/images/interior-living.jpg', '/images/interior-bath.jpg', '/images/interior-bedroom.jpg'],
    featured: true,
    tag: 'Exclusive',
    year: 2024,
    description:
      'The crown of Aurelia Tower — a full-floor penthouse with 360° terraces, a private plunge pool, and interiors by an award-winning studio. The city, at your feet.',
    amenities: ['Private plunge pool', '360° terrace', 'Private lift lobby', 'Wine cellar', 'Home theatre', 'Staff quarters', '4 car parking'],
    agent: { name: 'Bilal Ahmed', phone: '+92 321 9876543' },
  },
  {
    id: 'willow-cottage',
    name: 'Willow Garden Cottage',
    type: 'House',
    location: 'Chak Shahzad, Islamabad',
    price: 47500000,
    area: 3100,
    beds: 4,
    baths: 4,
    image: '/images/prop-cottage.jpg',
    gallery: ['/images/prop-cottage.jpg', '/images/interior-living.jpg', '/images/interior-bedroom.jpg'],
    featured: false,
    year: 2018,
    description:
      'A storybook cottage wrapped in flowering gardens — stone pathways, a jasmine-covered pergola, and interiors full of light and reclaimed wood character.',
    amenities: ['Mature garden', 'Pergola patio', 'Fireplace', 'Fruit trees', 'Bore water', 'Quiet street'],
    agent: { name: 'Danish Raza', phone: '+92 333 4567890' },
  },
  {
    id: 'citrus-farmhouse',
    name: 'Citrus Grove Farmhouse',
    type: 'Villa',
    location: 'Simly Dam Road, Islamabad',
    price: 165000000,
    area: 12000,
    beds: 6,
    baths: 8,
    image: '/images/prop-farmhouse.jpg',
    gallery: ['/images/prop-farmhouse.jpg', '/images/interior-living.jpg', '/images/interior-kitchen.jpg', '/images/interior-bath.jpg'],
    featured: true,
    tag: '4 kanal estate',
    year: 2020,
    description:
      'Four kanals of citrus groves with a contemporary farmhouse at their heart — infinity-edge pool, guest annexe, and sunsets that need no filter.',
    amenities: ['Infinity pool', 'Guest annexe', 'Citrus orchard', 'Outdoor kitchen', 'Staff quarters', 'Tube well', 'Boundary wall'],
    agent: { name: 'Sana Malik', phone: '+92 300 1234567' },
  },
  {
    id: 'meridian-plaza',
    name: 'Meridian Commercial Plaza',
    type: 'Commercial',
    location: 'Blue Area, Islamabad',
    price: 220000000,
    area: 15000,
    beds: 0,
    baths: 6,
    image: '/images/prop-plaza.jpg',
    gallery: ['/images/prop-plaza.jpg', '/images/interior-living.jpg'],
    featured: false,
    year: 2017,
    description:
      'Prime Blue Area frontage with high footfall retail at street level and flexible office floors above. A rare income-producing asset in the capital\'s commercial core.',
    amenities: ['Prime frontage', 'High footfall', '2 basement parkings', 'Cargo lift', 'Central HVAC', 'Standby generators'],
    agent: { name: 'Bilal Ahmed', phone: '+92 321 9876543' },
  },
];

export const getProperty = (id) => properties.find((p) => p.id === id);

export function formatPKR(n) {
  if (n >= 10000000) {
    const cr = n / 10000000;
    return `₨ ${parseFloat(cr.toFixed(2))} Crore`;
  }
  if (n >= 100000) {
    const l = n / 100000;
    return `₨ ${parseFloat(l.toFixed(1))} Lakh`;
  }
  return '₨ ' + n.toLocaleString('en-PK');
}

export function monthlyPayment(principal, annualRate, years) {
  const r = annualRate / 100 / 12;
  const n = years * 12;
  if (r === 0) return principal / n;
  return (principal * r * Math.pow(1 + r, n)) / (Math.pow(1 + r, n) - 1);
}
