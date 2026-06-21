import 'server-only';

const experts = [
  {
    id: '1',
    name: 'Dr. Anil Sharma',
    avatar: '/avatars/anil.png',
    specialization: 'Crop Diseases',
    reputation: 2500,
  },
  {
    id: '2',
    name: 'Priya Sharma',
    avatar: '/avatars/priya.png',
    specialization: 'Soil Health',
    reputation: 2800,
  },
  {
    id: '3',
    name: 'Amit Singh',
    avatar: '/avatars/amit.png',
    specialization: 'Horticulture',
    reputation: 2200,
  },
  // Add more experts as needed
];

export async function getAllExperts() {
  return experts;
}
