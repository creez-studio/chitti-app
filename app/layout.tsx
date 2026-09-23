import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Chitti | Your family circle",
  description: "Manage your chitti, monthly contributions and lucky draws together.",
  other: {
    "codex-preview": "development",
  },
  icons: {
    icon: "/favicon.svg",
    shortcut: "/favicon.svg",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="antialiased">{children}</body>
    </html>
  );
}
