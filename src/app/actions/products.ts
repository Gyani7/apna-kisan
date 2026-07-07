'use server';

import { createSupabaseServerClient } from "@/lib/supabase/server";
import { z } from "zod";
import type { Database } from "@/lib/database.types";

const productSchema = z.object({
  name: z.string().min(2),
  description: z.string().min(10),
  price: z.number().min(0),
  category: z.string().min(2),
  unit: z.string(),
  stock: z.number().min(0),
});

export async function createProduct(productData: unknown) {
  const supabase = createSupabaseServerClient();
  const { data: { session } } = await supabase.auth.getSession();

  if (!session) {
    return { success: false, message: "Not authenticated" };
  }

  const parseResult = productSchema.safeParse(productData);

  if (!parseResult.success) {
    return { success: false, message: "Invalid data", errors: parseResult.error.flatten() };
  }

  const { name, description, price, category, unit, stock } = parseResult.data;

  const productToInsert = {
    name,
    description,
    price,
    category,
    unit,
    stock,
    farmer_id: session.user.id,
  };

  const { data, error } = await supabase.functions.invoke('create-product', {
    body: { product: productToInsert },
  });

  if (error) {
    console.error('Error creating product:', error);
    return { success: false, message: "Failed to create product" };
  }

  return { success: true, message: "Product created successfully", data };
}

export async function updateProduct(productId: string, productData: unknown) {
  const supabase = createSupabaseServerClient();
  const { data: { session } } = await supabase.auth.getSession();

  if (!session) {
    return { success: false, message: "Not authenticated" };
  }

  const parseResult = productSchema.safeParse(productData);

  if (!parseResult.success) {
    return { success: false, message: "Invalid data", errors: parseResult.error.flatten() };
  }

  const { name, description, price, category, unit, stock } = parseResult.data;

  const productToUpdate = {
    name,
    description,
    price,
    category,
    unit,
    stock,
  };

  const { data, error } = await supabase.functions.invoke('update-product', {
    body: { productId, product: productToUpdate },
  });

  if (error) {
    console.error('Error updating product:', error);
    return { success: false, message: "Failed to update product" };
  }

  return { success: true, message: "Product updated successfully", data };
}
