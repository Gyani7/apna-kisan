
import { createSupabaseServerClient } from "@/lib/supabase/server";
import { Shell } from "@/components/shell";
import { PageHeader, PageHeaderHeading } from "@/components/PageHeader";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { notFound } from "next/navigation";
import { format } from "date-fns";

export default async function OrdersPage() {
  const supabase = await createSupabaseServerClient();
  const { data: { session } } = await supabase.auth.getSession();

  if (!session) {
    notFound();
  }

  const { data: orders, error } = await supabase
    .from("orders")
    .select("*, order_items (*, products (*))")
    .eq("user_id", session.user.id)
    .order("created_at", { ascending: false });

  if (error) {
    console.error("Error fetching orders:", error);
    // Handle error appropriately
  }

  return (
    <Shell>
      <PageHeader>
        <PageHeaderHeading>My Orders</PageHeaderHeading>
      </PageHeader>
      {orders && orders.length > 0 ? (
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Order ID</TableHead>
              <TableHead>Date</TableHead>
              <TableHead>Status</TableHead>
              <TableHead>Total</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {orders.map((order) => (
              <TableRow key={order.id}>
                <TableCell>#{order.id.substring(0, 8)}</TableCell>
                <TableCell>{format(new Date(order.created_at), "PPP")}</TableCell>
                <TableCell>{order.status}</TableCell>
                <TableCell>₹{order.total_price}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      ) : (
        <p>You have no orders.</p>
      )}
    </Shell>
  );
}
