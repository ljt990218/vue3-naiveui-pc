import { defineStore } from 'pinia'

export interface AppStore {
  swithMode: (val: string) => void
}

const prefersDark
  = window.matchMedia
  && window.matchMedia('(prefers-color-scheme: dark)').matches

const useAppStore = defineStore('app', () => {
  const theme = prefersDark ? 'dark' : 'light'
  const mode = ref(theme)

  const swithMode = (val: string) => {
    mode.value = val
  }

  return {
    mode,
    swithMode,
  }
}, {
  persist: true,
})

export default useAppStore
