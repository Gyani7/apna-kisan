import 'server-only';

const products = [
  {
    id: '1',
    name: 'Organic Wheat',
    price: 2500,
    imageUrl: '/products/wheat.jpg',
    seller: 'Rakesh Kumar',
    location: 'Anandpur',
  },
  {
    id: '2',
    name: 'Fresh Mangoes',
    price: 1500,
    imageUrl: '/products/mangoes.jpg',
    seller: 'Sunita Devi',
    location: 'Rampur',
  },
  {
    id: '3',
    name: 'Used Tractor',
    price: 250000,
    imageUrl: '/products/tractor.jpg',
    seller: 'Vijay Patil',
    location: 'Rampur',
  },
  // Add more products as needed
];

export async function getAllProducts() {
  return products;
}
