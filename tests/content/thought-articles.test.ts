import { createHash } from "node:crypto";

import { beforeEach, describe, expect, it, vi } from "vitest";

import ThoughtArticlePage, {
  generateMetadata,
  generateStaticParams,
} from "@/app/(home)/thoughts/[slug]/page";
import {
  getAllThoughtArticleSlugs,
  getRelatedThoughts,
  getThoughtArticle,
} from "@/app/(home)/_features/thoughts-index/thought-articles";
import { allThoughts } from "@/app/(home)/_features/thoughts-index/thoughts";
import {
  indexThoughtArticles,
  thoughtArticleEntries,
  type ThoughtArticleContent,
} from "@/content/thoughts";

import baseline from "./thought-articles.baseline.json";

const navigation = vi.hoisted(() => ({
  redirect: vi.fn((path: string) => {
    throw new Error(`NEXT_REDIRECT ${path}`);
  }),
  notFound: vi.fn(() => {
    throw new Error("NEXT_NOT_FOUND");
  }),
}));

vi.mock("next/navigation", () => navigation);

const params = (slug: string) => ({ params: Promise.resolve({ slug }) });

function canonical(value: unknown): unknown {
  if (Array.isArray(value)) return value.map(canonical);
  if (value && typeof value === "object") {
    return Object.fromEntries(
      Object.keys(value)
        .sort()
        .filter((key) => (value as Record<string, unknown>)[key] !== undefined)
        .map((key) => [key, canonical((value as Record<string, unknown>)[key])]),
    );
  }
  return value;
}

function contentHash(content: ThoughtArticleContent) {
  return createHash("sha256")
    .update(JSON.stringify(canonical(content)))
    .digest("hex");
}

describe("thought article content", () => {
  it("defines each slug exactly once at the source", () => {
    const slugs = thoughtArticleEntries.map((entry) => entry.slug);
    const duplicates = slugs.filter((slug, i) => slugs.indexOf(slug) !== i);

    expect(duplicates).toEqual([]);
  });

  it("refuses to index a duplicated slug instead of overwriting it", () => {
    const content: ThoughtArticleContent = { sections: [] };

    expect(() =>
      indexThoughtArticles([
        { slug: "same", content },
        { slug: "same", content },
      ]),
    ).toThrow('Duplicate thought article slug: "same"');
  });

  it("has content for every indexed thought, and no unreachable content", () => {
    const indexed = new Set(allThoughts.map((thought) => thought.slug));
    const authored = new Set(thoughtArticleEntries.map((entry) => entry.slug));

    expect([...indexed].filter((slug) => !authored.has(slug))).toEqual([]);
    expect([...authored].filter((slug) => !indexed.has(slug))).toEqual([]);
  });

  it("matches the captured baseline for every article", () => {
    const current = Object.fromEntries(
      getAllThoughtArticleSlugs().map(({ slug }) => {
        const article = getThoughtArticle(slug)!;
        return [
          slug,
          {
            sha256: contentHash({ lede: article.lede, sections: article.sections }),
            headings: article.sections.map((section) => section.heading),
          },
        ];
      }),
    );

    expect(current).toEqual(baseline);
  });
});

describe("getThoughtArticle", () => {
  it("combines index metadata with the authored body", () => {
    const article = getThoughtArticle("hicks-law");

    expect(article?.title).toBe(
      "Why more options can make a simple task feel harder",
    );
    expect(article?.authorName).toBe("Ronnie Kiyegga");
    expect(article?.sections.length).toBeGreaterThan(0);
  });

  it("returns undefined for an unknown slug", () => {
    expect(getThoughtArticle("does-not-exist")).toBeUndefined();
  });
});

describe("/thoughts/[slug] route", () => {
  beforeEach(() => {
    navigation.redirect.mockClear();
    navigation.notFound.mockClear();
  });

  it("prerenders every indexed article", () => {
    expect(generateStaticParams()).toEqual(
      allThoughts.map(({ slug }) => ({ slug })),
    );
  });

  it("redirects the retired debug-peak-traffic slug", async () => {
    await expect(
      ThoughtArticlePage(params("debug-peak-traffic")),
    ).rejects.toThrow("NEXT_REDIRECT");
    expect(navigation.redirect).toHaveBeenCalledWith(
      "/thoughts/responsive-ten-thousand-records",
    );
  });

  it("describes a redirected slug using its target article", async () => {
    const metadata = await generateMetadata(params("debug-peak-traffic"));

    expect(metadata.alternates?.canonical).toBe(
      "/thoughts/responsive-ten-thousand-records",
    );
  });

  it("responds with not found for an unknown slug", async () => {
    await expect(
      ThoughtArticlePage(params("does-not-exist")),
    ).rejects.toThrow("NEXT_NOT_FOUND");
    expect(navigation.notFound).toHaveBeenCalled();
  });
});

describe("getRelatedThoughts", () => {
  const slugs = getAllThoughtArticleSlugs().map(({ slug }) => slug);

  it("suggests three other, distinct, readable articles for every article", () => {
    for (const slug of slugs) {
      const related = getRelatedThoughts(slug).map((thought) => thought.slug);

      expect(related).toHaveLength(3);
      expect(related).not.toContain(slug);
      expect(new Set(related).size).toBe(3);
      related.forEach((other) => expect(getThoughtArticle(other)).toBeDefined());
    }
  });

  it("returns the same suggestions for the same article", () => {
    for (const slug of slugs) {
      expect(getRelatedThoughts(slug)).toEqual(getRelatedThoughts(slug));
    }
  });

  it("varies the suggestions between articles", () => {
    const sets = new Set(
      slugs.map((slug) =>
        getRelatedThoughts(slug)
          .map((thought) => thought.slug)
          .sort()
          .join(","),
      ),
    );

    expect(sets.size).toBeGreaterThan(slugs.length / 2);
  });
});
