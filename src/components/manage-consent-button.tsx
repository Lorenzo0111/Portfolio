"use client";

import { resetConsent } from "@/lib/consent";
import { Button } from "./ui/button";

export function ManageConsentButton({ label }: { label: string }) {
  return (
    <Button variant="secondary" onClick={resetConsent}>
      {label}
    </Button>
  );
}
