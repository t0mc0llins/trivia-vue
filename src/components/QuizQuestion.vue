<script lang="ts" setup>
const { question, answers, category, handleAnswer } = defineProps<{
  answers: string[]
  question: string
  category: string
  handleAnswer: (answer: string) => void
}>()

const parseHtml = (str: string) => {
  const tempDiv = document.createElement('div')
  tempDiv.innerHTML = str
  return tempDiv.textContent || tempDiv.innerText || ''
}
</script>

<template>
  <div>
    <h2>{{ parseHtml(category) }}</h2>
    <p>{{ parseHtml(question) }}</p>
    <div v-for="answer in answers" :key="answer">
      <button @click="handleAnswer(answer)">{{ parseHtml(answer) }}</button>
    </div>
  </div>
</template>
