<script setup>
import { ref, computed } from "vue";
import { kanaData } from "../../data/kanaData.js";
import KanaCard from "./KanaCard.vue";
import { playKanaSound } from "../../utils/audio";

// ==============================
// 接收 QuizGame 傳入的關卡資料
// ==============================
const props = defineProps({
  stage: {
    type: Object,
    required: true,
  },
});

// 傳送事件給 QuizGame
// ==============================
const emit = defineEmits(["restart", "back"]);

// ==============================
// 遊戲基本設定
// ==============================
const QUESTION_COUNT = 10;

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
// 從 kanaData 隨機抽出指定題數
// ==============================
const quizQuestions = ref(
  [...kanaData].sort(() => Math.random() - 0.5).slice(0, QUESTION_COUNT),
);

// ==============================
// 目前題目
// ==============================
const currentQuestion = computed(() => quizQuestions.value[currentIndex.value]);

// ==============================
// 根據關卡決定顯示平假名、片假名或混合
// ==============================
const displayKana = computed(() => {
  if (props.stage.id === "katakana") {
    return currentQuestion.value.katakana;
  }

  if (props.stage.id === "mixed") {
    return Math.random() > 0.5
      ? currentQuestion.value.hiragana
      : currentQuestion.value.katakana;
  }

  return currentQuestion.value.hiragana;
});

// ==============================
// 產生四個選項
// 1 個正確答案 + 3 個錯誤答案
// ==============================
const currentOptions = computed(() => {
  const correctAnswer = currentQuestion.value.romaji;

  const wrongOptions = kanaData
    .filter((item) => item.romaji !== correctAnswer)
    .sort(() => Math.random() - 0.5)
    .slice(0, 3)
    .map((item) => item.romaji);

  return [correctAnswer, ...wrongOptions].sort(() => Math.random() - 0.5);
});

// ==============================
// 遊戲進度百分比
// 只在遊戲進行中顯示
// ==============================
const progressPercent = computed(() => {
  return ((currentIndex.value + 1) / quizQuestions.value.length) * 100;
});

// ==============================
// 正確率
// 結算畫面使用
// ==============================
const accuracy = computed(() => {
  return Math.round((correctCount.value / quizQuestions.value.length) * 100);
});

// ==============================
// 結算評語
// ==============================
const resultMessage = computed(() => {
  if (accuracy.value === 100) return "完美！五十音小天才 🌸";
  if (accuracy.value >= 80) return "很棒！已經很熟了 ✨";
  if (accuracy.value >= 60) return "不錯！再練一下會更穩 💪";
  return "慢慢來，多玩幾次就會記住!";
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
      hiragana: currentQuestion.value.hiragana,
      katakana: currentQuestion.value.katakana,
      romaji: currentQuestion.value.romaji,
    });
  }

  setTimeout(() => {
    goNextQuestion();
  }, 900);
}

// ==============================
// 播放錯題發音
// 點擊錯題卡即可重新聽一次正確發音
// ==============================
function playReviewSound(romaji) {
  playKanaSound(romaji);
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
  <section class="quiz-board">
    <!-- ==============================
         遊戲進行中的資訊列
         結算時隱藏，避免資訊重複
    ============================== -->
    <div v-if="!isFinished" class="quiz-info">
      <div>
        <p>第 {{ currentIndex + 1 }} / {{ quizQuestions.length }} 題</p>

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
         遊戲作答畫面
    ============================== -->
    <div v-if="!isFinished" class="quiz-content">
      <Transition name="card-fade" mode="out-in">
        <KanaCard
          :key="currentIndex"
          :kana="displayKana"
          :romaji="currentQuestion.romaji"
          :options="currentOptions"
          :selectedAnswer="selectedAnswer"
          :isAnswered="isAnswered"
          :correctAnswer="currentQuestion.romaji"
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
        <div class="stars">{{ resultStars }}</div>
        <h2>🎉 完成！</h2>
        <p class="result-message">{{ resultMessage }}</p>
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
          <strong>{{ correctCount }} / {{ quizQuestions.length }}</strong>
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
           只有答錯時才顯示
      ============================== -->
      <div v-if="wrongQuestions.length > 0" class="review-section">
        <h3> 錯題複習🔊 點擊即可發音 </h3>

        <div class="review-grid">
          <div
            v-for="(item, index) in wrongQuestions"
            :key="index"
            class="review-card"
            @click="playReviewSound(item.romaji)"
          >
            <div class="review-hiragana">
              {{ item.hiragana }}
            </div>

            <div class="review-katakana">
              {{ item.katakana }}
            </div>

            <div class="review-romaji">
              {{ item.romaji }}
            </div>
          </div>
        </div>
      </div>

      <!-- ==============================
           全部答對時的提示
      ============================== -->
      <div v-else class="perfect-review">真棒!沒有錯題需要複習♥</div>

      <!-- ==============================
           結算按鈕
      ============================== -->
      <div class="result-buttons">
        <button @click="emit('restart')">再玩一次</button>
        <button @click="emit('back')">回選關</button>
      </div>
    </div>
  </section>
</template>

<style scoped>
/* ==============================
   Layout
============================== */
.quiz-board {
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
   注意：這裡不再新增 ::before
   雙卡紙效果由外層 GameShell 的原有底卡提供
============================== */
.result-card {
  height: 100%;

  /* 讓原本 GameShell 底卡露出一點點，形成雙卡紙感 */
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
  grid-template-columns: repeat(5, 1fr);
  gap: 10px;
}

.review-card {
  padding: 8px;

  background: #fffdf8;
  border: 2px solid #eadfce;
  border-radius: 14px;
  cursor: pointer;
  box-shadow: 0 6px 14px rgba(120, 90, 60, 0.08);
  transition: 0.2s;
}

.review-card:hover {
  transform: translateY(-3px) scale(1.03);
  box-shadow: 0 10px 20px rgba(120, 90, 60, 0.12);
}

.review-card:hover {
  transform: translateY(-3px);
  box-shadow: 0 10px 20px rgba(120, 90, 60, 0.12);
}

.review-hiragana {
  color: #5f4b3b;
  font-size: 30px;
  font-weight: 700;
  line-height: 1;
}

.review-katakana {
  margin-top: 4px;

  color: #8f9d83;
  font-size: 22px;
  line-height: 1;
}

.review-romaji {
  margin-top: 8px;

  color: #8a5a35;
  font-size: 17px;
  font-weight: 800;
  line-height: 1;
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
@media (max-width: 768px) {
  .review-grid {
    grid-template-columns: repeat(2, 1fr);
  }
}

@media (max-width: 480px) {
  .quiz-board {
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

  .progress-bar {
    width: min(160px, 100%);
  }

}
</style>
