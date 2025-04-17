"use client";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { createBrowserClient } from "@supabase/ssr";
import type { User } from "@supabase/supabase-js";
import { LogIn, User as UserIcon } from "lucide-react";

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!;
const supabase = createBrowserClient(supabaseUrl, supabaseKey);

export default function UserBubbleLanding() {
  const [user, setUser] = useState<User | null>(null);
  const router = useRouter();

  useEffect(() => {
    supabase.auth.getUser().then(({ data }) => {
      setUser(data.user);
    });
    const { data: listener } = supabase.auth.onAuthStateChange((_event, session) => {
      setUser(session?.user ?? null);
    });
    return () => {
      listener?.subscription.unsubscribe();
    };
  }, []);

  if (user) {
    return (
      <button
        className="btn btn-ghost rounded-full px-5 py-2 text-base font-semibold shadow flex items-center gap-2"
        onClick={() => router.push("/dashboard")}
        aria-label="Go to dashboard"
      >
        <UserIcon size={20} />
        Dashboard
      </button>
    );
  }
  return (
    <button
      className="btn btn-primary rounded-full px-5 py-2 text-base font-semibold shadow flex items-center gap-2"
      onClick={() => router.push("/signin")}
      aria-label="Sign in"
    >
      <LogIn size={20} />
      Try Code Vault Now
    </button>
  );
}
