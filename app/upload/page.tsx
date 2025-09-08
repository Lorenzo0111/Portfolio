import Upload from "@/components/upload";
import { auth } from "@/lib/auth";
import { headers } from "next/headers";
import { redirect } from "next/navigation";

export default async function UploadPage() {
  const session = await auth.api.getSession({
    headers: await headers(),
  });

  if (!session?.user) return redirect("/login");
  if (session.user.role !== "admin") return redirect("/");

  return <Upload />;
}
