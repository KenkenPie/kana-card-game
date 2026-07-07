// src/utils/audio.js
// 統一管理五十音發音

export function playKanaSound(romaji) {
  if (!romaji) return;

  const audio = new Audio(`/audio/kana/${romaji}.wav`);

  audio.currentTime = 0;
  audio.play().catch((error) => {
    console.warn("音檔播放失敗：", error);
  });
}