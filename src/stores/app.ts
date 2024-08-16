import { defineStore } from "pinia";

export const useAppStore = defineStore("app", {
  state: () => ({
    isToggleMenu:false
  }),
  getters: {
    getIsToggleMenu: (state) => state.isToggleMenu
  },
  actions: {
    toggleMenu() {
      this.isToggleMenu = !this.isToggleMenu; 
    },
  },
});
