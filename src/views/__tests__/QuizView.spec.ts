import { DOMWrapper, mount } from '@vue/test-utils'
import QuizView from '../QuizView.vue'
import { beforeEach, describe, expect, it, vi } from 'vitest'
import router from '@/router'
import { handleResetQuiz } from '@/services/trivia'
import QuizQuestion from '@/components/QuizQuestion.vue'
import QuizCompleted from '@/components/QuizCompleted.vue'
import { nextTick } from 'vue'

vi.mock('@/router', () => ({
  default: {
    push: vi.fn()
  }
}))

vi.mock('@/services/trivia', () => ({
  handleResetQuiz: vi.fn()
}))

vi.mock('@/composables/useLocalStorage', () => {
  const { ref } = require('vue')
  return {
    useLocalStorage: vi.fn((initialValue) => ref(initialValue))
  }
})

describe('QuizView.vue', () => {
  const pushMock = vi.fn()

  beforeEach(() => {
    router.push = pushMock
    vi.mocked(handleResetQuiz).mockReset()
    pushMock.mockReset()

    localStorage.clear()
  })

  it('renders correctly with initial data', async () => {
    localStorage.setItem(
      'quizQuestions',
      JSON.stringify([
        {
          question: 'Test question?',
          correct_answer: 'Correct answer',
          incorrect_answers: ['Wrong1', 'Wrong2', 'Wrong3'],
          type: 'multiple',
          difficulty: 'easy',
          category: 'General Knowledge'
        }
      ])
    )

    const wrapper = mount(QuizView)
    await nextTick()

    expect(wrapper.find('.quiz-view').exists()).toBe(true)
    expect(wrapper.findComponent(QuizQuestion).exists()).toBe(true)
    expect(wrapper.text()).toContain('Progress: 1 / 1')
  })

  it('increments score and progress on correct answer', async () => {
    localStorage.setItem(
      'quizQuestions',
      JSON.stringify([
        {
          question: 'Test question?',
          correct_answer: 'Correct answer',
          incorrect_answers: ['Wrong1', 'Wrong2', 'Wrong3'],
          type: 'multiple',
          difficulty: 'easy',
          category: 'General Knowledge'
        },
        {
          question: 'Test question 2?',
          correct_answer: 'Correct answer',
          incorrect_answers: ['Wrong1', 'Wrong2', 'Wrong3'],
          type: 'multiple',
          difficulty: 'easy',
          category: 'General Knowledge'
        }
      ])
    )

    const wrapper = mount(QuizView)
    await nextTick()

    const answerButton = wrapper.find('button')
    expect(answerButton.exists()).toBe(true)

    await answerButton.trigger('click')
    await nextTick()

    expect(wrapper.text()).toContain('Progress: 2 / 2')
  })

  it('redirects to home if no quizQuestions in localStorage', () => {
    mount(QuizView)
    expect(pushMock).toHaveBeenCalledWith('/')
  })

  it('handles quiz completion', async () => {
    localStorage.setItem(
      'quizQuestions',
      JSON.stringify([
        {
          question: 'Test question?',
          correct_answer: 'Correct answer',
          incorrect_answers: ['Wrong1', 'Wrong2', 'Wrong3'],
          type: 'multiple',
          difficulty: 'easy',
          category: 'General Knowledge'
        }
      ])
    )

    const wrapper = mount(QuizView)
    await nextTick()

    const answerButton = wrapper.find('button')
    expect(answerButton.exists()).toBe(true)

    await answerButton.trigger('click')
    await nextTick()

    expect(wrapper.findComponent({ name: 'QuizCompleted' }).exists()).toBe(true)
  })

  it('resets the quiz when "New quiz" is clicked', async () => {
    localStorage.setItem(
      'quizQuestions',
      JSON.stringify([
        {
          question: 'Test question?',
          correct_answer: 'Correct answer',
          incorrect_answers: ['Wrong1', 'Wrong2', 'Wrong3'],
          type: 'multiple',
          difficulty: 'easy',
          category: 'General Knowledge'
        }
      ])
    )

    const wrapper = mount(QuizView)
    await nextTick()

    const resetButton = wrapper.find('button.secondary')
    expect(resetButton.exists()).toBe(true)

    await resetButton.trigger('click')
    expect(handleResetQuiz).toHaveBeenCalled()
  })

  it('displays the correct score after completing the quiz', async () => {
    localStorage.setItem(
      'quizQuestions',
      JSON.stringify([
        {
          question: 'Test question?',
          correct_answer: 'Correct answer',
          incorrect_answers: ['Wrong1', 'Wrong2', 'Wrong3'],
          type: 'multiple',
          difficulty: 'easy',
          category: 'General Knowledge'
        }
      ])
    )

    const wrapper = mount(QuizView)
    await nextTick()

    const answerButton = wrapper
      .findAll('button')
      .find((btn) => btn.text() === 'Correct answer') as DOMWrapper<HTMLButtonElement>
    expect(answerButton.exists()).toBe(true)

    await answerButton.trigger('click')
    await nextTick()

    expect(wrapper.findComponent(QuizCompleted).exists()).toBe(true)
    expect(wrapper.text()).toContain('Score: 1')
  })
})
