// @vitest-environment jsdom
import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";

import { VisitorCount } from "./VisitorCount";

describe("VisitorCount", () => {
  it("formats the count with thousands separators", () => {
    render(<VisitorCount count={1204} />);

    expect(screen.getByText("1,204")).toBeTruthy();
    expect(screen.getByText(/visitors/)).toBeTruthy();
  });

  it("uses the singular for one visitor", () => {
    const { container } = render(<VisitorCount count={1} />);

    expect(container.textContent).toBe("1 visitor");
  });

  it("keeps the visitor status visible while the count is loading", () => {
    const { container } = render(<VisitorCount count={null} />);

    expect(container.textContent).toBe("… visitors");
    expect(screen.getByRole("status").getAttribute("aria-busy")).toBe("true");
  });

  it("marks the count as ticked only when asked", () => {
    const { container, rerender } = render(<VisitorCount count={5} />);
    const root = () => container.querySelector(".visitorCount");

    expect(root()?.hasAttribute("data-ticked")).toBe(false);

    rerender(<VisitorCount count={6} ticked />);

    expect(root()?.hasAttribute("data-ticked")).toBe(true);
  });
});
