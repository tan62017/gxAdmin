import { createPinia, defineStore } from 'pinia'
export * from './ent'
export * from './user'

const setup = () => {
  const currentTime = ref(import.meta.env.VITE_CURRENT_TIME)
  const currentMonth = computed(() => currentTime.value.slice(4))
  const currentYear = computed(() => currentTime.value.slice(0, 4))
  const updateCurrentTime = time => {
    currentTime.value = time
  }
  return {
    currentTime,
    currentMonth,
    currentYear,
    updateCurrentTime
  }
}

export const useAppStore = defineStore('main', setup)

export const pinia = createPinia()
