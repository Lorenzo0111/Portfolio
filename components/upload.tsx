"use client";

import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { SiYoutube } from "@icons-pack/react-simple-icons";
import {
  AlertCircle,
  CheckCircle2,
  Link as LinkIcon,
  Loader2,
  Upload as UploadIcon,
  X,
} from "lucide-react";
import Image from "next/image";
import posthog from "posthog-js";
import { useCallback, useRef, useState } from "react";

export default function Upload() {
  const [name, setName] = useState<string>("");
  const [description, setDescription] = useState<string>("");
  const [category, setCategory] = useState<string>("");
  const [link, setLink] = useState<string>("");
  const [youtube, setYoutube] = useState<string>("");
  const [files, setFiles] = useState<File[]>([]);
  const [error, setError] = useState<string>("");
  const [success, setSuccess] = useState<string>("");
  const [isDragging, setIsDragging] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);

  const handleDragOver = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(true);
  }, []);

  const handleDragLeave = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
  }, []);

  const handleDrop = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);

    if (e.dataTransfer.files && e.dataTransfer.files.length > 0) {
      const newFiles = Array.from(e.dataTransfer.files);
      setFiles((prev) => [...prev, ...newFiles]);
    }
  }, []);

  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      const newFiles = Array.from(e.target.files);
      setFiles((prev) => [...prev, ...newFiles]);
    }
  };

  const removeFile = (index: number) => {
    setFiles((prev) => prev.filter((_, i) => i !== index));
  };

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setIsLoading(true);
    setError("");
    setSuccess("");

    if (!name || !description || files.length === 0) {
      setError(
        "Please fill in all required fields and upload at least one image",
      );
      setIsLoading(false);
      return;
    }

    try {
      const formData = new FormData();
      formData.append("name", name);
      formData.append("description", description);
      formData.append("category", category);
      if (link) formData.append("link", link);
      if (youtube) formData.append("youtube", youtube);

      files.forEach((file) => {
        formData.append("file", file);
      });

      const response = await fetch("/api/projects/create", {
        method: "POST",
        body: formData,
      });

      const data = await response.json();

      if (data.error) {
        throw new Error(data.error);
      }

      posthog.capture("project_created", {
        project_name: name,
        category: category,
        has_link: !!link,
        has_youtube: !!youtube,
        image_count: files.length,
      });

      setSuccess("Project created successfully!");
      setName("");
      setDescription("");
      setCategory("");
      setLink("");
      setYoutube("");
      setFiles([]);
    } catch (err: any) {
      setError(err.message || "Something went wrong");
      posthog.capture("project_create_failed", {
        error: err.message,
      });
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <main className="p-4 md:p-8 flex items-center justify-center bg-[#141414]">
      <Card className="w-full max-w-4xl bg-[#18181b]/50 border-white/5 backdrop-blur-xl">
        <div className="grid md:grid-cols-2 gap-8">
          <div className="space-y-6">
            <div>
              <h1 className="text-3xl font-bold bg-linear-to-r from-[#f1a900] to-[#fdeb77] bg-clip-text text-transparent">
                Create Project
              </h1>
              <p className="text-gray-400 mt-2">
                Share your latest work with the world.
              </p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="space-y-2">
                <label className="text-sm font-medium text-gray-300">
                  Project Name
                </label>
                <Input
                  placeholder="e.g. Portfolio Website"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  required
                  className="bg-black/20 border-white/10 focus:border-[#f1a900]/50"
                />
              </div>

              <div className="space-y-2">
                <label className="text-sm font-medium text-gray-300">
                  Categories
                </label>
                <Input
                  placeholder="e.g. Web, Mobile, Design"
                  value={category}
                  onChange={(e) => setCategory(e.target.value)}
                  required
                  className="bg-black/20 border-white/10 focus:border-[#f1a900]/50"
                />
                <p className="text-xs text-gray-500">Comma separated values</p>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <label className="text-sm font-medium text-gray-300 flex items-center gap-2">
                    <LinkIcon className="w-4 h-4" /> Website
                  </label>
                  <Input
                    type="url"
                    placeholder="https://..."
                    value={link}
                    onChange={(e) => setLink(e.target.value)}
                    className="bg-black/20 border-white/10 focus:border-[#f1a900]/50"
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-medium text-gray-300 flex items-center gap-2">
                    <SiYoutube className="w-4 h-4" /> YouTube ID
                  </label>
                  <Input
                    placeholder="Video ID"
                    value={youtube}
                    onChange={(e) => setYoutube(e.target.value)}
                    className="bg-black/20 border-white/10 focus:border-[#f1a900]/50"
                  />
                </div>
              </div>

              <div className="space-y-2">
                <label className="text-sm font-medium text-gray-300">
                  Description
                </label>
                <Textarea
                  placeholder="Tell us about your project..."
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  required
                  className="min-h-[150px] bg-black/20 border-white/10 focus:border-[#f1a900]/50"
                />
              </div>
            </form>
          </div>

          <div className="space-y-6 flex flex-col">
            <div className="space-y-2">
              <label className="text-sm font-medium text-gray-300">
                Project Images
              </label>
              <div
                onDragOver={handleDragOver}
                onDragLeave={handleDragLeave}
                onDrop={handleDrop}
                onClick={() => inputRef.current?.click()}
                className={`
                  relative group cursor-pointer
                  border-2 border-dashed rounded-2xl p-8
                  flex flex-col items-center justify-center gap-4
                  transition-all duration-300 ease-out
                  ${
                    isDragging
                      ? "border-[#f1a900] bg-[#f1a900]/10 scale-[1.02]"
                      : "border-white/10 hover:border-[#f1a900]/50 hover:bg-white/5"
                  }
                `}
              >
                <input
                  type="file"
                  multiple
                  onChange={handleFileSelect}
                  className="hidden"
                  ref={inputRef}
                  accept="image/*"
                />
                <div
                  className={`
                  p-4 rounded-full bg-white/5 text-[#f1a900]
                  transition-transform duration-300 group-hover:scale-110 group-hover:rotate-3
                `}
                >
                  <UploadIcon className="w-8 h-8" />
                </div>
                <div className="text-center">
                  <p className="font-medium text-white">
                    Click to upload or drag and drop
                  </p>
                  <p className="text-sm text-gray-500 mt-1">
                    SVG, PNG, JPG or GIF
                  </p>
                </div>
              </div>
            </div>

            {files.length > 0 && (
              <div className="grid grid-cols-3 gap-3 max-h-[300px] overflow-y-auto p-2 custom-scrollbar">
                {files.map((file, idx) => (
                  <div
                    key={idx}
                    className="relative group aspect-square rounded-lg overflow-hidden border border-white/10 bg-black/20"
                  >
                    <Image
                      src={URL.createObjectURL(file)}
                      alt="Preview"
                      fill
                      className="object-cover transition-transform duration-300 group-hover:scale-110"
                    />
                    <button
                      onClick={() => removeFile(idx)}
                      className="absolute top-1 right-1 p-1 rounded-full bg-black/50 text-white opacity-0 group-hover:opacity-100 transition-opacity hover:bg-red-500/80"
                    >
                      <X className="w-4 h-4" />
                    </button>
                  </div>
                ))}
              </div>
            )}

            <div className="mt-auto space-y-4">
              {error && (
                <div className="p-4 rounded-xl bg-red-500/10 border border-red-500/20 text-red-400 flex items-center gap-3">
                  <AlertCircle className="w-5 h-5 shrink-0" />
                  <p className="text-sm">{error}</p>
                </div>
              )}

              {success && (
                <div className="p-4 rounded-xl bg-green-500/10 border border-green-500/20 text-green-400 flex items-center gap-3">
                  <CheckCircle2 className="w-5 h-5 shrink-0" />
                  <p className="text-sm">{success}</p>
                </div>
              )}

              <Button
                onClick={(e) => handleSubmit(e as any)}
                disabled={isLoading}
                className="w-full bg-[#f1a900] hover:bg-[#d49400] text-black font-bold py-6 text-lg shadow-lg shadow-[#f1a900]/20 hover:shadow-[#f1a900]/40 transition-all duration-300 hover:-translate-y-1"
              >
                {isLoading ? (
                  <>
                    <Loader2 className="w-5 h-5 mr-2 animate-spin" />
                    Creating...
                  </>
                ) : (
                  "Create Project"
                )}
              </Button>
            </div>
          </div>
        </div>
      </Card>
    </main>
  );
}
