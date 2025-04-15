import SignInForm from "../../../components/sign-in-form";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Sign In | CodeVault",
};

export default function Page() {
  return (
    <main className="min-h-screen flex items-center justify-center bg-gray-50">
      <div className="w-full max-w-md flex flex-col items-center">
        <SignInForm />
        <div className="mt-6 text-center text-sm opacity-70 w-full">
          Don&apos;t have an account?{' '}
          <a href="/signup" className="link link-primary underline">
            Sign up
          </a>
        </div>
      </div>
    </main>
  );
}
