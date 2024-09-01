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
  <main class="home-view">
    <h2>General knowledge</h2>

    <div class="body">
      <div class="setting">
        <p>1. Select quiz length</p>
        <div class="quiz-length">
          <div v-for="option in quizLengthOptions" :key="option.value">
            <input
              type="radio"
              name="quizLength"
              v-model="quizLength"
              :value="option.value"
              :id="'quizLength-' + option.value"
            />
            <label :for="'quizLength-' + option.value">{{
              option.label + ' (' + option.value + ' questions)'
            }}</label>
          </div>
        </div>
      </div>

      <div class="setting">
        <p>2. Select quiz difficulty</p>
        <div class="quiz-difficulty">
          <div v-for="option in quizDifficultyOptions" :key="option.value">
            <button class="primary" @click="handleSelectDifficulty(option.value, quizLength)">
              {{ 'Start ' + option.label }}
            </button>
          </div>
        </div>
      </div>
    </div>
  </main>
</template>

<style scoped>
main {
  display: flex;
  flex-direction: column;
  > h2 {
    color: #333;
    margin-bottom: 20px;
  }

  > div.body {
    flex: 1;
    display: flex;
    flex-direction: column;
    justify-content: space-evenly;
    > div.setting {
      display: flex;
      flex-direction: column;
      justify-content: center;
      > p {
        font-size: 1em;
        margin-bottom: 20px;
        color: #666;
      }

      > div {
        margin-bottom: 20px;
        display: flex;
        justify-content: center;
        flex-wrap: wrap;
        gap: 10px;

        > div {
          display: flex;
          cursor: pointer;
          > input[type='radio'] {
            margin-right: 10px;
            cursor: pointer;
          }

          > label {
            margin-right: 20px;
            font-weight: bold;
            cursor: pointer;
          }
        }
      }
    }

    @media screen and (max-width: 600px) {
      > div.setting {
        align-items: center;
        > p {
          width: 250px;
          text-align: left;
        }
        > div {
          width: 100%;
          flex-direction: column;
          &.quiz-length {
            align-items: center;
            > div {
              width: 250px;
            }
          }
          > div {
            button {
              width: 100%;
            }
          }
        }
      }
    }
  }
}
</style>
