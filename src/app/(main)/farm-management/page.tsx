import { farmManagementData as getFarmData } from "@/lib/supabase/app-features";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

export default function FarmManagementPage() {
  const farmData = getFarmData;

  return (
    <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <h1 className="text-3xl font-bold mb-8">Farm Management</h1>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        <Card>
          <CardHeader>
            <CardTitle>My Tasks</CardTitle>
          </CardHeader>
          <CardContent>
            <ul>
              {farmData.tasks.map((task) => (
                <li key={task.id} className="flex justify-between items-center mb-2">
                  <span>{task.name}</span>
                  <Button variant="outline" size="sm">{task.status}</Button>
                </li>
              ))}
            </ul>
            <Button className="mt-4 w-full">Add New Task</Button>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>My Finances</CardTitle>
          </CardHeader>
          <CardContent>
            <p><strong>Total Income:</strong> ₹{farmData.finances.income.toLocaleString()}</p>
            <p><strong>Total Expenses:</strong> ₹{farmData.finances.expenses.toLocaleString()}</p>
            <p><strong>Profit:</strong> ₹{(farmData.finances.income - farmData.finances.expenses).toLocaleString()}</p>
            <Button className="mt-4 w-full">Add Transaction</Button>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>My Inventory</CardTitle>
          </CardHeader>
          <CardContent>
            <ul>
              {farmData.inventory.map((item) => (
                <li key={item.id} className="flex justify-between items-center mb-2">
                  <span>{item.name}</span>
                  <span>{item.quantity} {item.unit}</span>
                </li>
              ))}
            </ul>
            <Button className="mt-4 w-full">Add Item</Button>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
