<script setup lang="ts">
import { computed, onMounted, ref } from 'vue'
import router from '@/router'
import QuizQuestion from '@/components/QuizQuestion.vue'
import { useLocalStorage } from '@/composables/useLocalStorage'
import QuizCompleted from '@/components/QuizCompleted.vue'
import { handleResetQuiz } from '@/services/trivia'

const questions = ref<Question[]>([])
const quizProgress = useLocalStorage(0, 'quizProgress')
const quizScore = useLocalStorage(0, 'quizScore')

onMounted(() => {
  // Redirect to home if no questions are available else load current game state
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

const currentQuestion = computed(() => questions.value[quizProgress.value] || {})
const quizLength = computed(() => questions.value.length)

const shuffledAnswers = computed(() => {
  const answers = [
    ...(currentQuestion.value?.incorrect_answers || []),
    currentQuestion.value?.correct_answer
  ]

  return answers.sort(() => Math.random() - 0.5)
})
</script>

<template>
  <main :class="$style.quizView">
    <div v-if="quizProgress !== quizLength" :class="$style.question">
      <QuizQuestion
        :question="currentQuestion.question"
        :category="currentQuestion.category"
        :answers="shuffledAnswers"
        :handleAnswer="handleAnswer"
      />
      <div :class="$style.status">
        <p :class="$style.progressText">Progress: {{ quizProgress + 1 }} / {{ quizLength }}</p>
        <button :class="$style.secondaryButton" @click="handleResetQuiz">New quiz</button>
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

<style module>
.quizView {
  display: flex;
  flex-direction: column;
}

.question {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-between;
  flex: 1;
}

.status {
  gap: 10px;
  display: flex;
  flex-direction: column;
}

.progressText {
  font-size: 1.1em;
  margin: 0;
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
