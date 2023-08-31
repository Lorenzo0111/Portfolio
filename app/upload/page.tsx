"use client";

import { useState } from "react";

export default function Upload() {
  const [name, setName] = useState<string>("");
  const [description, setDescription] = useState<string>("");
  const [category, setCategory] = useState<string>("");
  const [link, setLink] = useState<string>("");
  const [file, setFile] = useState<FileList | null>(null);
  const [error, setError] = useState<string>("");
  const [success, setSuccess] = useState<string>("");

  let imageInput: HTMLInputElement | null = null;

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
    formData.append("category", category);
    if (link && link !== "") formData.append("link", link);
    for (let i = 0; i < file?.length; i++) {
      formData.append("file", file[i]);
    }

    const response = await fetch("/api/projects/create", {
      method: "POST",
      body: formData,
    });

    const data = await response.json();
    if (data.error) {
      setError(data.error);
      return;
    }

    setSuccess("Successfully created project");
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
            placeholder="Category"
            className="rounded-xl bg-[#18181b] p-2 focus:border-2 focus:border-primary outline-none"
            onChange={(e) => setCategory(e.target.value)}
            required
          />
          <input
            type="url"
            placeholder="Link"
            className="rounded-xl bg-[#18181b] p-2 focus:border-2 focus:border-primary outline-none"
            onChange={(e) => setLink(e.target.value)}
          />
          <textarea
            placeholder="Description"
            className="rounded-xl bg-[#18181b] p-2 resize-none focus:border-2 focus:border-primary outline-none"
            onChange={(e) => setDescription(e.target.value)}
            rows={5}
            required
          />
          <input
            type="file"
            min={1}
            multiple={true}
            onChange={(e) => setFile(e.target.files)}
            className="hidden"
            ref={(ref) => (imageInput = ref)}
          />
          <div className="flex gap-2">
            <button
              onClick={(e) => {
                e.preventDefault();
                imageInput?.click();
              }}
              className="rounded-xl border-2 border-primary p-2 w-full"
            >
              {file && file.length > 0 ? `Images (${file.length})` : "Images"}
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
