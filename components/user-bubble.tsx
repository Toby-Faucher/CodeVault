"use client";
import { useEffect, useState } from "react";
import { usePathname, useRouter } from "next/navigation";
import { createBrowserClient } from "@supabase/ssr";
import type { User } from "@supabase/supabase-js";
import { LogIn, User as UserIcon, LogOut } from "lucide-react";

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!;
const supabase = createBrowserClient(supabaseUrl, supabaseKey);

export default function UserBubble() {
  const [user, setUser] = useState<User | null>(null);
  const pathname = usePathname();
  const router = useRouter();

  useEffect(() => {
    supabase.auth.getUser().then(({ data }) => {
      setUser(data.user);
    });
    // Listen for auth state changes
    const { data: listener } = supabase.auth.onAuthStateChange((_event, session) => {
      setUser(session?.user ?? null);
    });
    return () => {
      listener?.subscription.unsubscribe();
    };
  }, []);

  // Hide bubble on /signin and /signup
  if (pathname === "/signin" || pathname === "/signup") return null;

  return (
    // Ensure UserBubble is always clickable and above all UI
    <div className="fixed top-4 right-4 z-[9999]" style={{ pointerEvents: 'auto' }}>

      {user ? (
        <div className="dropdown dropdown-end ">
          <label tabIndex={0} className="btn btn-ghost btn-circle avatar">
  <div className="w-10 h-10 rounded-full bg-primary text-primary-content flex items-center justify-center border-2 border-neutral">
    <UserIcon size={28} className="mx-auto my-auto" />
  </div>
</label>
          <ul tabIndex={0} className="mt-2 p-4 shadow menu menu-sm dropdown-content bg-base-100 rounded-box w-52 border-2 border-neutral">
            <li className="font-bold text-center">{user.email}</li>
            <hr className="my-3"/>
            <li>
              <button
                className="btn btn-info btn-sm w-full flex items-center gap-2 px-4 py-2"
                onClick={() => router.push("/dashboard")}
              >
                <UserIcon size={16} /> Go to Dashboard
              </button>
            </li>
            <hr className="my-3"/>
            <li>
              <button
                className="btn btn-error btn-sm w-full flex items-center gap-2 px-4 py-2"
                onClick={async () => { await supabase.auth.signOut(); window.location.href = "/signin"; }}
              >
                <LogOut size={16} /> Sign Out
              </button>
            </li>
          </ul>
        </div>
      ) : (
        <button
          className="btn btn-primary rounded-full px-5 py-2 text-base font-semibold shadow-lg flex items-center gap-2"
          onClick={() => router.push("/signin")}
          aria-label="Sign in"
        >
          <LogIn size={20} />
          Try Code Vault Now
        </button>
      )}
    </div>
  );
}
