import router from '@/router'

// Fetch session token to avoid duplicate questions
const fetchSessionToken = async () => {
  try {
    const response = await fetch('https://opentdb.com/api_token.php?command=request')
    const data = await response.json()
    localStorage.setItem('sessionToken', data.token)
    return data.token
  } catch (error) {
    console.error(error)
    return ''
  }
}

// Reset session token if it has run out of questions
const resetSessionToken = async (token: string) => {
  try {
    const response = await fetch(`https://opentdb.com/api_token.php?command=reset&token=${token}`)
    await response.json()
  } catch (error) {
    console.error(error)
  }
}

const fetchQuestions = async (
  amount: number,
  token: string,
  difficulty: QuizDifficulty
): Promise<Question[] | null> => {
  try {
    const response = await fetch(
      `https://opentdb.com/api.php?amount=${amount}&token=${token}&difficulty=${difficulty}`
    )
    const data = await response.json()
    if (data.response_code === 0) {
      // Questions fetched successfully
      return data.results
    } else if (data.response_code === 4) {
      // Token has run out of questions, reset it and fetch new questions
      await resetSessionToken(token)
      return fetchQuestions(amount, token, difficulty)
    } else if (data.response_code === 3) {
      // Token has expired or is invalid, fetch a new one
      const newToken = await fetchSessionToken()
      return fetchQuestions(amount, newToken, difficulty)
    } else {
      console.error('Failed to fetch questions')
      return null
    }
  } catch (error) {
    console.error(error)
    return null
  }
}

// Fetch questions and store them in localStorage
export const getQuestions = async (quizLength: number, difficulty: QuizDifficulty) => {
  const token = localStorage.getItem('sessionToken') || (await fetchSessionToken())
  try {
    const questions = await fetchQuestions(quizLength, token, difficulty)
    if (questions && questions.length > 0) {
      localStorage.setItem('quizQuestions', JSON.stringify(questions))
    }
  } catch (error) {
    console.error(error)
  }
}

// Reset quiz progress, questions and score
export const handleResetQuiz = () => {
  localStorage.removeItem('quizQuestions')
  localStorage.removeItem('quizProgress')
  localStorage.removeItem('quizScore')
  router.push('/')
}
