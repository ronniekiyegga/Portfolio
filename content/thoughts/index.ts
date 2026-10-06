import { content as concurrentDatabaseConnections } from "./10000-concurrent-database-connections";
import { content as aggregateLogs } from "./aggregate-logs-10000-servers";
import { content as burstTraffic } from "./burst-traffic";
import { content as designSystemsRemoveDecisions } from "./design-systems-remove-decisions";
import { content as emptyStateFirst } from "./empty-state-first";
import { content as hicksLaw } from "./hicks-law";
import { content as idempotencyMatters } from "./idempotency-matters";
import { content as memoryInclusion } from "./memory-inclusion";
import { content as rateLimiter } from "./rate-limiter-1m-rps";
import { content as responsiveNotShrinking } from "./responsive-not-shrinking";
import { content as responsiveTenThousandRecords } from "./responsive-ten-thousand-records";
import { content as spacingInformationArchitecture } from "./spacing-information-architecture";
import { content as streamingWindows } from "./streaming-windows";
import type { ThoughtArticleContent } from "./types";
import { content as visualHierarchy } from "./visual-hierarchy";
import { content as whatTenThousandRowsMeans } from "./what-10000-rows-actually-means";

export type {
  ThoughtArticleBlock,
  ThoughtArticleContent,
  ThoughtArticleSection,
} from "./types";

export type ThoughtArticleEntry = {
  slug: string;
  content: ThoughtArticleContent;
};

/**
 * One entry per article — the single authoritative source of its body.
 * Kept as a list (not an object literal) so a duplicated slug stays visible
 * instead of silently overwriting an earlier definition.
 */
export const thoughtArticleEntries: readonly ThoughtArticleEntry[] = [
  { slug: "10000-concurrent-database-connections", content: concurrentDatabaseConnections },
  { slug: "aggregate-logs-10000-servers", content: aggregateLogs },
  { slug: "burst-traffic", content: burstTraffic },
  { slug: "design-systems-remove-decisions", content: designSystemsRemoveDecisions },
  { slug: "empty-state-first", content: emptyStateFirst },
  { slug: "hicks-law", content: hicksLaw },
  { slug: "idempotency-matters", content: idempotencyMatters },
  { slug: "memory-inclusion", content: memoryInclusion },
  { slug: "rate-limiter-1m-rps", content: rateLimiter },
  { slug: "responsive-not-shrinking", content: responsiveNotShrinking },
  { slug: "responsive-ten-thousand-records", content: responsiveTenThousandRecords },
  { slug: "spacing-information-architecture", content: spacingInformationArchitecture },
  { slug: "streaming-windows", content: streamingWindows },
  { slug: "visual-hierarchy", content: visualHierarchy },
  { slug: "what-10000-rows-actually-means", content: whatTenThousandRowsMeans },
];

export function indexThoughtArticles(
  entries: readonly ThoughtArticleEntry[],
): ReadonlyMap<string, ThoughtArticleContent> {
  const index = new Map<string, ThoughtArticleContent>();
  for (const { slug, content } of entries) {
    if (index.has(slug)) {
      throw new Error(`Duplicate thought article slug: "${slug}"`);
    }
    index.set(slug, content);
  }
  return index;
}

/** Fails at build time if two entries share a slug. */
export const thoughtArticleContent = indexThoughtArticles(thoughtArticleEntries);
