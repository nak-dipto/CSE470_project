import "./globals.css";
import AuthProvider from "@/components/AuthProvider";
import { ThemeProvider } from "@/components/theme-provider";
import { ModeToggle } from "@/components/modeToggle";
import { Toaster } from "sonner";
export const metadata = {
  title: "ByteBuy",
  description: "CSE470-Project",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <AuthProvider>
        <body className="antialiased">
          <ThemeProvider
            attribute="class"
            defaultTheme="system"
            enableSystem
            disableTransitionOnChange
          >
            <main>{children}</main>
            <Toaster />
            <ModeToggle />
          </ThemeProvider>
        </body>
      </AuthProvider>
    </html>
  );
}
