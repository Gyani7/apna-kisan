import { createServerClient } from '@/utils/supabase/server';

export default async function MandiRates() {
  const supabase = createServerClient();
  const { data: rates, error } = await supabase.from('mandi_rates').select('*');

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-4">Mandi Rates</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {rates?.map((rate) => (
          <div key={rate.id} className="border p-4 rounded-lg">
            <h2 className="text-xl font-semibold">{rate.commodity}</h2>
            <p className="text-gray-500">{rate.mandi_name}</p>
            <p className="text-lg font-bold mt-2">₹{rate.price}/quintal</p>
          </div>
        ))}
      </div>
    </div>
  );
}
