"use client";

import { faClipboard } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useRef, useState } from "react";

export default function Page({
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

    const response = await fetch("/api/drive/upload", {
      method: "POST",
      body: formData,
    });

    const data = await response.json();
    if (data.error) {
      setError(data.error);
      return;
    }

    if (!ownerId) setId(data.id);
    setSuccess(
      ownerId
        ? "Successfully created drive file"
        : "Invited created successfully"
    );

    setName("");
    setDescription("");
    setOwnerId("");
    setFile(null);
  }

  return (
    <main>
      <div className="text-center m-auto flex flex-col justify-center items-center content-center h-[500px] md:w-3/4 xl:w-1/2">
        <h1 className="from-[#f1a900] to-[#fdeb77] text-transparent bg-clip-text bg-gradient-to-r font-extrabold text-4xl mb-4">
          Upload a new item
        </h1>

        <form onSubmit={(e) => handleSubmit(e)} className="flex flex-col gap-2">
          {error && <p className="text-red-500">{error}</p>}
          {success && (
            <p className="text-primary">
              {success}{" "}
              {id && (
                <button
                  onClick={(e) => {
                    e.preventDefault();
                    navigator.clipboard.writeText(
                      `${window.location.protocol}//${window.location.host}/drive/invite/${id}`
                    );
                  }}
                >
                  <FontAwesomeIcon icon={faClipboard} />
                </button>
              )}
            </p>
          )}
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
            <option value="">Create an Invite</option>
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
            ref={inputRef}
          />
          <div className="flex gap-2">
            <button
              onClick={(e) => {
                e.preventDefault();
                inputRef.current?.click();
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
