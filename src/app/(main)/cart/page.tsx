
import { createSupabaseServerClient } from "@/lib/supabase/server";
import { Shell } from "@/components/shell";
import { PageHeader, PageHeaderHeading } from "@/components/PageHeader";
import { Button } from "@/components/ui/button";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { notFound } from "next/navigation";
import { removeItem } from "./actions";
import { Database } from "@/lib/database.types";

type CartItem = Database['public']['Tables']['cart_items']['Row'] & {
  products: Database['public']['Tables']['products']['Row'] | null;
};

export default async function CartPage() {
  const supabase = createSupabaseServerClient();
  const { data: { session } } = await supabase.auth.getSession();

  if (!session) {
    notFound();
  }

  const { data: cartItems, error } = await supabase
    .from('cart_items')
    .select(`
      id,
      quantity,
      products (*)
    `)
    .eq('user_id', session.user.id)
    .returns<CartItem[]>();

  if (error) {
    console.error("Error fetching cart items:", error);
    // Handle error appropriately
  }

  const totalPrice = cartItems?.reduce((acc, item) => {
    const productPrice = item.products?.price || 0;
    return acc + productPrice * item.quantity;
  }, 0) || 0;

  return (
    <Shell>
      <PageHeader>
        <PageHeaderHeading>Shopping Cart</PageHeaderHeading>
      </PageHeader>
      {cartItems && cartItems.length > 0 ? (
        <div className="grid gap-8">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Product</TableHead>
                <TableHead>Price</TableHead>
                <TableHead>Quantity</TableHead>
                <TableHead>Total</TableHead>
                <TableHead></TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {cartItems.map((item) => (
                <TableRow key={item.id}>
                  <TableCell>{item.products?.name}</TableCell>
                  <TableCell>₹{item.products?.price}</TableCell>
                  <TableCell>{item.quantity}</TableCell>
                  <TableCell>₹{(item.products?.price || 0) * item.quantity}</TableCell>
                  <TableCell>
                    <form action={async () => { 
                      'use server';
                      await removeItem(String(item.id));
                    }}>
                      <Button variant="destructive" size="sm">Remove</Button>
                    </form>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
          <div className="flex justify-end">
            <div className="text-right">
              <p className="text-xl font-bold">Total: ₹{totalPrice}</p>
              <Button className="mt-4">Proceed to Checkout</Button>
            </div>
          </div>
        </div>
      ) : (
        <p>Your cart is empty.</p>
      )}
    </Shell>
  );
}
