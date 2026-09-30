/**
 * Standard Fisher-Yates (Knuth) Shuffle algorithm
 */
export function shuffle<T>(array: T[]): T[] {
  const copy = [...array];
  for (let i = copy.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [copy[i], copy[j]] = [copy[j], copy[i]];
  }
  return copy;
}

/**
 * Pick N random distinct elements from an array
 */
export function pickRandomDistinct<T>(array: T[], count: number): T[] {
  if (count <= 0) return [];
  if (count >= array.length) return shuffle(array);
  return shuffle(array).slice(0, count);
}

/**
 * Pick a random item from an array
 */
export function pickRandom<T>(array: T[]): T {
  const index = Math.floor(Math.random() * array.length);
  return array[index];
}
