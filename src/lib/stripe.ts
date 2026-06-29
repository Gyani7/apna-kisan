
import Stripe from "stripe";
import isServer from "is-server";

let stripe: Stripe;

if (isServer()) {
  stripe = new Stripe(process.env.STRIPE_SECRET_KEY as string, {
    apiVersion: "2024-04-10",
  });
} else {
  stripe = null as any;
}

export { stripe };
