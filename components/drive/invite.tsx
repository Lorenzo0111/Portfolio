"use client";

import { useFetcher } from "@/utils/fetcher";
import { File } from "lucide-react";
import { useRouter, useParams } from "next/navigation";

export default function Invite() {
  const { id } = useParams();
  const invite = useFetcher(id ? "/api/drive/invite/" + id : null);
  const router = useRouter();

  if (invite.isLoading) {
    return (
      <div className="text-center font-extrabold text-4xl">Loading...</div>
    );
  }

  if (invite.data.error) {
    return (
      <div className="text-center font-extrabold text-4xl">
        {invite.data.error}
      </div>
    );
  }

  return (
    <div className="flex justify-center items-center flex-col gap-4">
      <p className="text-center font-extrabold text-4xl">
        You have been invited to join {invite.data.name}
      </p>
      <p className="text-center text-2xl">
        Click the button below to accept it
      </p>

      <div className="w-52 flex justify-center items-center text-center flex-col p-4 bg-card rounded-2xl">
        <File size={50} />
        <p className="text-xl mt-2">{invite.data.name}</p>
        <p className="text-[#505050]">{invite.data.description}</p>
      </div>

      <button
        className="bg-primary text-white rounded-xl p-2"
        onClick={() => {
          fetch("/api/drive/invite/accept", {
            method: "POST",
            body: JSON.stringify({
              id: id,
            }),
            headers: {
              "Content-Type": "application/json",
            },
          }).then(() => {
            router.push("/drive");
          });
        }}
      >
        Accept
      </button>
    </div>
  );
}
