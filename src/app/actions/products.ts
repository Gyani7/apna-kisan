'use server';

import { createSupabaseServerClient } from "@/lib/supabase/server";
import { z } from "zod";
import { Database } from "@/lib/database.types";

const productSchema = z.object({
  name: z.string().min(2),
  description: z.string().min(10),
  price: z.number().min(0),
  category: z.string().min(2),
  unit: z.string(),
});

export async function createProduct(productData: unknown) {
  const supabase = await createSupabaseServerClient();
  const { data: { session } } = await supabase.auth.getSession();

  if (!session) {
    return { success: false, message: "Not authenticated" };
  }

  const parseResult = productSchema.safeParse(productData);

  if (!parseResult.success) {
    return { success: false, message: "Invalid data", errors: parseResult.error.flatten() };
  }

  const { name, description, price, category, unit } = parseResult.data;

  const { data, error } = await supabase
    .from('products')
    .insert([{
      name,
      description,
      price,
      category,
      unit,
      farmer_id: session.user.id,
    } as Database['public']['Tables']['products']['Insert']])
    .select();

  if (error) {
    console.error('Error creating product:', error);
    return { success: false, message: "Failed to create product" };
  }

  return { success: true, message: "Product created successfully", data };
}

export async function updateProduct(productId: string, productData: unknown) {
  const supabase = await createSupabaseServerClient();
  const { data: { session } } = await supabase.auth.getSession();

  if (!session) {
    return { success: false, message: "Not authenticated" };
  }

  const parseResult = productSchema.safeParse(productData);

  if (!parseResult.success) {
    return { success: false, message: "Invalid data", errors: parseResult.error.flatten() };
  }

  const { name, description, price, category, unit } = parseResult.data;

  const { data, error } = await supabase
    .from('products')
    .update({
      name,
      description,
      price,
      category,
      unit,
    } as Database['public']['Tables']['products']['Update'])
    .eq('id', productId)
    .eq('farmer_id', session.user.id)
    .select();

  if (error) {
    console.error('Error updating product:', error);
    return { success: false, message: "Failed to update product" };
  }

  return { success: true, message: "Product updated successfully", data };
}
