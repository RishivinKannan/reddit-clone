import { Inter } from "next/font/google";
import "@/styles/globals.css";
import { cn } from "@/lib/utils";
import NavBar from "@/components/NavBar";
import { Toaster } from "@/components/ui/Toaster";
import Provider from "@/components/Provider";

export const metadata = {
  title: "Breadit",
  description: "A Reddit clone built with Next.js and TypeScript.",
};

const inter = Inter({ subsets: ["latin"] });

export default function RootLayout({
  children,
  authModel,
}: Readonly<{
  children: React.ReactNode;
  authModel: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={cn(
        "bg-white text-slate-900 antialiased light",
        inter.className
      )}
    >
      <body className={"min-h-screen pt-12 bg-slate-50 antialiased"}>
        <Provider>
          <NavBar />
          {authModel}
          <div className="container max-w-7xl mxauto h-full pt-12">
            {children}
          </div>
          <Toaster />
        </Provider>
      </body>
    </html>
  );
}
