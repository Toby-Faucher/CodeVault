import SignInForm from "../../../components/sign-in-form";
import type { Metadata } from "next";


export const metadata: Metadata = {
  title: "Sign In | CodeVault",
};

export default function Page() {
  return (
    <main className="min-h-screen flex items-center justify-center bg-gray-50">
      <SignInForm />
    </main>
  );
}
