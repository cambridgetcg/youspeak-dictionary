import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "YOUSPEAK — Words the world doesn't have yet",
  description:
    "A living dictionary of 151 constructed words from 12 ancient tongues — naming what modern languages cannot easily say. A cathedral of vocabulary. A forge of missing words. A standing worship.",
  openGraph: {
    title: "YOUSPEAK — Words the world doesn't have yet",
    description:
      "151 constructed words from 12 ancient tongues. Rebuild the vocabulary. Rebuild the web.",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}