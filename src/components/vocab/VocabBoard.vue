<script setup>
import { ref, computed } from "vue";
import { n5Words } from "../../data/n5Words.js";
import VocabCard from "./VocabCard.vue";

// ==============================
// 傳送事件給 VocabGame
// restart：重新開始
// back：返回首頁或遊戲選擇畫面
// ==============================
const emit = defineEmits(["restart", "back"]);

// ==============================
// 遊戲基本設定
// 每一輪隨機抽出 10 題
// ==============================
const QUESTION_COUNT = 10;

// ==============================
// 洗牌函式
// 建立新陣列，避免修改原始資料
// ==============================
function shuffle(array) {
  return [...array].sort(() => Math.random() - 0.5);
}

// ==============================
// 題目與分數狀態
// ==============================
const currentIndex = ref(0);
const score = ref(0);
const message = ref("");
const isFinished = ref(false);
const correctCount = ref(0);

// ==============================
// 作答狀態
// ==============================
const selectedAnswer = ref(null);
const isAnswered = ref(false);

// ==============================
// 錯題紀錄
// 結算畫面用來顯示錯題複習
// ==============================
const wrongQuestions = ref([]);

// ==============================
// 建立本輪題目
// 從 n5Words 隨機抽出指定題數
// ==============================
const quizQuestions = ref(
  shuffle(n5Words).slice(0, QUESTION_COUNT),
);

// ==============================
// 目前題目
// ==============================
const currentQuestion = computed(() => {
  return quizQuestions.value[currentIndex.value];
});

// ==============================
// 產生四個中文選項
// 1 個正確答案 + 3 個錯誤答案
//
// 排除：
// 1. 目前題目本身
// 2. 中文意思完全相同的單字
// ==============================
const currentOptions = computed(() => {
  const correctAnswer = currentQuestion.value.meaning;

  const wrongMeanings = n5Words
    .filter((item) => {
      return (
        item.id !== currentQuestion.value.id &&
        item.meaning !== correctAnswer
      );
    })
    .map((item) => item.meaning);

  // 移除可能重複的中文意思
  const uniqueWrongMeanings = [...new Set(wrongMeanings)];

  const wrongOptions = shuffle(uniqueWrongMeanings).slice(0, 3);

  return shuffle([correctAnswer, ...wrongOptions]);
});

// ==============================
// 遊戲進度百分比
// ==============================
const progressPercent = computed(() => {
  return (
    ((currentIndex.value + 1) / quizQuestions.value.length) *
    100
  );
});

// ==============================
// 正確率
// 結算畫面使用
// ==============================
const accuracy = computed(() => {
  if (quizQuestions.value.length === 0) return 0;

  return Math.round(
    (correctCount.value / quizQuestions.value.length) * 100,
  );
});

// ==============================
// 結算評語
// ==============================
const resultMessage = computed(() => {
  if (accuracy.value === 100) {
    return "完美！N5 單字全都記住了 🌸";
  }

  if (accuracy.value >= 80) {
    return "很棒！常用單字已經很熟了 ✨";
  }

  if (accuracy.value >= 60) {
    return "不錯！再複習幾次會更穩 💪";
  }

  return "慢慢來，單字就是要反覆練習！";
});

// ==============================
// 結算星等
// ==============================
const resultStars = computed(() => {
  if (accuracy.value === 100) return "⭐⭐⭐";
  if (accuracy.value >= 70) return "⭐⭐";
  return "⭐";
});

// ==============================
// 玩家選擇答案
//
// VocabCard 傳入：
// {
//   selected,
//   correctAnswer,
//   isCorrect
// }
// ==============================
function handleAnswer(result) {
  if (isAnswered.value) return;

  selectedAnswer.value = result.selected;
  isAnswered.value = true;

  if (result.isCorrect) {
    score.value += 10;
    correctCount.value++;
    message.value = "答對了！";
  } else {
    message.value = "答錯了！";

    wrongQuestions.value.push({
      id: currentQuestion.value.id,
      kana: currentQuestion.value.kana,
      kanji: currentQuestion.value.kanji,
      meaning: currentQuestion.value.meaning,
    });
  }

  // 暫停一下，讓玩家看到答案顏色與完整單字
  setTimeout(() => {
    goNextQuestion();
  }, 1200);
}

// ==============================
// 換到下一題
// 如果已經是最後一題，進入結算畫面
// ==============================
function goNextQuestion() {
  selectedAnswer.value = null;
  isAnswered.value = false;
  message.value = "";

  if (currentIndex.value < quizQuestions.value.length - 1) {
    currentIndex.value++;
  } else {
    isFinished.value = true;
  }
}
</script>

<template>
  <section class="vocab-board">
    <!-- ==============================
         遊戲進行中的資訊列
         結算時隱藏
    ============================== -->
    <div v-if="!isFinished" class="quiz-info">
      <div>
        <p>
          第 {{ currentIndex + 1 }} /
          {{ quizQuestions.length }} 題
        </p>

        <div class="progress-bar">
          <div
            class="progress-fill"
            :style="{ width: progressPercent + '%' }"
          ></div>
        </div>
      </div>

      <p class="score">分數：{{ score }}</p>
    </div>

    <!-- ==============================
         單字作答畫面
    ============================== -->
    <div v-if="!isFinished" class="quiz-content">
      <Transition name="card-fade" mode="out-in">
        <VocabCard
          :key="currentQuestion.id"
          :kana="currentQuestion.kana"
          :kanji="currentQuestion.kanji"
          :meaning="currentQuestion.meaning"
          :options="currentOptions"
          :selectedAnswer="selectedAnswer"
          :isAnswered="isAnswered"
          :correctAnswer="currentQuestion.meaning"
          @answer="handleAnswer"
        />
      </Transition>

      <p class="message" :class="{ show: message }">
        {{ message }}
      </p>
    </div>

    <!-- ==============================
         結算畫面
    ============================== -->
    <div v-else class="result-card">
      <div class="result-header">
        <div class="stars">
          {{ resultStars }}
        </div>

        <h2>🎉 完成！</h2>

        <p class="result-message">
          {{ resultMessage }}
        </p>
      </div>

      <!-- ==============================
           結算資訊
      ============================== -->
      <div class="result-stats">
        <div class="stat-row">
          <span>本輪題數</span>
          <strong>{{ quizQuestions.length }}</strong>
        </div>

        <div class="stat-row">
          <span>答對題數</span>

          <strong>
            {{ correctCount }} /
            {{ quizQuestions.length }}
          </strong>
        </div>

        <div class="stat-row">
          <span>正確率</span>
          <strong>{{ accuracy }}%</strong>
        </div>

        <div class="stat-row">
          <span>分數</span>
          <strong>{{ score }}</strong>
        </div>
      </div>

      <!-- ==============================
           錯題複習
           顯示假名、漢字與繁體中文
      ============================== -->
      <div
        v-if="wrongQuestions.length > 0"
        class="review-section"
      >
        <h3>錯題複習</h3>

        <div class="review-grid">
          <div
            v-for="item in wrongQuestions"
            :key="item.id"
            class="review-card"
          >
            <div class="review-kana">
              {{ item.kana }}
            </div>

            <div
              v-if="item.kanji"
              class="review-kanji"
            >
              {{ item.kanji }}
            </div>

            <div class="review-meaning">
              {{ item.meaning }}
            </div>
          </div>
        </div>
      </div>

      <!-- ==============================
           全部答對時顯示
      ============================== -->
      <div v-else class="perfect-review">
        真棒！沒有錯題需要複習 ♥
      </div>

      <!-- ==============================
           結算按鈕
      ============================== -->
      <div class="result-buttons">
        <button type="button" @click="emit('restart')">
          再玩一次
        </button>

        <button type="button" @click="emit('back')">
          回首頁
        </button>
      </div>
    </div>
  </section>
</template>

<style scoped>
/* ==============================
   Layout
============================== */
.vocab-board {
  position: relative;
  z-index: 2;

  width: min(100%, 520px);
  max-width: 520px;
  margin: 0 auto;

  display: flex;
  flex-direction: column;
  justify-content: center;

  box-sizing: border-box;
}

.quiz-content {
  width: 100%;
}

/* ==============================
   Card Transition
============================== */
.card-fade-enter-active,
.card-fade-leave-active {
  transition: all 0.28s ease;
}

.card-fade-enter-from {
  opacity: 0;
  transform: translateY(14px) scale(0.97);
}

.card-fade-leave-to {
  opacity: 0;
  transform: translateY(-12px) scale(0.98);
}

/* ==============================
   Quiz Info
============================== */
.quiz-info {
  margin-bottom: 20px;
  padding: 14px 18px;

  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 18px;

  background: rgba(255, 255, 255, 0.76);
  border: 2px solid rgba(234, 223, 206, 0.8);
  border-radius: 20px;

  color: #5f4b3b;
  font-weight: 800;

  box-shadow: 0 8px 20px rgba(120, 90, 60, 0.08);
}

.quiz-info p {
  margin: 0;
}

.score {
  white-space: nowrap;
}

.progress-bar {
  width: 260px;
  height: 8px;
  margin-top: 8px;

  overflow: hidden;

  background: #eee3d4;
  border-radius: 999px;
}

.progress-fill {
  height: 100%;

  background: #8f9d83;
  border-radius: 999px;

  transition: width 0.3s ease;
}

/* ==============================
   Message
============================== */
.message {
  min-height: 32px;
  margin-top: 20px;

  text-align: center;
  color: #8a5a35;
  font-size: 20px;
  font-weight: 900;

  opacity: 0;
  transform: translateY(6px);
  transition: 0.2s;
}

.message.show {
  opacity: 1;
  transform: translateY(0);
}

/* ==============================
   Result Card
============================== */
.result-card {
  height: 100%;
  margin: 8px 0 0 8px;
  padding: 26px;

  display: flex;
  flex-direction: column;

  background: rgba(255, 253, 248, 0.96);
  border: 2px solid rgba(234, 223, 206, 0.9);
  border-radius: 30px;

  color: #5f4b3b;
  text-align: center;

  box-shadow: 0 18px 40px rgba(120, 90, 60, 0.12);

  box-sizing: border-box;
}

.result-header {
  flex-shrink: 0;
}

.stars {
  margin-bottom: 8px;
  font-size: 30px;
}

.result-card h2 {
  margin: 0 0 8px;

  color: #5f4b3b;
  font-size: 34px;
}

.result-message {
  margin: 0;

  color: #8a5a35;
  font-size: 19px;
  font-weight: 900;
}

/* ==============================
   Result Stats
============================== */
.result-stats {
  margin: 18px 0 16px;
  padding: 14px 20px;

  background: #f9f4eb;
  border-radius: 18px;
}

.stat-row {
  padding: 7px 0;

  display: flex;
  justify-content: space-between;
  align-items: center;

  font-size: 16px;
}

.stat-row:not(:last-child) {
  border-bottom: 1px solid #eadfce;
}

.stat-row span {
  color: #8a7766;
  font-weight: 700;
}

.stat-row strong {
  color: #5f4b3b;
  font-size: 17px;
  font-weight: 900;
}

/* ==============================
   Wrong Review
============================== */
.review-section {
  margin-top: 4px;
}

.review-section h3 {
  margin: 0 0 12px;

  color: #7c6047;
  font-size: 21px;
  font-weight: 900;
}

.review-grid {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 10px;
}

.review-card {
  min-width: 0;
  padding: 12px 10px;

  background: #fffdf8;
  border: 2px solid #eadfce;
  border-radius: 14px;

  box-shadow: 0 6px 14px rgba(120, 90, 60, 0.08);
}

.review-kana {
  color: #5f4b3b;
  font-size: 21px;
  font-weight: 800;
  line-height: 1.3;

  overflow-wrap: anywhere;
}

.review-kanji {
  margin-top: 5px;

  color: #8f9d83;
  font-size: 25px;
  font-weight: 800;
  line-height: 1.3;

  overflow-wrap: anywhere;
}

.review-meaning {
  margin-top: 7px;

  color: #8a5a35;
  font-size: 16px;
  font-weight: 800;
  line-height: 1.4;

  overflow-wrap: anywhere;
}

.perfect-review {
  margin-top: 20px;
  padding: 18px;

  background: #f9f4eb;
  border: 2px solid #eadfce;
  border-radius: 18px;

  color: #7c6047;
  font-size: 17px;
  font-weight: 800;
}

/* ==============================
   Buttons
============================== */
.result-buttons {
  margin-top: auto;
  padding-top: 18px;

  display: flex;
  justify-content: center;
  gap: 14px;
}

.result-buttons button {
  padding: 13px 26px;

  border: none;
  border-radius: 999px;

  background: #8f9d83;
  color: white;

  font-size: 17px;
  font-weight: 900;

  cursor: pointer;
  transition: 0.2s;

  box-shadow: 0 8px 18px rgba(111, 125, 99, 0.22);
}

.result-buttons button:hover {
  transform: translateY(-3px);
  background: #78886b;
}

/* ==============================
   Responsive
============================== */
@media (max-width: 480px) {
  .vocab-board {
    width: 100%;
    padding: 16px;

    box-sizing: border-box;
  }

  .quiz-info,
  .quiz-content,
  .result-card {
    width: 100%;
    max-width: 100%;

    box-sizing: border-box;
  }

  .quiz-info {
    gap: 12px;
    padding: 12px 14px;
  }

  .progress-bar {
    width: min(160px, 100%);
  }

  .result-card {
    margin-left: 4px;
    padding: 22px 18px;
  }

  .review-grid {
    grid-template-columns: 1fr;
  }

  .result-buttons {
    flex-direction: column;
  }

  .result-buttons button {
    width: 100%;
  }
}
</style>