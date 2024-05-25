"use client";

import { useQuery } from "@tanstack/react-query";
import { useSearchParams } from "next/navigation";
import { getPaymentStatus } from "./actions";
import { ImageOff, Loader2, MapPin, ReceiptText, Truck } from "lucide-react";
import MaxWidthWrapper from "@/components/MaxWidthWrapper";
import Image from "next/image";
import { OrderItem } from "@prisma/client";
import { formatPrice } from "@/lib/utils";

const ThankYou = () => {
  const searchParams = useSearchParams();
  const orderId = searchParams.get("orderId") || "";

  const { data } = useQuery({
    queryKey: ["payment-status"],
    queryFn: async () => await getPaymentStatus({ orderId }),
    retry: true,
    retryDelay: 500,
  });

  if (data === undefined) {
    return (
      <div className="w-full  mt-24 flex justify-center">
        <div className="flex flex-col items-center gap-2">
          <Loader2 className="h-8 w-8 animate-spin text-zinc-500" />
          <h3 className="font-semibold text-xl">Loading your order...</h3>
          <p>This won&apos;t take long</p>
        </div>
      </div>
    );
  }

  if (data === false) {
    return (
      <div className="w-full mt-24 flex justify-center">
        <div className="flex flex-col items-center gap-2">
          <Loader2 className="h-8 w-8 animate-spin text-zinc-500" />
          <h3 className="font-semibold text-xl">Verifying your payment...</h3>
          <p>This might take a moment.</p>
        </div>
      </div>
    );
  }

  return (
    <MaxWidthWrapper className="mt-[56px] min-h-[calc(100vh-56px)] px-2">
      <div className="mt-20 flex flex-col items-center gap-y-4">
        <h1 className="text-4xl font-medium text-center ">Thank You!</h1>
        <p className="text-center max-w-prose text-lg font-medium">
          Your order with order ID - <span className="italic">{orderId}</span>{" "}
          has been placed successfully.
        </p>
      </div>
      <div className="grid grid-cols-1 min-[500px]:grid-cols-3 mt-16">
        <div className="border border-gray-300 p-4">
          <MapPin className="w-6 h-6  text-primary" />
          <h3 className="font-semibold text-lg">Shipping</h3>
          <div className="mt-3">
            <p className="font-semibold">{data.shippingAddress?.name}</p>
            <p></p>
            <p>
              {data.shippingAddress?.city}, {data.shippingAddress?.country}
            </p>
            <p>{data.shippingAddress?.street}</p>
            <p>{data.shippingAddress?.postalCode}</p>
            <p>{data.shippingAddress?.phoneNumber}</p>
          </div>
        </div>
        <div className="border border-gray-300 p-4">
          <ReceiptText className="w-6 h-6  text-primary" />
          <h3 className="font-semibold text-lg">Billing</h3>
          <div className="mt-3">
            <p className="font-semibold">{data.billingAddress?.name}</p>
            <p></p>
            <p>
              {data.billingAddress?.city}, {data.billingAddress?.country}
            </p>
            <p>{data.billingAddress?.street}</p>
            <p>{data.billingAddress?.postalCode}</p>
            <p>{data.billingAddress?.phoneNumber}</p>
          </div>
        </div>
        <div className="border border-gray-300 p-4">
          <Truck className="w-6 h-6  text-primary" />
          <h3 className="font-semibold text-lg">Shipping Method</h3>
          <div className="mt-3">
            <p className="font-semibold">Standard</p>
            <p>Items delivered within 5-7 business days.</p>
          </div>
        </div>
      </div>

      <div className="mt-16">
        <h4 className="font-semibold text-xl max-[669px]:text-center">
          Order List
        </h4>
        <div className="w-full h-px bg-gray-400 mt-1" />
        <div className="flex flex-col gap-y-4 mt-6">
          {data.orderItems.map((item) => (
            <OrderRow key={item.id} item={item} />
          ))}
        </div>
      </div>

      <div className="my-16">
        <h4 className="font-semibold text-xl max-[669px]:text-center">
          Order Summary
        </h4>
        <div className="w-full h-px bg-gray-400 mt-1" />
        <div className="grid grid-cols-2 mt-6 items-center">
          <div className="flex flex-col gap-y-2 max-[669px]:place-self-center">
            <h6 className="font-medium ">Subtotal</h6>
            <h6 className="font-medium ">Shipping Charge</h6>
            <h6 className="mt-4 font-semibold">Total</h6>
          </div>
          <div className="font-medium flex flex-col gap-y-2 max-[669px]:place-self-center">
            <p>{formatPrice(data.amount - 49)}</p>
            <p>{formatPrice(49)}</p>
            <p className="font-semibold mt-4">{formatPrice(data.amount)}</p>
          </div>
        </div>
      </div>
    </MaxWidthWrapper>
  );
};

const OrderRow = ({ item }: { item: OrderItem }) => {
  return (
    <div className="grid grid-cols-[15%,85%] xs:grid-cols-[10%,90%]">
      <div className="w-10 min-[669px]:w-20 h-10 min-[669px]:h-20 flex items-center justify-center relative bg-gray-200">
        {item.bookImage ? (
          <Image
            src={item.bookImage}
            fill
            alt={item.bookTitle}
            className="object-contain w-full"
          />
        ) : (
          <ImageOff className="w-4 h-4" />
        )}
      </div>
      <div className="grid grid-cols-3 items-center justify-center">
        <div className="flex items-center justify-center">
          <h3 className="max-w-32 overflow-hidden text-ellipsis whitespace-nowrap">
            {item.bookTitle}
          </h3>
          <p className="ml-1">({item.purchaseType})</p>
        </div>

        <div className="place-self-center">
          <p>{item.quantity}x</p>
        </div>

        <div className="place-self-center">
          {item.purchaseType === "buy" ? (
            <p>{formatPrice(item.price! * item.quantity!)}</p>
          ) : (
            <p>{formatPrice(item.rentalPrice! * item.rentalDays!)}</p>
          )}
        </div>
      </div>
    </div>
  );
};
export default ThankYou;
