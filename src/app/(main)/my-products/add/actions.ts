'use server';

import { createSupabaseServerClient } from "@/lib/supabase/server";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

export async function addProduct(formData: FormData) {
  const supabase = await createSupabaseServerClient();
  const { data: { user } } = await supabase.auth.getUser();

  if (!user) {
    redirect("/login");
  }

  const productData = {
    title: formData.get("title") as string,
    description: formData.get("description") as string,
    price: parseFloat(formData.get("price") as string),
    stock: parseInt(formData.get("stock") as string, 10),
    category: formData.get("category") as string,
    image_url: formData.get("image_url") as string,
    farmer_id: user.id,
  };

  const { error } = await (supabase.from("products").insert as any)([productData]);

  if (error) {
    console.error("Error adding product:", error);
    // Optionally, return an error message to the form
  } else {
    revalidatePath("/my-products");
    redirect("/my-products");
  }
}
