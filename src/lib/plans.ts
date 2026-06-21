export const freePlan = {
  name: "Free",
  description:
    "The free plan is limited to 3 posts. Upgrade to the PRO plan for unlimited posts.",
  stripePriceId: "",
};

export const proPlan = {
  name: "PRO",
  description: "The PRO plan has unlimited posts.",
  stripePriceId: process.env.STRIPE_PRO_PRICE_ID!,
};