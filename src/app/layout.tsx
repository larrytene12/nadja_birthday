import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Happy Birthday Nadja 🌸",
  description: "A special birthday experience crafted just for you, Nadja. With love and lots of pink flowers 💕",
  openGraph: {
    title: "Happy Birthday Nadja 🌸",
    description: "A special birthday experience crafted just for you 💕",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="id" className="scroll-smooth">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
      </head>
      <body className="antialiased bg-dreamy overflow-x-hidden">
        {children}
      </body>
    </html>
  );
}
