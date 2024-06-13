"use client";

import { useQuery } from "@tanstack/react-query";
import { getOrdersByUserId } from "./actions";
import { OrderRow } from "@/app/thank-you/ThankYou";
import { useMemo } from "react";
import { Loader2 } from "lucide-react";
import Link from "next/link";
import MaxWidthWrapper from "@/components/MaxWidthWrapper";

const Page = ({
  params,
}: {
  params: {
    id: string;
  };
}) => {
  const { data, isLoading } = useQuery({
    queryFn: async () => await getOrdersByUserId(params.id),
    queryKey: ["get-orders"],
  });

  let orderItems = useMemo(() => {
    return data?.map((order) => order.orderItems).flat();
  }, [data]);

  if (isLoading) {
    return (
      <div className="mt-[56px] min-h-[calc(100vh-56px-84.8px)] flex items-center justify-center">
        <Loader2 className="w-6 h-6 animate-spin" />
      </div>
    );
  }

  return (
    <div className="mt-[56px] min-h-[calc(100vh-56px-84.8px)] h-full px-2">
      {orderItems && orderItems.length > 0 ? (
        <div className="w-full max-w-screen-xl mx-auto flex flex-col gap-y-3 mb-7">
          <h2 className="font-semibold text-xl my-3 mt-7 text-center">
            My Orders
          </h2>
          {orderItems?.map((item) => (
            <OrderRow item={item} key={item.id} showDate={true} />
          ))}
        </div>
      ) : (
        <MaxWidthWrapper className="mt-[56px] min-h-[calc(100vh-56px-84.8px)] py-10 flex flex-col gap-y-2 items-center justify-center">
          <h2 className="font-semibold text-2xl mt-7">
            You have not ordered any books yet.
          </h2>
          <p className="text-normal text-muted-foreground text-center">
            Find books that you would like.{" "}
            <span className="text-primary">
              <Link href="/books">Continue Shopping</Link>
            </span>
          </p>
        </MaxWidthWrapper>
      )}
    </div>
  );
};
export default Page;
