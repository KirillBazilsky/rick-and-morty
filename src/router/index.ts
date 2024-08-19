import { createRouter, createWebHistory } from "vue-router/auto";
import { RouteRecordRaw } from 'vue-router';
import { setupLayouts } from "virtual:generated-layouts";
import { routes } from "vue-router/auto-routes";
import CharacterDetails from "@/pages/CharacterDetails.vue";

interface Route {
  path: string;
  name?: string;
  component?: any; 
  props?: boolean;
  redirect?: string;
}

 const newRoutes: Array<Route> = [
  { path: "/", redirect: "/characters" },
  { path: '/character-detail/:id', 
    name: 'CharacterDetails',
    component: CharacterDetails,
    props: true 
  }
];


const allRoutes = [...routes, ...newRoutes];


const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: setupLayouts(allRoutes),
});


 console.log(router.getRoutes())


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
