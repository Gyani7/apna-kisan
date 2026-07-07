'use server';

import { createSupabaseServerClient } from "@/lib/supabase/server";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

export async function updateProduct(productId: string, formData: FormData) {
    const supabase = await createSupabaseServerClient();
    const { data: { user } } = await supabase.auth.getUser();
    if (!user) {
        redirect("/login");
    }

    const { data: product, error: fetchError } = await supabase
        .from("products")
        .select("seller_id")
        .eq("id", productId)
        .single();

    if (fetchError || !product) {
        console.error("Product not found");
        return;
    }

    if ((product as any).seller_id !== user.id) {
        console.error("You are not authorized to edit this product.");
        return;
    }

    const title = formData.get('title') as string;
    const description = formData.get('description') as string;
    const price = parseFloat(formData.get('price') as string);
    const category = formData.get('category') as string;

    if (!title || !description || isNaN(price) || !category) {
        console.error("Invalid form data.");
        return;
    }

    const { error: updateError } = await (supabase
        .from('products')
        .update as any)({
            title,
            description,
            price,
            category,
        })
        .eq('id', productId);

    if (updateError) {
        console.error("Error updating product:", updateError);
    } else {
        revalidatePath(`/my-products/edit/${productId}`);
        revalidatePath('/my-products');
        redirect('/my-products');
    }
}


export async function deleteProduct(productId: string) {
  const supabase = await createSupabaseServerClient();
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) {
    redirect("/login");
  }


  // First, verify that the user owns the product
  const { data: product, error: fetchError } = await supabase
    .from("products")
    .select("seller_id")
    .eq("id", productId)
    .single();

  if (fetchError || !product) {
    console.error("Product not found");
    return {
        success: false,
        message: "Product not found"
    };
  }

  if ((product as any).seller_id !== user.id) {
    console.error("You are not authorized to delete this product");
    return {
        success: false,
        message: "You are not authorized to delete this product"
    };
  }

  // If authorized, proceed with deletion
  const { error: deleteError } = await supabase.from("products").delete().eq("id", productId);

  if (deleteError) {
    console.error("Error deleting product:", deleteError);
    return {
        success: false,
        message: "Error deleting product"
    };
  } else {
    revalidatePath("/my-products");
    revalidatePath("/market"); // Also revalidate the main market page
    return {
        success: true,
        message: "Product deleted successfully"
    };
  }
}
