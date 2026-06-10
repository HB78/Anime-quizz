"use client";

import { usePathname } from "next/navigation";

import Navigation from "./Navigation";

export default function NavigationWrapper() {
  const pathname = usePathname();

  if (pathname === "/") return null;
  if (pathname.endsWith("/play")) return null;

  return <Navigation pathname={pathname} />;
}
