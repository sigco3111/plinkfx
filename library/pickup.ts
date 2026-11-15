import { def } from "./def.ts";

export default def("pickup", {
  coin: ["고전 두 음 코인, 살짝 반짝임 포함", {
    verb: [0.2, 0.12],
    layers: [
      { wave: "square", duty: 0.25, freq: 988, arp: [0, 5], arpRate: 0.07, a: 0.001, h: 0.05, d: 0.3, shape: 2.5, lp: 7000 },
      { wave: "sine", freq: 1976, arp: [0, 5], arpRate: 0.07, a: 0.001, d: 0.22, shape: 3, gain: 0.5 },
    ],
  }],
  "coin-soft": ["아늑한 게임용 둥근 코인", {
    verb: [0.25, 0.15],
    layers: [
      { wave: "triangle", freq: 1175, arp: [0, 5], arpRate: 0.065, a: 0.002, h: 0.04, d: 0.3, shape: 2.5 },
      { wave: "sine", freq: 2350, fm: [2, 0.7, 0.05], arp: [0, 5], arpRate: 0.065, a: 0.002, d: 0.25, shape: 3, gain: 0.35 },
    ],
  }],
  "coin-double": ["빠르게 연속 두 코인", {
    verb: [0.2, 0.12],
    layers: [
      { wave: "square", duty: 0.25, freq: 988, arp: [0, 5], arpRate: 0.05, a: 0.001, d: 0.1, shape: 2, lp: 7000 },
      { wave: "square", duty: 0.25, freq: 1175, arp: [0, 5], arpRate: 0.05, at: 0.1, a: 0.001, h: 0.04, d: 0.28, shape: 2.5, lp: 7000 },
      { wave: "sine", freq: 2350, arp: [0, 5], arpRate: 0.05, at: 0.1, a: 0.001, d: 0.2, shape: 3, gain: 0.4 },
    ],
  }],
  "coin-bag": ["한 움큼의 동전, 소소한 상금", {
    vary: 0.6, varyG: 3,
    verb: [0.25, 0.15],
    layers: [
      ...[0, 0.05, 0.09, 0.15, 0.19, 0.26].map((at, i) => ({ wave: "modal" as const, freq: [2600, 3100, 2800, 3500, 2950, 3300][i], modes: [1, 1.73, 2.33, 3.91], at, a: 0.001, d: [0.16, 0.18, 0.2, 0.22, 0.24, 0.26][i], shape: -5, gain: 0.8 - i * 0.06 })),
      { wave: "pink", bp: 1500, q: 1, a: 0.01, d: 0.3, shape: -4, gain: 0.3 },
      { wave: "pink", lp: 600, a: 0.002, d: 0.06, shape: -5, drive: 1, gain: 0.5 },
    ],
  }],
  gem: ["보석과 크리스탈용 유리 같은 벨", {
    verb: [0.45, 0.25],
    layers: [
      { wave: "sine", freq: 2093, fm: [3.01, 2.2, 0.08], a: 0.001, d: 0.5, shape: 3 },
      { wave: "sine", freq: 3136, fm: [2.01, 1.5, 0.06], at: 0.07, a: 0.001, d: 0.55, shape: 3, gain: 0.7 },
      { wave: "sine", freq: 4186, at: 0.12, a: 0.001, d: 0.3, shape: 3, gain: 0.25 },
    ],
  }],
  pickup: ["일반 아이템 줍기, 빠르게 올라가는 음", {
    layers: [
      { wave: "square", duty: 0.5, freq: 523, arp: [0, 4, 7, 12], arpRate: 0.032, a: 0.001, h: 0.06, d: 0.1, shape: 2, lp: 4500 },
      { wave: "triangle", freq: 1046, arp: [0, 4, 7, 12], arpRate: 0.032, a: 0.001, h: 0.06, d: 0.1, gain: 0.5 },
    ],
  }],
  "pickup-soft": ["부드러운 팝-차임 줍기", {
    verb: [0.2, 0.12],
    layers: [
      { wave: "sine", freq: 420, to: 1100, curve: 3, sweep: 0.04, a: 0.001, d: 0.06, shape: 3 },
      { wave: "sine", freq: 1568, fm: [2, 0.6, 0.05], at: 0.035, a: 0.001, d: 0.22, shape: 3, gain: 0.6 },
    ],
  }],
  "pickup-item": ["아이템 줍기: 짧게 올라가는 슬라이드", {
    layers: [
      { wave: "square", duty: 0.25, freq: 330, to: 990, curve: 2, a: 0.001, h: 0.02, d: 0.12, shape: 2, lp: 5000 },
      { wave: "sine", freq: 165, to: 495, curve: 2, a: 0.001, d: 0.1, gain: 0.4 },
    ],
  }],
  key: ["열쇠 줍기: 금속 징글과 차임", {
    verb: [0.3, 0.15],
    layers: [
      { wave: "modal", freq: 2400, modes: [1, 2.76, 5.4], a: 0.001, d: 0.09, shape: -5, gain: 0.45 },
      { wave: "modal", freq: 2850, modes: [1, 2.76, 5.4], at: 0.06, a: 0.001, d: 0.12, shape: -5, gain: 0.35 },
      { wave: "noise", hp: 4000, lp: 10000, a: 0.001, d: 0.01, shape: -6, gain: 0.2 },
      { wave: "triangle", freq: 1319, arp: [0, 7, 12], arpRate: 0.06, at: 0.04, a: 0.002, d: 0.3, shape: 2.5, gain: 0.7 },
    ],
  }],
  heart: ["체력 회복 아이템, 따뜻하고 다정함", {
    verb: [0.3, 0.15],
    layers: [
      { wave: "triangle", freq: 523, arp: [0, 4, 7, 12], arpRate: 0.06, a: 0.003, h: 0.1, d: 0.25, shape: 2, vib: [6, 0.15] },
      { wave: "sine", freq: 1046, arp: [0, 4, 7, 12], arpRate: 0.06, a: 0.003, h: 0.1, d: 0.2, gain: 0.35 },
    ],
  }],
  ammo: ["탄약이나 클립 줍기: 금속 달각", {
    layers: [
      { wave: "noise", bp: 2500, q: 1.2, a: 0.001, d: 0.02, shape: 3, drive: 2, gain: 0.7 },
      { wave: "metal", freq: 700, bp: 2800, q: 2, a: 0.001, d: 0.07, shape: 3, drive: 1 },
      { wave: "sine", freq: 260, to: 150, a: 0.001, d: 0.06, shape: 2.5, drive: 1, gain: 0.7 },
      { wave: "noise", bp: 1800, q: 1.2, at: 0.07, a: 0.001, d: 0.02, shape: 3, drive: 2, gain: 0.7 },
      { wave: "metal", freq: 560, bp: 2200, q: 2, at: 0.07, a: 0.001, d: 0.1, shape: 3, drive: 1 },
      { wave: "sine", freq: 200, to: 110, at: 0.07, a: 0.001, d: 0.09, shape: 2.5, drive: 1, gain: 0.9 },
    ],
  }],
  "ka-ching": ["상점과 구매용 계산대 소리", {
    verb: [0.25, 0.12],
    layers: [
      { wave: "noise", bp: 3000, q: 1, a: 0.001, d: 0.05, gain: 0.5 },
      { wave: "metal", freq: 520, bp: 2400, q: 2, a: 0.001, d: 0.08, gain: 0.5 },
      { wave: "sine", freq: 2637, fm: [2.76, 3, 0.15], at: 0.07, a: 0.001, d: 0.7, shape: 2.5 },
      { wave: "sine", freq: 3951, fm: [2.76, 2, 0.1], at: 0.07, a: 0.001, d: 0.5, shape: 3, gain: 0.5 },
    ],
  }],
  "xp-orb": ["경험치 구슬, 작고 밝음", {
    vary: 2,
    echo: [0.07, 0.3, 0.25],
    layers: [{ wave: "sine", freq: 1250, to: 2500, curve: 2, sweep: 0.04, a: 0.001, d: 0.09, shape: 3 }],
  }],
  star: ["별 줍기: 반짝이며 치솟는 런", {
    echo: [0.09, 0.35, 0.3],
    layers: [
      { wave: "triangle", freq: 1047, arp: [0, 4, 7, 12, 16, 19, 24], arpRate: 0.03, a: 0.001, h: 0.18, d: 0.2, shape: 2 },
      { wave: "sine", freq: 2093, arp: [0, 4, 7, 12, 16, 19, 24], arpRate: 0.03, a: 0.001, h: 0.18, d: 0.15, gain: 0.3 },
    ],
  }],
  ring: ["빠른 링 줍기, 밝은 두 음 차임", {
    verb: [0.3, 0.2],
    layers: [
      { wave: "square", duty: 0.5, freq: 1568, arp: [0, 4], arpRate: 0.045, a: 0.001, h: 0.04, d: 0.4, shape: 3, lp: 6000, gain: 0.6 },
      { wave: "sine", freq: 3136, arp: [0, 4], arpRate: 0.045, fm: [1.5, 0.7, 0.1], a: 0.001, d: 0.45, shape: 3, gain: 0.7 },
    ],
  }],
  "potion-drink": ["포션 마시기: 꿀꺽 세 번과 반짝이는 한숨", {
    vary: 0.6,
    layers: [
      ...[0, 0.14, 0.28].map((at, i) => ({ wave: "sine" as const, freq: 260 - i * 20, to: 520, curve: 3, vib: [30, 1] as [number, number], at, a: 0.005, d: 0.09, shape: -3, lp: 1200, gain: 0.8 })),
      { wave: "noise", lp: 1000, a: 0.01, h: 0.35, d: 0.1, gain: 0.08 },
      { wave: "sine", freq: 2093, fm: [3.5, 1.5, 0.1], arp: [0, 4, 7], arpRate: 0.05, at: 0.42, a: 0.002, d: 0.3, shape: -4, gain: 0.25 },
    ],
  }],
  eat: ["음식 먹기: 바삭한 두 입", {
    vary: 0.8,
    varyF: 2,
    varyG: 2,
    layers: [0, 0.18].flatMap((at) => [
      { wave: "crunch" as const, freq: 5000, bp: 2500, q: 0.8, at, a: 0.002, d: 0.08, shape: -3, drive: 1 },
      { wave: "pink" as const, lp: 900, at, a: 0.002, d: 0.06, shape: -4, gain: 0.5 },
      ...[0.02, 0.045].map((o) => ({ wave: "noise" as const, bp: 3500, q: 2, at: at + o, a: 0.001, d: 0.01, shape: -5, gain: 0.4 })),
    ]),
  }],
  "loot-rare": ["레어 전리품 드롭: 반짝이는 빔과 코드", {
    vary: 0.05,
    verb: [0.5, 0.25],
    echo: [0.1, 0.3, 0.2],
    layers: [
      { wave: "saw", freq: 220, to: 880, curve: 0.8, bp: 1000, bpTo: 5000, q: 4, a: 0.2, d: 0.2, shape: -3, gain: 0.3 },
      { wave: "sine", freq: 1319, fm: [3.5, 1.6, 0.15], at: 0.25, a: 0.002, h: 0.1, d: 0.8, shape: -3 },
      { wave: "sine", freq: 1661, fm: [3.5, 1.6, 0.15], at: 0.25, a: 0.002, h: 0.1, d: 0.8, shape: -3, gain: 0.7 },
      { wave: "sine", freq: 1976, fm: [3.5, 1.6, 0.15], at: 0.25, a: 0.002, h: 0.1, d: 0.8, shape: -3, gain: 0.6 },
      { wave: "metal", freq: 4000, hp: 7000, at: 0.25, a: 0.01, d: 0.6, shape: -3, gain: 0.1 },
    ],
  }],
  equip: ["장비 착용: 가죽과 버클", {
    vary: 0.6,
    varyF: 2,
    varyG: 1.5,
    layers: [
      { wave: "pink", bp: 1800, q: 1, a: 0.02, d: 0.12, shape: -3, gain: 0.9 },
      { wave: "metal", freq: 1100, hp: 2500, lp: 7000, at: 0.08, a: 0.001, d: 0.06, shape: -5, gain: 0.5 },
      { wave: "metal", freq: 1350, hp: 2500, lp: 7000, at: 0.13, a: 0.001, d: 0.08, shape: -5, gain: 0.4 },
      { wave: "noise", bp: 900, q: 1.5, at: 0.08, a: 0.001, d: 0.03, shape: -5, gain: 0.4 },
    ],
  }],
});
