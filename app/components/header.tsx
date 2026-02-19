"use client";

import Link from "next/link";
import Image from "next/image";
import React from "react";
import { useMedia } from "@/app/hooks/use-media";
import { Style_Script } from "next/font/google";
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
} from "@/app/components/ui/navigation-menu";
import { FaWandSparkles } from "react-icons/fa6";
import { AnimatedThemeToggler } from "@/app/components/ui/animated-theme-toggler";
import { cn } from "@/lib/utils";
import MobileHeaderPill from "./MobileHeaderPill";
import { motion, AnimatePresence } from "motion/react";

const styleScript = Style_Script({ weight: "400", subsets: ["latin"] });
const projectsLinks = [
  { name: "All Projects", href: "/#projects" },
  { name: "Web Apps", href: "/#projects" },
  { name: "Design Systems", href: "/#projects" },
];

const coursesLinks = [
  { name: "All Courses", href: "#" },
  { name: "Tutorials", href: "#" },
];

const pillBaseLeft = cn("backdrop-blur-sm pill-light pill-dark-left");
const pillBaseRight = cn("backdrop-blur-sm pill-light pill-dark-right");

interface HeaderProps {
  isHeaderVisible: boolean;
  splashActive: boolean;
  setSplashActive: React.Dispatch<React.SetStateAction<boolean>>;
}

export default function Header({
  isHeaderVisible,
  splashActive,
  setSplashActive,
}: HeaderProps) {
  const isLarge = useMedia("(min-width: 64rem)");
  const showHeader = isHeaderVisible;

  return (
    <AnimatePresence>
      {showHeader && (
        <motion.header
          key="header"
          role="banner"
          className="fixed inset-x-0 top-0 z-50 px-4 pt-4 lg:px-8 lg:pt-6"
          initial={{ opacity: 1, y: 0 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -20 }}
          transition={{ duration: 0.3, ease: "easeOut" }}
        >
          <div className="mx-auto flex w-full max-w-7xl items-center justify-between gap-8 lg:gap-12 max-lg:gap-3">
            {/* Mobile: logo + single MobileHeaderPill | Desktop: two pills */}
            {!isLarge ? (
              <>
                {/* Mobile: compact logo container */}
                <div
                  className={cn(
                    pillBaseLeft,
                    "flex items-center rounded-2xl px-3 py-2",
                  )}
                >
                  <Link href="/" aria-label="Home" className="shrink-0">
                    <Image
                      src="/Ronnie_Logo.svg"
                      alt="Ronnie Kiyegga - Engineer"
                      width={80}
                      height={44}
                      className="h-8 w-auto dark:invert"
                      priority
                    />
                  </Link>
                </div>
                <MobileHeaderPill
                  splashActive={splashActive}
                  setSplashActive={setSplashActive}
                />
              </>
            ) : (
              <>
                {/* Desktop: Left pill - Logo + Projects + Courses */}
                <div
                  className={cn(
                    pillBaseLeft,
                    "flex items-center gap-2 px-3 py-2 lg:gap-3 lg:px-2 lg:py-2.5",
                  )}
                >
                  <Link href="/" aria-label="Home" className="shrink-0">
                    <Image
                      src="/Ronnie_Logo.svg"
                      alt="Ronnie Kiyegga - Engineer"
                      width={105}
                      height={57}
                      className="h-9 w-auto dark:invert lg:h-10"
                      priority
                    />
                  </Link>

                  <nav className="flex items-center gap-0.5">
                    <NavigationMenu>
                      <NavigationMenuList className=" border-0 bg-transparent p-0">
                        <NavigationMenuItem value="projects">
                          <NavigationMenuTrigger
                            className={cn(
                              "bg-transparent text-neutral-600 hover:bg-transparent dark:text-neutral-400 dark:hover:bg-transparent",
                              "text-gradient-blue hover:text-gradient-blue data-[state=open]:text-gradient-blue",
                            )}
                          >
                            Projects
                          </NavigationMenuTrigger>
                          <NavigationMenuContent>
                            <ul className="grid w-[180px] gap-1 p-2">
                              {projectsLinks.map((link, i) => (
                                <li key={i}>
                                  <NavigationMenuLink asChild>
                                    <Link
                                      href={link.href}
                                      className="block rounded-md px-3 py-2 text-xs text-neutral-600 hover:bg-neutral-100 hover:text-neutral-900 dark:text-neutral-400 dark:hover:bg-neutral-800 dark:hover:text-neutral-100"
                                    >
                                      {link.name}
                                    </Link>
                                  </NavigationMenuLink>
                                </li>
                              ))}
                            </ul>
                          </NavigationMenuContent>
                        </NavigationMenuItem>
                        <NavigationMenuItem value="courses">
                          <NavigationMenuTrigger className="bg-transparent text-neutral-600 hover:bg-transparent hover:text-neutral-900 dark:text-neutral-400 dark:hover:text-neutral-100">
                            Courses
                          </NavigationMenuTrigger>
                          <NavigationMenuContent>
                            <ul className="grid w-[180px] gap-1 p-2">
                              {coursesLinks.map((link, i) => (
                                <li key={i}>
                                  <NavigationMenuLink asChild>
                                    <Link
                                      href={link.href}
                                      className="block rounded-md px-3 py-2 text-xs text-neutral-600 hover:bg-neutral-100 hover:text-neutral-900 dark:text-neutral-400 dark:hover:bg-neutral-800 dark:hover:text-neutral-100"
                                    >
                                      {link.name}
                                    </Link>
                                  </NavigationMenuLink>
                                </li>
                              ))}
                            </ul>
                          </NavigationMenuContent>
                        </NavigationMenuItem>
                      </NavigationMenuList>
                    </NavigationMenu>
                  </nav>
                </div>

                {/* Desktop: Right pill - Blog + Resume + dark pill */}
                <div
                  className={cn(
                    pillBaseRight,
                    "flex items-center gap-2 overflow-hidden px-3 py-2 lg:gap-3 lg:px-4 lg:py-2.5",
                  )}
                >
                  <Link
                    href="/blog"
                    className="relative text-[13px] font-medium text-neutral-600 transition-colors hover:text-neutral-900 dark:text-neutral-400 dark:hover:text-neutral-100"
                  >
                    Blog
                    <span
                      className="absolute -right-2 -top-1 size-1.5 rounded-full bg-blue-500"
                      aria-hidden
                    />
                  </Link>
                  <div className="h-4 w-px shrink-0 bg-neutral-200 dark:bg-neutral-700" />
                  <Link
                    href="#"
                    className="text-sm font-medium text-neutral-600 transition-colors hover:text-neutral-900 dark:text-neutral-400 dark:hover:text-neutral-100"
                  >
                    Resume
                  </Link>
                  <div className="h-4 w-px shrink-0 bg-neutral-200 dark:bg-neutral-700" />

                  {/* Let's chat + SplashCursor + theme toggle (dark pill) */}
                  <div
                    className={cn(
                      "flex items-center gap-1 rounded-full px-2.5 py-1.5",
                      "bg-neutral-900 shadow-[0_0_20px_rgba(59,7,242,0.3)]",
                      "dark:bg-neutral-950 dark:border dark:border-neutral-600 dark:shadow-[0_0_24px_rgba(59,7,242,0.4)]",
                    )}
                    style={{
                      backgroundImage: "url(/BG_1.png)",
                      backgroundSize: "cover",
                      backgroundPosition: "center",
                      backgroundRepeat: "no-repeat",
                    }}
                  >
                    <Link
                      href="mailto:ronniekiyegga@dmi.com"
                      className={cn(
                        "flex items-center gap-1.5 rounded-full px-2.5 py-1.5 text-xs font-medium text-white transition-opacity hover:opacity-90",
                        styleScript.className,
                      )}
                    >
                      <span className="size-1.5 shrink-0 rounded-full bg-teal-400" />
                      Let&apos;s chat
                    </Link>
                    <div className="h-3.5 w-px shrink-0 bg-white/30" />
                    <button
                      type="button"
                      onClick={() => setSplashActive((prev) => !prev)}
                      className="rounded-full p-1.5 text-white/90 transition-colors hover:bg-white/10"
                      aria-label={
                        splashActive
                          ? "Disable fluid cursor"
                          : "Enable fluid cursor"
                      }
                    >
                      <FaWandSparkles
                        className={cn(
                          "size-3.5 shrink-0 transition-colors",
                          splashActive && "text-cyan-400",
                        )}
                      />
                    </button>
                    <div className="h-3.5 w-px shrink-0 bg-white/20" />
                    <div className="theme-toggle-outer shrink-0 pr-1.5">
                      <div className="theme-toggle-inner overflow-hidden flex items-center justify-center">
                        <AnimatedThemeToggler className="size-3.5 shrink-0 overflow-hidden text-neutral-700 dark:text-white [&>svg]:shrink-0 [&>svg]:max-w-full [&>svg]:max-h-full" />
                      </div>
                    </div>
                  </div>
                </div>
              </>
            )}
          </div>
        </motion.header>
      )}
    </AnimatePresence>
  );
}
