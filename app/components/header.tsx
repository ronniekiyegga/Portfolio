"use client";

import Link from "next/link";
import Image from "next/image";
import React from "react";
import { Menu, X } from "lucide-react";
import { RiMenu4Line } from "react-icons/ri";
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
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/app/components/ui/accordion";
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

const mobileLinks = [
  { groupName: "Projects", links: projectsLinks },
  { groupName: "Courses", links: coursesLinks },
  { name: "Blog", href: "/blog" },
  { name: "Resume", href: "#" },
];

const pillBaseLeft = cn("backdrop-blur-sm pill-light pill-dark-left");
const pillBaseRight = cn("backdrop-blur-sm pill-light pill-dark-right");

interface HeaderProps {
  isHeaderVisible: boolean;
  isMobileMenuOpen?: boolean;
  onMobileMenuChange?: (open: boolean) => void;
  splashActive: boolean;
  setSplashActive: React.Dispatch<React.SetStateAction<boolean>>;
}

export default function Header({
  isHeaderVisible,
  isMobileMenuOpen = false,
  onMobileMenuChange,
  splashActive,
  setSplashActive,
}: HeaderProps) {
  const isLarge = useMedia("(min-width: 64rem)");
  const showHeader = isHeaderVisible;

  React.useEffect(() => {
    if (isMobileMenuOpen) document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = "";
    };
  }, [isMobileMenuOpen]);

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
          <div className="mx-auto flex w-full max-w-7xl min-w-0 items-center justify-between gap-8 lg:gap-12 max-lg:gap-3">
            {/* Mobile: logo + single MobileHeaderPill | Desktop: two pills */}
            {!isLarge ? (
              <>
                {/* Mobile: single bar - logo | dark pill | hamburger */}
                <div
                  className={cn(
                    pillBaseLeft,
                    "flex w-full items-center justify-between gap-3 rounded-2xl px-3 py-2",
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
                  <div className="flex items-center gap-2">
                    <MobileHeaderPill
                      splashActive={splashActive}
                      setSplashActive={setSplashActive}
                    />
                    <button
                      onClick={() => onMobileMenuChange?.(!isMobileMenuOpen)}
                      aria-label={isMobileMenuOpen ? "Close menu" : "Open menu"}
                      className="-m-2 flex size-10 items-center justify-center rounded-lg p-2 text-neutral-600 transition-colors hover:bg-neutral-100 hover:text-neutral-900 dark:text-neutral-400 dark:hover:bg-neutral-800 dark:hover:text-neutral-100"
                    >
                      {isMobileMenuOpen ? (
                        <X className="size-5" />
                      ) : (
                        <RiMenu4Line className="size-5" />
                      )}
                    </button>
                  </div>
                </div>
                {/* Mobile menu overlay */}
                <MobileMenu
                  isOpen={isMobileMenuOpen}
                  onClose={() => onMobileMenuChange?.(false)}
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
                    "flex items-center gap-2 overflow-hidden px-4 py-2 lg:gap-3 lg:px-4 ",
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

                  {/* Let's chat + SplashCursor + theme toggle (cream outer in light mode, dark pill in dark mode) */}
                  <div className="p-2 pill-outer-cream">
                    <div
                      className={cn(
                        "flex items-center gap-0.5 rounded-full px-1.5 py-0.5",
                        "bg-linear-(135deg, #FFF 54.8%, rgba(251, 233, 217, 0.59) 69.69%, #DEDAF9 86.6%, rgba(240, 172, 247, 0.76) 97.21%) shadow-[0_0_20px_rgba(59,7,242,0.3)]",
                        "dark:pill-inner-dark",
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
                      <div className="h-3.5 w-px shrink-0 bg-white/20" />
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
                            "size-3 shrink-0 transition-colors",
                            splashActive && "text-cyan-400",
                          )}
                        />
                      </button>
                      <div className="h-3.5 w-px shrink-0 bg-white/20" />
                      <div className="theme-toggle-outer shrink-0 pr-1.5">
                        <div className="theme-toggle-inner overflow-hidden flex items-center justify-center">
                          <AnimatedThemeToggler className="size-3.5 shrink-0 overflow-hidden text-neutral-400 dark:text-white [&>svg]:shrink-0 [&>svg]:max-w-full [&>svg]:max-h-full" />
                        </div>
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

function MobileMenu({
  isOpen,
  onClose,
}: {
  isOpen: boolean;
  onClose: () => void;
}) {
  if (!isOpen) return null;

  return (
    <>
      {/* Backdrop */}
      <div
        className="fixed inset-0 z-40 bg-black/20 backdrop-blur-sm"
        onClick={onClose}
        aria-hidden
      />
      {/* Menu panel */}
      <nav
        role="navigation"
        className={cn(
          pillBaseLeft,
          "fixed left-4 right-4 top-18 z-50 max-h-[calc(100vh-6rem)] overflow-y-auto rounded-2xl px-4 py-4",
        )}
      >
        <Accordion type="single" collapsible className="w-full">
          {mobileLinks.map((link, index) => {
            if ("groupName" in link && link.links) {
              return (
                <AccordionItem
                  key={index}
                  value={link.groupName!}
                  className="border-neutral-200/60 dark:border-neutral-700/60"
                >
                  <AccordionTrigger className="py-3 text-neutral-700 hover:no-underline dark:text-neutral-300">
                    {link.groupName}
                  </AccordionTrigger>
                  <AccordionContent>
                    <ul className="space-y-1 pl-2">
                      {link.links.map((l, i) => (
                        <li key={i}>
                          <Link
                            href={l.href}
                            onClick={onClose}
                            className="block py-2 text-sm text-neutral-600 dark:text-neutral-400"
                          >
                            {l.name}
                          </Link>
                        </li>
                      ))}
                    </ul>
                  </AccordionContent>
                </AccordionItem>
              );
            }
            if ("name" in link && link.href) {
              return (
                <Link
                  key={index}
                  href={link.href}
                  onClick={onClose}
                  className="block border-b border-neutral-200/60 py-3 text-neutral-700 dark:border-neutral-700/60 dark:text-neutral-300"
                >
                  {link.name}
                </Link>
              );
            }
            return null;
          })}
        </Accordion>
      </nav>
    </>
  );
}
