<script lang="ts" setup>
const { quizScore, quizLength, handleResetQuiz } = defineProps<{
  quizScore: number
  quizLength: number
  handleResetQuiz: () => void
}>()
</script>

<template>
  <div>
    <h2>Quiz Completed</h2>
    <p>Score: {{ quizScore }} / {{ quizLength }}</p>
    <button class="secondary" @click="handleResetQuiz">Play Again</button>
  </div>
</template>

<style scoped>
div {
  text-align: center;
  display: flex;
  flex: 1;
  flex-direction: column;
  align-items: center;
  justify-content: center;

  > h2 {
    color: #333;
    margin-bottom: 10px;
  }

  > p {
    font-size: 1.1em;
    margin-bottom: 20px;
  }
}
</style>
