"use client";

import {
  ChevronRight,
  Coffee,
  Gamepad2,
  Menu,
  Target,
  X,
} from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";

const navLinks = [
  { href: "/quiz", label: "Otaku", icon: Gamepad2 },
  { href: "/chill", label: "Blindtest", icon: Coffee },
  { href: "/training", label: "Training", icon: Target },
];

interface NavigationProps {
  pathname: string;
}

export default function Navigation({ pathname }: NavigationProps) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <nav className="absolute top-0 left-0 right-0 z-50 py-5">
      <div className="mx-auto max-w-7xl px-4 sm:px-6">
        <div className="relative flex items-center justify-between rounded-2xl border border-white/10 bg-zinc-900/80 px-4 py-3 shadow-2xl shadow-black/50 backdrop-blur-xl">
          {/* Logo */}
          <Link href="/" className="group flex items-center gap-3">
            <div className="relative">
              <div className="absolute inset-0 rounded-xl bg-indigo-500 opacity-0 blur-lg transition-opacity group-hover:opacity-40" />
              <Image
                src="/images/logo.png"
                alt="AnimeQuiz logo"
                width={40}
                height={40}
                className="relative z-10 rounded-xl border border-white/20 shadow-lg transition-transform group-hover:scale-110"
              />
            </div>
            <span className="text-xl font-extrabold tracking-tight text-white transition-colors group-hover:text-indigo-400">
              Anime<span className="text-indigo-500">Quiz</span>
            </span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden items-center gap-1 md:flex">
            {navLinks.map(({ href, label, icon: Icon }) => {
              const isActive = pathname.startsWith(href);
              return (
                <Link
                  key={href}
                  href={href}
                  className={`group flex items-center gap-2 rounded-xl px-4 py-2 font-semibold transition-all duration-200 ${
                    isActive
                      ? "bg-white/10 text-white"
                      : "text-zinc-400 hover:bg-white/5 hover:text-white"
                  }`}
                >
                  <span
                    className={`transition-colors ${
                      isActive
                        ? "text-indigo-400"
                        : "text-zinc-500 group-hover:text-indigo-400"
                    }`}
                  >
                    <Icon size={18} />
                  </span>
                  {label}
                </Link>
              );
            })}
          </div>

          {/* Mobile Menu Toggle */}
          <div className="md:hidden">
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="rounded-lg bg-white/5 p-2 text-zinc-400 transition-colors hover:text-white"
            >
              {isOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu Overlay */}
      {isOpen && (
        <div className="fixed inset-0 top-[76px] z-40 bg-zinc-950/95 backdrop-blur-xl md:hidden">
          <div className="flex flex-col gap-4 p-6">
            {navLinks.map(({ href, label, icon: Icon }) => {
              const isActive = pathname.startsWith(href);
              return (
                <Link
                  key={href}
                  href={href}
                  className={`group flex items-center justify-between rounded-2xl border p-4 text-lg font-bold transition-all ${
                    isActive
                      ? "border-indigo-500/30 bg-indigo-500/10 text-white"
                      : "border-zinc-800/50 bg-zinc-900/50 text-white hover:border-indigo-500/30 hover:bg-indigo-500/10"
                  }`}
                  onClick={() => setIsOpen(false)}
                >
                  <div className="flex items-center gap-4">
                    <div
                      className={`flex h-10 w-10 items-center justify-center rounded-xl transition-all ${
                        isActive
                          ? "bg-indigo-500/20 text-indigo-400"
                          : "bg-zinc-800 text-zinc-400 group-hover:bg-indigo-500/20 group-hover:text-indigo-400"
                      }`}
                    >
                      <Icon size={18} />
                    </div>
                    {label}
                  </div>
                  <ChevronRight
                    size={20}
                    className="text-zinc-600 transition-all group-hover:translate-x-1 group-hover:text-indigo-400"
                  />
                </Link>
              );
            })}
          </div>
        </div>
      )}
    </nav>
  );
}
