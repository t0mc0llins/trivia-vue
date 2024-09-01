import { mount } from '@vue/test-utils'
import HomeView from '../HomeView.vue'
import { beforeEach, describe, expect, it, vi } from 'vitest'
import router from '@/router'
import { getQuestions } from '@/services/trivia'

vi.mock('@/services/trivia', () => ({
  getQuestions: vi.fn()
}))

vi.mock('@/router', () => ({
  default: {
    push: vi.fn()
  }
}))

describe('HomeView.vue', () => {
  const pushMock = vi.fn()

  beforeEach(() => {
    router.push = pushMock
    pushMock.mockReset()
    localStorage.clear()
  })

  it('renders correctly', () => {
    const wrapper = mount(HomeView)
    expect(wrapper.text()).toContain('General knowledge')
    expect(wrapper.findAll('input[type="radio"]').length).toBe(3)
    expect(wrapper.findAll('button.primary').length).toBe(3)
  })

  it('redirects to /quiz if quizQuestions exist in localStorage', () => {
    localStorage.setItem('quizQuestions', JSON.stringify([{ question: 'Test question?' }]))
    mount(HomeView)
    expect(pushMock).toHaveBeenCalledWith('/quiz')
  })

  it('calls getQuestions and navigates to /quiz when a difficulty button is clicked', async () => {
    const wrapper = mount(HomeView)
    const easyButton = wrapper.find('button.primary')

    await easyButton.trigger('click')

    expect(getQuestions).toHaveBeenCalledWith(10, 'easy')
    expect(pushMock).toHaveBeenCalledWith('/quiz')
  })

  it('updates quizLength when a radio button is selected', async () => {
    const wrapper = mount(HomeView)
    const radioButton = wrapper.find('input[value="20"]')

    await radioButton.setValue(true)

    const radioInputElement = radioButton.element as HTMLInputElement
    expect(radioInputElement.checked).toBe(true)
  })
})
