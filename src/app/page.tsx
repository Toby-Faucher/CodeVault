

"use client";
import Link from "next/link";
import { useEffect, useState } from "react";
import { createBrowserClient } from "@supabase/ssr";
import type { User } from "@supabase/supabase-js";

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!;
const supabase = createBrowserClient(supabaseUrl, supabaseKey);

export default function Home() {
  const [user, setUser] = useState<User | null>(null);
  useEffect(() => {
    supabase.auth.getUser().then(({ data }) => setUser(data.user));
    const { data: listener } = supabase.auth.onAuthStateChange((_event, session) => {
      setUser(session?.user ?? null);
    });
    return () => listener?.subscription.unsubscribe();
  }, []);
  return (
    <>
      {/* Top Navigation Bar */}
      <nav className="fixed top-0 left-0 w-full z-50 flex items-center justify-between px-6 py-2">
        <div className="flex items-center gap-2">
          <span className="font-bold text-lg flex items-center gap-2">
            <svg width="26" height="26" viewBox="0 0 24 24" fill="none" className="inline-block"><circle cx="12" cy="12" r="10" fill="url(#cvlogo)" /><defs><linearGradient id="cvlogo" x1="0" y1="0" x2="24" y2="24" gradientUnits="userSpaceOnUse"><stop stopColor="#06b6d4"/><stop offset="1" stopColor="#818cf8"/></linearGradient></defs></svg>
            CodeVault
          </span>
        </div>
        <div className="hidden md:flex items-center font-bold gap-6 text-sm text-base-content/70 absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2">
          <a href="#how" className="hover:text-primary transition-colors cursor-pointer">How it works</a>
          <a href="#features" className="hover:text-primary transition-colors cursor-pointer">Features</a>
          <a href="#blog" className="hover:text-primary transition-colors cursor-pointer">Blog</a>
          <a href="#pricing" className="hover:text-primary transition-colors cursor-pointer">Pricing</a>
          <a href="#faq" className="hover:text-primary transition-colors cursor-pointer">FAQ</a>
          <a href="#discord" className="hover:text-primary transition-colors cursor-pointer">Discord</a>
        </div>

      </nav>
      <main className="bg-base-200 pt-16">
        {/* Glow background */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[1100px] h-[600px] md:w-[1600px] md:h-[900px] pointer-events-none z-0" aria-hidden="true">
          <div className="w-full h-full bg-gradient-to-br from-primary/60 via-pink-400/40 via-yellow-300/40 to-cyan-400/40 blur-[110px] opacity-60 animate-pulse transform skew-y-6 -rotate-6" />
        </div>
        {/* Hero Section */}
        <section className="w-full min-h-screen flex flex-col items-center justify-center relative z-10 px-6 md:px-12 lg:px-24">
          <h1 className="text-5xl md:text-7xl font-extrabold text-center mb-6">Code Vault</h1>
          <h2 className="text-2xl md:text-3xl font-bold text-center mb-4">Share & Organize Code Instantly</h2>
          <p className="text-lg max-w-xl font-medium text-base-content/70 mb-6 text-center">Upload, manage, and discover code snippets online.</p>
          {!user && (
            <Link
              href="/signin"
              className="btn btn-primary rounded-full px-5 py-2 text-base font-semibold shadow flex items-center gap-2"
            >
              Try Code Vault Now
            </Link>
          )}
        </section>
        {/* How It Works Section */}
        <section id="how" className="w-full flex flex-col items-center justify-center px-6 md:px-12 lg:px-24 py-16 min-h-[700px]">
          <h1 className="text-4xl md:text-5xl font-extrabold text-center mb-6">How It Works</h1>
          <p className="max-w-xl text-lg text-center text-base-content/80 mb-10">Code Vault makes it easy to upload, organize, and share your code snippets. Whether you want to keep your snippets private or share them with the world, Code Vault has you covered.</p>
          <ol className="w-full max-w-xl space-y-6">
            <li className="bg-base-100 rounded-xl p-5 shadow border-l-4 border-primary">
              <h2 className="text-xl font-bold mb-1 text-primary">1. Sign Up & Sign In</h2>
              <p>Create an account or sign in to start managing your personal code vault.</p>
            </li>
            <li className="bg-base-100 rounded-xl p-5 shadow border-l-4 border-secondary">
              <h2 className="text-xl font-bold mb-1 text-secondary">2. Add & Organize Snippets</h2>
              <p>Upload code snippets, assign them to folders, and tag them for easy searching and organization.</p>
            </li>
            <li className="bg-base-100 rounded-xl p-5 shadow border-l-4 border-accent">
              <h2 className="text-xl font-bold mb-1 text-accent">3. Share & Discover</h2>
              <p>Share your snippets publicly, browse and fork public code, and collaborate with the community.</p>
            </li>
            <li className="bg-base-100 rounded-xl p-5 shadow border-l-4 border-success">
              <h2 className="text-xl font-bold mb-1 text-success">4. Edit & Manage</h2>
              <p>Edit, update, or delete your snippets at any time. Your vault is always in your control.</p>
            </li>
          </ol>
        </section>
      </main>
    </>
  );
}
