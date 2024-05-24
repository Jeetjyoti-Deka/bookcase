"use client";

import { useQuery } from "@tanstack/react-query";
import { getAuthStatus } from "./actions";
import { useRouter, useSearchParams } from "next/navigation";
import MaxWidthWrapper from "@/components/MaxWidthWrapper";
import { Loader2 } from "lucide-react";

const Page = () => {
  const searchParams = useSearchParams();
  const redirect = searchParams.get("redirect");
  const router = useRouter();

  const { data } = useQuery({
    queryKey: ["auth-callback"],
    queryFn: async () => await getAuthStatus(),
    retry: true,
    retryDelay: 500,
  });

  if (data?.success) {
    if (redirect) {
      router.push(redirect);
    } else {
      router.push("/");
    }
  }

  return (
    <MaxWidthWrapper className="mt-[56px] min-h-[calc(100vh-56px)] px-2">
      <div className="w-full h-full mt-24 flex justify-center">
        <div className="flex items-center justify-center gap-2">
          <Loader2 className="h-8 w-8 animate-spin text-zinc-500" />
          <h3 className="font-semibold text-xl">Logging you in...</h3>
          <p>You will be redirected automatically.</p>
        </div>
      </div>
    </MaxWidthWrapper>
  );
};
export default Page;
