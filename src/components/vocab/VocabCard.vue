<script setup>
import { computed } from "vue";

// ==============================
// 接收 VocabBoard 傳入的資料
// ==============================
const props = defineProps({
  kana: {
    type: String,
    required: true,
  },

  kanji: {
    type: String,
    default: "",
  },

  meaning: {
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
// 傳送事件給 VocabBoard
// ==============================
const emit = defineEmits(["answer", "play-sound"]);

// ==============================
// 玩家點擊中文選項
// ==============================
function chooseAnswer(option) {
  if (props.isAnswered) return;

  const isCorrect = option === props.correctAnswer;

  emit("answer", {
    selected: option,
    correctAnswer: props.correctAnswer,
    isCorrect,
  });
}

function playCurrentSound() {
  emit("play-sound");
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

const kanaSizeClass = computed(() => {
  const kanaLength = Array.from(props.kana).length;

  if (kanaLength >= 8) return "is-extra-long";
  if (kanaLength >= 6) return "is-long";

  return "";
});
</script>

<template>
  <section class="vocab-card">
    <button
      type="button"
      class="sound-button"
      aria-label="播放單字發音"
      @click.stop="playCurrentSound"
    >
      🔊
    </button>

    <!-- ==============================
         題目區
         作答前只顯示假名
         作答後顯示假名、漢字、中文
    ============================== -->
    <div class="word-display">
      <div :class="['word-kana', kanaSizeClass]">
        {{ kana }}
      </div>

      <div v-if="isAnswered" class="answer-detail">
        <div v-if="kanji" class="word-kanji">
          {{ kanji }}
        </div>

        <div class="word-meaning">
          {{ meaning }}
        </div>
      </div>
    </div>

    <!-- ==============================
         中文選項
    ============================== -->
    <div class="option-list">
      <button
        v-for="option in options"
        :key="option"
        type="button"
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
.vocab-card {
  position: relative;

  width: min(100%, 440px);
  margin: 0 auto;
  padding: 28px;

  box-sizing: border-box;

  background: #fffdf8;
  border: 2px solid #eadfce;
  border-radius: 28px;

  box-shadow: 0 12px 30px rgba(120, 90, 60, 0.12);

  text-align: center;
}

.sound-button {
  position: absolute;
  top: 18px;
  right: 18px;

  width: 40px;
  height: 40px;
  padding: 0;

  display: inline-flex;
  align-items: center;
  justify-content: center;

  border: 2px solid #eadfce;
  border-radius: 999px;

  background: #fffaf1;
  color: #5f4b3b;

  font-size: 19px;
  line-height: 1;

  cursor: pointer;
  box-shadow: 0 6px 14px rgba(120, 90, 60, 0.1);
  transition:
    transform 0.16s ease,
    box-shadow 0.16s ease,
    background 0.16s ease;

  outline: none;
  -webkit-tap-highlight-color: transparent;
  touch-action: manipulation;
}

.sound-button:hover {
  transform: scale(1.06);
  background: #fff7ea;
  box-shadow: 0 10px 20px rgba(120, 90, 60, 0.16);
}

.sound-button:active {
  transform: scale(0.96);
  box-shadow: 0 4px 10px rgba(120, 90, 60, 0.12);
}

.sound-button:focus-visible {
  box-shadow:
    0 0 0 3px rgba(143, 157, 131, 0.25),
    0 6px 14px rgba(120, 90, 60, 0.1);
}

/* ==============================
   單字顯示區
============================== */
.word-display {
  min-height: 150px;
  margin-bottom: 28px;

  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
}

.word-kana {
  max-width: 100%;

  color: #5f4b3b;
  font-size: 62px;
  font-weight: 700;
  line-height: 1.2;

  white-space: nowrap;
}

.word-kana.is-long {
  font-size: 52px;
}

.word-kana.is-extra-long {
  font-size: 44px;
}

.answer-detail {
  margin-top: 14px;
}

.word-kanji {
  color: #8f9d83;
  font-size: 36px;
  font-weight: 800;
  line-height: 1.2;
}

.word-meaning {
  margin-top: 6px;

  color: #8a5a35;
  font-size: 22px;
  font-weight: 800;
  line-height: 1.4;
}

/* ==============================
   選項區
============================== */
.option-list {
  display: grid;
  grid-template-columns: repeat(2, minmax(0, 1fr));
  gap: 14px;
}

.option-btn {
  min-width: 0;
  min-height: 58px;
  padding: 14px 16px;

  box-sizing: border-box;

  border: none;
  border-radius: 18px;

  background: #f3eadc;
  color: #5f4b3b;

  font-size: 20px;
  font-weight: 700;
  line-height: 1.35;

  cursor: pointer;

  transition:
    background 0.2s,
    color 0.2s,
    transform 0.2s;

  overflow-wrap: anywhere;

  outline: none;
  -webkit-tap-highlight-color: transparent;
  touch-action: manipulation;
}

/* ==============================
   預設 focus / active
   避免手機點擊後殘留奇怪底色
============================== */
.option-btn:focus,
.option-btn:focus-visible,
.option-btn:active {
  outline: none;
  background: #f3eadc;
  color: #5f4b3b;
}

/* ==============================
   只有支援滑鼠 hover 的裝置才套用
============================== */
@media (hover: hover) {
  .option-btn:not(.answered):hover {
    transform: translateY(-2px);
    background: #e7d6c0;
  }
}

/* ==============================
   答對
   即使按鈕仍在 focus / active 狀態
   也維持綠色
============================== */
.option-btn.is-correct,
.option-btn.is-correct:focus,
.option-btn.is-correct:focus-visible,
.option-btn.is-correct:active {
  background: #b9dfc3;
  color: #2f5d3a;
}

/* ==============================
   答錯
   即使按鈕仍在 focus / active 狀態
   也維持紅色
============================== */
.option-btn.is-wrong,
.option-btn.is-wrong:focus,
.option-btn.is-wrong:focus-visible,
.option-btn.is-wrong:active {
  background: #f2b8b5;
  color: #7a2e2a;
}

/* ==============================
   已作答後不再允許 hover 位移
============================== */
.option-btn.answered {
  cursor: default;
}

@media (hover: hover) {
  .option-btn.answered:hover {
    transform: none;
  }
}

/* ==============================
   Responsive
============================== */
@media (max-width: 480px) {
  .vocab-card {
    padding: 22px;
    border-radius: 24px;
  }

  .sound-button {
    top: 14px;
    right: 14px;

    width: 42px;
    height: 42px;
  }

  .word-display {
    min-height: 136px;
    margin-bottom: 24px;
  }

  .word-kana {
    font-size: 48px;
  }

  .word-kana.is-long {
    font-size: 41px;
  }

  .word-kana.is-extra-long {
    font-size: 34px;
  }

  .word-kanji {
    font-size: 31px;
  }

  .word-meaning {
    font-size: 20px;
  }

  .option-btn {
    min-height: 56px;
    padding: 13px 12px;

    font-size: 18px;
  }
}
</style>
