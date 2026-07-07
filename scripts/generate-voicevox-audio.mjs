// ======================================================
// generate-voicevox-audio.mjs
//
// 功能：
// 讀取 kanaData.js 中所有平假名，透過 VOICEVOX API
// 自動產生對應的 .wav 音檔。
// ------------------------------------------------------
// 使用方式：
// 1. 開啟 VOICEVOX
// 2. 執行 npm run audio:kana
// 3. 音檔會自動輸出到 public/audio/kana/
// ======================================================

import fs from "fs";
import path from "path";
import { kanaData } from "../src/data/kanaData.js";

// ======================================================
// 基本設定
// ======================================================

// VOICEVOX API 位址（預設）
const VOICEVOX_URL = "http://127.0.0.1:50021";

// 使用的角色
// 四国めたん Normal = 2
// 春日部つむぎ ノーマル
const SPEAKER_ID = 8;

// 音檔輸出位置
const OUTPUT_DIR = path.resolve("public/audio/kana");

// ======================================================
// 如果輸出資料夾不存在，就自動建立
// ======================================================

if (!fs.existsSync(OUTPUT_DIR)) {
  fs.mkdirSync(OUTPUT_DIR, { recursive: true });
}

// ======================================================
// 清空舊音檔
//
// 每次重新生成前，把舊的 wav 全部刪掉，
// 避免資料夾殘留不用的音檔。
// ======================================================

function clearOldAudio() {
  fs.readdirSync(OUTPUT_DIR).forEach((file) => {
    if (file.endsWith(".wav")) {
      fs.unlinkSync(path.join(OUTPUT_DIR, file));
    }
  });
}

// ======================================================
// 產生單一音檔
//
// text：要念的文字（例如 あ）
// filename：輸出的檔名（例如 a.wav）
// ======================================================

async function generateAudio(text, filename) {
  console.log(`🎤 產生中：${text} → ${filename}`);

  // ------------------------------
  // Step 1：取得語音設定
  // ------------------------------
  const queryRes = await fetch(
    `${VOICEVOX_URL}/audio_query?text=${encodeURIComponent(text)}&speaker=${SPEAKER_ID}`,
    {
      method: "POST",
    }
  );

  if (!queryRes.ok) {
    throw new Error(`audio_query 失敗：${text}`);
  }

  const query = await queryRes.json();

  // ------------------------------
  // Step 2：調整聲音參數
  // ------------------------------
  query.speedScale = 0.9;       // 語速
  query.pitchScale = 0.0;       // 音高
  query.intonationScale = 1.0;  // 抑揚
  query.volumeScale = 1.0;      // 音量

  // ------------------------------
  // Step 3：開始合成 WAV
  // ------------------------------
  const synthRes = await fetch(
    `${VOICEVOX_URL}/synthesis?speaker=${SPEAKER_ID}`,
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(query),
    }
  );

  if (!synthRes.ok) {
    throw new Error(`synthesis 失敗：${text}`);
  }

  // ------------------------------
  // Step 4：存成 wav
  // ------------------------------
  const arrayBuffer = await synthRes.arrayBuffer();

  fs.writeFileSync(
    path.join(OUTPUT_DIR, filename),
    Buffer.from(arrayBuffer)
  );
}

// ======================================================
// 主程式
// ======================================================

async function main() {
  console.log("==================================");
  console.log("開始產生 VOICEVOX 音檔");
  console.log(`輸出位置：${OUTPUT_DIR}`);
  console.log("==================================");

  // 先清空舊音檔
  clearOldAudio();

  // 依照 kanaData 一筆一筆生成
  for (const item of kanaData) {
    // 沒有資料就略過
    if (!item.hiragana || !item.romaji) continue;

    await generateAudio(
      item.hiragana,
      `${item.romaji}.wav`
    );
  }

  console.log("==================================");
  console.log("🎉 全部音檔產生完成！");
  console.log("==================================");
}

// ======================================================
// 執行程式
// ======================================================

main().catch((error) => {
  console.error("❌ 發生錯誤：", error.message);
  console.error("請確認 VOICEVOX 已經開啟。");
});