"use client";
import { useState } from "react";
import { createBrowserClient } from "@supabase/ssr";

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!;
const supabase = createBrowserClient(supabaseUrl, supabaseKey);

export default function SignUpForm() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [displayName, setDisplayName] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState(false);

  async function handleSignUp(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    setError(null);
    setSuccess(false);
    try {
      // Check if display name is taken (in profiles table)
      const { data: existing, error: displayNameError } = await supabase
        .from('profiles')
        .select('id')
        .eq('display_name', displayName)
        .maybeSingle();
      if (displayNameError) throw displayNameError;
      if (existing) {
        setError('Display name is already taken.');
        setLoading(false);
        return;
      }
      // Create user
      const { data, error } = await supabase.auth.signUp({
        email,
        password
      });
      if (error || !data?.user) {
        setError(error?.message || 'Signup failed.');
        setLoading(false);
        return;
      }
      // Insert profile row with display name and email
      const { error: profileError } = await supabase
        .from('profiles')
        .insert({ id: data.user.id, display_name: displayName, email });
      if (profileError) {
        setError('Failed to save display name.');
        setLoading(false);
        return;
      }
      setSuccess(true);
    } catch (err) {
      setError("Unexpected error. Please try again.");
      console.error(err);
    } finally {
      setLoading(false);
    }
  }

  return (
    <form className="max-w-sm mx-auto mt-12 p-6 bg-base-100 rounded shadow-xl flex flex-col gap-4" onSubmit={handleSignUp} aria-label="Sign up form">
      <h1 className="text-2xl font-bold mb-4 text-center">Sign Up</h1>
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
        <label htmlFor="displayName" className="label">
          <span className="label-text">Display Name</span>
        </label>
        <input
          id="displayName"
          name="displayName"
          type="text"
          required
          className="input input-bordered"
          value={displayName}
          onChange={e => setDisplayName(e.target.value)}
          disabled={loading}
          minLength={3}
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
          autoComplete="new-password"
          required
          className="input input-bordered"
          value={password}
          onChange={e => setPassword(e.target.value)}
          disabled={loading}
        />
      </div>
      {error && <div className="alert alert-error py-2 text-center" role="alert">{error}</div>}
      {success && <div className="alert alert-success py-2 text-center" role="status">Check your email to confirm your account.</div>}
      <button
        type="submit"
        className="btn btn-primary w-full"
        disabled={loading}
        aria-busy={loading}
      >
        {loading ? "Signing up..." : "Sign Up"}
      </button>
    </form>
  );
}
