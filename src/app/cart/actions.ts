"use server";

import { db } from "@/db";
import { stripe } from "@/lib/stripe";
import { CartBook } from "@/redux/slice/cartSlice";
import { getKindeServerSession } from "@kinde-oss/kinde-auth-nextjs/server";
import { Order } from "@prisma/client";

export const createCheckoutSession = async ({ cart }: { cart: CartBook[] }) => {
  const { getUser } = getKindeServerSession();
  const user = await getUser();

  if (!user || !user.id) {
    throw new Error("You need to be logged in.");
  }

  let order: Order | undefined = undefined;

  const existOrder = await db.order.findFirst({
    where: {
      userId: user.id,
      isPaid: false,
    },
  });

  if (existOrder) {
    order = existOrder;
  } else {
    order = await db.order.create({
      data: {
        amount: cart.reduce((acc, curr) => {
          if (curr.purchaseType === "buy") {
            return acc + curr.price! * curr.quantity!;
          } else {
            return acc + curr.rentalPrice! * curr.rentalDays!;
          }
        }, 0),
        userId: user.id,
      },
    });
  }

  cart.forEach(async (book) => {
    const existOrderItem = await db.orderItem.findFirst({
      where: {
        bookTitle: book.bookTitle,
        purchaseType: book.purchaseType,
        volumeId: book.volumeId,
        bookImage: book.bookImage,
        price: book.purchaseType === "buy" ? book.price : null,
        rentalPrice: book.purchaseType === "rent" ? book.rentalPrice : null,
        quantity: book.quantity ?? 1,
        rentalDays: book.purchaseType === "rent" ? book.rentalDays : null,
        orderId: order.id,
      },
    });

    if (!existOrderItem) {
      await db.orderItem.create({
        data: {
          bookTitle: book.bookTitle,
          purchaseType: book.purchaseType,
          volumeId: book.volumeId,
          bookImage: book.bookImage,
          price: book.purchaseType === "buy" ? book.price : null,
          rentalPrice: book.purchaseType === "rent" ? book.rentalPrice : null,
          quantity: book.quantity ?? 1,
          rentalDays: book.purchaseType === "rent" ? book.rentalDays : null,
          orderId: order.id,
        },
      });
    }
  });

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
    success_url: `${process.env.NEXT_PUBLIC_SERVER_URL}/thank-you?orderId=${order.id}`,
    cancel_url: `${process.env.NEXT_PUBLIC_SERVER_URL}/cart`,
    payment_method_types: ["card"],
    mode: "payment",
    currency: "INR",
    shipping_address_collection: {
      allowed_countries: ["US"],
    },
    line_items: normalProducts.map((product) => ({
      price: product.default_price as string,
      quantity: Number(product.metadata.quantity!),
    })),
    metadata: { userId: user.id, orderId: order.id },
  });

  return { url: stripeSession.url };
};
