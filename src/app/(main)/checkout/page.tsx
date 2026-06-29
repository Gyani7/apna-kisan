
import { createCheckoutSession } from "./actions";

export default function CheckoutPage() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen">
      <h1 className="text-4xl font-bold mb-8">Go Premium</h1>
      <form action={createCheckoutSession}>
        <button
          type="submit"
          className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-4 px-8 rounded-lg text-xl"
        >
          Go Premium
        </button>
      </form>
    </div>
  );
}
