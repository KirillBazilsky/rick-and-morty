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
                width="46px"
              />
            </router-link>
          </v-col>
          <v-spacer></v-spacer>
          <v-col class="d-flex justify-end align-center">
            <NavbarDesktop :toggleMenu="toggleMenu"/>
          </v-col>
        </v-row>
      </v-container>
    </v-app-bar>
    <router-view v-if="!isToggleMenu" />
    <v-container v-else fluid>
      <MobileMenu :toggleMenu="toggleMenu"/>
    </v-container>
    <v-footer fixed bordered elevation="16" height="60px" cvlass="px-8 py-14">
      <v-row>
        <v-col class="text-center font-weight-bold pa-0 ma-0" cols="12" style="font-family: 'Karla'; font-size: 18px;"
          >Make with ❤️ for the MobProgramming team</v-col
        >
      </v-row>
    </v-footer>
  </v-app>
</template>

<script lang="ts" setup>
import NavbarDesktop from "./components/NavbarDesktop.vue";
import logoBlack from "@/assets/logo-black.png";
import MobileMenu from "./components/MobileMenu.vue";

const isToggleMenu = ref(false)
const toggleMenu = function(){
  isToggleMenu.value = !isToggleMenu.value
}
</script>

<style></style>
