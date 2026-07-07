// src/utils/audio.js
// 統一管理五十音發音

const audioCache = {};
let currentAudio = null;

// 預載指定的音檔
export function preloadKanaSounds(romajiList = []) {
  romajiList.forEach((romaji) => {
    if (!romaji || audioCache[romaji]) return;

    const url = `${import.meta.env.BASE_URL}audio/kana/${romaji}.wav`;

    const audio = new Audio(url);
    audio.preload = "auto";
    // 不主動 audio.load()
    // 避免第一次進遊戲時瀏覽器忙著載入，造成第一題 lag

    audioCache[romaji] = audio;

    console.log("預載音檔：", url);
  });
}

// 播放指定假名音檔
export function playKanaSound(romaji) {
  if (!romaji) {
    console.warn("沒有收到 romaji");
    return;
  }

  const url = `${import.meta.env.BASE_URL}audio/kana/${romaji}.wav`;

  if (!audioCache[romaji]) {
    const audio = new Audio(url);
    audio.preload = "auto";
    // 不主動 audio.load()

    audioCache[romaji] = audio;
  }

  if (currentAudio) {
    currentAudio.pause();
    currentAudio.currentTime = 0;
  }

  const audio = audioCache[romaji];
  currentAudio = audio;
  audio.currentTime = 0;

  console.log("播放音檔：", url);

  audio.play().catch((error) => {
    console.warn("音檔播放失敗：", romaji, error);
  });
}