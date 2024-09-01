type QuizDifficulty = 'easy' | 'medium' | 'hard'
type QuestionType = 'multiple' | 'boolean'

interface Question {
  type: QuestionType
  difficulty: QuizDifficulty
  category: string
  question: string
  correct_answer: string
  incorrect_answers: string[]
}
