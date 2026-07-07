<script setup>
import { ref } from "vue";
import StageSelect from "./StageSelect.vue";
import QuizBoard from "./QuizBoard.vue";
import { preloadKanaSounds } from "../../utils/audio.js";
import { kanaData } from "../../data/kanaData.js";



const gameState = ref("select");
const selectedStage = ref(null);
const gameKey = ref(0);


async function startGame(stage) {
  // 先預載所有音效
  preloadKanaSounds(kanaData.map((item) => item.romaji));

  // 給瀏覽器一點時間開始載入音效（約 300ms）
  await new Promise((resolve) => setTimeout(resolve, 300));

  // 再開始遊戲
  selectedStage.value = stage;
  gameState.value = "playing";
}

function restartGame() {
  gameKey.value++;
}

function backToStageSelect() {
  gameState.value = "select";
  selectedStage.value = null;
}
</script>

<template>
  <main class="quiz-game">
    <div class="game-shell">
      <StageSelect
        v-if="gameState === 'select'"
        @start="startGame"
      />

      <QuizBoard
        v-else
        :key="gameKey"
        :stage="selectedStage"
        @restart="restartGame"
        @back="backToStageSelect"
      />
    </div>
  </main>
</template>

<style scoped>
.quiz-game {
  min-height: 100dvh;
  padding: 16px;
  box-sizing: border-box;

  display: flex;
  justify-content: center;
  align-items: center;

  background:
    radial-gradient(circle at top left, rgba(255, 213, 138, 0.45), transparent 36%),
    radial-gradient(circle at bottom right, rgba(168, 199, 151, 0.45), transparent 34%),
    #f8f1e7;

  overflow-x: hidden;
}
/* ==============================
   遊戲主框架
   所有畫面都固定在同一個尺寸
============================== */

.game-shell {
  width: min(100%, 620px);
  min-height: 760px;

  display: flex;
  flex-direction: column;

  padding: 16px;
  box-sizing: border-box;

  background: rgba(255, 253, 248, 0.25);
  backdrop-filter: blur(6px);

  border-radius: 28px;
}


/* ==============================
   RWD
============================== */
@media (max-width: 768px) {
  .quiz-game {
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