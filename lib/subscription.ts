import { freePlan, proPlan } from "@/lib/plans";
import { db } from "@/lib/db";

export async function getUserSubscriptionPlan(userId: string) {
  const user = await db.from("users").select("stripe_customer_id, stripe_subscription_id, stripe_price_id").eq("id", userId).single();

  if (!user.data) {
    throw new Error("User not found");
  }

  const isPro =
    user.data.stripe_price_id &&
    user.data.stripe_customer_id &&
    user.data.stripe_subscription_id;

  const plan = isPro ? proPlan : freePlan;

  return {
    ...plan,
    stripe_customer_id: user.data.stripe_customer_id,
    stripe_subscription_id: user.data.stripe_subscription_id,
    isPro,
  };
}