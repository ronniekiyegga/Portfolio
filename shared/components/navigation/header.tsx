"use client";

import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import React from "react";
import { createPortal } from "react-dom";
import { X } from "lucide-react";
import { RiMenu4Line } from "react-icons/ri";
import { useMedia } from "@/shared/hooks/use-media";
import { Style_Script } from "next/font/google";
import {
  NavigationMenu,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
} from "@/shared/components/ui/navigation-menu";
import { WiStars } from "react-icons/wi";
import { AnimatedThemeToggler } from "@/shared/components/ui/animated-theme-toggler";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/shared/components/ui/accordion";
import { cn } from "@/lib/utils";
import {
  HOME_NAV_ITEMS,
  HOME_SECTION_HASH_EVENT,
  isHomeSectionActive,
  scrollToHomeSection,
} from "@/lib/home-nav";
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

const pillBaseLeft = cn(
  "backdrop-blur-sm pill-light pill-dark-left header-pill-bg",
);
const pillBaseRight = cn(
  "backdrop-blur-sm pill-light pill-dark-right header-pill-bg",
);

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
  const pathname = usePathname();
  const [hash, setHash] = React.useState("");
  React.useEffect(() => {
    const syncFromUrl = () => setHash(window.location.hash.slice(1));
    const onCustom = (ev: Event) => {
      const id = (ev as CustomEvent<string>).detail;
      if (typeof id === "string") setHash(id);
    };
    queueMicrotask(syncFromUrl);
    window.addEventListener("hashchange", syncFromUrl);
    window.addEventListener(HOME_SECTION_HASH_EVENT, onCustom);
    return () => {
      window.removeEventListener("hashchange", syncFromUrl);
      window.removeEventListener(HOME_SECTION_HASH_EVENT, onCustom);
    };
  }, [pathname]);

  React.useEffect(() => {
    if (isMobileMenuOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [isMobileMenuOpen]);

  // Removed V2 version switcher UI

  return (
    <AnimatePresence>
      {showHeader && (
        <motion.header
          key="header"
          role="banner"
          className="fixed inset-x-0 top-0 z-50 px-4 pt-4 lg:px-8 lg:pt-6 bg-[#FDFBF7] dark:bg-transparent"
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
                      src="/images/branding/Ronnie_Logo.svg"
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
                      src="/images/branding/Ronnie_Logo.svg"
                      alt="Ronnie Kiyegga - Engineer"
                      width={105}
                      height={57}
                      className="h-9 w-auto dark:invert lg:h-10"
                      priority
                    />
                  </Link>

                  <nav className="flex items-center gap-0.5">
                    <NavigationMenu viewport={false}>
                      <NavigationMenuList className="flex-none justify-start gap-4 border-0 bg-transparent p-0 lg:gap-6">
                        {HOME_NAV_ITEMS.map(({ label, id }) => (
                          <NavigationMenuItem key={id} value={id}>
                            <NavigationMenuLink asChild>
                              <Link
                                href={`/#${id}`}
                                onClick={(e) =>
                                  scrollToHomeSection(id, pathname, setHash, e)
                                }
                                className={cn(
                                  "block px-2.5 py-2 text-base font-medium transition-colors hover:bg-transparent! focus:bg-transparent! lg:px-3",
                                  isHomeSectionActive(id, pathname, hash)
                                    ? "text-gradient-blue"
                                    : "text-neutral-600 hover:text-neutral-900 dark:text-neutral-400 dark:hover:text-neutral-100",
                                )}
                              >
                                {label}
                              </Link>
                            </NavigationMenuLink>
                          </NavigationMenuItem>
                        ))}
                      </NavigationMenuList>
                    </NavigationMenu>
                  </nav>
                </div>

                {/* Desktop: Right pill - Blog + dark pill */}
                <div
                  className={cn(
                    pillBaseRight,
                    "flex items-center gap-2 overflow-hidden px-4 py-2 lg:gap-3 lg:px-4 ",
                  )}
                >
                  <Link
                    href="/blog"
                    className="relative text-[13px] mx-2 font-medium text-neutral-600 transition-colors hover:text-neutral-900 dark:text-neutral-400 dark:hover:text-neutral-100"
                  >
                    Blog
                    {/* <span
                      className="absolute -right-2 -top-1 size-1.5 rounded-full bg-blue-500"
                      aria-hidden
                    /> */}
                  </Link>
                  <span
                    className=" size-1 rounded-full bg-gray-300"
                    aria-hidden
                  />

                  {/* Let's chat + SplashCursor + theme toggle (cream outer, dark inner with icons inside) */}
                  <div className="rounded-full pill-outer-cream">
                    <div className="lets-chat-cream-wrapper">
                      <div className="lets-chat-inner flex items-center gap-0 rounded-full overflow-hidden">
                        <Link
                          href="mailto:kiyeggaronnie@gmail.com"
                          className={cn(
                            "flex items-center gap-1.5 whitespace-nowrap px-2.5 py-1.5 text-xs font-medium text-white transition-opacity hover:opacity-90 no-underline",
                            styleScript.className,
                          )}
                        >
                          <span className="size-1.5 shrink-0 rounded-full bg-teal-400" />
                          Let&apos;s chat
                          {/* <span style={{ color: "#00CFDE", fontSize: "14px" }}>
                            →
                          </span> */}
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
                          <WiStars
                            className={cn(
                              "size-3 shrink-0 pill-icon-gradient",
                              splashActive && "text-cyan-400",
                            )}
                          />
                        </button>
                        <div className="h-3.5 w-px shrink-0 bg-white/20" />
                        <div className="theme-toggle-outer shrink-0 pr-1.5">
                          <div className="theme-toggle-inner overflow-hidden flex items-center justify-center pill-icon-white">
                            <AnimatedThemeToggler className="size-3.5 shrink-0 overflow-hidden text-white [&>svg]:shrink-0 [&>svg]:max-w-full [&>svg]:max-h-full" />
                          </div>
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

const exploreSectionLinks = HOME_NAV_ITEMS.map(({ label, id }) => ({
  name: label,
  href: `/#${id}`,
  sectionId: id,
}));

const exploreLinks = [
  ...exploreSectionLinks,
  { name: "Blog", href: "/blog" as const, sectionId: null as null },
];

function MobileMenu({
  isOpen,
  onClose,
  splashActive,
  setSplashActive,
}: {
  isOpen: boolean;
  onClose: () => void;
  splashActive?: boolean;
  setSplashActive?: React.Dispatch<React.SetStateAction<boolean>>;
}) {
  const menuContent = (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          key="mobile-menu"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.2 }}
          className="fixed inset-0 z-9999 flex flex-col"
          role="dialog"
          aria-modal="true"
          aria-label="Mobile menu"
        >
          <div className="relative flex h-full w-full flex-col overflow-hidden">
            {/* Backdrop - matches reference: light overlay + blur */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.25 }}
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
              <motion.div
                initial={{ y: -24, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                exit={{ y: -12, opacity: 0 }}
                transition={{ duration: 0.35, ease: [0.25, 0.46, 0.45, 0.94] }}
                className="flex w-full shrink-0 items-center justify-between px-4 pt-4 pb-4"
              >
                <Link
                  href="/"
                  onClick={onClose}
                  className="shrink-0"
                  aria-label="Home"
                >
                  <Image
                    src="/images/branding/Ronnie_Logo.svg"
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
              </motion.div>

              {/* Scrollable middle: Explore + Our features */}
              <motion.div
                initial={{ y: -24, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                exit={{ y: -12, opacity: 0 }}
                transition={{
                  duration: 0.35,
                  delay: 0.08,
                  ease: [0.25, 0.46, 0.45, 0.94],
                }}
                className="flex min-h-0 flex-1 flex-col justify-center"
              >
                <div className="min-h-0 overflow-y-auto overflow-x-hidden px-8 pb-5">
                  <div className="flex w-full flex-col items-start gap-1">
                    <p className="mb-1 text-sm text-neutral-500 dark:text-neutral-400">
                      Explore
                    </p>
                    {exploreLinks.map((item) => (
                      <Link
                        key={item.name}
                        href={item.href}
                        onClick={(e) => {
                          if (
                            item.sectionId &&
                            typeof window !== "undefined" &&
                            window.location.pathname === "/"
                          ) {
                            e.preventDefault();
                            scrollToHomeSection(item.sectionId, "/", () => {});
                          }
                          onClose();
                        }}
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
                        background:
                          "linear-gradient(77deg, #3A07F2 10.26%, #0CD1CF 98.05%)",
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
              </motion.div>

              {/* Bottom: Blog + Let's chat pill (cream outer, dark inner, icons) */}
              <motion.div
                initial={{ y: -24, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                exit={{ y: -12, opacity: 0 }}
                transition={{
                  duration: 0.35,
                  delay: 0.16,
                  ease: [0.25, 0.46, 0.45, 0.94],
                }}
                className="flex h-24 flex-col"
              >
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
                  </div>
                  <div className="rounded-full pill-outer-cream">
                    <div className="lets-chat-cream-wrapper">
                      <div className="lets-chat-inner flex items-center gap-0 rounded-full overflow-hidden">
                        <Link
                          href="mailto:kiyeggaronnie@gmail.com"
                          onClick={onClose}
                          className={cn(
                            "flex items-center gap-1.5 whitespace-nowrap px-3 py-2 text-sm font-medium text-white transition-opacity hover:opacity-90 no-underline",
                            styleScript.className,
                          )}
                        >
                          <span className="size-1.5 shrink-0 rounded-full bg-teal-400" />
                          Let&apos;s chat
                          {/* <span style={{ color: "#00CFDE", fontSize: "14px" }}>
                            →
                          </span> */}
                        </Link>
                        <div className="h-4 w-px shrink-0 bg-white/20" />
                        {setSplashActive && (
                          <>
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
                              <WiStars
                                className={cn(
                                  "size-4 shrink-0 pill-icon-gradient",
                                  splashActive && "text-cyan-400",
                                )}
                              />
                            </button>
                            <div className="h-3 w-px shrink-0 bg-white/20" />
                          </>
                        )}
                        <div className="theme-toggle-outer shrink-0 pr-1.5">
                          <div className="theme-toggle-inner overflow-hidden flex items-center justify-center pill-icon-white">
                            <AnimatedThemeToggler className="size-3.5 shrink-0 overflow-hidden text-white [&>svg]:shrink-0 [&>svg]:max-w-full [&>svg]:max-h-full" />
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </motion.div>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );

  return typeof document !== "undefined"
    ? createPortal(menuContent, document.body)
    : null;
}
