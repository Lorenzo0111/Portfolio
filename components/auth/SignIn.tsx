"use client";

import { authClient } from "@/lib/auth-client";
import { SiDiscord, SiGithub } from "@icons-pack/react-simple-icons";
import { Eye, EyeOff, Loader2 } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { FormEvent, useCallback, useState } from "react";

export default function SignIn() {
  const router = useRouter();
  const search = useSearchParams();
  const redirectUrl = search.get("redirect_url") || "/";

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  const onSubmit = useCallback(
    async (e: FormEvent) => {
      e.preventDefault();
      setError(null);
      setLoading(true);
      try {
        const { error: signInError } = await authClient.signIn.email({
          email,
          password,
          fetchOptions: {
            onSuccess: () => {
              router.push(redirectUrl);
            },
          },
        });
        if (signInError) {
          setError(signInError.message || "Unable to sign in");
        }
      } catch (err) {
        setError("Unexpected error. Please try again.");
      } finally {
        setLoading(false);
      }
    },
    [email, password, redirectUrl, router]
  );

  const onProvider = useCallback(
    async (provider: "github" | "discord") => {
      setError(null);
      setLoading(true);
      try {
        await authClient.signIn.social({
          provider,
          callbackURL: redirectUrl,
        });
      } catch (err) {
        setLoading(false);
        setError("Social sign-in failed");
      }
    },
    [redirectUrl]
  );

  return (
    <div className="flex justify-center items-center p-4">
      <div className="w-full max-w-md bg-white/5 text-left backdrop-blur-sm rounded-lg p-6 sm:p-8 border border-white/10 hover:border-white/20 transition-all duration-200">
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
          Sign in
        </h1>
        <p className="text-center text-sm text-gray-300 mt-1">Welcome back</p>

        <div className="mt-4 grid grid-cols-2 gap-2">
          <button
            type="button"
            onClick={() => onProvider("github")}
            className="flex items-center justify-center gap-2 border border-white/10 hover:border-white/20 rounded-md py-2 text-white"
            disabled={loading}
          >
            <SiGithub width={18} /> Github
          </button>
          <button
            type="button"
            onClick={() => onProvider("discord")}
            className="flex items-center justify-center gap-2 border border-white/10 hover:border-white/20 rounded-md py-2 text-white"
            disabled={loading}
          >
            <SiDiscord width={18} /> Discord
          </button>
        </div>

        <form onSubmit={onSubmit} className="mt-4 space-y-4">
          <div className="space-y-1">
            <label className="text-sm" htmlFor="email">
              Email
            </label>
            <input
              id="email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className="w-full border border-white/10 rounded-md px-3 py-2 bg-transparent text-white placeholder:text-gray-400 focus:outline-none focus:border-white/20"
              placeholder="you@example.com"
              autoComplete="email"
            />
          </div>
          <div className="space-y-1">
            <div className="flex items-center justify-between">
              <label className="text-sm" htmlFor="password">
                Password
              </label>
              <button
                type="button"
                onClick={() => setShowPassword((v) => !v)}
                className="text-xs text-zinc-400 hover:text-zinc-200"
                aria-label={showPassword ? "Hide password" : "Show password"}
              >
                {showPassword ? <EyeOff width={16} /> : <Eye width={16} />}
              </button>
            </div>
            <input
              id="password"
              type={showPassword ? "text" : "password"}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              className="w-full border border-white/10 rounded-md px-3 py-2 bg-transparent text-white placeholder:text-gray-400 focus:outline-none focus:border-white/20"
              placeholder="••••••••"
              autoComplete="current-password"
            />
          </div>
          {error && (
            <div className="text-sm text-red-500" role="alert">
              {error}
            </div>
          )}
          <button
            type="submit"
            disabled={loading}
            className="w-full flex items-center justify-center gap-2 bg-[#fcba03] text-black font-medium rounded-md py-2 hover:brightness-110 disabled:opacity-50"
          >
            {loading && <Loader2 className="animate-spin" width={16} />}
            Sign in
          </button>
        </form>

        <p className="text-sm text-center text-gray-300 mt-4">
          Don&apos;t have an account?{" "}
          <Link className="underline" href="/register">
            Sign up
          </Link>
        </p>
      </div>
    </div>
  );
}
