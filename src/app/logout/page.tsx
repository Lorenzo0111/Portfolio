"use client";

import { authClient } from "@/lib/auth-client";
import { useRouter } from "next/navigation";
import posthog from "posthog-js";
import { useEffect } from "react";

export default function Page() {
  const router = useRouter();

  useEffect(() => {
    posthog.capture("user_signed_out");

    authClient.signOut({
      fetchOptions: {
        onSuccess: () => {
          posthog.reset();
          router.push("/");
        },
      },
    });
  }, [router]);

  return null;
}
