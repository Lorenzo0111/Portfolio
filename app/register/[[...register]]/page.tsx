import { SignUp } from "@clerk/nextjs";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Register",
  description: "Create your account",
};

export default function Page() {
  return (
    <main className="mx-auto">
      <SignUp />
    </main>
  );
}
