import { createRouter, createWebHistory } from "vue-router/auto";
import { RouteRecordRaw } from 'vue-router';
import { setupLayouts } from "virtual:generated-layouts";
import { routes } from "vue-router/auto-routes";
import CharacterDetails from "@/pages/CharacterDetails.vue";
import EpisodeDetails from "@/pages/EpisodeDetails.vue";
import LocationDetails from "@/pages/LocationDetails.vue";

 const newRoutes: Array<RouteRecordRaw>
= [
  { path: "/", redirect: "/characters" },
  { path: '/character-details/:id', 
    name: 'CharacterDetails',
    component: CharacterDetails,
    props: true 
  },
  { path: '/episode-details/:id', 
    name: 'EpisodeDetails',
    component: EpisodeDetails,
    props: true 
  },
  { path: '/location-details/:id', 
    name: 'LocationDetails',
    component: LocationDetails,
    props: true 
  }
];


const allRoutes = [...routes, ...newRoutes];


const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: setupLayouts(allRoutes),
});


router.onError((err, to) => {
  if (err?.message?.includes?.("Failed to fetch dynamically imported module")) {
    if (!localStorage.getItem("vuetify:dynamic-reload")) {
      console.log("Reloading page to fix dynamic import error");
      localStorage.setItem("vuetify:dynamic-reload", "true");
      location.assign(to.fullPath);
    } else {
      console.error("Dynamic import error, reloading page did not fix it", err);
    }
  } else {
    console.error(err);
  }
});

router.isReady().then(() => {
  localStorage.removeItem("vuetify:dynamic-reload");
});

export default router;
