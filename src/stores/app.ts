
import { defineStore } from 'pinia'

export const useAppStore = defineStore('app', {
  state: () => ({
    characterInfo:{} 
  }),
  getters:{
    getCaracterInfo:(state) => state.characterInfo
  },
  actions: {
    setCharacterInfo(character: Record<string, any> | null) {
      this.characterInfo = character || {}; 
    }
  }
  
})


