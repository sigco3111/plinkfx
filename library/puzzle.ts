import { def } from "./def.ts";

// Puzzle and match-3: short, bright and tonal, so they can be pitched per step (play(s, { pitch })).

export default def("puzzle", {
  swap: ["두 타일 교환: 빠른 양방향 휙", {
    vary: 0.5,
    varyF: 2,
    layers: [
      { wave: "sine", freq: 600, to: 900, a: 0.002, d: 0.06, shape: -4, gain: 0.5 },
      { wave: "sine", freq: 900, to: 600, at: 0.05, a: 0.002, d: 0.06, shape: -4, gain: 0.5 },
      { wave: "noise", bp: 2500, bpTo: 4000, q: 1.5, a: 0.03, d: 0.06, shape: -3, gain: 0.25 },
    ],
  }],
  match: ["3매치: 밝고 유리 같은 팝", {
    vary: 0.3,
    verb: [0.25, 0.15],
    layers: [
      { wave: "sine", freq: 1047, fm: [2, 1.2, 0.05], arp: [0, 7, 12], arpRate: 0.035, a: 0.001, d: 0.25, shape: -4 },
      { wave: "noise", bp: 5000, q: 2, a: 0.001, d: 0.03, shape: -5, gain: 0.3 },
      { wave: "metal", freq: 3000, hp: 6000, at: 0.05, a: 0.002, d: 0.2, shape: -4, gain: 0.1 },
    ],
  }],
  "combo-chain": ["연쇄 콤보: 단계마다 조금씩 높게 (체인별 피치 조절)", {
    vary: 0.05,
    echo: [0.07, 0.3, 0.25],
    layers: [
      { wave: "triangle", freq: 784, arp: [0, 4, 7, 12], arpRate: 0.04, a: 0.002, h: 0.1, d: 0.25, shape: -3 },
      { wave: "sine", freq: 1568, fm: [3.5, 1.2, 0.1], arp: [0, 4, 7, 12], arpRate: 0.04, a: 0.002, h: 0.1, d: 0.25, shape: -3, gain: 0.35 },
    ],
  }],
  "line-clear": ["한 줄 지우기: 지퍼 스윕과 차임", {
    vary: 0.1,
    verb: [0.3, 0.15],
    layers: [
      { wave: "square", duty: 0.25, freq: 400, to: 1600, curve: 0.8, lp: 5000, a: 0.002, h: 0.12, d: 0.08, shape: 2, gain: 0.45 },
      { wave: "noise", bp: 2000, bpTo: 7000, q: 1.5, a: 0.01, d: 0.2, shape: -3, gain: 0.3 },
      { wave: "sine", freq: 2093, fm: [3.5, 1.5, 0.1], at: 0.18, a: 0.002, d: 0.45, shape: -4, gain: 0.45 },
    ],
  }],
  "piece-lock": ["떨어지는 조각이 제자리에 콱", {
    vary: 0.4,
    varyF: 1.5,
    varyG: 1,
    layers: [
      { wave: "noise", bp: 2500, q: 2, a: 0.001, d: 0.006, shape: -6, gain: 0.6 },
      { wave: "square", freq: 180, to: 110, lp: 900, a: 0.001, d: 0.06, shape: -5, drive: 1 },
      { wave: "sine", freq: 120, to: 70, a: 0.001, d: 0.08, shape: -5, gain: 0.6 },
      { wave: "brown", lp: 300, a: 0.002, d: 0.12, shape: -5, gain: 0.3 },
    ],
  }],
  merge: ["두 아이템이 더 큰 것으로 합체: 쿵과 반짝임", {
    vary: 0.4,
    verb: [0.3, 0.15],
    layers: [
      { wave: "sine", freq: 180, to: 520, curve: 2, a: 0.003, d: 0.12, shape: -4, drive: 0.5 },
      { wave: "pink", bp: 600, bpTo: 2400, q: 1.5, a: 0.02, d: 0.1, shape: -3, gain: 0.3 },
      { wave: "sine", freq: 1568, fm: [3.5, 1.3, 0.1], arp: [0, 7], arpRate: 0.05, at: 0.1, a: 0.002, d: 0.3, shape: -4, gain: 0.4 },
    ],
  }],
});
