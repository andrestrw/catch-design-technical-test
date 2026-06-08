import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {

  title: "GitHub Repositories",
  description: "Browse public repositories from the GitHub organization.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}