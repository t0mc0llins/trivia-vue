<script setup lang="ts">
import { RouterView } from 'vue-router'
import router from '@/router'

const handleResetQuiz = () => {
  localStorage.removeItem('quizQuestions')
  localStorage.removeItem('quizProgress')
  localStorage.removeItem('quizScore')
  router.push('/')
}
</script>

<template>
  <header>
    <h1 style="cursor: pointer" @click="handleResetQuiz">Trivia Quiz</h1>
  </header>
  <RouterView />
</template>

<style>
@import url('https://fonts.googleapis.com/css2?family=Noto+Sans:wght@400;700&family=Inter:wght@400;700&display=swap');

* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
  font-family: 'Noto Sans', sans-serif;
}

main {
  max-width: 800px;
  margin: 20px auto;
  padding: 20px;
  background-color: #fff;
  border-radius: 8px;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
  text-align: center;
  min-height: 400px;
  display: flex;
  flex-direction: column;
  @media screen and (max-width: 600px) {
    min-height: auto;
    margin: 0;
    height: calc(100vh - 80px);
  }
}

header {
  background-color: #4caf50;
  color: white;
  padding: 20px;
  text-align: center;
  height: 80px;
}

button {
  border: none;
  padding: 10px 20px;
  font-size: 1em;
  cursor: pointer;
  border-radius: 5px;
  transition: background-color 0.3s ease;

  &.primary {
    color: white;
    background-color: #4caf50;

    &:hover {
      background-color: #388e3c;
    }
  }

  &.secondary {
    border: 1px solid gray;
    background-color: white;
    &:hover {
      background-color: #f1f1f1;
    }
  }
}
</style>
