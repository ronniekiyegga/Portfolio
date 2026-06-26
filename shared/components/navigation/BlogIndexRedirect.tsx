"use client";

import { useEffect } from "react";
import { HOME_BLOG_SECTION_HREF } from "@/lib/home-nav";

/** Sends visitors to Engineering Notes on the homepage (blog index is not public yet). */
export function BlogIndexRedirect() {
  useEffect(() => {
    window.location.replace(HOME_BLOG_SECTION_HREF);
  }, []);

  return null;
}
