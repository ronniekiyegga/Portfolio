"use client";

import Link from "next/link";
import Image from "next/image";
import React from "react";
import { createPortal } from "react-dom";
import { X } from "lucide-react";
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

const exploreLinks = [
  { name: "Projects", href: "/#projects" },
  { name: "Courses", href: "#" },
  { name: "Blog", href: "/blog" },
  { name: "Resume", href: "#" },
];

function MobileMenu({
  isOpen,
  onClose,
}: {
  isOpen: boolean;
  onClose: () => void;
}) {
  if (!isOpen) return null;

  const menuContent = (
    <div
      className="fixed inset-0 z-[9999] flex flex-col"
      role="dialog"
      aria-modal="true"
      aria-label="Mobile menu"
    >
      <div className="relative flex h-full w-full flex-col overflow-hidden">
        {/* Backdrop - matches reference: light overlay + blur */}
        <div
          className="absolute inset-0 h-full w-full"
          style={{
            background: "rgba(255, 255, 255, 0.48)",
            backdropFilter: "blur(32px)",
            WebkitBackdropFilter: "blur(32px)",
          }}
          aria-hidden
          onClick={onClose}
        />
        <div className="relative z-10 flex h-full w-full flex-col overflow-hidden dark:bg-neutral-950/80">
          {/* Top: Logo + Close */}
          <div className="flex w-full shrink-0 items-center justify-between px-4 pt-4 pb-4">
            <Link
              href="/"
              onClick={onClose}
              className="shrink-0"
              aria-label="Home"
            >
              <Image
                src="/Ronnie_Logo.svg"
                alt="Ronnie Kiyegga - Engineer"
                width={80}
                height={44}
                className="h-8 w-auto dark:invert"
              />
            </Link>
            <button
              onClick={onClose}
              aria-label="Close menu"
              className="-m-2 p-3 text-black dark:text-white"
            >
              <X className="size-6" strokeWidth={2} />
            </button>
          </div>

          {/* Scrollable middle: Explore + Our features */}
          <div className="flex min-h-0 flex-1 flex-col justify-center">
            <div className="min-h-0 overflow-y-auto overflow-x-hidden px-8 pb-5">
              <div className="flex w-full flex-col items-start gap-1">
                <p className="mb-1 text-sm text-neutral-500 dark:text-neutral-400">
                  Explore
                </p>
                {exploreLinks.map((item) => (
                  <Link
                    key={item.name}
                    href={item.href}
                    onClick={onClose}
                    className={cn(
                      "w-full rounded-lg py-0.5 pr-3 text-lg font-bold text-neutral-900 dark:text-neutral-100",
                    )}
                  >
                    {item.name}
                  </Link>
                ))}
                {/* Gradient divider */}
                <div
                  className="my-6 h-px w-12"
                  style={{
                    background: "linear-gradient(77deg, #3A07F2 10.26%, #0CD1CF 98.05%)",
                  }}
                  aria-hidden
                />
                <p className="mb-1 text-sm text-neutral-500 dark:text-neutral-400">
                  Our features
                </p>
                <Accordion
                  type="single"
                  collapsible
                  className="w-full **:hover:no-underline"
                >
                  <AccordionItem
                    value="Projects"
                    className="w-full border-b-0"
                  >
                    <AccordionTrigger className="flex w-full items-center justify-between py-1.5 text-base font-medium text-neutral-900 hover:no-underline hover:bg-transparent data-[state=open]:bg-transparent dark:text-neutral-100">
                      Projects
                    </AccordionTrigger>
                    <AccordionContent className="pb-2 pt-0">
                      {projectsLinks.map((l, i) => (
                        <Link
                          key={i}
                          href={l.href}
                          onClick={onClose}
                          className="block py-1.5 text-sm text-neutral-600 dark:text-neutral-400"
                        >
                          {l.name}
                        </Link>
                      ))}
                    </AccordionContent>
                  </AccordionItem>
                  <AccordionItem
                    value="Courses"
                    className="w-full border-b-0"
                  >
                    <AccordionTrigger className="flex w-full items-center justify-between py-1.5 text-base font-medium text-neutral-900 hover:no-underline hover:bg-transparent data-[state=open]:bg-transparent dark:text-neutral-100">
                      Courses
                    </AccordionTrigger>
                    <AccordionContent className="pb-2 pt-0">
                      {coursesLinks.map((l, i) => (
                        <Link
                          key={i}
                          href={l.href}
                          onClick={onClose}
                          className="block py-1.5 text-sm text-neutral-600 dark:text-neutral-400"
                        >
                          {l.name}
                        </Link>
                      ))}
                    </AccordionContent>
                  </AccordionItem>
                </Accordion>
              </div>
            </div>
          </div>

          {/* Bottom: Blog | Resume + Let's chat button */}
          <div className="flex h-24 flex-col">
            <div className="flex w-full mx-auto items-center justify-center gap-4 pl-1 pb-8 pt-4">
              <div className="flex items-center gap-4 text-sm font-medium text-neutral-900 dark:text-neutral-100">
                <Link
                  href="/blog"
                  onClick={onClose}
                  className="flex items-center gap-1.5 relative"
                >
                  <span
                    className="size-1.5 rounded-full bg-blue-500 absolute top-0 -right-2"
                    aria-hidden
                  />
                  Blog
                </Link>
                <span className="h-4 w-px bg-neutral-300 dark:bg-neutral-600" aria-hidden />
                <Link href="#" onClick={onClose}>
                  Resume
                </Link>
              </div>
              <Link
                href="mailto:ronniekiyegga@dmi.com"
                onClick={onClose}
                className={cn(
                  "flex items-center justify-center gap-2 rounded-full border border-white/10 px-4 py-2.5 text-xs font-medium text-white",
                  styleScript.className,
                )}
                style={{
                  background: "#1a1a1a",
                  boxShadow:
                    "0 1.434px 1.147px 0 rgba(0, 0, 0, 0.12), 0 1.554px 1.554px 0 rgba(0, 0, 0, 0.14)",
                }}
              >
                <span className="size-1.5 shrink-0 rounded-full bg-teal-400" />
                Let&apos;s chat
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );

  return typeof document !== "undefined"
    ? createPortal(menuContent, document.body)
    : null;
}
