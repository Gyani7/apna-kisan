import 'server-only';

const villages = [
  {
    slug: 'anandpur',
    name: 'Anandpur',
    farmersCount: 150,
    cropDistribution: ['Wheat', 'Rice', 'Sugarcane'],
    soilData: 'Alluvial',
    rainfallData: '750mm',
    waterSources: ['Canal', 'Tube Well'],
    govtSchemesUsage: 60,
    cropHealthScore: 85,
    topFarmers: [
      { id: '1', name: 'Rakesh Kumar', avatar: '/avatars/rakesh.png', reputation: 1250 },
      { id: '2', name: 'Sunita Devi', avatar: '/avatars/sunita.png', reputation: 1100 },
    ],
    topKisanMitra: [
      { id: '1', name: 'Amit Singh', avatar: '/avatars/amit.png', reputation: 2500 },
    ],
    productivity: 90,
    waterManagement: 80,
    organicFarming: 70,
    communityActivity: 85,
    technologyAdoption: 75,
  },
  {
    slug: 'rampur',
    name: 'Rampur',
    farmersCount: 200,
    cropDistribution: ['Cotton', 'Chilli'],
    soilData: 'Black',
    rainfallData: '600mm',
    waterSources: ['River', 'Well'],
    govtSchemesUsage: 45,
    cropHealthScore: 78,
    topFarmers: [
      { id: '3', name: 'Vijay Patil', avatar: '/avatars/vijay.png', reputation: 1500 },
      { id: '4', name: 'Meena Kumari', avatar: '/avatars/meena.png', reputation: 1300 },
    ],
    topKisanMitra: [
      { id: '2', name: 'Priya Sharma', avatar: '/avatars/priya.png', reputation: 2800 },
    ],
    productivity: 85,
    waterManagement: 75,
    organicFarming: 60,
    communityActivity: 90,
    technologyAdoption: 80,
  },
  // Add more villages as needed
];

export async function getVillageBySlug(slug: string) {
  return villages.find((village) => village.slug === slug);
}

export async function getAllVillages() {
  return villages;
}

export async function getRankedVillages() {
  // For now, sorting by productivity. A more complex ranking algorithm will be developed.
  return villages.sort((a, b) => b.productivity - a.productivity);
}
