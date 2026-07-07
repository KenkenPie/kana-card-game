// src/utils/audio.js
// 統一管理五十音發音

export function playKanaSound(romaji) {
  if (!romaji) return;

  const url = `${import.meta.env.BASE_URL}audio/kana/${romaji}.wav`;

  // console.log(url); // 可以先留著測試

  const audio = new Audio(url);

  audio.currentTime = 0;
  audio.play().catch((error) => {
    console.warn("音檔播放失敗：", error);
  });
}