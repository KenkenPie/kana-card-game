<script setup>
const emit = defineEmits(["start", "back"]);

const stages = [
  {
    id: "hiragana",
    title: "平假名",
    desc: "看平假名，選正確發音",
  },
  {
    id: "katakana",
    title: "片假名",
    desc: "看片假名，選正確發音",
  },
  {
    id: "mixed",
    title: "平片混合",
    desc: "平假名與片假名混合練習",
  },
];

function chooseStage(stage) {
  emit("start", stage);
}
</script>

<template>
  <section class="stage-select">
    <h1>五十音練習</h1>
    <p class="subtitle">選擇練習關卡</p>

    <div class="stage-list">
      <button
        v-for="stage in stages"
        :key="stage.id"
        class="stage-card"
        @click="chooseStage(stage)"
      >
        <h2>{{ stage.title }}</h2>
        <p>{{ stage.desc }}</p>
      </button>
    </div>

    <button
      type="button"
      class="back-button"
      @click="emit('back')"
    >
      ← 回遊戲首頁
    </button>
  </section>
</template>

<style scoped>
/* ==============================
   選關畫面
   高度交由 GameShell 控制
============================== */

.stage-select {
  width: 100%;
  height: 100%;

  padding: 24px;

  box-sizing: border-box;

  display: flex;
  flex-direction: column;
  justify-content: center;

  color: #5f4b3b;
  text-align: center;
}

.stage-select h1{
    margin:0;
    font-size:48px;
    font-weight:900;
    color:#5f4b3b;
}
.subtitle {
  margin: 10px 0 36px;
  font-size: 18px;
  font-weight: 700;
  color: #8a7766;
}

.stage-list {
  display: grid;
  grid-template-columns: 1fr;
  gap: 18px;
}

.stage-card {
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

.stage-card:hover {
  transform: translateY(-5px);
  background: #fff7ea;
  box-shadow: 0 18px 42px rgba(120, 90, 60, 0.18);
}

.stage-card h2 {
  margin: 0 0 8px;
  font-size: 28px;
  color: #5f4b3b;
}

.stage-card p {
  margin: 0;
  font-size: 15px;
  line-height: 1.6;
  color: #7d6d5f;
}

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

</style>
