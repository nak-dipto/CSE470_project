import "./globals.css";
import AuthProvider from "@/components/AuthProvider";
import { ThemeProvider } from "@/components/theme-provider";
import { Toaster } from "sonner";
import { SidebarProvider, SidebarInset } from "@/components/ui/sidebar";
import { AppSidebar } from "@/components/app-sidebar";
import Header from "@/components/header";
import BackButton from "@/components/backButton";
import { FaArrowLeft } from "react-icons/fa6";
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
            <SidebarProvider>
              <AppSidebar />
              <SidebarInset>
                <Header />
                {children}
                <Toaster />
              </SidebarInset>
            </SidebarProvider>
            <BackButton>
              <FaArrowLeft />
            </BackButton>
          </ThemeProvider>
        </body>
      </AuthProvider>
    </html>
  );
}
