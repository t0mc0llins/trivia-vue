type QuizDifficulty = 'easy' | 'medium' | 'hard'
type QuestionType = 'multiple' | 'boolean'

interface Question {
  type: QuizDifficulty
  difficulty: QuizDifficulty
  category: string
  question: string
  correct_answer: string
  incorrect_answers: string[]
}
