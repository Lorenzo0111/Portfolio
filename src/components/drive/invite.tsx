"use client";

import { useFetcher } from "@/utils/fetcher";
import { AlertCircle, File, Loader2 } from "lucide-react";
import { useParams, useRouter } from "next/navigation";
import posthog from "posthog-js";
import { useState } from "react";
import { Button } from "../ui/button";
import { Card } from "../ui/card";

export default function Invite() {
  const { id } = useParams();
  const invite = useFetcher(id ? "/api/drive/invite/" + id : null);
  const router = useRouter();
  const [accepting, setAccepting] = useState(false);

  if (invite.isLoading) {
    return (
      <div className="flex justify-center items-center h-[50vh]">
        <Loader2 className="animate-spin text-primary" size={48} />
      </div>
    );
  }

  if (invite.data?.error) {
    return (
      <div className="flex justify-center items-center p-4">
        <Card className="w-full max-w-md p-6 sm:p-8 text-center border-red-500/20">
          <div className="flex justify-center mb-4 text-red-500">
            <AlertCircle size={48} />
          </div>
          <h1 className="text-2xl font-semibold text-white mb-2">Error</h1>
          <p className="text-gray-300 mb-6">{invite.data.error}</p>
          <Button
            variant="secondary"
            className="w-full"
            onClick={() => router.push("/")}
          >
            Go Home
          </Button>
        </Card>
      </div>
    );
  }

  const handleAccept = async () => {
    setAccepting(true);
    try {
      await fetch("/api/drive/invite/accept", {
        method: "POST",
        body: JSON.stringify({
          id: id,
        }),
        headers: {
          "Content-Type": "application/json",
        },
      });

      posthog.capture("drive_invite_accepted", {
        invite_id: id,
        file_name: invite.data?.name,
      });
      router.push("/drive");
    } catch (e) {
      console.error(e);
      posthog.captureException(e);
      setAccepting(false);
    }
  };

  return (
    <div className="flex justify-center items-center p-4">
      <Card className="w-full max-w-md p-6 sm:p-8 text-center">
        <h1 className="text-2xl font-semibold text-white">
          You&apos;ve been invited
        </h1>
        <p className="text-sm text-gray-300 mt-1 mb-6">
          to join{" "}
          <span className="font-medium text-white">{invite.data.name}</span>
        </p>

        <div className="bg-white/5 border border-white/10 rounded-xl p-6 mb-6 flex flex-col items-center group hover:bg-white/10 transition-colors">
          <div className="p-4 bg-white/5 rounded-full mb-4 group-hover:scale-110 transition-transform">
            <File size={32} className="text-primary" />
          </div>
          <p className="text-lg font-medium text-white truncate w-full">
            {invite.data.name}
          </p>
          {invite.data.description && (
            <p className="text-sm text-gray-400 mt-1 line-clamp-2">
              {invite.data.description}
            </p>
          )}
        </div>

        <Button className="w-full" onClick={handleAccept} disabled={accepting}>
          {accepting && <Loader2 className="animate-spin mr-2" size={16} />}
          {accepting ? "Accepting..." : "Accept Invitation"}
        </Button>
      </Card>
    </div>
  );
}
