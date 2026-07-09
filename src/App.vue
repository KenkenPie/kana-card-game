<script setup>
import { ref } from "vue";
import QuizGame from "./components/quiz/QuizGame.vue";
import VocabGame from "./components/vocab/VocabGame.vue";

const currentPage = ref("home");

function openGame(game) {
  currentPage.value = game;
}

function backToHome() {
  currentPage.value = "home";
}
</script>

<template>
  <!-- 首頁 -->
  <main v-if="currentPage === 'home'" class="quiz-game">
    <div class="game-shell">
      <section class="home-screen">
        <h1>日文學習遊戲</h1>
        <p class="subtitle">選擇想要練習的內容</p>

        <div class="game-list">
          <button
            type="button"
            class="game-card"
            @click="openGame('kana')"
          >
            <h2>五十音練習</h2>
            <p>練習平假名、片假名與羅馬拼音</p>
          </button>

          <button
            type="button"
            class="game-card"
            @click="openGame('vocab')"
          >
            <h2>單字練習</h2>
            <p>看假名，選出正確的中文意思</p>
          </button>
        </div>
      </section>
    </div>
  </main>

  <!-- 五十音遊戲 -->
  <QuizGame
    v-else-if="currentPage === 'kana'"
    @back="backToHome"
  />

  <!-- 單字遊戲 -->
  <VocabGame
    v-else
    @back="backToHome"
  />
</template>

<style scoped>
/* ==============================
   與 QuizGame.vue 完全相同的外層
============================== */
.quiz-game {
  min-height: 100dvh;
  padding: 16px;
  box-sizing: border-box;

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
}

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
   首頁內容
   尺寸與 StageSelect 一樣交給 game-shell 控制
============================== */
.home-screen {
  width: 100%;
  height: 100%;
  padding: 24px;

  display: flex;
  flex-direction: column;
  justify-content: center;

  box-sizing: border-box;

  color: #5f4b3b;
  text-align: center;
}

.home-screen h1 {
  margin: 0;

  font-size: 48px;
  font-weight: 900;
  color: #5f4b3b;
}

.subtitle {
  margin: 10px 0 36px;

  font-size: 18px;
  font-weight: 700;
  color: #8a7766;
}

.game-list {
  display: grid;
  grid-template-columns: 1fr;
  gap: 18px;
}

.game-card {
  width: 100%;
  padding: 24px 26px;

  border: 2px solid #eadfce;
  border-radius: 24px;

  background: rgba(255, 253, 248, 0.95);
  color: #5f4b3b;

  text-align: left;
  cursor: pointer;

  box-shadow: 0 12px 30px rgba(120, 90, 60, 0.12);
  transition: 0.25s;
}

.game-card:hover {
  transform: translateY(-5px);
  background: #fff7ea;
  box-shadow: 0 18px 42px rgba(120, 90, 60, 0.18);
}

.game-card h2 {
  margin: 0 0 8px;

  font-size: 28px;
  color: #5f4b3b;
}

.game-card p {
  margin: 0;

  font-size: 15px;
  line-height: 1.6;
  color: #7d6d5f;
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