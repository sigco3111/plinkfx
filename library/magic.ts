import { def } from "./def.ts";

const OO = [300, 870, 2240];

export default def("magic", {
  sparkle: ["반짝반짝 스파클", {
    echo: [0.11, 0.4, 0.35],
    layers: [
      { wave: "sine", freq: 2637, arp: [0, 7, 12, 19, 24, 19], arpRate: 0.035, a: 0.001, h: 0.18, d: 0.15, shape: 2, fm: [1.5, 0.6, 0.1] },
      { wave: "noise", hp: 7000, lp: 12000, a: 0.01, h: 0.15, d: 0.15, gain: 0.12 },
    ],
  }],
  "spell-cast": ["일반 주문: 부풀었다 방출", {
    verb: [0.55, 0.3],
    layers: [
      { wave: "saw", freq: 220, to: 440, lp: 400, lpTo: 5000, q: 3, a: 0.15, d: 0.35, shape: 2, vib: [6, 0.2] },
      { wave: "noise", bp: 1500, bpTo: 6000, q: 2, a: 0.15, d: 0.3, gain: 0.35 },
      { wave: "sine", freq: 1760, fm: [2, 1, 0.2], at: 0.15, a: 0.002, d: 0.5, shape: 3, gain: 0.3 },
    ],
  }],
  fireball: ["화염구 휘릭과 포효", {
    verb: [0.3, 0.15],
    layers: [
      { wave: "noise", bp: 700, bpTo: 2200, q: 0.8, a: 0.05, h: 0.1, d: 0.4, shape: 2, drive: 1.5 },
      { wave: "brown", lp: 600, a: 0.02, d: 0.5, gain: 0.8, drive: 1 },
      { wave: "crunch", freq: 180, hp: 2500, a: 0.05, d: 0.45, gain: 0.25 },
    ],
  }],
  ice: ["얼음 마법: 갈라짐과 유리 같은 울림", {
    verb: [0.5, 0.3],
    layers: [
      { wave: "noise", hp: 4000, a: 0.001, d: 0.04, gain: 0.6 },
      { wave: "sine", freq: 3520, fm: [1.41, 3, 0.15], a: 0.001, d: 0.6, shape: 3 },
      { wave: "sine", freq: 4699, fm: [1.73, 2, 0.1], at: 0.04, a: 0.001, d: 0.5, shape: 3, gain: 0.6 },
      { wave: "metal", freq: 3000, hp: 6000, a: 0.001, d: 0.3, shape: 3, gain: 0.2 },
    ],
  }],
  teleport: ["텔레포트: 빠르게 위로 떨림", {
    echo: [0.06, 0.4, 0.3],
    layers: [
      { wave: "sine", freq: 220, to: 2200, vib: [24, 2], a: 0.005, h: 0.15, d: 0.15, shape: 2 },
      { wave: "triangle", freq: 440, to: 4400, vib: [24, 2], a: 0.005, h: 0.15, d: 0.12, gain: 0.25 },
    ],
  }],
  portal: ["포탈 열림: 깊게 소용돌이치는 험", {
    verb: [0.6, 0.3],
    layers: [
      { wave: "saw", freq: 55, vib: [3, 0.6], lp: 200, lpTo: 1800, q: 5, a: 0.4, h: 0.4, d: 0.6, shape: 2 },
      { wave: "saw", freq: 55.8, vib: [3.3, 0.6], lp: 250, lpTo: 2200, q: 5, a: 0.4, h: 0.4, d: 0.6, shape: 2 },
      { wave: "sine", freq: 880, vib: [6, 1], a: 0.3, h: 0.4, d: 0.6, gain: 0.15 },
    ],
  }],
  lightning: ["번개 강타: 파열과 울림", {
    verb: [0.7, 0.3],
    layers: [
      { wave: "crunch", freq: 9000, hp: 2000, a: 0.001, d: 0.12, shape: 2 },
      { wave: "noise", hp: 1200, at: 0.03, a: 0.001, d: 0.2, shape: 3, gain: 0.7 },
      { wave: "brown", lp: 400, lpTo: 100, at: 0.05, a: 0.01, d: 1.4, shape: 2, gain: 1.5, drive: 1 },
    ],
  }],
  curse: ["어둠의 저주: 낮은 디튠 드론", {
    varyF: 1,
    verb: [0.6, 0.3],
    layers: [
      { wave: "saw", freq: 82, to: 70, vib: [4, 0.4], formant: OO, a: 0.1, h: 0.3, d: 0.6, shape: -3 },
      { wave: "saw", freq: 87, to: 74, vib: [4.4, 0.4], formant: [570, 840, 2410], a: 0.1, h: 0.3, d: 0.6, shape: -3, gain: 0.8 },
      { wave: "brown", lp: 200, a: 0.2, h: 0.3, d: 0.6, gain: 0.4 },
    ],
  }],
  enchant: ["아이템 인챈트: 이어지는 종소리", {
    verb: [0.6, 0.3],
    layers: [
      { wave: "sine", freq: 1319, fm: [3.5, 1.5, 0.15], arp: [0, 3, 7, 10, 14], arpRate: 0.07, a: 0.002, h: 0.28, d: 0.5, shape: 2.5 },
      { wave: "sine", freq: 659, arp: [0, 3, 7, 10, 14], arpRate: 0.07, a: 0.002, h: 0.28, d: 0.4, gain: 0.3 },
    ],
  }],
  dispel: ["디스펠: 사그라지는 반짝임", {
    verb: [0.5, 0.25],
    layers: [
      { wave: "noise", hp: 3000, hpTo: 800, a: 0.005, d: 0.45, shape: 2, gain: 0.5 },
      { wave: "sine", freq: 2400, to: 400, fm: [1.5, 2, 0.2], a: 0.005, d: 0.45, shape: 2 },
    ],
  }],
  summon: ["소환: 심연에서 치솟는 코드", {
    verb: [0.7, 0.3],
    layers: [
      { wave: "triangle", freq: 110, to: 220, a: 0.3, h: 0.2, d: 0.5, shape: 2 },
      { wave: "triangle", freq: 165, to: 330, a: 0.35, h: 0.2, d: 0.5, shape: 2, gain: 0.7 },
      { wave: "sine", freq: 880, fm: [2, 1, 0.3], at: 0.5, a: 0.002, d: 0.6, shape: 3, gain: 0.4 },
      { wave: "noise", bp: 300, bpTo: 3000, a: 0.4, d: 0.2, gain: 0.25 },
    ],
  }],
  "magic-missile": ["유도 마법 탄", {
    echo: [0.05, 0.3, 0.25],
    layers: [
      { wave: "sine", freq: 1700, to: 900, vib: [35, 1.5], a: 0.002, d: 0.22, shape: 2 },
      { wave: "noise", bp: 4000, q: 3, a: 0.002, d: 0.15, gain: 0.25 },
    ],
  }],
  harp: ["하프 글리산도 상승, 소원과 계시용", {
    vary: 0.05,
    verb: [0.6, 0.3],
    layers: [0, 2, 4, 7, 9, 12, 14, 16].map((st, i) => ({ wave: "pluck" as const, freq: 392 * 2 ** (st / 12), at: i * 0.055, a: 0.001, d: 1.1, shape: -3, damp: 0.999, blend: 0.47, lp: 4000, gain: 0.8 })),
  }],
});
