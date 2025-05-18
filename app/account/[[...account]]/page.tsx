import { UserProfile } from "@clerk/nextjs";
import { auth } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";

export default async function AccountPage() {
  const { userId } = await auth();

  if (!userId) return redirect("/login?redirect_url=/account");

  return (
    <div className="flex justify-center items-center m-auto w-full">
      <UserProfile />
    </div>
  );
}
