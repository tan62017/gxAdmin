import { defineStore } from 'pinia'

export const useEntStore = defineStore('ent', () => {
  const oneEntConfig = ref({
    entName: '',
    entCode: '',
    show: false
  })

  return {
    oneEntConfig
  }
})
