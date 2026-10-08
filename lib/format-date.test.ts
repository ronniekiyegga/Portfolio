import { describe, expect, it } from "vitest";

import { formatDayMonthYear, formatMonthDayYear } from "./format-date";

describe("thought date formats", () => {
  it("formats day first with the short British month", () => {
    expect(formatDayMonthYear("2026-09-24")).toBe("24 Sept 2026");
    expect(formatDayMonthYear("2026-06-09")).toBe("9 Jun 2026");
  });

  it("formats month first without a leading zero", () => {
    expect(formatMonthDayYear("2026-09-08")).toBe("Sept 8 2026");
    expect(formatMonthDayYear("2026-04-30")).toBe("Apr 30 2026");
  });

  it("does not shift the day across time zones", () => {
    expect(formatDayMonthYear("2026-01-01")).toBe("1 Jan 2026");
    expect(formatMonthDayYear("2026-12-31")).toBe("Dec 31 2026");
  });
});
