import Drive from "@/components/drive/home";
import { auth } from "@/lib/auth";
import { headers } from "next/headers";
import { redirect } from "next/navigation";

export default async function DrivePage() {
  const session = await auth.api.getSession({
    headers: await headers(),
  });

  if (!session?.user) return redirect("/login");

  return <Drive />;
}
