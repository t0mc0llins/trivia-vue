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
  <div class="question-view" :class="$style.questionView">
    <h2>{{ parseHtml(category) }}</h2>
    <p>{{ parseHtml(question) }}</p>
    <div :class="$style.answersContainer">
      <div v-for="answer in answers" :key="answer" :class="$style.answerWrapper">
        <button class="primary" :class="$style.primaryButton" @click="handleAnswer(answer)">
          {{ parseHtml(answer) }}
        </button>
      </div>
    </div>
  </div>
</template>

<style module>
.questionView {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 20px;
  width: 100%;
  max-width: 600px;
  margin-bottom: 20px;
}

.questionView > h2 {
  color: #333;
  margin-bottom: 10px;
}

.questionView > p {
  height: 50px;
  font-size: 1.1em;
}

.answersContainer {
  display: flex;
  justify-content: center;
  flex-wrap: wrap;
  gap: 20px;
  width: 100%;
  height: 160px;
}

.answerWrapper {
  height: 70px;
  width: 45%;
}

.primaryButton {
  border: none;
  padding: 10px 20px;
  font-size: 1em;
  cursor: pointer;
  border-radius: 5px;
  width: 100%;
  height: 100%;
  transition: background-color 0.3s ease;
  color: white;
  background-color: #4caf50;
}

.primaryButton:hover {
  background-color: #388e3c;
}

@media screen and (max-width: 600px) {
  .questionView > h2 {
    height: 65px;
  }

  .questionView > p {
    height: 80px;
  }

  .answersContainer {
    flex-direction: column;
    height: auto;
    flex-wrap: nowrap;
  }

  .answerWrapper {
    width: 100%;
    height: auto;
  }
}
</style>
