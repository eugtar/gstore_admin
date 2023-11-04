import "./globals.css";
import type { Metadata } from "next";
import { FC, ReactNode } from "react";
import { Inter } from "next/font/google";
import { ClerkProvider } from "@clerk/nextjs";
import ThemeProvider from "@/providers/theme-provider";
import ModalProvider from "@/providers/modal-provider";
import ToasterProvider from "@/providers/toast-provider";

const inter = Inter({ subsets: ["latin"] });

const metadata: Metadata = {
  title: "Admin|Dashboard",
  description: "Store admin dashboard.",
};

const RootLayout: FC<{ children: ReactNode }> = async ({ children }) => {
  return (
    <ClerkProvider>
      <html lang="en">
        <body className={inter.className}>
          <ThemeProvider
            attribute={"class"}
            defaultTheme={"system"}
            enableSystem
          >
            <ToasterProvider />
            <ModalProvider />
            {children}
          </ThemeProvider>
        </body>
      </html>
    </ClerkProvider>
  );
};

export default RootLayout;
export { metadata };
