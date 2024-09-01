import { onMounted, ref, watch } from 'vue'

export const useLocalStorage = (initialValue: number, key: string) => {
  const value = ref<number>(initialValue)

  onMounted(() => {
    const storedValue = window.localStorage.getItem(key)

    if (storedValue) {
      value.value = JSON.parse(storedValue)
    }

    watch(
      value,
      (value) => {
        window.localStorage.setItem(key, JSON.stringify(value))
      },
      { deep: true }
    )
  })

  return value
}
