import 'server-only';

const dashboardData = {
  weather: {
    temperature: 32,
    humidity: 75,
    forecast: 'Partly cloudy with a chance of rain',
  },
  marketPrices: [
    { crop: 'Wheat', price: 2500 },
    { crop: 'Rice', price: 3000 },
    { crop: 'Sugarcane', price: 400 },
  ],
  myCrops: [
    { name: 'Wheat', stage: 'Flowering', health: 90 },
    { name: 'Sugarcane', stage: 'Tillering', health: 85 },
  ],
};

export async function getDashboardData() {
  return dashboardData;
}
