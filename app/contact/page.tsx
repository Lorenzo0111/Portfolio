"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { useI18n } from "@/lib/i18n";
import posthog from "posthog-js";
import { FormEvent, useState } from "react";

export default function ContactPage() {
  const { t } = useI18n();
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    setSuccess(false);

    posthog.capture("contact_submitted");

    const formData = new FormData(e.currentTarget);

    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        body: formData,
      });

      if (!res.ok) {
        const errorData = await res.json();
        throw new Error(errorData.error || "Failed to send message");
      }

      setSuccess(true);
      (e.target as HTMLFormElement).reset();
    } catch (err: any) {
      setError(err.message || "Something went wrong");
      posthog.captureException(err);
      posthog.capture("contact_failed", {
        error: err.message || "Something went wrong",
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-[calc(100vh-200px)] px-4">
      <div className="w-full max-w-md space-y-8">
        <div className="text-center space-y-2">
          <h1 className="text-3xl font-bold tracking-tight text-white">
            {t("contact.pageTitle")}
          </h1>
          <p className="text-gray-400">
            {t("contact.pageDescription")}
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="space-y-2">
            <label htmlFor="name" className="text-sm font-medium text-gray-200">
              {t("contact.name")}
            </label>
            <Input
              id="name"
              name="name"
              placeholder={t("contact.namePlaceholder")}
              required
              disabled={loading}
            />
          </div>

          <div className="space-y-2">
            <label
              htmlFor="email"
              className="text-sm font-medium text-gray-200"
            >
              {t("contact.email")}
            </label>
            <Input
              id="email"
              name="email"
              type="email"
              placeholder="your@email.com"
              required
              disabled={loading}
            />
          </div>

          <div className="space-y-2">
            <label htmlFor="body" className="text-sm font-medium text-gray-200">
              {t("contact.message")}
            </label>
            <Textarea
              id="body"
              name="body"
              placeholder={t("contact.messagePlaceholder")}
              required
              disabled={loading}
              className="min-h-[150px]"
            />
          </div>

          {error && (
            <div className="p-3 text-sm text-red-500 bg-red-500/10 border border-red-500/20 rounded-md">
              {error}
            </div>
          )}

          {success && (
            <div className="p-3 text-sm text-green-500 bg-green-500/10 border border-green-500/20 rounded-md">
              {t("contact.success")}
            </div>
          )}

          <Button type="submit" className="w-full" disabled={loading}>
            {loading ? t("contact.sending") : t("contact.send")}
          </Button>
        </form>
      </div>
    </div>
  );
}
