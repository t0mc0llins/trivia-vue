import { mount } from '@vue/test-utils'
import { describe, it, expect, vi } from 'vitest'
import QuizCompleted from '../QuizCompleted.vue'

describe('QuizCompleted.vue', () => {
  const mockHandleResetQuiz = vi.fn()

  const defaultProps = {
    quizScore: 3,
    quizLength: 5,
    handleResetQuiz: mockHandleResetQuiz
  }

  it('renders correctly with given props', () => {
    const wrapper = mount(QuizCompleted, {
      props: defaultProps
    })

    expect(wrapper.find('h2').text()).toBe('Quiz Completed')
    expect(wrapper.find('p').text()).toBe('Score: 3 / 5')
  })

  it('calls handleResetQuiz when "Play Again" button is clicked', async () => {
    const wrapper = mount(QuizCompleted, {
      props: defaultProps
    })

    const button = wrapper.find('button.secondary')
    expect(button.exists()).toBe(true)

    await button.trigger('click')

    expect(mockHandleResetQuiz).toHaveBeenCalled()
  })
})
