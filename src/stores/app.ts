import { defineStore } from "pinia";

export const useAppStore = defineStore("app", {
  state: () => ({
    isToggleMenu: <boolean>false,
  }),

  actions: {
    toggleMenu() {
      this.isToggleMenu = !this.isToggleMenu;
    },
  },
});
