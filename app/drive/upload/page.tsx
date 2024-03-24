import Page from "@/components/drive-upload";
import { clerkClient } from "@clerk/nextjs/server";

async function getData() {
  const { data: users } = await clerkClient.users.getUserList();
  const transformedUsers = users.map((user) => {
    return {
      id: user.id,
      username: user.username,
    };
  });

  return {
    users: transformedUsers,
  };
}

export default async function Upload() {
  const data = await getData();

  return <Page {...data} />;
}
