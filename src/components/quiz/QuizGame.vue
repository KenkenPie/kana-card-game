<script setup>
import { ref } from "vue";
import StageSelect from "./StageSelect.vue";
import QuizBoard from "./QuizBoard.vue";
import { unlockAudio } from "../../utils/audio.js";



const gameState = ref("select");
const selectedStage = ref(null);
const gameKey = ref(0);
const emit = defineEmits(["back"]);


async function startGame(stage) {
  unlockAudio();

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
        @back="emit('back')"
      />

      <QuizBoard
        v-else
        :key="gameKey"
        :stage="selectedStage"
        @restart="restartGame"
        @back="backToStageSelect"
        @home="emit('back')"
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
