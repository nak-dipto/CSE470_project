"use client";
import * as React from "react";
import { FaComputer } from "react-icons/fa6";

import { SearchForm } from "@/components/search-form";
import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarRail,
} from "@/components/ui/sidebar";
import { useSession } from "next-auth/react";

export function AppSidebar({ ...props }) {
  const { data: session } = useSession();
  const data = {
    navMain: [
      {
        title: "",
        items: [
          {
            title: "Home",
            url: "/",
          },
          {
            title: "About Us",
            url: "/about",
          },
          ...(session?.user.role == "user"
            ? [
                {
                  title: "Shop",
                  url: "/shop",
                },
                {
                  title: "Bookmarks",
                  url: "/bookmarks",
                },
                {
                  title: "Cart",
                  url: "/cart",
                },
                {
                  title: "Order History",
                  url: "/orders",
                },
              ]
            : []),
          ...(session?.user.role == "admin"
            ? [
                {
                  title: "Add Product",
                  url: "/admin/create-product",
                },
                {
                  title: "Product List",
                  url: "/admin/shop",
                },
                {
                  title: "Order History",
                  url: "/admin/orders",
                },
              ]
            : []),
          ...(session
            ? [
                {
                  title: "Logout",
                  url: "/api/auth/signout",
                },
              ]
            : [
                {
                  title: "SignIn",
                  url: "/api/auth/signin",
                },
                {
                  title: "Signup",
                  url: "/auth/signup",
                },
              ]),
        ],
      },
    ],
  };
  return (
    <Sidebar {...props}>
      <SidebarHeader>
        <div className="text-2xl font-bold flex justify-center items-center p-2">
          <a href="/">
            <FaComputer className="dark inline align-middle" size={40} />
            &nbsp;ByteBuy
          </a>
        </div>
        {session?.user.role == "user" ? <SearchForm /> : ""}
      </SidebarHeader>
      <SidebarContent>
        {/* We create a SidebarGroup for each parent. */}
        {data.navMain.map((item) => (
          <SidebarGroup key={item.title}>
            <SidebarGroupLabel className={"pl-5"}>
              {item.title}
            </SidebarGroupLabel>
            <SidebarGroupContent>
              <SidebarMenu>
                {item.items.map((item) => (
                  <SidebarMenuItem className={"pl-6"} key={item.title}>
                    <SidebarMenuButton asChild isActive={item.isActive}>
                      <a href={item.url}>{item.title}</a>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                ))}
              </SidebarMenu>
            </SidebarGroupContent>
          </SidebarGroup>
        ))}
      </SidebarContent>
      <SidebarRail />
    </Sidebar>
  );
}
