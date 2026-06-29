
export const cropAdvisory = [
  {
    id: "1",
    title: "Wheat Crop Advisory",
    content: "This is an advisory for the wheat crop.",
  },
  {
    id: "2",
    title: "Rice Crop Advisory",
    content: "This is an advisory for the rice crop.",
  },
];

export const farmManagementData = {
  tasks: [
    { id: "1", name: "Water the crops", status: "Pending" },
    { id: "2", name: "Fertilize the soil", status: "Done" },
  ],
  finances: {
    income: 50000,
    expenses: 20000,
  },
  inventory: [
    { id: "1", name: "Seeds", quantity: 50, unit: "kg" },
    { id: "2", name: "Fertilizer", quantity: 20, unit: "kg" },
  ],
};

export const loans = [
  {
    id: "1",
    bank_name: "State Bank of India",
    loan_type: "Kisan Credit Card",
    interest_rate: 7,
    max_amount: 300000,
    processing_fee: 0,
  },
  {
    id: "2",
    bank_name: "HDFC Bank",
    loan_type: "Tractor Loan",
    interest_rate: 8.5,
    max_amount: 800000,
    processing_fee: 1,
  },
];

export const mandiRates = [
  { id: "1", commodity: "Wheat", variety: "Dara", price: 2000 },
  { id: "2", commodity: "Rice", variety: "Basmati", price: 6000 },
];

export const schemes = [
  {
    id: "1",
    name: "Pradhan Mantri Fasal Bima Yojana",
    description: "A crop insurance scheme.",
    eligibility: "All farmers",
    benefits: "Insurance cover against crop failure.",
    category: "Insurance",
  },
  {
    id: "2",
    name: "Kisan Credit Card",
    description: "A credit scheme for farmers.",
    eligibility: "All farmers",
    benefits: "Access to credit at low interest rates.",
    category: "Credit",
  },
];

export const weatherData = {
  current: {
    temperature: 25,
    humidity: 60,
    wind_speed: 10,
    precipitation: 0,
  },
  hourly: [
    { time: "10:00", temperature: 26, condition: "Sunny" },
    { time: "11:00", temperature: 27, condition: "Sunny" },
  ],
  daily: [
    { date: "2024-05-24", max_temp: 30, min_temp: 20, condition: "Sunny" },
    { date: "2024-05-25", max_temp: 31, min_temp: 21, condition: "Partly Cloudy" },
  ],
};
