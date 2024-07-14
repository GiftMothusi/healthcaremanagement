import type { Metadata } from "next";
import { Plus_Jakarta_Sans, } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "@/components/theme-provider";

//cn short for "classname" allows us to add static as well as dynamic classes
import { cn } from "../lib/utils";

const fontSans= Plus_Jakarta_Sans({ 
    subsets: ["latin"],
    weight:["300","400","500","600","700"],
    variable:"--font-sans" });

export const metadata: Metadata = {
  title: "Medicare",
  description: "A Health care management system",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={cn("min-h-screen font-sans antialiased", fontSans.variable)}>
        <ThemeProvider
            attribute="class"
            defaultTheme="dark" 
        >
            {children}
        </ThemeProvider>
      </body>
    </html>
  );
}
