import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

const updates = [
  { title: 'PM-KISAN Application Deadline', message: 'Last date for eKYC is approaching. Please complete it to receive the next installment.' },
  { title: 'New Solar Pump Subsidy', message: 'The government has announced a new subsidy for solar pumps. Check eligibility and apply now.' },
  { title: 'KCC Interest Rate Update', message: 'Interest rates for KCC loans have been revised. Please contact your bank for more details.' }
];

export function SchemeUpdates() {
  return (
    <Card className="bg-gray-800 border-gray-700 text-white mt-4">
      <CardHeader>
        <CardTitle>Live Scheme Updates</CardTitle>
      </CardHeader>
      <CardContent>
        <ul>
          {updates.map((update, index) => (
            <li key={index} className="mb-2">
              <h4 className="font-bold">{update.title}</h4>
              <p>{update.message}</p>
            </li>
          ))}
        </ul>
      </CardContent>
    </Card>
  );
}
