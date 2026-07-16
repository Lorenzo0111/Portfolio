import Page from "@/components/drive-upload";
import { auth } from "@/lib/auth";
import { headers } from "next/headers";
import { redirect } from "next/navigation";

async function getData() {
  const headersList = await headers();

  const session = await auth.api.getSession({
    headers: headersList,
  });

  if (!session?.user) {
    return { users: [] };
  }

  const response = await auth.api.listUsers({
    query: {},
    headers: headersList,
  });

  const transformedUsers = response.users.map((user) => {
    return {
      id: user.id,
      username: user.name,
    };
  });

  return {
    users: transformedUsers,
  };
}

export default async function Upload() {
  const session = await auth.api.getSession({
    headers: await headers(),
  });

  if (!session?.user) return redirect("/login");
  if (session.user.role !== "admin") return redirect("/");

  const data = await getData();

  return <Page {...data} />;
}
