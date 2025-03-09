import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { Navbar } from "./components/layout/navbar";
import { Sidebar } from "./components/layout/sidebar";
import { FooterBar } from "./components/layout/footer-bar";
import { ThemeProvider } from "./components/layout/theme-provider";
import { SidebarProvider } from "./context/sidebarContext";
import { SubmitButton } from "@/components/ui/submit-button";
import { NotificationProvider } from "./context/notificationsContext";
import { Analytics } from "@vercel/analytics/react";
import Head from "next/head";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Linkify - A curated list of useful links",
  description: "A curated list of useful links",
  openGraph: {
    title: "Linkify - A curated list of useful links",
    description: "A curated list of useful links",
    images: [
      {
        url: "/linkify-img.png",
        width: 1200,
        height: 630,
        alt: "Linkify - A curated list of useful links",
      },
    ],
    type: "website",
    url: "https://linkify.ovh",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const currentYear = new Date().getFullYear();

  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <Analytics />
        <ThemeProvider
          attribute="class"
          defaultTheme="dark"
          enableSystem={false}
          disableTransitionOnChange
        >
          <NotificationProvider>
            <SidebarProvider>
              <div className="h-screen flex flex-col">
                {/* Navbar */}
                <Navbar />
                <div className="flex flex-col h-screen">
                  {/* Sidebar and Main Content Wrapper */}
                  <div className="flex flex-1">
                    {/* Sidebar */}
                    <Sidebar className="block w-60 h-full md:block p-4 border border-right-2 flex-shrink-0" />

                    {/* Main Content */}
                    <main className="w-full flex flex-col">
                      <div className="h-full md:pt-4 md:pl-4 overflow-auto">
                        {children}
                      </div>
                      {/* Footer (sticky at the bottom) */}
                      <footer className="w-full z-0 mx-auto text-center flex-2 p-6 text-sm">
                        <hr className="mb-4 mx-auto text-center w-[30%]" />
                        <p>
                          &copy;{" "}
                          <a
                            href="https://www.instagram.com/klaudiadev/"
                            target="_blank"
                            className="text-white"
                          >
                            <strong>klaudiadev</strong>
                          </a>{" "}
                          {currentYear}. All rights reserved.
                        </p>
                      </footer>
                    </main>
                  </div>
                  <div className="fixed bottom-[50px] md:bottom-0 right-0 p-12 w-30">
                    <SubmitButton />
                  </div>
                </div>
                <FooterBar className="fixed bottom-0 w-full block border-t md:hidden dark:bg-[#0A0A0A]" />
              </div>
            </SidebarProvider>
          </NotificationProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
