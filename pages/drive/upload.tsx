import { useState } from "react";

import { getAuth, clerkClient } from "@clerk/nextjs/server";
import { GetServerSideProps } from "next";

export const getServerSideProps: GetServerSideProps = async (ctx) => {
  const { userId } = getAuth(ctx.req);

  if (!userId) {
    return {
      redirect: {
        destination: "/login",
        permanent: false,
      },
    };
  }

  const user = userId ? await clerkClient.users.getUser(userId) : undefined;
  if (!user || user.publicMetadata.role !== "admin") {
    return {
      redirect: {
        destination: "/",
        permanent: false,
      },
    };
  }

  const users = await clerkClient.users.getUserList();
  const transformedUsers = users.map((user) => {
    return {
      id: user.id,
      username: user.username,
    };
  });

  return {
    props: {
      users: transformedUsers,
    },
  };
};

export default function Upload({
  users,
}: {
  users: {
    id: string;
    username: string;
  }[];
}) {
  const [name, setName] = useState<string>("");
  const [description, setDescription] = useState<string>("");
  const [ownerId, setOwnerId] = useState<string>("");
  const [file, setFile] = useState<File | null>(null);
  const [error, setError] = useState<string>("");
  const [success, setSuccess] = useState<string>("");

  let fileInput: HTMLInputElement | null = null;

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();

    setError("");
    setSuccess("");

    if (!name || !description || !ownerId || !file) {
      setError("Please fill in all fields");
      return;
    }

    const formData = new FormData();
    formData.append("name", name);
    formData.append("description", description);
    formData.append("ownerId", ownerId);
    formData.append("file", file);

    const response = await fetch("/api/drive/upload", {
      method: "POST",
      body: formData,
    });

    const data = await response.json();
    if (data.error) {
      setError(data.error);
      return;
    }

    setSuccess("Successfully created drive file");
  }

  return (
    <main>
      <div className="text-center m-auto flex flex-col justify-center items-center content-center h-[500px] md:w-3/4 xl:w-1/2">
        <h1 className="from-[#f1a900] to-[#fdeb77] text-transparent bg-clip-text bg-gradient-to-r font-extrabold text-4xl mb-4">
          Upload a new item
        </h1>

        <form onSubmit={(e) => handleSubmit(e)} className="flex flex-col gap-2">
          {error && <p className="text-red-500">{error}</p>}
          {success && <p className="text-primary">{success}</p>}
          <input
            type="text"
            placeholder="Name"
            className="rounded-xl bg-[#18181b] p-2 focus:border-2 focus:border-primary outline-none"
            onChange={(e) => setName(e.target.value)}
            required
          />
          <input
            type="text"
            placeholder="Description"
            className="rounded-xl bg-[#18181b] p-2 focus:border-2 focus:border-primary outline-none"
            onChange={(e) => setDescription(e.target.value)}
            required
          />
          <select
            defaultValue={""}
            className="rounded-xl bg-[#18181b] p-2 outline-none"
          >
            <option value="" disabled>
              Owner
            </option>
            {users.map((user) => (
              <option
                key={user.id}
                value={user.id}
                onClick={() => setOwnerId(user.id)}
              >
                {user.username}
              </option>
            ))}
          </select>
          <input
            type="file"
            min={1}
            max={1}
            onChange={(e) => setFile(e.target.files?.[0] || null)}
            className="hidden"
            ref={(ref) => (fileInput = ref)}
          />
          <div className="flex gap-2">
            <button
              onClick={(e) => {
                e.preventDefault();
                fileInput?.click();
              }}
              className="rounded-xl border-2 border-primary p-2 w-full"
            >
              {file ? `Uploaded` : "Upload"}
            </button>
            <button
              type="submit"
              className="rounded-xl bg-primary text-black p-2 w-full"
            >
              Create
            </button>
          </div>
        </form>
      </div>
    </main>
  );
}
