<picture>
  <source media="(prefers-color-scheme: dark)" srcset="https://cdn.jsdelivr.net/gh/maximilianfeix/plinkfx@main/brand/banners/readme-dark.svg">
  <img alt="plinkfx: 코드로 만든 게임 효과음" src="https://cdn.jsdelivr.net/gh/maximilianfeix/plinkfx@main/brand/banners/readme-light.svg" width="100%">
</picture>

> **한국어 번역판 안내**: 이 저장소는 [maximilianfeix/plinkfx](https://github.com/maximilianfeix/plinkfx)의 한국어판 포크입니다. 갤러리 웹사이트와 사운드 설명, README를 한국어로 번역했고, 사운드 이름(API 식별자)과 라이선스는 원본 그대로 유지합니다. 원본 README는 [README.en.md](README.en.md)를 참고하세요.
>
> **한국어 갤러리: https://sigco3111.github.io/plinkfx/**

**274개의 게임 효과음, 전부 코드로 작성.** 코인, 점프, 타격, 레이저, 폭발,
UI 클릭 등 게임에 필요한 소리가 각각 몇 개의 읽기 쉬운 숫자로 되어 있고, 3.1 kB 플레이어가 그 숫자를 소리로 바꿉니다.
CC0, 오디오 파일 없음, 계정 불필요.

<a href="https://sigco3111.github.io/plinkfx/"><img src="https://cdn.jsdelivr.net/gh/maximilianfeix/plinkfx@main/docs/media/gallery.gif" alt="plinkfx 갤러리: 타일을 클릭하면 coin, jump, laser, explosion 등이 재생되고 각 타일에 파형이 표시됨" width="100%"></a>

**[▶ 브라우저에서 274개 모두 듣기](https://sigco3111.github.io/plinkfx/)** (클릭 한 번에 사운드 하나, 조정한 설정은 링크로 공유) · [30초 데모 게임 플레이](https://sigco3111.github.io/plinkfx/game.html) · [30초 소리 포함 영상 보기](https://github.com/maximilianfeix/plinkfx/blob/main/docs/media/hero-16x9.mp4)

```bash
npm i plinkfx
```

```js
import { play } from "plinkfx";

play("coin");
```

모든 사운드에는 4개의 테이크(테이크 = 같은 소리의 다른 버전)가 있고, `play`는 직전과 다른 테이크를 골라 줍니다.
그래서 백 번째 코인도 반복 재생처럼 들리지 않습니다.

<details>
<summary>더 많은 재생 방법: 옵션, 게임 설정, 트리셰이킹, 나만의 사운드</summary>

**이름으로 재생** (모든 사운드 포함, gzip 23.8 kB):

```js
import { play, volume, muted } from "plinkfx";

play("laser");
play("coin", { volume: 0.5, rate: 1.2 });   // 더 작게, 조금 더 높게
play("step-wood", { variant: 2 });          // 특정 테이크 (0-3)
play("step-wood", { pan: -0.6 });           // 왼쪽으로
play("coin", { delay: 0.1 });               // 100 ms 뒤에
play("combo-chain", { rate: 2 ** (n / 12) }); // n번째 콤보 단계, 매번 반음씩 상승
volume(0.8);                                // 마스터 볼륨, 0..1
muted(true);                                // 전체 음소거, muted()로 상태 확인
```

**플레이어가 믹스를 지켜 줍니다.** 같은 사운드가 30 ms 안에 다시 시작되면 건너뜁니다(`cooldown`).
한 프레임에 코인 30개를 주워도 소리 30개가 아니라 코인 하나가 됩니다. 같은 사운드는 최대 4개까지
동시에 재생되고(`voices`), 하나 더 오면 가장 오래된 것을 짧은 페이드로 끕니다. 둘 다 호출별 옵션입니다:

```js
play("step-grass", { cooldown: 0.08 });     // 발소리: 최소 80 ms 간격
play("explosion", { voices: 2 });           // 믹스를 깔끔하게 유지
play("click", { cooldown: 0, voices: 16 }); // 해제
```

**루프**: `rain-loop`, `wind-loop`, `engine-idle`, `force-field`는 끊김 없이 이어지며 멈출 때까지 반복됩니다.
`play()`는 멈추거나(페이드 포함) 변형할 수 있는 보이스를 반환합니다:

```js
const engine = play("engine-idle");
engine?.rate(1.6);                          // 부드럽게 회전수 상승
engine?.stop(0.5);                          // 0.5초에 걸쳐 페이드 아웃
play("coin", { loop: true });               // 어떤 사운드든 루프 가능; loop: false면 루프 사운드를 한 번만 재생
```

`play()`는 사운드를 건너뛸 때(서버, 쿨다운 중, 첫 클릭 전) `undefined`를 반환하므로 `?.`를 씁니다.
보이스의 `node`는 `AudioBufferSourceNode`이므로 더 세밀한 제어도 가능합니다.

`muted()`는 저장되지 않습니다. 기억하려면 시작할 때 한 줄, 토글할 때 한 줄이면 됩니다:

```js
muted(localStorage.muted == "1");
localStorage.muted = muted(!muted()) ? "1" : "0";
```

**게임에서:** 브라우저는 첫 클릭이나 키 입력 전까지 오디오를 잠가 둡니다. `unlockAudio()`가 그 첫 제스처에서
오디오를 재개합니다(iOS에서는 무음 스위치 상태에서도 소리가 나게 합니다). 그 전에 트리거된 사운드는 쌓아 두지
않고 건너뛰므로 갑자기 크게 터지지 않습니다. `preload()`는 유휴 시간에 사운드를 미리 렌더링해 첫 재생 지연을
없애고, `stopAll()`은 일시정지 화면용입니다.

```js
import { play, preload, stopAll, unlockAudio } from "plinkfx";

unlockAudio();
preload(["jump", "coin", "hit", "explosion"]);
// ...
stopAll();
```

서버(Next.js, Nuxt, SvelteKit)에서 import해도 안전합니다: `play()`와 `volume()`은 서버에서 아무 동작도 하지 않습니다.

**사용한 것만 가져가기** (플레이어 + 사운드 하나: gzip 3 kB). `"plinkfx"`에서 무엇이든 import하면 모든
사운드가 포함되므로, 크기가 중요할 때는 서브 경로를 사용하세요:

```js
import { play } from "plinkfx/core";
import { coin, jump } from "plinkfx/sounds";

play(coin);
```

**나만의 사운드**는 평범한 객체입니다. 갤러리에서 아무 사운드나 조정하고 "파라미터" 탭을 열어 붙여 넣으세요:

```js
import { play } from "plinkfx/core";

const blip = {
  layers: [
    { wave: "square", duty: 0.25, freq: 988, arp: [0, 5], arpRate: 0.07, h: 0.05, d: 0.3, lp: 7000 },
    { wave: "sine", freq: 1976, arp: [0, 5], arpRate: 0.07, d: 0.22, gain: 0.5 },
  ],
  verb: [0.2, 0.12],
};
play(blip);
```

모든 필드는 [skills/plinkfx/reference.md](https://github.com/maximilianfeix/plinkfx/blob/main/skills/plinkfx/reference.md)에 문서화되어 있습니다.

**React**에서는 두 줄짜리 훅이면 충분합니다:

```js
import { play } from "plinkfx";
const useSfx = (name) => useCallback((opts) => play(name, opts), [name]);
```

**Vue / Svelte**: 아무 클릭 핸들러에서 `play("coin")`을 호출하고, `unlockAudio()`는 `onMounted` / `onMount`에서 한 번.

**번들러 없이**, CDN에서 바로:

```html
<script type="module">
  import { play, unlockAudio } from "https://esm.sh/plinkfx@0";
  // 또는 https://cdn.jsdelivr.net/npm/plinkfx@0/+esm
  unlockAudio();
  document.body.onclick = () => play("coin");
</script>
```

**Deno / Bun**: `deno run -A npm:plinkfx render coin -o coin.wav`, `bunx plinkfx render coin`.

</details>

## 수록 내용

<!-- catalog -->
| 카테고리 | 사운드 수 | 예시 |
|---|---:|---|
| UI | 32 | `click` `click-soft` `toggle-on` `confirm` `error` `notify` `swipe` `plink` |
| 수집 | 19 | `coin` `coin-double` `coin-bag` `gem` `key` `heart` `ka-ching` |
| 점프·착지 | 12 | `jump` `jump-double` `jump-cartoon` `land` `land-heavy` `spring` |
| 타격 | 20 | `hit` `hit-heavy` `punch` `hurt` `enemy-die` `sword-hit` `block` `crit` |
| 폭발 | 10 | `explosion` `explosion-big` `explosion-retro` `firework` `implosion` |
| 파워업 | 12 | `powerup` `level-up` `extra-life` `shield-on` `heal` `charge-up` |
| 총격·레이저 | 21 | `laser` `blaster` `zap` `pew` `gunshot` `ricochet` `bow-twang` `reload` |
| 발소리 | 12 | `step-grass` `step-stone` `step-wood` `step-metal` `step-snow` `step-water` |
| 마법 | 13 | `sparkle` `spell-cast` `fireball` `ice` `teleport` `harp` `lightning` |
| 경보 | 13 | `alarm` `warning` `low-health` `heartbeat` `countdown` `radar-ping` |
| 징글 | 11 | `victory` `checkpoint` `level-complete` `game-over` `secret-found` `achievement` |
| 문·기계 | 10 | `door-open` `door-heavy` `lock-open` `chest-open` `lever` `ratchet` |
| 월드 | 18 | `whoosh` `swing` `dash` `splash` `glass-break` `crate-break` `pot-break` `engine-idle` (루프) `force-field` (루프) |
| 크리처 | 13 | `bat-flap` `slime-blob` `growl-small` `ghost-moan` `zombie-groan` `roar` `dog-bark` `cat-meow` |
| 자연 | 12 | `thunder-far` `thunder-crack` `bird-chirp` `frog-croak` `ocean-wave` `rain-loop` (루프) `wind-loop` (루프) |
| 카드·카지노 | 9 | `card-flip` `card-deal` `card-shuffle` `chip-stack` `dice-roll` `slot-spin` `jackpot` |
| 탈것 | 7 | `engine-start` `engine-rev` `tire-screech` `car-crash` `car-horn` `boost` `race-light` |
| 호러 | 7 | `jumpscare` `dread-drone` `whisper` `horror-sting` `chains-rattle` `music-box` |
| 농장·제작 | 9 | `axe-chop` `tree-fall` `pickaxe-mine` `dig` `plant-seed` `harvest` `fishing-cast` |
| SF·기술 | 8 | `computer-beep` `scan` `access-granted` `access-denied` `door-slide` `robot-chatter` |
| 퍼즐 | 6 | `swap` `match` `combo-chain` `line-clear` `piece-lock` `merge` |
<!-- /catalog -->

한 줄 설명이 달린 전체 목록: `npx plinkfx list`, 또는 [갤러리](https://sigco3111.github.io/plinkfx/).

## 게임 엔진용 파일

Godot, Unity, Phaser, Defold, LÖVE 등 오디오 파일을 읽는 모든 환경.

**[모든 사운드를 WAV + OGG (zip)로 다운로드](https://github.com/maximilianfeix/plinkfx/releases/latest/download/plinkfx-wav-ogg.zip)**,
4개 테이크 전부, 48 kHz 모노, 카테고리 폴더별 정리. 설치 불필요. 직접 렌더링할 수도 있습니다:

```bash
npx plinkfx export sfx/                       # 모든 사운드를 48 kHz 모노 WAV로, 카테고리 폴더별
npx plinkfx export sfx/ --format both         # WAV + OGG (OGG는 ffmpeg 필요)
npx plinkfx export sfx/ --variants            # 각 사운드의 4개 테이크 전부
npx plinkfx render explosion-big -o boom.wav  # 사운드 하나
```

- **Godot:** 폴더를 `res://`에 넣고 임포터의 *Normalize*를 끄세요. 레벨은 이미 맞춰져 있습니다.
- **Unity:** 짧은 효과음은 WAV에 *Decompress On Load*. 파일은 이미 모노입니다.
- **Phaser:** `this.load.audio("coin", ["sfx/pickup/coin.ogg", "sfx/pickup/coin.wav"])`, 또는 파일 없이
  plinkfx에서 `play("coin")`을 호출해도 됩니다.

갤러리의 각 사운드에도 ".wav 다운로드" 버튼이 있습니다. 내보낸 파일용 준비된 플레이어:
[Godot](https://github.com/maximilianfeix/plinkfx/tree/main/examples/godot), [Unity](https://github.com/maximilianfeix/plinkfx/tree/main/examples/unity), 파일이 아예 필요 없는 [Phaser](https://github.com/maximilianfeix/plinkfx/tree/main/examples/phaser) 예제.

### 오디오 스프라이트 하나로 (Phaser, Howler)

웹에서는 모든 사운드를 한 파일에 담으면 요청 274번이 1번이 됩니다:

```bash
npx plinkfx export public/sfx --sprite --format both           # 모든 사운드, 사운드 사이 0.1초 무음
npx plinkfx export public/sfx --sprite --only ui,pickup        # 일부 카테고리만
```

`plinkfx-sprite.ogg`와 `plinkfx-sprite.wav`(각 사운드의 테이크 0을 이어 붙임),
`plinkfx-sprite.phaser.json`(Phaser 오디오 스프라이트 형식), `plinkfx-sprite.json`(Howler의 `sprite` 맵,
`{ "coin": [offsetMs, durationMs] }`)이 생성됩니다. 스프라이트 이름은 사운드 이름입니다. `--gap 0.25`로 사운드 사이 무음을 바꿀 수 있습니다.

```js
// Phaser 3 또는 4
preload() {
  this.load.audioSprite("sfx", "sfx/plinkfx-sprite.phaser.json", ["sfx/plinkfx-sprite.ogg", "sfx/plinkfx-sprite.wav"]);
}
create() {
  this.sound.playAudioSprite("sfx", "coin");
}
```

```js
// Howler
import { Howl } from "howler";
const sprite = await (await fetch("sfx/plinkfx-sprite.json")).json();
const sfx = new Howl({ src: ["sfx/plinkfx-sprite.ogg", "sfx/plinkfx-sprite.wav"], sprite });
sfx.play("coin");
```

## 에이전트 스킬

plinkfx는 Claude Code, Codex, Cursor 등 에이전트용 스킬을 함께 제공합니다. *"던전 레벨용 무거운 문 소리"*라고
요청하면 에이전트가 가장 가까운 카탈로그 사운드에서 시작해 파라미터 파일을 쓰고, 렌더링하고, 기준 사운드와
비교해 측정하고(라우드니스, 트루 피크, 길이, 밝기), 조정합니다. CLI 기반이라 오프라인에서 동작합니다.
에이전트는 들을 수 없으므로, 스킬은 에이전트에게 그 사실을 알리고 판단용 WAV를 사용자에게 건네라고 지시합니다.

<img src="https://cdn.jsdelivr.net/gh/maximilianfeix/plinkfx@main/docs/media/skill.gif" alt="터미널: 던전 문 소리를 위한 plinkfx list, level, measure, render" width="100%">

```bash
npx skills add maximilianfeix/plinkfx                 # Claude Code, Codex, Cursor 등
```

Claude Code에서는 이 저장소를 플러그인 마켓플레이스로 추가할 수도 있습니다:

```
/plugin marketplace add maximilianfeix/plinkfx
/plugin install plinkfx@plinkfx
```

실제 터미널 출력이 포함된 전체 실행 예는 [docs/skill-example.md](https://github.com/maximilianfeix/plinkfx/blob/main/docs/skill-example.md)에 있습니다.

## 에이전트에서 사용 (MCP)

`plinkfx mcp`는 MCP 서버입니다. 로컬 stdio로 동작하며 네트워크나 API 키가 필요 없습니다.

```bash
claude mcp add plinkfx -- npx -y plinkfx mcp          # Claude Code
```

Cursor (`.cursor/mcp.json`) 등 JSON을 받는 클라이언트:

```json
{
  "mcpServers": {
    "plinkfx": { "command": "npx", "args": ["-y", "plinkfx", "mcp"] }
  }
}
```

Codex (`~/.codex/config.toml`):

```toml
[mcp_servers.plinkfx]
command = "npx"
args = ["-y", "plinkfx", "mcp"]
```

제공하는 도구:

| 도구 | 하는 일 |
|---|---|
| `list_sounds` | 카테고리나 단어로 카탈로그 검색 |
| `show_sound` | 사운드의 JSON 레시피 |
| `render_sound` | 이름이나 레시피로 WAV 생성. 경로와 측정값 반환. `png: true`면 파형·스펙트로그램 이미지도 반환 |
| `measure_sound` | 사운드나 WAV 파일의 라우드니스, 트루 피크, 길이, 밝기 |
| `check_sound` | 클릭음, 잘린 꼬리, DC, 클리핑, 무음 패딩, 목표 이탈 라우드니스 검사 |

같은 검사를 셸에서도 할 수 있습니다. `plinkfx check`는 검사 실패 시 1로 종료합니다:

```bash
npx plinkfx check sounds/door.json --cat mechanic   # 내 사운드를 카테고리 라우드니스와 비교
npx plinkfx check --all                             # 전체 카탈로그
npx plinkfx render door-heavy --png door.png        # 사운드를 눈으로: 파형 + 스펙트로그램
```

## 사운드 측정 방식

`npm run bake`이 모든 사운드를 렌더링하고 레벨을 맞추며, 테스트 스위트가 각 사운드의 4개 테이크를
Linux, macOS, Windows에서 검사합니다:

- **라우드니스:** 카테고리마다 목표가 있고 ITU-R BS.1770 최대 모멘터리 라우드니스로 측정합니다
  (UI와 발소리 −20 LUFS, 타격 −15, 폭발 −14, 나머지는 그 사이). 한 사운드의 4개 테이크는 목표의
  ±1.5 LU 안에 있고 평균은 0.5 LU 안입니다. 클릭, 타격, 발소리 같은 짧은 트랜지언트는 먼저 피크 상한에
  도달하는 경우가 많고, 그런 사운드는 목표 아래에 있으며 카탈로그에 `limited`로 표시됩니다.
- **피크:** 모든 테이크가 44.1 kHz에서 트루 피크(4배 오버샘플링) ≤ −1 dBTP. 48 kHz에서는 노이즈가
  다르게 나와서 일부 테이크가 −1과 −0.4 dBTP 사이에 놓입니다. `plinkfx check --all`이 목록을 보여 줍니다.
- **측정기 자체:** BS.1770 기준 사인파로 검사했고 ffmpeg의 `ebur128` 필터와 일치합니다
  (`explosion-big`: 양쪽 모두 −19.9 LUFS 통합).
- **깨끗한 가장자리:** 최소 1 ms 어택, 끝에 5 ms 페이드, DC 차단, 무음 꼬리 제거.
- **결정론:** 같은 파라미터와 테이크는 항상 같은 샘플을 만듭니다. 모든 테이크의 해시가 테스트에 포함됩니다.
- **변화:** 4개 테이크는 서로 다릅니다(사운드별 피치 분산, 살짝 다른 감쇠, 새 노이즈).
- **귀:** 숫자는 좋은 소리와 밋밋한 소리를 구분하지 못합니다. 개발 중에는 카테고리별 스펙트로그램을
  확인하지만(`npm run bake -- --reels`), 전체 사운드에 대한 헤드폰 검수는 아직 끝나지 않았습니다.
  이상하게 들리는 소리가 있으면 이름과 함께 [이슈를 열어 주세요](https://github.com/maximilianfeix/plinkfx/issues).

측정기도 export됩니다: `import { measure } from "plinkfx/meter"`, 또는 아무 WAV에나 `npx plinkfx measure file.wav`.

## 다른 도구와 비교

sfxr (DrPetter, 2007)이 이 장르를 시작했고, 아래는 요즘 사람들이 가장 많이 찾는 도구들입니다:

| | **plinkfx** | [ZzFX](https://github.com/KilledByAPixel/ZzFX) | [jsfxr](https://github.com/chr15m/jsfxr) | [Kenney 오디오 팩](https://kenney.nl/assets/category:Audio) |
|---|---|---|---|---|
| 정체 | 코드로 된 이름 있는 사운드 라이브러리 | 작은 신스 + 디자이너 | sfxr 포트: 생성기 + 라이브러리 | WAV/OGG 에셋 팩 |
| 크기 (gzip) | 플레이어 3.1 kB, 전체 사운드 포함 23.8 kB | ~1.3 kB | ~6.3 kB | 코드 없음, 파일 |
| 라이선스 | 사운드 CC0, 코드 MIT | MIT | Unlicense | CC0 |
| 이름 있는 사운드 | 274 | 예제 4개, 무작위 생성기 | 카테고리별 무작위 생성기 | 다수, 일반적인 파일명 |
| 라우드니스 정합 | 있음, 테스트로 측정 | 없음 | 없음 | 명시 없음 |
| 같은 입력 = 같은 샘플 | 그렇음, 시드 + 해시 테스트 | 무작위를 0으로 설정해야 | 저장된 파라미터 세트별 | 고정 파일 |
| 변형 | 사운드당 시드된 테이크 4개 | 편집 또는 무작위 | 변이 | 별도 파일 |
| 내보내기 | WAV, OGG, CLI | WAV (디자이너) | WAV | 이미 파일 |

ZzFX는 더 작고 js13k에는 그쪽이 맞습니다. jsfxr은 무작위 소리 탐험에 좋습니다. Kenney 팩은 실제 녹음입니다.
plinkfx는 일관되게 들리는 완성된 세트를 읽고, 조정하고, 배포하고 싶을 때를 위한 것입니다.
[8bit-sfx](https://github.com/cportka/8bit-sfx), [make-sfx](https://github.com/Tuntii/make-sfx)(코드로 만드는 게임 사운드),
[uisfx](https://github.com/romainsimon/uisfx)(UI 사운드), 에이전트가 오디오를 듣게 하려면 [earshot](https://github.com/Leonxlnx/earshot)도 살펴보세요.

## 라이선스

<table><tr><td>

### 사운드: CC0 1.0, 퍼블릭 도메인

게임, 앱, 영상, 스트림 어디에나 상업적 용도 포함 자유롭게 사용. **출처 표기 불필요.**
[LICENSE-SOUNDS](https://github.com/maximilianfeix/plinkfx/blob/main/LICENSE-SOUNDS)

</td><td>

### 코드: MIT

엔진, CLI, 갤러리, 스킬.
[LICENSE](https://github.com/maximilianfeix/plinkfx/blob/main/LICENSE)

</td></tr></table>

## 기여

가장 좋은 기여는 새 사운드입니다: 갤러리를 열고 게임의 한 장면에 맞을 때까지 조정한 뒤, 파라미터와 함께
이슈나 PR을 열어 주세요. [`good first issue`](https://github.com/maximilianfeix/plinkfx/labels/good%20first%20issue),
[`new sound`](https://github.com/maximilianfeix/plinkfx/labels/new%20sound) 라벨의 이슈를 찾아보세요.
[CONTRIBUTING.md](https://github.com/maximilianfeix/plinkfx/blob/main/CONTRIBUTING.md) 참고.

기여는 **원본 저장소 [maximilianfeix/plinkfx](https://github.com/maximilianfeix/plinkfx)**로 해 주세요.

---

[English](README.en.md) · [中文说明](README.zh-CN.md) · **한국어** (이 문서)
