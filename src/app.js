const app = document.getElementById("app");
const IS_ADVANCED_PAGE = /\/advanced\.html$/i.test(window.location.pathname);
document.body.classList.toggle("advanced-page", IS_ADVANCED_PAGE);

const APP_TITLE = "Mob Impression Challenge";
const RESOURCE_PACK_NAME = "Mob Voice Over";
const PACK_DESCRIPTION = "Mob impressions recorded with Mob Impression Challenge";
const DEFAULT_PACK_FORMAT = 75;
const STARTING_SCORE = 0;
const CHALLENGE_PROGRESS_TARGET = 10;
const ACCEPT_POINTS = 200;
const BLIND_BONUS_POINTS = 150;
const ORIGINAL_REPLAY_PENALTY = 25;
const ORIGINAL_REPLAY_PENALTY_CAP = 75;
const RETRY_PENALTY = 50;
const SKIP_PENALTY = 150;
const MIN_VALID_RECORDING_SECONDS = 0.2;
const MIN_VALID_RECORDING_PEAK = 0.02;
const DEFAULT_MOB_IMAGE = "public/assets/pack_placeholder.png";
const DEFAULT_MOB_SET_ID = "basic";
const BASIC_CLIP_KEY = "__mob_default__";
const THEME_STORAGE_KEY = "mob_voice_over_theme";
const DEFAULT_THEME = "light";
const EXTRA_MOB_IMAGE_EXTENSIONS = Object.freeze({
  camel_husk: "gif",
  copper_golem: "png",
  happy_ghast: "gif",
  nautilus: "gif",
  parched: "png",
  zombie_nautilus: "gif"
});
const EXTRA_MOB_IDS = Object.freeze(Object.keys(EXTRA_MOB_IMAGE_EXTENSIONS));
const MOB_SOUND_EVENT_OVERRIDES = Object.freeze({
  allay: [
    "entity.allay.ambient_with_item",
    "entity.allay.ambient_without_item",
    "entity.allay.hurt",
    "entity.allay.death",
    "entity.allay.item_given",
    "entity.allay.item_taken"
  ],
  axolotl: [
    "entity.axolotl.idle_air",
    "entity.axolotl.idle_water",
    "entity.axolotl.swim",
    "entity.axolotl.hurt",
    "entity.axolotl.death"
  ],
  bee: [
    "entity.bee.loop",
    "entity.bee.pollinate",
    "entity.bee.hurt",
    "entity.bee.death",
    "entity.bee.sting"
  ],
  breeze: [
    "entity.breeze.idle_ground",
    "entity.breeze.idle_air",
    "entity.breeze.charge",
    "entity.breeze.jump",
    "entity.breeze.hurt",
    "entity.breeze.death"
  ],
  camel_husk: ["entity.camel_husk.ambient", "entity.camel_husk.hurt", "entity.camel_husk.death"],
  cat: ["entity.cat.ambient", "entity.cat.purr", "entity.cat.purreow", "entity.cat.hurt", "entity.cat.death"],
  copper_golem: ["entity.copper_golem.ambient", "entity.copper_golem.hurt", "entity.copper_golem.death"],
  elder_guardian: [
    "entity.elder_guardian.ambient",
    "entity.elder_guardian.ambient_land",
    "entity.elder_guardian.curse",
    "entity.elder_guardian.hurt",
    "entity.elder_guardian.death",
    "entity.elder_guardian.flop"
  ],
  guardian: [
    "entity.guardian.ambient",
    "entity.guardian.ambient_land",
    "entity.guardian.attack",
    "entity.guardian.hurt",
    "entity.guardian.death",
    "entity.guardian.flop"
  ],
  happy_ghast: ["entity.happy_ghast.ambient", "entity.happy_ghast.hurt", "entity.happy_ghast.death"],
  hoglin: [
    "entity.hoglin.ambient",
    "entity.hoglin.angry",
    "entity.hoglin.retreat",
    "entity.hoglin.hurt",
    "entity.hoglin.death",
    "entity.hoglin.step"
  ],
  iron_golem: [
    "entity.iron_golem.attack",
    "entity.iron_golem.hurt",
    "entity.iron_golem.damage",
    "entity.iron_golem.death",
    "entity.iron_golem.step",
    "entity.iron_golem.repair"
  ],
  magma_cube: [
    "entity.magma_cube.squish",
    "entity.magma_cube.squish_small",
    "entity.magma_cube.jump",
    "entity.magma_cube.hurt",
    "entity.magma_cube.death",
    "entity.magma_cube.death_small"
  ],
  nautilus: ["entity.nautilus.ambient", "entity.nautilus.hurt", "entity.nautilus.death"],
  parched: ["entity.parched.ambient", "entity.parched.hurt", "entity.parched.death"],
  piglin: [
    "entity.piglin.ambient",
    "entity.piglin.angry",
    "entity.piglin.jealous",
    "entity.piglin.retreat",
    "entity.piglin.hurt",
    "entity.piglin.death",
    "entity.piglin.step"
  ],
  pufferfish: [
    "entity.puffer_fish.flop",
    "entity.puffer_fish.hurt",
    "entity.puffer_fish.death",
    "entity.puffer_fish.blow_up",
    "entity.puffer_fish.blow_out",
    "entity.puffer_fish.sting"
  ],
  slime: [
    "entity.slime.squish",
    "entity.slime.jump",
    "entity.slime.hurt",
    "entity.slime.death",
    "entity.slime.attack"
  ],
  sheep: ["entity.sheep.ambient", "entity.sheep.hurt", "entity.sheep.death"],
  sniffer: [
    "entity.sniffer.idle",
    "entity.sniffer.searching",
    "entity.sniffer.sniffing",
    "entity.sniffer.digging",
    "entity.sniffer.hurt",
    "entity.sniffer.death",
    "entity.sniffer.happy"
  ],
  tadpole: ["entity.tadpole.flop", "entity.tadpole.hurt", "entity.tadpole.death", "entity.tadpole.grow_up"],
  turtle: [
    "entity.turtle.ambient_land",
    "entity.turtle.ambient_water",
    "entity.turtle.hurt",
    "entity.turtle.death",
    "entity.turtle.shamble",
    "entity.turtle.flop"
  ],
  zombie_nautilus: ["entity.zombie_nautilus.ambient", "entity.zombie_nautilus.hurt", "entity.zombie_nautilus.death"]
});
const ORIGINAL_SOUND_MOB_FALLBACKS = Object.freeze({
  camel_husk: ["camel"],
  copper_golem: ["iron_golem"],
  happy_ghast: ["ghast"],
  nautilus: ["squid"],
  parched: ["husk"],
  zombie_nautilus: ["drowned"]
});
const VANILLA_MOB_IDS = [
  "allay",
  "armadillo",
  "axolotl",
  "bat",
  "bee",
  "blaze",
  "bogged",
  "breeze",
  "camel",
  "cat",
  "cave_spider",
  "chicken",
  "cod",
  "cow",
  "creaking",
  "creeper",
  "dolphin",
  "donkey",
  "drowned",
  "elder_guardian",
  "ender_dragon",
  "enderman",
  "endermite",
  "evoker",
  "fox",
  "frog",
  "ghast",
  "glow_squid",
  "goat",
  "guardian",
  "hoglin",
  "horse",
  "husk",
  "iron_golem",
  "llama",
  "magma_cube",
  "mooshroom",
  "mule",
  "ocelot",
  "panda",
  "parrot",
  "phantom",
  "pig",
  "piglin",
  "piglin_brute",
  "pillager",
  "polar_bear",
  "pufferfish",
  "rabbit",
  "ravager",
  "salmon",
  "sheep",
  "shulker",
  "silverfish",
  "skeleton",
  "skeleton_horse",
  "slime",
  "sniffer",
  "snow_golem",
  "spider",
  "squid",
  "stray",
  "strider",
  "tadpole",
  "trader_llama",
  "tropical_fish",
  "turtle",
  "vex",
  "villager",
  "vindicator",
  "wandering_trader",
  "warden",
  "witch",
  "wither",
  "wither_skeleton",
  "wolf",
  "zoglin",
  "zombie",
  "zombie_horse",
  "zombie_villager",
  "zombified_piglin"
];
const TOTAL_VANILLA_MOBS = VANILLA_MOB_IDS.length;
const GIF_MOB_IMAGE_IDS = new Set([
  "allay",
  "armadillo",
  "axolotl",
  "bat",
  "bee",
  "blaze",
  "camel",
  "chicken",
  "cod",
  "dolphin",
  "elder_guardian",
  "ender_dragon",
  "endermite",
  "ghast",
  "glow_squid",
  "guardian",
  "hoglin",
  "magma_cube",
  "phantom",
  "polar_bear",
  "salmon",
  "silverfish",
  "slime",
  "sniffer",
  "squid",
  "strider",
  "tadpole",
  "vex",
  "warden",
  "zoglin",
]);
const PUFFERFISH_IMAGE_SEQUENCE = Object.freeze([
  { src: "public/assets/mobs/pufferfish_small.gif", durationMs: 2000 },
  { src: "public/assets/mobs/pufferfish_medium.gif", durationMs: 500 },
  { src: "public/assets/mobs/pufferfish_large.gif", durationMs: 4000 },
  { src: "public/assets/mobs/pufferfish_medium.gif", durationMs: 500 }
]);
const LOCAL_MOB_SOUND_LIBRARY_PATH = "public/assets/mob_sounds/index.json";
const originalSoundUrlCache = new Map();
const originalFeatureCache = new Map();
let queuedClosenessSignature = "";
const MIN_ANALYSIS_RMS = 1e-5;
const ENVELOPE_BINS = 72;

const state = {
  theme: DEFAULT_THEME,
  config: null,
  step: 0,
  mobs: [],
  recordIndex: 0,
  micStatus: "unknown",
  mediaStream: null,
  recorder: null,
  chunks: [],
  isRecording: false,
  meterPct: 0,
  recordingPeak: 0,
  meterTimer: null,
  meterSource: null,
  analyser: null,
  audioCtx: null,
  recordCountdownTimer: null,
  recordStopTimer: null,
  recordingMaxMs: 0,
  recordingRemainingMs: 0,
  micPrimed: false,
  ffmpeg: null,
  ffmpegUtil: null,
  ffmpegLoaded: false,
  ffmpegLoadPromise: null,
  busyMsg: "",
  exportLog: "",
  exportLogs: [],
  lastZipName: "",
  previewAudio: null,
  previewClipId: null,
  hintAudio: null,
  hintPlayingMobId: null,
  hintLoadingMobId: null,
  recordingClipId: null,
  mobSoundLibrary: null,
  showAddMobPanel: false,
  addMobInput: "",
  recordNotice: "",
  score: STARTING_SCORE,
  displayedScore: STARTING_SCORE,
  scoreAnimationFrame: null,
  scorePulseType: "",
  scorePulseTimer: null,
  scoreFxItems: [],
  bonusFxItems: [],
  scoreFxCounter: 0,
  completedCount: 0,
  riskChipFadingClipId: "",
  hasStartedRecording: false,
  revealPhase: 0,
  revealTimers: [],
  analysisAudioCtx: null,
  closenessRunId: 0,
  closenessAnalysis: {
    status: "idle",
    lastSignature: "",
    overallPct: null,
    comparedCount: 0,
    processedCount: 0,
    totalCount: 0,
    results: [],
    error: ""
  },
  mobImageLoopTimer: null,
  mobImageLoopToken: 0
};

function normalizeTheme(value) {
  return String(value || "").trim().toLowerCase() === "dark" ? "dark" : "light";
}

function loadThemePreference() {
  try {
    const stored = localStorage.getItem(THEME_STORAGE_KEY);
    return normalizeTheme(stored || DEFAULT_THEME);
  } catch {
    return DEFAULT_THEME;
  }
}

function applyTheme(theme) {
  const nextTheme = normalizeTheme(theme);
  state.theme = nextTheme;
  document.documentElement.setAttribute("data-theme", nextTheme);
  try {
    localStorage.setItem(THEME_STORAGE_KEY, nextTheme);
  } catch {}
}

function createClipState() {
  return {
    recording: null,
    accepted: false,
    skipped: false,
    seconds: 0,
    converting: false,
    takes: 0,
    retryCount: 0,
    listenCount: 0,
    hasListened: false,
    blindEligible: true,
    blindBonusAwarded: false,
    riskChipDismissed: false,
    blindToastShown: false,
    pointsAwarded: false,
    originalHintPlayCount: 0
  };
}

function idleRecordButtonLabel(clip) {
  return clip?.recording?.blob ? `Retry (-${RETRY_PENALTY})` : "Record Your Voice!";
}

function cancelScoreAnimation() {
  if (!state.scoreAnimationFrame) return;
  cancelAnimationFrame(state.scoreAnimationFrame);
  state.scoreAnimationFrame = null;
}

function animateScoreTo(targetScore) {
  cancelScoreAnimation();
  const startScore = Number(state.displayedScore || 0);
  const endScore = Number(targetScore || 0);
  if (Math.round(startScore) === Math.round(endScore)) {
    state.displayedScore = endScore;
    render();
    return;
  }

  const delta = Math.abs(endScore - startScore);
  const durationMs = Math.min(900, Math.max(240, delta * 14));
  const startedAt = performance.now();

  const tick = (now) => {
    const t = Math.min(1, (now - startedAt) / durationMs);
    const eased = 1 - (1 - t) ** 3;
    state.displayedScore = startScore + (endScore - startScore) * eased;
    render();
    if (t < 1) {
      state.scoreAnimationFrame = requestAnimationFrame(tick);
      return;
    }
    state.displayedScore = endScore;
    state.scoreAnimationFrame = null;
    render();
  };

  state.scoreAnimationFrame = requestAnimationFrame(tick);
}

function applyScoreDelta(delta) {
  const value = Number(delta || 0);
  if (!Number.isFinite(value) || value === 0) return;
  const prev = Number(state.score || 0);
  const next = Math.max(0, prev + value);
  const applied = next - prev;
  if (applied === 0) return;
  state.score = next;
  animateScoreTo(next);
  triggerScoreFeedback(applied);
}

function triggerScoreFeedback(delta) {
  const type = delta > 0 ? "positive" : "negative";
  state.scorePulseType = type;
  if (state.scorePulseTimer) {
    clearTimeout(state.scorePulseTimer);
  }
  state.scorePulseTimer = window.setTimeout(() => {
    state.scorePulseType = "";
    state.scorePulseTimer = null;
    render();
  }, 450);

  const id = `${Date.now()}-${state.scoreFxCounter++}`;
  const text = `${delta > 0 ? "+" : "-"}${Math.abs(Math.round(delta))}`;
  state.scoreFxItems = [...state.scoreFxItems, { id, text, type }];
  window.setTimeout(() => {
    state.scoreFxItems = state.scoreFxItems.filter((item) => item.id !== id);
    render();
  }, 950);
}

function triggerBlindBonusToast() {
  const id = `${Date.now()}-blind-${state.scoreFxCounter++}`;
  state.bonusFxItems = [...state.bonusFxItems, { id, text: `+${BLIND_BONUS_POINTS} Blind Bonus!`, type: "bonus" }];
  window.setTimeout(() => {
    state.bonusFxItems = state.bonusFxItems.filter((item) => item.id !== id);
    render();
  }, 1200);
}

function updateCompletedCount() {
  state.completedCount = recordItems().filter((entry) => getClipState(entry.mob, entry.clipKey).accepted).length;
}

const toTitleCase = (text) =>
  String(text)
    .split("_")
    .filter(Boolean)
    .map((part) => part.charAt(0).toUpperCase() + part.slice(1))
    .join(" ");

const normalizeMobId = (value) =>
  String(value || "")
    .trim()
    .toLowerCase()
    .replace(/[^a-z0-9 _-]/g, "")
    .replace(/[\s-]+/g, "_")
    .replace(/^_+|_+$/g, "");

const defaultImageForMob = (id) => {
  if (id === "pufferfish") return "public/assets/mobs/pufferfish_small.gif";
  const extraExt = EXTRA_MOB_IMAGE_EXTENSIONS[id];
  if (extraExt) return `public/assets/mobs/${id}.${extraExt}`;
  if (!VANILLA_MOB_IDS.includes(id)) return DEFAULT_MOB_IMAGE;
  const ext = GIF_MOB_IMAGE_IDS.has(id) ? "gif" : "png";
  return `public/assets/mobs/${id}.${ext}`;
};

function hydrateMobEntry(mob) {
  const hydrated = {
    ...mob,
    clipStates: {}
  };
  hydrated.clipStates[BASIC_CLIP_KEY] = createClipState();
  return hydrated;
}

function getClipState(mob, clipKey = BASIC_CLIP_KEY) {
  if (!mob.clipStates || typeof mob.clipStates !== "object") {
    mob.clipStates = {};
  }
  if (!mob.clipStates[clipKey]) {
    mob.clipStates[clipKey] = createClipState();
  }
  return mob.clipStates[clipKey];
}

function clipIdFor(mob, clipKey = BASIC_CLIP_KEY) {
  return `${mob.id}::${clipKey}`;
}

function recordItems() {
  return state.mobs.map((mob, mobIndex) => ({
    mob,
    mobIndex,
    clipKey: BASIC_CLIP_KEY,
    soundEventKey: null,
    clipId: clipIdFor(mob, BASIC_CLIP_KEY)
  }));
}

function setRecordIndexForMob(mobId) {
  const idx = state.mobs.findIndex((mob) => mob.id === mobId);
  state.recordIndex = idx >= 0 ? idx : 0;
}

function activeClipKeyForMob() {
  return BASIC_CLIP_KEY;
}

function defaultSoundEventKeysForMob(id) {
  const cleanId = normalizeMobId(id);
  const override = MOB_SOUND_EVENT_OVERRIDES[cleanId];
  if (Array.isArray(override) && override.length) {
    return [...new Set(override.map((key) => String(key || "").trim()).filter(Boolean))];
  }
  return [`entity.${cleanId}.ambient`];
}

function resolveSoundEventKeysForMob(mob) {
  const cleanId = normalizeMobId(mob?.id);
  const configured = Array.isArray(mob?.soundEventKeys)
    ? [...new Set(mob.soundEventKeys.map((key) => String(key || "").trim()).filter(Boolean))]
    : [];
  if (!configured.length) return defaultSoundEventKeysForMob(cleanId);
  const isSingleAmbientFallback = configured.length === 1 && configured[0] === `entity.${cleanId}.ambient`;
  if (isSingleAmbientFallback && MOB_SOUND_EVENT_OVERRIDES[cleanId]?.length) {
    return defaultSoundEventKeysForMob(cleanId);
  }
  return configured;
}

async function originalSoundUrlForMob(mob) {
  const mobId = normalizeMobId(mob?.id);
  if (!mobId) return "";
  if (originalSoundUrlCache.has(mobId)) return originalSoundUrlCache.get(mobId);

  const library = state.mobSoundLibrary?.mobs || {};
  const candidateMobIds = [mobId, ...(ORIGINAL_SOUND_MOB_FALLBACKS[mobId] || [])];
  let url = "";
  for (const candidateMobId of candidateMobIds) {
    const entry = library[candidateMobId];
    const files = Array.isArray(entry?.files) ? entry.files : [];
    url = String(entry?.default || files[0] || "").trim();
    if (url) break;
  }
  originalSoundUrlCache.set(mobId, url);
  return url;
}

function analysisSignature() {
  return recordItems()
    .map((entry) => {
      const clip = getClipState(entry.mob, entry.clipKey);
      const blob = clip.recording?.blob;
      return [
        entry.mob.id,
        clip.accepted ? "1" : "0",
        blob ? String(blob.size) : "0",
        blob ? String(blob.type || "") : "",
        Number(clip.seconds || 0).toFixed(3)
      ].join("|");
    })
    .join(";");
}

function clamp01(value) {
  return Math.max(0, Math.min(1, value));
}

function cosineSimilarity(a, b) {
  if (!Array.isArray(a) || !Array.isArray(b) || !a.length || !b.length) return 0;
  const len = Math.min(a.length, b.length);
  let dot = 0;
  let magA = 0;
  let magB = 0;
  for (let i = 0; i < len; i += 1) {
    const va = Number(a[i] || 0);
    const vb = Number(b[i] || 0);
    dot += va * vb;
    magA += va * va;
    magB += vb * vb;
  }
  if (!magA || !magB) return 0;
  return clamp01(dot / Math.sqrt(magA * magB));
}

function buildEnvelope(samples, bins = ENVELOPE_BINS) {
  if (!samples?.length) return [];
  const length = samples.length;
  const size = Math.max(1, Math.floor(length / bins));
  const envelope = [];

  for (let start = 0; start < length; start += size) {
    const end = Math.min(length, start + size);
    let sum = 0;
    for (let i = start; i < end; i += 1) {
      sum += Math.abs(samples[i]);
    }
    envelope.push(sum / Math.max(1, end - start));
  }
  return envelope;
}

function deltaSeries(values) {
  if (!Array.isArray(values) || values.length < 2) return [];
  const out = [];
  for (let i = 1; i < values.length; i += 1) {
    out.push(values[i] - values[i - 1]);
  }
  return out;
}

function analyzeSamples(samples, sampleRate) {
  if (!samples?.length || !sampleRate) return null;
  let energy = 0;
  let crossings = 0;
  let prev = samples[0];
  for (let i = 0; i < samples.length; i += 1) {
    const v = samples[i];
    energy += v * v;
    if (i > 0 && ((v >= 0 && prev < 0) || (v < 0 && prev >= 0))) crossings += 1;
    prev = v;
  }

  const rms = Math.sqrt(energy / samples.length);
  const envelope = buildEnvelope(samples, ENVELOPE_BINS);
  return {
    durationSec: samples.length / sampleRate,
    rms,
    zcr: crossings / Math.max(1, samples.length),
    envelope,
    envelopeDelta: deltaSeries(envelope)
  };
}

function monoSamplesFromBuffer(audioBuffer) {
  const channels = audioBuffer.numberOfChannels || 1;
  const length = audioBuffer.length || 0;
  const mono = new Float32Array(length);
  for (let c = 0; c < channels; c += 1) {
    const data = audioBuffer.getChannelData(c);
    for (let i = 0; i < length; i += 1) {
      mono[i] += data[i] / channels;
    }
  }
  return mono;
}

async function decodeAudioBlob(blob) {
  if (!blob) return null;
  state.analysisAudioCtx = state.analysisAudioCtx || new AudioContext();
  const buffer = await state.analysisAudioCtx.decodeAudioData(await blob.arrayBuffer());
  return analyzeSamples(monoSamplesFromBuffer(buffer), buffer.sampleRate);
}

async function originalFeaturesForMob(mob) {
  const url = await originalSoundUrlForMob(mob);
  if (!url) return null;
  if (originalFeatureCache.has(url)) return originalFeatureCache.get(url);

  const featurePromise = (async () => {
    const res = await fetch(url);
    if (!res.ok) throw new Error(`Failed to load original audio (${res.status})`);
    const blob = await res.blob();
    return decodeAudioBlob(blob);
  })();

  originalFeatureCache.set(url, featurePromise);
  try {
    return await featurePromise;
  } catch (err) {
    originalFeatureCache.delete(url);
    throw err;
  }
}

function scoreCloseness(recorded, original) {
  if (!recorded || !original) return null;
  const durationScore =
    1 - Math.min(1, Math.abs(recorded.durationSec - original.durationSec) / Math.max(recorded.durationSec, original.durationSec, 0.001));
  const rmsScore =
    1 - Math.min(1, Math.abs(Math.log(Math.max(recorded.rms, MIN_ANALYSIS_RMS)) - Math.log(Math.max(original.rms, MIN_ANALYSIS_RMS))) / 2.4);
  const zcrScore = 1 - Math.min(1, Math.abs(recorded.zcr - original.zcr) / Math.max(recorded.zcr, original.zcr, 0.001));
  const envelopeScore = cosineSimilarity(recorded.envelope, original.envelope);
  const motionScore = cosineSimilarity(recorded.envelopeDelta, original.envelopeDelta);

  const weighted =
    envelopeScore * 0.42 + durationScore * 0.2 + rmsScore * 0.14 + zcrScore * 0.14 + motionScore * 0.1;
  return Math.round(clamp01(weighted) * 100);
}

async function runClosenessAnalysis(signature) {
  const runId = state.closenessRunId + 1;
  state.closenessRunId = runId;
  state.closenessAnalysis = {
    ...state.closenessAnalysis,
    status: "loading",
    lastSignature: signature,
    processedCount: 0,
    totalCount: recordItems().length,
    error: ""
  };
  render();

  try {
    const items = recordItems();
    const results = [];
    let totalPct = 0;
    let comparedCount = 0;

    for (let i = 0; i < items.length; i += 1) {
      const entry = items[i];
      const clip = getClipState(entry.mob, entry.clipKey);
      const row = {
        mobId: entry.mob.id,
        mobName: entry.mob.mob,
        status: "missing",
        pct: null
      };

      if (!clip.accepted) {
        row.status = "missing";
      } else if (!clip.recording?.blob) {
        row.status = "skipped";
      } else {
        try {
          const [recordedFeatures, originalFeatures] = await Promise.all([
            decodeAudioBlob(clip.recording.blob),
            originalFeaturesForMob(entry.mob)
          ]);
          const pct = scoreCloseness(recordedFeatures, originalFeatures);
          if (pct == null) {
            row.status = "no-original";
          } else {
            row.status = "scored";
            row.pct = pct;
            totalPct += pct;
            comparedCount += 1;
          }
        } catch (err) {
          row.status = "error";
          logExport(`Closeness analysis failed for ${entry.mob.id}: ${String(err?.message || err)}`);
        }
      }
      results.push(row);
      if (runId !== state.closenessRunId) return;
      state.closenessAnalysis = {
        ...state.closenessAnalysis,
        status: "loading",
        processedCount: i + 1,
        totalCount: items.length,
        results: [...results]
      };
      render();
    }

    if (runId !== state.closenessRunId) return;
    state.closenessAnalysis = {
      status: "ready",
      lastSignature: signature,
      overallPct: comparedCount ? Math.round(totalPct / comparedCount) : null,
      comparedCount,
      processedCount: results.length,
      totalCount: results.length,
      results,
      error: ""
    };
    render();
  } catch (err) {
    if (runId !== state.closenessRunId) return;
    state.closenessAnalysis = {
      ...state.closenessAnalysis,
      status: "error",
      lastSignature: signature,
      error: String(err?.message || err)
    };
    render();
  }
}

function queueClosenessAnalysis(signature) {
  if (!signature) return;
  queuedClosenessSignature = signature;
  Promise.resolve().then(() => {
    if (queuedClosenessSignature !== signature) return;
    queuedClosenessSignature = "";
    if (state.closenessAnalysis.status === "loading" && state.closenessAnalysis.lastSignature === signature) return;
    runClosenessAnalysis(signature);
  });
}

function closenessStatusLabel(status) {
  if (status === "scored") return "Scored";
  if (status === "skipped") return "Skipped";
  if (status === "no-original") return "No Original";
  if (status === "error") return "Error";
  return "Missing";
}

function createMobDefinition(id, overrides = {}) {
  const cleanId = normalizeMobId(id);
  const name = overrides.mob || toTitleCase(cleanId);
  return {
    id: cleanId,
    mob: name,
    image: overrides.image || defaultImageForMob(cleanId),
    lengthHintMs: 1000,
    styleHints: [],
    soundEventKeys: Array.isArray(overrides.soundEventKeys) && overrides.soundEventKeys.length
      ? overrides.soundEventKeys
      : defaultSoundEventKeysForMob(cleanId)
  };
}

function allMobOptions() {
  const map = new Map();
  VANILLA_MOB_IDS.forEach((id) => {
    map.set(id, { id, label: toTitleCase(id) });
  });
  EXTRA_MOB_IDS.forEach((id) => {
    map.set(id, { id, label: toTitleCase(id) });
  });
  state.mobs.forEach((mob) => {
    const id = normalizeMobId(mob.id);
    if (!id) return;
    map.set(id, { id, label: mob.mob || toTitleCase(id) });
  });
  return [...map.values()].sort((a, b) => a.label.localeCompare(b.label));
}

function imageCandidatesForMob(id, preferredPath) {
  const cleanId = normalizeMobId(id);
  const candidates = [preferredPath, `public/assets/mobs/${cleanId}.gif`, `public/assets/mobs/${cleanId}.png`, DEFAULT_MOB_IMAGE];
  return [...new Set(candidates.filter(Boolean))];
}

function wireMobImageFallback(imgEl, id, preferredPath) {
  const candidates = imageCandidatesForMob(id, preferredPath);
  if (!candidates.length) return;
  let idx = Math.max(0, candidates.indexOf(imgEl.getAttribute("src")));
  if (idx === -1) idx = 0;
  imgEl.src = candidates[idx];
  imgEl.onerror = () => {
    idx += 1;
    if (idx < candidates.length) {
      imgEl.src = candidates[idx];
      return;
    }
    imgEl.onerror = null;
  };
}

function stopMobImageLoop() {
  if (state.mobImageLoopTimer) {
    clearTimeout(state.mobImageLoopTimer);
    state.mobImageLoopTimer = null;
  }
  state.mobImageLoopToken += 1;
}

function startPufferfishImageLoop(imgEl) {
  stopMobImageLoop();
  const token = state.mobImageLoopToken;
  let seqIndex = 0;

  const applyFrame = () => {
    if (token !== state.mobImageLoopToken) return;
    const currentMob = state.mobs[state.recordIndex];
    if (!imgEl?.isConnected || normalizeMobId(currentMob?.id) !== "pufferfish") {
      stopMobImageLoop();
      return;
    }

    const frame = PUFFERFISH_IMAGE_SEQUENCE[seqIndex];
    if (!frame) return;
    imgEl.src = frame.src;
    seqIndex = (seqIndex + 1) % PUFFERFISH_IMAGE_SEQUENCE.length;
    state.mobImageLoopTimer = window.setTimeout(applyFrame, frame.durationMs);
  };

  applyFrame();
}

function parseMobInput(rawInput) {
  const clean = normalizeMobId(rawInput);
  if (!clean) return null;
  const option = allMobOptions().find((m) => m.id === clean);
  return {
    id: clean,
    mob: option?.label || toTitleCase(clean)
  };
}

function missingMobOptions() {
  const currentIds = new Set(state.mobs.map((mob) => normalizeMobId(mob.id)));
  return allMobOptions().filter((option) => !currentIds.has(option.id));
}

const el = (html) => {
  const t = document.createElement("template");
  t.innerHTML = html.trim();
  return t.content.firstElementChild;
};

async function boot() {
  applyTheme(loadThemePreference());
  const [configRes, soundLibraryRes] = await Promise.all([
    fetch("public/mob_config.json"),
    fetch(LOCAL_MOB_SOUND_LIBRARY_PATH).catch(() => null)
  ]);
  if (!configRes.ok) {
    throw new Error(`Failed to load public/mob_config.json (${configRes.status}).`);
  }
  state.config = await configRes.json();
  if (!state.config?.mobSets || typeof state.config.mobSets !== "object") {
    throw new Error("Invalid mob config: expected top-level mobSets object.");
  }

  if (soundLibraryRes && soundLibraryRes.ok) {
    try {
      state.mobSoundLibrary = await soundLibraryRes.json();
    } catch {
      state.mobSoundLibrary = null;
      logExport("Ignoring invalid local mob sound library JSON.");
    }
  } else {
    state.mobSoundLibrary = null;
  }

  state.mobs = resolveMobSet(DEFAULT_MOB_SET_ID);
  if (!state.mobs.length) {
    throw new Error(`Mob set "${DEFAULT_MOB_SET_ID}" is empty or missing in config.`);
  }
  updateCompletedCount();
  render();
}

function resolveMobSet(setId) {
  const set = state.config.mobSets[setId];
  if (!set) return [];
  const base = set.extends ? resolveMobSet(set.extends) : [];
  return [...base, ...(set.mobs || [])].map((mob) => hydrateMobEntry(mob));
}

function clearRevealTimers() {
  if (!Array.isArray(state.revealTimers)) return;
  state.revealTimers.forEach((id) => clearTimeout(id));
  state.revealTimers = [];
}

function beginTwistReveal() {
  clearRevealTimers();
  state.revealPhase = 1;
  const phase2 = window.setTimeout(() => {
    state.revealPhase = 2;
    render();
  }, 900);
  const phase3 = window.setTimeout(() => {
    state.revealPhase = 3;
    render();
  }, 1800);
  state.revealTimers = [phase2, phase3];
}

function advanceToReveal() {
  state.step = 1;
  beginTwistReveal();
}

function advanceToNextMob() {
  const isLastMob = state.recordIndex === state.mobs.length - 1;
  if (isLastMob) {
    advanceToReveal();
    return;
  }
  state.recordIndex = Math.min(state.mobs.length - 1, state.recordIndex + 1);
}

function resetWorkflow() {
  clearRevealTimers();
  stopPreviewAudio();
  stopHintAudio();
  state.mobs.forEach((mob) => {
    const clipStates = mob?.clipStates ? Object.values(mob.clipStates) : [];
    clipStates.forEach((clip) => {
      if (clip?.recording?.url) URL.revokeObjectURL(clip.recording.url);
    });
  });
  state.mobs = resolveMobSet(DEFAULT_MOB_SET_ID);
  state.step = 0;
  state.recordIndex = 0;
  state.busyMsg = "";
  state.exportLog = "";
  state.exportLogs = [];
  state.lastZipName = "";
  state.hintLoadingMobId = null;
  state.recordingClipId = null;
  state.showAddMobPanel = false;
  state.addMobInput = "";
  state.recordNotice = "";
  cancelScoreAnimation();
  if (state.scorePulseTimer) {
    clearTimeout(state.scorePulseTimer);
    state.scorePulseTimer = null;
  }
  state.score = STARTING_SCORE;
  state.displayedScore = STARTING_SCORE;
  state.scorePulseType = "";
  state.scoreFxItems = [];
  state.bonusFxItems = [];
  state.scoreFxCounter = 0;
  state.completedCount = 0;
  state.riskChipFadingClipId = "";
  state.hasStartedRecording = false;
  state.revealPhase = 0;
  state.closenessRunId += 1;
  state.closenessAnalysis = {
    status: "idle",
    lastSignature: "",
    overallPct: null,
    comparedCount: 0,
    processedCount: 0,
    totalCount: 0,
      results: [],
      error: ""
  };
  updateCompletedCount();
}

function baseMobCount() {
  return resolveMobSet(DEFAULT_MOB_SET_ID).length;
}

function appendMobAfterBaseSet(mob) {
  const insertAt = Math.max(baseMobCount(), state.mobs.length);
  state.mobs.splice(insertAt, 0, mob);
}

function ensureMobInState(rawId, overrides = {}) {
  const cleanId = normalizeMobId(rawId);
  if (!cleanId) return null;
  const existing = state.mobs.find((mob) => mob.id === cleanId);
  if (existing) return existing;
  const mobDef = createMobDefinition(cleanId, overrides);
  const hydrated = hydrateMobEntry(mobDef);
  appendMobAfterBaseSet(hydrated);
  return hydrated;
}

function upsertMobFromInput(rawInput, overrides = {}) {
  const parsed = parseMobInput(rawInput);
  if (!parsed?.id) {
    state.recordNotice = "Enter a valid mob name or id first.";
    return;
  }

  const existingIdx = state.mobs.findIndex((mob) => mob.id === parsed.id);
  if (existingIdx >= 0) {
    state.recordNotice = `${state.mobs[existingIdx].mob} is already in your list.`;
    return;
  }

  const mobDef = createMobDefinition(parsed.id, { mob: parsed.mob, ...overrides });
  appendMobAfterBaseSet(hydrateMobEntry(mobDef));
  state.recordNotice = `${mobDef.mob} added after the starter mobs.`;
}

function addAllVanillaMobs() {
  const existing = new Set(state.mobs.map((mob) => normalizeMobId(mob.id)));
  let added = 0;

  for (let i = 0; i < VANILLA_MOB_IDS.length; i += 1) {
    const id = VANILLA_MOB_IDS[i];
    if (!id || existing.has(id)) continue;
    appendMobAfterBaseSet(hydrateMobEntry(createMobDefinition(id)));
    existing.add(id);
    added += 1;
  }

  if (added > 0) {
    state.recordNotice = `Added ${added} mob(s) after the starter mobs.`;
  } else {
    state.recordNotice = `All ${TOTAL_VANILLA_MOBS} vanilla mobs are already in your list.`;
  }
}

function addSelectedMobs(selectedIds) {
  const normalizedIds = [...new Set(selectedIds.map((id) => normalizeMobId(id)).filter(Boolean))];
  if (!normalizedIds.length) {
    state.recordNotice = "Pick at least one mob from the quick list.";
    return { added: 0, firstAddedId: "" };
  }

  const existing = new Set(state.mobs.map((mob) => normalizeMobId(mob.id)));
  const optionsById = new Map(allMobOptions().map((opt) => [opt.id, opt.label]));
  let added = 0;
  let firstAddedId = "";

  for (let i = 0; i < normalizedIds.length; i += 1) {
    const id = normalizedIds[i];
    if (existing.has(id)) continue;
    const label = optionsById.get(id) || toTitleCase(id);
    appendMobAfterBaseSet(hydrateMobEntry(createMobDefinition(id, { mob: label })));
    existing.add(id);
    added += 1;
    if (!firstAddedId) firstAddedId = id;
  }

  if (added > 0) {
    state.recordNotice = `Added ${added} mob(s) after the starter mobs.`;
  } else {
    state.recordNotice = "Those mobs are already in your list.";
  }
  return { added, firstAddedId };
}

function maxRecordingMs(mob) {
  return 5000;
}

function formatSeconds(seconds) {
  return `${Number(seconds || 0).toFixed(1)}s`;
}

function activeVersionPreset() {
  return state.config?.versionPresets?.[0] || null;
}

function packMetaForExport() {
  const preset = activeVersionPreset();
  const packFormat = Number(preset?.packFormat || DEFAULT_PACK_FORMAT);
  const pack = {
    pack_format: Number.isFinite(packFormat) ? packFormat : DEFAULT_PACK_FORMAT,
    description: PACK_DESCRIPTION
  };

  const min = Number(preset?.supportedFormats?.min);
  const max = Number(preset?.supportedFormats?.max);
  if (Number.isFinite(min) && Number.isFinite(max) && min <= max) {
    pack.min_format = min;
    pack.max_format = max;
    pack.supported_formats = {
      min_inclusive: min,
      max_inclusive: max
    };
  }

  return {
    label: preset?.label || "Custom",
    pack
  };
}

function readyRecordingCount() {
  return recordItems().filter((entry) => {
    const clip = getClipState(entry.mob, entry.clipKey);
    return clip.accepted && clip.recording?.blob;
  }).length;
}

function progressTargetCount() {
  return Math.max(CHALLENGE_PROGRESS_TARGET, recordItems().length);
}

function appendAppFooter(root) {
  if (!root) return;
  root.insertAdjacentHTML("beforeend", '<footer class="app-footer">Made with ❤️ by ActualPug</footer>');
}

function render() {
  stopMobImageLoop();
  updateCompletedCount();
  app.innerHTML = "";
  const page = el(`<section class="sheet"></section>`);
  const progressTarget = progressTargetCount();
  const progressNow = Math.min(state.completedCount, progressTarget);
  const scorePulseClass = state.scorePulseType ? `score-value-${state.scorePulseType}` : "";
  const floatingFx = state.scoreFxItems
    .map(
      (item) => `<span class="score-fx score-fx-${item.type}" data-fx-id="${escapeHtml(item.id)}">${escapeHtml(item.text)}</span>`
    )
    .concat(
      state.bonusFxItems.map(
        (item) => `<span class="score-fx score-fx-${item.type}" data-fx-id="${escapeHtml(item.id)}">${escapeHtml(item.text)}</span>`
      )
    )
    .join("");

  page.insertAdjacentHTML(
    "beforeend",
    `<header class="titlebar">
      <div class="page-hero">
        <h1>${IS_ADVANCED_PAGE ? "Advanced Mob Recorder" : APP_TITLE}</h1>
        <p class="subtitle">${IS_ADVANCED_PAGE ? "Record custom voices for any Minecraft mob." : "Can you sound like a mob?"}</p>
      </div>
      <div class="scoreboard-strip">
        <p>${
          IS_ADVANCED_PAGE
            ? `Recorded: <strong id="advanced-recorded-count-value">${readyRecordingCount()}</strong>`
            : `Progress: <strong>${progressNow} / ${progressTarget}</strong>`
        }</p>
        <p class="score-value ${scorePulseClass}">${
          IS_ADVANCED_PAGE ? "Mode: <strong>Advanced</strong>" : `Score: <strong>${Math.round(state.displayedScore)}</strong>`
        }</p>
        <div class="score-fx-layer" aria-hidden="true">${floatingFx}</div>
      </div>
    </header>
    <button
      id="theme-toggle"
      class="theme-toggle-btn"
      type="button"
      aria-pressed="${state.theme === "dark" ? "true" : "false"}"
      aria-label="${state.theme === "dark" ? "Switch to light mode" : "Switch to dark mode"}"
      title="${state.theme === "dark" ? "Switch to light mode" : "Switch to dark mode"}"
    >
      <span class="theme-toggle-icon" aria-hidden="true">
        <span class="sun-disc"></span>
        <span class="moon-disc"></span>
      </span>
    </button>`
  );
  const themeToggleBtn = page.querySelector("#theme-toggle");
  if (themeToggleBtn) {
    themeToggleBtn.onclick = () => {
      applyTheme(state.theme === "dark" ? "light" : "dark");
      render();
    };
  }

  if (IS_ADVANCED_PAGE) {
    renderAdvancedPage(page);
    appendAppFooter(page);
    app.appendChild(page);
    return;
  }

  if (state.step === 0) renderRecord(page);
  if (state.step === 1) {
    if (state.revealPhase === 0) beginTwistReveal();
    renderExport(page);
  }

  appendAppFooter(page);
  app.appendChild(page);
}

function renderRecord(root) {
  const allItems = recordItems();
  if (!allItems.length || !state.mobs.length) {
    root.insertAdjacentHTML("beforeend", `<section class="panel"><p>No mobs found.</p></section>`);
    return;
  }
  if (state.recordIndex >= state.mobs.length) {
    state.recordIndex = state.mobs.length - 1;
  }
  const mob = state.mobs[state.recordIndex];
  if (!mob) return;
  const clipKey = activeClipKeyForMob();
  const clip = getClipState(mob, clipKey);
  const item = {
    mob,
    clipKey,
    soundEventKey: clipKey === BASIC_CLIP_KEY ? null : clipKey,
    clipId: clipIdFor(mob, clipKey)
  };

  const done = state.completedCount;
  const isLastMob = state.recordIndex === state.mobs.length - 1;
  const hintMobId = normalizeMobId(mob.id);
  const hintPlaying = state.hintPlayingMobId === hintMobId && Boolean(state.hintAudio);
  const hintLoading = state.hintLoadingMobId === hintMobId;
  const canAccept = Boolean(clip.recording?.url) && !clip.accepted && !state.isRecording && !clip.converting;
  const listenedCount = Number(clip.listenCount || 0);
  const heardOriginal = listenedCount > 0;
  const listenPenaltyApplied = Math.min(Math.max(0, listenedCount - 1), ORIGINAL_REPLAY_PENALTY_CAP / ORIGINAL_REPLAY_PENALTY);
  const hasRecordedYet = Number(clip.takes || 0) > 0 || Boolean(clip.recording?.blob);
  const blindBonusAvailable = !clip.hasListened && !hasRecordedYet && !clip.riskChipDismissed;
  const blindChipFading = state.riskChipFadingClipId === item.clipId;
  const canPreviewRecording = Boolean(clip.recording?.url) && !state.isRecording && !clip.converting;
  const isPreviewingRecording = state.previewClipId === item.clipId && Boolean(state.previewAudio);
  const canGoNext = (clip.accepted || canAccept) && !state.isRecording && !clip.converting;
  const canSkip = !state.isRecording && !clip.converting && !clip.accepted;
  const nextLabel = clip.accepted ? (isLastMob ? "Finish" : "Next") : `Accept (+${ACCEPT_POINTS})`;
  const hintBtnLabel = hintPlaying
    ? "Stop Original Sound"
    : heardOriginal
      ? listenPenaltyApplied >= ORIGINAL_REPLAY_PENALTY_CAP / ORIGINAL_REPLAY_PENALTY
        ? "Hear Original (Max -75)"
        : `Hear Original (-${ORIGINAL_REPLAY_PENALTY})`
      : "Hear Original (Free)";
  const recordingMaxMs = state.recordingMaxMs || maxRecordingMs(mob);
  const recordingRemainingMs = state.isRecording ? state.recordingRemainingMs : recordingMaxMs;
  const recordingProgressPct = Math.round((Math.max(0, recordingRemainingMs) / Math.max(1, recordingMaxMs)) * 100);
  root.insertAdjacentHTML(
    "beforeend",
    `<section class="panel panel-record panel-record-mock">
      <div class="challenge-layout">
        <section class="challenge-card">
          <div class="challenge-card-head">
            <h2>Your Challenge:</h2>
          </div>
          <div class="challenge-stage">
            <figure class="mob-card single">
              <img alt="${escapeHtml(mob.mob)}" src="${escapeHtml(mob.image)}" referrerpolicy="no-referrer" />
            </figure>
            <p class="challenge-callout">${escapeHtml(mob.mob).toUpperCase()}</p>
          </div>
          <div class="challenge-actions">
            <button
              id="play-original-hint"
              class="mock-btn mock-btn-green ${hintPlaying ? "playing" : ""}"
              ${hintLoading ? "disabled" : ""}
            >${hintBtnLabel}</button>
            <div class="record-chip-wrap">
              <button id="record" class="mock-btn mock-btn-blue ${state.isRecording ? "recording" : ""}" ${
                clip.converting || clip.accepted ? "disabled" : ""
              }>
                <span class="record-pill-label">${state.isRecording ? "Stop Recording" : idleRecordButtonLabel(clip)}</span>
              </button>
              ${
                blindBonusAvailable
                  ? `<span class="risk-chip ${blindChipFading ? "is-fading" : ""}">🎯 Risk It: +${BLIND_BONUS_POINTS}</span>`
                  : ""
              }
            </div>
          </div>
          <div class="recording-indicator ${state.isRecording ? "active" : ""}" aria-live="polite">
            <div class="recording-indicator-main">
              <button
                id="play-my-recording"
                class="indicator-play-btn ${isPreviewingRecording ? "is-playing" : ""}"
                type="button"
                ${canPreviewRecording ? "" : "disabled"}
                aria-label="${isPreviewingRecording ? "Stop playback" : "Play your recording"}"
                title="${isPreviewingRecording ? "Stop playback" : "Play your recording"}"
              >
                <span class="indicator-play-glyph" aria-hidden="true"></span>
              </button>
              <div class="recording-indicator-content">
                <div class="recording-indicator-row">
                  <span class="recording-status-dot" aria-hidden="true"></span>
                  <p class="recording-status-text">${state.isRecording ? "Recording now" : "Ready to record"}</p>
                  <p class="recording-time-label">
                    ${state.isRecording ? "Time left" : "Max"}:
                    <strong class="recording-time-value">${formatSeconds(recordingRemainingMs / 1000)}</strong>
                  </p>
                </div>
                <div class="countdown-ring ${state.isRecording ? "active" : ""}" style="--ring-pct:${recordingProgressPct};">
                  <span>${formatSeconds(recordingRemainingMs / 1000)}</span>
                </div>
              </div>
            </div>
          </div>
          <div class="challenge-primary-controls">
            <button id="prev" class="ghost-btn" ${state.recordIndex === 0 || state.isRecording ? "disabled" : ""}>Previous</button>
            <button id="next" class="submit-btn" ${canGoNext ? "" : "disabled"}>${nextLabel}</button>
            <button id="skip-circle" class="ghost-btn" ${canSkip ? "" : "disabled"}>Skip (-${SKIP_PENALTY})</button>
          </div>
        </section>
      </div>
      ${
        state.micStatus !== "ready"
          ? `<div class="stack">
        <p class="note">${
          state.micStatus === "unsupported"
            ? "This browser does not support microphone recording for this app. Use a current Chromium-based browser."
            : state.micStatus === "denied"
            ? "Microphone access is blocked. Enable it in your browser permissions, then retry."
            : "Enable microphone now so you are prompted before recording."
        }</p>
        <button id="enable-mic" class="ghost-btn" ${
          state.isRecording || state.micStatus === "unsupported" ? "disabled" : ""
        }>Enable Microphone</button>
      </div>`
          : ""
      }
      ${clip.converting ? '<p class="note">Converting recording to OGG...</p>' : ""}
      ${
        state.recordNotice ? `<p class="note">${escapeHtml(state.recordNotice)}</p>` : ""
      }
    </section>`
  );

  const hintBtn = root.querySelector("#play-original-hint");
  if (hintBtn) {
    hintBtn.onclick = async () => {
      if (!clip.riskChipDismissed) {
        clip.riskChipDismissed = true;
        state.riskChipFadingClipId = item.clipId;
        render();
        window.setTimeout(() => {
          if (state.riskChipFadingClipId === item.clipId) {
            state.riskChipFadingClipId = "";
            render();
          }
        }, 200);
      }
      await toggleOriginalHintForMob(mob);
    };
  }
  const playbackBtn = root.querySelector("#play-my-recording");
  if (playbackBtn) {
    playbackBtn.onclick = () => {
      toggleClipPreview(mob, clipKey);
    };
  }
  const mobImg = root.querySelector(".mob-card.single img");
  if (mobImg) {
    if (normalizeMobId(mob.id) === "pufferfish") {
      startPufferfishImageLoop(mobImg);
    } else {
      wireMobImageFallback(mobImg, mob.id, mob.image);
    }
  }

  const micBtn = root.querySelector("#enable-mic");
  if (micBtn) {
    micBtn.onclick = async () => {
      await ensureMic();
      render();
    };
  }

  wireRecordToggle(root.querySelector("#record"), item);
  root.querySelector("#prev").onclick = () => {
    if (state.isRecording) return;
    stopHintAudio();
    state.recordIndex = Math.max(0, state.recordIndex - 1);
    render();
  };
  root.querySelector("#next").onclick = () => {
    if (state.isRecording) return;
    stopHintAudio();
    if (!clip.accepted) {
      if (!canAccept) return;
      clip.accepted = true;
      clip.skipped = false;
      if (!clip.pointsAwarded) {
        let delta = ACCEPT_POINTS;
        if (clip.blindEligible && !clip.blindBonusAwarded) {
          delta += BLIND_BONUS_POINTS;
          clip.blindBonusAwarded = true;
        }
        applyScoreDelta(delta);
        clip.pointsAwarded = true;
      }
      updateCompletedCount();
    }
    advanceToNextMob();
    render();
  };
  const basicSkipBtn = root.querySelector("#skip-circle");
  if (basicSkipBtn) {
    basicSkipBtn.onclick = () => {
      if (state.isRecording || clip.converting) return;
      stopHintAudio();
      applyScoreDelta(-SKIP_PENALTY);
      if (clip.recording?.url) URL.revokeObjectURL(clip.recording.url);
      clip.recording = null;
      clip.seconds = 0;
      clip.accepted = true;
      clip.skipped = true;
      clip.blindEligible = false;
      clip.hasListened = Boolean(clip.listenCount > 0);
      updateCompletedCount();
      advanceToNextMob();
      render();
    };
  }
}

function renderExport(root) {
  const items = recordItems();
  const ready = items.filter((entry) => {
    const clip = getClipState(entry.mob, entry.clipKey);
    return clip.accepted && clip.recording?.blob;
  });
  const nonOggCount = ready.filter((entry) => {
    const clip = getClipState(entry.mob, entry.clipKey);
    return !String(clip.recording?.blob?.type || "").includes("ogg");
  }).length;
  const logText = state.exportLogs.join("\n") || state.exportLog;
  const showLogOpen = /failed|error/i.test(`${state.busyMsg} ${state.exportLog}`);
  const allMobListOptions = allMobOptions();
  const canShowAddMobToggle = allMobListOptions.length > 0;
  const existingMobIds = new Set(state.mobs.map((mob) => normalizeMobId(mob.id)));
  const allMobRows = allMobListOptions
    .map(
      (option) => `<label class="mob-check-item" for="add-mob-${escapeHtml(option.id)}">
        <input
          id="add-mob-${escapeHtml(option.id)}"
          type="checkbox"
          name="add-mob-selection"
          value="${escapeHtml(option.id)}"
        />
        <span>${escapeHtml(option.label)}</span>
        ${existingMobIds.has(option.id) ? '<small class="note">(already added)</small>' : ""}
      </label>`
    )
    .join("");
  const currentAnalysisSignature = analysisSignature();
  if (
    currentAnalysisSignature !== state.closenessAnalysis.lastSignature &&
    state.closenessAnalysis.status !== "loading"
  ) {
    queueClosenessAnalysis(currentAnalysisSignature);
  }
  const closeness = state.closenessAnalysis;
  const isAnalyzing = closeness.status === "idle" || closeness.status === "loading";
  const showResults = !isAnalyzing;
  const totalForProgress = Math.max(1, Number(closeness.totalCount || items.length || 1));
  const processedForProgress = Math.max(0, Math.min(totalForProgress, Number(closeness.processedCount || 0)));
  const loadingPct = Math.max(8, Math.min(96, Math.round((processedForProgress / totalForProgress) * 100)));
  const scoredRows = closeness.results.filter((row) => row.status === "scored");
  const clipByMobId = new Map(
    state.mobs.map((mob) => {
      const cleanId = normalizeMobId(mob.id);
      return [cleanId, { mob, clip: getClipState(mob, BASIC_CLIP_KEY) }];
    })
  );
  const chartRows = closeness.results.map((row, idx) => {
    const pct = row.pct ?? 0;
    const status = closenessStatusLabel(row.status);
    const rowClass = row.status === "scored" ? "is-scored" : "is-unscored";
    const valueText = row.status === "scored" ? `${pct}%` : status;
    const animDelay = Math.min(idx * 50, 850);
    const cleanMobId = normalizeMobId(row.mobId);
    const clipEntry = clipByMobId.get(cleanMobId) || null;
    const hasRecording = Boolean(clipEntry?.clip?.recording?.url);
    const rowClipId = clipEntry ? clipIdFor(clipEntry.mob, BASIC_CLIP_KEY) : `${cleanMobId}::${BASIC_CLIP_KEY}`;
    const previewing = hasRecording && state.previewClipId === rowClipId && Boolean(state.previewAudio);
    const playAriaLabel = previewing ? "Stop playback" : `Play ${row.mobName} recording`;
    return `<div class="closeness-row ${rowClass}">
      <button
        class="indicator-play-btn closeness-row-play-btn ${previewing ? "is-playing" : ""}"
        type="button"
        data-mob-id="${escapeHtml(cleanMobId)}"
        ${hasRecording ? "" : "disabled"}
        aria-label="${escapeHtml(playAriaLabel)}"
        title="${escapeHtml(playAriaLabel)}"
      >
        <span class="indicator-play-glyph" aria-hidden="true"></span>
      </button>
      <div class="closeness-row-main">
        <div class="closeness-row-head">
          <span>${escapeHtml(row.mobName)}</span>
          <strong>${escapeHtml(valueText)}</strong>
        </div>
        <div class="closeness-bar-track">
          <span class="closeness-bar-fill" style="--bar-pct:${pct};--bar-delay:${animDelay}ms;"></span>
        </div>
      </div>
    </div>`;
  });
  const closenessHeadline =
    closeness.status === "error"
      ? "Similarity check failed"
      : closeness.overallPct == null
        ? "No scored comparisons yet"
        : `${closeness.overallPct}% Total Closeness`;
  const closenessSubline =
    closeness.status === "error"
      ? closeness.error || "Try going back, re-recording, and finishing again."
      : `${scoredRows.length} of ${closeness.totalCount || state.mobs.length} mobs compared against original sounds.`;

  root.insertAdjacentHTML(
    "beforeend",
    `<section class="panel panel-export">
      <div>
        ${
          isAnalyzing
            ? `<div class="similarity-loading-card">
          <p class="similarity-loading-title">Calculating Recording Similarities...</p>
          <div class="similarity-loading-track" role="progressbar" aria-valuemin="0" aria-valuemax="100" aria-valuenow="${loadingPct}">
            <span class="similarity-loading-fill" style="--analysis-pct:${loadingPct};"></span>
          </div>
          <p class="note">Compared ${processedForProgress}/${totalForProgress} recordings so far.</p>
        </div>`
            : ""
        }
      </div>
      ${
        showResults
          ? `<section class="closeness-panel">
        <div class="closeness-total">
          <p class="closeness-kicker">Your Results</p>
          <h3>${escapeHtml(closenessHeadline)}</h3>
          <p class="note">${escapeHtml(closenessSubline)}</p>
          <div class="closeness-total-ring" style="--total-pct:${Math.max(0, closeness.overallPct || 0)};">
            <span>${closeness.overallPct == null ? "--" : `${closeness.overallPct}%`}</span>
          </div>
          <p class="note">Total points: <strong>${Math.round(state.displayedScore)}</strong></p>
        </div>
        <div class="closeness-chart">
          ${chartRows.length ? chartRows.join("") : '<p class="note">No mobs to analyze yet.</p>'}
        </div>
      </section>
      <section class="gift-pack-card">
        <p class="gift-pack-kicker">Surprise!</p>
        <p class="gift-pack-message">My gift to you!<!/p>
        <p class="gift-pack-message">Here are your mob recordings in a resourcepack. Enjoy!</p>
        <div class="export-actions">
          <button id="build" class="export-primary-btn" ${ready.length ? "" : "disabled"}>Download Resource Pack</button>
          <button id="guide" class="export-secondary-btn">How to install</button>
        </div>
        ${nonOggCount > 0 ? `<p class="warn-note">${nonOggCount} clip(s) will be converted to OGG during export.</p>` : ""}
      </section>`
          : ""
      }
      <div>
        <div class="export-bottom-row">
          <button id="restart" class="ghost-btn">Back to Challenge</button>
          ${canShowAddMobToggle ? '<button id="add-more-mobs" class="ghost-btn">Add More Mobs!</button>' : ""}
          <button id="start-over" class="ghost-btn">Start Over</button>
        </div>
        ${
          state.showAddMobPanel && canShowAddMobToggle
            ? `<section class="add-mob-form">
          <label class="mob-check-item mob-check-item-select-all" for="add-mob-select-all">
            <input id="add-mob-select-all" type="checkbox" />
            <span>Select all</span>
          </label>
          <p class="note">${existingMobIds.size} of ${allMobListOptions.length} known mobs are already in this challenge run.</p>
          <div class="mob-checklist">${allMobRows || '<p class="note">No mobs available.</p>'}</div>
          <div class="add-mob-actions">
            <button id="add-selected-mobs" class="ghost-btn" type="button">Add Selected</button>
            <button id="close-add-mob-panel" class="ghost-btn" type="button">Done</button>
          </div>
        </section>`
            : ""
        }
        <p id="busy" class="note"></p>
      </div>
      <input id="raw-import" type="file" accept=".zip,application/zip" hidden />
      <details class="install-details">
        <summary>How to install</summary>
        <div id="instructions" class="stack"></div>
      </details>
      <details class="log-details advanced-panel" ${showLogOpen ? "open" : ""}>
        <summary>Advanced</summary>
        <div class="advanced-actions">
          <button id="import" class="ghost-btn">Import Raw Recordings</button>
          <button id="raw" class="ghost-btn" ${ready.length ? "" : "disabled"}>Download Raw Recordings</button>
          <button id="open-advanced" class="ghost-btn">Advanced Mob Recorder</button>
        </div>
        <details class="log-details nested-log-details" ${showLogOpen ? "open" : ""}>
          <summary>Technical log (only needed if something breaks)</summary>
          <pre id="log" class="note log-box"></pre>
        </details>
      </details>
    </section>`
  );

  const buildBtn = root.querySelector("#build");
  if (buildBtn) {
    buildBtn.onclick = async () => {
      await buildAndDownloadPack();
      render();
    };
  }
  const guideBtn = root.querySelector("#guide");
  if (guideBtn) {
    guideBtn.onclick = () => {
      const details = root.querySelector(".install-details");
      if (details) {
        details.open = true;
        details.scrollIntoView({ behavior: "smooth", block: "start" });
      }
    };
  }
  root.querySelector("#raw").onclick = async () => {
    await downloadRawRecordings();
  };
  root.querySelector("#import").onclick = () => {
    root.querySelector("#raw-import").click();
  };
  const openAdvancedBtn = root.querySelector("#open-advanced");
  if (openAdvancedBtn) {
    openAdvancedBtn.onclick = () => {
      window.location.href = "advanced.html";
    };
  }
  root.querySelectorAll(".closeness-row-play-btn").forEach((playBtn) => {
    playBtn.onclick = () => {
      const mobId = normalizeMobId(playBtn.dataset.mobId || "");
      if (!mobId) return;
      const targetMob = state.mobs.find((mob) => normalizeMobId(mob.id) === mobId);
      if (!targetMob) return;
      toggleClipPreview(targetMob, BASIC_CLIP_KEY);
    };
  });
  const addMoreMobsBtn = root.querySelector("#add-more-mobs");
  if (addMoreMobsBtn) {
    addMoreMobsBtn.onclick = () => {
      const shouldOpen = !state.showAddMobPanel;
      state.showAddMobPanel = shouldOpen;
      render();
    };
  }
  const addMobSelectAll = root.querySelector("#add-mob-select-all");
  const addMobSelections = [...root.querySelectorAll('input[name="add-mob-selection"]')];
  const addSelectedBtn = root.querySelector("#add-selected-mobs");
  const closeAddPanelBtn = root.querySelector("#close-add-mob-panel");
  const applyMobNotice = (successSuffix = "") => {
    if (state.recordNotice) {
      state.busyMsg = successSuffix ? `${state.recordNotice} ${successSuffix}` : state.recordNotice;
      return;
    }
    state.busyMsg = "Could not add that mob.";
  };
  if (addMobSelectAll) {
    addMobSelectAll.onchange = () => {
      addMobSelections.forEach((input) => {
        input.checked = addMobSelectAll.checked;
      });
    };
    const syncSelectAllState = () => {
      const selectedCount = addMobSelections.filter((input) => input.checked).length;
      addMobSelectAll.checked = selectedCount > 0 && selectedCount === addMobSelections.length;
      addMobSelectAll.indeterminate = selectedCount > 0 && selectedCount < addMobSelections.length;
    };
    addMobSelections.forEach((input) => {
      input.onchange = syncSelectAllState;
    });
    syncSelectAllState();
  }
  if (addSelectedBtn) {
    addSelectedBtn.onclick = () => {
      const selectedIds = addMobSelections.filter((input) => input.checked).map((input) => input.value);
      const before = state.mobs.length;
      const result = addSelectedMobs(selectedIds);
      if (result?.added > 0 && result.firstAddedId) {
        setRecordIndexForMob(result.firstAddedId);
      }
      if (state.mobs.length > before) {
        applyMobNotice('Use "Back to Challenge" to record them.');
      } else {
        applyMobNotice();
      }
      render();
    };
  }
  if (closeAddPanelBtn) {
    closeAddPanelBtn.onclick = () => {
      state.showAddMobPanel = false;
      render();
    };
  }
  root.querySelector("#restart").onclick = () => {
    clearRevealTimers();
    state.step = 0;
    render();
  };
  root.querySelector("#start-over").onclick = () => {
    resetWorkflow();
    render();
  };
  root.querySelector("#raw-import").onchange = async (ev) => {
    const file = ev.target.files?.[0];
    ev.target.value = "";
    if (!file) return;
    await importRawRecordingsZip(file, { goToExport: false });
  };

  root.querySelector("#busy").textContent = state.busyMsg;
  root.querySelector("#log").textContent = logText || "No log output yet.";

  const ins = root.querySelector("#instructions");
  const downloadedLine = state.lastZipName
    ? `<p><strong>Latest download:</strong> <code>${escapeHtml(state.lastZipName)}</code></p>`
    : `<p>After you click <strong>Download Resource Pack</strong>, move that zip file using the steps below.</p>`;
  ins.innerHTML = `<div class="install-card">
      <h3>Install in Minecraft</h3>
      ${downloadedLine}
      <p>1. Keep the pack as a <strong>.zip</strong> file (do not unzip it).</p>
      <p>2. Move it into your Minecraft resource pack folder:</p>
      <p class="path-line">Windows: <code>%AppData%\\.minecraft\\resourcepacks</code></p>
      <p class="path-line">macOS: <code>~/Library/Application Support/minecraft/resourcepacks</code></p>
      <p class="path-line">Linux: <code>~/.minecraft/resourcepacks</code></p>
      <p>3. In Minecraft Java: <strong>Options</strong> -> <strong>Resource Packs</strong>, then enable this pack.</p>
    </div>`;
}

function updateAdvancedRecorderRowUi(row) {
  if (!row) return;
  const cleanId = normalizeMobId(row.dataset.mobId || "");
  const label = row.dataset.mobLabel || toTitleCase(cleanId);
  const mob = state.mobs.find((item) => normalizeMobId(item.id) === cleanId) || null;
  const clip = mob ? getClipState(mob, BASIC_CLIP_KEY) : null;
  const hasRecording = Boolean(clip?.recording?.url);
  const included = Boolean(clip?.accepted && clip?.recording?.blob);
  const rowClipId = `${cleanId}::${BASIC_CLIP_KEY}`;
  const rowIsRecording = state.isRecording && state.recordingClipId === rowClipId;
  const hintPlaying = state.hintPlayingMobId === cleanId && Boolean(state.hintAudio);
  const hintLoading = state.hintLoadingMobId === cleanId;
  const previewing = state.previewClipId === rowClipId && Boolean(state.previewAudio);

  const titleEl = row.querySelector(".advanced-mob-title");
  if (titleEl) titleEl.textContent = label;
  const subEl = row.querySelector(".advanced-mob-sub");
  if (subEl) {
    subEl.textContent = `${cleanId} • ${included ? "Included" : hasRecording ? "Recorded (not included)" : "No recording"}`;
  }

  const originalBtn = row.querySelector(".advanced-original-btn");
  if (originalBtn) {
    originalBtn.disabled = Boolean(hintLoading);
    originalBtn.textContent = hintPlaying ? "Stop Original" : "Original";
  }

  const recordBtn = row.querySelector(".advanced-record-btn");
  if (recordBtn) {
    recordBtn.classList.toggle("is-recording", rowIsRecording);
    recordBtn.disabled = Boolean((state.isRecording && !rowIsRecording) || clip?.converting);
    recordBtn.textContent = rowIsRecording ? "Stop" : hasRecording ? "Retry" : "Record";
  }

  const playBtn = row.querySelector(".advanced-play-btn");
  if (playBtn) {
    playBtn.disabled = !hasRecording;
    playBtn.textContent = previewing ? "Stop Mine" : "Play Mine";
  }

  const includeBtn = row.querySelector(".advanced-include-btn");
  if (includeBtn) {
    includeBtn.disabled = !hasRecording;
    includeBtn.textContent = included ? "Exclude" : "Include";
  }
}

function createAdvancedRecorderRow(option) {
  const cleanId = normalizeMobId(option.id);
  const row = el(`<article class="advanced-mob-row" data-mob-id="${escapeHtml(cleanId)}" data-mob-label="${escapeHtml(option.label)}">
    <div class="advanced-mob-main">
      <p class="advanced-mob-title"></p>
      <p class="advanced-mob-sub"></p>
    </div>
    <div class="advanced-mob-actions">
      <button class="tiny-btn advanced-original-btn" type="button"></button>
      <button class="tiny-btn advanced-record-btn" type="button"></button>
      <button class="tiny-btn advanced-play-btn" type="button"></button>
      <button class="tiny-btn advanced-include-btn" type="button"></button>
    </div>
  </article>`);

  row.querySelector(".advanced-original-btn").onclick = async () => {
    const targetMob = ensureMobInState(cleanId, { mob: option.label });
    if (!targetMob) return;
    await toggleOriginalHintForMob(targetMob);
  };

  row.querySelector(".advanced-record-btn").onclick = async () => {
    const targetMob = ensureMobInState(cleanId, { mob: option.label });
    if (!targetMob) return;
    const targetClipId = clipIdFor(targetMob, BASIC_CLIP_KEY);
    if (state.isRecording) {
      if (state.recordingClipId === targetClipId) {
        stopRecording();
        refreshAdvancedPageUi();
      } else {
        state.busyMsg = "Finish the current recording first.";
        refreshAdvancedPageUi();
      }
      return;
    }
    await startRecording(
      {
        mob: targetMob,
        clipKey: BASIC_CLIP_KEY
      },
      { applyScoring: false, autoAccept: true }
    );
    refreshAdvancedPageUi();
  };

  row.querySelector(".advanced-play-btn").onclick = () => {
    const targetMob = ensureMobInState(cleanId, { mob: option.label });
    if (!targetMob) return;
    toggleClipPreview(targetMob, BASIC_CLIP_KEY);
  };

  row.querySelector(".advanced-include-btn").onclick = () => {
    const targetMob = ensureMobInState(cleanId, { mob: option.label });
    if (!targetMob) return;
    const targetClip = getClipState(targetMob, BASIC_CLIP_KEY);
    if (!targetClip.recording?.blob) return;
    targetClip.accepted = !targetClip.accepted;
    targetClip.skipped = false;
    targetClip.pointsAwarded = true;
    updateCompletedCount();
    refreshAdvancedPageUi();
  };

  updateAdvancedRecorderRowUi(row);
  return row;
}

function renderAdvancedRecorderRows(root, listSelector) {
  const advancedList = root.querySelector(listSelector);
  if (!advancedList) return;
  const allOptions = allMobOptions();
  advancedList.replaceChildren(...allOptions.map((option) => createAdvancedRecorderRow(option)));
}

function renderAdvancedPage(root) {
  const readyCount = readyRecordingCount();
  const logText = state.exportLogs.join("\n") || state.exportLog;

  root.insertAdjacentHTML(
    "beforeend",
    `<section class="panel panel-export">
      <div>
        <h2>Advanced Mob Recorder</h2>
        <p class="note">Choose any mob, hear the original sound, and record your own version.</p>
        <div class="export-tertiary-actions">
          <button id="advanced-build" class="export-primary-btn" ${readyCount ? "" : "disabled"}>Download Resource Pack</button>
          <button id="advanced-import" class="ghost-btn">Import Raw Recordings</button>
          <button id="advanced-raw" class="ghost-btn" ${readyCount ? "" : "disabled"}>Download Raw Recordings</button>
          <button id="advanced-reset" class="ghost-btn">Clear Recordings</button>
          <button id="advanced-back" class="ghost-btn">Back to Main Challenge</button>
        </div>
        <p id="advanced-busy" class="note"></p>
      </div>
      <input id="advanced-raw-import" type="file" accept=".zip,application/zip" hidden />
      <section class="log-details advanced-recorder-panel">
        <div class="advanced-recorder-head">
          <p class="note">Recordings marked Included are exported into your resource pack.</p>
        </div>
        <div class="advanced-mob-list" id="advanced-mob-list"></div>
      </section>
      <details class="log-details advanced-panel">
        <summary>Technical log (only needed if something breaks)</summary>
        <pre id="advanced-log" class="note log-box"></pre>
      </details>
    </section>`
  );

  const advancedBuildBtn = root.querySelector("#advanced-build");
  if (advancedBuildBtn) {
    advancedBuildBtn.onclick = async () => {
      await buildAndDownloadPack();
      render();
    };
  }
  root.querySelector("#advanced-import").onclick = () => {
    root.querySelector("#advanced-raw-import").click();
  };
  root.querySelector("#advanced-raw").onclick = async () => {
    await downloadRawRecordings();
  };
  root.querySelector("#advanced-reset").onclick = () => {
    resetWorkflow();
    render();
  };
  root.querySelector("#advanced-back").onclick = () => {
    window.location.href = "index.html";
  };
  root.querySelector("#advanced-raw-import").onchange = async (ev) => {
    const file = ev.target.files?.[0];
    ev.target.value = "";
    if (!file) return;
    await importRawRecordingsZip(file, { goToExport: false });
  };

  root.querySelector("#advanced-busy").textContent = state.busyMsg;
  root.querySelector("#advanced-log").textContent = logText || "No log output yet.";
  renderAdvancedRecorderRows(root, "#advanced-mob-list");
}

function refreshAdvancedPageUi() {
  if (!IS_ADVANCED_PAGE) {
    render();
    return;
  }

  const advancedList = document.querySelector("#advanced-mob-list");
  if (!advancedList) {
    render();
    return;
  }

  updateCompletedCount();
  const readyCount = readyRecordingCount();
  const recordedCountEl = document.querySelector("#advanced-recorded-count-value");
  if (recordedCountEl) recordedCountEl.textContent = String(readyCount);

  const advancedBuildBtn = document.querySelector("#advanced-build");
  if (advancedBuildBtn) advancedBuildBtn.disabled = !readyCount;
  const advancedRawBtn = document.querySelector("#advanced-raw");
  if (advancedRawBtn) advancedRawBtn.disabled = !readyCount;

  const busyEl = document.querySelector("#advanced-busy");
  if (busyEl) busyEl.textContent = state.busyMsg;

  const logText = state.exportLogs.join("\n") || state.exportLog;
  const logEl = document.querySelector("#advanced-log");
  if (logEl) logEl.textContent = logText || "No log output yet.";

  const rows = advancedList.querySelectorAll(".advanced-mob-row");
  const optionCount = allMobOptions().length;
  if (rows.length !== optionCount) {
    const scrollTop = advancedList.scrollTop;
    renderAdvancedRecorderRows(document, "#advanced-mob-list");
    advancedList.scrollTop = scrollTop;
    return;
  }
  rows.forEach((row) => updateAdvancedRecorderRowUi(row));
}
async function ensureMic() {
  if (state.mediaStream) return true;
  if (!navigator?.mediaDevices?.getUserMedia || typeof MediaRecorder === "undefined") {
    state.micStatus = "unsupported";
    return false;
  }
  try {
    state.mediaStream = await navigator.mediaDevices.getUserMedia({
      audio: {
        echoCancellation: false,
        noiseSuppression: false,
        autoGainControl: false
      }
    });
    state.micStatus = "ready";
    return true;
  } catch {
    state.micStatus = "denied";
    return false;
  }
}

function primeMicPermission() {
  if (state.micPrimed) return;
  state.micPrimed = true;
  ensureMic().finally(() => {
    render();
  });
}

function pickMimeType() {
  const candidates = [
    "audio/ogg;codecs=opus",
    "audio/ogg",
    "audio/webm;codecs=opus",
    "audio/webm"
  ];
  return candidates.find((type) => MediaRecorder.isTypeSupported(type)) || "";
}

function logExport(message) {
  const stamp = new Date().toLocaleTimeString();
  state.exportLogs.push(`[${stamp}] ${message}`);
  if (state.exportLogs.length > 120) state.exportLogs = state.exportLogs.slice(-120);
  const logEl = document.getElementById("log");
  if (logEl) logEl.textContent = state.exportLogs.join("\n");
}

function stopPreviewAudio() {
  if (state.previewAudio) {
    state.previewAudio.pause();
    state.previewAudio.currentTime = 0;
  }
  state.previewAudio = null;
  state.previewClipId = null;
}

function stopHintAudio() {
  if (state.hintAudio) {
    state.hintAudio.pause();
    state.hintAudio.currentTime = 0;
  }
  state.hintAudio = null;
  state.hintPlayingMobId = null;
}

async function toggleOriginalHintForMob(mob) {
  const mobId = normalizeMobId(mob?.id);
  if (!mobId) return;
  const clip = getClipState(mob, BASIC_CLIP_KEY);

  if (state.hintPlayingMobId === mobId && state.hintAudio) {
    stopHintAudio();
    refreshAdvancedPageUi();
    return;
  }

  state.hintLoadingMobId = mobId;
  state.recordNotice = "";
  refreshAdvancedPageUi();
  try {
    const url = await originalSoundUrlForMob(mob);
    if (!url) {
      state.recordNotice = `No original sound found for ${mob.mob}.`;
      return;
    }

    stopHintAudio();
    const audio = new Audio(url);
    state.hintAudio = audio;
    state.hintPlayingMobId = mobId;
    audio.onended = () => {
      stopHintAudio();
      refreshAdvancedPageUi();
    };
    await audio.play();
    const priorPlays = Number(clip.listenCount || 0);
    clip.listenCount = priorPlays + 1;
    clip.hasListened = true;
    clip.originalHintPlayCount = clip.listenCount;
    if (!clip.recording?.blob && priorPlays === 0) {
      clip.blindEligible = false;
    }
    const priorPenalizedListens = Math.min(Math.max(0, priorPlays - 1), ORIGINAL_REPLAY_PENALTY_CAP / ORIGINAL_REPLAY_PENALTY);
    if (priorPlays >= 1 && priorPenalizedListens < ORIGINAL_REPLAY_PENALTY_CAP / ORIGINAL_REPLAY_PENALTY) {
      applyScoreDelta(-ORIGINAL_REPLAY_PENALTY);
    }
  } catch (err) {
    state.recordNotice = `Could not play original sound for ${mob.mob}.`;
    logExport(`Hint playback failed for ${mobId}: ${String(err?.message || err)}`);
  } finally {
    state.hintLoadingMobId = null;
    refreshAdvancedPageUi();
  }
}

function toggleClipPreview(mob, clipKey = BASIC_CLIP_KEY) {
  const clip = getClipState(mob, clipKey);
  if (!clip?.recording?.url) return;
  const currentClipId = clipIdFor(mob, clipKey);
  if (state.previewClipId === currentClipId && state.previewAudio) {
    stopPreviewAudio();
    refreshAdvancedPageUi();
    return;
  }

  stopPreviewAudio();
  const audio = new Audio(clip.recording.url);
  state.previewAudio = audio;
  state.previewClipId = currentClipId;
  audio.onended = () => {
    state.previewAudio = null;
    state.previewClipId = null;
    refreshAdvancedPageUi();
  };
  audio.play().catch((err) => {
    logExport(`Preview playback failed for ${mob.id}/${clipKey}: ${String(err?.message || err)}`);
    stopPreviewAudio();
    refreshAdvancedPageUi();
  });
  refreshAdvancedPageUi();
}

async function startRecording(item, options = {}) {
  if (state.isRecording) return;
  if (!(await ensureMic())) {
    refreshAdvancedPageUi();
    return;
  }
  const { mob, clipKey } = item;
  const applyScoring = options.applyScoring !== false;
  const autoAccept = options.autoAccept === true;
  const clip = getClipState(mob, clipKey);
  const hadPriorRecording = Boolean(clip.recording?.blob);

  state.chunks = [];
  state.isRecording = true;
  state.recordingPeak = 0;
  state.recordingClipId = clipIdFor(mob, clipKey);
  const mimeType = pickMimeType();
  if (!mimeType) {
    state.isRecording = false;
    state.recordingClipId = null;
    state.busyMsg = "Recording unavailable: browser does not support required audio codecs.";
    logExport("Recording blocked: no supported MediaRecorder codec found.");
    refreshAdvancedPageUi();
    return;
  }
  state.recorder = new MediaRecorder(state.mediaStream, mimeType ? { mimeType } : undefined);
  if (hadPriorRecording) {
    clip.retryCount = Math.max(0, clip.retryCount || 0) + 1;
    if (applyScoring) {
      applyScoreDelta(-RETRY_PENALTY);
    }
  }
  const startAt = Date.now();
  const maxMs = maxRecordingMs(mob);
  state.recordingMaxMs = maxMs;
  state.recordingRemainingMs = maxMs;

  state.recorder.ondataavailable = (e) => {
    if (e.data.size > 0) state.chunks.push(e.data);
  };

  state.recorder.onstop = () => {
    const blob = new Blob(state.chunks, { type: state.recorder?.mimeType || mimeType || "audio/webm" });
    const recordingPeak = Number(state.recordingPeak || 0);
    const recordedSeconds = blob.size ? (Date.now() - startAt) / 1000 : 0;
    clearMeter();
    clearRecordingCountdown();
    const isBlankRecording =
      !blob.size || recordedSeconds < MIN_VALID_RECORDING_SECONDS || recordingPeak < MIN_VALID_RECORDING_PEAK;
    if (isBlankRecording) {
      state.recordNotice = "No voice was detected, so that recording was not saved.";
      state.isRecording = false;
      state.recordingClipId = null;
      setRecordingUiActive(false);
      refreshAdvancedPageUi();
      return;
    }
    if (state.previewClipId === clipIdFor(mob, clipKey)) stopPreviewAudio();
    if (clip.recording?.url) URL.revokeObjectURL(clip.recording.url);
    clip.recording = {
      sourceFormat: blob.type,
      blob,
      url: URL.createObjectURL(blob)
    };
    clip.takes = Math.max(0, clip.takes || 0) + 1;
    clip.accepted = autoAccept;
    clip.skipped = false;
    clip.seconds = recordedSeconds;
    if (applyScoring) {
      clip.hasListened = Number(clip.listenCount || 0) > 0;
      if (!hadPriorRecording) {
        clip.blindEligible = !clip.hasListened;
        clip.riskChipDismissed = true;
        if (clip.blindEligible && !clip.blindToastShown) {
          clip.blindToastShown = true;
          triggerBlindBonusToast();
        }
      }
    } else {
      clip.hasListened = true;
      clip.listenCount = Math.max(clip.listenCount || 0, 1);
      clip.blindEligible = false;
      clip.blindBonusAwarded = false;
      clip.pointsAwarded = true;
    }
    updateCompletedCount();
    state.recordNotice = "";
    state.isRecording = false;
    state.recordingClipId = null;
    setRecordingUiActive(false);
    refreshAdvancedPageUi();
    if (!blob.type.includes("ogg")) {
      convertClipRecordingToOgg(mob, clipKey).catch((err) => {
        console.error(err);
      });
    }
  };

  startMeter();
  startRecordingCountdown(maxMs);
  state.recorder.start();
  state.hasStartedRecording = true;
  setRecordingUiActive(true);
}

function stopRecording() {
  if (!state.recorder || !state.isRecording) return;
  // Flip state immediately on release so re-renders don't momentarily
  // re-apply the recording style before MediaRecorder.onstop fires.
  state.isRecording = false;
  state.recordingClipId = null;
  clearRecordingCountdown();
  setRecordingUiActive(false);
  try {
    state.recorder.stop();
  } catch (err) {
    console.warn("Recorder stop failed:", err);
  }
}

function setRecordingUiActive(isActive) {
  const recordBtn = document.querySelector("#record");
  if (recordBtn) {
    recordBtn.classList.toggle("recording", isActive);
    const label = recordBtn.querySelector(".record-pill-label") || recordBtn.querySelector("span");
    if (label) {
      const currentMob = state.mobs[state.recordIndex];
      const currentClip = currentMob ? getClipState(currentMob, activeClipKeyForMob()) : null;
      label.textContent = isActive ? "Stop Recording" : idleRecordButtonLabel(currentClip);
    }
  }
  updateRecordingIndicator();
}

function wireRecordToggle(button, item) {
  if (!button) return;
  button.onclick = async (ev) => {
    if (ev) ev.preventDefault();
    if (getClipState(item.mob, item.clipKey).converting) return;
    if (state.isRecording) {
      stopRecording();
      return;
    }
    await startRecording(item);
  };
}

async function convertClipRecordingToOgg(mob, clipKey = BASIC_CLIP_KEY) {
  const clip = getClipState(mob, clipKey);
  if (!clip?.recording?.blob) return;
  if (String(clip.recording.blob.type || "").includes("ogg")) return;
  if (clip.converting) return;

  clip.converting = true;
  state.busyMsg = "Converting recording to OGG...";
  logExport(`Converting ${mob.id}/${clipKey} immediately after recording...`);
  refreshAdvancedPageUi();

  try {
    const ogg = await toOgg(clip.recording.blob, `${mob.id}_${clipKey}`);
    if (state.previewClipId === clipIdFor(mob, clipKey)) stopPreviewAudio();
    if (clip.recording?.url) URL.revokeObjectURL(clip.recording.url);
    clip.recording = {
      sourceFormat: "audio/ogg",
      blob: ogg,
      url: URL.createObjectURL(ogg)
    };
    state.busyMsg = "";
    logExport(`Conversion complete for ${mob.id}/${clipKey}.`);
  } catch (err) {
    const msg = String(err?.message || err);
    state.busyMsg = "Could not convert this recording to OGG. Check log and retry.";
    logExport(`Immediate conversion failed for ${mob.id}/${clipKey}: ${msg}`);
    throw err;
  } finally {
    clip.converting = false;
    refreshAdvancedPageUi();
  }
}

function startRecordingCountdown(maxMs) {
  clearRecordingCountdown();
  const startedAt = Date.now();
  state.recordingMaxMs = maxMs;
  state.recordingRemainingMs = maxMs;
  updateRecordingIndicator();

  state.recordStopTimer = window.setTimeout(() => {
    if (state.isRecording) stopRecording();
  }, maxMs);

  state.recordCountdownTimer = window.setInterval(() => {
    const elapsed = Date.now() - startedAt;
    state.recordingRemainingMs = Math.max(0, maxMs - elapsed);
    updateRecordingIndicator();
  }, 50);
}

function clearRecordingCountdown() {
  if (state.recordCountdownTimer) {
    clearInterval(state.recordCountdownTimer);
    state.recordCountdownTimer = null;
  }
  if (state.recordStopTimer) {
    clearTimeout(state.recordStopTimer);
    state.recordStopTimer = null;
  }
  state.recordingMaxMs = 0;
  state.recordingRemainingMs = 0;
  updateRecordingIndicator();
}

function updateRecordingIndicator() {
  const maxMs = state.recordingMaxMs || 5000;
  const remainingMs = state.isRecording ? state.recordingRemainingMs : maxMs;
  const pct = Math.round((Math.max(0, remainingMs) / Math.max(1, maxMs)) * 100);
  const seconds = formatSeconds(remainingMs / 1000);

  const indicator = document.querySelector(".recording-indicator");
  if (indicator) indicator.classList.toggle("active", state.isRecording);

  const status = document.querySelector(".recording-status-text");
  if (status) status.textContent = state.isRecording ? "Recording now" : "Ready to record";

  const timeValue = document.querySelector(".recording-time-value");
  if (timeValue) timeValue.textContent = seconds;

  const ring = document.querySelector(".countdown-ring");
  if (ring) {
    ring.classList.toggle("active", state.isRecording);
    ring.style.setProperty("--ring-pct", String(pct));
  }
  const ringLabel = ring?.querySelector("span");
  if (ringLabel) ringLabel.textContent = seconds;
}

function startMeter() {
  if (!state.mediaStream) return;
  clearMeter();
  state.audioCtx = state.audioCtx || new AudioContext();
  state.meterSource = state.audioCtx.createMediaStreamSource(state.mediaStream);
  state.analyser = state.audioCtx.createAnalyser();
  state.analyser.fftSize = 2048;
  state.meterSource.connect(state.analyser);
  const data = new Uint8Array(state.analyser.frequencyBinCount);
  state.meterTimer = window.setInterval(() => {
    state.analyser.getByteTimeDomainData(data);
    let peak = 0;
    for (let i = 0; i < data.length; i += 1) {
      const v = Math.abs((data[i] - 128) / 128);
      if (v > peak) peak = v;
    }
    if (state.isRecording) {
      state.recordingPeak = Math.max(Number(state.recordingPeak || 0), peak);
    }
    state.meterPct = Math.min(100, Math.max(2, peak * 160));
    const fill = document.querySelector(".level-meter-fill");
    if (fill) fill.style.width = `${state.meterPct}%`;
  }, 100);
}

function clearMeter() {
  if (state.meterTimer) {
    clearInterval(state.meterTimer);
    state.meterTimer = null;
  }
  if (state.meterSource) {
    try {
      state.meterSource.disconnect();
    } catch {}
    state.meterSource = null;
  }
  if (state.analyser) {
    try {
      state.analyser.disconnect();
    } catch {}
    state.analyser = null;
  }
  state.meterPct = 0;
  state.recordingPeak = 0;
}

async function loadFfmpeg() {
  if (state.ffmpegLoaded) return;
  if (state.ffmpegLoadPromise) return state.ffmpegLoadPromise;

  state.ffmpegLoadPromise = (async () => {
    state.busyMsg = "Loading ffmpeg.wasm...";
    logExport("Loading ffmpeg libraries...");
    render();

    const providers = [
      {
        name: "jsdelivr-core",
        ffmpegModule: "https://cdn.jsdelivr.net/npm/@ffmpeg/ffmpeg@0.12.10/dist/esm/index.js",
        utilModule: "https://cdn.jsdelivr.net/npm/@ffmpeg/util@0.12.1/dist/esm/index.js",
        workerBase: "https://cdn.jsdelivr.net/npm/@ffmpeg/ffmpeg@0.12.10/dist/esm",
        coreBase: "https://cdn.jsdelivr.net/npm/@ffmpeg/core@0.12.6/dist/esm"
      },
      {
        name: "jsdelivr-core-st",
        ffmpegModule: "https://cdn.jsdelivr.net/npm/@ffmpeg/ffmpeg@0.12.10/dist/esm/index.js",
        utilModule: "https://cdn.jsdelivr.net/npm/@ffmpeg/util@0.12.1/dist/esm/index.js",
        workerBase: "https://cdn.jsdelivr.net/npm/@ffmpeg/ffmpeg@0.12.10/dist/esm",
        coreBase: "https://cdn.jsdelivr.net/npm/@ffmpeg/core-st@0.12.6/dist/esm"
      },
      {
        name: "unpkg-core",
        ffmpegModule: "https://unpkg.com/@ffmpeg/ffmpeg@0.12.10/dist/esm/index.js",
        utilModule: "https://unpkg.com/@ffmpeg/util@0.12.1/dist/esm/index.js",
        workerBase: "https://unpkg.com/@ffmpeg/ffmpeg@0.12.10/dist/esm",
        coreBase: "https://unpkg.com/@ffmpeg/core@0.12.6/dist/esm"
      },
      {
        name: "unpkg-core-st",
        ffmpegModule: "https://unpkg.com/@ffmpeg/ffmpeg@0.12.10/dist/esm/index.js",
        utilModule: "https://unpkg.com/@ffmpeg/util@0.12.1/dist/esm/index.js",
        workerBase: "https://unpkg.com/@ffmpeg/ffmpeg@0.12.10/dist/esm",
        coreBase: "https://unpkg.com/@ffmpeg/core-st@0.12.6/dist/esm"
      }
    ];

    let lastErr = null;

    for (let i = 0; i < providers.length; i += 1) {
      const provider = providers[i];
      let workerURL = "";
      let coreURL = "";
      let wasmURL = "";
      try {
        logExport(`Loading ffmpeg from ${provider.name} (${i + 1}/${providers.length})...`);
        const [{ FFmpeg }, util] = await Promise.all([
          import(provider.ffmpegModule),
          import(provider.utilModule)
        ]);

        const ffmpeg = new FFmpeg();
        ffmpeg.on("log", ({ message }) => {
          if (message === "Aborted()") return;
          state.exportLog = message;
          logExport(`ffmpeg: ${message}`);
        });

        workerURL = await buildFfmpegWorkerBlobURL(provider.workerBase);
        coreURL = await util.toBlobURL(`${provider.coreBase}/ffmpeg-core.js`, "text/javascript");
        wasmURL = await util.toBlobURL(`${provider.coreBase}/ffmpeg-core.wasm`, "application/wasm");
        logExport("Starting ffmpeg.load()...");
        await Promise.race([
          ffmpeg.load({ classWorkerURL: workerURL, workerURL, coreURL, wasmURL }),
          new Promise((_, reject) => {
            window.setTimeout(() => reject(new Error("ffmpeg load timeout (120s)")), 120000);
          })
        ]);

        state.ffmpeg = ffmpeg;
        state.ffmpegUtil = util;
        state.ffmpegLoaded = true;
        logExport(`ffmpeg loaded from ${provider.name}.`);
        return;
      } catch (err) {
        lastErr = err;
        logExport(`ffmpeg init failed from ${provider.name}: ${String(err?.message || err)}`);
      } finally {
        if (workerURL) URL.revokeObjectURL(workerURL);
        if (coreURL) URL.revokeObjectURL(coreURL);
        if (wasmURL) URL.revokeObjectURL(wasmURL);
      }
    }

    throw new Error(
      `Could not initialize ffmpeg for conversion (${String(lastErr?.message || lastErr)}). ` +
        "Make sure you're running from a local server and that CDN requests are not blocked."
    );
  })();

  try {
    await state.ffmpegLoadPromise;
  } finally {
    state.ffmpegLoadPromise = null;
  }
}

async function fetchText(url) {
  const res = await fetch(url);
  if (!res.ok) throw new Error(`Failed to fetch ${url}: ${res.status}`);
  return res.text();
}

async function buildFfmpegWorkerBlobURL(workerBase) {
  logExport("Fetching ffmpeg worker dependencies...");
  const [workerSrc, constSrc, errorsSrc] = await Promise.all([
    fetchText(`${workerBase}/worker.js`),
    fetchText(`${workerBase}/const.js`),
    fetchText(`${workerBase}/errors.js`)
  ]);

  const workerNoImports = workerSrc.replace(/^import\s+[^;]+;\s*$/gm, "");
  const blob = new Blob([`${errorsSrc}\n${constSrc}\n${workerNoImports}`], { type: "text/javascript" });
  return URL.createObjectURL(blob);
}

async function toOgg(blob, id) {
  if (String(blob?.type || "").includes("ogg")) {
    logExport(`Using existing OGG for ${id}; skipping ffmpeg mastering.`);
    return blob;
  }

  logExport(`Mastering ${id} from ${blob.type || "unknown"} to audio/ogg...`);
  await loadFfmpeg();
  const ffmpeg = state.ffmpeg;
  const { fetchFile } = state.ffmpegUtil;
  const safeId = String(id || "clip").replace(/[^a-z0-9_-]/gi, "_");
  const inputExt = blob.type.includes("webm") ? "webm" : blob.type.includes("mp4") ? "m4a" : "dat";
  const inputFile = `in_${safeId}.${inputExt}`;
  const outputFile = `out_${safeId}.ogg`;
  const masterFilter =
    "highpass=f=80," +
    "acompressor=threshold=-20dB:ratio=2.5:attack=8:release=120:makeup=3," +
    "loudnorm=I=-18:TP=-2:LRA=8," +
    "alimiter=limit=-1.5dB";

  try {
    await ffmpeg.writeFile(inputFile, await fetchFile(blob));
    await ffmpeg.exec([
      "-y",
      "-i",
      inputFile,
      "-vn",
      "-af",
      masterFilter,
      "-c:a",
      "libvorbis",
      "-q:a",
      "4",
      outputFile
    ]);
    const data = await ffmpeg.readFile(outputFile);
    if (!data?.length) throw new Error("ffmpeg produced empty output");
    return new Blob([data], { type: "audio/ogg" });
  } finally {
    try {
      await ffmpeg.deleteFile(inputFile);
    } catch {}
    try {
      await ffmpeg.deleteFile(outputFile);
    } catch {}
  }
}

function sanitizePackName(s) {
  return s.replace(/[^a-z0-9-_ ]/gi, "").trim().replace(/\s+/g, "_") || "MobVoiceOver";
}

async function buildAndDownloadPack() {
  const recorded = recordItems()
    .map((item) => ({ ...item, clip: getClipState(item.mob, item.clipKey) }))
    .filter((entry) => entry.clip.accepted && entry.clip.recording?.blob);
  if (!recorded.length) {
    state.busyMsg = "No accepted recordings to export.";
    return;
  }

  try {
    state.busyMsg = "Preparing audio conversion...";
    state.exportLog = "";
    state.exportLogs = [];
    logExport("Starting export build.");
    logExport(`Recorded mobs: ${recorded.length}`);
    render();

    const zip = new JSZip();
    const meta = packMetaForExport();
    zip.file(
      "pack.mcmeta",
      JSON.stringify(
        {
          pack: meta.pack
        },
        null,
        2
      )
    );
    const packIconRes = await fetch("public/assets/pack_placeholder.png");
    if (!packIconRes.ok) throw new Error(`Failed to load pack icon: ${packIconRes.status}`);
    zip.file("pack.png", await packIconRes.blob());

    const soundsJson = {};

    for (let i = 0; i < recorded.length; i += 1) {
      const entry = recorded[i];
      const { mob, clip } = entry;
      const label = mob.id;
      state.busyMsg = `Converting ${i + 1}/${recorded.length}: ${label}`;
      logExport(`Processing clip ${i + 1}/${recorded.length}: ${label}`);
      render();

      const targetSoundPath = `mobvoices/${mob.id}/voice`;
      const ogg = await toOgg(clip.recording.blob, label);
      zip.file(`assets/minecraft/sounds/${targetSoundPath}.ogg`, ogg);
      logExport(`Wrote ${targetSoundPath}.ogg`);

      const soundEventKeys = resolveSoundEventKeysForMob(mob);
      mob.soundEventKeys = soundEventKeys;
      soundEventKeys.forEach((eventKey) => {
        soundsJson[eventKey] = {
          replace: true,
          sounds: [{ name: targetSoundPath, stream: false }]
        };
      });
    }

    zip.file("assets/minecraft/sounds.json", JSON.stringify(soundsJson, null, 2));

    state.busyMsg = "Compressing zip...";
    logExport("Compressing zip...");
    render();
    const blob = await zip.generateAsync({ type: "blob", compression: "DEFLATE", compressionOptions: { level: 6 } });

    const fileName = `${sanitizePackName(RESOURCE_PACK_NAME)}.zip`;
    const href = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = href;
    a.download = fileName;
    a.click();
    URL.revokeObjectURL(href);

    state.lastZipName = fileName;
    state.busyMsg = "Export complete.";
    state.exportLog = "";
    logExport(`Export complete: ${fileName}`);
  } catch (err) {
    state.busyMsg = "Export failed. See log/console for details.";
    state.exportLog = String(err?.message || err);
    logExport(`Export failed: ${state.exportLog}`);
    console.error(err);
  }
}

async function downloadRawRecordings() {
  const recorded = recordItems()
    .map((item) => ({ ...item, clip: getClipState(item.mob, item.clipKey) }))
    .filter((entry) => entry.clip.accepted && entry.clip.recording?.blob);
  if (!recorded.length) return;

  try {
    state.busyMsg = "Preparing raw recordings zip...";
    render();
    const zip = new JSZip();
    const manifest = {
      schemaVersion: 1,
      exportedAt: new Date().toISOString(),
      app: "Mob Voice Over",
      clips: []
    };
    for (let i = 0; i < recorded.length; i += 1) {
      const entry = recorded[i];
      const { mob, clip } = entry;
      const label = mob.id;
      state.busyMsg = `Preparing ${i + 1}/${recorded.length}: ${label}`;
      render();

      const ogg = await toOgg(clip.recording.blob, label);
      const file = `raw/${mob.id}.ogg`;
      zip.file(file, ogg);
      const manifestClip = {
        mob: mob.id,
        mimeType: "audio/ogg",
        file,
        soundEventKeys: resolveSoundEventKeysForMob(mob)
      };
      manifest.clips.push(manifestClip);
    }
    zip.file("raw/manifest.json", JSON.stringify(manifest, null, 2));
    const blob = await zip.generateAsync({ type: "blob", compression: "DEFLATE", compressionOptions: { level: 6 } });
    const href = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = href;
    a.download = "MobVoiceOver_raw_recordings.zip";
    a.click();
    URL.revokeObjectURL(href);
    state.busyMsg = "Raw recordings downloaded.";
    logExport("Raw recordings zip exported.");
    render();
  } catch (err) {
    state.busyMsg = "Raw recording export failed. See log for details.";
    state.exportLog = String(err?.message || err);
    logExport(`Raw recording export failed: ${state.exportLog}`);
    console.error(err);
    render();
  }
}

function parseRawManifest(text) {
  try {
    const json = JSON.parse(text);
    if (Array.isArray(json)) return json;
    if (Array.isArray(json?.clips)) return json.clips;
  } catch {}
  return null;
}

function mobIdFromRawPath(path) {
  const m = String(path || "").match(/^raw\/([^/]+)\.[^/.]+$/i);
  return m ? m[1] : "";
}

async function blobDurationSeconds(blob) {
  const url = URL.createObjectURL(blob);
  try {
    const audio = new Audio();
    const duration = await new Promise((resolve) => {
      const fail = () => resolve(0);
      audio.preload = "metadata";
      audio.onloadedmetadata = () => resolve(Number(audio.duration) || 0);
      audio.onerror = fail;
      audio.src = url;
    });
    return Number.isFinite(duration) && duration > 0 ? duration : 0;
  } finally {
    URL.revokeObjectURL(url);
  }
}

async function importRawRecordingsZip(file, options = {}) {
  const goToExport = Boolean(options.goToExport);
  try {
    state.busyMsg = "";
    logExport(`Importing raw recordings from ${file.name}...`);
    render();

    stopPreviewAudio();
    const zip = await JSZip.loadAsync(file);
    const manifestFile = zip.file("raw/manifest.json");
    const manifestEntries = manifestFile ? parseRawManifest(await manifestFile.async("string")) : null;
    const candidates = [];
    const seen = new Set();

    if (manifestEntries?.length) {
      for (let i = 0; i < manifestEntries.length; i += 1) {
        const entry = manifestEntries[i];
        const filePath = String(entry?.file || "");
        const mobId = normalizeMobId(entry?.mob || mobIdFromRawPath(filePath));
        if (!filePath || !mobId) continue;
        const zipEntry = zip.file(filePath);
        if (!zipEntry || seen.has(mobId)) continue;
        candidates.push({
          mobId,
          zipEntry,
          mimeType: String(entry?.mimeType || ""),
          soundEventKeys: Array.isArray(entry?.soundEventKeys) ? entry.soundEventKeys : null
        });
        seen.add(mobId);
      }
    }

    if (!candidates.length) {
      zip.forEach((relativePath, zipEntry) => {
        if (zipEntry.dir || !relativePath.startsWith("raw/") || relativePath === "raw/manifest.json") return;
        const mobId = normalizeMobId(mobIdFromRawPath(relativePath));
        if (!mobId || seen.has(mobId)) return;
        candidates.push({ mobId, zipEntry, mimeType: "" });
        seen.add(mobId);
      });
    }

    if (!candidates.length) {
      logExport("Import skipped: no raw recordings found.");
      render();
      return;
    }

    let imported = 0;
    for (let i = 0; i < candidates.length; i += 1) {
      const c = candidates[i];
      let mob = state.mobs.find((m) => m.id === c.mobId);
      if (!mob) {
        const mobDef = createMobDefinition(c.mobId, {
          soundEventKeys: c.soundEventKeys?.length ? c.soundEventKeys : undefined
        });
        mob = hydrateMobEntry(mobDef);
        state.mobs.push(mob);
      }

      logExport(`Importing ${i + 1}/${candidates.length}: ${c.mobId}`);
      render();
      const blob = await c.zipEntry.async("blob");
      const typedBlob = blob.type ? blob : new Blob([blob], { type: c.mimeType || "application/octet-stream" });
      const seconds = await blobDurationSeconds(typedBlob);
      const clip = getClipState(mob, BASIC_CLIP_KEY);
      if (clip.recording?.url) URL.revokeObjectURL(clip.recording.url);
      clip.recording = {
        sourceFormat: typedBlob.type || c.mimeType || "application/octet-stream",
        blob: typedBlob,
        url: URL.createObjectURL(typedBlob)
      };
      clip.seconds = seconds;
      clip.accepted = true;
      clip.skipped = false;
      clip.converting = false;
      clip.takes = Math.max(clip.takes || 0, 1);
      clip.retryCount = Math.max(clip.retryCount || 0, Math.max(0, clip.takes - 1));
      clip.listenCount = Math.max(clip.listenCount || 0, 1);
      clip.hasListened = true;
      clip.blindEligible = false;
      clip.blindBonusAwarded = false;
      clip.pointsAwarded = true;
      imported += 1;
    }

    logExport(`Import complete: ${imported} recording(s) loaded.`);
    updateCompletedCount();
    if (goToExport && imported > 0) {
      advanceToReveal();
    }
    render();
  } catch (err) {
    state.busyMsg = "";
    state.exportLog = String(err?.message || err);
    logExport(`Import failed: ${state.exportLog}`);
    console.error(err);
    render();
  }
}

function escapeHtml(text) {
  return String(text)
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#39;");
}

boot()
  .then(() => {
    primeMicPermission();
  })
  .catch((err) => {
    console.error(err);
    app.innerHTML = `<section class="sheet"><p>Failed to load app: ${escapeHtml(String(err.message || err))}</p><footer class="app-footer">Made with ❤️ by ActualPug</footer></section>`;
  });
