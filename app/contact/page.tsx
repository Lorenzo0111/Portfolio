"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Mail } from "lucide-react";
import { useState } from "react";

export default function ContactPage() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [loading, setLoading] = useState(false);

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();

    setError("");
    setSuccess("");
    setLoading(true);

    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ name, email, message }),
      });

      const data = await response.json();

      if (!response.ok) {
        setError(data.error || "Failed to send message");
        return;
      }

      setSuccess("Message sent successfully! I'll get back to you soon.");
      setName("");
      setEmail("");
      setMessage("");
    } catch (err) {
      setError("Failed to send message. Please try again later.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="relative z-10 max-w-7xl mx-auto px-6 py-12 lg:py-20">
      <div className="max-w-2xl mx-auto">
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-bold mb-4 text-gradient">
            Get In Touch
          </h1>
          <p className="text-gray-300 text-lg">
            Have a project in mind? I&apos;d love to hear from you. Send me a
            message and I&apos;ll respond as soon as possible.
          </p>
        </div>

        <div className="p-8 rounded-3xl bg-linear-to-r from-primary/20 to-purple-500/20 border border-white/10 relative overflow-hidden">
          <div className="absolute inset-0 bg-card/40 backdrop-blur-sm -z-10" />

          <form onSubmit={handleSubmit} className="space-y-6">
            {error && (
              <div className="p-4 rounded-lg bg-red-500/10 border border-red-500/20 text-red-500">
                {error}
              </div>
            )}

            {success && (
              <div className="p-4 rounded-lg bg-primary/10 border border-primary/20 text-primary">
                {success}
              </div>
            )}

            <div>
              <label
                htmlFor="name"
                className="block text-sm font-medium mb-2 text-gray-300"
              >
                Name
              </label>
              <Input
                id="name"
                type="text"
                placeholder="Your name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
                disabled={loading}
              />
            </div>

            <div>
              <label
                htmlFor="email"
                className="block text-sm font-medium mb-2 text-gray-300"
              >
                Email
              </label>
              <Input
                id="email"
                type="email"
                placeholder="your.email@example.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                disabled={loading}
              />
            </div>

            <div>
              <label
                htmlFor="message"
                className="block text-sm font-medium mb-2 text-gray-300"
              >
                Message
              </label>
              <Textarea
                id="message"
                placeholder="Tell me about your project..."
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                rows={6}
                required
                disabled={loading}
              />
            </div>

            <Button
              type="submit"
              disabled={loading}
              className="w-full py-4 rounded-full text-lg font-bold gap-2"
            >
              {loading ? (
                "Sending..."
              ) : (
                <>
                  Send Message <Mail className="w-5 h-5" />
                </>
              )}
            </Button>
          </form>
        </div>
      </div>
    </div>
  );
}
