"use client";

import { authClient } from "@/lib/auth-client";
import { useI18n } from "@/lib/i18n";
import { SiDiscord, SiGithub } from "@icons-pack/react-simple-icons";
import { Eye, EyeOff, Loader2 } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import posthog from "posthog-js";
import { FormEvent, useCallback, useState } from "react";
import { Button } from "../ui/button";
import { Card } from "../ui/card";
import { Input } from "../ui/input";

export default function Register() {
  const { t } = useI18n();
  const router = useRouter();
  const search = useSearchParams();
  const redirectUrl = search.get("redirect_url") || "/";

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  const onSubmit = useCallback(
    async (e: FormEvent) => {
      e.preventDefault();
      setError(null);
      setLoading(true);
      try {
        const { error: signUpError } = await authClient.signUp.email({
          email,
          password,
          name,
          fetchOptions: {
            onSuccess: () => {
              posthog.identify(email, {
                email: email,
                name: name,
              });

              posthog.capture("user_signed_up", {
                method: "email",
                email: email,
              });
              router.push(redirectUrl);
            },
          },
        });
        if (signUpError) {
          setError(signUpError.message || t("auth.signUpFailed"));
          posthog.capture("user_sign_up_failed", {
            method: "email",
            error: signUpError.message || t("auth.signUpFailed"),
          });
        }
      } catch (err) {
        setError(t("auth.unexpected"));
        posthog.captureException(err);
      } finally {
        setLoading(false);
      }
    },
    [email, password, name, redirectUrl, router, t]
  );

  const onProvider = useCallback(
    async (provider: "github" | "discord") => {
      setError(null);
      setLoading(true);
      // Capture social sign-up attempt
      posthog.capture("user_signed_up", {
        method: provider,
      });
      try {
        await authClient.signIn.social({
          provider,
          callbackURL: redirectUrl,
        });
      } catch (err) {
        setLoading(false);
        setError(t("auth.socialSignUpFailed"));
        posthog.capture("user_sign_up_failed", {
          method: provider,
          error: t("auth.socialSignUpFailed"),
        });
        posthog.captureException(err);
      }
    },
    [redirectUrl, t]
  );

  return (
    <div className="flex justify-center items-center p-4">
      <Card className="w-full max-w-md p-6 sm:p-8 text-left">
        <div className="flex justify-center mb-4">
          <Image
            src="/icon.png"
            alt="Logo"
            width={40}
            height={40}
            className="rounded-md shadow"
          />
        </div>
        <h1 className="text-2xl font-semibold text-center text-white">
          {t("auth.createAccount")}
        </h1>
        <p className="text-center text-sm text-gray-300 mt-1">
          {t("auth.startJourney")}
        </p>

        <div className="mt-4 grid grid-cols-2 gap-2">
          <Button
            type="button"
            variant="secondary"
            onClick={() => onProvider("github")}
            disabled={loading}
            className="bg-transparent"
          >
            <SiGithub width={18} className="mr-2" /> Github
          </Button>
          <Button
            type="button"
            variant="secondary"
            onClick={() => onProvider("discord")}
            disabled={loading}
            className="bg-transparent"
          >
            <SiDiscord width={18} className="mr-2" /> Discord
          </Button>
        </div>

        <form onSubmit={onSubmit} className="mt-4 space-y-4">
          <div className="space-y-1">
            <label className="text-sm" htmlFor="name">
              {t("auth.name")}
            </label>
            <Input
              id="name"
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
              placeholder={t("auth.yourName")}
            />
          </div>
          <div className="space-y-1">
            <label className="text-sm" htmlFor="email">
              {t("auth.email")}
            </label>
            <Input
              id="email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              placeholder="you@example.com"
              autoComplete="email"
            />
          </div>
          <div className="space-y-1">
            <div className="flex items-center justify-between">
              <label className="text-sm" htmlFor="password">
                {t("auth.password")}
              </label>
              <button
                type="button"
                onClick={() => setShowPassword((v) => !v)}
                className="text-xs text-zinc-400 hover:text-zinc-200"
                aria-label={
                  showPassword ? t("auth.hidePassword") : t("auth.showPassword")
                }
              >
                {showPassword ? <EyeOff width={16} /> : <Eye width={16} />}
              </button>
            </div>
            <Input
              id="password"
              type={showPassword ? "text" : "password"}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              placeholder="••••••••"
              autoComplete="new-password"
            />
          </div>
          {error && (
            <div className="text-sm text-red-500" role="alert">
              {error}
            </div>
          )}
          <Button type="submit" disabled={loading} className="w-full">
            {loading && <Loader2 className="animate-spin mr-2" width={16} />}
            {t("auth.createAccount")}
          </Button>
        </form>

        <p className="text-sm text-center text-gray-300 mt-4">
          {t("auth.haveAccount")}{" "}
          <Link className="underline" href="/login">
            {t("auth.signIn")}
          </Link>
        </p>
      </Card>
    </div>
  );
}
