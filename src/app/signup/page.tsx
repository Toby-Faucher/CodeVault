import SignUpForm from "../../../components/sign-up-form";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Sign Up | CodeVault",
};

export default function Page() {
  return (
    <main className="min-h-screen flex items-center justify-center bg-gray-50">
      <SignUpForm />
    </main>
  );
}
