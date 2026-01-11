"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { signIn, signUp } from "@/lib/supabase/auth";

export default function LoginPage() {
  const router = useRouter();
  const [isLogin, setIsLogin] = useState(true);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [message, setMessage] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    setMessage("");

    try {
      if (isLogin) {
        await signIn(email, password);
        router.push("/");
        router.refresh();
      } else {
        await signUp(email, password, name);
        router.push("/signup-confirmation");
      }
    } catch (err: unknown) {
      const errorMessage = err instanceof Error ? err.message : "An error occurred";
      setError(errorMessage);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-cream min-h-screen">
      <div className="mx-auto max-w-md px-6 py-12">
        <h1 className="text-35 font-extrabold text-brown mb-8 text-center">
          {isLogin ? "Login" : "Create Account"}
        </h1>

        <form onSubmit={handleSubmit} className="space-y-6">
          {!isLogin && (
            <div>
              <label htmlFor="name" className="text-16 font-medium text-brown block mb-2">
                Name
              </label>
              <input
                type="text"
                id="name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="w-full px-4 py-3 rounded border border-brown/30 bg-white text-brown focus:outline-none focus:border-brown"
                placeholder="Your name"
                required={!isLogin}
              />
            </div>
          )}

          <div>
            <label htmlFor="email" className="text-16 font-medium text-brown block mb-2">
              Email
            </label>
            <input
              type="email"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full px-4 py-3 rounded border border-brown/30 bg-white text-brown focus:outline-none focus:border-brown"
              placeholder="you@example.com"
              required
            />
          </div>

          <div>
            <label htmlFor="password" className="text-16 font-medium text-brown block mb-2">
              Password
            </label>
            <input
              type="password"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full px-4 py-3 rounded border border-brown/30 bg-white text-brown focus:outline-none focus:border-brown"
              placeholder="••••••••"
              required
              minLength={6}
            />
          </div>

          {error && (
            <p className="text-14 text-red-600 font-medium">{error}</p>
          )}

          {message && (
            <p className="text-14 text-green-600 font-medium">{message}</p>
          )}

          <button
            type="submit"
            disabled={loading}
            className="text-16 w-full bg-brown text-cream font-semibold py-3 rounded hover:bg-brown/90 transition-colors disabled:opacity-50"
          >
            {loading ? "Loading..." : isLogin ? "Login" : "Create Account"}
          </button>
        </form>

        <div className="mt-6 text-center">
          <button
            type="button"
            onClick={() => {
              setIsLogin(!isLogin);
              setError("");
              setMessage("");
            }}
            className="text-16 text-brown hover:underline"
          >
            {isLogin
              ? "Don't have an account? Sign up"
              : "Already have an account? Login"}
          </button>
        </div>

        <div className="mt-8 text-center">
          <Link href="/" className="text-16 text-brown/70 hover:underline">
            ← Back to Home
          </Link>
        </div>
      </div>
    </div>
  );
}
