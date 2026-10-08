import { type RefObject, useLayoutEffect, useState } from "react";

function offsetWithin(element: HTMLElement, container: HTMLElement) {
  let offset = 0;
  let node: HTMLElement | null = element;
  while (node && node !== container) {
    offset += node.offsetTop;
    node = node.offsetParent as HTMLElement | null;
  }
  return offset;
}

export function useActiveItemCenter(
  containerRef: RefObject<HTMLElement | null>,
  activeSelector: string,
  activeKey: unknown,
) {
  const [center, setCenter] = useState<number | null>(null);

  useLayoutEffect(() => {
    const container = containerRef.current;
    const active = container?.querySelector<HTMLElement>(activeSelector);
    if (!container || !active) return;

    setCenter(offsetWithin(active, container) + active.offsetHeight / 2);
  }, [containerRef, activeSelector, activeKey]);

  return center;
}
