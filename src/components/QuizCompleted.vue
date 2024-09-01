<script lang="ts" setup>
const { quizScore, quizLength, handleResetQuiz } = defineProps<{
  quizScore: number
  quizLength: number
  handleResetQuiz: () => void
}>()
</script>

<template>
  <div class="completed-quiz" :class="$style.completedQuiz">
    <h2>Quiz Completed</h2>
    <p>Score: {{ quizScore }} / {{ quizLength }}</p>
    <button class="secondary" :class="$style.secondaryButton" @click="handleResetQuiz">
      Play Again
    </button>
  </div>
</template>

<style module>
.completedQuiz {
  text-align: center;
  display: flex;
  flex: 1;
  flex-direction: column;
  align-items: center;
  justify-content: center;
}

.completedQuiz > h2 {
  color: #333;
  margin-bottom: 10px;
}

.completedQuiz > p {
  font-size: 1.1em;
  margin-bottom: 20px;
}

.secondaryButton {
  border: 1px solid gray;
  background-color: white;
  padding: 10px 20px;
  font-size: 1em;
  cursor: pointer;
  border-radius: 5px;
  transition: background-color 0.3s ease;
}

.secondaryButton:hover {
  background-color: #f1f1f1;
}
</style>
