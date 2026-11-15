import type { Sound } from "../src/core/types.ts";

/** One sound in the catalogue, as authored. `scripts/bake.ts` turns these into src/sounds.gen.ts. */
export interface Entry {
  /** kebab-case, unique, becomes the camelCase export (coin-double -> coinDouble) */
  name: string;
  cat: Category;
  /** One short line, shown in the gallery. */
  desc: string;
  sound: Sound;
}

/** `target` is the loudness every sound in the category is normalised to (max momentary LUFS). */
export const CATEGORIES = {
  ui: { title: "UI", target: -20 },
  pickup: { title: "수집", target: -16 },
  jump: { title: "점프·착지", target: -16 },
  hit: { title: "타격", target: -15 },
  explosion: { title: "폭발", target: -14 },
  powerup: { title: "파워업", target: -16 },
  shoot: { title: "총격·레이저", target: -16 },
  footstep: { title: "발소리", target: -20 },
  magic: { title: "마법", target: -16 },
  alert: { title: "경보", target: -18 },
  jingle: { title: "징글", target: -17 },
  mechanic: { title: "문·기계", target: -17 },
  world: { title: "월드", target: -17 },
  creature: { title: "크리처", target: -17 },
  nature: { title: "자연", target: -18 },
  card: { title: "카드·카지노", target: -18 },
  vehicle: { title: "탈것", target: -16 },
  horror: { title: "호러", target: -17 },
  farm: { title: "농장·제작", target: -17 },
  scifi: { title: "SF·기술", target: -18 },
  puzzle: { title: "퍼즐", target: -17 },
} as const;
export type Category = keyof typeof CATEGORIES;

/** Keeps category files terse: def("ui", { click: ["desc", sound] }) */
export const def = (cat: Category, sounds: Record<string, [string, Sound]>): Entry[] =>
  Object.entries(sounds).map(([name, [desc, sound]]) => ({ name, cat, desc, sound }));
