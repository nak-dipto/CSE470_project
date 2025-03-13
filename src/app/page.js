"use client";
import { FaBagShopping } from "react-icons/fa6";
import { useSession } from "next-auth/react";
export default function Home() {
  const { data: session } = useSession();
  let currentUserRole = session?.user.role;
  console.log(session);
  return (
    <div className="grid grid-rows-[20px_1fr_20px] items-center justify-items-center p-8 pb-20 gap-16 sm:p-20 font-[family-name:var(--font-geist-sans)]">
      <main className="flex flex-col gap-8 row-start-2 items-center sm:items-start">
        <h1 className="scroll-m-20 text-5xl font-extrabold tracking-tight lg:text-5xl">
          Hello{session ? ` ${session.user.name}` : ""},
          <br />
          Welcome to ByteBuy
        </h1>
        <p className="text-justify">
          Welcome to ByteBuy, your ultimate destination for high-quality
          computer parts and accessories. Whether you’re a seasoned gamer, a
          tech enthusiast, or building your own custom rig, we’ve got everything
          you need to power up your system. From cutting-edge processors to the
          latest graphics cards, memory, storage, and more, ByteBuy offers a
          wide selection of trusted brands at competitive prices. Shop with
          confidence and experience fast shipping, expert advice, and unbeatable
          customer service. At ByteBuy, we make building your dream PC easy!
        </p>

        <div className="flex gap-4 items-center flex-col sm:flex-row">
          <a
            className="rounded-full border border-solid border-transparent transition-colors flex items-center justify-center bg-foreground text-background gap-2 hover:bg-[#383838] dark:hover:bg-[#ccc] text-sm sm:text-base h-10 sm:h-12 px-4 sm:px-5"
            href={
              currentUserRole === "USER"
                ? "/shop"
                : currentUserRole === "ADMIN"
                ? "/admin"
                : "/signup"
            }
          >
            {currentUserRole === "ADMIN" ? (
              <>
                <FaUserShield className="dark inline align-middle" size={20} />
                Go to Admin Panel
              </>
            ) : (
              <>
                <FaBagShopping className="dark inline align-middle" size={20} />
                Shop now
              </>
            )}
          </a>
          <a
            className="rounded-full border border-solid border-black/[.08] dark:border-white/[.145] transition-colors flex items-center justify-center hover:bg-[#f2f2f2] dark:hover:bg-[#1a1a1a] hover:border-transparent text-sm sm:text-base h-10 sm:h-12 px-4 sm:px-5 sm:min-w-44"
            href="/about"
            target="_blank"
            rel="noopener noreferrer"
          >
            About Us
          </a>
        </div>
      </main>
    </div>
  );
}
