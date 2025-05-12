"use client";
import { useRouter } from "next/router";
import { FaComputer } from "react-icons/fa6";
import { Separator } from "@/components/ui/separator";
import { SidebarTrigger } from "@/components/ui/sidebar";
import { ModeToggle } from "@/components/modeToggle";

const Header = () => {
  return (
    <header className="flex h-16 shrink-0 items-center gap-2 border-b px-4 justify-between align-middle sticky top-0 backdrop-blur-sm z-10">
      <div className="flex items-center gap-2">
        <SidebarTrigger className="-ml-1" />
        <Separator
          orientation="vertical"
          className="mr-2 data-[orientation=vertical]:h-4"
        />
      </div>
      <div className="text-2xl font-bold flex items-center">
        <a className="flex items-center" href="/">
          <FaComputer className="dark inline align-middle" size={40} />
          &nbsp;ByteBuy
        </a>
      </div>
      <div>
        <ModeToggle />
      </div>
    </header>
  );
};

export default Header;
