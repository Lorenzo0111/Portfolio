"use client";

import { useClerk } from "@clerk/nextjs";
import { redirect } from "next/navigation";
import { useEffect } from "react";

export default function Page() {
  const { signOut } = useClerk();

  useEffect(() => {
    signOut();
    redirect("/");
  }, []);

  return null;
}
