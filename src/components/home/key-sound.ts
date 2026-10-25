/**
 * Real mechanical keyboard sounds (Cherry MX Brown).
 *
 * `public/keys.mp3` is a sprite of 8 single keystrokes, one every 250ms, cut
 * from "Mechanical Keyboard Cherry MX Brown" by majod
 * (https://freesound.org/people/majod/sounds/400167/), released under CC0.
 */
const SPRITE_URL = "/keys.mp3";
const SLOTS = 8;
const SLOT_LENGTH = 0.25;
// Each clip is ~130ms followed by silence, so this never bleeds into the next
const CLIP_LENGTH = 0.2;

let ctx: AudioContext | null = null;
let download: Promise<ArrayBuffer> | null = null;
let sprite: Promise<AudioBuffer> | null = null;

/** Starts downloading the sprite so the first press isn't delayed. */
export function preloadKeySound() {
  if (typeof window === "undefined") return;
  download ??= fetch(SPRITE_URL).then((res) => res.arrayBuffer());
}

/** Stable per-key slot, so each key keeps its own voice. */
function slotFor(id: string) {
  let hash = 0;
  for (const char of id) hash = (hash * 31 + char.charCodeAt(0)) | 0;
  return Math.abs(hash) % SLOTS;
}

export function playKeySound({
  id = "",
  heavy = false,
}: { id?: string; heavy?: boolean } = {}) {
  if (typeof window === "undefined" || !window.AudioContext) return;
  preloadKeySound();
  // The context can only start after a user gesture, which a key press is
  const audio = (ctx ??= new AudioContext());
  if (audio.state === "suspended") void audio.resume();
  sprite ??= download!.then((data) => audio.decodeAudioData(data));

  void sprite.then((buffer) => {
    // Mostly the key's own sound, sometimes a neighbour, like a real board
    const slot =
      Math.random() < 0.3 ? Math.floor(Math.random() * SLOTS) : slotFor(id);
    const source = audio.createBufferSource();
    source.buffer = buffer;
    // Big keys (Enter) sound deeper, every press varies a little
    source.playbackRate.value =
      (heavy ? 0.82 : 1) * (0.96 + Math.random() * 0.08);
    const gain = audio.createGain();
    gain.gain.value = heavy ? 0.7 : 0.5;
    source.connect(gain).connect(audio.destination);
    source.start(0, slot * SLOT_LENGTH, CLIP_LENGTH);
  });
}
