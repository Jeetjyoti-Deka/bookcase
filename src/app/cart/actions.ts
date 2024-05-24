"use server";

import { stripe } from "@/lib/stripe";
import { CartBook } from "@/redux/slice/cartSlice";
import { getKindeServerSession } from "@kinde-oss/kinde-auth-nextjs/server";

export const createCheckoutSession = async ({ cart }: { cart: CartBook[] }) => {
  const { getUser } = getKindeServerSession();
  const user = await getUser();

  if (!user || !user.id) {
    throw new Error("User is not logged in!");
  }

  const products = cart.map(async (book) => {
    return await stripe.products.create({
      name: book.bookTitle,
      images: [book.bookImage ?? ""],
      default_price_data: {
        currency: "INR",
        unit_amount:
          book.purchaseType === "rent"
            ? book.rentalPrice! * book.rentalDays! * 100
            : book.price! * 100,
      },
      metadata: {
        quantity: book.quantity ?? 1,
      },
    });
  });

  const normalProducts = await Promise.all(products);

  const stripeSession = await stripe.checkout.sessions.create({
    success_url: `${process.env.NEXT_PUBLIC_SERVER_URL}/thank-you?orderId=${1}`,
    cancel_url: `${process.env.NEXT_PUBLIC_SERVER_URL}/cart`,
    payment_method_types: ["card"],
    mode: "payment",
    shipping_address_collection: {
      allowed_countries: ["IN"],
    },
    line_items: normalProducts.map((product) => ({
      price: product.default_price as string,
      quantity: Number(product.metadata.quantity!),
    })),
  });

  return { url: stripeSession.url };
};
