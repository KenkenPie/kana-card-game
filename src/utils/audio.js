// src/utils/audio.js
// 統一管理五十音發音

const audioCache = {};
let currentAudio = null;

export function preloadKanaSounds(romajiList = []) {
  romajiList.forEach((romaji) => {
    if (!romaji || audioCache[romaji]) return;

    const url = `${import.meta.env.BASE_URL}audio/kana/${romaji}.wav`;
    const audio = new Audio(url);

    audio.preload = "auto";
    audio.load();

    audioCache[romaji] = audio;
  });
}

export function playKanaSound(romaji) {
  if (!romaji) return;

  if (!audioCache[romaji]) {
    const url = `${import.meta.env.BASE_URL}audio/kana/${romaji}.wav`;
    const audio = new Audio(url);
    audio.preload = "auto";
    audioCache[romaji] = audio;
  }

  if (currentAudio) {
    currentAudio.pause();
    currentAudio.currentTime = 0;
  }

  const audio = audioCache[romaji];
  currentAudio = audio;
  audio.currentTime = 0;

  audio.play().catch((error) => {
    console.warn("音檔播放失敗：", error);
  });
}