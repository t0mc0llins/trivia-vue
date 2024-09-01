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
    <button @click="handleResetQuiz">Play Again</button>
  </div>
</template>
