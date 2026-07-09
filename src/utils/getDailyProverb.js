import { proverbs } from "../data/proverbs.js";

export function getDailyProverb(date = new Date()) {
  const startOfYear = new Date(date.getFullYear(), 0, 0);
  const currentDate = new Date(
    date.getFullYear(),
    date.getMonth(),
    date.getDate(),
  );

  const diff = currentDate - startOfYear;
  const dayOfYear = Math.floor(diff / 86400000);

  return proverbs[(dayOfYear - 1) % proverbs.length];
}
