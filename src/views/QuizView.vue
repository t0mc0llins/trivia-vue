<script setup lang="ts">
import { computed, onMounted, ref } from 'vue'
import router from '@/router'
import QuizQuestion from '@/components/QuizQuestion.vue'
import { useLocalStorage } from '@/composables/useLocalStorage'
import QuizCompleted from '@/components/QuizCompleted.vue'

const questions = ref<Question[]>([])
const quizProgress = useLocalStorage(0, 'quizProgress')
const quizScore = useLocalStorage(0, 'quizScore')

onMounted(() => {
  const quizQuestions = localStorage.getItem('quizQuestions')
  if (!quizQuestions) {
    router.push('/')
  } else {
    questions.value = JSON.parse(quizQuestions)
  }
})

const handleAnswer = (answer: string) => {
  const currentQuestion = questions.value[quizProgress.value]

  if (answer === currentQuestion.correct_answer) {
    quizScore.value++
  }

  quizProgress.value++
}

const handleResetQuiz = () => {
  localStorage.removeItem('quizQuestions')
  localStorage.removeItem('quizProgress')
  localStorage.removeItem('quizScore')
  router.push('/')
}

const currentQuestion = computed(() => questions.value[quizProgress.value])
const quizLength = computed(() => questions.value.length)

const shuffledAnswers = computed(() => {
  const answers = [...currentQuestion.value.incorrect_answers, currentQuestion.value.correct_answer]

  return answers.sort(() => Math.random() - 0.5)
})
</script>

<template>
  <main class="quiz-view">
    <div class="question" v-if="quizProgress !== quizLength">
      <QuizQuestion
        :question="currentQuestion.question"
        :category="currentQuestion.category"
        :answers="shuffledAnswers"
        :handleAnswer="handleAnswer"
      />
      <div class="status">
        <p>Progress: {{ quizProgress + 1 }} / {{ quizLength }}</p>
        <button class="secondary" @click="handleResetQuiz">New quiz</button>
      </div>
    </div>
    <QuizCompleted
      v-else
      :quizScore="quizScore"
      :quizLength="quizLength"
      :handleResetQuiz="handleResetQuiz"
    />
  </main>
</template>

<style scoped>
div.question {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-between;
  flex: 1;
  > div.status {
    gap: 10px;
    display: flex;
    flex-direction: column;
    > p {
      font-size: 1.1em;
      margin: 0;
    }
  }
}
</style>
