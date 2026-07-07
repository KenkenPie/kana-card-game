<script setup>
import { playKanaSound } from "../../utils/audio.js";

// ==============================
// 接收 QuizBoard 傳入的資料
// ==============================
const props = defineProps({
  kana: {
    type: String,
    required: true,
  },

  romaji: {
    type: String,
    required: true,
  },

  options: {
    type: Array,
    required: true,
  },

  selectedAnswer: {
    type: String,
    default: null,
  },

  isAnswered: {
    type: Boolean,
    default: false,
  },

  correctAnswer: {
    type: String,
    required: true,
  },
});

// ==============================
// 傳送事件給 QuizBoard
// ==============================
const emit = defineEmits(["answer"]);

// ==============================
// 玩家點擊選項
// 不論玩家是否答對，都播放目前題目的正確發音
// 幫助玩家立即建立假名與發音的連結
// ==============================
function chooseAnswer(option) {
  if (props.isAnswered) return;

  // 不管玩家點哪個答案，都播放正確答案的發音
  playKanaSound(props.romaji);

  const isCorrect = option === props.romaji;

  emit("answer", {
    selected: option,
    correctAnswer: props.romaji,
    isCorrect,
  });
}

// ==============================
// 判斷選項按鈕樣式
// ==============================
function getOptionClass(option) {
  if (!props.isAnswered) return "";

  if (option === props.correctAnswer) {
    return "is-correct";
  }

  if (option === props.selectedAnswer) {
    return "is-wrong";
  }

  return "";
}
</script>

<template>
  <section class="kana-card">
    <div class="kana-display">
      {{ kana }}
    </div>

    <div class="option-list">
      <button
        v-for="option in options"
        :key="option"
        :class="[
          'option-btn',
          getOptionClass(option),
          { answered: isAnswered },
        ]"
        @click="chooseAnswer(option)"
      >
        {{ option }}
      </button>
    </div>
  </section>
</template>

<style scoped>
.kana-card {
  width: min(100%, 420px);
  margin: 0 auto;
  padding: 28px;

  box-sizing: border-box;

  background: #fffdf8;
  border: 2px solid #eadfce;
  border-radius: 28px;
  box-shadow: 0 12px 30px rgba(120, 90, 60, 0.12);
  text-align: center;
}

.kana-display {
  margin-bottom: 28px;
  font-size: 96px;
  font-weight: 700;
  line-height: 1;
  color: #5f4b3b;
}

.option-list {
  display: grid;
  grid-template-columns: repeat(2, minmax(0, 1fr));
  gap: 14px;
}


.option-btn {
  min-width: 0;
  padding: 14px 16px;

  box-sizing: border-box;

  border: none;
  border-radius: 18px;
  background: #f3eadc;
  color: #5f4b3b;
  font-size: 22px;
  font-weight: 700;
  cursor: pointer;
  transition: 0.2s;
}

.option-btn:not(.answered):hover {
  transform: translateY(-2px);
  background: #e7d6c0;
}

.option-btn.is-correct {
  background: #b9dfc3;
  color: #2f5d3a;
}

.option-btn.is-wrong {
  background: #f2b8b5;
  color: #7a2e2a;
}

@media (max-width: 480px) {
  .kana-card {
    padding: 22px;
    border-radius: 24px;
  }

  .kana-display {
    font-size: 82px;
  }

  .option-btn {
    font-size: 20px;
  }
}
</style>
