import { mount } from '@vue/test-utils'
import { describe, it, expect, vi } from 'vitest'
import QuizQuestion from '../QuizQuestion.vue'

describe('QuizQuestion.vue', () => {
  const mockHandleAnswer = vi.fn()

  const defaultProps = {
    question: 'What is the capital of France?',
    category: 'Geography',
    answers: ['Paris', 'London', 'Berlin', 'Madrid'],
    handleAnswer: mockHandleAnswer
  }

  it('renders correctly with props', () => {
    const wrapper = mount(QuizQuestion, {
      props: defaultProps
    })

    expect(wrapper.find('h2').text()).toBe('Geography')
    expect(wrapper.find('p').text()).toBe('What is the capital of France?')

    const buttons = wrapper.findAll('button.primary')
    expect(buttons.length).toBe(4)
    expect(buttons[0].text()).toBe('Paris')
    expect(buttons[1].text()).toBe('London')
    expect(buttons[2].text()).toBe('Berlin')
    expect(buttons[3].text()).toBe('Madrid')
  })

  it('calls handleAnswer with the correct answer when a button is clicked', async () => {
    const wrapper = mount(QuizQuestion, {
      props: defaultProps
    })

    const buttons = wrapper.findAll('button.primary')

    await buttons[0].trigger('click')
    expect(mockHandleAnswer).toHaveBeenCalledWith('Paris')

    await buttons[1].trigger('click')
    expect(mockHandleAnswer).toHaveBeenCalledWith('London')
  })

  it('parses HTML correctly in the question and category', () => {
    const wrapper = mount(QuizQuestion, {
      props: {
        question: 'What is the &quot;correct&quot; answer?',
        category: 'General &amp; Knowledge',
        answers: ['Option 1', 'Option 2'],
        handleAnswer: mockHandleAnswer
      }
    })

    expect(wrapper.find('h2').text()).toBe('General & Knowledge')
    expect(wrapper.find('p').text()).toBe('What is the "correct" answer?')
  })
})
