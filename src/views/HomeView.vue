<script setup lang="ts">
import { onMounted, ref } from 'vue'
import { getQuestions } from '@/services/trivia'
import router from '@/router'

onMounted(() => {
  // Redirect to /quiz if a quiz is in progress
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
  <main class="home-view" :class="$style.homeView">
    <h2 :class="$style.heading">General knowledge</h2>

    <div :class="$style.body">
      <div :class="$style.setting">
        <p :class="$style.paragraph">1. Select quiz length</p>
        <div :class="$style.quizLength">
          <div v-for="option in quizLengthOptions" :key="option.value" :class="$style.option">
            <input
              type="radio"
              name="quizLength"
              v-model="quizLength"
              :value="option.value"
              :id="'quizLength-' + option.value"
              :class="$style.radioInput"
            />
            <label :for="'quizLength-' + option.value" :class="$style.label">{{
              option.label + ' (' + option.value + ' questions)'
            }}</label>
          </div>
        </div>
      </div>

      <div :class="$style.setting">
        <p :class="$style.paragraph">2. Select quiz difficulty</p>
        <div :class="$style.quizDifficulty">
          <div v-for="option in quizDifficultyOptions" :key="option.value" :class="$style.option">
            <button
              class="primary"
              :class="$style.primaryButton"
              @click="handleSelectDifficulty(option.value, quizLength)"
            >
              {{ 'Start ' + option.label }}
            </button>
          </div>
        </div>
      </div>
    </div>
  </main>
</template>

<style module>
.homeView {
  display: flex;
  flex-direction: column;
}

.heading {
  color: #333;
  margin-bottom: 20px;
}

.body {
  flex: 1;
  display: flex;
  flex-direction: column;
  justify-content: space-evenly;
}

.setting {
  display: flex;
  flex-direction: column;
  justify-content: center;
}

.paragraph {
  font-size: 1em;
  margin-bottom: 20px;
  color: #666;
}

.quizLength,
.quizDifficulty {
  margin-bottom: 20px;
  display: flex;
  justify-content: center;
  flex-wrap: wrap;
  gap: 10px;
}

.option {
  display: flex;
  align-items: center;
  cursor: pointer;
}

.radioInput {
  margin-right: 10px;
  cursor: pointer;
}

.label {
  margin-right: 20px;
  font-weight: bold;
  cursor: pointer;
}

.primaryButton {
  border: 1px solid #352f36;
  padding: 10px 20px;
  font-size: 1em;
  cursor: pointer;
  border-radius: 5px;
  transition: background-color 0.3s ease;
  background-color: #c1e899;
}

.primaryButton:hover {
  background-color: #55883b;
  color: #e6f0dc;
}

@media screen and (max-width: 600px) {
  .setting {
    align-items: center;
  }

  .paragraph {
    width: 250px;
    text-align: left;
  }

  .quizLength {
    width: 100%;
    flex-direction: column;
    align-items: center;

    .option {
      width: 250px;
    }
  }

  .primaryButton {
    width: 100%;
  }

  .quizDifficulty {
    width: 100%;
    flex-direction: column;

    .option {
      justify-content: center;
    }
  }
}
</style>
