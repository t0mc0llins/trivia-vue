# Trivia Quiz

A simple trivia quiz app built with Vue 3, Typescript, and the [OpenTrivia API]("https://opentdb.com/api_config.php").

## Live Demo

[Deployment on Render](https://trivia-vue-tc.onrender.com/)

## Features

- Fetches questions of varying difficulty and amount from the OpenTrivia API
- Uses local storage to save user's quiz progress and api session token
- Api session token is used to prevent duplicate questions in subsequent games
- Mobile responsive design

### Testing

Unit tests can be found in **src/views/\_\_tests\_\_** and **src/components/\_\_tests\_\_**.

## Project Setup

```sh
npm install
```

### Compile and Hot-Reload for Development

```sh
npm run dev
```

### Run Unit Tests with [Vitest](https://vitest.dev/)

```sh
npm run test:unit
```
