<script setup>
import { ref } from "vue";
import VocabStageSelect from "./VocabStageSelect.vue";
import VocabBoard from "./VocabBoard.vue";
import QuestionCountSelect from "../common/QuestionCountSelect.vue";
import { unlockAudio } from "../../utils/audio.js";
import { n5Words } from "../../data/n5Words.js";
import n4Words from "../../data/n4Words.js";

// ==============================
// 傳送返回事件給 App.vue
// ==============================
const emit = defineEmits(["back"]);

// ==============================
// 遊戲畫面狀態
//
// select：單字模式選擇畫面
// playing：單字遊戲進行中
// ==============================
const gameState = ref("select");

// ==============================
// 玩家選擇的單字模式
// 目前雖然只有一種，但保留欄位方便未來擴充
// ==============================
const selectedStage = ref(null);
const selectedQuestionCount = ref(10);

// ==============================
// 用來重新建立 VocabBoard
// key 改變後，題目、分數與錯題會全部重設
// ==============================
const gameKey = ref(0);

// ==============================
// 開始單字遊戲
// ==============================
function startGame(stage) {
  selectedStage.value = stage;
  selectedQuestionCount.value = 10;
  gameState.value = "count";
}

function getAvailableQuestionCount(stage) {
  if (stage?.level === "N4" || stage?.id?.startsWith("n4")) {
    return n4Words.length;
  }

  return n5Words.length;
}

function startPlaying() {
  unlockAudio();
  gameState.value = "playing";
}

// ==============================
// 重新開始目前這一輪
// ==============================
function restartGame() {
  gameKey.value++;
}

// ==============================
// 從結算畫面回到單字模式選擇畫面
// ==============================
function backToStageSelect() {
  gameState.value = "select";
  selectedStage.value = null;
}

// ==============================
// 返回 App.vue 的遊戲選擇首頁
// ==============================
function backToHome() {
  emit("back");
}
</script>

<template>
  <main class="vocab-game">
    <div class="game-shell">
      <!-- ==============================
           單字模式選擇畫面
      ============================== -->
      <VocabStageSelect
        v-if="gameState === 'select'"
        @start="startGame"
        @back="backToHome"
      />

      <QuestionCountSelect
        v-else-if="gameState === 'count'"
        v-model="selectedQuestionCount"
        :stage="selectedStage"
        :available-count="getAvailableQuestionCount(selectedStage)"
        @start="startPlaying"
        @back="backToStageSelect"
      />

      <!-- ==============================
           單字遊戲畫面
      ============================== -->
      <VocabBoard
        v-else
        :key="gameKey"
        :stage="selectedStage"
        :question-count="selectedQuestionCount"
        @restart="restartGame"
        @back="backToStageSelect"
        @home="backToHome"
      />
    </div>
  </main>
</template>

<style scoped>
/* ==============================
   與 QuizGame.vue 相同的整頁背景
============================== */
.vocab-game {
  min-height: 100dvh;
  padding: 16px;

  display: flex;
  justify-content: center;
  align-items: center;

  background:
    radial-gradient(
      circle at top left,
      rgba(255, 213, 138, 0.45),
      transparent 36%
    ),
    radial-gradient(
      circle at bottom right,
      rgba(168, 199, 151, 0.45),
      transparent 34%
    ),
    #f8f1e7;

  overflow-x: hidden;
  box-sizing: border-box;
}

/* ==============================
   與 QuizGame.vue 相同的遊戲主框架
============================== */
.game-shell {
  width: min(100%, 620px);
  min-height: 760px;
  padding: 16px;

  display: flex;
  flex-direction: column;

  background: rgba(255, 253, 248, 0.25);
  backdrop-filter: blur(6px);

  border-radius: 28px;

  box-sizing: border-box;
}

/* ==============================
   RWD
============================== */
@media (max-width: 768px) {
  .vocab-game {
    padding: 0;
    align-items: stretch;
  }

  .game-shell {
    width: 100%;
    min-height: 100dvh;
    border-radius: 0;
  }
}
</style>
