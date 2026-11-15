import { def } from "./def.ts";

export default def("ui", {
  click: ["중립적인 버튼 클릭", {
    vary: 0.6, varyF: 1, varyG: 1,
    layers: [
      { wave: "noise", bp: 3500, q: 3, a: 0.001, d: 0.006, shape: -6, gain: 0.7 },
      { wave: "sine", freq: 1900, to: 900, a: 0.001, d: 0.07, shape: -4, drive: 1 },
      { wave: "modal", freq: 1400, modes: [1, 2.3], a: 0.001, d: 0.06, shape: -4, gain: 0.6 },
      { wave: "noise", bp: 2500, q: 5, at: 0.03, a: 0.001, d: 0.006, shape: -6, gain: 0.5 },
    ],
  }],
  "click-soft": ["목록과 탭용 둥글고 조용한 클릭", {
    varyF: 1,
    varyG: 1,
    layers: [
      { wave: "noise", bp: 2800, q: 3, a: 0.001, d: 0.004, shape: -6, gain: 0.6 },
      { wave: "triangle", freq: 880, to: 560, a: 0.002, d: 0.05, shape: -4, lp: 3200, gain: 0.7 },
      { wave: "pink", bp: 2000, q: 4, at: 0.014, a: 0.001, d: 0.006, shape: -6, gain: 0.35 },
    ],
  }],
  "click-hard": ["확실한 기계식 클릭", {
    layers: [
      { wave: "sine", freq: 2400, to: 1100, a: 0.001, h: 0.004, d: 0.018, shape: 4, drive: 3 },
      { wave: "noise", bp: 3500, q: 1.5, a: 0.001, d: 0.008, shape: 3, drive: 2, gain: 0.5 },
      { wave: "sine", freq: 420, to: 260, at: 0.002, a: 0.001, d: 0.035, shape: 3, drive: 1, gain: 0.5 },
    ],
  }],
  tap: ["모바일에 좋은 통통 튀는 탭", {
    layers: [{ wave: "sine", freq: 520, to: 260, a: 0.001, d: 0.06, shape: 4, curve: 2 }],
  }],
  hover: ["커서가 버튼에 올라갈 때 희미한 틱", {
    vary: 0.8,
    layers: [{ wave: "sine", freq: 2600, a: 0.001, d: 0.025, shape: 3, hp: 1200 }],
  }],
  "toggle-on": ["스위치 켜기: 올라가는 두 음", {
    layers: [
      { wave: "triangle", freq: 660, arp: [0, 7], arpRate: 0.045, a: 0.002, d: 0.11, shape: 2.5 },
      { wave: "sine", freq: 1320, arp: [0, 7], arpRate: 0.045, a: 0.002, d: 0.08, shape: 3, gain: 0.3 },
    ],
  }],
  "toggle-off": ["스위치 끄기: 내려가는 두 음", {
    layers: [
      { wave: "triangle", freq: 990, arp: [0, -7], arpRate: 0.045, a: 0.002, d: 0.11, shape: 2.5 },
      { wave: "sine", freq: 1980, arp: [0, -7], arpRate: 0.045, a: 0.002, d: 0.08, shape: 3, gain: 0.3 },
    ],
  }],
  confirm: ["밝은 장조 아르페지오, '확인'", {
    verb: [0.2, 0.15],
    layers: [
      { wave: "triangle", freq: 784, arp: [0, 4, 7], arpRate: 0.05, a: 0.002, h: 0.02, d: 0.22, shape: 2 },
      { wave: "sine", freq: 1568, arp: [0, 4, 7], arpRate: 0.05, a: 0.002, d: 0.2, shape: 2.5, gain: 0.35 },
    ],
  }],
  cancel: ["부드럽게 내려가는 '뒤로'", {
    layers: [
      { wave: "square", duty: 0.4, freq: 520, to: 330, a: 0.002, d: 0.13, shape: 2, lp: 1800 },
      { wave: "sine", freq: 260, to: 165, a: 0.002, d: 0.12, gain: 0.5 },
    ],
  }],
  error: ["낮은 버즈 두 번, '허용 안 됨'", {
    vary: 0.2,
    layers: [
      { wave: "saw", freq: 155, a: 0.003, h: 0.05, d: 0.04, shape: 1.5, lp: 1300, drive: 0.6 },
      { wave: "saw", freq: 155, at: 0.13, a: 0.003, h: 0.06, d: 0.06, shape: 1.5, lp: 1300, drive: 0.6 },
      { wave: "square", freq: 77.5, a: 0.003, h: 0.17, d: 0.08, lp: 500, gain: 0.5 },
    ],
  }],
  deny: ["비활성 버튼용 짧고 묵직한 쿵", {
    layers: [
      { wave: "square", freq: 120, to: 90, a: 0.002, d: 0.12, lp: 700, drive: 1 },
      { wave: "noise", lp: 1500, a: 0.001, d: 0.03, gain: 0.3 },
    ],
  }],
  notify: ["두 음 벨 알림", {
    verb: [0.3, 0.2],
    layers: [
      { wave: "sine", freq: 1319, fm: [3.5, 1.6, 0.12], a: 0.002, d: 0.45, shape: 2.5 },
      { wave: "sine", freq: 1760, fm: [3.5, 1.6, 0.12], at: 0.1, a: 0.002, d: 0.6, shape: 2.5 },
    ],
  }],
  pop: ["무언가 나타날 때 위로 팝", {
    layers: [{ wave: "sine", freq: 380, to: 1250, curve: 3, a: 0.002, d: 0.07, shape: 3 }],
  }],
  "pop-down": ["무언가 사라질 때 아래로 팝", {
    layers: [{ wave: "sine", freq: 1100, to: 330, curve: 3, a: 0.002, d: 0.08, shape: 3 }],
  }],
  swipe: ["페이지 사이 빠른 바람 스와이프", {
    layers: [
      { wave: "noise", bp: 1400, bpTo: 5200, q: 1.4, a: 0.04, d: 0.1, shape: 2 },
      { wave: "pink", bp: 700, bpTo: 2000, a: 0.04, d: 0.08, gain: 0.5 },
    ],
  }],
  type: ["글자가 타이핑될 때 키보드 틱", {
    vary: 1.5,
    layers: [
      { wave: "noise", bp: 3000, q: 1.5, a: 0.001, h: 0.004, d: 0.012, shape: 3, drive: 4 },
      { wave: "sine", freq: 520, to: 300, at: 0.002, a: 0.001, d: 0.03, shape: 3, drive: 1, gain: 0.5 },
      { wave: "noise", bp: 4500, q: 2, at: 0.02, a: 0.001, d: 0.008, gain: 0.25 },
    ],
  }],
  tick: ["슬라이더와 스크롤 단계용 작은 틱", {
    vary: 1, varyF: 1,
    layers: [
      { wave: "noise", bp: 4500, q: 2, a: 0.001, d: 0.004, shape: -6, gain: 0.6 },
      { wave: "sine", freq: 3200, a: 0.001, d: 0.035, shape: -6, drive: 1 },
    ],
  }],
  "menu-open": ["메뉴나 패널이 열림", {
    layers: [
      { wave: "triangle", freq: 330, to: 880, a: 0.004, d: 0.12, shape: 2, lp: 3000 },
      { wave: "noise", bp: 2500, bpTo: 5000, a: 0.03, d: 0.06, gain: 0.25 },
    ],
  }],
  "menu-close": ["메뉴나 패널이 닫힘", {
    layers: [
      { wave: "triangle", freq: 880, to: 330, a: 0.004, d: 0.12, shape: 2, lp: 3000 },
      { wave: "noise", bp: 5000, bpTo: 2500, a: 0.03, d: 0.06, gain: 0.25 },
    ],
  }],
  select: ["레트로 메뉴 커서 이동", {
    layers: [{ wave: "square", duty: 0.125, freq: 1047, arp: [0, 12], arpRate: 0.035, a: 0.001, d: 0.1, shape: 2, lp: 5500 }],
  }],
  "select-soft": ["모던 메뉴용 부드러운 커서 이동", {
    layers: [{ wave: "sine", freq: 1175, fm: [2, 0.8, 0.03], a: 0.002, d: 0.08, shape: 3 }],
  }],
  message: ["채팅 메시지 도착", {
    verb: [0.2, 0.1],
    layers: [{ wave: "sine", freq: 880, arp: [0, 5, 12], arpRate: 0.055, a: 0.003, d: 0.2, shape: 2, vib: [7, 0.1] }],
  }],
  plink: ["plinkfx 시그니처: 한 방울의 소리", {
    verb: [0.35, 0.22],
    vary: 0.3,
    layers: [
      { wave: "sine", freq: 1050, to: 2150, curve: 4, sweep: 0.05, a: 0.001, d: 0.32, shape: 3 },
      { wave: "sine", freq: 3150, fm: [1.41, 1.2, 0.04], a: 0.001, d: 0.12, shape: 4, gain: 0.25 },
      { wave: "triangle", freq: 525, to: 1075, curve: 4, sweep: 0.05, a: 0.001, d: 0.15, shape: 3, gain: 0.25 },
    ],
  }],
  "drag-start": ["드래그 아이템 들기: 부드러운 들림", {
    vary: 0.6,
    varyF: 1,
    layers: [
      { wave: "sine", freq: 500, to: 800, a: 0.002, d: 0.08, shape: -4 },
      { wave: "noise", bp: 3000, q: 3, a: 0.001, d: 0.004, shape: -6, gain: 0.4 },
    ],
  }],
  drop: ["슬롯에 놓기: 부드러운 안착", {
    vary: 0.6,
    varyF: 1,
    layers: [
      { wave: "sine", freq: 700, to: 380, a: 0.002, d: 0.1, shape: -4 },
      { wave: "noise", bp: 2200, q: 3, a: 0.001, d: 0.005, shape: -6, gain: 0.5 },
      { wave: "pink", lp: 600, a: 0.001, d: 0.04, shape: -5, gain: 0.3 },
    ],
  }],
  success: ["작업 완료: 깔끔하게 올라가는 체크 차임", {
    vary: 0.1,
    verb: [0.25, 0.15],
    layers: [
      { wave: "sine", freq: 1047, fm: [2, 0.8, 0.06], arp: [0, 7], arpRate: 0.08, a: 0.002, h: 0.06, d: 0.35, shape: -4 },
      { wave: "triangle", freq: 523, arp: [0, 7], arpRate: 0.08, a: 0.002, h: 0.06, d: 0.25, shape: -4, gain: 0.3 },
    ],
  }],
  maximize: ["창이나 카드 확대: 올라가는 휙-블립", {
    vary: 0.4,
    varyF: 1,
    layers: [
      { wave: "sine", freq: 400, to: 900, curve: 0.8, a: 0.01, d: 0.1, shape: -3, gain: 0.6 },
      { wave: "noise", bp: 1500, bpTo: 4000, q: 1.5, a: 0.03, d: 0.07, shape: -3, gain: 0.25 },
    ],
  }],
  minimize: ["창이나 카드 축소: 내려가는 휙-블립", {
    vary: 0.4,
    varyF: 1,
    layers: [
      { wave: "sine", freq: 900, to: 400, curve: 2, a: 0.005, d: 0.1, shape: -3, gain: 0.6 },
      { wave: "noise", bp: 4000, bpTo: 1500, q: 1.5, a: 0.01, d: 0.08, shape: -3, gain: 0.25 },
    ],
  }],
  question: ["대화상자 질문: 궁금해하며 올라가는 억양", {
    vary: 0.1,
    verb: [0.2, 0.12],
    layers: [
      { wave: "triangle", freq: 660, arp: [0, -3, 5], arpRate: 0.08, a: 0.002, h: 0.12, d: 0.15, shape: -3 },
      { wave: "sine", freq: 1320, arp: [0, -3, 5], arpRate: 0.08, a: 0.002, h: 0.12, d: 0.12, shape: -3, gain: 0.25 },
    ],
  }],
  "message-send": ["메시지 전송: 빠르게 위로 휙", {
    vary: 0.3,
    varyF: 1,
    layers: [
      { wave: "noise", bp: 1200, bpTo: 6000, q: 1.5, a: 0.05, d: 0.08, shape: -3, gain: 0.5 },
      { wave: "sine", freq: 600, to: 1500, curve: 1.5, a: 0.01, d: 0.1, shape: -3, gain: 0.5 },
    ],
  }],
  trash: ["삭제/휴지통 이동: 구기고 떨굼", {
    vary: 0.5,
    varyF: 2,
    layers: [
      ...[0, 0.025, 0.045, 0.08, 0.1].map((at, i) => ({ wave: "noise" as const, bp: 2500 + i * 400, q: 1.5, at, a: 0.001, d: 0.025, shape: -5, gain: 0.6 })),
      { wave: "sine", freq: 500, to: 150, curve: 2, at: 0.12, a: 0.002, d: 0.1, shape: -4, gain: 0.5 },
      { wave: "pink", lp: 800, at: 0.2, a: 0.001, d: 0.05, shape: -5, gain: 0.4 },
    ],
  }],
  "page-turn": ["책이나 튜토리얼 페이지 넘김", {
    vary: 0.6,
    varyF: 3,
    varyG: 1.5,
    layers: [
      { wave: "noise", bp: 2000, bpTo: 5000, q: 0.9, a: 0.08, d: 0.12, shape: -3, gain: 0.6 },
      { wave: "pink", bp: 1200, q: 1, a: 0.06, d: 0.1, shape: -3, gain: 0.3 },
      { wave: "noise", bp: 3500, q: 2, at: 0.2, a: 0.001, d: 0.02, shape: -5, gain: 0.4 },
    ],
  }],
});
