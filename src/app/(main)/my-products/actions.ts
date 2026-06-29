'use server';

import { createSupabaseServerClient } from "@/lib/supabase/server";
import { getUser } from "@/lib/user";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

export async function updateProduct(productId: string, formData: FormData) {
    const user = await getUser();
    if (!user) {
        redirect("/login");
    }

    const supabase = createSupabaseServerClient();

    const { data: product, error: fetchError } = await supabase
        .from("products")
        .select("farmer_id")
        .eq("id", productId)
        .single();

    if (fetchError || !product) {
        return { success: false, message: "Product not found." };
    }

    if (product.farmer_id !== user.id) {
        return { success: false, message: "You are not authorized to edit this product." };
    }

    const title = formData.get('title') as string;
    const description = formData.get('description') as string;
    const price = parseFloat(formData.get('price') as string);
    const stock = parseInt(formData.get('stock') as string, 10);
    const category = formData.get('category') as string;
    const image_url = formData.get('image_url') as string;

    if (!title || !description || isNaN(price) || isNaN(stock) || !category) {
        return { success: false, message: "Invalid form data." };
    }

    const { error: updateError } = await supabase
        .from('products')
        .update({
            title,
            description,
            price,
            stock,
            category,
            image_url,
        })
        .eq('id', productId);

    if (updateError) {
        console.error("Error updating product:", updateError);
        return { success: false, message: "Failed to update product." };
    }

    revalidatePath(`/my-products/edit/${productId}`);
    revalidatePath('/my-products');
    redirect('/my-products');
}


export async function deleteProduct(productId: string) {
  const user = await getUser();
  if (!user) {
    redirect("/login");
  }

  const supabase = createSupabaseServerClient();

  // First, verify that the user owns the product
  const { data: product, error: fetchError } = await supabase
    .from("products")
    .select("farmer_id")
    .eq("id", productId)
    .single();

  if (fetchError || !product) {
    return { success: false, message: "Product not found." };
  }

  if (product.farmer_id !== user.id) {
    return { success: false, message: "You are not authorized to delete this product." };
  }

  // If authorized, proceed with deletion
  const { error: deleteError } = await supabase.from("products").delete().eq("id", productId);

  if (deleteError) {
    console.error("Error deleting product:", deleteError);
    return { success: false, message: "Failed to delete product." };
  }

  revalidatePath("/my-products");
  revalidatePath("/market"); // Also revalidate the main market page
  return { success: true, message: "Product deleted successfully." };
}
