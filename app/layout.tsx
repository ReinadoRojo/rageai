import "./globals.css";

import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "RageAI",
  description: "A funny chat app, designed to ragebait the user who is asking questions.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="dark">
      <head>
        {/* Umami analytics. I use it for control who abuse the system, I don't care about anything else... */}
        <script defer src="/usage.js" data-website-id="7839702f-8d3e-483b-8c15-ecc3da1d16e1"></script>
      </head>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased max-h-screen h-screen`}
      >
        {children}
      </body>
    </html>
  );
}
