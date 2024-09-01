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
  <div class="quiz-view">
    <h2>{{ parseHtml(category) }}</h2>
    <p>{{ parseHtml(question) }}</p>
    <div class="answers-container">
      <div v-for="answer in answers" :key="answer">
        <button class="primary" @click="handleAnswer(answer)">{{ parseHtml(answer) }}</button>
      </div>
    </div>
  </div>
</template>

<style scoped>
div.quiz-view {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 20px;
  width: 100%;
  max-width: 600px;
  margin-bottom: 20px;

  > h2 {
    color: #333;
    margin-bottom: 10px;
  }

  > p {
    font-size: 1.1em;
  }

  > div.answers-container {
    display: flex;
    justify-content: center;
    flex-wrap: wrap;
    gap: 20px;
    width: 100%;
    > div {
      width: 45%;
      > button {
        width: 100%;
        height: 100%;
      }
    }
  }

  @media screen and (max-width: 600px) {
    > div.answers-container {
      flex-direction: column;
      > div {
        width: 100%;
      }
    }
  }
}
</style>
