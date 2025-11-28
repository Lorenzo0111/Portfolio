import Register from "@/components/auth/register";
import type { Metadata } from "next";
import { Suspense } from "react";

export const metadata: Metadata = {
  title: "Register",
  description: "Create your account",
};

export default function Page() {
  return (
    <main className="mx-auto min-h-[70vh] flex items-center justify-center bg-[radial-gradient(ellipse_at_top,var(--tw-gradient-stops))] from-yellow-100/40 via-transparent to-transparent">
      <Suspense>
        <Register />
      </Suspense>
    </main>
  );
}
