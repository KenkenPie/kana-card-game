<script setup>
import { computed, ref } from "vue";
import StageSelect from "./StageSelect.vue";
import QuizBoard from "./QuizBoard.vue";
import QuestionCountSelect from "../common/QuestionCountSelect.vue";
import { unlockAudio } from "../../utils/audio.js";
import { kanaData } from "../../data/kanaData.js";



const gameState = ref("select");
const selectedStage = ref(null);
const selectedQuestionCount = ref(10);
const selectedQuestionRange = ref("basic");
const gameKey = ref(0);
const emit = defineEmits(["back"]);


function chooseStage(stage) {
  selectedStage.value = stage;
  // 與原本題數的狀態管理方式一致：每次選擇關卡時回到預設設定。
  selectedQuestionCount.value = 10;
  selectedQuestionRange.value = "basic";
  gameState.value = "count";
}

// 先依關卡保留具有對應假名的資料，再依題目範圍計算可用題數。
const availableKana = computed(() => {
  const stageFiltered = kanaData.filter((kana) => {
    if (selectedStage.value?.id === "hiragana") return Boolean(kana.hiragana);
    if (selectedStage.value?.id === "katakana") return Boolean(kana.katakana);
    return Boolean(kana.hiragana && kana.katakana);
  });

  return selectedQuestionRange.value === "basic"
    ? stageFiltered.filter((kana) => kana.category === "basic")
    : stageFiltered;
});

function startGame() {
  unlockAudio();
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
        @start="chooseStage"
        @back="emit('back')"
      />

      <QuestionCountSelect
        v-else-if="gameState === 'count'"
        v-model="selectedQuestionCount"
        v-model:range="selectedQuestionRange"
        :stage="selectedStage"
        :available-count="availableKana.length"
        show-range
        @start="startGame"
        @back="backToStageSelect"
      />

      <QuizBoard
        v-else
        :key="gameKey"
        :stage="selectedStage"
        :question-count="selectedQuestionCount"
        :question-range="selectedQuestionRange"
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
