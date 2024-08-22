<template>
  <v-app>
    <v-app-bar>
      <v-container>
        <v-row class="d-flex justify-center align-center">
          <v-col>
            <router-link to="/">
              <v-img
              :src="logoBlack"
              alt="rick and morty black logo"
              width="46px"/>
            </router-link>
            
          </v-col>
          <v-spacer></v-spacer>
          <v-col class="d-flex justify-end align-center">
            <NavbarDesktop />
          </v-col>
        </v-row>
      </v-container>
    </v-app-bar>
    <router-view v-if="!appStore.isToggleMenu"/>
    <v-container v-else fluid>
      <MobileMenu />
    </v-container>
    <v-footer fixed bordered elevation="16" height="60px">
      <v-row>
        <v-col class="text-center text-h6" cols="12"
          >Make with ❤️ for the MobProgramming team</v-col
        >
      </v-row>
    </v-footer>
  </v-app>
</template>

<script lang="ts" setup>
import NavbarDesktop from "./components/NavbarDesktop.vue";
import logoBlack from "@/assets/logo-black.png";
import { useAppStore } from "./stores/app";
import MobileMenu from "./components/MobileMenu.vue";

const appStore = useAppStore();

</script>

<style>

</style>
