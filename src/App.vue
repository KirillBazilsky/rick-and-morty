<template>
  <v-app>
    <v-app-bar>
      <div class="wrapper">
        <img
          src="../src/assets/logo-black 1.png"
          alt="rick and morty black logo"
        />
        <v-spacer></v-spacer>
        <NavbarDesktop />
      </div>
    </v-app-bar>
    <router-view />
    <v-footer border elevation="10" height="60px" class="d-flex flex-column">
      <div class="text-center text-h6">
        Make with ❤️ for the MobProgramming team
      </div></v-footer
    >
  </v-app>
</template>

<script lang="ts" setup>
import NavbarDesktop from "./components/NavbarDesktop.vue";
</script>

<style>
.wrapper {
  margin: 0 auto;
  display: flex;
  justify-content: center;
  align-items: center;
  width: 1024px;
}
.link {
  margin-left: 18px;
  font-weight: 700;
  text-decoration: none;
  color: black;
}
</style>
