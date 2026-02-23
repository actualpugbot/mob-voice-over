const app = document.getElementById("app");

const PACK_NAME = "Mob Voice Over";
const PACK_DESCRIPTION = "Mob voices recorded with Mob Voice Over";
const DEFAULT_PACK_FORMAT = 75;
const DEFAULT_MOB_IMAGE = "public/assets/mobs/unknown_mob.png";
const DEFAULT_MOB_SET_ID = "basic";
const BASIC_CLIP_KEY = "__mob_default__";
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
const KNOWN_MOB_IDS = Object.freeze([...new Set([...VANILLA_MOB_IDS, ...EXTRA_MOB_IDS])]);
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
  "fox",
  "ghast",
  "glow_squid",
  "goat",
  "guardian",
  "hoglin",
  "horse",
  "magma_cube",
  "panda",
  "phantom",
  "polar_bear",
  "pufferfish",
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
const LOCAL_MOB_SOUND_LIBRARY_PATH = "public/assets/mob_sounds/index.json";
const originalSoundUrlCache = new Map();

const state = {
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
  meterTimer: null,
  analyser: null,
  audioCtx: null,
  recordCountdownTimer: null,
  recordStopTimer: null,
  holdReleaseStopTimer: null,
  recordingMaxMs: 0,
  recordingRemainingMs: 0,
  holdActive: false,
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
  mobSoundLibrary: null,
  showAddMobPanel: false,
  addMobInput: "",
  recordNotice: ""
};

function createClipState() {
  return {
    recording: null,
    accepted: false,
    seconds: 0,
    converting: false
  };
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
  const entry = library[mobId];
  const files = Array.isArray(entry?.files) ? entry.files : [];
  const url = String(entry?.default || files[0] || "").trim();
  originalSoundUrlCache.set(mobId, url);
  return url;
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

function parseMobInput(rawInput) {
  const clean = normalizeMobId(rawInput);
  if (!clean) return null;
  const option = allMobOptions().find((m) => m.id === clean);
  return {
    id: clean,
    mob: option?.label || toTitleCase(clean)
  };
}

function vanillaMobCoverageCount() {
  const currentIds = new Set(state.mobs.map((mob) => normalizeMobId(mob.id)));
  return VANILLA_MOB_IDS.reduce((count, id) => (currentIds.has(id) ? count + 1 : count), 0);
}

function knownMobCoverageCount() {
  const currentIds = new Set(state.mobs.map((mob) => normalizeMobId(mob.id)));
  return KNOWN_MOB_IDS.reduce((count, id) => (currentIds.has(id) ? count + 1 : count), 0);
}

function hasAllVanillaMobs() {
  return vanillaMobCoverageCount() >= TOTAL_VANILLA_MOBS;
}

function hasAllKnownMobs() {
  return knownMobCoverageCount() >= KNOWN_MOB_IDS.length;
}

const el = (html) => {
  const t = document.createElement("template");
  t.innerHTML = html.trim();
  return t.content.firstElementChild;
};

async function boot() {
  const [configRes, soundLibraryRes] = await Promise.all([
    fetch("public/mob_config.json"),
    fetch(LOCAL_MOB_SOUND_LIBRARY_PATH).catch(() => null)
  ]);
  state.config = await configRes.json();
  state.mobSoundLibrary = soundLibraryRes && soundLibraryRes.ok ? await soundLibraryRes.json() : null;
  state.mobs = resolveMobSet(DEFAULT_MOB_SET_ID);
  render();
}

function resolveMobSet(setId) {
  const set = state.config.mobSets[setId];
  if (!set) return [];
  const base = set.extends ? resolveMobSet(set.extends) : [];
  return [...base, ...(set.mobs || [])].map((mob) => hydrateMobEntry(mob));
}

function resetWorkflow() {
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
  state.showAddMobPanel = false;
  state.addMobInput = "";
  state.recordNotice = "";
}

function baseMobCount() {
  return resolveMobSet(DEFAULT_MOB_SET_ID).length;
}

function appendMobAfterBaseSet(mob) {
  const insertAt = Math.max(baseMobCount(), state.mobs.length);
  state.mobs.splice(insertAt, 0, mob);
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
    return;
  }

  const existing = new Set(state.mobs.map((mob) => normalizeMobId(mob.id)));
  const optionsById = new Map(allMobOptions().map((opt) => [opt.id, opt.label]));
  let added = 0;

  for (let i = 0; i < normalizedIds.length; i += 1) {
    const id = normalizedIds[i];
    if (existing.has(id)) continue;
    const label = optionsById.get(id) || toTitleCase(id);
    appendMobAfterBaseSet(hydrateMobEntry(createMobDefinition(id, { mob: label })));
    existing.add(id);
    added += 1;
  }

  if (added > 0) {
    state.recordNotice = `Added ${added} mob(s) after the starter mobs.`;
  } else {
    state.recordNotice = "Those mobs are already in your list.";
  }
}

function maxRecordingMs(mob) {
  return 5000;
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

function render() {
  app.innerHTML = "";
  const page = el(`<section class="sheet"></section>`);

  page.insertAdjacentHTML(
    "beforeend",
    `<header class="titlebar">
      <div class="wood-sign">
        <h1>${PACK_NAME}</h1>
      </div>
    </header>`
  );

  if (state.step === 0) renderRecord(page);
  if (state.step === 1) renderExport(page);

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

  const done = allItems.filter((entry) => getClipState(entry.mob, entry.clipKey).accepted).length;
  const pct = Math.round((done / allItems.length) * 100);
  const maxMs = maxRecordingMs(mob);
  const maxSec = Math.round(maxMs / 1000);
  const isLastMob = state.recordIndex === state.mobs.length - 1;
  const clipSec = Math.max(0, clip.seconds || 0);
  const clipTimeLabel = `${Math.floor(clipSec / 60)}:${String(Math.floor(clipSec % 60)).padStart(2, "0")}`;
  const maxTimeLabel = `${Math.floor(maxSec / 60)}:${String(maxSec % 60).padStart(2, "0")}`;
  const hintMobId = normalizeMobId(mob.id);
  const hintPlaying = state.hintPlayingMobId === hintMobId && Boolean(state.hintAudio);
  const hintLoading = state.hintLoadingMobId === hintMobId;
  const mobOptions = allMobOptions();
  const existingMobIds = new Set(state.mobs.map((m) => normalizeMobId(m.id)));
  const canAddMoreMobs = !hasAllKnownMobs();
  if (!canAddMoreMobs && state.showAddMobPanel) {
    state.showAddMobPanel = false;
  }

  root.insertAdjacentHTML(
    "beforeend",
    `<section class="panel panel-record">
      <input id="raw-import-first" type="file" accept=".zip,application/zip" hidden />
      <div class="progress-wrap">
        <div class="progress-track"><div class="progress-fill" style="width:${pct}%"></div></div>
        <p class="note">${done}/${allItems.length} complete</p>
      </div>
      <div class="record-stage">
        <figure class="mob-card single">
          <img alt="${escapeHtml(mob.mob)}" src="${escapeHtml(mob.image)}" referrerpolicy="no-referrer" />
          <button
            id="play-original-hint"
            class="hint-corner-btn ${hintPlaying ? "playing" : ""}"
            ${hintLoading ? "disabled" : ""}
            title="play original sound"
            aria-label="${hintPlaying ? "Stop original mob sound" : "Play original mob sound"}"
          >▶</button>
        </figure>
        <div class="record-stage-main">
          <div class="mob-card-copy">
            <h3 class="nameplate">${escapeHtml(mob.mob)} <span class="nameplate-count">(${state.recordIndex + 1}/${state.mobs.length})</span></h3>
          </div>
          <div class="record-cta-wrap">
            <button id="record" class="record-pill-btn ${state.isRecording ? "recording" : ""}" ${clip.converting ? "disabled" : ""}>
              <span class="record-pill-icon" aria-hidden="true">🎙</span>
              <span class="record-pill-label">${state.isRecording ? "Release to Stop" : "Hold to Record"}</span>
            </button>
            <div class="aux-buttons">
              <button
                id="preview-recording"
                class="play-triangle-btn ${state.previewClipId === item.clipId && state.previewAudio ? "playing" : ""}"
                ${!clip.recording?.url || state.isRecording || clip.converting ? "disabled" : ""}
                aria-label="${state.previewClipId === item.clipId && state.previewAudio ? "Stop playback" : "Play recording"}"
              ><span class="play-icon" aria-hidden="true"></span></button>
              <button id="skip-circle" class="skip-circle-btn" ${state.isRecording || clip.converting ? "disabled" : ""}>Skip</button>
            </div>
          </div>
        </div>
      </div>
      <div class="meter-row meter-row-time">
        <span class="play-hint">${clipTimeLabel} / ${maxTimeLabel}</span>
        <span class="note">Max ${maxSec}s</span>
      </div>
      <div class="level-meter segmented"><div class="level-meter-fill" style="width:${state.meterPct}%"></div></div>
      ${
        state.micStatus !== "ready"
          ? `<div class="stack">
        <p class="note">${
          state.micStatus === "denied"
            ? "Microphone access is blocked. Enable it in your browser permissions, then retry."
            : "Enable microphone now so you are prompted before recording."
        }</p>
        <button id="enable-mic" class="ghost-btn" ${state.isRecording ? "disabled" : ""}>Enable Microphone</button>
      </div>`
          : ""
      }
      ${clip.converting ? '<p class="note">Converting recording to OGG...</p>' : ""}
      <div class="pager">
        <button id="prev" class="chunky-btn" ${state.recordIndex === 0 || state.isRecording ? "disabled" : ""}>◀ Previous</button>
        <button id="next" class="chunky-btn" ${(clip.recording || clip.accepted) && !state.isRecording && !clip.converting ? "" : "disabled"}>${isLastMob ? "Done" : "Next ▶"}</button>
      </div>
      <button id="import-raw-first-btn" class="ghost-btn" ${state.isRecording ? "disabled" : ""}>Import Raw Recordings</button>
      ${
        canAddMoreMobs || state.recordNotice
          ? `<div class="stack">
          ${
            canAddMoreMobs
              ? `<button id="toggle-add-mob" class="text-link-btn" ${state.isRecording || clip.converting ? "disabled" : ""}>Missing a mob? Add it!</button>`
              : ""
          }
          ${
            canAddMoreMobs && state.showAddMobPanel
              ? `<form id="add-mob-form" class="add-mob-form">
              <label>Quick pick mobs</label>
              <div class="mob-checklist" id="mob-checklist">
                ${mobOptions
                  .map(
                    (opt) => `<label class="mob-check-item ${existingMobIds.has(opt.id) ? "is-existing" : ""}">
                    <input type="checkbox" name="mob-quick-pick" value="${escapeHtml(opt.id)}" ${existingMobIds.has(opt.id) ? "disabled" : ""} />
                    <span>${escapeHtml(opt.label)}</span>
                    ${existingMobIds.has(opt.id) ? '<span class="note">Added</span>' : ""}
                  </label>`
                  )
                  .join("")}
              </div>
              <p class="note">Pick one or more mobs, then add the selection.</p>
              <div class="add-mob-actions">
                <button type="submit" class="ghost-btn">Add Selected</button>
                <button type="button" id="add-all-mobs" class="ghost-btn">Add All Mobs</button>
              </div>
            </form>`
              : ""
          }
          ${state.recordNotice ? `<p class="note">${escapeHtml(state.recordNotice)}</p>` : ""}
        </div>`
          : ""
      }
    </section>`
  );

  const previewBtn = root.querySelector("#preview-recording");
  if (previewBtn) {
    previewBtn.onclick = () => {
      toggleClipPreview(mob, item.clipKey);
    };
  }
  const hintBtn = root.querySelector("#play-original-hint");
  if (hintBtn) {
    hintBtn.onclick = async () => {
      await toggleOriginalHintForMob(mob);
    };
  }
  const mobImg = root.querySelector(".mob-card.single img");
  if (mobImg) {
    wireMobImageFallback(mobImg, mob.id, mob.image);
  }

  const micBtn = root.querySelector("#enable-mic");
  if (micBtn) {
    micBtn.onclick = async () => {
      await ensureMic();
      render();
    };
  }

  wireHoldToRecord(root.querySelector("#record"), item);
  root.querySelector("#import-raw-first-btn").onclick = () => {
    root.querySelector("#raw-import-first").click();
  };
  root.querySelector("#raw-import-first").onchange = async (ev) => {
    const file = ev.target.files?.[0];
    ev.target.value = "";
    if (!file) return;
    await importRawRecordingsZip(file, { goToExport: true });
  };
  const toggleAddMobBtn = root.querySelector("#toggle-add-mob");
  if (toggleAddMobBtn) {
    toggleAddMobBtn.onclick = () => {
      state.showAddMobPanel = !state.showAddMobPanel;
      if (!state.showAddMobPanel) state.addMobInput = "";
      state.recordNotice = "";
      render();
    };
  }
  const addMobForm = root.querySelector("#add-mob-form");
  if (addMobForm) {
    addMobForm.onsubmit = (ev) => {
      ev.preventDefault();
      const selected = [...addMobForm.querySelectorAll('input[name="mob-quick-pick"]:checked')].map(
        (input) => input.value
      );
      addSelectedMobs(selected);
      state.showAddMobPanel = false;
      state.addMobInput = "";
      render();
    };
    root.querySelector("#add-all-mobs").onclick = () => {
      addAllVanillaMobs();
      state.showAddMobPanel = false;
      state.addMobInput = "";
      render();
    };
  }
  root.querySelector("#prev").onclick = () => {
    if (state.isRecording) return;
    stopHintAudio();
    state.recordIndex = Math.max(0, state.recordIndex - 1);
    render();
  };
  root.querySelector("#next").onclick = () => {
    if (state.isRecording) return;
    stopHintAudio();
    clip.accepted = true;
    if (isLastMob) {
      state.step = 1;
    } else {
      state.recordIndex = Math.min(state.mobs.length - 1, state.recordIndex + 1);
    }
    render();
  };
  const basicSkipBtn = root.querySelector("#skip-circle");
  if (basicSkipBtn) {
    basicSkipBtn.onclick = () => {
      if (state.isRecording || clip.converting) return;
      stopHintAudio();
      clip.accepted = true;
      if (isLastMob) {
        state.step = 1;
      } else {
        state.recordIndex = Math.min(state.mobs.length - 1, state.recordIndex + 1);
      }
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
  const skipped = items.filter((entry) => {
    const clip = getClipState(entry.mob, entry.clipKey);
    return clip.accepted && !clip.recording?.blob;
  }).length;
  const missing = items.filter((entry) => !getClipState(entry.mob, entry.clipKey).accepted).length;
  const nonOggCount = ready.filter((entry) => {
    const clip = getClipState(entry.mob, entry.clipKey);
    return !String(clip.recording?.blob?.type || "").includes("ogg");
  }).length;
  const logText = state.exportLogs.join("\n") || state.exportLog;
  const showLogOpen = /failed|error/i.test(`${state.busyMsg} ${state.exportLog}`);
  const isReady = missing === 0;
  const headline = isReady ? "Your Voice Pack is Ready!" : "Your Voice Pack Needs Attention";

  root.insertAdjacentHTML(
    "beforeend",
    `<section class="panel panel-export">
      <div class="export-hero">
        <div class="ready-badge" aria-hidden="true">&#10003;</div>
        <h2 class="export-headline">${headline}</h2>
        <div class="export-pack-card">
          <h3>Custom Mob Voice Pack</h3>
          <p class="note">Compatible with Minecraft Java resource packs</p>
          <div class="export-actions">
            <button id="build" class="export-primary-btn" ${ready.length ? "" : "disabled"}>Download Resource Pack</button>
            <button id="guide" class="export-secondary-btn">Installation Guide</button>
          </div>
          <div class="export-tertiary-actions">
            <button id="raw" class="ghost-btn" ${ready.length ? "" : "disabled"}>Download Raw Recordings</button>
            <button id="import" class="ghost-btn">Import Raw Recordings</button>
            ${hasAllKnownMobs() ? "" : '<button id="add-more-mobs" class="ghost-btn">Add a Mob</button>'}
          </div>
        </div>
        ${
          nonOggCount > 0
            ? `<p class="warn-note">${nonOggCount} clip(s) will be converted to OGG during export (first export may take longer).</p>`
            : ""
        }
        <div class="export-bottom-row">
          <button id="restart" class="ghost-btn">Back to Home</button>
          <button id="start-over" class="ghost-btn">Start Over</button>
        </div>
        <p id="busy" class="note"></p>
      </div>
      <input id="raw-import" type="file" accept=".zip,application/zip" hidden />
      <details class="install-details">
        <summary>Install Instructions</summary>
        <div id="instructions" class="stack"></div>
      </details>
      <details class="log-details">
        <summary>Mob Status (${ready.length} ready${skipped ? ` • ${skipped} skipped` : ""}${missing ? ` • ${missing} missing` : ""})</summary>
        <div class="mob-grid" id="mob-list"></div>
      </details>
      <details class="log-details" ${showLogOpen ? "open" : ""}>
        <summary>Technical log (only needed if something breaks)</summary>
        <pre id="log" class="note log-box"></pre>
      </details>
    </section>`
  );

  root.querySelector("#build").onclick = async () => {
    await buildAndDownloadPack();
    render();
  };
  root.querySelector("#guide").onclick = () => {
    const details = root.querySelector(".install-details");
    if (details) {
      details.open = true;
      details.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  };
  root.querySelector("#raw").onclick = async () => {
    await downloadRawRecordings();
  };
  root.querySelector("#import").onclick = () => {
    root.querySelector("#raw-import").click();
  };
  const addMoreMobsBtn = root.querySelector("#add-more-mobs");
  if (addMoreMobsBtn) {
    addMoreMobsBtn.onclick = () => {
      state.step = 0;
      state.showAddMobPanel = true;
      state.recordNotice = "";
      render();
    };
  }
  root.querySelector("#restart").onclick = () => {
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

  const list = root.querySelector("#mob-list");
  state.mobs.forEach((mob, idx) => {
    const item = el(`<article class="mob-tile"></article>`);
    const clip = getClipState(mob, BASIC_CLIP_KEY);
    const hasMissing = !clip.accepted;
    const hasSkipped = clip.accepted && !clip.recording?.blob;
    const playbackClipKey = BASIC_CLIP_KEY;
    const playbackClip = getClipState(mob, playbackClipKey);
    const canPlay = Boolean(playbackClip.recording?.url);
    const isPlaying = state.previewClipId === clipIdFor(mob, playbackClipKey);
    const status = hasMissing ? "Missing" : hasSkipped ? "Skipped" : "Ready";
    const statusText = status;
    const statusClass =
      status === "Ready" ? "status-ready" : status === "Skipped" ? "status-skipped" : "status-missing";
    item.innerHTML = `<button class="mob-tile-main" type="button">
        <span class="mob-tile-name">${escapeHtml(mob.mob)}</span>
        <span class="mob-tile-status ${statusClass}">${escapeHtml(statusText)}</span>
      </button>
      <button class="tiny-btn mob-play-btn" type="button" ${canPlay ? "" : "disabled"}>${isPlaying ? "Stop" : "Play"}</button>`;
    item.querySelector(".mob-tile-main").onclick = () => {
      setRecordIndexForMob(state.mobs[idx].id);
      state.step = 0;
      render();
    };
    item.querySelector(".mob-play-btn").onclick = () => {
      toggleClipPreview(mob, playbackClipKey);
    };
    list.appendChild(item);
  });

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

async function ensureMic() {
  if (state.mediaStream) return true;
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

  if (state.hintPlayingMobId === mobId && state.hintAudio) {
    stopHintAudio();
    render();
    return;
  }

  state.hintLoadingMobId = mobId;
  state.recordNotice = "";
  render();
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
      render();
    };
    await audio.play();
  } catch (err) {
    state.recordNotice = `Could not play original sound for ${mob.mob}.`;
    logExport(`Hint playback failed for ${mobId}: ${String(err?.message || err)}`);
  } finally {
    state.hintLoadingMobId = null;
    render();
  }
}

function toggleClipPreview(mob, clipKey = BASIC_CLIP_KEY) {
  const clip = getClipState(mob, clipKey);
  if (!clip?.recording?.url) return;
  const currentClipId = clipIdFor(mob, clipKey);
  if (state.previewClipId === currentClipId && state.previewAudio) {
    stopPreviewAudio();
    render();
    return;
  }

  stopPreviewAudio();
  const audio = new Audio(clip.recording.url);
  state.previewAudio = audio;
  state.previewClipId = currentClipId;
  audio.onended = () => {
    state.previewAudio = null;
    state.previewClipId = null;
    render();
  };
  audio.play().catch((err) => {
    logExport(`Preview playback failed for ${mob.id}/${clipKey}: ${String(err?.message || err)}`);
    stopPreviewAudio();
    render();
  });
  render();
}

async function startRecording(item) {
  if (state.isRecording) return;
  if (!(await ensureMic())) {
    render();
    return;
  }
  const { mob, clipKey } = item;
  const clip = getClipState(mob, clipKey);

  state.chunks = [];
  state.isRecording = true;
  const mimeType = pickMimeType();
  if (!mimeType) {
    state.isRecording = false;
    state.busyMsg = "Recording unavailable: browser does not support required audio codecs.";
    logExport("Recording blocked: no supported MediaRecorder codec found.");
    render();
    return;
  }
  state.recorder = new MediaRecorder(state.mediaStream, mimeType ? { mimeType } : undefined);
  const startAt = Date.now();
  const maxMs = maxRecordingMs(mob);
  state.recordingMaxMs = maxMs;
  state.recordingRemainingMs = maxMs;

  state.recorder.ondataavailable = (e) => {
    if (e.data.size > 0) state.chunks.push(e.data);
  };

  state.recorder.onstop = () => {
    const blob = new Blob(state.chunks, { type: state.recorder.mimeType || "audio/webm" });
    clearMeter();
    clearRecordingCountdown();
    if (state.previewClipId === clipIdFor(mob, clipKey)) stopPreviewAudio();
    if (clip.recording?.url) URL.revokeObjectURL(clip.recording.url);
    clip.recording = {
      sourceFormat: blob.type,
      blob,
      url: URL.createObjectURL(blob)
    };
    clip.accepted = false;
    clip.seconds = blob.size ? (Date.now() - startAt) / 1000 : 0;
    state.isRecording = false;
    state.holdActive = false;
    setRecordingUiActive(false);
    render();
    if (!blob.type.includes("ogg")) {
      convertClipRecordingToOgg(mob, clipKey).catch((err) => {
        console.error(err);
      });
    }
  };

  startMeter();
  startRecordingCountdown(maxMs);
  state.recorder.start();
  if (!state.holdActive) {
    stopRecording();
    return;
  }
  setRecordingUiActive(true);
}

function stopRecording() {
  if (!state.recorder || !state.isRecording) return;
  // Flip state immediately on release so re-renders don't momentarily
  // re-apply the recording style before MediaRecorder.onstop fires.
  state.isRecording = false;
  clearRecordingCountdown();
  setRecordingUiActive(false);
  try {
    state.recorder.stop();
  } catch (err) {
    console.warn("Recorder stop failed:", err);
  }
}

function clearHoldReleaseTimer() {
  if (state.holdReleaseStopTimer) {
    clearTimeout(state.holdReleaseStopTimer);
    state.holdReleaseStopTimer = null;
  }
}

function setRecordingUiActive(isActive) {
  const recordBtn = document.querySelector("#record");
  if (recordBtn) {
    recordBtn.classList.toggle("recording", isActive);
    const label = recordBtn.querySelector(".record-pill-label") || recordBtn.querySelector("span");
    if (label) label.textContent = isActive ? "Release to Stop" : "Hold to Record";
  }
  const ring = document.querySelector(".countdown-ring");
  if (ring) ring.classList.toggle("active", isActive);
}

function wireHoldToRecord(button, item) {
  const startHold = async (ev) => {
    if (ev) ev.preventDefault();
    if (getClipState(item.mob, item.clipKey).converting) return;
    if (state.isRecording) return;
    clearHoldReleaseTimer();
    state.holdActive = true;
    try {
      if (ev?.pointerId != null && button.setPointerCapture) {
        button.setPointerCapture(ev.pointerId);
      }
    } catch {}
    await startRecording(item);
  };

  const endHold = () => {
    state.holdActive = false;
    clearHoldReleaseTimer();
    stopRecording();
  };

  button.onpointerdown = startHold;
  button.onpointerup = endHold;
  button.onpointercancel = endHold;
  button.onlostpointercapture = endHold;
  button.onkeydown = async (ev) => {
    if ((ev.key === " " || ev.key === "Enter") && !state.holdActive) {
      await startHold(ev);
    }
  };
  button.onkeyup = (ev) => {
    if (ev.key === " " || ev.key === "Enter") endHold();
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
  render();

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
    render();
  }
}

function startRecordingCountdown(maxMs) {
  clearRecordingCountdown();
  const startedAt = Date.now();

  state.recordStopTimer = window.setTimeout(() => {
    if (state.isRecording) stopRecording();
  }, maxMs);

  state.recordCountdownTimer = window.setInterval(() => {
    const elapsed = Date.now() - startedAt;
    state.recordingRemainingMs = Math.max(0, maxMs - elapsed);
    const ring = document.querySelector(".countdown-ring");
    const label = ring?.querySelector("span");
    if (ring) {
      const pct = Math.round((state.recordingRemainingMs / maxMs) * 100);
      ring.style.setProperty("--ring-pct", String(pct));
    }
    if (label) label.textContent = `${(state.recordingRemainingMs / 1000).toFixed(1)}s`;
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
}

function startMeter() {
  if (!state.mediaStream) return;
  state.audioCtx = state.audioCtx || new AudioContext();
  const src = state.audioCtx.createMediaStreamSource(state.mediaStream);
  state.analyser = state.audioCtx.createAnalyser();
  state.analyser.fftSize = 2048;
  src.connect(state.analyser);
  const data = new Uint8Array(state.analyser.frequencyBinCount);
  state.meterTimer = window.setInterval(() => {
    state.analyser.getByteTimeDomainData(data);
    let peak = 0;
    for (let i = 0; i < data.length; i += 1) {
      const v = Math.abs((data[i] - 128) / 128);
      if (v > peak) peak = v;
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
  state.meterPct = 0;
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

    const fileName = `${sanitizePackName(PACK_NAME)}.zip`;
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
    state.busyMsg = `Importing ${file.name}...`;
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
      state.busyMsg = "No recordings found in that zip.";
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

      state.busyMsg = `Importing ${i + 1}/${candidates.length}: ${c.mobId}`;
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
      clip.converting = false;
      imported += 1;
    }

    state.busyMsg = `Imported ${imported} recording(s).`;
    logExport(`Import complete: ${imported} recording(s) loaded.`);
    if (goToExport && imported > 0) {
      state.step = 1;
    }
    render();
  } catch (err) {
    state.busyMsg = "Import failed. See log for details.";
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
    app.innerHTML = `<section class="sheet"><p>Failed to load app: ${escapeHtml(String(err.message || err))}</p></section>`;
  });
