import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Trendly - Instagram Competitor Analysis Platform",
  description: "Track, analyze, and outperform your Instagram competitors with AI-powered insights",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        <link rel="preconnect" href="https://fonts.cdnfonts.com" />
      </head>
      <body className="antialiased">
        {children}
      </body>
    </html>
  );
}
