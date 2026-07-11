<script setup>
const QUESTION_COUNT_OPTIONS = [10, 20, 30];
const QUESTION_RANGE_OPTIONS = [
  { value: "basic", label: "基礎五十音" },
  { value: "all", label: "包含進階音" },
];

const props = defineProps({
  stage: {
    type: Object,
    required: true,
  },
  modelValue: {
    type: Number,
    default: 10,
  },
  availableCount: {
    type: Number,
    required: true,
  },
  showRange: {
    type: Boolean,
    default: false,
  },
  range: {
    type: String,
    default: "basic",
  },
});

const emit = defineEmits(["update:modelValue", "update:range", "start", "back"]);
</script>

<template>
  <section class="question-count-select">
    <div class="count-header">
      <h1>{{ stage.title }}</h1>
      <p class="subtitle">選擇本輪題數</p>
    </div>

    <div
      v-if="availableCount < modelValue"
      class="count-notice"
    >
      此關卡目前共有 {{ availableCount }} 題，將使用全部題目
    </div>

    <div class="count-options" role="radiogroup" aria-label="選擇題數">
      <button
        v-for="count in QUESTION_COUNT_OPTIONS"
        :key="count"
        type="button"
        class="count-option"
        :class="{ selected: modelValue === count }"
        :aria-pressed="modelValue === count"
        @click="emit('update:modelValue', count)"
      >
        {{ count }} 題
      </button>
    </div>

    <div v-if="showRange" class="range-section">
      <h2>題目範圍</h2>
      <div class="range-options" role="radiogroup" aria-label="選擇題目範圍">
        <button
          v-for="option in QUESTION_RANGE_OPTIONS"
          :key="option.value"
          type="button"
          class="count-option range-option"
          :class="{ selected: range === option.value }"
          :aria-pressed="range === option.value"
          @click="emit('update:range', option.value)"
        >
          {{ option.label }}
        </button>
      </div>
    </div>

    <button
      type="button"
      class="start-button"
      @click="emit('start')"
    >
      開始遊戲
    </button>

    <button
      type="button"
      class="back-button"
      @click="emit('back')"
    >
      ← 回選關
    </button>
  </section>
</template>

<style scoped>
.question-count-select {
  width: 100%;
  height: 100%;
  padding: 24px;

  display: flex;
  flex-direction: column;
  justify-content: center;

  color: #5f4b3b;
  text-align: center;

  box-sizing: border-box;
}

.count-header {
  margin-bottom: 30px;
}

.question-count-select h1 {
  margin: 0;

  color: #5f4b3b;
  font-size: 44px;
  font-weight: 900;
}

.subtitle {
  margin: 10px 0 0;

  color: #8a7766;
  font-size: 18px;
  font-weight: 700;
}

.count-notice {
  margin: 0 auto 18px;
  padding: 10px 16px;

  background: rgba(255, 253, 248, 0.9);
  border: 2px solid #eadfce;
  border-radius: 16px;
  color: #8a5a35;

  font-size: 15px;
  font-weight: 800;
}

.count-options {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 12px;
}

.range-section {
  margin-top: 22px;
}

.range-section h2 {
  margin: 0 0 12px;
  color: #5f4b3b;
  font-size: 20px;
  font-weight: 900;
}

.range-options {
  display: grid;
  grid-template-columns: repeat(2, minmax(0, 1fr));
  gap: 12px;
}

.range-option {
  width: 100%;
}

.count-option {
  min-height: 56px;
  padding: 12px 10px;

  border: 2px solid #eadfce;
  border-radius: 18px;

  background: rgba(255, 253, 248, 0.95);
  color: #5f4b3b;

  font-size: 18px;
  font-weight: 900;

  cursor: pointer;
  transition: 0.2s;
}

.count-option:hover {
  transform: translateY(-2px);
  background: #fff7ea;
}

.count-option.selected {
  border-color: #8f9d83;
  background: #eef3e6;
  color: #56634d;
  box-shadow: 0 8px 18px rgba(111, 125, 99, 0.16);
}

.start-button {
  margin: 28px auto 0;
  padding: 13px 28px;

  border: none;
  border-radius: 999px;

  background: #8f9d83;
  color: white;

  font-size: 18px;
  font-weight: 900;

  cursor: pointer;
  transition: 0.2s;
  box-shadow: 0 8px 18px rgba(111, 125, 99, 0.22);
}

.start-button:hover {
  transform: translateY(-3px);
  background: #78886b;
}

.back-button {
  margin: 18px auto 0;
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

@media (max-width: 480px) {
  .question-count-select {
    padding: 20px;
  }

  .question-count-select h1 {
    font-size: 36px;
  }

  .count-options {
    gap: 10px;
  }

  .count-option {
    min-height: 52px;
    font-size: 16px;
  }


  .range-options {
    gap: 10px;
  }

  .range-option {
    padding-inline: 8px;
    font-size: 15px;
  }
}
</style>
