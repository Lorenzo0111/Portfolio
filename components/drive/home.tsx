"use client";

import { useFetcher } from "@/utils/fetcher";
import type { DriveFile } from "@/generated/client";
import { useI18n } from "@/lib/i18n";
import { File } from "lucide-react";
import Link from "next/link";
import posthog from "posthog-js";

export default function Drive() {
  const { t } = useI18n();
  const { data } = useFetcher("/api/drive/files");

  const handleDownloadClick = (file: DriveFile) => {
    posthog.capture("drive_file_downloaded", {
      file_id: file.id,
      file_name: file.name,
    });
  };

  return (
    <main>
      <div className="m-auto flex flex-col content-center items-center justify-center text-center md:w-4/5">
        <h1 className="text-4xl font-extrabold">
          {t("drive.title")} <span className="text-gradient">{t("drive.highlight")}</span>
        </h1>
        <p className="mt-4 text-xl">
          {t("drive.description")}
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
                  <Link
                    className="text-primary"
                    href={file.fileUrl}
                    onClick={() => handleDownloadClick(file)}
                  >
                    {t("drive.download")}
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
