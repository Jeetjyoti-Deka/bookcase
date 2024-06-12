"use server";

import { db } from "@/db";

export const getOrdersByUserId = async (userId: string) => {
  const user = await db.user.findFirst({
    where: {
      id: userId,
    },
  });

  if (!user) {
    throw new Error("User not found");
  }

  const orders = await db.order.findMany({
    where: {
      userId: userId,
    },
    include: {
      orderItems: true,
    },
  });

  console.log("in the orders function");

  return orders;
};
