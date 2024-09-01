<script setup lang="ts">
import { onMounted, ref } from 'vue'
import { getQuestions } from '@/services/trivia'
import router from '@/router'

onMounted(() => {
  if (localStorage.getItem('quizQuestions')) {
    router.push('/quiz')
  }
})

const quizLengthOptions: {
  value: number
  label: string
}[] = [
  { value: 5, label: 'Short' },
  { value: 10, label: 'Medium' },
  { value: 20, label: 'Long' }
]

const quizDifficultyOptions: { value: QuizDifficulty; label: string }[] = [
  { value: 'easy', label: 'Easy' },
  { value: 'medium', label: 'Medium' },
  { value: 'hard', label: 'Hard' }
]

const quizLength = ref(10)

const handleSelectDifficulty = async (difficulty: QuizDifficulty, quizLength: number) => {
  await getQuestions(quizLength, difficulty)
  router.push('/quiz')
}
</script>

<template>
  <main>
    <h1>The Trivia Quiz</h1>
    <p>Select quiz length</p>

    <div v-for="option in quizLengthOptions" :key="option.value">
      <input
        type="radio"
        name="quizLength"
        v-model="quizLength"
        :value="option.value"
        :id="'quizLength-' + option.value"
      />
      <label :for="'quizLength-' + option.value">{{ option.label }}</label>
    </div>

    <div v-for="option in quizDifficultyOptions" :key="option.value">
      <button @click="handleSelectDifficulty(option.value, quizLength)">
        {{ 'Start ' + option.label }}
      </button>
    </div>
  </main>
</template>
