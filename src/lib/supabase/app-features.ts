import { createClient } from "@/lib/supabase/server";

// Farm Management
export async function getFarmData() {
  const supabase = createClient();

  const { data: tasks, error: tasksError } = await supabase
    .from('tasks')
    .select('*');

  const { data: finances, error: financesError } = await supabase
    .from('finances')
    .select('*');

  const { data: inventory, error: inventoryError } = await supabase
    .from('inventory')
    .select('*');

  if (tasksError || financesError || inventoryError) {
    throw new Error('Failed to fetch farm data');
  }

  return {
    tasks,
    finances: {
      income: finances.filter(f => f.transaction_type === 'income').reduce((acc, f) => acc + f.amount, 0),
      expenses: finances.filter(f => f.transaction_type === 'expense').reduce((acc, f) => acc + f.amount, 0),
    },
    inventory,
  };
}

// Crop Advisory
export async function getAdvisory() {
  const supabase = createClient();
  const { data, error } = await supabase.from('advisories').select('*');
  if (error) {
    throw new Error('Failed to fetch crop advisories');
  }
  return data;
}

// Government Schemes
export async function getAllSchemes() {
  const supabase = createClient();
  const { data, error } = await supabase.from('schemes').select('*');
  if (error) {
    throw new Error('Failed to fetch government schemes');
  }
  return data;
}

// Loan and Credit Services
export async function getAllLoans() {
  const supabase = createClient();
  const { data, error } = await supabase.from('loans').select('*');
  if (error) {
    throw new Error('Failed to fetch loan data');
  }
  return data;
}

// Weather Forecast
export async function getWeatherData() {
  const supabase = createClient();
  const { data, error } = await supabase
    .from('weather_data')
    .select('data')
    .eq('location', 'user_location') // Replace with actual user location
    .single();

  if (error || !data) {
    // Fallback to mock data or a default if no data is found
    return {
      current: { temperature: 0, humidity: 0, wind_speed: 0, precipitation: 0 },
      hourly: [],
      daily: [],
    };
  }

  return data.data;
}

// Mandi Rates
export async function getMandiRates() {
    const supabase = createClient();
    const { data, error } = await supabase.from('mandi_rates').select('*');
    if (error) {
        throw new Error('Failed to fetch mandi rates');
    }
    return data;
}
