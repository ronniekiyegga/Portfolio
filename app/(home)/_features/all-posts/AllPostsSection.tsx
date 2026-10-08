import Link from "next/link";

import { formatMonthDayYear } from "@/lib/format-date";

import { ThoughtTags } from "../thoughts-index/ThoughtTags";
import { listedThoughts } from "../thoughts-index/thoughts";

export function AllPostsSection() {
  return (
    <section
      className="allPosts"
      aria-labelledby="all-posts-heading"
      id="all-posts"
    >
      <h2 id="all-posts-heading">All posts</h2>
      <ul className="allPostsList">
        {listedThoughts.map((post) => (
          <li key={post.slug}>
            <Link className="allPostsItem" href={post.href}>
              <span className="allPostsCopy">
                <span className="allPostsTitle">{post.title}</span>
                <ThoughtTags thought={post} className="allPostsTags" />
              </span>
              <time className="allPostsDate" dateTime={post.dateTime}>
                {formatMonthDayYear(post.dateTime)}
              </time>
            </Link>
          </li>
        ))}
      </ul>
    </section>
  );
}
