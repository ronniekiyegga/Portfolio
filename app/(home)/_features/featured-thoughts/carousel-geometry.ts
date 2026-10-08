export type ThoughtCardElement = HTMLElement & {
  dataset: DOMStringMap & {
    thoughtIndex?: string;
    copyIndex?: string;
  };
};

function getThoughtCards(track: HTMLDivElement) {
  return Array.from(
    track.querySelectorAll<ThoughtCardElement>("[data-thought-index]"),
  );
}

export function getClosestThoughtCard(track: HTMLDivElement) {
  return getClosestThoughtCardAt(track, track.scrollLeft);
}

export function getClosestThoughtCardAt(
  track: HTMLDivElement,
  scrollLeft: number,
) {
  const center = scrollLeft + track.clientWidth / 2;

  return getThoughtCards(track).reduce<{
    card: ThoughtCardElement | null;
    distance: number;
  }>(
    (best, card) => {
      const distance = Math.abs(
        card.offsetLeft + card.offsetWidth / 2 - center,
      );
      return distance < best.distance ? { card, distance } : best;
    },
    { card: null, distance: Number.POSITIVE_INFINITY },
  ).card;
}

export function getCenteredScrollLeft(
  track: HTMLDivElement,
  card: ThoughtCardElement,
) {
  return card.offsetLeft - (track.clientWidth - card.offsetWidth) / 2;
}

export function projectVelocity(velocity: number, decelerationRate = 0.99) {
  return ((velocity / 1000) * decelerationRate) / (1 - decelerationRate);
}
