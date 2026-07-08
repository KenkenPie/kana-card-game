<script setup>
// ==============================
// 傳送事件給 VocabGame
//
// start：開始單字遊戲
// back：回到整個網站的遊戲選擇首頁
// ==============================
const emit = defineEmits(["start", "back"]);

// ==============================
// 目前單字遊戲只有一個模式
//
// 之後可以再新增：
// 中文選日文
// 漢字選假名
// 分類練習
// ==============================
const stages = [
  {
    id: "n5-basic",
    title: "N5 基礎單字",
    desc: "看假名，選出正確的中文意思",
  },
];

// ==============================
// 選擇練習模式
// ==============================
function chooseStage(stage) {
  emit("start", stage);
}
</script>

<template>
  <section class="stage-select">
    <!-- ==============================
         標題
    ============================== -->
    <div class="stage-header">
      <h1>N5 Vocabulary</h1>
      <p class="subtitle">選擇單字練習模式</p>
    </div>

    <!-- ==============================
         練習模式
    ============================== -->
    <div class="stage-list">
      <button
        v-for="stage in stages"
        :key="stage.id"
        type="button"
        class="stage-card"
        @click="chooseStage(stage)"
      >
        <div>
          <h2>{{ stage.title }}</h2>
          <p>{{ stage.desc }}</p>
        </div>

        <span class="stage-arrow">→</span>
      </button>
    </div>

    <!-- ==============================
         返回遊戲首頁
    ============================== -->
    <button
      type="button"
      class="back-button"
      @click="emit('back')"
    >
      ← 回遊戲選擇
    </button>
  </section>
</template>

<style scoped>
/* ==============================
   選關畫面
   外層尺寸交給 VocabGame 的 game-shell 控制
============================== */
.stage-select {
  width: 100%;
  min-height: 100%;

  padding: 24px;

  display: flex;
  flex-direction: column;
  justify-content: center;

  color: #5f4b3b;
  text-align: center;

  box-sizing: border-box;
}

/* ==============================
   標題
============================== */
.stage-header {
  margin-bottom: 36px;
}

.stage-select h1 {
  margin: 0;

  color: #5f4b3b;
  font-size: 48px;
  font-weight: 900;
}

.subtitle {
  margin: 10px 0 0;

  color: #8a7766;
  font-size: 18px;
  font-weight: 700;
}

/* ==============================
   模式卡片
============================== */
.stage-list {
  display: grid;
  grid-template-columns: 1fr;
  gap: 18px;
}

.stage-card {
  width: 100%;
  padding: 24px 26px;

  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 20px;

  border: 2px solid #eadfce;
  border-radius: 24px;

  background: rgba(255, 253, 248, 0.95);
  color: #5f4b3b;

  text-align: left;
  cursor: pointer;

  box-shadow: 0 12px 30px rgba(120, 90, 60, 0.12);
  transition: 0.25s;
}

.stage-card:hover {
  transform: translateY(-5px);

  background: #fff7ea;

  box-shadow: 0 18px 42px rgba(120, 90, 60, 0.18);
}

.stage-card h2 {
  margin: 0 0 8px;

  color: #5f4b3b;
  font-size: 28px;
}

.stage-card p {
  margin: 0;

  color: #7d6d5f;
  font-size: 15px;
  line-height: 1.6;
}

.stage-arrow {
  flex-shrink: 0;

  color: #8f9d83;
  font-size: 32px;
  font-weight: 900;

  transition: transform 0.25s;
}

.stage-card:hover .stage-arrow {
  transform: translateX(5px);
}

/* ==============================
   返回按鈕
============================== */
.back-button {
  margin: 28px auto 0;
  padding: 11px 20px;

  border: none;
  border-radius: 999px;

  background: transparent;
  color: #8a7766;

  font-size: 16px;
  font-weight: 800;

  cursor: pointer;
  transition: 0.2s;
}

.back-button:hover {
  background: rgba(255, 253, 248, 0.7);
  color: #5f4b3b;
}

/* ==============================
   Responsive
============================== */
@media (max-width: 480px) {
  .stage-select {
    padding: 20px;
  }

  .stage-header {
    margin-bottom: 28px;
  }

  .stage-select h1 {
    font-size: 36px;
  }

  .subtitle {
    font-size: 16px;
  }

  .stage-card {
    padding: 20px;
  }

  .stage-card h2 {
    font-size: 24px;
  }

  .stage-arrow {
    font-size: 27px;
  }
}
</style>