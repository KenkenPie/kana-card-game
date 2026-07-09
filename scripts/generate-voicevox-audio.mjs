// ======================================================
// generate-voicevox-audio.mjs
//
// 功能：
// 透過 VOICEVOX API 產生音檔。
//
// 使用方式：
// 1. 開啟 VOICEVOX
// 2. 執行 npm run audio:kana  產生五十音 wav
// 3. 執行 npm run audio:vocab 產生 N4 / N5 單字 mp3
// ======================================================

import fs from "fs";
import os from "os";
import path from "path";
import { spawnSync } from "child_process";
import { kanaData } from "../src/data/kanaData.js";
import { n5Words } from "../src/data/n5Words.js";
import n4Words from "../src/data/n4Words.js";

const VOICEVOX_URL = "http://127.0.0.1:50021";
const SPEAKER_ID = 8;
const MP3_BITRATE = "64k";
const FAILED_AUDIO_PATH = path.resolve("failed-audio.json");

const mode = process.argv[2] ?? "kana";
const failedAudio = [];

function ensureDir(dir) {
  if (!fs.existsSync(dir)) {
    fs.mkdirSync(dir, { recursive: true });
  }
}

function hasCommand(command) {
  const result = spawnSync(command, ["-version"], {
    stdio: "ignore",
    shell: true,
  });

  return result.status === 0;
}

function runFfmpeg(inputPath, outputPath) {
  const result = spawnSync(
    "ffmpeg",
    [
      "-y",
      "-hide_banner",
      "-loglevel",
      "error",
      "-i",
      inputPath,
      "-codec:a",
      "libmp3lame",
      "-b:a",
      MP3_BITRATE,
      outputPath,
    ],
    {
      encoding: "utf8",
      shell: true,
    },
  );

  if (result.status !== 0) {
    throw new Error(result.stderr || "ffmpeg 轉檔失敗");
  }
}

async function synthesizeVoicevox(text) {
  const queryRes = await fetch(
    `${VOICEVOX_URL}/audio_query?text=${encodeURIComponent(text)}&speaker=${SPEAKER_ID}`,
    {
      method: "POST",
    },
  );

  if (!queryRes.ok) {
    throw new Error(`audio_query 失敗：${text}`);
  }

  const query = await queryRes.json();

  query.speedScale = 0.9;
  query.pitchScale = 0.0;
  query.intonationScale = 1.0;
  query.volumeScale = 1.0;

  const synthRes = await fetch(
    `${VOICEVOX_URL}/synthesis?speaker=${SPEAKER_ID}`,
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(query),
    },
  );

  if (!synthRes.ok) {
    throw new Error(`synthesis 失敗：${text}`);
  }

  return Buffer.from(await synthRes.arrayBuffer());
}

async function generateWavAudio(text, outputPath) {
  const wavBuffer = await synthesizeVoicevox(text);
  fs.writeFileSync(outputPath, wavBuffer);
}

async function generateMp3Audio(text, outputPath) {
  const tempWavPath = path.join(
    os.tmpdir(),
    `voicevox-${process.pid}-${Date.now()}-${Math.random().toString(36).slice(2)}.wav`,
  );

  try {
    const wavBuffer = await synthesizeVoicevox(text);
    fs.writeFileSync(tempWavPath, wavBuffer);
    runFfmpeg(tempWavPath, outputPath);
  } finally {
    if (fs.existsSync(tempWavPath)) {
      fs.unlinkSync(tempWavPath);
    }
  }
}

function writeFailedAudio() {
  fs.writeFileSync(
    FAILED_AUDIO_PATH,
    JSON.stringify(failedAudio, null, 2),
  );
}

function createStats() {
  return {
    success: 0,
    skipped: 0,
    failed: 0,
  };
}

function getVocabFilename(item) {
  return `${item.id}.mp3`;
}

async function generateKanaAudio() {
  const outputDir = path.resolve("public/audio/kana");
  const stats = createStats();

  ensureDir(outputDir);

  for (const item of kanaData) {
    if (!item.hiragana || !item.romaji) continue;

    const outputPath = path.join(outputDir, `${item.romaji}.wav`);

    if (fs.existsSync(outputPath)) {
      stats.skipped++;
      continue;
    }

    try {
      await generateWavAudio(item.hiragana, outputPath);
      stats.success++;
    } catch (error) {
      stats.failed++;
      failedAudio.push({
        level: "KANA",
        id: item.id,
        kana: item.hiragana,
        filename: path.relative(process.cwd(), outputPath),
        error: error.message,
      });
    }
  }

  return {
    KANA: stats,
  };
}

async function generateVocabLevel(level, words, outputDir) {
  const stats = createStats();

  ensureDir(outputDir);

  for (const item of words) {
    const text = item.kana;
    const outputPath = path.join(outputDir, getVocabFilename(item));

    if (!text) continue;

    if (fs.existsSync(outputPath)) {
      stats.skipped++;
      continue;
    }

    try {
      await generateMp3Audio(text, outputPath);
      stats.success++;
    } catch (error) {
      stats.failed++;
      failedAudio.push({
        level,
        id: item.id,
        kana: item.kana,
        kanji: item.kanji,
        filename: path.relative(process.cwd(), outputPath),
        error: error.message,
      });
    }
  }

  return stats;
}

async function generateVocabAudio() {
  if (!hasCommand("ffmpeg")) {
    throw new Error(
      "找不到 ffmpeg，無法輸出 mp3 64kbps。請先安裝 ffmpeg 後再執行 npm run audio:vocab。",
    );
  }

  return {
    N5: await generateVocabLevel(
      "N5",
      n5Words,
      path.resolve("public/audio/n5"),
    ),
    N4: await generateVocabLevel(
      "N4",
      n4Words,
      path.resolve("public/audio/n4"),
    ),
  };
}

function printStats(statsByLevel) {
  console.log("==================================");
  console.log("音檔產生統計");
  console.log("==================================");

  Object.entries(statsByLevel).forEach(([level, stats]) => {
    console.log(
      `${level}: 成功 ${stats.success}，跳過 ${stats.skipped}，失敗 ${stats.failed}`,
    );
  });

  console.log(`失敗紀錄：${FAILED_AUDIO_PATH}`);
}

async function main() {
  console.log("==================================");
  console.log("開始產生 VOICEVOX 音檔");
  console.log(`模式：${mode}`);
  console.log("==================================");

  let statsByLevel;

  if (mode === "vocab") {
    statsByLevel = await generateVocabAudio();
  } else if (mode === "kana") {
    statsByLevel = await generateKanaAudio();
  } else {
    throw new Error("未知模式，請使用 kana 或 vocab");
  }

  writeFailedAudio();
  printStats(statsByLevel);
}

main().catch((error) => {
  console.error("發生錯誤：", error.message);
  writeFailedAudio();

  if (failedAudio.length > 0) {
    printStats({
      FAILED: {
        success: 0,
        skipped: 0,
        failed: failedAudio.length,
      },
    });
  }

  process.exitCode = 1;
});
