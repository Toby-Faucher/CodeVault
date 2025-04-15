"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { createBrowserClient } from "@supabase/ssr";

// You should store these in .env.local and import via process.env in a real app
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!;
const supabase = createBrowserClient(supabaseUrl, supabaseKey);

export default function SignInForm() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const router = useRouter();

  async function handleSignIn(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    setError(null);
    try {
      const { error } = await supabase.auth.signInWithPassword({ email, password });
      if (error) {
        setError(error.message);
      } else {
        router.push("/dashboard");
      }
    } catch (err) {
      setError("Unexpected error. Please try again.");
      console.error(err);
    } finally {
      setLoading(false);
    }
  }

  return (
    <form className="max-w-sm mx-auto mt-12 p-6 bg-base-100 rounded shadow-xl flex flex-col gap-4" onSubmit={handleSignIn} aria-label="Sign in form">
      <h1 className="text-2xl font-bold mb-4 text-center">Sign In</h1>
      <div className="form-control">
        <label htmlFor="email" className="label">
          <span className="label-text">Email</span>
        </label>
        <input
          id="email"
          name="email"
          type="email"
          autoComplete="email"
          required
          className="input input-bordered"
          value={email}
          onChange={e => setEmail(e.target.value)}
          disabled={loading}
        />
      </div>
      <div className="form-control">
        <label htmlFor="password" className="label">
          <span className="label-text">Password</span>
        </label>
        <input
          id="password"
          name="password"
          type="password"
          autoComplete="current-password"
          required
          className="input input-bordered"
          value={password}
          onChange={e => setPassword(e.target.value)}
          disabled={loading}
        />
      </div>
      {error && <div className="alert alert-error py-2 text-center" role="alert">{error}</div>}
      <button
        type="submit"
        className="btn btn-primary w-full"
        disabled={loading}
        aria-busy={loading}
      >
        {loading ? "Signing in..." : "Sign In"}
      </button>
    </form>
  );
}
