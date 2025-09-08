"use client";

import { useFetcher } from "@/utils/fetcher";
import type { DriveFile } from "@prisma/client";
import { File } from "lucide-react";
import Link from "next/link";

export default function Drive() {
  const { data } = useFetcher("/api/drive/files");

  return (
    <main>
      <div className="m-auto flex flex-col content-center items-center justify-center text-center md:w-4/5">
        <h1 className="text-4xl font-extrabold">
          Welcome to your <span className="text-gradient">drive</span>
        </h1>
        <p className="mt-4 text-xl">
          This is where you can download your past commissions.
        </p>
        <div className="flex w-full flex-col gap-2 mt-8">
          {data?.files?.map((file: DriveFile) => {
            return (
              <div
                key={file.id}
                className="bg-card w-full rounded-xl flex justify-between items-center p-4"
              >
                <div className="flex gap-2">
                  <File />
                  <p>{file.name}</p>
                  <p className="text-[#505050]">{file.description}</p>
                </div>
                {file.fileUrl && (
                  <Link className="text-primary" href={file.fileUrl}>
                    Download
                  </Link>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </main>
  );
}
