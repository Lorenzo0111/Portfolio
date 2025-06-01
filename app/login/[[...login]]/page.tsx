import { SignIn } from "@clerk/nextjs";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Login",
  description: "Sign in to your account",
};

export default function Page() {
  return (
    <main className="mx-auto">
      <SignIn />
    </main>
  );
}
