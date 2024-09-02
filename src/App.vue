<script setup lang="ts">
import { RouterView } from 'vue-router'
import { handleResetQuiz } from '@/services/trivia'
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
  color: #352f36;
}

html {
  background-color: #e6f0dc;
}

main {
  max-width: 800px;
  margin: 20px auto;
  padding: 20px;
  background-color: white;
  border-radius: 8px;
  text-align: center;
  min-height: 400px;
  display: flex;
  flex-direction: column;
  @media screen and (max-width: 600px) {
    min-height: auto;
    margin: 0;
    height: calc(100vh - 80px);
    border-radius: 0;
  }
}

header {
  background-color: #c1e899;
  padding: 20px;
  text-align: center;
  height: 80px;
}
</style>
