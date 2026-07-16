"use client";

import { Check, Clipboard, Upload as UploadIcon } from "lucide-react";
import posthog from "posthog-js";
import { useRef, useState } from "react";
import { Button } from "./ui/button";
import { Card } from "./ui/card";
import { Input } from "./ui/input";

export default function DriveUpload({
  users,
}: {
  users: {
    id: string;
    username: string | null;
  }[];
}) {
  const [name, setName] = useState<string>("");
  const [description, setDescription] = useState<string>("");
  const [ownerId, setOwnerId] = useState<string>("");
  const [file, setFile] = useState<File | null>(null);
  const [error, setError] = useState<string>("");
  const [success, setSuccess] = useState<string>("");
  const [id, setId] = useState<string>("");
  const inputRef = useRef<HTMLInputElement>(null);

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();

    setError("");
    setSuccess("");

    if (!name || !description || !file) {
      setError("Please fill in all fields");
      return;
    }

    const formData = new FormData();
    formData.append("name", name);
    formData.append("description", description);
    if (ownerId) formData.append("ownerId", ownerId);
    formData.append("file", file);

    try {
      const response = await fetch("/api/drive/upload", {
        method: "POST",
        body: formData,
      });

      const data = await response.json();
      if (data.error) {
        setError(data.error);
        posthog.capture("drive_upload_failed", {
          error: data.error,
          is_invite: !ownerId,
        });
        return;
      }

      if (!ownerId) {
        setId(data.id);
        posthog.capture("drive_invite_created", {
          file_name: name,
        });
      } else {
        posthog.capture("drive_file_uploaded", {
          file_name: name,
          has_owner: true,
        });
      }
      setSuccess(
        ownerId
          ? "Successfully created drive file"
          : "Invited created successfully"
      );

      setName("");
      setDescription("");
      setOwnerId("");
      setFile(null);
    } catch (err) {
      setError("Something went wrong");
      posthog.captureException(err);
    }
  }

  return (
    <div className="flex justify-center items-center p-4">
      <Card className="w-full max-w-md p-6 sm:p-8 text-left">
        <h1 className="text-2xl font-semibold text-center text-white">
          Upload a new item
        </h1>
        <p className="text-center text-sm text-gray-300 mt-1">
          Share files with others
        </p>

        <form onSubmit={handleSubmit} className="mt-4 space-y-4">
          <div className="space-y-1">
            <label className="text-sm" htmlFor="name">
              Name
            </label>
            <Input
              id="name"
              type="text"
              placeholder="Item name"
              onChange={(e) => setName(e.target.value)}
              required
              value={name}
            />
          </div>

          <div className="space-y-1">
            <label className="text-sm" htmlFor="description">
              Description
            </label>
            <Input
              id="description"
              type="text"
              placeholder="Item description"
              onChange={(e) => setDescription(e.target.value)}
              required
              value={description}
            />
          </div>

          <div className="space-y-1">
            <label className="text-sm" htmlFor="owner">
              Owner (Optional)
            </label>
            <select
              id="owner"
              value={ownerId}
              className="w-full rounded-md px-3 py-2 bg-transparent border border-white/10 text-white placeholder:text-gray-400 focus:outline-none focus:border-white/20 transition-colors appearance-none"
              onChange={(e) => setOwnerId(e.target.value)}
            >
              <option value="" className="bg-zinc-900">
                Create an Invite
              </option>
              {users.map((user) => (
                <option key={user.id} value={user.id} className="bg-zinc-900">
                  {user.username}
                </option>
              ))}
            </select>
          </div>

          <div className="space-y-1">
            <label className="text-sm">File</label>
            <input
              type="file"
              min={1}
              max={1}
              onChange={(e) => setFile(e.target.files?.[0] || null)}
              className="hidden"
              ref={inputRef}
            />
            <Button
              type="button"
              variant="secondary"
              onClick={(e) => {
                e.preventDefault();
                inputRef.current?.click();
              }}
              className="w-full bg-transparent border border-white/10 hover:bg-white/5"
            >
              {file ? (
                <>
                  <Check className="mr-2 h-4 w-4" /> {file.name}
                </>
              ) : (
                <>
                  <UploadIcon className="mr-2 h-4 w-4" /> Select File
                </>
              )}
            </Button>
          </div>

          {error && (
            <div className="text-sm text-red-500" role="alert">
              {error}
            </div>
          )}

          {success && (
            <div className="text-sm text-green-500 flex items-center gap-2 bg-green-500/10 p-3 rounded-md">
              <span>{success}</span>
              {id && (
                <button
                  type="button"
                  className="ml-auto hover:text-green-400"
                  onClick={(e) => {
                    e.preventDefault();
                    navigator.clipboard.writeText(
                      `${window.location.protocol}//${window.location.host}/drive/invite/${id}`
                    );
                  }}
                >
                  <Clipboard className="h-4 w-4" />
                </button>
              )}
            </div>
          )}

          <Button type="submit" className="w-full">
            Create Item
          </Button>
        </form>
      </Card>
    </div>
  );
}
