import Invite from "@/components/drive/invite";
import { auth } from "@/lib/auth";
import { headers } from "next/headers";
import { redirect } from "next/navigation";

export default async function InvitePage(props: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await props.params;
  const session = await auth.api.getSession({
    headers: await headers(),
  });

  if (!session?.user)
    return redirect(
      "/login?redirect_url=" +
        encodeURIComponent(`/drive/invite/${encodeURIComponent(id)}`),
    );

  return <Invite />;
}
