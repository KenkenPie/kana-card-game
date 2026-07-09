// src/utils/audio.js
// 統一管理遊戲音檔的預載、快取與播放

const audioCache = {};
let currentAudio = null;
let audioContext = null;
let isUnlocked = false;

function getAudio(url) {
  if (!url) return null;

  if (!audioCache[url]) {
    const audio = new Audio(url);
    audio.preload = "auto";
    audioCache[url] = audio;
  }

  return audioCache[url];
}

function loadAudio(url) {
  const audio = getAudio(url);

  if (!audio) return;

  try {
    audio.load();
  } catch (error) {
    console.warn("音檔預載失敗：", url, error);
  }
}

function preloadAudioUrls(urls = []) {
  urls.forEach((url) => {
    if (!url) return;
    loadAudio(url);
  });
}

function playAudioUrl(url) {
  const audio = getAudio(url);

  if (!audio) return;

  if (currentAudio && currentAudio !== audio) {
    currentAudio.pause();
    currentAudio.currentTime = 0;
  }

  currentAudio = audio;
  audio.pause();
  audio.currentTime = 0;

  audio.play().catch((error) => {
    console.warn("音檔播放失敗：", url, error);
  });
}

export function unlockAudio() {
  if (isUnlocked) return;

  const AudioContextClass =
    window.AudioContext || window.webkitAudioContext;

  if (AudioContextClass) {
    if (!audioContext) {
      audioContext = new AudioContextClass();
    }

    if (audioContext.state === "suspended") {
      audioContext.resume().catch(() => {});
    }
  }

  isUnlocked = true;
}

export function getKanaAudioUrl(romaji) {
  if (!romaji) return "";
  return `${import.meta.env.BASE_URL}audio/kana/${romaji}.wav`;
}

export function getVocabAudioUrl(level, id) {
  if (!level || !id) return "";
  return `${import.meta.env.BASE_URL}audio/${level.toLowerCase()}/${id}.mp3`;
}

export function preloadKanaSounds(romajiList = []) {
  preloadAudioUrls(romajiList.map((romaji) => getKanaAudioUrl(romaji)));
}

export function preloadVocabSounds(items = [], level = "N5") {
  preloadAudioUrls(
    items.map((item) => getVocabAudioUrl(level, item?.id)),
  );
}

export function playKanaSound(romaji) {
  playAudioUrl(getKanaAudioUrl(romaji));
}

export function playVocabSound(item, level = "N5") {
  playAudioUrl(getVocabAudioUrl(level, item?.id));
}
