<script setup>
defineProps({
  proverb: {
    type: Object,
    required: true,
  },
});
</script>

<template>
  <article class="daily-proverb-card">
    <div class="proverb-label">
      <span>今日のことわざ</span>
      <span>每日一句</span>
    </div>

    <div class="proverb-body">
      <p class="proverb-japanese">
        {{ proverb.japanese }}
      </p>

      <p class="proverb-reading">
        {{ proverb.reading }}
      </p>

      <p class="proverb-meaning">
        {{ proverb.meaning }}
      </p>

      <p class="proverb-explanation">
        {{ proverb.explanation }}
      </p>
    </div>
  </article>
</template>

<style scoped>
.daily-proverb-card {
  position: relative;

  width: 100%;
  padding: 22px 26px 24px;

  overflow: hidden;
  box-sizing: border-box;

  background:
    linear-gradient(
      135deg,
      rgba(255, 253, 248, 0.96),
      rgba(250, 245, 235, 0.88)
    );
  border: 2px solid rgba(234, 223, 206, 0.9);
  border-radius: 22px;
  color: #5f4b3b;
  text-align: left;

  box-shadow: 0 8px 22px rgba(120, 90, 60, 0.08);
}

.daily-proverb-card::after {
  content: "”";
  position: absolute;
  right: 22px;
  bottom: -20px;

  color: rgba(143, 157, 131, 0.12);
  font-family: Georgia, serif;
  font-size: 112px;
  line-height: 1;
  pointer-events: none;
}

.proverb-label {
  width: fit-content;
  margin-bottom: 16px;
  padding: 7px 12px;

  display: flex;
  align-items: center;
  gap: 10px;

  background: #eef3e6;
  border-radius: 999px;
  color: #56634d;

  font-size: 13px;
  font-weight: 900;
}

.proverb-body {
  position: relative;
  z-index: 1;
}

.proverb-japanese {
  margin: 0;

  color: #5f4b3b;
  font-size: 30px;
  font-weight: 900;
  line-height: 1.35;

  overflow-wrap: anywhere;
}

.proverb-reading {
  margin: 6px 0 18px;

  color: #8a7766;
  font-size: 16px;
  font-weight: 800;
  line-height: 1.5;

  overflow-wrap: anywhere;
}

.proverb-meaning {
  margin: 0;

  color: #7c6047;
  font-size: 18px;
  font-weight: 900;
  line-height: 1.65;
}

.proverb-explanation {
  margin: 10px 0 0;

  color: #8a7766;
  font-size: 15px;
  font-weight: 700;
  line-height: 1.7;
}

@media (max-width: 480px) {
  .daily-proverb-card {
    padding: 20px;
    border-radius: 20px;
  }

  .proverb-label {
    flex-wrap: wrap;
    gap: 6px 10px;
  }

  .proverb-japanese {
    font-size: 26px;
  }

  .proverb-reading {
    font-size: 15px;
  }

  .proverb-meaning {
    font-size: 17px;
  }
}
</style>
