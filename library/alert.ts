import { def } from "./def.ts";

export default def("alert", {
  alarm: ["두 음 경보, 반복해도 자연스럽게 이어짐", {
    vary: 0.1,
    layers: [{ wave: "square", duty: 0.5, freq: 880, arp: [0, -5], arpRate: 0.16, loop: true, a: 0.005, h: 0.6, d: 0.02, shape: 1, lp: 3500 }],
  }],
  beep: ["단순한 비프음", {
    vary: 0.1,
    layers: [{ wave: "sine", freq: 1000, a: 0.004, h: 0.08, d: 0.03, shape: 1 }],
  }],
  warning: ["경고: 급박한 세 번의 펄스", {
    vary: 0.1,
    layers: [0, 0.14, 0.28].map((at) => ({ wave: "saw" as const, freq: 440, at, a: 0.003, h: 0.07, d: 0.03, shape: 1, lp: 2400 })),
  }],
  "low-health": ["체력 부족: 부드러운 두 번의 비프", {
    vary: 0.1,
    layers: [
      { wave: "triangle", freq: 880, a: 0.003, h: 0.06, d: 0.04, shape: 1 },
      { wave: "triangle", freq: 880, at: 0.16, a: 0.003, h: 0.06, d: 0.04, shape: 1 },
    ],
  }],
  heartbeat: ["심장 박동: 두근두근", {
    vary: 0.3, varyG: 1,
    layers: [
      { wave: "sine", freq: 70, to: 45, a: 0.004, d: 0.12, shape: 2, drive: 0.5 },
      { wave: "pink", bp: 380, q: 1.2, a: 0.003, d: 0.05, shape: -5, drive: 2, gain: 0.8 },
      { wave: "triangle", freq: 140, to: 90, a: 0.004, d: 0.07, shape: 2.5, gain: 0.35 },
      { wave: "sine", freq: 60, to: 40, at: 0.2, a: 0.004, d: 0.14, shape: 2, gain: 0.7 },
      { wave: "pink", bp: 320, q: 1.2, at: 0.2, a: 0.003, d: 0.06, shape: -5, drive: 2, gain: 0.55 },
      { wave: "triangle", freq: 120, to: 80, at: 0.2, a: 0.004, d: 0.08, shape: 2.5, gain: 0.25 },
    ],
  }],
  countdown: ["카운트다운 틱: 3, 2, 1", {
    vary: 0.05,
    layers: [{ wave: "sine", freq: 880, fm: [2, 0.6, 0.05], a: 0.002, h: 0.05, d: 0.12, shape: 2 }],
  }],
  "countdown-go": ["카운트다운 종료: 출발!", {
    vary: 0.05,
    layers: [
      { wave: "sine", freq: 1760, fm: [2, 0.6, 0.1], a: 0.002, h: 0.25, d: 0.25, shape: 2 },
      { wave: "square", duty: 0.25, freq: 880, a: 0.002, h: 0.25, d: 0.2, lp: 3000, gain: 0.25 },
    ],
  }],
  siren: ["사이렌 스윕", {
    vary: 0.1,
    layers: [{ wave: "saw", freq: 700, vib: [1.6, 5], a: 0.05, h: 1.1, d: 0.15, shape: 1, lp: 3000 }],
  }],
  "radar-ping": ["소나 핑", {
    vary: 0.1,
    echo: [0.32, 0.4, 0.35],
    verb: [0.4, 0.2],
    layers: [{ wave: "sine", freq: 1500, a: 0.002, d: 0.35, shape: 3 }],
  }],
  "quest-new": ["새 퀘스트 또는 목표", {
    verb: [0.45, 0.25],
    layers: [
      { wave: "triangle", freq: 587, arp: [0, 5, 7], arpRate: 0.11, a: 0.003, h: 0.3, d: 0.3, shape: 2 },
      { wave: "sine", freq: 1175, fm: [2, 0.7, 0.2], arp: [0, 5, 7], arpRate: 0.11, a: 0.003, h: 0.3, d: 0.3, gain: 0.35 },
    ],
  }],
  "buzzer-wrong": ["퀴즈쇼 오답 버저", {
    vary: 0.05,
    layers: [
      { wave: "saw", freq: 110, a: 0.005, h: 0.45, d: 0.08, shape: 1, lp: 2000, drive: 1.5 },
      { wave: "square", freq: 111.5, a: 0.005, h: 0.45, d: 0.08, shape: 1, lp: 1200, gain: 0.6 },
    ],
  }],
  "ding-correct": ["퀴즈쇼 정답 딩동", {
    vary: 0.05,
    verb: [0.3, 0.18],
    layers: [0, 0.16].map((at) => ({ wave: "sine" as const, freq: 1760, fm: [3.5, 1.4, 0.1], at, a: 0.002, d: 0.5, shape: -4 })),
  }],
  "timer-done": ["주방 타이머 종료: 빠른 종소리 트릴", {
    vary: 0.05,
    layers: [
      ...Array.from({ length: 10 }, (_, i) => ({ wave: "metal" as const, freq: 2600, bp: 3500, q: 2, at: i * 0.05, a: 0.001, d: 0.045, shape: -4, gain: 0.6 })),
      { wave: "sine" as const, freq: 3500, a: 0.002, h: 0.45, d: 0.1, gain: 0.15 },
    ],
  }],
});
