import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "@/styles/globals.css";
import { Provider } from  "./provider";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Hugo Hu",
  description: "Hugo Hu's Photography Portfolio",
};

export default function RootLayout({
    children,
  }: Readonly<{
    children: React.ReactNode;
  }>) {
    return (
      <html lang="en">
        <Provider>
          <body className={inter.className}>{children}</body>
        </Provider>
      </html>
    );
  }
