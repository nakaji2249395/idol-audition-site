/** Apply only to an already eligible inventory; never add a non-matching listing. */
export function compareAuditionPriority(left: { slug: string }, right: { slug: string }) {
  const slug = "hiraeth-tokyo-new-member";
  return Number(right.slug === slug) - Number(left.slug === slug);
}

export function prioritizeAuditions<T extends { slug: string }>(items: T[]): T[] {
  return [...items].sort(compareAuditionPriority);
}
