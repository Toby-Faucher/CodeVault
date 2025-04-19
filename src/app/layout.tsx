import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "CodeVault",
  description: "Share Your Code Snippets",
};

import RootLayoutClient from "./RootLayoutClient";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" data-theme="nord">
      <head>
        <link rel="icon" href="/favicon.ico" />
      </head>
      <body className=" antialiased">
        <RootLayoutClient>{children}</RootLayoutClient>
      </body>
    </html>
  );
}
