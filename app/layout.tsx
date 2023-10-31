import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "@/components/provider/theme-provider";
import { ConvexClientProvider } from "@/components/provider/convex-provider";
import { Toaster } from "sonner";
import { ModalProvider } from "@/components/provider/modal-provider";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Notion Clone",
  description: "Generated by create next app",
  icons: {
    icon: [
      {
        media: "(prefers-color-scheme:light)",
        url: "/next.svg",
        href: "/next.svg",
      },
      {
        media: "(prefers-color-scheme:dark)",
        url: "/next.svg",
        href: "/next.svg",
      },
    ],
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={inter.className}>
        <ConvexClientProvider>
          <ThemeProvider
            attribute="class"
            defaultTheme="system"
            enableSystem
            disableTransitionOnChange
            storageKey="notion-clone-theme"
          >
            <Toaster position="bottom-center" />
            {children}
            <ModalProvider />
          </ThemeProvider>
        </ConvexClientProvider>
      </body>
    </html>
  );
}
